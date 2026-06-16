"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { requestReview } from "@/lib/review";

/** Ask for a store review once the user has completed this many sessions —
 *  enough that they've felt the value, before the engagement decays. */
const REVIEW_AFTER_SESSIONS = 5;

/**
 * Records app-opens (for D1/D7 retention inputs) and fires the one-time native
 * review prompt after the 5th completed session. Both are on-device only and
 * no-op safely on the web. Mounted once in the root layout.
 */
export function RetentionInit() {
  const recordAppOpen = useAppStore((s) => s.recordAppOpen);
  const markReviewPrompted = useAppStore((s) => s.markReviewPrompted);
  const totalSessions = useAppStore((s) => s.progress.totalSessions);
  const reviewPrompted = useAppStore((s) => s.meta.reviewPrompted);

  // One app-open per launch (the store dedups within a calendar day). Runs
  // after hydration, so it sees the persisted first-open date.
  useEffect(() => {
    recordAppOpen();
  }, [recordAppOpen]);

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
