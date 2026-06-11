"use client";

import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";

/**
 * Native-shell chrome setup: hides the Android status bar so the app runs
 * full-bleed (no battery / clock / signal icons over our UI). No-op on web.
 * Dynamic import so the plugin never evaluates during static export.
 */
export function NativeChrome() {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    void (async () => {
      try {
        const { StatusBar } = await import("@capacitor/status-bar");
        await StatusBar.hide();
      } catch {
        /* plugin unavailable — ignore */
      }
    })();
  }, []);

  return null;
}
