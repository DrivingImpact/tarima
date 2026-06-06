# Tarima — Usability/UI + Cybersecurity audit

Date: June 2026. Grounded in the code (web app + `android/` Capacitor project +
the live Vercel deploy), not assumptions. Severity: 🔴 high · 🟠 medium · 🟢 low.
"✅ fixed this pass" vs "▢ recommended".

---

# Part A — Cybersecurity

**Headline: the attack surface is small and clean.** No accounts, no backend,
no PII, no secrets in the bundle, no dangerous sinks. The realistic risks are
client-trust (entitlements) and missing defense-in-depth headers.

## A1. 🟢 Injection / XSS
- No `dangerouslySetInnerHTML`, `innerHTML`, `eval`, `new Function`, or
  `document.write` anywhere. All user/remote text (dictionary search, beat
  names from the Sheet) is rendered as React children → auto-escaped.
- **Verdict:** no XSS sinks found.

## A2. 🟢 Secrets / config
- Every env var is `NEXT_PUBLIC_*` and public **by design**: the RevenueCat
  *public* SDK key, Stripe Payment Links, the Sheet URL. No private keys ship.
- `.env*` is gitignored; only `.env.example` (placeholders) is committed.
- **Verdict:** no secret leakage. (RevenueCat secret keys / webhook secrets,
  if added later, must stay server-side — there's no server today.)

## A3. 🟠 Client-trusted entitlement (now low-impact)
- `entitlements.isPro` lives in `localStorage` (`tarima-storage`) and is trusted
  by the client; the WebView's JS is modifiable. A technical user can flip it.
- **Impact is now minor** because the model changed: all beats are free and Pro
  only removes the daily-session cap. Bypassing grants unlimited sessions — low
  value, nothing to pirate. The real purchase is still validated server-side by
  Google + RevenueCat.
- ▢ Optional: `android:allowBackup="true"` lets the flag survive backup/restore.
  Set `allowBackup="false"` if you want to close even that; not worth it for an
  unlimited-sessions flag.

## A4. 🟢 Network
- Outbound calls: the published Sheet CSV (`beat-source.ts`), beat MP3s
  (`music-clock.ts` fetch + `new Audio`), and on native RevenueCat/Capgo. All
  are **HTTPS** and **dev-controlled** origins.
- Cleartext is blocked: `targetSdk 36` + no `networkSecurityConfig` override =
  Android default (no cleartext HTTP). 
- ▢ Minor: if the Google Sheet were ever compromised, it could point `mp3_url`
  at arbitrary HTTPS URLs (the app would fetch/play them — no code execution,
  but a content-integrity risk). Keep the Sheet locked down (Google account
  2FA, restricted edit access). Long-term, signed R2 URLs remove this.

## A5. 🟠 Android hardening
- ✅ Permissions are minimal: **INTERNET only**. `MainActivity` is the only
  exported component (launcher — required). `FileProvider` is `exported=false`.
- ✅ `targetSdkVersion 36` meets/exceeds Play's API-level requirement.
- 🟠 `minifyEnabled false` — no R8/ProGuard. Low impact (app logic is the JS
  bundle, which Next already minifies; little Java to obfuscate). ▢ Enable R8 +
  resource shrinking for release for smaller/cleaner binaries.
- 🟢 `FileProvider` paths are Capacitor's broad defaults (`external-path "."`,
  `cache-path "."`) but `exported=false` makes them low-risk. ▢ Narrow if you
  never use file sharing.
- 🟢 WebView remote debugging: Capacitor enables it only in **debug** builds by
  default (we didn't override) → off in release. Confirm in the signed build.

## A6. 🟠 OTA updates (Capgo) — when you enable it
- Currently `autoUpdate: false` (inert). When enabled, an OTA channel can push
  JS to installed apps.
- ▢ Use Capgo's **bundle signing / update integrity** and a private channel/key
  so a compromised Capgo account can't push arbitrary JS to users. Treat the
  Capgo key like a deploy secret.

## A7. 🟠 Web deploy hardening (Vercel)
- ✅ HSTS present (Vercel default). Deployment is intentionally public for the
  privacy/terms URLs.
- ✅ **Added `vercel.json` security headers this pass:** `X-Frame-Options:
  DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`,
  `Permissions-Policy` (camera/mic/geo/topics off), and CSP `frame-ancestors
  'none'` (clickjacking). 
- ▢ A full script/style CSP isn't added: the static Next build relies on inline
  scripts/styles, so a strict CSP needs nonces and would break it. Low priority
  given no XSS sinks; revisit if a backend/3rd-party scripts are introduced.

## A8. 🟢 Dependencies (`npm audit`)
- Production/shipped: **2 moderate**, both build-time CSS tooling (postcss via
  Next; uuid) — not exploitable with authored input. 
- The **6 high** advisories (minimatch/tar/replace/xcode ReDoS + path traversal)
  are all under **`@capacitor/assets`** — a **dev-only** icon generator, never
  shipped. 
- ▢ Optional: uninstall `@capacitor/assets` and run it via `npx` only when
  regenerating icons, to drop those from the tree. Run `npm audit` before each
  release.

---

# Part B — Usability / UI

**Overall:** the redesign is cohesive and the core loop is clear. The gaps are
accessibility (contrast, tiny text, motion, focus) and a few flow refinements.

## B1. 🟠 Contrast (WCAG AA)
- `text-muted` (#7e7e78) on the pure bg (#0a0a0b) ≈ **4.8:1** → passes for
  normal text. But on cards (#161618) it's ≈ **4.36:1** → just under the 4.5
  minimum for small text.
- **Worse:** low-opacity variants `text-muted/30`, `/40`, `/60`, `/70` (used for
  the "Siguen" label, scheme examples, footer links, the played-beat counter)
  fall well below AA.
- ▢ Bump the muted token slightly (e.g. #8a8a84) and replace the `/30–/70`
  opacities with solid tokens. (Design decision — not auto-applied so I don't
  shift the look you approved.)

## B2. 🟠 Tiny type
- **43** uses of `text-[9px]` / `text-[10px]`. Many are uppercase tracked labels
  (chips, stat captions, "Pro" badge). At 9–10px on mobile this strains
  legibility, compounding the contrast issue.
- ▢ Set a ~11px floor for body/caption text; keep 10px only for true micro-labels
  with full-contrast colour.

## B3. ✅ Reduced motion (fixed this pass)
- Was: looping `pulse-glow`, `glow-pulse`, the animated playhead, etc., with no
  `prefers-reduced-motion` handling (vestibular risk).
- ✅ Added a global `prefers-reduced-motion: reduce` block that neutralises CSS
  animations/transitions. (Note: the SVG `<animate>` playhead uses SMIL and
  isn't covered by CSS — a follow-up could gate that in JS.)

## B4. ✅ Keyboard focus (fixed this pass)
- Was: only the dictionary search had any focus styling → keyboard focus was
  effectively invisible on the dark theme across buttons, cards, plan pickers.
- ✅ Added a global `:focus-visible` lime outline.

## B5. 🟢 Touch targets
- Play buttons are 44px (good). Back-arrow / icon buttons are **40px** (`w-10
  h-10`), just under the 44px guideline. ▢ Bump icon buttons to 44px.

## B6. 🟢 Screen-reader / semantics
- Good: `aria-label`s on icon buttons, `role="slider"` + aria values on the
  transport, `role="dialog"` + `aria-modal` on the paywall, `aria-hidden` on
  decorative chrome.
- ▢ The pentagram SVG conveys timing visually with no text alternative — inherent
  to a rhythm game; acceptable, but the active rhyme word could get an
  `aria-live="polite"` so SR users hear each new word.
- ▢ The whole-screen tap handler exists only in (hidden) tap mode — fine.

## B7. 🟢 Flow / content
- ✅ Spanish is dialect-neutral throughout (no tú/vos leftovers found).
- 🟢 The wizard is 4 steps (home → beat → difficulty → scheme → game). Reasonable,
  but ▢ consider remembering the last beat/difficulty/scheme to make repeat
  sessions one tap (big retention win for a practice app).
- 🟢 Dead-but-present code for hidden modes (toque/generador/barras) adds branches
  in `juego`. ▢ Prune or keep behind a clear flag.
- 🟢 "Sin anuncios" appears in Pro value props though there are no ads in free —
  ▢ drop or make it a real differentiator to avoid a hollow claim.

## B8. 🟢 States
- Loading ("cargando…"), error (load failure, no-src), and empty (profile)
  states are all handled. Good.

---

## Priority shortlist
1. 🟠 Contrast + tiny-type legibility pass (B1, B2) — biggest user-facing a11y gap.
2. 🟠 Keep the Google Sheet account locked down (A4); enable Capgo signing before
   turning OTA on (A6).
3. ✅ Done this pass: reduced-motion, focus-visible, web security headers.
4. 🟢 Repeat-session shortcut (B7) — retention.
5. 🟢 R8/minify + drop dev-only @capacitor/assets from the tree (A5, A8).
