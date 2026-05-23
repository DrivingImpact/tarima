"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { DIFFICULTY_CONFIG, beatsPerBarFor } from "@/lib/types";
import { MusicClock } from "@/lib/music-clock";

// Quick synthesised beep — used for the 3-2-1 countdown. Sine oscillator with
// a short exponential decay so it doesn't click. One AudioContext per beep
// (cheap, closed automatically) so we don't have to wire one through.
function playBeep(frequency: number, durationMs: number, volume = 0.3) {
  if (typeof window === "undefined") return;
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = frequency;
    const now = ctx.currentTime;
    const dur = durationMs / 1000;
    gain.gain.setValueAtTime(volume, now);
    // Tiny attack so the start doesn't pop
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + dur);
    setTimeout(() => void ctx.close(), durationMs + 100);
  } catch {
    /* audio context unavailable — silent fall-through */
  }
}

// Pentagram (musical staff) layout:
//   • 4 measures shown left-to-right, each holding one rhyme word
//   • Leftmost is the current bar; the rest are upcoming previews (dimmed)
//   • Inside each bar, N beats (depends on time signature); a vertical
//     playhead moves bar→bar
//   • One full bar at the track's time signature = one word
const BARS_VISIBLE = 4;

export default function JuegoPage() {
  const router = useRouter();
  const { game, endSession } = useAppStore();

  // The MusicClock owns playback + the master clock. Created on /juego mount,
  // started after the countdown, and disposed on unmount.
  const clockRef = useRef<MusicClock | null>(null);
  const rafRef = useRef<number | null>(null);
  // Last bar we acted on. Cross a bar boundary → advance the word that many
  // times (covers tab-away gaps too).
  const lastBarRef = useRef<number>(-1);
  // Pure-presentation: current beat-in-bar (fractional) and current bar.
  // Read every RAF tick from `clockRef.current.tick(beatsPerBar)`.
  const [, force] = useState(0);
  const rerender = useCallback(() => force((x) => x + 1), []);

  const [showCountdown, setShowCountdown] = useState(true);
  const [countdownNum, setCountdownNum] = useState(3);
  const [showSummary, setShowSummary] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [bufferReady, setBufferReady] = useState(false);

  const diffConfig = DIFFICULTY_CONFIG[game.difficulty];
  const isAuto = game.mode === "clasico" || game.mode === "barras-infinitas";
  const isTap = game.mode === "toque";
  const isGenerator = game.mode === "generador";
  const beatsPerBar = beatsPerBarFor(game.currentBeat?.timeSignature ?? "4/4");

  // Authoritative BPM lives on the clock; surface a snapshot for the header.
  const bpm = clockRef.current?.getBpm() ?? game.currentBeat?.bpm ?? 90;

  // Wall-clock tick for the elapsed timer
  useEffect(() => {
    if (!game.isPlaying || showCountdown || showSummary) return;
    const t = setInterval(rerender, 500);
    return () => clearInterval(t);
  }, [game.isPlaying, showCountdown, showSummary, rerender]);

  // RAF loop — every frame, read the master clock and advance words on bar
  // boundary crossings. The clock and the audio share AudioContext.currentTime
  // so the visual playhead can never drift from the drums.
  const rafLoop = useCallback(() => {
    rafRef.current = null;
    const clock = clockRef.current;
    if (!clock) return;
    const { bar, playing } = clock.tick(beatsPerBar);
    if (isAuto && playing && bar > lastBarRef.current && lastBarRef.current >= 0) {
      const delta = bar - lastBarRef.current;
      const s = useAppStore.getState();
      for (let i = 0; i < delta; i++) {
        s.completeBar();
        s.advanceWord();
      }
    }
    if (playing) lastBarRef.current = bar;
    rerender();
    rafRef.current = requestAnimationFrame(rafLoop);
  }, [beatsPerBar, isAuto, rerender]);

  const startRAF = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(rafLoop);
  }, [rafLoop]);

  const stopRAF = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  // Preload the audio buffer in parallel with the countdown so playback can
  // start instantly when ¡DALE! hits.
  useEffect(() => {
    if (!game.currentBeat) return;
    const beat = game.currentBeat;
    const clock = new MusicClock();
    clockRef.current = clock;
    let cancelled = false;
    if (!beat.src) {
      setLoadError("Beat sin URL — revisa la hoja");
      return;
    }
    clock
      .load(beat.id, beat.src, beat.bpm, beat.bar1OffsetSec)
      .then(() => {
        if (cancelled) return;
        setBufferReady(true);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("MusicClock: failed to load beat", err);
        setLoadError(err instanceof Error ? err.message : "Error de carga");
      });
    return () => {
      cancelled = true;
    };
    // We deliberately depend on the BEAT ID, not the whole beat object, so
    // re-renders don't trigger a reload.
  }, [game.currentBeat]);

  const startPlaying = useCallback(() => {
    const clock = clockRef.current;
    if (!clock || !bufferReady) return;
    lastBarRef.current = 0;
    clock.start();
    startRAF();
    rerender();
  }, [bufferReady, startRAF, rerender]);

  // Re-anchor: "right now is beat 1". Persists per-track in localStorage.
  const handleResync = useCallback(() => {
    clockRef.current?.resync();
    lastBarRef.current = 0;
    rerender();
  }, [rerender]);

  const handleSkip = useCallback(
    (seconds: number) => {
      clockRef.current?.seekBy(seconds);
      lastBarRef.current = clockRef.current?.tick(beatsPerBar).bar ?? 0;
      rerender();
    },
    [beatsPerBar, rerender],
  );


  // Countdown — fires a short synthesised beep on each tick (440Hz "tick"
  // on 3/2/1, 880Hz "go" on ¡DALE!). The countdown waits if the audio buffer
  // hasn't finished decoding yet so playback can't miss its own start.
  useEffect(() => {
    if (!showCountdown) return;
    if (countdownNum === 0) {
      if (!bufferReady) return; // hold on ¡DALE! until the buffer is ready
      playBeep(880, 280, 0.35);
      setShowCountdown(false);
      startPlaying();
      return;
    }
    playBeep(440, 140, 0.25);
    const t = setTimeout(() => setCountdownNum((c) => c - 1), 800);
    return () => clearTimeout(t);
  }, [countdownNum, showCountdown, bufferReady, startPlaying]);

  // Tap-mode owns its own integer beat counter — the rapper sets the pace,
  // not the audio clock. Audio still plays as backing music.
  const tapBeatRef = useRef(0);

  const handleTap = useCallback(() => {
    if (!isTap) return;
    const next = tapBeatRef.current + 1;
    tapBeatRef.current = next;
    if (next % beatsPerBar === 0) {
      const s = useAppStore.getState();
      s.completeBar();
      s.advanceWord();
    }
    rerender();
  }, [isTap, beatsPerBar, rerender]);

  const handleNextRound = useCallback(() => {
    const s = useAppStore.getState();
    s.completeBar();
    s.advanceWord();
    tapBeatRef.current = 0;
    rerender();
  }, [rerender]);

  const stopAudio = useCallback(() => {
    stopRAF();
    clockRef.current?.stop();
  }, [stopRAF]);

  const handleStop = useCallback(() => {
    stopAudio();
    endSession();
    setShowSummary(true);
  }, [endSession, stopAudio]);

  // Pause/resume drives the MusicClock — same clock means same sync.
  useEffect(() => {
    const clock = clockRef.current;
    if (!clock) return;
    if (game.isPaused) {
      clock.pause();
    } else if (game.isPlaying && !showCountdown && clock.isRunning() === false && bufferReady) {
      // Only resume if the clock had been started AND is currently paused.
      // Don't auto-start before the countdown — that's startPlaying's job.
      // We check pausedAt indirectly: if the clock isn't running but the
      // session is, we're resuming from pause.
      clock.resume();
    }
  }, [game.isPaused, game.isPlaying, showCountdown, bufferReady]);

  useEffect(() => {
    return () => {
      stopRAF();
      clockRef.current?.stop();
      clockRef.current = null;
    };
  }, [stopRAF]);

  // Keyboard shortcuts (desktop):
  //   Space     → toggle pause / resume
  //   ← / →     → skip ±10 s in the audio
  //   R         → re-sync beat 1 to current audio position
  //   Esc       → end the session (same as the ✕ button)
  //   T         → tap (only meaningful in modo Toque)
  // Ignore keys while the countdown / summary screens are showing.
  useEffect(() => {
    if (showCountdown || showSummary) return;
    const onKey = (e: KeyboardEvent) => {
      // Don't hijack typing inside form fields (none on /juego, but defensive)
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }
      switch (e.code) {
        case "Space":
          e.preventDefault();
          if (game.isPaused) useAppStore.getState().resumeGame();
          else useAppStore.getState().pauseGame();
          break;
        case "ArrowLeft":
          e.preventDefault();
          handleSkip(-10);
          break;
        case "ArrowRight":
          e.preventDefault();
          handleSkip(10);
          break;
        case "KeyR":
          e.preventDefault();
          handleResync();
          break;
        case "Escape":
          e.preventDefault();
          handleStop();
          break;
        case "KeyT":
          if (isTap) {
            e.preventDefault();
            handleTap();
          }
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showCountdown, showSummary, game.isPaused, handleSkip, handleResync, handleStop, handleTap, isTap]);

  useEffect(() => {
    if (!game.isPlaying && !showCountdown && !showSummary) {
      router.push("/");
    }
  }, [game.isPlaying, showCountdown, showSummary, router]);

  const elapsed = game.sessionStartTime
    ? Math.floor((Date.now() - game.sessionStartTime) / 1000)
    : 0;
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;

  // ─── COUNTDOWN ──
  if (showCountdown) {
    return (
      <div className="app-screen flex items-center justify-center bg-background">
        <div className="text-center animate-slide-up" key={countdownNum}>
          {countdownNum > 0 ? (
            <p className="text-9xl font-black gradient-text">{countdownNum}</p>
          ) : (
            <p className="text-6xl font-black gradient-text">¡DALE!</p>
          )}
        </div>
      </div>
    );
  }

  // ─── SUMMARY ──
  if (showSummary) {
    return (
      <div className="app-screen flex items-center justify-center px-4 bg-background">
        <div className="w-full max-w-md animate-slide-up">
          <div className="card-dark rounded-3xl p-6 space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-black uppercase gradient-text">
                Sesión Completa
              </h2>
              <p className="text-muted text-sm mt-1">Buen trabajo 🔥</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="card-dark rounded-xl p-4 text-center">
                <p className="text-3xl font-black text-accent">{game.barsCompleted}</p>
                <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Barras</p>
              </div>
              <div className="card-dark rounded-xl p-4 text-center">
                <p className="text-3xl font-black text-gold">{game.score}</p>
                <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Puntos</p>
              </div>
              <div className="card-dark rounded-xl p-4 text-center">
                <p className="text-3xl font-black">
                  {mins}:{String(secs).padStart(2, "0")}
                </p>
                <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Duración</p>
              </div>
              <div className="card-dark rounded-xl p-4 text-center">
                <p className="text-3xl font-black text-accent">
                  {useAppStore.getState().progress.currentStreak}
                </p>
                <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Racha</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => router.push("/")}
                className="flex-1 py-3 rounded-xl card-dark font-bold text-sm uppercase tracking-wide"
              >
                Inicio
              </button>
              <button
                onClick={() => {
                  setShowSummary(false);
                  router.push("/");
                }}
                className="flex-1 py-3 rounded-xl btn-primary text-sm"
              >
                Otra vez
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── GAME ──
  // Compute playhead: which beat in the current bar.
  //   Auto modes (clásico / barras-infinitas / generador): fractional beat
  //     from the MusicClock so the playhead glides smoothly with the drums.
  //   Tap mode: integer beat from the rapper's tap counter.
  const beatInBar = isTap
    ? tapBeatRef.current % beatsPerBar
    : (clockRef.current?.tick(beatsPerBar).beatInBar ?? 0);

  // Words queue: bar 0 = current, bars 1..3 = upcoming preview
  const queue: (string | null)[] = Array.from({ length: BARS_VISIBLE }).map(
    (_, i) => game.currentWords[game.activeWordIndex + i]?.text ?? null,
  );

  return (
    <div
      className="app-screen flex flex-col bg-background"
      onClick={isTap ? handleTap : undefined}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleStop();
          }}
          className="w-10 h-10 rounded-full card-dark flex items-center justify-center text-muted hover:text-foreground transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center">
          <p className="font-bold text-sm">{game.currentBeat?.name || "Beat"}</p>
          <p className="text-xs text-muted">
            {loadError ? (
              <span className="text-danger">{loadError}</span>
            ) : !bufferReady ? (
              <span className="text-accent animate-pulse">cargando…</span>
            ) : (
              `${Math.round(bpm)} BPM`
            )}{" "}
            · {diffConfig.label}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {bufferReady && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleResync();
              }}
              title="Pulsa en el beat 1 para sincronizar"
              className="w-10 h-10 rounded-full card-dark flex items-center justify-center text-muted hover:text-gold transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-3-6.7" />
                <polyline points="21 4 21 10 15 10" />
              </svg>
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (game.isPaused) {
                useAppStore.getState().resumeGame();
              } else {
                useAppStore.getState().pauseGame();
              }
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-accent glow-pink"
          >
            {game.isPaused ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-8 py-2 text-center">
        <div>
          <p className="text-[10px] text-muted uppercase tracking-wider">Barras</p>
          <p className="font-bold text-accent">{game.barsCompleted}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted uppercase tracking-wider">Tiempo</p>
          <p className="font-bold font-mono">
            {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
          </p>
        </div>
      </div>

      {/* Transport — skip the song forward/back, scrubbable progress */}
      <Transport
        clock={clockRef.current}
        onSkip={handleSkip}
        onSeekTo={(seconds) => {
          clockRef.current?.seekTo(seconds);
          lastBarRef.current = clockRef.current?.tick(beatsPerBar).bar ?? 0;
          rerender();
        }}
      />

      {/* ─── PENTAGRAM (musical staff) ─── */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-4 relative">
        <div className="w-full max-w-3xl">
          {/* Active word — hero. Fills the row, scales down if too long. */}
          <div className="text-center mb-3 px-2">
            <p
              key={`active-${game.activeWordIndex}`}
              className="text-gold font-black uppercase tracking-tight animate-word-reveal leading-none break-words"
              style={{
                fontSize: `clamp(2.25rem, ${Math.min(4.5, 28 / Math.max(4, queue[0]?.length ?? 4))}rem, 4rem)`,
              }}
            >
              {queue[0] || "—"}
            </p>
          </div>

          {/* Upcoming preview strip — full words, smaller, dimmed */}
          <div className="flex items-center justify-center gap-2 mb-4 px-2 text-center">
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-muted/60 whitespace-nowrap">
              Siguen
            </span>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {queue.slice(1).map((text, i) => (
                <span
                  key={`up-${text ?? "_"}-${game.activeWordIndex}-${i + 1}`}
                  className={`uppercase font-bold tracking-wide whitespace-nowrap ${
                    i === 0
                      ? "text-sm sm:text-base text-foreground/80"
                      : i === 1
                      ? "text-xs sm:text-sm text-foreground/55"
                      : "text-xs text-foreground/35"
                  }`}
                >
                  {text || "—"}
                  {i < queue.length - 2 && (
                    <span className="ml-2 text-muted/30">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* The staff itself */}
          <Pentagram
            beatInBar={beatInBar}
            beatsPerBar={beatsPerBar}
            isPaused={game.isPaused}
          />

          {/* Beat counter underneath the staff — centered, just the active bar's beats */}
          <div className="flex justify-center gap-2 mt-3">
            {Array.from({ length: beatsPerBar }).map((_, b) => (
              <span
                key={b}
                className={`text-sm font-mono transition-all ${
                  b === beatInBar && !game.isPaused
                    ? "text-gold font-black scale-125"
                    : b < beatInBar
                    ? "text-accent/40"
                    : "text-muted/40"
                }`}
              >
                {b + 1}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="px-4 pb-6 space-y-3">
        {isTap && (
          <p className="text-center text-muted text-xs">
            Un toque por beat
          </p>
        )}
        {isGenerator && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNextRound();
            }}
            className="w-full py-4 rounded-2xl btn-primary text-lg"
          >
            Siguiente palabra
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Transport — skip forward/back + scrubbable progress bar ──
function Transport({
  clock,
  onSkip,
  onSeekTo,
}: {
  clock: MusicClock | null;
  onSkip: (seconds: number) => void;
  onSeekTo: (seconds: number) => void;
}) {
  const [, force] = useState(0);

  // Local 4Hz refresh so the progress bar moves
  useEffect(() => {
    const t = setInterval(() => force((x) => x + 1), 250);
    return () => clearInterval(t);
  }, []);

  const cur = clock?.getCurrentTime() ?? 0;
  const dur = clock?.getDuration() ?? 0;
  const pct = dur > 0 ? Math.min(100, (cur / dur) * 100) : 0;
  const fmt = (s: number) => {
    if (!isFinite(s) || s < 0) s = 0;
    const m = Math.floor(s / 60);
    const r = Math.floor(s % 60);
    return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
  };

  return (
    <div
      className="px-4 pt-1 pb-2 flex items-center gap-2 max-w-3xl mx-auto w-full"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => onSkip(-10)}
        title="Retroceder 10s"
        className="text-muted hover:text-foreground p-1.5 rounded-lg card-dark"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="11,19 2,12 11,5" fill="currentColor" />
          <polygon points="22,19 13,12 22,5" fill="currentColor" />
        </svg>
      </button>

      <span className="text-[10px] text-muted font-mono w-9 text-right">{fmt(cur)}</span>

      {/* Scrubbable progress bar */}
      <div
        className="flex-1 h-2 rounded-full bg-surface relative cursor-pointer"
        onClick={(e) => {
          if (!clock || dur <= 0) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width;
          onSeekTo(Math.max(0, Math.min(dur - 0.1, x * dur)));
        }}
      >
        <div
          className="absolute top-0 left-0 h-2 rounded-full bg-accent"
          style={{ width: `${pct}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold shadow-[0_0_8px_rgba(255,193,7,0.6)]"
          style={{ left: `calc(${pct}% - 6px)` }}
        />
      </div>

      <span className="text-[10px] text-muted font-mono w-9">{fmt(dur)}</span>

      <button
        onClick={() => onSkip(10)}
        title="Adelantar 10s"
        className="text-muted hover:text-foreground p-1.5 rounded-lg card-dark"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="2,5 11,12 2,19" fill="currentColor" />
          <polygon points="13,5 22,12 13,19" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
}

function Pentagram({
  beatInBar,
  beatsPerBar,
  isPaused,
}: {
  beatInBar: number;
  beatsPerBar: number;
  isPaused: boolean;
}) {
  // SVG-based staff. Width is responsive via viewBox.
  const STAFF_W = 1200;
  const STAFF_H = 140;
  const STAFF_TOP = 40;
  const STAFF_BOTTOM = 110;
  const LINE_GAP = (STAFF_BOTTOM - STAFF_TOP) / 4;
  const CLEF_X = 30;
  const STAFF_LEFT = 95;
  const STAFF_RIGHT = STAFF_W - 20;
  const BAR_W = (STAFF_RIGHT - STAFF_LEFT) / BARS_VISIBLE;
  // The active bar is always the first (leftmost). The playhead moves across
  // it in beatsPerBar steps.
  const playheadX = STAFF_LEFT + (beatInBar / beatsPerBar) * BAR_W + BAR_W / (beatsPerBar * 2);

  return (
    <svg
      viewBox={`0 0 ${STAFF_W} ${STAFF_H}`}
      className="w-full"
      preserveAspectRatio="none"
      style={{ height: "min(28vh, 200px)" }}
    >
      {/* Active bar background highlight */}
      <rect
        x={STAFF_LEFT}
        y={STAFF_TOP - 6}
        width={BAR_W}
        height={STAFF_BOTTOM - STAFF_TOP + 12}
        fill="rgba(255, 193, 7, 0.06)"
        rx={4}
      />

      {/* 5 staff lines */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1={CLEF_X}
          x2={STAFF_RIGHT}
          y1={STAFF_TOP + i * LINE_GAP}
          y2={STAFF_TOP + i * LINE_GAP}
          stroke="rgba(255,255,255,0.35)"
          strokeWidth={1.2}
        />
      ))}

      {/* Bar lines (vertical dividers) */}
      {Array.from({ length: BARS_VISIBLE + 1 }).map((_, i) => (
        <line
          key={i}
          x1={STAFF_LEFT + i * BAR_W}
          x2={STAFF_LEFT + i * BAR_W}
          y1={STAFF_TOP}
          y2={STAFF_BOTTOM}
          stroke={i === 0 || i === BARS_VISIBLE ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.25)"}
          strokeWidth={i === BARS_VISIBLE ? 3 : 1}
        />
      ))}

      {/* Treble clef glyph */}
      <text
        x={CLEF_X}
        y={STAFF_BOTTOM + 12}
        fill="rgba(255,255,255,0.85)"
        fontSize={88}
        fontFamily="serif"
      >
        𝄞
      </text>

      {/* Time signature 4/4 */}
      <text
        x={STAFF_LEFT - 28}
        y={STAFF_TOP + LINE_GAP * 1.4}
        fill="rgba(255,255,255,0.7)"
        fontSize={26}
        fontWeight={800}
        fontFamily="serif"
      >
        4
      </text>
      <text
        x={STAFF_LEFT - 28}
        y={STAFF_TOP + LINE_GAP * 3.4}
        fill="rgba(255,255,255,0.7)"
        fontSize={26}
        fontWeight={800}
        fontFamily="serif"
      >
        4
      </text>

      {/* Beat noteheads (quarter notes) on each beat of every visible bar.
          Active bar's beats glow brighter near the playhead. */}
      {Array.from({ length: BARS_VISIBLE }).map((_, barIdx) =>
        Array.from({ length: beatsPerBar }).map((_, b) => {
          const cx = STAFF_LEFT + barIdx * BAR_W + (b + 0.5) * (BAR_W / beatsPerBar);
          const cy = STAFF_TOP + LINE_GAP * 2; // middle line
          const isActiveBar = barIdx === 0;
          const isPlayed = isActiveBar && b < beatInBar;
          const isOn = isActiveBar && b === beatInBar && !isPaused;
          const opacity = isActiveBar
            ? isOn
              ? 1
              : isPlayed
              ? 0.6
              : 0.85
            : barIdx === 1
            ? 0.35
            : barIdx === 2
            ? 0.18
            : 0.1;
          const fill = isOn ? "#ffc107" : isActiveBar ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.7)";
          return (
            <g key={`${barIdx}-${b}`} opacity={opacity}>
              <ellipse cx={cx} cy={cy} rx={9} ry={7} fill={fill} transform={`rotate(-20 ${cx} ${cy})`} />
              {/* Stem */}
              <line
                x1={cx + 8}
                x2={cx + 8}
                y1={cy - 4}
                y2={cy - 36}
                stroke={fill}
                strokeWidth={2.2}
              />
            </g>
          );
        }),
      )}

      {/* Playhead — vertical glowing line in active bar */}
      {!isPaused && (
        <g>
          <line
            x1={playheadX}
            x2={playheadX}
            y1={STAFF_TOP - 12}
            y2={STAFF_BOTTOM + 12}
            stroke="#ffc107"
            strokeWidth={2.5}
            opacity={0.9}
          >
            <animate attributeName="opacity" values="0.7;1;0.7" dur="0.4s" repeatCount="indefinite" />
          </line>
          <circle cx={playheadX} cy={STAFF_TOP - 12} r={5} fill="#ffc107">
            <animate attributeName="r" values="4;6;4" dur="0.4s" repeatCount="indefinite" />
          </circle>
        </g>
      )}
    </svg>
  );
}
