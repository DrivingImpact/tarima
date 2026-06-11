# Play Console submission — step by step

Everything below is ready on disk; the only things Claude cannot do are the
clicks inside Play Console (Google account + identity verification + payment).

## Artifacts (built + signed 2026-06-11)

| What | Where |
|---|---|
| Signed AAB (upload this) | `android/app/build/outputs/bundle/release/app-release.aab` |
| Signed APK (sideload/GitHub release) | `android/app/build/outputs/apk/release/app-release.apk` |
| Keystore + passwords | `~/tarima-secrets/` — **BACK THIS UP NOW** (password manager + offline copy). Lose it and you can never update the app. |
| Signing cert SHA-256 | `86c0ca3124a527da202734472aac7897826bc4cba7fb326ced5a4e313c5c2375` |
| App icon 512×512 | `store/icon-512.png` |
| Feature graphic 1024×500 | `store/feature-graphic-1024x500.png` |
| Phone screenshots (5) | `store/screenshots/` |
| Listing copy (es) | `store/play-listing.md` |
| Privacy policy URL | https://tarima-tau.vercel.app/privacy/ |
| Terms URL | https://tarima-tau.vercel.app/terms/ |

## Steps

1. **Account**: play.google.com/console → create developer account ($25 one-off).
   Personal account = your name shows publicly; org account needs a D-U-N-S.
2. **Create app**: name `Tarima: Freestyle y Rimas`, default language `es-419`
   or `es-ES`, App (not game), Free.
3. **Play App Signing**: accept (default). Google re-signs for distribution;
   our keystore becomes the *upload key*.
4. **Store listing**: paste from `store/play-listing.md`; upload icon, feature
   graphic, screenshots.
5. **Data safety form**: answers in `store/security-usability-audit.md` §3 —
   no data collected, no data shared; note RevenueCat anonymous device ID
   once billing is enabled.
6. **Content rating questionnaire**: utility/education, no violence etc. →
   expect "Everyone/PEGI 3".
7. **Target audience**: 13+ (not child-directed).
8. **Monetization**: skip linking RevenueCat products until the RC dashboard
   has the `pro` entitlement + Play subscription created; the app degrades
   gracefully without `NEXT_PUBLIC_RC_ANDROID_KEY`.
9. **Release**: Production → create release → upload
   `app-release.aab` → review → roll out. First review typically 1–7 days.

## Versioning for future releases

Bump `versionCode` (and `versionName`) in `android/app/build.gradle`, then:

```bash
npm run build && npx cap sync android
cd android && JAVA_HOME=/opt/homebrew/opt/openjdk@21 ./gradlew bundleRelease
```

## Gotchas

- Screenshots must not show alternative-store/sideload links (the home
  screenshot here was taken with the web-only APK footer removed).
- The bundled Pixabay beats are inside the binary, which is the
  license-compliant distribution route; never attach raw MP3s to the listing.
- If Play flags the `REQUEST_INSTALL_PACKAGES`/unknown permissions, check
  `android/app/src/main/AndroidManifest.xml` — Capacitor defaults are clean.
