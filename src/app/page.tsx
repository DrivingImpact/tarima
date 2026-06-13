"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Difficulty,
  RhymeScheme,
} from "@/lib/types";
import { useBeatTracks } from "@/lib/use-beat-tracks";
import { useHydrated } from "@/lib/use-hydrated";
import { useAppStore } from "@/lib/store";
import { getWordsByDifficulty } from "@/lib/words";
import { FREE_DAILY_SESSIONS, isBeatLocked } from "@/lib/entitlements";
import { isNative } from "@/lib/purchases";
import { Paywall } from "@/components/Paywall";

type Step = "home" | "beat" | "difficulty" | "scheme";

export default function Home() {
  const router = useRouter();
  const {
    startGame,
    progress,
    entitlements,
    checkSession,
    recordSessionStart,
  } = useAppStore();
  const BEAT_TRACKS = useBeatTracks();
  // Mode is hard-coded to clásico while the other three are hidden from the
  // UI (see the gutted picker below). Restoring the picker also restores
  // this to `useState` — that's the entire revert.
  const selectedMode = "clasico" as const;
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty>("principiante");
  const [selectedScheme, setSelectedScheme] = useState<RhymeScheme>("AABB");
  const [selectedBeatIdx, setSelectedBeatIdx] = useState(0);
  const [step, setStep] = useState<Step>("home");
  const [previewingIdx, setPreviewingIdx] = useState<number | null>(null);
  const [paywall, setPaywall] = useState<"daily-cap" | "pro-beat" | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Entitlements depend on persisted state, so the SSR snapshot and the
  // hydrated client snapshot can disagree. Defer the chip until hydration to
  // avoid a flash of "6/6" for users who'd already burned their day.
  const mounted = useHydrated();

  const isPro = entitlements.isPro;
  const sessionsLeft = isPro
    ? null
    : Math.max(0, FREE_DAILY_SESSIONS - entitlements.dailyUsage.count);

  // Clamp the selected index if the list shrinks under us (e.g. you toggle
  // a row to active=FALSE while a session is being set up).
  const safeIdx = Math.min(selectedBeatIdx, Math.max(0, BEAT_TRACKS.length - 1));
  const selectedBeat = BEAT_TRACKS[safeIdx];

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePreview = useCallback(
    (idx: number) => {
      if (previewingIdx === idx) {
        audioRef.current?.pause();
        audioRef.current = null;
        setPreviewingIdx(null);
        return;
      }
      audioRef.current?.pause();
      const a = new Audio(BEAT_TRACKS[idx].src);
      a.loop = true;
      a.volume = 0.7;
      a.play().catch(() => {});
      audioRef.current = a;
      setPreviewingIdx(idx);
    },
    [previewingIdx, BEAT_TRACKS]
  );

  const handleStart = () => {
    const t = BEAT_TRACKS[safeIdx];

    // Entitlement gate: bounce free users hitting the cap or grabbing a Pro
    // beat. Done here (not on the beat-selector tap) so users always see the
    // full library — they're choosing what to upgrade FOR, not blind-picking.
    const check = checkSession(t);
    if (!check.ok && check.reason) {
      setPaywall(check.reason);
      return;
    }

    audioRef.current?.pause();
    audioRef.current = null;
    const beat = {
      id: t.id,
      name: t.name,
      bpm: t.bpm,
      style: t.style,
      timeSignature: t.timeSignature ?? ("4/4" as const),
      pattern: { kick: [], snare: [], hihat: [], openhat: [], perc: [], steps: 16 },
      src: t.src,
      bar1OffsetSec: t.bar1OffsetSec,
    };
    const wordPool = getWordsByDifficulty(selectedDifficulty);
    startGame(selectedMode, selectedDifficulty, selectedScheme, beat, wordPool);
    recordSessionStart(); // counts even if they bail — see store comment
    router.push("/juego");
  };

  // HOME
  if (step === "home") {
    return (
      <div className="app-screen flex flex-col justify-center px-4 py-8 max-w-lg mx-auto animate-fade-in">
        <div className="text-center mb-10">
          <h1 className="text-8xl font-display uppercase tracking-[0.01em] leading-none text-foreground">
            Tarima
          </h1>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="h-px w-6 bg-accent/50" />
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
              Donde nace el freestyle
            </p>
            <span className="h-px w-6 bg-accent/50" />
          </div>
          {/* Entitlement chip: Pro badge for subscribers, sessions-left
              counter + upgrade nudge for free. Tiny on purpose — it's
              context, not a CTA. Hidden until mount so SSR can't claim a
              stale count. */}
          {mounted && (
            <div className="mt-4 flex items-center justify-center gap-2">
              {isPro ? (
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-accent text-[#0a0a0b]">
                  ★ Pro
                </span>
              ) : (
                <Link
                  href="/pro"
                  className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-accent/40 text-accent hover:bg-accent/10 transition-colors"
                >
                  {sessionsLeft} / {FREE_DAILY_SESSIONS} sesiones hoy · Pro →
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Mode selector — temporarily hidden (2026-05-25).
            Only Clásico is exposed for the soft-launch; toque, generador,
            and barras-infinitas stay wired in the engine + types so a
            one-line revert here brings them back. `selectedMode` defaults
            to 'clasico' in component state, so removing the picker is the
            full extent of the change. */}

        {/* Stats */}
        {progress.totalSessions > 0 && (
          <div className="card-dark rounded-2xl p-4 mb-6">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-xl font-bold text-accent">
                  {progress.totalSessions}
                </p>
                <p className="text-[10px] text-muted uppercase tracking-wider">
                  Sesiones
                </p>
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">
                  {progress.totalBars}
                </p>
                <p className="text-[10px] text-muted uppercase tracking-wider">
                  Barras
                </p>
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">
                  {progress.currentStreak}
                </p>
                <p className="text-[10px] text-muted uppercase tracking-wider">
                  Racha
                </p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setStep("beat")}
          className="w-full py-4 rounded-2xl btn-primary text-lg"
        >
          Siguiente &rsaquo;
        </button>

        {/* Web-only footer: the APK link makes no sense inside the app
            itself, and native nav already exposes legal links. */}
        {mounted && !isNative() && (
          <div className="mt-8 text-center space-y-3">
            <a
              href="https://github.com/DrivingImpact/tarima/releases/latest/download/app-release.apk"
              className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-accent/40 text-accent hover:bg-accent/10 transition-colors"
            >
              ⤓ Descargar para Android (APK)
            </a>
            <div className="flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.15em] text-muted">
              <a
                href="https://instagram.com/tarimafreestyle"
                className="hover:text-accent transition-colors"
              >
                Instagram
              </a>
              <span aria-hidden>·</span>
              <Link href="/privacy" className="hover:text-accent transition-colors">
                Privacidad
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }

  // BEAT SELECTOR
  if (step === "beat") {
    return (
      <div className="app-screen h-dvh overflow-hidden flex flex-col px-4 pt-6 pb-6 max-w-lg mx-auto animate-slide-up">
        <div className="text-center mb-8">
          <h2 className="text-6xl font-display uppercase tracking-tight text-foreground">
            Beat
          </h2>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted mt-2">
            Instrumental
          </p>
        </div>

        <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted px-1 mb-3">
          🎧 Elegir instrumental
        </p>

        <div className="flex-1 min-h-0 space-y-2 overflow-y-auto mb-4">
          {BEAT_TRACKS.map((beat, idx) => {
            const selected = selectedBeatIdx === idx;
            const previewing = previewingIdx === idx;
            // Locked = Pro beat for a free user. Preview still works — the
            // point is to hear what they're paying for; the lock only kicks
            // in on the final "start" tap.
            const locked = isBeatLocked(beat, isPro);
            return (
              <div
                key={beat.id}
                role="button"
                tabIndex={0}
                onClick={() => {
                  if (!selected) {
                    setSelectedBeatIdx(idx);
                    if (!previewing) togglePreview(idx);
                  } else {
                    togglePreview(idx);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedBeatIdx(idx);
                    if (!previewing) togglePreview(idx);
                  }
                }}
                className={`w-full p-4 rounded-2xl text-left transition-all card-dark cursor-pointer ${
                  selected ? "card-selected" : "hover:border-white/10"
                } ${locked ? "ring-1 ring-accent/20" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Playing a preview IS choosing the song — users expect
                      // "the beat I'm hearing is the beat I'll get".
                      setSelectedBeatIdx(idx);
                      togglePreview(idx);
                    }}
                    className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm transition-all ${
                      previewing
                        ? "bg-accent text-[#0a0a0b] glow-accent"
                        : "bg-surface-hover text-muted"
                    }`}
                  >
                    {previewing ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5,3 19,12 5,21" />
                      </svg>
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate flex items-center gap-1.5">
                      {beat.name}
                      {locked && (
                        <span
                          className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-accent/15 text-accent"
                          title="Disponible con Pro"
                        >
                          ★ Pro
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted truncate">
                      {beat.style.replace("-", " ")} · {beat.bpm} BPM ·{" "}
                      {beat.timeSignature ?? "4/4"}
                      {beat.feel ? ` · ${beat.feel}` : ""}
                    </p>
                  </div>
                  {previewing && (
                    <div className="flex items-center gap-1 mr-1" aria-label="reproduciendo">
                      <span className="block w-1 h-3 rounded bg-accent animate-pulse" style={{ animationDelay: "0ms" }} />
                      <span className="block w-1 h-4 rounded bg-accent animate-pulse" style={{ animationDelay: "120ms" }} />
                      <span className="block w-1 h-2 rounded bg-accent animate-pulse" style={{ animationDelay: "240ms" }} />
                    </div>
                  )}
                  {selected && (
                    <div className="w-3 h-3 rounded-full bg-accent animate-glow-pulse" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected beat bar */}
        <div className="card-dark rounded-2xl p-3 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-accent uppercase tracking-wider font-bold">
                Seleccionado
              </p>
              <p className="font-bold text-sm">{selectedBeat.name}</p>
              <p className="text-xs text-muted">
                {selectedBeat.bpm} BPM · {selectedBeat.style.replace("-", " ")}
              </p>
            </div>
            <div className="flex gap-1.5">
              {selectedBeat.style.split("-").map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-1 rounded-full border border-accent/30 text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              audioRef.current?.pause();
              audioRef.current = null;
              setPreviewingIdx(null);
              setStep("home");
            }}
            className="px-6 py-4 rounded-2xl card-dark font-bold uppercase tracking-wide text-sm"
          >
            &lsaquo;
          </button>
          <button
            onClick={() => {
              audioRef.current?.pause();
              audioRef.current = null;
              setPreviewingIdx(null);
              setStep("difficulty");
            }}
            className="flex-1 py-4 rounded-2xl btn-primary text-lg"
          >
            Siguiente &rsaquo;
          </button>
        </div>
      </div>
    );
  }

  // DIFFICULTY
  if (step === "difficulty") {
    // Uniform graphite cards; the only colour is a small heat-ramp dot
    // (cool→hot = easy→brutal). Selection is the acid-lime ring.
    const difficulties: {
      key: Difficulty;
      label: string;
      subtitle: string;
      desc: string;
      dot: string;
    }[] = [
      {
        key: "principiante",
        label: "Fácil",
        subtitle: "Rimas simples",
        desc: "Palabras cortas y comunes. Perfecto para calentar.",
        dot: "bg-tier-1",
      },
      {
        key: "intermedio",
        label: "Medio",
        subtitle: "Vocabulario variado",
        desc: "Rimas de dos sílabas y más expresión.",
        dot: "bg-tier-2",
      },
      {
        key: "avanzado",
        label: "Difícil",
        subtitle: "Flow real",
        desc: "Rimas avanzadas y multisilabas. Para MCs de verdad.",
        dot: "bg-tier-3",
      },
      {
        key: "experto",
        label: "Experto",
        subtitle: "Sin piedad",
        desc: "Vocabulario extremo. Velocidad máxima. Sin ayuda.",
        dot: "bg-tier-4",
      },
    ];

    return (
      <div className="app-screen flex flex-col px-4 pt-6 pb-6 max-w-lg mx-auto animate-slide-up">
        {/* Header with selected beat */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[10px] text-muted uppercase tracking-wider font-bold">
              Beat seleccionado
            </p>
            <p className="font-bold text-sm">{selectedBeat.name}</p>
            <p className="text-xs text-muted">{selectedBeat.bpm} BPM</p>
          </div>
          <div className="px-3 py-1 rounded-full border border-accent/30 text-accent text-xs font-bold">
            ⚡ {selectedBeat.bpm}
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-6xl font-display uppercase tracking-tight text-foreground">
            Dificultad
          </h2>
          <p className="text-muted text-sm mt-2">
            ¿Hasta dónde llega el flow?
          </p>
        </div>

        <div className="flex-1 space-y-3 mb-6">
          {difficulties.map((d) => {
            const selected = selectedDifficulty === d.key;
            return (
              <button
                key={d.key}
                onClick={() => setSelectedDifficulty(d.key)}
                className={`w-full p-4 rounded-2xl text-left transition-all card-dark ${
                  selected ? "card-selected" : "hover:border-white/15"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${d.dot} flex-shrink-0`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-black uppercase tracking-wide">
                        {d.label}
                      </span>
                      {selected && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white font-bold uppercase">
                          Elegido
                        </span>
                      )}
                    </div>
                    <p className="font-semibold text-sm mt-0.5">{d.subtitle}</p>
                    <p className="text-xs text-muted mt-0.5">{d.desc}</p>
                  </div>
                  {selected && (
                    <div className="w-3 h-3 rounded-full bg-white/60 animate-glow-pulse" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setStep("beat")}
            className="px-6 py-4 rounded-2xl card-dark font-bold uppercase tracking-wide text-sm"
          >
            &lsaquo;
          </button>
          <button
            onClick={() => setStep("scheme")}
            className="flex-1 py-4 rounded-2xl btn-primary text-lg"
          >
            Siguiente &rsaquo;
          </button>
        </div>
      </div>
    );
  }

  // RHYME SCHEME
  return (
    <div className="app-screen flex flex-col px-4 pt-6 pb-6 max-w-lg mx-auto animate-slide-up">
      <div className="text-center mb-8">
        <h2 className="text-6xl font-display uppercase tracking-tight text-foreground">
          Esquema
        </h2>
        <p className="text-muted text-sm mt-2">
          ¿Cómo deben rimar las palabras?
        </p>
      </div>

      <div className="flex-1 space-y-3 mb-6">
        {(
          [
            {
              scheme: "AABB" as RhymeScheme,
              name: "Pareado",
              desc: "Rimas en pares: A-A-B-B. El clásico del freestyle.",
              example: "corazón / razón / fuego / juego",
            },
            {
              scheme: "ABAB" as RhymeScheme,
              name: "Cruzada",
              desc: "Rimas alternadas: A-B-A-B. Más flow y variación.",
              example: "vida / dolor / salida / calor",
            },
            {
              scheme: "ABBA" as RhymeScheme,
              name: "Abrazada",
              desc: "Rima envolvente: A-B-B-A. Estilo poético.",
              example: "mente / fuego / juego / gente",
            },
            {
              scheme: "AAAA" as RhymeScheme,
              name: "Mono-rima",
              desc: "Todo rima igual: A-A-A-A. Máxima intensidad.",
              example: "canción / razón / pasión / acción",
            },
          ] as const
        ).map(({ scheme, name, desc, example }) => {
          const selected = selectedScheme === scheme;
          return (
            <button
              key={scheme}
              onClick={() => setSelectedScheme(scheme)}
              className={`w-full p-4 rounded-2xl text-left transition-all card-dark ${
                selected ? "card-selected" : "hover:border-white/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono font-black text-accent text-lg w-14 text-center flex-shrink-0">
                  {scheme}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold uppercase tracking-wide text-sm">
                      {name}
                    </span>
                    {selected && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/20 text-accent font-bold uppercase">
                        Elegido
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted mt-0.5">{desc}</p>
                  <p className="text-[10px] text-muted/60 mt-1 italic">
                    {example}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setStep("difficulty")}
          className="px-6 py-4 rounded-2xl card-dark font-bold uppercase tracking-wide text-sm"
        >
          &lsaquo;
        </button>
        <button
          onClick={handleStart}
          className="flex-1 py-4 rounded-2xl btn-primary text-lg animate-pulse-glow"
        >
          Empezar 🎤
        </button>
      </div>

      {paywall && (
        <Paywall reason={paywall} onClose={() => setPaywall(null)} />
      )}
    </div>
  );
}
