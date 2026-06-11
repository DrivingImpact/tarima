"use client";

/**
 * Game-screen beat visualizers. Three interchangeable modes:
 *   vinilo — turntable wheel, needle sweeps one rotation per bar
 *   carril — conveyor lane, upcoming words ride toward a fixed hit line
 *   tipo   — kinetic typography, the word itself pulses on every beat
 *
 * All three are driven by the SAME fractional clock position (0..1 inside the
 * current bar) so motion is continuous — no discrete jumps. The integer beat
 * index only triggers accents (dot flashes, word bounce).
 *
 * Rhyme awareness: any upcoming word whose `rhymeEnding` matches the active
 * word is the one the rapper must land — it renders in accent lime wherever
 * it appears.
 */

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Word } from "@/lib/types";

export type VizMode = "vinilo" | "carril" | "tipo";

const VIZ_STORAGE_KEY = "tarima:viz";

export function loadVizMode(): VizMode {
  if (typeof window === "undefined") return "tipo";
  const v = window.localStorage.getItem(VIZ_STORAGE_KEY);
  return v === "vinilo" || v === "carril" || v === "tipo" ? v : "tipo";
}

export function saveVizMode(mode: VizMode) {
  try {
    window.localStorage.setItem(VIZ_STORAGE_KEY, mode);
  } catch {
    /* private mode etc. — toggle still works for the session */
  }
}

export interface VizProps {
  /** 0..1 continuous position inside the current bar. */
  barFrac: number;
  /** Integer beat currently sounding (0-based). */
  beatIdx: number;
  beatsPerBar: number;
  isPaused: boolean;
  /** queue[0] = active word, queue[1..] = upcoming. */
  queue: (Word | null)[];
  /** Word that just left (previous bar) — used by carril for exit motion. */
  prevWord: Word | null;
}

/** Does this queue word rhyme with the active one? */
function rhymesWithActive(w: Word | null, active: Word | null): boolean {
  return !!(w && active && w !== active && w.rhymeEnding === active.rhymeEnding);
}

/** Responsive font size for the hero word — long words scale down. */
function heroFontSize(text: string | undefined): string {
  const len = Math.max(4, text?.length ?? 4);
  return `clamp(2.25rem, ${Math.min(4.5, 30 / len)}rem, 4.25rem)`;
}

// ─── Mode toggle ─────────────────────────────────────────────────────

const MODE_LABELS: Record<VizMode, string> = {
  vinilo: "Vinilo",
  carril: "Carril",
  tipo: "Tipo",
};

export function VizToggle({
  mode,
  onChange,
}: {
  mode: VizMode;
  onChange: (m: VizMode) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Estilo de visualización"
      className="flex justify-center gap-1"
      onClick={(e) => e.stopPropagation()}
    >
      {(Object.keys(MODE_LABELS) as VizMode[]).map((m) => (
        <button
          key={m}
          role="radio"
          aria-checked={mode === m}
          onClick={() => onChange(m)}
          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] transition-colors ${
            mode === m
              ? "bg-accent text-[#0a0a0b]"
              : "text-muted hover:text-foreground card-dark"
          }`}
        >
          {MODE_LABELS[m]}
        </button>
      ))}
    </div>
  );
}

// ─── Shared: upcoming-words strip with rhyme highlight ───────────────

function UpNext({ queue }: { queue: (Word | null)[] }) {
  const active = queue[0];
  const next = queue[1];
  const rest = queue.slice(2);
  return (
    <div className="text-center space-y-1.5 px-2">
      {/* The next word is what the rapper is already building toward —
          it gets real size, and lime if it's the rhyme to land. */}
      <div className="flex items-baseline justify-center gap-2">
        <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-muted/60">
          Sigue
        </span>
        <span
          className={`font-display uppercase tracking-tight text-2xl sm:text-3xl ${
            rhymesWithActive(next, active) ? "text-accent" : "text-foreground/85"
          }`}
        >
          {next?.text ?? "—"}
        </span>
        {rhymesWithActive(next, active) && (
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent/70">
            rima
          </span>
        )}
      </div>
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {rest.map((w, i) => (
          <span
            key={`${w?.text ?? "_"}-${i}`}
            className={`uppercase font-bold tracking-wide text-xs sm:text-sm ${
              rhymesWithActive(w, active)
                ? "text-accent/80"
                : i === 0
                ? "text-foreground/50"
                : "text-foreground/30"
            }`}
          >
            {w?.text ?? "—"}
            {i < rest.length - 1 && <span className="ml-2 text-muted/30">·</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── A · Vinilo ──────────────────────────────────────────────────────

export function VinylViz({ barFrac, beatIdx, beatsPerBar, isPaused, queue }: VizProps) {
  const active = queue[0];
  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <div className="relative" style={{ width: "min(62vw, 270px)", height: "min(62vw, 270px)" }}>
        {/* Platter */}
        <div
          className="absolute inset-0 rounded-full border border-white/10"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, #131314 28%, #0e0e0f 62%, #121213 100%)",
          }}
        />
        <div className="absolute rounded-full border border-white/[0.07]" style={{ inset: "22%" }} />
        <div className="absolute rounded-full border border-white/[0.05]" style={{ inset: "12%" }} />

        {/* Beat dots at quarter angles */}
        {Array.from({ length: beatsPerBar }).map((_, i) => {
          const ang = (i / beatsPerBar) * 2 * Math.PI - Math.PI / 2;
          const on = i === beatIdx && !isPaused;
          return (
            <div
              key={i}
              className={`absolute rounded-full transition-all duration-100 ${
                on ? "bg-accent scale-150 glow-accent" : "bg-[#2a2a2c]"
              }`}
              style={{
                width: 12,
                height: 12,
                left: `calc(50% + ${Math.cos(ang) * 50}% - 6px)`,
                top: `calc(50% + ${Math.sin(ang) * 50}% - 6px)`,
              }}
            />
          );
        })}

        {/* Needle — continuous rotation, one turn per bar */}
        {!isPaused && (
          <div
            className="absolute left-1/2 top-1/2 origin-bottom"
            style={{
              width: 2,
              height: "44%",
              marginLeft: -1,
              marginTop: "-44%",
              transform: `rotate(${barFrac * 360}deg)`,
              transformOrigin: "bottom center",
              background: "linear-gradient(to top, transparent, #c6ff3a)",
              filter: "drop-shadow(0 0 6px rgba(198,255,58,0.8))",
            }}
          />
        )}

        {/* Active word in the centre */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <p
            key={active?.text}
            className="text-accent font-display uppercase tracking-tight text-center leading-none break-words animate-word-reveal"
            style={{ fontSize: `calc(${heroFontSize(active?.text)} * 0.62)` }}
          >
            {active?.text ?? "—"}
          </p>
        </div>
      </div>

      <UpNext queue={queue} />
    </div>
  );
}

// ─── B · Carril ──────────────────────────────────────────────────────

export function LaneViz({ barFrac, beatIdx, beatsPerBar, isPaused, queue, prevWord }: VizProps) {
  const laneRef = useRef<HTMLDivElement | null>(null);
  const [laneW, setLaneW] = useState(0);
  const active = queue[0];

  useLayoutEffect(() => {
    const el = laneRef.current;
    if (!el) return;
    const update = () => setLaneW(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const CELL = laneW * 0.52; // one bar's width on the tape
  const HIT = laneW * 0.26; // hit-line x position

  // Cells: prev word exits left, active sits on the hit line, rest approach.
  const cells: { word: Word | null; slot: number }[] = [
    { word: prevWord, slot: -1 },
    ...queue.map((w, i) => ({ word: w, slot: i })),
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Hero word above the lane — the lane is for timing, reading happens here */}
      <p
        key={active?.text}
        className="text-accent font-display uppercase tracking-tight text-center leading-none break-words animate-word-reveal px-2"
        style={{ fontSize: heroFontSize(active?.text) }}
      >
        {active?.text ?? "—"}
      </p>

      <div ref={laneRef} className="relative w-full h-32 overflow-hidden">
        {/* Glow behind the played zone */}
        <div
          className="absolute left-0 top-0 bottom-0 pointer-events-none"
          style={{
            width: HIT,
            background: "linear-gradient(90deg, rgba(198,255,58,0.10), transparent)",
          }}
        />
        {/* Hit line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-accent z-10"
          style={{ left: HIT, boxShadow: "0 0 14px rgba(198,255,58,0.8)" }}
        />

        {/* The tape */}
        {laneW > 0 &&
          cells.map(({ word, slot }) => {
            // Continuous position: slot 0 sits AT the hit line when frac=0 and
            // drifts left as the bar plays out (the word is being used up).
            const x = HIT + (slot - barFrac) * CELL;
            if (x < -CELL || x > laneW + CELL) return null;
            const isLive = slot === 0;
            const rhymes = rhymesWithActive(word, active);
            return (
              <div
                key={`${word?.text ?? "_"}-${slot}`}
                className="absolute top-0 h-full"
                style={{ left: 0, width: CELL, transform: `translateX(${x}px)` }}
              >
                <div className="relative h-full border-l border-white/10">
                  <p
                    className={`absolute top-3 left-0 right-0 text-center font-display uppercase tracking-tight px-1 truncate transition-colors ${
                      isLive
                        ? "text-accent text-2xl"
                        : rhymes
                        ? "text-accent/75 text-xl"
                        : "text-foreground/40 text-xl"
                    }`}
                  >
                    {word?.text ?? ""}
                  </p>
                  {rhymes && !isLive && (
                    <p className="absolute top-11 left-0 right-0 text-center text-[8px] font-bold uppercase tracking-[0.25em] text-accent/60">
                      rima
                    </p>
                  )}
                  {/* Beat ticks for this bar */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-around">
                    {Array.from({ length: beatsPerBar }).map((_, b) => (
                      <span
                        key={b}
                        className={`w-1.5 h-5 rounded-full transition-all duration-100 ${
                          isLive && b === beatIdx && !isPaused
                            ? "bg-accent glow-accent"
                            : isLive && b < beatIdx
                            ? "bg-accent/35"
                            : "bg-[#2a2a2c]"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

// ─── D · Tipografía ──────────────────────────────────────────────────

export function TypeViz({ barFrac, beatIdx, beatsPerBar, isPaused, queue }: VizProps) {
  const wordRef = useRef<HTMLParagraphElement | null>(null);
  const flashRef = useRef<HTMLDivElement | null>(null);
  const active = queue[0];

  // Pulse the word + flash the backdrop on every integer beat change.
  useEffect(() => {
    if (isPaused) return;
    wordRef.current?.animate(
      [{ transform: "scale(1.06)" }, { transform: "scale(1)" }],
      { duration: 260, easing: "cubic-bezier(.2,.9,.3,1)" },
    );
    flashRef.current?.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 340,
      easing: "ease-out",
    });
  }, [beatIdx, isPaused]);

  return (
    <div className="relative w-full flex flex-col items-center gap-6 py-2">
      {/* Radial flash behind the word — fired per beat */}
      <div
        ref={flashRef}
        className="absolute inset-0 pointer-events-none opacity-0"
        style={{
          background:
            "radial-gradient(circle at 50% 38%, rgba(198,255,58,0.16), transparent 58%)",
        }}
      />

      <p
        ref={wordRef}
        key={active?.text}
        className="text-accent font-display uppercase tracking-tight text-center leading-none break-words animate-word-reveal px-2"
        style={{ fontSize: `calc(${heroFontSize(active?.text)} * 1.25)` }}
      >
        {active?.text ?? "—"}
      </p>

      {/* Bar progress — continuous glide, refills each bar */}
      <div className="w-52 h-1 rounded-full bg-[#222] overflow-hidden">
        <div
          className="h-full rounded-full bg-accent"
          style={{
            width: `${barFrac * 100}%`,
            boxShadow: "0 0 8px rgba(198,255,58,0.7)",
          }}
        />
      </div>

      {/* Beat dots */}
      <div className="flex gap-2.5 -mt-2">
        {Array.from({ length: beatsPerBar }).map((_, b) => (
          <span
            key={b}
            className={`w-2 h-2 rounded-full transition-all duration-100 ${
              b === beatIdx && !isPaused
                ? "bg-accent scale-150 glow-accent"
                : "bg-[#2a2a2c]"
            }`}
          />
        ))}
      </div>

      <UpNext queue={queue} />
    </div>
  );
}
