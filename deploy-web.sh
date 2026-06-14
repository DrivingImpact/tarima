#!/usr/bin/env bash
# Deploy the Tarima web app to Vercel production WITH the bundled beats.
#
# WHY THIS SCRIPT EXISTS: the MP3s in public/beats-v2/ are gitignored (Pixabay
# no-standalone-redistribution policy), so any Vercel-side build — GitHub
# auto-deploy, or a plain `vercel --prod` that builds in the cloud — ships
# WITHOUT audio (the site 404s every beat). Building LOCALLY and deploying the
# prebuilt output is the only way the beats reach production. Always deploy the
# web through this script, from a machine where public/beats-v2/ is populated.
set -euo pipefail
cd "$(dirname "$0")"

if ! ls public/beats-v2/*.mp3 >/dev/null 2>&1; then
  echo "✗ No beats found in public/beats-v2/ — aborting so we don't ship a silent app."
  echo "  Populate public/beats-v2/ first (see store/beat-provenance.md)."
  exit 1
fi

npx vercel pull --yes --environment=production
npx vercel build --prod
npx vercel deploy --prebuilt --prod
echo "✓ Deployed. Verify a beat: curl -sI https://tarima-tau.vercel.app/beats-v2/aspieduck-1-weirdo.mp3"
