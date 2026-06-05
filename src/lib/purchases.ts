"use client";

/**
 * Purchases — thin, platform-aware wrapper over RevenueCat (Google Play
 * Billing on Android). Web builds never touch RevenueCat; the /pro page keeps
 * its Stripe-link path there. Native builds (Capacitor) drive real Play
 * subscriptions through here.
 *
 * Setup needed before this works end-to-end (see the launch checklist):
 *   1. RevenueCat project → add the Android app (package com.tarima.freestyle).
 *   2. Create Play Console subscriptions (suggested product IDs):
 *        tarima_pro_monthly, tarima_pro_yearly
 *      and attach them to a RevenueCat Offering "default" with packages
 *      $rc_monthly / $rc_annual.
 *   3. Create an Entitlement "pro" and attach both products.
 *   4. Put the RevenueCat *Android public SDK key* in env:
 *        NEXT_PUBLIC_RC_ANDROID_KEY=goog_xxx
 *
 * Until the key is set, native falls back to "billing unavailable" (the UI
 * shows the same coming-soon path as web), so nothing 404s mid-upgrade.
 */

import { Capacitor } from "@capacitor/core";
import type { PurchasesPackage } from "@revenuecat/purchases-capacitor";

const ANDROID_KEY = process.env.NEXT_PUBLIC_RC_ANDROID_KEY ?? "";
const ENTITLEMENT_ID = "pro";

/** True inside the Capacitor native shell (Android/iOS), false on the web. */
export function isNative(): boolean {
  return Capacitor.isNativePlatform();
}

/** True when native billing is actually configured (native + key present). */
export function billingAvailable(): boolean {
  return isNative() && ANDROID_KEY.length > 0;
}

let configured = false;

/** Configure RevenueCat once per app launch. No-op on web / without a key. */
export async function initPurchases(): Promise<void> {
  if (!billingAvailable() || configured) return;
  const { Purchases, LOG_LEVEL } = await import("@revenuecat/purchases-capacitor");
  await Purchases.setLogLevel({ level: LOG_LEVEL.WARN });
  await Purchases.configure({ apiKey: ANDROID_KEY });
  configured = true;
}

/** Is the "pro" entitlement currently active for this user? */
export async function isProActive(): Promise<boolean> {
  if (!billingAvailable()) return false;
  try {
    await initPurchases();
    const { Purchases } = await import("@revenuecat/purchases-capacitor");
    const { customerInfo } = await Purchases.getCustomerInfo();
    return Boolean(customerInfo.entitlements.active[ENTITLEMENT_ID]);
  } catch {
    return false;
  }
}

export interface ProPackage {
  id: string;
  priceString: string;
  period: "monthly" | "annual" | "other";
  /** Opaque RevenueCat package handed back to `purchase()`. */
  rcPackage: PurchasesPackage;
}

/** Offerings → the Pro packages to show on /pro (native only). */
export async function getProPackages(): Promise<ProPackage[]> {
  if (!billingAvailable()) return [];
  try {
    await initPurchases();
    const { Purchases } = await import("@revenuecat/purchases-capacitor");
    const offerings = await Purchases.getOfferings();
    const current = offerings.current;
    if (!current) return [];
    return current.availablePackages.map((p) => ({
      id: p.identifier,
      priceString: p.product.priceString,
      period:
        p.packageType === "ANNUAL"
          ? "annual"
          : p.packageType === "MONTHLY"
            ? "monthly"
            : "other",
      rcPackage: p,
    }));
  } catch {
    return [];
  }
}

/** Run a purchase. Returns true if "pro" is active afterwards. Throws on a
 *  real error; returns false on user-cancel. */
export async function purchase(pkg: ProPackage): Promise<boolean> {
  if (!billingAvailable()) return false;
  const { Purchases } = await import("@revenuecat/purchases-capacitor");
  try {
    const res = await Purchases.purchasePackage({ aPackage: pkg.rcPackage });
    return Boolean(res.customerInfo.entitlements.active[ENTITLEMENT_ID]);
  } catch (e) {
    if (e && typeof e === "object" && "userCancelled" in e && e.userCancelled) {
      return false;
    }
    throw e;
  }
}

/** Restore prior purchases (store requirement). Returns true if "pro" active. */
export async function restore(): Promise<boolean> {
  if (!billingAvailable()) return false;
  try {
    const { Purchases } = await import("@revenuecat/purchases-capacitor");
    const { customerInfo } = await Purchases.restorePurchases();
    return Boolean(customerInfo.entitlements.active[ENTITLEMENT_ID]);
  } catch {
    return false;
  }
}
