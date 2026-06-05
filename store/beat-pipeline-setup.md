# Beat pipeline — add songs live, no app release

The app already supports a remote catalogue (`src/lib/beat-source.ts`). When it's
configured, the app fetches a CSV at launch (cached ~1h) and streams MP3s from
Cloudflare R2. **Adding a song = upload the MP3 + add one row to a Google Sheet.**
No rebuild, no Play review. Until configured, the app uses the 11 bundled beats.

## One-time setup
1. **Cloudflare R2**: create a bucket (e.g. `tarima-beats`), enable **public
   access** (or attach a custom domain, e.g. `beats.tarima.app`).
2. **Upload the current beats**:
   ```bash
   npm i -g wrangler && wrangler login
   BUCKET=tarima-beats ./scripts/upload-beats-r2.sh
   ```
3. **Google Sheet**: import `store/beats-seed.csv`, replace
   `REPLACE-WITH-R2-PUBLIC-URL` with your bucket's public base URL in the
   `mp3_url` column. Then **File → Share → Publish to web → (this sheet) → CSV**.
4. **Point the app at it**: set in `.env.local`
   ```
   NEXT_PUBLIC_BEATS_SHEET_URL=<the published CSV url>
   ```
   Rebuild (`npm run build && npx cap sync`) for the native app to bake the URL.

## Adding a new song later (the whole point)
1. Drop the MP3 in R2 (`wrangler r2 object put tarima-beats/my-beat.mp3 --file=… --remote`).
2. Add a row to the Sheet: `id, name, artist, bpm, style, mp3_url, bar1_offset_sec,
   feel, license, source_url, active(=true), pro(=true/false)`.
3. Done — installed apps pick it up within ~1h (or next launch).

## Critical: BPM accuracy
This is a rhythm game — **the `bpm` must be correct** or the playhead drifts.
Tap along to the first 30s on a metronome, or detect with librosa/aubio, and set
`bpm` (halve obvious double-time reads). If the song has a long intro before the
downbeat, set `bar1_offset_sec` to where beat 1 lands. Users can also nudge it
live with the resync button, but ship it close.

## Columns (header names matter, order doesn't)
`id` (unique), `name`, `artist`, `bpm` (30–240), `style` (boom-bap, trap, lofi,
reggaeton, old-school, jazz-hop, latin, drill), `mp3_url`, `bar1_offset_sec`
(optional), `feel` (optional), `license`, `source_url`, `active` (false hides the
row), `pro` (true = behind Pro; default false = free).
