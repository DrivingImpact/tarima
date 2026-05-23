/**
 * Entitlements: who can do what.
 *
 * Free tier rules live here so they can't drift between the home page,
 * the game page, and the paywall. Treat this file as the spec — if a
 * limit changes, change it here and only here.
 *
 * The Pro flag itself is held on the `progress` slice (see `store.ts`)
 * so it persists across reloads alongside the rest of user state.
 */

import type { BeatTrack } from "./beat-tracks";

/** Number of completed-or-started sessions a free user can run per day,
 *  resetting at local midnight. Quoted on the /pro page — keep in sync. */
export const FREE_DAILY_SESSIONS = 6;

/** Price strings used on the /pro page + paywall. Source of truth lives in
 *  the App Store / Play Store / Stripe products themselves; these are the
 *  values we show before the platform sheet opens. Region-priced via
 *  RevenueCat at runtime — these are the US-baseline anchors. */
export const PRO_PRICE = {
  monthly: "$2.50",
  yearly: "$15",
  // Months-per-year vs straight monthly: $2.50 × 12 = $30, so $15/yr
  // is 50% off the monthly path. Used in the "ahorra 50%" framing.
  yearlySavingsPct: 50,
} as const;

/** Local-midnight day string, e.g. "2026-05-23". Used to roll the daily
 *  counter at the user's local midnight, not UTC midnight — a Mexico City
 *  user shouldn't get an extra ration just because London woke up first. */
export function todayLocalStr(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** True if this beat requires Pro. Bundled beats and CSV-sourced beats both
 *  set the same `pro` field so the call site doesn't need to care which. */
export function isBeatLocked(beat: BeatTrack, isPro: boolean): boolean {
  if (isPro) return false;
  return beat.pro === true;
}

export interface DailyUsage {
  /** Local-date string the counter is currently scoped to. Re-roll when
   *  this stops matching `todayLocalStr()`. */
  day: string;
  /** Sessions started today. We count on START (not completion) — quitters
   *  shouldn't get infinite retries. */
  count: number;
}

export interface SessionCheck {
  ok: boolean;
  /** When ok=false: why we blocked. UI uses this to pick the paywall copy. */
  reason?: "daily-cap" | "pro-beat";
  /** Sessions left today (after this check) — for the home-screen counter. */
  remaining: number;
}

/** Decide whether a user can start a session right now with the given beat.
 *  Pure function — no side effects, no clock reads except via `usage.day`
 *  (which the caller is expected to have rolled with `rollUsage` first). */
export function canStartSession(
  beat: BeatTrack,
  isPro: boolean,
  usage: DailyUsage,
): SessionCheck {
  if (isPro) {
    return { ok: true, remaining: Infinity };
  }
  if (isBeatLocked(beat, isPro)) {
    return {
      ok: false,
      reason: "pro-beat",
      remaining: Math.max(0, FREE_DAILY_SESSIONS - usage.count),
    };
  }
  if (usage.count >= FREE_DAILY_SESSIONS) {
    return { ok: false, reason: "daily-cap", remaining: 0 };
  }
  return {
    ok: true,
    remaining: FREE_DAILY_SESSIONS - usage.count - 1,
  };
}

/** Return a usage object scoped to today. If the input is from yesterday
 *  (or never), reset the counter. Caller persists the result. */
export function rollUsage(prev: DailyUsage | null | undefined): DailyUsage {
  const today = todayLocalStr();
  if (!prev || prev.day !== today) {
    return { day: today, count: 0 };
  }
  return prev;
}
