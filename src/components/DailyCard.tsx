"use client";

/**
 * Presentational card for the home screen — shows today's reto del día.
 * Pure presentation: all data comes in via props, the parent owns the store
 * and the navigation. No store access, no logic here beyond formatting.
 */

import {
  DIFFICULTY_CONFIG,
  PROMPT_KIND_CONFIG,
  type DailyChallengeDef,
  type DailyState,
} from "@/lib/types";

interface DailyCardProps {
  challenge: DailyChallengeDef;
  daily: DailyState;
  done: boolean;
  beatName?: string;
  onStart: () => void;
}

export default function DailyCard({
  challenge,
  daily,
  done,
  beatName,
  onStart,
}: DailyCardProps) {
  const prompt = PROMPT_KIND_CONFIG[challenge.promptKind];
  const difficulty = DIFFICULTY_CONFIG[challenge.difficulty];

  return (
    <div className="card-dark rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
          Reto del día
        </p>
        <div className="flex items-center gap-1 text-xs font-bold text-foreground">
          <span aria-hidden>🔥</span>
          <span>{daily.streak}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl" aria-hidden>
          {prompt.icon}
        </span>
        <div className="min-w-0">
          <p className="font-display uppercase tracking-tight text-2xl leading-[0.9] text-foreground truncate">
            {prompt.label}
          </p>
          {beatName ? (
            <p className="text-xs text-muted truncate">{beatName}</p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        <span className="px-2.5 py-1 rounded-full bg-white/5 text-[10px] uppercase tracking-wider text-muted">
          {difficulty.label}
        </span>
        <span className="px-2.5 py-1 rounded-full bg-white/5 text-[10px] uppercase tracking-wider text-muted">
          Esquema {challenge.scheme}
        </span>
      </div>

      <button
        type="button"
        onClick={onStart}
        disabled={done}
        className={
          done
            ? "w-full py-3 rounded-2xl card-selected text-accent text-sm font-bold uppercase tracking-wider cursor-default"
            : "w-full py-3 rounded-2xl btn-primary text-sm font-bold uppercase tracking-wider"
        }
      >
        {done ? "✓ Hecho hoy" : "Empezar reto"}
      </button>
    </div>
  );
}
