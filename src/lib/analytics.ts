"use client";

/**
 * Analytics — anonymous, privacy-first usage telemetry via Aptabase.
 *
 * What this is and isn't:
 *   • Anonymous. No accounts, no names, no email, no advertising id, no
 *     cross-app tracking. Aptabase derives a per-device anonymous session and
 *     computes DAU / D1 / D7 retention from it — that is the whole point here,
 *     to answer "does the bucket leak" before pouring effort into growth.
 *   • Opt-out by config. With no NEXT_PUBLIC_APTABASE_KEY set, every function
 *     here is a no-op, so dev/local builds and forks send nothing.
 *   • Never breaks the app. All calls are wrapped; a network/SDK failure is
 *     swallowed.
 *
 * Disclosure: because this sends anonymous app-activity off device, it is
 * declared in /privacy and in the store data-safety forms (see
 * store/app-store-submission.md and store/play-submission.md). Keep those in
 * sync if events change.
 */

import { init, trackEvent } from "@aptabase/web";

const KEY = process.env.NEXT_PUBLIC_APTABASE_KEY ?? "";
// Optional: set only for a self-hosted Aptabase instance (key starts A-SH-).
const HOST = process.env.NEXT_PUBLIC_APTABASE_HOST ?? "";

let started = false;

/** True when an Aptabase key is configured. Everything no-ops otherwise. */
export function analyticsEnabled(): boolean {
  return KEY.length > 0;
}

/** Initialise Aptabase once per launch. No-op without a key. */
export function initAnalytics(): void {
  if (!analyticsEnabled() || started) return;
  started = true;
  try {
    init(KEY, HOST ? { host: HOST } : undefined);
  } catch {
    // SDK init failed (bad key / offline) — analytics simply stays off.
  }
}

/** Record an anonymous event. No PII in `props` — keep values categorical
 *  (mode, difficulty) or numeric (counts), never free text or identifiers. */
export function track(
  name: string,
  props?: Record<string, string | number | boolean>,
): void {
  if (!analyticsEnabled()) return;
  try {
    trackEvent(name, props);
  } catch {
    // Never let a telemetry hiccup surface to the user.
  }
}
