# Tarima

**Entrenamiento de freestyle que cabe en el bolsillo.** Beats reales que marcan el compás y palabras que aparecen al ritmo para no perder el flow.

Live: [tarima-tau.vercel.app](https://tarima-tau.vercel.app) · Instagram: [@tarimafreestyle](https://instagram.com/tarimafreestyle)

## What it does

- **Synced beats** with live beat detection (re-tap the tempo mid-session if it drifts).
- **Animated stave metronome** with a playhead, so you always know where the bar is.
- **Words on the beat**: a new prompt word lands every bar, matched to four rhyme schemes (pareada, cruzada, abrazada, monorrima) and four difficulty levels.
- **Rhyme dictionary**: consonant and assonant rhyme families for any word.
- **Local progress**: bars rapped, streaks and achievements, all stored on-device. No accounts, no ads, no personal data collected.

## Stack

- [Next.js 16](https://nextjs.org) + React 19, static export
- [Tone.js](https://tonejs.github.io) + `web-audio-beat-detector` for audio
- [Capacitor 8](https://capacitorjs.com) for the Android app, RevenueCat for billing
- Zustand for state, Tailwind 4 for styling
- Design system: "Acid Underground" (graphite + bone + acid lime)

## Development

```bash
npm install
npm run dev        # web app at localhost:3000
npm run build      # static export to out/
npx cap sync android && npx cap open android   # Android build
```

Copy `.env.example` to `.env.local` for the optional remote beat pipeline and RevenueCat keys. Without them the app runs fully offline with bundled defaults.

### Beats

Audio tracks are licensed for in-app playback only and may not be redistributed as standalone files. They are therefore **not in this repository**: builds bundle them from a local `public/beats-v2/` folder (git-ignored). Source/licensing provenance is kept privately, out of tree.

## License

Source available for reading and learning. All rights reserved; this is not an open-source license, and the Tarima name, branding and assets may not be reused.
