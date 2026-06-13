# Tarima Pro billing — click-by-click setup

Turns on real Play subscriptions via RevenueCat. The app already speaks
RevenueCat (`src/lib/purchases.ts`); it just needs the products created and the
key wired. The contract the code expects, do not rename these:

| Thing | Exact value |
|---|---|
| Entitlement | `pro` |
| Offering | `default` (the "current" offering) |
| Monthly product / package | `tarima_pro_monthly` → `$rc_monthly` |
| Yearly product / package | `tarima_pro_yearly` → `$rc_annual` |
| Android package name | `com.tarima.freestyle` |
| Env var (public SDK key) | `NEXT_PUBLIC_RC_ANDROID_KEY=goog_…` |
| Prices (anchors in `entitlements.ts`) | $2.50/mo, $15/yr |

Order matters: **Play subscriptions must exist before RevenueCat can import
them.** Do Play first, then RevenueCat, then the env + rebuild.

---

## A. Play Console — create the subscriptions
(You can do this once the app exists in Console and the first AAB is uploaded
to a track; products don't need the app *published*, but the app must be created
and the AAB uploaded at least to Internal testing so Play knows the package.)

1. Console → your app → **Monetize → Products → Subscriptions** → **Create
   subscription**.
2. **Monthly:**
   - Product ID: `tarima_pro_monthly`  (immutable once saved — type it exactly)
   - Name: `Tarima Pro (mensual)`
   - Add a **base plan**: ID `monthly`, billing period **1 month**,
     auto-renewing. Price ≈ **$2.50 USD** (set your local equivalents; Play
     auto-converts other markets, review them).
3. **Yearly:** Create subscription again:
   - Product ID: `tarima_pro_yearly`
   - Name: `Tarima Pro (anual)`
   - Base plan ID `annual`, billing period **1 year**, auto-renewing.
     Price ≈ **$15 USD**.
4. Activate both base plans (they must be **Active**, not draft).
5. **License testing** so you can buy without being charged:
   Console → **Setup → License testing** → add your Google account as a tester.
   Testers get test purchases on internal/closed tracks.

## B. RevenueCat — project + import
1. revenuecat.com → create a project (e.g. `Tarima`).
2. **Add app → Google Play Store.** Package name: `com.tarima.freestyle`.
3. **Service account / Play credentials:** RevenueCat needs a Google Cloud
   service-account JSON with Play access, then grant that account permissions in
   Play Console (**Users & permissions → Invite → service account email →
   Financial data: view; Manage orders**). RevenueCat's "Connect to Play" wizard
   walks this; follow it. Without it, server-side receipt validation/renewals
   won't sync.
4. **Products:** Products tab → **Import** (or add) → pull in
   `tarima_pro_monthly` and `tarima_pro_yearly` from Play.
5. **Entitlement:** Entitlements → **+ New** → identifier `pro` → attach **both**
   products. (The code checks `entitlements.active["pro"]`.)
6. **Offering:** Offerings → make one with identifier `default` (mark it the
   current offering) → add two packages:
   - `$rc_monthly` → `tarima_pro_monthly`
   - `$rc_annual`  → `tarima_pro_yearly`
   The code maps packageType ANNUAL/MONTHLY to its UI, so use the standard
   package types.
7. **API key:** Project → **API keys** → copy the **Android / Google public
   SDK key** (starts `goog_`). This is the public app key, safe to ship — not a
   secret key.

## C. Wire it + rebuild
1. Put the key in the build env. `next.config` static export reads
   `NEXT_PUBLIC_*` at build time, so it must be present when you build:
   ```bash
   echo 'NEXT_PUBLIC_RC_ANDROID_KEY=goog_xxxxxxxx' >> ~/rima-juego/.env.local
   ```
   (Also add it to the Vercel project env if you want the web /pro page aware,
   though web keeps the Stripe path.)
2. Bump the version (every Play upload needs a new code):
   in `android/app/build.gradle` set `versionCode 9`, `versionName "1.4.0"`.
3. Rebuild signed:
   ```bash
   cd ~/rima-juego
   export JAVA_HOME=/opt/homebrew/opt/openjdk@21 ANDROID_HOME=/opt/homebrew/share/android-commandlinetools
   npm run build && npx cap sync android
   cd android && ./gradlew bundleRelease
   ```
   Output: `android/app/build/outputs/bundle/release/app-release.aab`.
4. Upload that AAB to an **Internal testing** track first.

## D. Verify before production
On a device signed in with a **license-test** account, install from the internal
track and:
- `/pro` shows real Play prices (pulled from the `default` offering) and a
  **Restaurar compras** button — that proves `getProPackages()` + the key work.
- Buy the monthly test product → app flips to Pro (daily cap gone). RevenueCat
  dashboard → Customers shows the `pro` entitlement active.
- Reinstall → tap Restaurar compras → Pro returns. (Play requires a working
  restore; the code has `restore()`.)
- Cancel the test sub in Play → entitlement expires on the next cycle.

Only after that passes: update the **Data Safety** form (purchase history +
device ID, per `store/play-console-forms.md` §5 "billing on"), then promote the
release to Production.

## Gotchas
- Product IDs are permanent. A typo means a new ID and a code/RC change. Triple
  check `tarima_pro_monthly` / `tarima_pro_yearly`.
- If `/pro` shows no prices on device: usually the offering isn't set as
  **current**, the products aren't **Active** in Play, or the key env var wasn't
  present at build time (static export baked the empty string). Rebuild after
  setting it.
- The key is `NEXT_PUBLIC_` and public by design (RevenueCat Android SDK key).
  The *secret* key never ships; it lives only in the RC dashboard.
- Billing only runs inside the native Capacitor shell. The web build always
  shows the coming-soon/Stripe path; that's intentional, not a bug.
