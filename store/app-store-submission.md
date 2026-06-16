# App Store (iOS) submission — step by step

Mirror of `play-submission.md` for Apple. Everything in the repo is ready; the
remaining work is (a) one thing only you can install — **full Xcode** — and
(b) the clicks inside the Apple Developer portal / App Store Connect (Apple ID +
$99/yr enrollment + identity verification).

## What's already done on disk (2026-06-16)

| What | State |
|---|---|
| `ios/` native project | Scaffolded (`npx cap add ios`), committed |
| Bundle id | `com.tarima.freestyle` (matches Android) |
| Version / build | `1.0` / `1` (`MARKETING_VERSION` / `CURRENT_PROJECT_VERSION` in `project.pbxproj`) |
| Deployment target | iOS 15.0 |
| Device family | iPhone only (`TARGETED_DEVICE_FAMILY = 1`) — no iPad screenshots/review needed |
| App icon + splash | Generated into `ios/App/App/Assets.xcassets` from `assets/` |
| Microphone permission | `NSMicrophoneUsageDescription` set in `Info.plist` (required — app records) |
| Export compliance | `ITSAppUsesNonExemptEncryption = false` (HTTPS only → no annual prompt) |
| RevenueCat iOS path | `src/lib/purchases.ts` reads `NEXT_PUBLIC_RC_IOS_KEY` (`appl_…`); degrades gracefully if unset |
| Listing copy | Reuse `store/play-listing.md` (same Spanish, dialect-neutral) — see field mapping below |
| Privacy policy / terms | https://tarima-tau.vercel.app/privacy/ · /terms/ (LIVE) |

Capacitor 8 uses **Swift Package Manager**, not CocoaPods — no `pod install`
step. (CocoaPods was installed anyway; harmless.)

## Blocker only you can clear: full Xcode

This machine has **Command Line Tools only**, not the full Xcode app. You can't
archive/upload an iOS build without it.

1. Install **Xcode** from the Mac App Store (multi-GB, your Apple ID).
2. Point the toolchain at it:
   `sudo xcode-select -s /Applications/Xcode.app/Contents/Developer`
3. Open it once to accept the license + install components.

## Build & upload steps (after Xcode is in)

1. **Enroll**: developer.apple.com/programs → Apple Developer Program, $99/yr.
   Enrollment + identity check can take a few days — start first.
2. **Refresh native** (run after any web change):
   ```bash
   cd ~/rima-juego && npm run build && npx cap sync ios
   ```
3. **Open in Xcode**: `npx cap open ios`
4. **Signing**: target `App` → Signing & Capabilities → check *Automatically
   manage signing* → select your Team. Xcode registers the bundle id.
5. **App Store Connect**: appstoreconnect.apple.com → Apps → **+** → New App.
   - Platform iOS, name `Tarima: Freestyle y Rimas`, primary language
     `Spanish (Mexico)` or `Spanish (Spain)`, bundle id `com.tarima.freestyle`,
     SKU `tarima-ios`.
6. **Archive**: Xcode → set device to *Any iOS Device (arm64)* → Product →
   Archive → Distribute App → App Store Connect → Upload.
7. **Listing** (App Store Connect → the version): fill from the field mapping
   below; upload screenshots.
8. **App Privacy** (nutrition labels): see §Privacy below.
9. **Age rating** questionnaire: no objectionable content → expect 4+.
10. **TestFlight** (optional but do it): test the build on your own device,
    especially mic recording + (once keys live) the Pro purchase sheet.
11. **Submit for Review**. First Apple review is typically 24–48h.

## Listing field mapping (App Store ← Play copy)

App Store fields differ in length from Play. Source text is `play-listing.md`.

| App Store field | Limit | Use |
|---|---|---|
| Name | 30 | `Tarima: Freestyle y Rimas` (24) |
| Subtitle | 30 | `Beats y palabras al ritmo` (25) |
| Promotional text | 170 | First two lines of the full description |
| Description | 4000 | Full description from `play-listing.md` verbatim |
| Keywords (comma list) | 100 | `freestyle,rap,rimas,beats,hip hop,improvisar,metronomo,batalla,mc,flow` |
| Support URL | — | https://tarima-tau.vercel.app |
| Marketing URL | — | https://tarima-tau.vercel.app |
| Category | — | Primary: Music · Secondary: Education |

## Screenshots (the one asset gap)

Apple requires **6.7" iPhone** screenshots (1290×2796); 6.5" (1242×2688) is a
recommended second set. The existing `store/screenshots/*.png` were captured at
Android phone aspect — **recapture on the iOS Simulator** once the app builds:
`npx cap run ios` → run an iPhone 15 Pro Max simulator → Device → screenshots of
home, beat selector, mid-session pentagram, diccionario, Pro. Same 5 frames as
Play. Dark frames to match the UI.

## Privacy (App Privacy "nutrition" labels)

Matches the Play data-safety answers in `play-console-forms.md`:
- App progress: **not collected** (all on-device localStorage).
- If `NEXT_PUBLIC_APTABASE_KEY` is set (anonymous analytics on): declare **Usage
  Data → Product Interaction**, "not linked to identity", **not** used for
  tracking. Anonymous, no ad id, no cross-app tracking.
- Once `NEXT_PUBLIC_RC_IOS_KEY` is live, RevenueCat collects **Purchases** +
  an anonymous device identifier → declare *Purchases* and *Identifiers*, "not
  linked to identity", not used for tracking.
- Microphone: recordings never leave the device — declare no audio collection.

## In-app purchases (Tarima Pro on iOS)

Separate from Android — IAP products live in **App Store Connect**, then import
to RevenueCat:
1. App Store Connect → your app → **Subscriptions** → create a group, add:
   - `tarima_pro_monthly` — 1 month, ~$2.50
   - `tarima_pro_yearly` — 1 year, ~$15
   (Same product IDs as Play; keep them identical.)
2. App Store Connect → **Users and Access → Integrations → In-App Purchase**
   key → download the `.p8` → upload to RevenueCat (iOS app config).
3. In RevenueCat: add the **iOS app** (bundle `com.tarima.freestyle`), attach
   both products to the existing `default` offering (`$rc_monthly` /
   `$rc_annual`) and the shared `pro` entitlement.
4. Set env `NEXT_PUBLIC_RC_IOS_KEY=appl_…`, then `npm run build && npx cap sync
   ios` and re-archive.
5. Apple requires a working **Restore Purchases** path → already implemented
   (`restore()` in `purchases.ts`, wired on `/pro`).

## Versioning for future iOS releases

Bump `MARKETING_VERSION` (and `CURRENT_PROJECT_VERSION`) in
`ios/App/App.xcodeproj/project.pbxproj`, then `npm run build && npx cap sync ios`
→ Archive → Upload.

## Gotchas

- **Mic string is load-bearing**: without `NSMicrophoneUsageDescription`,
  `getUserMedia` silently fails in iOS WKWebView *and* review rejects. It's set
  — don't let a future `cap` regeneration drop it.
- Same license-compliance rule as Play: bundled beats ship inside the binary;
  never attach raw MP3s anywhere.
- Apple requires IAP (not Stripe) for digital goods inside the app — the native
  `/pro` path already uses RevenueCat/StoreKit, not the web Stripe link.
- If review asks for a demo: there are no accounts, so just note "no login
  required" in App Review notes.
