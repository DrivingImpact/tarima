"use client";

import { useEffect, useRef } from "react";
import { useAppStore } from "@/lib/store";
import { requestReview } from "@/lib/review";
import { initAnalytics, track } from "@/lib/analytics";

/** Ask for a store review once the user has completed this many sessions —
 *  enough that they've felt the value, before the engagement decays. */
const REVIEW_AFTER_SESSIONS = 5;

/**
 * Records app-opens (local D1/D7 inputs + anonymous open event), fires the
 * one-time native review prompt after the 5th completed session, and emits an
 * anonymous `session_completed` event whenever the session count rises. All
 * telemetry is anonymous and no-ops without an Aptabase key. Mounted once in
 * the root layout.
 */
export function RetentionInit() {
  const recordAppOpen = useAppStore((s) => s.recordAppOpen);
  const markReviewPrompted = useAppStore((s) => s.markReviewPrompted);
  const totalSessions = useAppStore((s) => s.progress.totalSessions);
  const reviewPrompted = useAppStore((s) => s.meta.reviewPrompted);
  const isPro = useAppStore((s) => s.entitlements.isPro);

  // Previous session count, to detect a *new* completion (vs. hydration / the
  // initial mount). Starts null so the first observed value isn't mistaken for
  // a session that just happened.
  const prevSessions = useRef<number | null>(null);

  // One app-open per launch (the store dedups within a calendar day). Runs
  // after hydration, so it sees the persisted first-open date. The anonymous
  // open event is what Aptabase turns into DAU / D1 / D7 retention.
  useEffect(() => {
    initAnalytics();
    recordAppOpen();
    track("app_opened");
  }, [recordAppOpen]);

  // Emit an anonymous session_completed whenever the persisted count increases.
  useEffect(() => {
    const prev = prevSessions.current;
    prevSessions.current = totalSessions;
    if (prev !== null && totalSessions > prev) {
      track("session_completed", { total: totalSessions, pro: isPro });
    }
  }, [totalSessions, isPro]);

  // Prompt for a review exactly once, the moment the session count crosses the
  // threshold (this re-runs right after `endSession`, on the results view).
  useEffect(() => {
    if (reviewPrompted || totalSessions < REVIEW_AFTER_SESSIONS) return;
    // Mark first so a re-render or a no-op (web / OS rate-limit) can't double-ask.
    markReviewPrompted();
    void requestReview();
  }, [totalSessions, reviewPrompted, markReviewPrompted]);

  return null;
}
