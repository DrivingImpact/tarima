import type { BeatStyle, TimeSignature } from './types';

export interface BeatTrack {
  id: string;
  name: string;
  // Optional, never rendered. Populated only by the remote-sheet loader for
  // the production catalogue; the bundled fallback below leaves it unset.
  // Source attribution / licensing is tracked privately, out of tree.
  artist?: string;
  style: BeatStyle;
  tags: string[];
  // Authoritative BPM — drives the master clock. No runtime detection;
  // sync depends on this being accurate. Initial values were detected with
  // librosa over the first 60 s of each track; halved where librosa flagged
  // an octave (172 → 86). Verify by tapping along to the first 30 s on a
  // metronome and adjust here if off by ±1. Users can also fine-tune live
  // via the resync button; the tuned value is cached in localStorage.
  bpm: number;
  // Optional: seconds into the buffer where beat 1 of bar 1 lives.
  // Set only when the intro is long enough that auto-detect can't be
  // trusted (≥ ~1.5 s). Otherwise leave undefined — MusicClock detects
  // the first onset on load.
  bar1OffsetSec?: number;
  src: string;
  // Licensing/source metadata — optional, populated only by the remote-sheet
  // loader, never rendered. Bundled tracks omit it; provenance is kept
  // out of tree.
  license?: string;
  licenseUrl?: string;
  source?: string;
  timeSignature?: TimeSignature; // defaults to '4/4'
  feel?: string;
  // True if this beat is gated behind Pro. Undefined / false = free.
  // Free tier keeps a curated rotating set of ~5 beats; everything else is
  // locked. Mirror this flag in the Google Sheet (`pro` column, "true"/"1").
  pro?: boolean;
}

// Bundled offline fallback catalogue — shipped inside the app binary and served
// whenever the live Google-Sheet catalogue is unreachable, so the app can never
// be left with zero beats. Display names are Tarima's own; per-track source and
// licensing are recorded privately, out of tree (not in the app or the repo).
// All beats are FREE for everyone (see isBeatLocked). The `pro` field on the
// type is kept for the remote-catalogue schema, but no bundled beat sets it —
// Pro sells unlimited sessions, not access to music.
export const BEAT_TRACKS: BeatTrack[] = [
  // Boom-bap (slow→mid), old-school west-coast, and a jazz-hop / soul flavour
  // so the breadth is obvious from the first listen.
  {
    id: 'sotano', name: 'Sótano',
    style: 'boom-bap', tags: ['boom-bap', '90s', 'minimal'], bpm: 81,
    src: '/beats-v2/sotano.mp3',
  },
  {
    id: 'raro', name: 'Raro',
    style: 'boom-bap', tags: ['boom-bap', 'old-school'], bpm: 92,
    bar1OffsetSec: 2.02,
    src: '/beats-v2/raro.mp3',
  },
  {
    id: 'humo', name: 'Humo',
    style: 'jazz-hop', tags: ['jazz-hop', 'soul', 'mellow'], bpm: 92,
    bar1OffsetSec: 14.63,
    src: '/beats-v2/humo.mp3',
  },
  {
    id: 'costa', name: 'Costa',
    style: 'old-school', tags: ['old-school', 'west-coast', 'g-funk'], bpm: 99,
    src: '/beats-v2/costa.mp3',
  },

  {
    id: 'pulso', name: 'Pulso',
    style: 'boom-bap', tags: ['boom-bap', 'modern'], bpm: 89,
    src: '/beats-v2/pulso.mp3',
  },
  {
    id: 'cinta', name: 'Cinta',
    style: 'boom-bap', tags: ['boom-bap', 'old-school'], bpm: 86,
    // librosa returned 172.3 → halved (boom-bap convention; 172 is the
    // double-time hi-hat read, not the bar pulse).
    src: '/beats-v2/cinta.mp3',
  },
  {
    id: 'asfalto', name: 'Asfalto',
    style: 'boom-bap', tags: ['boom-bap', 'urban'], bpm: 89,
    src: '/beats-v2/asfalto.mp3',
  },
  {
    id: 'sombra', name: 'Sombra',
    style: 'boom-bap', tags: ['boom-bap', 'dark', 'horrorcore'], bpm: 99,
    src: '/beats-v2/sombra.mp3',
  },
  {
    id: 'batalla', name: 'Batalla',
    style: 'boom-bap', tags: ['boom-bap', 'battle', 'freestyle'], bpm: 86,
    bar1OffsetSec: 1.51,
    // librosa returned 172.3 → halved; battle/freestyle context confirms
    // the slower bar pulse.
    src: '/beats-v2/batalla.mp3',
  },
  {
    id: 'lento', name: 'Lento',
    style: 'boom-bap', tags: ['boom-bap', 'freestyle', 'slow'], bpm: 76,
    // librosa returned 152 → halved. 76 fits the slow-warmup freestyle
    // pocket; if it's actually 152 trap, flip back and update the style.
    src: '/beats-v2/lento.mp3',
  },
];

export function getBeatTrack(id: string): BeatTrack | undefined {
  return BEAT_TRACKS.find((t) => t.id === id);
}

export function getBeatsByStyle(style: BeatStyle): BeatTrack[] {
  return BEAT_TRACKS.filter((t) => t.style === style);
}

export function getRandomBeat(): BeatTrack {
  return BEAT_TRACKS[Math.floor(Math.random() * BEAT_TRACKS.length)];
}

export function getAvailableStyles(): BeatStyle[] {
  return [...new Set(BEAT_TRACKS.map((t) => t.style))];
}
