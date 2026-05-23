import type { BeatConfig, BeatStyle, DrumPattern } from './types';

// ────────────────────────────────────────────────────────────────
// Per-style drum kit voicings. Same synthesis primitives, different
// frequencies/decays so each style has a recognisable timbre.
// ────────────────────────────────────────────────────────────────

interface KitVoice {
  kickStartHz: number;
  kickEndHz: number;
  kickDecay: number;
  subStartHz: number;
  subDecay: number;
  snareTone: number;     // body frequency
  snareNoiseHz: number;  // bandpass centre for the noise
  snareNoiseQ: number;
  hatHpf: number;        // closed hat highpass
  hatDecay: number;      // closed hat decay
  swing: number;         // 0 = straight, 0.2 ≈ subtle swing on the "+" steps
  gain: number;
}

const KITS: Record<BeatStyle, KitVoice> = {
  'boom-bap': {
    kickStartHz: 130, kickEndHz: 50, kickDecay: 0.45,
    subStartHz: 75, subDecay: 0.3,
    snareTone: 220, snareNoiseHz: 4200, snareNoiseQ: 0.7,
    hatHpf: 8500, hatDecay: 0.05,
    swing: 0.18, gain: 0.95,
  },
  'old-school': {
    kickStartHz: 140, kickEndHz: 55, kickDecay: 0.5,
    subStartHz: 80, subDecay: 0.32,
    snareTone: 240, snareNoiseHz: 3800, snareNoiseQ: 0.6,
    hatHpf: 7800, hatDecay: 0.06,
    swing: 0.1, gain: 0.95,
  },
  'jazz-hop': {
    kickStartHz: 120, kickEndHz: 45, kickDecay: 0.55,
    subStartHz: 70, subDecay: 0.35,
    snareTone: 200, snareNoiseHz: 3500, snareNoiseQ: 0.5,
    hatHpf: 9500, hatDecay: 0.08,
    swing: 0.25, gain: 0.85,
  },
  lofi: {
    kickStartHz: 110, kickEndHz: 42, kickDecay: 0.6,
    subStartHz: 65, subDecay: 0.4,
    snareTone: 180, snareNoiseHz: 2800, snareNoiseQ: 0.4,
    hatHpf: 6500, hatDecay: 0.07,
    swing: 0.15, gain: 0.75,
  },
  trap: {
    // Sub-heavy 808-ish kick, crisp tight snap snare, very tight hats
    kickStartHz: 180, kickEndHz: 28, kickDecay: 0.7,
    subStartHz: 60, subDecay: 0.55,
    snareTone: 280, snareNoiseHz: 6500, snareNoiseQ: 1.0,
    hatHpf: 10500, hatDecay: 0.035,
    swing: 0, gain: 1.0,
  },
  drill: {
    // Sliding kick (handled by extra detune), aggressive snap, tight hats
    kickStartHz: 200, kickEndHz: 32, kickDecay: 0.75,
    subStartHz: 55, subDecay: 0.6,
    snareTone: 300, snareNoiseHz: 7200, snareNoiseQ: 1.2,
    hatHpf: 11000, hatDecay: 0.03,
    swing: 0, gain: 1.0,
  },
  reggaeton: {
    kickStartHz: 160, kickEndHz: 60, kickDecay: 0.4,
    subStartHz: 85, subDecay: 0.28,
    snareTone: 260, snareNoiseHz: 4800, snareNoiseQ: 0.8,
    hatHpf: 9000, hatDecay: 0.045,
    swing: 0, gain: 1.0,
  },
  latin: {
    kickStartHz: 150, kickEndHz: 58, kickDecay: 0.4,
    subStartHz: 82, subDecay: 0.28,
    snareTone: 280, snareNoiseHz: 5200, snareNoiseQ: 0.9,
    hatHpf: 9500, hatDecay: 0.05,
    swing: 0.08, gain: 0.95,
  },
};

// ────────────────────────────────────────────────────────────────
// BeatEngine – Web Audio API drum synthesiser & sequencer
// ────────────────────────────────────────────────────────────────

type StepCallback = (step: number, time: number) => void;

export class BeatEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private volume = 0.8;
  private bpm = 90;
  private pattern: DrumPattern | null = null;
  private kit: KitVoice = KITS['boom-bap'];
  private currentStep = 0;
  private timerId: number | null = null;
  private nextStepTime = 0;
  private isPlaying = false;
  private isPaused = false;
  private metronomeMode = false;
  private stepCallback: StepCallback | null = null;

  // Lookahead scheduling (à la Chris Wilson's article)
  private readonly scheduleAheadTime = 0.1; // seconds
  private readonly lookahead = 25; // ms

  // ── lifecycle ────────────────────────────────────────────────

  /** Ensure AudioContext exists (call from a user-gesture handler). */
  async init(): Promise<void> {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') await this.ctx.resume();
      return;
    }
    this.ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = this.volume;
    this.masterGain.connect(this.ctx.destination);
  }

  /** Start playback of the loaded pattern (or metronome). */
  async start(config?: BeatConfig): Promise<void> {
    await this.init();
    if (config) {
      this.pattern = config.pattern;
      this.bpm = config.bpm;
      this.kit = KITS[config.style] ?? this.kit;
    }
    this.currentStep = 0;
    this.isPlaying = true;
    this.isPaused = false;
    this.nextStepTime = this.ctx!.currentTime;
    this.scheduler();
  }

  stop(): void {
    this.isPlaying = false;
    this.isPaused = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.currentStep = 0;
  }

  pause(): void {
    if (!this.isPlaying || this.isPaused) return;
    this.isPaused = true;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  resume(): void {
    if (!this.isPlaying || !this.isPaused) return;
    this.isPaused = false;
    this.nextStepTime = this.ctx!.currentTime;
    this.scheduler();
  }

  dispose(): void {
    this.stop();
    if (this.ctx) {
      void this.ctx.close();
      this.ctx = null;
      this.masterGain = null;
    }
  }

  // ── config ───────────────────────────────────────────────────

  setVolume(v: number): void {
    this.volume = Math.max(0, Math.min(1, v));
    if (this.masterGain) this.masterGain.gain.value = this.volume;
  }

  setBpm(bpm: number): void {
    this.bpm = Math.max(40, Math.min(300, bpm));
  }

  setPattern(p: DrumPattern): void {
    this.pattern = p;
  }

  setMetronome(on: boolean): void {
    this.metronomeMode = on;
  }

  onStep(cb: StepCallback): void {
    this.stepCallback = cb;
  }

  get playing(): boolean {
    return this.isPlaying && !this.isPaused;
  }

  get step(): number {
    return this.currentStep;
  }

  loadBeat(config: BeatConfig): void {
    this.pattern = config.pattern;
    this.bpm = config.bpm;
    this.kit = KITS[config.style] ?? this.kit;
  }

  enableMetronome(volume?: number): void {
    this.metronomeMode = true;
    if (volume !== undefined) this.setVolume(volume);
  }

  disableMetronome(): void {
    this.metronomeMode = false;
  }

  // ── scheduler ────────────────────────────────────────────────

  private scheduler = (): void => {
    if (!this.ctx || !this.isPlaying || this.isPaused) return;

    while (this.nextStepTime < this.ctx.currentTime + this.scheduleAheadTime) {
      this.scheduleStep(this.currentStep, this.nextStepTime);
      this.advanceStep();
    }

    this.timerId = window.setTimeout(this.scheduler, this.lookahead);
  };

  private advanceStep(): void {
    const steps = this.pattern?.steps ?? 16;
    const secondsPerStep = 60 / this.bpm / 4; // 16th notes
    this.nextStepTime += secondsPerStep;
    this.currentStep = (this.currentStep + 1) % steps;
  }

  private scheduleStep(step: number, time: number): void {
    // Fire the callback so the UI can sync the bouncing ball
    this.stepCallback?.(step, time);

    if (this.metronomeMode) {
      this.playMetronomeClick(time, step % 4 === 0);
      return;
    }

    if (!this.pattern) return;
    const s = step % this.pattern.steps;

    // Swing: delay every odd 16th-note slightly. Subtle (≤ ~33%) shuffle.
    const stepDur = 60 / this.bpm / 4;
    const swingOffset = s % 2 === 1 ? stepDur * this.kit.swing * 0.5 : 0;
    const t = time + swingOffset;

    if (this.pattern.kick[s]) this.playKick(t);
    if (this.pattern.snare[s]) this.playSnare(t);
    if (this.pattern.hihat[s]) this.playHihat(t, false);
    if (this.pattern.openhat[s]) this.playHihat(t, true);
    if (this.pattern.perc[s]) this.playPerc(t);
  }

  // ── metronome ────────────────────────────────────────────────

  private playMetronomeClick(time: number, accent: boolean): void {
    const ctx = this.ctx!;
    const dest = this.masterGain!;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = accent ? 1200 : 800;
    gain.gain.setValueAtTime(accent ? 0.6 : 0.3, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
    osc.connect(gain).connect(dest);
    osc.start(time);
    osc.stop(time + 0.05);
  }

  // ── drum synthesis ───────────────────────────────────────────

  /** Punchy kick: pitched-down sine + noise transient (kit-tuned) */
  private playKick(time: number): void {
    const ctx = this.ctx!;
    const dest = this.masterGain!;
    const k = this.kit;

    // Sine body
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(k.kickStartHz, time);
    osc.frequency.exponentialRampToValueAtTime(k.kickEndHz, time + 0.07);
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, k.kickEndHz * 0.55), time + k.kickDecay * 0.75);
    oscGain.gain.setValueAtTime(k.gain, time);
    oscGain.gain.exponentialRampToValueAtTime(0.001, time + k.kickDecay);
    osc.connect(oscGain).connect(dest);
    osc.start(time);
    osc.stop(time + k.kickDecay);

    // Sub thump
    const sub = ctx.createOscillator();
    const subGain = ctx.createGain();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(k.subStartHz, time);
    sub.frequency.exponentialRampToValueAtTime(k.subStartHz * 0.5, time + 0.12);
    subGain.gain.setValueAtTime(0.7 * k.gain, time);
    subGain.gain.exponentialRampToValueAtTime(0.001, time + k.subDecay);
    sub.connect(subGain).connect(dest);
    sub.start(time);
    sub.stop(time + k.subDecay);

    // Click transient
    const click = ctx.createOscillator();
    const clickGain = ctx.createGain();
    click.type = 'triangle';
    click.frequency.setValueAtTime(3500, time);
    click.frequency.exponentialRampToValueAtTime(200, time + 0.02);
    clickGain.gain.setValueAtTime(0.4 * k.gain, time);
    clickGain.gain.exponentialRampToValueAtTime(0.001, time + 0.02);
    click.connect(clickGain).connect(dest);
    click.start(time);
    click.stop(time + 0.03);
  }

  /** Crispy snare: noise burst through bandpass + sine body (kit-tuned) */
  private playSnare(time: number): void {
    const ctx = this.ctx!;
    const dest = this.masterGain!;
    const k = this.kit;

    // Noise burst
    const noiseLen = 0.15;
    const bufSize = Math.ceil(ctx.sampleRate * noiseLen);
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = ctx.createBufferSource();
    noise.buffer = buf;

    const noiseBp = ctx.createBiquadFilter();
    noiseBp.type = 'bandpass';
    noiseBp.frequency.value = k.snareNoiseHz;
    noiseBp.Q.value = k.snareNoiseQ;

    const noiseHp = ctx.createBiquadFilter();
    noiseHp.type = 'highpass';
    noiseHp.frequency.value = 1500;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.9 * k.gain, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, time + noiseLen);

    noise.connect(noiseBp).connect(noiseHp).connect(noiseGain).connect(dest);
    noise.start(time);
    noise.stop(time + noiseLen);

    // Tonal body
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(k.snareTone, time);
    osc.frequency.exponentialRampToValueAtTime(k.snareTone * 0.5, time + 0.06);
    oscGain.gain.setValueAtTime(0.7 * k.gain, time);
    oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
    osc.connect(oscGain).connect(dest);
    osc.start(time);
    osc.stop(time + 0.1);
  }

  /** Hi-hat: filtered noise, short (closed) or long (open) decay (kit-tuned) */
  private playHihat(time: number, open: boolean): void {
    const ctx = this.ctx!;
    const dest = this.masterGain!;
    const k = this.kit;

    const decay = open ? Math.max(0.18, k.hatDecay * 5) : k.hatDecay;
    const bufSize = Math.ceil(ctx.sampleRate * decay);
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = ctx.createBufferSource();
    noise.buffer = buf;

    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = open ? k.hatHpf - 1500 : k.hatHpf;

    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 12000;
    bp.Q.value = 0.5;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(open ? 0.45 : 0.35, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + decay);

    noise.connect(hp).connect(bp).connect(gain).connect(dest);
    noise.start(time);
    noise.stop(time + decay);

    // Metallic shimmer (square harmonics)
    if (open) {
      const sq = ctx.createOscillator();
      const sqGain = ctx.createGain();
      sq.type = 'square';
      sq.frequency.value = 6500;
      sqGain.gain.setValueAtTime(0.05, time);
      sqGain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
      sq.connect(sqGain).connect(dest);
      sq.start(time);
      sq.stop(time + 0.15);
    }
  }

  /** Percussion: mid-range click / rimshot */
  private playPerc(time: number): void {
    const ctx = this.ctx!;
    const dest = this.masterGain!;

    // Click oscillator
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1800, time);
    osc.frequency.exponentialRampToValueAtTime(400, time + 0.025);
    oscGain.gain.setValueAtTime(0.6, time);
    oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.06);
    osc.connect(oscGain).connect(dest);
    osc.start(time);
    osc.stop(time + 0.06);

    // Short noise burst for body
    const nLen = 0.04;
    const buf = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * nLen), ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;

    const noise = ctx.createBufferSource();
    noise.buffer = buf;

    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 3200;
    bp.Q.value = 2;

    const nGain = ctx.createGain();
    nGain.gain.setValueAtTime(0.35, time);
    nGain.gain.exponentialRampToValueAtTime(0.001, time + nLen);

    noise.connect(bp).connect(nGain).connect(dest);
    noise.start(time);
    noise.stop(time + nLen);
  }
}

// ────────────────────────────────────────────────────────────────
// Helpers for building 16-step patterns
// ────────────────────────────────────────────────────────────────

/** Parse a shorthand string like "x...x...x...x..." into boolean[16]. */
function p(s: string): boolean[] {
  if (s.length !== 16) {
    throw new Error(`Pattern must be 16 chars, got ${s.length}: "${s}"`);
  }
  return s.split('').map((c) => c === 'x');
}

// ────────────────────────────────────────────────────────────────
// Beat presets
// ────────────────────────────────────────────────────────────────

export const BEAT_PRESETS: BeatConfig[] = [
  //
  // Every pattern string is exactly 16 characters (one 4/4 bar of 16th notes).
  // Columns: |1 e + a|2 e + a|3 e + a|4 e + a|
  //
  // Goal: each preset should sound like its style, not just the same loop
  // at a different tempo. Variety: kick density, ghost snares, open-hat
  // accents, perc syncopation, swing (kit-level).
  //

  // ── boom-bap ──────────────────────────────────────────────────
  // Classic head-nod: kick on 1 + push, snare on 2 & 4, 8th-note hats, ghost perc.
  {
    id: 'calle-clasica',
    name: 'Calle Clasica',
    bpm: 90,
    style: 'boom-bap',
    pattern: {
      kick:    p('x......xx.......'),
      snare:   p('....x.......x...'),
      hihat:   p('x.x.x.x.x.x.x.x.'),
      openhat: p('..............x.'),
      perc:    p('..........x.....'),
      steps: 16,
    },
  },
  {
    id: 'polvo-dorado',
    name: 'Polvo Dorado',
    bpm: 86,
    style: 'boom-bap',
    pattern: {
      kick:    p('x..x........x...'),
      snare:   p('....x..x....x...'),  // ghost on the "+ of 2"
      hihat:   p('x.x.x.x.x.x.x.x.'),
      openhat: p('......x.........'),
      perc:    p('........x.....x.'),
      steps: 16,
    },
  },

  // ── trap ──────────────────────────────────────────────────────
  // Sub-heavy, syncopated kick, claps on 3, rolling 16th hats with triplet bursts.
  {
    id: 'trampa-oscura',
    name: 'Trampa Oscura',
    bpm: 140,
    style: 'trap',
    pattern: {
      kick:    p('x.....x...x.x...'),
      snare:   p('........x.......'),  // clap on beat 3
      hihat:   p('x.x.x.x.xxxxx.x.'),  // triplet roll into beat 4
      openhat: p('............x...'),
      perc:    p('................'),
      steps: 16,
    },
  },
  {
    id: 'serpiente-808',
    name: 'Serpiente 808',
    bpm: 145,
    style: 'trap',
    pattern: {
      kick:    p('x...x...x..xx...'),
      snare:   p('........x.......'),
      hihat:   p('xxxxxxxxxx.xxxxx'),  // 16ths with one rest for groove
      openhat: p('..............x.'),
      perc:    p('..x.......x.....'),
      steps: 16,
    },
  },

  // ── lofi ──────────────────────────────────────────────────────
  // Slow, lazy, swung. Snare laid back, sparse perc.
  {
    id: 'lluvia-de-vinilo',
    name: 'Lluvia de Vinilo',
    bpm: 72,
    style: 'lofi',
    pattern: {
      kick:    p('x.....x...x.....'),
      snare:   p('....x.......x...'),
      hihat:   p('x...x.x.x...x.x.'),
      openhat: p('................'),
      perc:    p('............x...'),
      steps: 16,
    },
  },

  // ── reggaeton ─────────────────────────────────────────────────
  // Dembow tresillo: clear "boom-ch-boom-chick" pulse, no question what this is.
  {
    id: 'dembow-fuego',
    name: 'Dembow Fuego',
    bpm: 96,
    style: 'reggaeton',
    pattern: {
      kick:    p('x.......x.......'),
      snare:   p('...x..x...x..x..'),  // tresillo snare
      hihat:   p('..x...x...x...x.'),
      openhat: p('................'),
      perc:    p('x...x...x...x...'),
      steps: 16,
    },
  },
  {
    id: 'perreo-nocturno',
    name: 'Perreo Nocturno',
    bpm: 92,
    style: 'reggaeton',
    pattern: {
      kick:    p('x.......x.......'),
      snare:   p('...x..x...x..x..'),
      hihat:   p('xxxxxxxxxxxxxxxx'),
      openhat: p('................'),
      perc:    p('.x..x...x.....x.'),
      steps: 16,
    },
  },

  // ── old-school ────────────────────────────────────────────────
  // Stripped-down, drum-machiney 80s feel. No swing. Open hat on the "and".
  {
    id: 'barrio-viejo',
    name: 'Barrio Viejo',
    bpm: 100,
    style: 'old-school',
    pattern: {
      kick:    p('x.......x.......'),
      snare:   p('....x.......x...'),
      hihat:   p('x.x.x.x.x.x.x...'),
      openhat: p('..............x.'),
      perc:    p('................'),
      steps: 16,
    },
  },

  // ── jazz-hop ──────────────────────────────────────────────────
  // Heavy swing handled by kit. Brushy, syncopated. Open hat as ride bell.
  {
    id: 'cafe-con-swing',
    name: 'Cafe con Swing',
    bpm: 82,
    style: 'jazz-hop',
    pattern: {
      kick:    p('x.....x...x.....'),
      snare:   p('....x.......x...'),
      hihat:   p('x..xx..xx..xx..x'),
      openhat: p('........x.......'),
      perc:    p('..x.......x...x.'),
      steps: 16,
    },
  },

  // ── latin ─────────────────────────────────────────────────────
  // 3-2 son clave perc. Distinct from reggaeton by clave + busier hats.
  {
    id: 'rumba-urbana',
    name: 'Rumba Urbana',
    bpm: 102,
    style: 'latin',
    pattern: {
      kick:    p('x.....x...x.....'),
      snare:   p('....x.......x...'),
      hihat:   p('x.xxx.x.x.xxx.x.'),
      openhat: p('................'),
      perc:    p('x..x..x...x.x...'),  // 3-2 clave
      steps: 16,
    },
  },
  {
    id: 'son-callejero',
    name: 'Son Callejero',
    bpm: 108,
    style: 'latin',
    pattern: {
      kick:    p('x..x....x..x....'),
      snare:   p('....x.......x...'),
      hihat:   p('x.x.x.x.x.x.x.x.'),
      openhat: p('..............x.'),
      perc:    p('..x...x...x.x...'),
      steps: 16,
    },
  },

  // ── drill ─────────────────────────────────────────────────────
  // Sliding kicks, snare on the "and of 4" sometimes, very tight bright hats.
  {
    id: 'taladro-nocturno',
    name: 'Taladro Nocturno',
    bpm: 142,
    style: 'drill',
    pattern: {
      kick:    p('x.....x.x...x.x.'),
      snare:   p('........x.......'),  // single clap on beat 3 (UK drill style)
      hihat:   p('x.xxx.xxx.xxxxxx'),
      openhat: p('..............x.'),
      perc:    p('................'),
      steps: 16,
    },
  },
  {
    id: 'sombra-de-acero',
    name: 'Sombra de Acero',
    bpm: 138,
    style: 'drill',
    pattern: {
      kick:    p('x..x......x.x...'),
      snare:   p('........x......x'),  // clap on 3, snap on the very last 16th
      hihat:   p('xxxx.xxx.xxxxxxx'),
      openhat: p('................'),
      perc:    p('..x...........x.'),
      steps: 16,
    },
  },
];

// ────────────────────────────────────────────────────────────────
// Query helpers
// ────────────────────────────────────────────────────────────────

export function getBeatsByStyle(style: BeatStyle): BeatConfig[] {
  return BEAT_PRESETS.filter((b) => b.style === style);
}
