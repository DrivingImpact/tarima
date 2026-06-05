"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { billingAvailable, initPurchases, isProActive } from "@/lib/purchases";

/**
 * Configures RevenueCat on launch (native only) and mirrors the live "pro"
 * entitlement into the local store, so the rest of the app's gating
 * (`entitlements.isPro`) stays the single source of truth at the UI layer
 * while RevenueCat remains authoritative for billing. No-op on the web.
 */
export function PurchasesInit() {
  const setPro = useAppStore((s) => s.setPro);

  useEffect(() => {
    if (!billingAvailable()) return;
    let active = true;
    void (async () => {
      await initPurchases();
      const pro = await isProActive();
      if (active) setPro(pro);
    })();
    return () => {
      active = false;
    };
  }, [setPro]);

  return null;
}
