/**
 * Honest training-stats — pure derivation from stored progress.
 *
 * These are TRAINING-VOLUME and BREADTH metrics only. The app drives the beat
 * and shows words, but it cannot hear the user, so it has NO idea whether they
 * actually kept up, stayed on beat, or rhymed well. We therefore never invent
 * "accuracy %", "flow score" or any performance metric. Every number here is
 * something the app genuinely observed: time spent, bars counted, breadth of
 * material practised.
 */

import type { DailyState, RhymeScheme, PromptKind, UserProgress } from "./types";

// Totals used for the "of N" breadth fractions.
export const TOTAL_SCHEMES = 4 as const; // RhymeScheme: AABB | ABAB | ABBA | AAAA
export const TOTAL_PROMPT_KINDS = 6 as const; // PromptKind: palabras | objeto | ...

export interface DisplayStats {
  // Volume.
  sesiones: number;
  barrasTotales: number;
  tiempoTotal: string; // "Xh Ym"
  tiempoTotalSegundos: number;
  // Breadth.
  palabrasEntrenadas: number;
  rangoBpm: { min: number; max: number } | null;
  esquemas: { practicados: number; total: number };
  tiposPrompt: { practicados: number; total: number };
  // Streaks.
  rachaActual: number;
  mejorRacha: number;
  // Reto del día.
  retoRacha: number;
  mejorReto: number;
}

/** Seconds → "Xh Ym" (or "Ym" under an hour, "0m" if none). */
export function formatDuration(seconds: number): string {
  const safe = Number.isFinite(seconds) && seconds > 0 ? Math.floor(seconds) : 0;
  const totalMin = Math.floor(safe / 60);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export function computeStats(
  progress: UserProgress,
  daily: DailyState,
): DisplayStats {
  const min = progress.bpmTrainedMin;
  const max = progress.bpmTrainedMax;
  const rangoBpm =
    typeof min === "number" && typeof max === "number"
      ? { min, max }
      : null;

  // Defensive: schemesPracticed / promptKindsPracticed should already be
  // unique, but de-dupe so the fraction can never exceed the total.
  const uniqSchemes = new Set<RhymeScheme>(progress.schemesPracticed ?? []);
  const uniqPrompts = new Set<PromptKind>(progress.promptKindsPracticed ?? []);

  return {
    sesiones: progress.totalSessions,
    barrasTotales: progress.totalBars,
    tiempoTotal: formatDuration(progress.totalSeconds),
    tiempoTotalSegundos: progress.totalSeconds,
    palabrasEntrenadas: (progress.vocabUsed ?? []).length,
    rangoBpm,
    esquemas: {
      practicados: Math.min(uniqSchemes.size, TOTAL_SCHEMES),
      total: TOTAL_SCHEMES,
    },
    tiposPrompt: {
      practicados: Math.min(uniqPrompts.size, TOTAL_PROMPT_KINDS),
      total: TOTAL_PROMPT_KINDS,
    },
    rachaActual: progress.currentStreak,
    mejorRacha: progress.longestStreak,
    retoRacha: daily.streak,
    mejorReto: daily.bestBars,
  };
}
