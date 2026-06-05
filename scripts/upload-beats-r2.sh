#!/usr/bin/env bash
# Upload the bundled beats to a Cloudflare R2 bucket so the app can stream them
# (and so new songs can be added live, without an app release).
#
# Prereqs:
#   1. A Cloudflare account + an R2 bucket (e.g. "tarima-beats").
#   2. Enable public access on the bucket (R2 → bucket → Settings → Public
#      access, or attach a custom domain like beats.tarima.app).
#   3. `npm i -g wrangler` and `wrangler login` (or set CLOUDFLARE_API_TOKEN).
#
# Usage:
#   BUCKET=tarima-beats ./scripts/upload-beats-r2.sh
#
# After upload, put the bucket's public base URL into store/beats-seed.csv
# (replace REPLACE-WITH-R2-PUBLIC-URL), import that CSV into a Google Sheet,
# File → Share → Publish to web → CSV, and set NEXT_PUBLIC_BEATS_SHEET_URL to
# that published URL. New songs then = upload MP3 + add a Sheet row (~1h cache).
set -euo pipefail

BUCKET="${BUCKET:-tarima-beats}"
SRC_DIR="$(cd "$(dirname "$0")/.." && pwd)/public/beats-v2"

if ! command -v wrangler >/dev/null 2>&1; then
  echo "wrangler not found. Install with: npm i -g wrangler && wrangler login" >&2
  exit 1
fi

count=0
for f in "$SRC_DIR"/*.mp3; do
  key="$(basename "$f")"
  echo "→ uploading $key"
  wrangler r2 object put "$BUCKET/$key" --file="$f" --content-type="audio/mpeg" --remote
  count=$((count + 1))
done

echo "Done: $count files uploaded to R2 bucket '$BUCKET'."
echo "Next: set the public base URL in store/beats-seed.csv and publish the Sheet."
