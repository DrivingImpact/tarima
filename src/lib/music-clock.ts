/**
 * Sample-accurate music clock for Tarima.
 *
 * Built on the Web Audio API. The visual playhead and the audio playback are
 * driven by the SAME clock (`AudioContext.currentTime`), so they cannot drift.
 *
 * Sync rules:
 *   1. `bpm` is authoritative — comes from beat metadata, never auto-detected.
 *   2. `bar1OffsetSec` is the position inside the audio buffer where beat 1
 *      of bar 1 lives. Defaults to 0; can be tuned by the user via resync().
 *   3. `bar1ContextTime` is the `AudioContext.currentTime` at which beat 1
 *      occurs / occurred. Everything derives from here.
 *   4. `getBeat()` returns total beats since beat 1 (fractional, monotonically
 *      increasing). Bar / beat-in-bar are derived from it.
 *
 * The user's resync offset is persisted per-track in localStorage, so a track
 * only ever needs to be aligned once.
 */

const STORAGE_PREFIX = "tarima:bar1Offset:";
// Schedule audio slightly into the future so it can never be "in the past"
// by the time the audio thread picks it up. 80ms is generous on every device
// I've tested without being audible.
const SCHEDULE_LOOKAHEAD_SEC = 0.08;

export interface ClockTick {
  /** Total beats since beat 1 of bar 1 (fractional, starts at 0). */
  beat: number;
  /** Bar index (integer, starts at 0). */
  bar: number;
  /** Fractional position inside the current bar (0 .. beatsPerBar). */
  beatInBar: number;
  /** True if audio is actually playing (not paused / not stopped). */
  playing: boolean;
}

/**
 * decodeAudioData with a watchdog. Some Android WebViews have a known bug
 * where the promise form never settles for certain MP3s; the callback form
 * still works. Try the promise first; if nothing happens within 8s, retry
 * via the callback API; if that also stalls (4s), reject so the UI can show
 * a real error instead of hanging on the countdown forever.
 */
function decodeWithFallback(
  ctx: AudioContext,
  arr: ArrayBuffer,
): Promise<AudioBuffer> {
  const withTimeout = (p: Promise<AudioBuffer>, ms: number) =>
    new Promise<AudioBuffer>((resolve, reject) => {
      const t = setTimeout(
        () => reject(new Error("decode-timeout")),
        ms,
      );
      p.then(
        (b) => {
          clearTimeout(t);
          resolve(b);
        },
        (e) => {
          clearTimeout(t);
          reject(e);
        },
      );
    });

  const callbackDecode = () =>
    new Promise<AudioBuffer>((resolve, reject) => {
      // Decode detaches the buffer, so each attempt needs its own copy.
      ctx.decodeAudioData(
        arr.slice(0),
        (buf) => resolve(buf),
        (err) => reject(err ?? new Error("decodeAudioData failed")),
      );
    });

  return withTimeout(ctx.decodeAudioData(arr.slice(0)), 8000).catch(() =>
    withTimeout(callbackDecode(), 4000).catch(() => {
      throw new Error("No se pudo decodificar el audio en este dispositivo");
    }),
  );
}

export class MusicClock {
  private ctx: AudioContext | null = null;
  private buffer: AudioBuffer | null = null;
  private source: AudioBufferSourceNode | null = null;
  private gainNode: GainNode | null = null;

  private bpm = 90;
  private bar1OffsetSec = 0;
  private trackId = "";

  // ctx.currentTime at which beat 1 of bar 1 occurs (or occurred).
  private bar1ContextTime = 0;
  // Beat at which playback was paused (so resume() can pick up exactly there).
  private pausedAtBeat: number | null = null;
  private isPlaying = false;
  private volume = 0.85;

  /** Lazy-create / resume the AudioContext on first use. Must be called from
   *  a user-gesture handler the first time, per browser autoplay policy. */
  private getCtx(): AudioContext {
    if (!this.ctx || this.ctx.state === "closed") {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.ctx = new Ctx({ latencyHint: "interactive" });
    }
    if (this.ctx.state === "suspended") {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  /** Decode an audio file into memory. Resolves the bar-1 offset by trying,
   *  in order:
   *    1. user-tuned offset persisted in localStorage (from a previous resync)
   *    2. explicit `bar1OffsetSec` from track metadata (set by hand)
   *    3. auto-detection on the decoded buffer (finds first significant audio)
   *
   *  Idempotent per trackId. */
  async load(
    trackId: string,
    src: string,
    bpm: number,
    bar1OffsetSec?: number,
  ): Promise<void> {
    this.trackId = trackId;
    this.bpm = bpm;

    const ctx = this.getCtx();
    const res = await fetch(src);
    if (!res.ok) throw new Error(`MusicClock: failed to fetch ${src}`);
    const arr = await res.arrayBuffer();
    this.buffer = await decodeWithFallback(ctx, arr);

    // 1) user-saved offset wins
    const saved =
      typeof window !== "undefined"
        ? window.localStorage.getItem(STORAGE_PREFIX + trackId)
        : null;
    const savedN = saved !== null ? Number(saved) : NaN;
    if (Number.isFinite(savedN)) {
      this.bar1OffsetSec = savedN;
      return;
    }
    // 2) explicit metadata next
    if (bar1OffsetSec !== undefined && Number.isFinite(bar1OffsetSec)) {
      this.bar1OffsetSec = bar1OffsetSec;
      return;
    }
    // 3) auto-detect: where does the first significant audio start?
    this.bar1OffsetSec = detectFirstAudioOnset(this.buffer);
  }

  /** Start playback from beat 1 (bar1Offset into the buffer). */
  start(): void {
    if (!this.buffer) throw new Error("MusicClock: no buffer loaded");
    const ctx = this.getCtx();
    this.stopSourceOnly();

    const src = this.makeSource(ctx, this.buffer);
    const gain = ctx.createGain();
    gain.gain.value = this.volume;
    src.connect(gain).connect(ctx.destination);

    const when = ctx.currentTime + SCHEDULE_LOOKAHEAD_SEC;
    src.start(when, this.bar1OffsetSec);
    this.bar1ContextTime = when;
    this.source = src;
    this.gainNode = gain;
    this.isPlaying = true;
    this.pausedAtBeat = null;
  }

  /** Snapshot the current beat and stop the source. */
  pause(): void {
    if (!this.isPlaying) return;
    this.pausedAtBeat = this.computeBeat();
    this.stopSourceOnly();
    this.isPlaying = false;
  }

  /** Resume from the paused-beat snapshot. */
  resume(): void {
    if (this.isPlaying || !this.buffer || this.pausedAtBeat === null) return;
    const ctx = this.getCtx();
    const beat = this.pausedAtBeat;
    const bufferOffset = this.beatToBufferOffset(beat);

    const src = this.makeSource(ctx, this.buffer);
    const gain = ctx.createGain();
    gain.gain.value = this.volume;
    src.connect(gain).connect(ctx.destination);

    const when = ctx.currentTime + SCHEDULE_LOOKAHEAD_SEC;
    src.start(when, bufferOffset);
    // bar1ContextTime is the moment beat=0 would have happened. Working
    // backwards from "at time `when` the playhead is at beat `beat`":
    this.bar1ContextTime = when - (beat * 60) / this.bpm;
    this.source = src;
    this.gainNode = gain;
    this.isPlaying = true;
    this.pausedAtBeat = null;
  }

  /** Stop entirely — disconnects the source and forgets paused state. */
  stop(): void {
    this.stopSourceOnly();
    this.isPlaying = false;
    this.pausedAtBeat = null;
  }

  /** Re-anchor: declare "right now is beat 1 of bar 1". Persists the new
   *  offset for this track in localStorage so it only has to be done once. */
  resync(): void {
    if (!this.ctx || !this.buffer) return;
    if (this.isPlaying && this.source) {
      // Compute the buffer position playing at this instant
      const bufPosNow = this.currentBufferPosition();
      this.bar1OffsetSec = bufPosNow;
      this.bar1ContextTime = this.ctx.currentTime;
      // Loop boundaries follow the new offset
      this.source.loopStart = this.bar1OffsetSec;
    } else if (this.pausedAtBeat !== null) {
      // Re-anchor on pause: the current buffer position becomes the new
      // bar 1, but we stay paused at beat 0.
      this.pausedAtBeat = 0;
    }
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        STORAGE_PREFIX + this.trackId,
        String(this.bar1OffsetSec),
      );
    }
  }

  /** Seek the audio by `deltaSec`. Beat 1 anchor is preserved relative to
   *  the new audio position, so the playhead jumps consistently. */
  seekBy(deltaSec: number): void {
    if (!this.ctx || !this.buffer) return;
    if (this.isPlaying && this.source) {
      const bufPosNow = this.currentBufferPosition();
      const next = clampBufferPosition(bufPosNow + deltaSec, this.buffer.duration);
      // Restart the source at the new position; preserve bar1 alignment by
      // shifting bar1ContextTime in lockstep with the seek.
      this.stopSourceOnly();
      const ctx = this.ctx;
      const src = this.makeSource(ctx, this.buffer);
      const gain = ctx.createGain();
      gain.gain.value = this.volume;
      src.connect(gain).connect(ctx.destination);
      const when = ctx.currentTime + SCHEDULE_LOOKAHEAD_SEC;
      src.start(when, next);
      // The new buffer position `next` is at AudioContext time `when`. We
      // want bar1ContextTime to satisfy:
      //    (when - bar1ContextTime) * bpm/60   ==   (next - bar1Offset) * bpm/60   (mod loop)
      //  → bar1ContextTime = when - (next - bar1Offset) * 60/bpm
      const beatAtNext = (next - this.bar1OffsetSec) * (this.bpm / 60);
      this.bar1ContextTime = when - (beatAtNext * 60) / this.bpm;
      this.source = src;
      this.gainNode = gain;
    } else if (this.pausedAtBeat !== null) {
      const deltaBeats = deltaSec * (this.bpm / 60);
      this.pausedAtBeat = Math.max(0, this.pausedAtBeat + deltaBeats);
    }
  }

  /** Read the current clock state. Pure read, cheap, safe to call every RAF. */
  tick(beatsPerBar: number): ClockTick {
    const beat = this.computeBeat();
    const bar = Math.floor(beat / beatsPerBar);
    const beatInBar = beat - bar * beatsPerBar;
    return { beat, bar, beatInBar, playing: this.isPlaying };
  }

  /** Underlying audio duration in seconds (for transport UI). */
  getDuration(): number {
    return this.buffer?.duration ?? 0;
  }

  /** Where in the audio file we currently are (for transport UI). */
  getCurrentTime(): number {
    if (!this.buffer) return 0;
    if (this.isPlaying) return this.currentBufferPosition();
    if (this.pausedAtBeat !== null) {
      return this.beatToBufferOffset(this.pausedAtBeat);
    }
    return this.bar1OffsetSec;
  }

  /** Seek to an absolute position (seconds into the buffer). */
  seekTo(seconds: number): void {
    if (!this.buffer) return;
    const target = clampBufferPosition(seconds, this.buffer.duration);
    const cur = this.getCurrentTime();
    this.seekBy(target - cur);
  }

  /** Active BPM (authoritative, never auto-detected at runtime). */
  getBpm(): number {
    return this.bpm;
  }

  /** True if a source node is currently scheduled. */
  isRunning(): boolean {
    return this.isPlaying;
  }

  // ── Internals ────────────────────────────────────────────────────

  private makeSource(
    ctx: AudioContext,
    buffer: AudioBuffer,
  ): AudioBufferSourceNode {
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    src.loopStart = this.bar1OffsetSec;
    src.loopEnd = buffer.duration;
    return src;
  }

  private stopSourceOnly(): void {
    if (this.source) {
      try {
        this.source.stop();
      } catch {
        /* already stopped — fine */
      }
      this.source.disconnect();
      this.source = null;
    }
    if (this.gainNode) {
      this.gainNode.disconnect();
      this.gainNode = null;
    }
  }

  private computeBeat(): number {
    if (this.pausedAtBeat !== null) return this.pausedAtBeat;
    if (!this.isPlaying || !this.ctx) return 0;
    const elapsed = this.ctx.currentTime - this.bar1ContextTime;
    return Math.max(0, elapsed) * (this.bpm / 60);
  }

  /** Convert a beat number to the buffer position (accounting for looping). */
  private beatToBufferOffset(beat: number): number {
    const duration = this.buffer?.duration ?? 0;
    if (duration === 0) return this.bar1OffsetSec;
    // Loop length in seconds = duration - bar1OffsetSec
    const loopLen = Math.max(0.001, duration - this.bar1OffsetSec);
    const seconds = (beat * 60) / this.bpm;
    const wrapped = seconds % loopLen;
    return this.bar1OffsetSec + wrapped;
  }

  /** Reverse of beatToBufferOffset — where in the buffer is the playhead now. */
  private currentBufferPosition(): number {
    return this.beatToBufferOffset(this.computeBeat());
  }
}

function clampBufferPosition(t: number, duration: number): number {
  if (!Number.isFinite(t)) return 0;
  if (t < 0) return 0;
  if (t > duration - 0.05) return Math.max(0, duration - 0.05);
  return t;
}

/**
 * Auto-detect where the first significant audio begins. Skips silence,
 * sub-audible noise, and ambient pad-ups so the playhead lands close to
 * "bar 1" on most tracks. Drops the offset back by ~30 ms so we don't land
 * mid-transient (kicks have sharp attacks — landing on the peak is late).
 *
 * Resolution: 10-ms RMS windows over the first 20 seconds. Threshold of
 * 0.04 (≈ -28 dB) works well for music masters; quiet ambient intros below
 * that floor are correctly treated as "still part of the silence". The user
 * can always override with one tap on the resync button.
 */
function detectFirstAudioOnset(buffer: AudioBuffer): number {
  const sampleRate = buffer.sampleRate;
  const data = buffer.getChannelData(0);
  const maxSec = Math.min(20, buffer.duration);
  const windowSamples = Math.max(1, Math.floor(0.01 * sampleRate));
  const maxWindows = Math.floor((maxSec * sampleRate) / windowSamples);
  // -28 dBFS — quiet enough to catch a soft kick, loud enough to skip
  // background noise / dither
  const THRESHOLD_RMS = 0.04;
  // Pull the offset back by 30 ms so the playhead anchors just before the
  // first transient (so beat 1's kick downbeat aligns with the playhead 1).
  const PRE_ROLL_SEC = 0.03;

  for (let w = 0; w < maxWindows; w++) {
    const start = w * windowSamples;
    const end = Math.min(start + windowSamples, data.length);
    let sumSq = 0;
    for (let i = start; i < end; i++) sumSq += data[i] * data[i];
    const rms = Math.sqrt(sumSq / (end - start));
    if (rms > THRESHOLD_RMS) {
      const seconds = (w * windowSamples) / sampleRate;
      return Math.max(0, seconds - PRE_ROLL_SEC);
    }
  }
  return 0;
}
