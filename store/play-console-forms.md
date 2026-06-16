# Play Console — every form, answered

Copy-paste answers for the screens Play Console makes you fill before you can
publish. Ordered roughly the way the dashboard nags you (the "App content"
checklist + the release flow). Anything Claude could pre-decide is decided here;
where Google needs *your* click or a fact only you have, it's marked **YOU**.

Two states matter:
- **Now (v1.3.2, billing OFF):** the shipped app has no RevenueCat key, so it
  never calls billing. It collects and sends **nothing**. Answer the Data Safety
  form as "no data collected / no data shared".
- **Later (billing ON):** when you set `NEXT_PUBLIC_RC_ANDROID_KEY` and create
  the Play subscription, RevenueCat starts handling purchases. At that point you
  must revisit Data Safety (see the "When you turn billing on" block below).

---

## 1. App access
Question: is any part of the app restricted (login / region / paywall that
blocks review)?

**Answer:** "All functionality is available without special access."
The app needs no account and no login. The free tier is fully usable; Pro only
removes the daily session cap. No reviewer credentials needed.

## 2. Ads
Question: does your app contain ads?

**Answer:** **No.** The app shows no ads, no ad SDK is bundled.

## 3. Content rating questionnaire
Category: select **Reference, News, or Educational** (or **Utility**; the app is
a training tool, not a game with gameplay violence). If Play forces a Games
subtype, pick **Music**.

Answer every question **No / None**:
- Violence (cartoon, fantasy, realistic, sexual): **No**
- Sexuality / nudity: **No**
- Profanity / crude humour: **No** (the app generates Spanish vocabulary words
  for rhyming practice; the word list is curated and non-explicit)
- Controlled substances (drugs, alcohol, tobacco): **No**
- Gambling (simulated or real): **No**
- User-generated content / user interaction / shares location: **No** (no
  accounts, no chat, no UGC sharing, no location)
- Does the app let users purchase digital goods: **Yes** (Tarima Pro
  subscription) — this is a commerce flag, not a content one
- Miscellaneous (horror, mature themes): **No**

Expected result: **PEGI 3 / ESRB Everyone / "Rated for 3+"**.

Note on music: the bundled beats are instrumental, no lyrics, no explicit
content — nothing to declare.

## 4. Target audience and content
- Target age group: select **13–15, 16–17, 18+** (i.e. 13 and over). Do **NOT**
  tick under-13: the app is not child-directed and you don't want Families
  Policy / COPPA obligations.
- "Is your app designed for children?" → **No.**
- Appeals to children unintentionally? → **No.**
This keeps you out of the Designed for Families programme.

## 5. Data safety form
This is the big one. The answer depends on whether **anonymous analytics** is
enabled in the build you ship (`NEXT_PUBLIC_APTABASE_KEY` set or not).

**If you ship WITHOUT an Aptabase key (analytics off):**

**Does your app collect or share any of the required user data types?**
→ **No.**

Justification you can keep on file (matches `store/security-usability-audit.md`):
- All progress, streaks, achievements and the Pro flag live in `localStorage`
  on the device only (`tarima-storage`). Nothing is sent to a server.
- The only Android permission is **INTERNET**, used solely to fetch bundled
  static assets; with no key there is no analytics SDK active, no crash SDK,
  no account system.
- No advertising ID, no location, no contacts, no personal identifiers.

**If you ship WITH an Aptabase key (analytics on) — declare it:**
- **App activity → App interactions** — Collected, not shared. Purpose:
  Analytics. Anonymous (Aptabase): no name, no email, no advertising id, no
  cross-app tracking. Events are aggregate signals like "app opened" /
  "session completed". Mark as **not** used for tracking and **not** linked to
  identity.
- Everything else above still holds (no location, no contacts, voice
  recordings never leave the device).

**Is all user data encrypted in transit?**
→ Yes (assets served over HTTPS). N/A for collected data since none is
  collected, but answer Yes.

**Do you provide a way for users to request data deletion?**
→ Data is local-only; uninstalling the app or clearing app storage removes
  everything. You can answer "No data collected" which removes this requirement.
  Privacy policy already states this: https://tarima-tau.vercel.app/privacy/

### When you turn billing on (RevenueCat live) — REVISIT THIS
Once `NEXT_PUBLIC_RC_ANDROID_KEY` is set and a Play subscription exists,
RevenueCat (and Google Play Billing) start processing purchases. Update Data
Safety to declare:
- **Purchase history** — Collected, not shared. Purpose: App functionality
  (manage the Pro entitlement). Processed by RevenueCat as a service provider.
- **Device or other IDs** — RevenueCat assigns an anonymous app-user ID /
  reads an app-set ID. Collected, not shared. Purpose: App functionality.
- Still: no name, no email, no location.
- RevenueCat's data handling: they act as a processor; link their privacy terms
  in your policy when you enable billing.

## 6. Government apps / Financial features / Health
- Is this a government app? → **No.**
- Does it provide financial features (loans, crypto, payments to third parties)?
  → **No.** (In-app subscriptions are not "financial features" in Play's sense.)
- Health: → **No.**

## 7. Privacy policy
URL field: `https://tarima-tau.vercel.app/privacy/`  (live)
Make sure the support email it cites (`hola@tarima.app`) actually receives mail
before launch — set up the alias/forwarding. Play and users will use it.

---

## Store listing fields (paste-ready)
- App name: `Tarima: Freestyle y Rimas`
- Default language: `es-419` (Latin-American Spanish; the copy is dialect-neutral)
- App or game: **App** (Reference/Education). If you'd rather chart in Games,
  Games → Music also works; App avoids the gameplay-content expectations.
- Free/Paid: **Free** (with in-app subscription)
- Category: Education (or Music & Audio)
- Short + full description, graphics: see `store/play-listing.md`
- Contact email: `hola@tarima.app`
- Privacy policy: `https://tarima-tau.vercel.app/privacy/`
- Screenshots: `store/screenshots/` (5)
- Icon 512: `store/icon-512.png` · Feature graphic: `store/feature-graphic-1024x500.png`

## Release
- Production → Create release → **Play App Signing: accept** → upload
  `android/app/build/outputs/bundle/release/app-release.aab` (v1.3.2, code 8).
- Release name: `1.3.2 (8)`
- Release notes (es): `Primera versión pública de Tarima. Beats sincronizados,
  pentagrama animado, diccionario de rimas y cuatro esquemas. Donde nace el
  freestyle.`
- Review + roll out. First review: 1–7 days.
