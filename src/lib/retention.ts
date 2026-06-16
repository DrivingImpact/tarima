/**
 * Retention data layer — pure helpers over the locally-stored "meta" slice.
 *
 * All of this lives on-device only (localStorage via the zustand persist
 * middleware). Nothing here sends anything anywhere — that keeps the app's
 * "no personal data collected" promise intact. These functions just RECORD
 * the raw facts (first-open date, which calendar days the app was opened) so
 * that, if/when an anonymous aggregate-analytics path is added, the inputs to
 * a D1/D7 retention curve already exist. They're also what the review-prompt
 * gate and any future local "you've practised N of the last 7 days" UI read.
 *
 * Kept as pure functions (no store, no Date.now in signatures) so the dedup /
 * cap / cohort logic is trivially testable and deterministic.
 */

/** Keep at most this many distinct active days. ~1 year is plenty for D1/D7/D30
 *  cohort math and bounds localStorage growth. */
export const ACTIVE_DAYS_CAP = 400;

export interface MetaState {
  /** YYYY-MM-DD of the very first app open. Set once, never overwritten. */
  firstOpenDate: string | null;
  /** Distinct YYYY-MM-DD calendar days the app was opened, ascending, capped. */
  activeDays: string[];
  /** True once the native review sheet has been requested (we ask at most once). */
  reviewPrompted: boolean;
}

export const initialMeta: MetaState = {
  firstOpenDate: null,
  activeDays: [],
  reviewPrompted: false,
};

/** Fold "the app was opened on `today`" into prior meta. Sets firstOpenDate on
 *  the first ever open, adds `today` to activeDays if not already present, and
 *  caps the list to the most recent ACTIVE_DAYS_CAP days. Idempotent within a
 *  day: calling it twice on the same `today` is a no-op beyond the first. */
export function recordOpen(meta: MetaState, today: string): MetaState {
  const firstOpenDate = meta.firstOpenDate ?? today;
  if (meta.activeDays.includes(today)) {
    // Already counted today — only firstOpenDate could need backfilling.
    return firstOpenDate === meta.firstOpenDate
      ? meta
      : { ...meta, firstOpenDate };
  }
  const activeDays = [...meta.activeDays, today].sort().slice(-ACTIVE_DAYS_CAP);
  return { ...meta, firstOpenDate, activeDays };
}

/** Day-index (0-based) of a date relative to the install date, or null if we
 *  can't compute it. Day 0 = install day, so a return of 1 means a D1 return,
 *  7 means D7, etc. Pure; both args are YYYY-MM-DD. */
export function dayIndex(firstOpenDate: string | null, date: string): number | null {
  if (!firstOpenDate) return null;
  const ms = Date.parse(date) - Date.parse(firstOpenDate);
  if (Number.isNaN(ms)) return null;
  return Math.round(ms / 86_400_000);
}

/** Did this device return on day N after install? (e.g. retainedOnDay(meta, 1)
 *  for D1, 7 for D7.) Pure read over the recorded active days. */
export function retainedOnDay(meta: MetaState, n: number): boolean {
  return meta.activeDays.some((d) => dayIndex(meta.firstOpenDate, d) === n);
}
