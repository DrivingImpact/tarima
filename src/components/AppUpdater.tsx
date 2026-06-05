"use client";

import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";

/**
 * Tells Capgo the current web bundle booted OK (`notifyAppReady`). Required so
 * OTA updates aren't auto-rolled-back. Safe to call even while autoUpdate is
 * off (it just marks the active bundle good). No-op on the web.
 *
 * Once a Capgo project exists (`npx @capgo/cli init`) and autoUpdate is on in
 * capacitor.config, JS/UI fixes ship with `npx @capgo/cli bundle upload` — no
 * Play release. Dynamic import so the plugin is never evaluated during SSR /
 * static export.
 */
export function AppUpdater() {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    void (async () => {
      try {
        const { CapacitorUpdater } = await import("@capgo/capacitor-updater");
        await CapacitorUpdater.notifyAppReady();
      } catch {
        /* plugin unavailable (e.g. web) — ignore */
      }
    })();
  }, []);

  return null;
}
