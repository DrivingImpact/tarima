/**
 * Reto del día (daily challenge) — pure deterministic logic.
 *
 * NO React, no side effects beyond reading today's local date. The whole point
 * is determinism: every user gets the SAME challenge on the same calendar day,
 * because everything is derived from a hash of the local date string. Calling
 * any of these twice on the same day returns the same result.
 */

import { getBeatTracks } from "./beat-source";
import type {
  DailyChallengeDef,
  DailyState,
  Difficulty,
  PromptKind,
  RhymeScheme,
} from "./types";

// ── Date ─────────────────────────────────────────────────────────
// Local calendar date as 'YYYY-MM-DD'. Local (not UTC) so the reto rolls over
// at the user's midnight, matching how the daily streak is tracked elsewhere.
export function localDateStr(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// ── Seeded RNG ───────────────────────────────────────────────────
// 32-bit string hash (FNV-1a style) → numeric seed.
function hashStr(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  // Force unsigned 32-bit.
  return h >>> 0;
}

// mulberry32 — tiny, fast, well-distributed PRNG. Returns a generator that
// yields floats in [0, 1). Same seed → same sequence, on every device.
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ── Choice tables ────────────────────────────────────────────────
const SCHEMES: RhymeScheme[] = ["AABB", "ABAB", "ABBA", "AAAA"];
const DIFFICULTIES: Difficulty[] = [
  "principiante",
  "intermedio",
  "avanzado",
  "experto",
];
const PROMPT_KINDS: PromptKind[] = [
  "palabras",
  "objeto",
  "emocion",
  "lugar",
  "situacion",
  "tematica",
];

function pick<T>(rng: () => number, arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

// ── Public API ───────────────────────────────────────────────────

/**
 * Deterministic reto for the given local date (defaults to today). beatId,
 * scheme, difficulty and promptKind are all derived from the date seed, so the
 * challenge is identical for every user and stable across calls on the same day.
 */
export function getTodayChallenge(date: string = localDateStr()): DailyChallengeDef {
  const seed = hashStr(date);
  const rng = mulberry32(seed);

  // Beat: pick from the available catalogue deterministically. getBeatTracks()
  // can vary by user (remote sheet vs bundled fallback), so we guard for an
  // empty list and pick by index from whatever is present.
  const tracks = getBeatTracks();
  const beatId =
    tracks.length > 0 ? pick(rng, tracks).id : "";

  const scheme = pick(rng, SCHEMES);
  const difficulty = pick(rng, DIFFICULTIES);
  const promptKind = pick(rng, PROMPT_KINDS);

  return { date, beatId, scheme, difficulty, promptKind, seed };
}

/** True if the daily reto has already been completed today (local date). */
export function isDailyDoneToday(daily: DailyState): boolean {
  return daily.lastCompletedDate === localDateStr();
}
