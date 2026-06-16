"use client";

/**
 * In-app review — thin, platform-aware wrapper over the native store review
 * sheet (Play In-App Review on Android, SKStoreReviewController on iOS). No-op
 * on the web. Never throws: a missing plugin, an unbuilt native shell, or the
 * OS silently declining to show the sheet (it rate-limits how often it appears)
 * all degrade to a quiet no-op so a failed review never disrupts the app.
 *
 * Policy lives in the caller (store: prompt once, after 5 completed sessions).
 * This module only knows HOW to ask, not WHEN.
 */

import { Capacitor } from "@capacitor/core";

/** Ask the OS to show the native review sheet. Resolves whether or not the
 *  sheet actually appeared — the system decides, and we never surface errors. */
export async function requestReview(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  try {
    const { InAppReview } = await import("@capacitor-community/in-app-review");
    await InAppReview.requestReview();
  } catch {
    // Plugin absent / store unavailable / OS declined — intentionally ignored.
  }
}
