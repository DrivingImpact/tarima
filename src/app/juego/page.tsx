"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { DIFFICULTY_CONFIG, beatsPerBarFor } from "@/lib/types";
import type { Word } from "@/lib/types";
import { MusicClock } from "@/lib/music-clock";
import {
  VinylViz,
  LaneViz,
  TypeViz,
  VizToggle,
  loadVizMode,
  saveVizMode,
  type VizMode,
} from "@/components/GameVisualizers";

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
  // Presentation snapshot of the clock — written from the RAF loop and from
  // imperative handlers, and read during render. We never read the live
  // `clockRef.current` during render (that's a ref-read violation and can go
  // stale); the loop pushes the values into state instead.
  const [view, setView] = useState<{ bar: number; beatInBar: number; bpm: number }>(
    () => ({ bar: 0, beatInBar: 0, bpm: game.currentBeat?.bpm ?? 90 }),
  );
  // Elapsed seconds, ticked by an interval while playing — kept in state so we
  // never call Date.now() during render.
  const [elapsed, setElapsed] = useState(0);

  // Visualizer mode — persisted across sessions. Lazy initializer:
  // loadVizMode() guards `window` itself, and this screen only renders
  // post-countdown (long after hydration), so no mismatch risk.
  const [vizMode, setVizMode] = useState<VizMode>(() => loadVizMode());
  const changeViz = useCallback((m: VizMode) => {
    setVizMode(m);
    saveVizMode(m);
  }, []);

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

  // Snapshot the clock into `view`. Called from event handlers (after a seek /
  // resync / start) so the UI reflects the new position immediately, without
  // waiting for the next RAF frame. Runs in callbacks, never during render.
  const syncView = useCallback(() => {
    const clock = clockRef.current;
    if (!clock) return;
    const { bar, beatInBar } = clock.tick(beatsPerBar);
    setView({ bar, beatInBar, bpm: clock.getBpm() });
  }, [beatsPerBar]);

  // Elapsed-timer tick. Interval-driven setState (not a synchronous setState in
  // the effect body), so no cascading-render warning.
  useEffect(() => {
    if (!game.isPlaying || showCountdown || showSummary) return;
    const t = setInterval(() => {
      setElapsed(
        game.sessionStartTime
          ? Math.floor((Date.now() - game.sessionStartTime) / 1000)
          : 0,
      );
    }, 500);
    return () => clearInterval(t);
  }, [game.isPlaying, showCountdown, showSummary, game.sessionStartTime]);

  // RAF loop — every frame, read the master clock and advance words on bar
  // boundary crossings. The clock and the audio share AudioContext.currentTime
  // so the visual playhead can never drift from the drums. The loop is a local
  // function (so it can recurse without a self-referencing useCallback) and
  // pushes the read into `view` state rather than forcing a blind re-render.
  const startRAF = useCallback(() => {
    if (rafRef.current != null) return;
    const loop = () => {
      const clock = clockRef.current;
      if (!clock) {
        rafRef.current = null;
        return;
      }
      const { bar, beatInBar, playing } = clock.tick(beatsPerBar);
      if (isAuto && playing && bar > lastBarRef.current && lastBarRef.current >= 0) {
        const delta = bar - lastBarRef.current;
        const s = useAppStore.getState();
        for (let i = 0; i < delta; i++) {
          s.completeBar();
          s.advanceWord();
        }
      }
      if (playing) lastBarRef.current = bar;
      setView({ bar, beatInBar, bpm: clock.getBpm() });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
  }, [beatsPerBar, isAuto]);

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
      // No URL — nothing to load. The error is surfaced via the derived
      // `errorMsg` in render (no synchronous setState in this effect).
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
    syncView();
  }, [bufferReady, startRAF, syncView]);

  // Re-anchor: "right now is beat 1". Persists per-track in localStorage.
  // Advanced action — surfaced only via the R key + long-press on the
  // restart button (which is a tap target most users will already reach for).
  const handleResync = useCallback(() => {
    clockRef.current?.resync();
    lastBarRef.current = 0;
    syncView();
  }, [syncView]);

  // Restart the song from the top of the buffer. The most-requested gesture
  // — when a verse goes off the rails, you want to start over without
  // exiting the session.
  const handleRestart = useCallback(() => {
    clockRef.current?.seekTo(0);
    lastBarRef.current = 0;
    syncView();
  }, [syncView]);

  const handleSkip = useCallback(
    (seconds: number) => {
      clockRef.current?.seekBy(seconds);
      lastBarRef.current = clockRef.current?.tick(beatsPerBar).bar ?? 0;
      syncView();
    },
    [beatsPerBar, syncView],
  );


  // Countdown — fires a short synthesised beep on each tick (440Hz "tick"
  // on 3/2/1, 880Hz "go" on ¡DALE!). The countdown waits if the audio buffer
  // hasn't finished decoding yet so playback can't miss its own start.
  useEffect(() => {
    if (!showCountdown) return;
    if (countdownNum === 0) {
      if (!bufferReady) return; // hold on ¡DALE! until the buffer is ready
      playBeep(880, 280, 0.35);
      // Defer the hide + start by one frame so it isn't a synchronous setState
      // in the effect body (avoids the cascading-render warning). Behaviour is
      // identical — one rAF tick later the countdown clears and playback begins.
      const id = requestAnimationFrame(() => {
        setShowCountdown(false);
        startPlaying();
      });
      return () => cancelAnimationFrame(id);
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
    setView((v) => ({ ...v, beatInBar: next % beatsPerBar }));
  }, [isTap, beatsPerBar]);

  const handleNextRound = useCallback(() => {
    const s = useAppStore.getState();
    s.completeBar();
    s.advanceWord();
    tapBeatRef.current = 0;
    setView((v) => ({ ...v, beatInBar: 0 }));
  }, []);

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
          // Shift+R = resync (re-anchor beat 1); plain R = restart the song.
          // Restart is the much more common user need, so it claims the
          // bare key; resync hides behind a modifier.
          if (e.shiftKey) handleResync();
          else handleRestart();
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
  }, [showCountdown, showSummary, game.isPaused, handleSkip, handleResync, handleRestart, handleStop, handleTap, isTap]);

  useEffect(() => {
    if (!game.isPlaying && !showCountdown && !showSummary) {
      router.push("/");
    }
  }, [game.isPlaying, showCountdown, showSummary, router]);

  // `elapsed` is interval-ticked state (see the effect above) — no Date.now()
  // during render.
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  const errorMsg =
    loadError ??
    (game.currentBeat && !game.currentBeat.src
      ? "Beat sin URL — revisa la hoja"
      : null);

  // ─── COUNTDOWN ──
  if (showCountdown) {
    return (
      <div className="app-screen flex items-center justify-center bg-background">
        <div className="text-center animate-slide-up px-6" key={countdownNum}>
          {countdownNum > 0 ? (
            <p className="text-9xl font-display text-accent">{countdownNum}</p>
          ) : errorMsg ? (
            // The beat failed to load — without this the screen would sit on
            // ¡DALE! forever with the error hidden in the (unmounted) header.
            <div className="space-y-5">
              <p className="text-4xl font-display uppercase text-foreground">
                No se pudo cargar el beat
              </p>
              <p className="text-sm text-danger break-words">{errorMsg}</p>
              <button
                onClick={() => {
                  endSession();
                  router.push("/");
                }}
                className="px-8 py-3 rounded-2xl btn-primary text-sm"
              >
                Volver al inicio
              </button>
            </div>
          ) : (
            <>
              <p className="text-7xl font-display uppercase text-accent">¡DALE!</p>
              {!bufferReady && (
                <p className="text-xs text-muted mt-4 animate-pulse uppercase tracking-[0.25em]">
                  cargando beat…
                </p>
              )}
            </>
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
              <h2 className="text-4xl font-display uppercase text-foreground">
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
                <p className="text-3xl font-black text-foreground">{game.score}</p>
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
  // Playhead position — which beat in the current bar. Both auto modes (from
  // the MusicClock) and tap mode (from the rapper's tap counter) write
  // `view.beatInBar`, so render just reads it (no ref read during render).
  const beatInBar = view.beatInBar;

  // Words queue: bar 0 = current, bars 1..3 = upcoming preview
  const queue: (Word | null)[] = Array.from({ length: BARS_VISIBLE }).map(
    (_, i) => game.currentWords[game.activeWordIndex + i] ?? null,
  );
  const prevWord: Word | null =
    game.activeWordIndex > 0
      ? game.currentWords[game.activeWordIndex - 1] ?? null
      : null;

  // Fractional bar position (0..1) + integer beat — shared by all visualizers.
  const barFrac = Math.min(0.999, Math.max(0, beatInBar / beatsPerBar));
  const beatIdx = Math.min(beatsPerBar - 1, Math.floor(beatInBar));

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
            {errorMsg ? (
              <span className="text-danger">{errorMsg}</span>
            ) : !bufferReady ? (
              <span className="text-accent animate-pulse">cargando…</span>
            ) : (
              `${Math.round(view.bpm)} BPM`
            )}{" "}
            · {diffConfig.label}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {bufferReady && (
            <LongPressButton
              onTap={handleRestart}
              onLongPress={handleResync}
              title="Reiniciar (R)  ·  Mantén pulsado para resincronizar"
              className="w-10 h-10 rounded-full card-dark flex items-center justify-center text-muted hover:text-accent transition-colors"
              ariaLabel="Reiniciar canción"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-3-6.7" />
                <polyline points="21 4 21 10 15 10" />
              </svg>
            </LongPressButton>
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
            className="w-10 h-10 rounded-full flex items-center justify-center bg-accent glow-accent"
          >
            {game.isPaused ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#0a0a0b">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#0a0a0b">
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
        clockRef={clockRef}
        onSkip={handleSkip}
        onSeekTo={(seconds) => {
          clockRef.current?.seekTo(seconds);
          lastBarRef.current = clockRef.current?.tick(beatsPerBar).bar ?? 0;
          syncView();
        }}
      />

      {/* ─── VISUALIZER (vinilo / carril / tipo) ─── */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-4 relative">
        <div className="w-full max-w-3xl">
          {vizMode === "vinilo" ? (
            <VinylViz
              barFrac={barFrac}
              beatIdx={beatIdx}
              beatsPerBar={beatsPerBar}
              isPaused={game.isPaused}
              queue={queue}
              prevWord={prevWord}
            />
          ) : vizMode === "carril" ? (
            <LaneViz
              barFrac={barFrac}
              beatIdx={beatIdx}
              beatsPerBar={beatsPerBar}
              isPaused={game.isPaused}
              queue={queue}
              prevWord={prevWord}
            />
          ) : (
            <TypeViz
              barFrac={barFrac}
              beatIdx={beatIdx}
              beatsPerBar={beatsPerBar}
              isPaused={game.isPaused}
              queue={queue}
              prevWord={prevWord}
            />
          )}
        </div>

        {/* Mode toggle — bottom of the stage so it never crowds the word */}
        <div className="absolute bottom-1 left-0 right-0">
          <VizToggle mode={vizMode} onChange={changeViz} />
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

// ─── LongPressButton — distinguishes tap vs hold ──────────────────
// Tap fires `onTap`; holding past `longPressMs` (default 500 ms) fires
// `onLongPress` and suppresses the tap. Used so the header "restart" button
// can also expose the rarer "resync to beat 1" without taking up screen
// real-estate for a second control.
function LongPressButton({
  onTap,
  onLongPress,
  longPressMs = 500,
  children,
  className,
  title,
  ariaLabel,
}: {
  onTap: () => void;
  onLongPress: () => void;
  longPressMs?: number;
  children: React.ReactNode;
  className?: string;
  title?: string;
  ariaLabel?: string;
}) {
  const timer = useRef<number | null>(null);
  const fired = useRef(false);

  const start = (e: React.PointerEvent) => {
    e.stopPropagation();
    fired.current = false;
    timer.current = window.setTimeout(() => {
      fired.current = true;
      onLongPress();
    }, longPressMs);
  };
  const cancel = () => {
    if (timer.current !== null) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };
  const end = (e: React.PointerEvent) => {
    e.stopPropagation();
    cancel();
    if (!fired.current) onTap();
  };

  return (
    <button
      type="button"
      title={title}
      aria-label={ariaLabel}
      className={className}
      onPointerDown={start}
      onPointerUp={end}
      onPointerLeave={cancel}
      onPointerCancel={cancel}
    >
      {children}
    </button>
  );
}

// ─── Transport — skip forward/back + draggable progress bar ──
// Two-row layout on narrow screens (time labels above the bar, skip
// buttons beside it) so an "00:47 / 01:36" pair never overlaps the bar.
function Transport({
  clockRef,
  onSkip,
  onSeekTo,
}: {
  clockRef: React.RefObject<MusicClock | null>;
  onSkip: (seconds: number) => void;
  onSeekTo: (seconds: number) => void;
}) {
  const barRef = useRef<HTMLDivElement | null>(null);
  // While the user is dragging, freeze the displayed position to the
  // drag value (otherwise the 4 Hz refresh from below would yank the
  // thumb away from the finger).
  const [dragSec, setDragSec] = useState<number | null>(null);
  // Clock position, sampled on an interval into state — we read the live
  // `clockRef` inside the interval callback, never during render.
  const [pos, setPos] = useState<{ cur: number; dur: number }>({ cur: 0, dur: 0 });

  // Local 4 Hz refresh so the progress bar advances with the audio.
  useEffect(() => {
    const t = setInterval(() => {
      const c = clockRef.current;
      setPos({ cur: c?.getCurrentTime() ?? 0, dur: c?.getDuration() ?? 0 });
    }, 250);
    return () => clearInterval(t);
  }, [clockRef]);

  const dur = pos.dur;
  const liveCur = pos.cur;
  const cur = dragSec !== null ? dragSec : liveCur;
  const pct = dur > 0 ? Math.min(100, (cur / dur) * 100) : 0;
  const fmt = (s: number) => {
    if (!isFinite(s) || s < 0) s = 0;
    const m = Math.floor(s / 60);
    const r = Math.floor(s % 60);
    return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
  };

  const secondsForClientX = (clientX: number): number | null => {
    const el = barRef.current;
    if (!el || dur <= 0) return null;
    const rect = el.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width;
    return Math.max(0, Math.min(dur - 0.1, x * dur));
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const s = secondsForClientX(e.clientX);
    if (s === null) return;
    // Capture pointer so drag continues even if the finger leaves the bar.
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragSec(s);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragSec === null) return;
    const s = secondsForClientX(e.clientX);
    if (s !== null) setDragSec(s);
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragSec === null) return;
    e.stopPropagation();
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* releasing a never-captured pointer throws on some browsers */
    }
    onSeekTo(dragSec);
    setDragSec(null);
  };

  return (
    <div
      className="px-4 pt-1 pb-2 flex flex-col gap-1.5 max-w-3xl mx-auto w-full"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Row 1: time labels — outside the bar so the bar always has room */}
      <div className="flex items-center justify-between text-[10px] text-muted font-mono tabular-nums px-10">
        <span>{fmt(cur)}</span>
        <span>{fmt(dur)}</span>
      </div>

      {/* Row 2: skip buttons + draggable bar */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onSkip(-10)}
          title="Retroceder 10s"
          className="text-muted hover:text-foreground p-1.5 rounded-lg card-dark shrink-0"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="11,19 2,12 11,5" fill="currentColor" />
            <polygon points="22,19 13,12 22,5" fill="currentColor" />
          </svg>
        </button>

        {/* Scrubbable + draggable progress bar. Padding-y enlarges the touch
            target while keeping the visible bar slim. */}
        <div
          ref={barRef}
          role="slider"
          aria-label="Posición de la canción"
          aria-valuemin={0}
          aria-valuemax={Math.round(dur)}
          aria-valuenow={Math.round(cur)}
          tabIndex={0}
          className="flex-1 py-3 cursor-pointer touch-none select-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div className="h-2 rounded-full bg-surface relative">
            <div
              className="absolute top-0 left-0 h-2 rounded-full bg-accent"
              style={{ width: `${pct}%` }}
            />
            <div
              className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-accent shadow-[0_0_8px_rgba(198,255,58,0.6)] transition-transform ${
                dragSec !== null ? "scale-125" : ""
              }`}
              style={{ left: `calc(${pct}% - 8px)` }}
            />
          </div>
        </div>

        <button
          onClick={() => onSkip(10)}
          title="Adelantar 10s"
          className="text-muted hover:text-foreground p-1.5 rounded-lg card-dark shrink-0"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="2,5 11,12 2,19" fill="currentColor" />
            <polygon points="13,5 22,12 13,19" fill="currentColor" />
          </svg>
        </button>
      </div>
    </div>
  );
}
