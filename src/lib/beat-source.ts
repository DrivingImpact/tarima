/**
 * Beat library source-of-truth.
 *
 * Production beat list lives in a Google Sheet ("Publish to web" → CSV).
 * Each row = one beat with metadata + a URL pointing at the MP3 hosted on
 * Cloudflare R2. The app fetches the CSV at cold start, caches it in
 * localStorage for an hour, and serves stale-while-revalidating on later
 * loads so the UI never blocks on the network.
 *
 * Bundled `BEAT_TRACKS` from `./beat-tracks.ts` are the fallback shipped in
 * the app binary — used if the sheet is unreachable, malformed, or empty.
 * The app can therefore never be left with zero beats.
 */

import type { BeatTrack } from "./beat-tracks";
import { BEAT_TRACKS as BUNDLED } from "./beat-tracks";
import type { BeatStyle } from "./types";

const SHEET_URL = process.env.NEXT_PUBLIC_BEATS_SHEET_URL ?? "";
const CACHE_KEY = "tarima:beats:cache";
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

const VALID_STYLES: BeatStyle[] = [
  "boom-bap",
  "trap",
  "lofi",
  "reggaeton",
  "old-school",
  "jazz-hop",
  "latin",
  "drill",
];

interface CachedEntry {
  fetchedAt: number;
  tracks: BeatTrack[];
}

// ── CSV parsing ──────────────────────────────────────────────────
// Google Sheets' "Publish to web → CSV" export properly quotes fields that
// contain commas, newlines, or quotes. We handle quoted fields + the "" escape
// for embedded quotes — same dialect as RFC 4180.

function parseCSVLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === "," && !inQuotes) {
      out.push(cur);
      cur = "";
    } else {
      cur += c;
    }
  }
  out.push(cur);
  return out;
}

function parseRow(headers: string[], row: string[]): BeatTrack | null {
  const get = (col: string): string => {
    const idx = headers.indexOf(col);
    return idx >= 0 ? (row[idx] ?? "").trim() : "";
  };

  const active = get("active").toLowerCase();
  if (active === "false" || active === "no" || active === "0") return null;

  const id = get("id");
  const name = get("name");
  const mp3 = get("mp3_url");
  if (!id || !name || !mp3) return null;

  const bpm = Number(get("bpm"));
  if (!Number.isFinite(bpm) || bpm < 30 || bpm > 240) return null;

  const styleRaw = get("style").toLowerCase() as BeatStyle;
  const style = VALID_STYLES.includes(styleRaw) ? styleRaw : "boom-bap";

  const bar1Raw = get("bar1_offset_sec");
  const bar1Num = bar1Raw ? Number(bar1Raw) : NaN;
  const bar1OffsetSec =
    Number.isFinite(bar1Num) && bar1Num >= 0 ? bar1Num : undefined;

  // `pro` column: "true" / "1" / "yes" → locked behind Pro. Anything else
  // (including a missing column) is treated as free. Sheet authors opt rows
  // INTO Pro, never out — keeps the default safe if the column is forgotten.
  const proRaw = get("pro").toLowerCase();
  const pro = proRaw === "true" || proRaw === "1" || proRaw === "yes";

  return {
    id,
    name,
    artist: get("artist") || "Anónimo",
    bpm,
    style,
    tags: [style, ...(get("feel") ? [get("feel")] : [])],
    src: mp3,
    license: get("license") || "Licensed",
    licenseUrl: "",
    source: get("source_url"),
    feel: get("feel") || undefined,
    bar1OffsetSec,
    pro,
  };
}

function parseCSV(text: string): BeatTrack[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length === 0) return [];
  const headers = parseCSVLine(lines[0]).map((h) => h.trim());
  const tracks: BeatTrack[] = [];
  const seen = new Set<string>();
  for (let i = 1; i < lines.length; i++) {
    const row = parseCSVLine(lines[i]);
    const t = parseRow(headers, row);
    if (!t) {
      console.warn(
        `beat-source: row ${i + 1} invalid or inactive, skipping:`,
        lines[i].slice(0, 80),
      );
      continue;
    }
    if (seen.has(t.id)) {
      console.warn(`beat-source: duplicate id "${t.id}", skipping`);
      continue;
    }
    seen.add(t.id);
    tracks.push(t);
  }
  return tracks;
}

// ── Cache ────────────────────────────────────────────────────────

function readCache(): CachedEntry | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedEntry;
    if (
      typeof parsed.fetchedAt !== "number" ||
      !Array.isArray(parsed.tracks) ||
      parsed.tracks.length === 0
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(tracks: BeatTrack[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ fetchedAt: Date.now(), tracks } satisfies CachedEntry),
    );
  } catch {
    /* quota / disabled — fine, we just won't cache */
  }
}

// ── Network ──────────────────────────────────────────────────────

async function fetchFromSheet(): Promise<BeatTrack[] | null> {
  if (!SHEET_URL) return null;
  try {
    const res = await fetch(SHEET_URL, { cache: "no-store" });
    if (!res.ok) {
      console.warn("beat-source: sheet fetch failed with HTTP", res.status);
      return null;
    }
    const text = await res.text();
    const tracks = parseCSV(text);
    if (tracks.length === 0) {
      console.warn("beat-source: sheet returned 0 valid rows");
      return null;
    }
    return tracks;
  } catch (err) {
    console.warn("beat-source: fetch error", err);
    return null;
  }
}

// ── Public API ───────────────────────────────────────────────────

/** Synchronous read — returns cached tracks (or bundled fallback). Use this
 *  for the initial render. */
export function getBeatTracks(): BeatTrack[] {
  if (typeof window === "undefined") return BUNDLED;
  const cached = readCache();
  if (cached && cached.tracks.length > 0) return cached.tracks;
  return BUNDLED;
}

/** Asynchronous refresh — fetches the sheet, writes the cache, returns the
 *  fresh tracks. Returns null if the sheet was unreachable / invalid (cache
 *  is preserved in that case). */
export async function refreshBeatTracks(): Promise<BeatTrack[] | null> {
  const fresh = await fetchFromSheet();
  if (fresh) writeCache(fresh);
  return fresh;
}

/** Should this load refresh now? True if cache is missing, stale, or
 *  the user passed `?refresh=1`. */
export function shouldRefresh(): boolean {
  if (typeof window === "undefined") return false;
  const force = new URLSearchParams(window.location.search).get("refresh");
  if (force === "1" || force === "true") return true;
  const cached = readCache();
  if (!cached) return true;
  return Date.now() - cached.fetchedAt > CACHE_TTL_MS;
}
