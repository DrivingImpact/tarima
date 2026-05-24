import type { BeatStyle, TimeSignature } from './types';

export interface BeatTrack {
  id: string;
  name: string;
  artist: string;
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
  license: string;
  licenseUrl: string;
  source: string;
  timeSignature?: TimeSignature; // defaults to '4/4'
  feel?: string;
  // True if this beat is gated behind Pro. Undefined / false = free.
  // Free tier keeps a curated rotating set of ~5 beats; everything else is
  // locked. Mirror this flag in the Google Sheet (`pro` column, "true"/"1").
  pro?: boolean;
}

// All 11 tracks below are sourced from Pixabay under the Pixabay Content
// License — commercial use allowed, no attribution required, no need to
// redistribute the audio standalone. We bake artist + source URL anyway so
// the credits screen is honest. When the live Google-Sheet catalogue lands,
// these stay as the offline fallback.
//
// Source URL pattern: `https://pixabay.com/music/<original-slug>-<id>/`.
export const BEAT_TRACKS: BeatTrack[] = [
  // ── Free tier ──────────────────────────────────────────────────
  // 5 beats covering boom-bap (slow→mid), old-school west-coast, and a
  // jazz-hop / soul flavour so a free user immediately hears the breadth.
  {
    id: 'darren-hirst-minimal-90s', name: 'Minimal 90s', artist: 'Darren Hirst',
    style: 'boom-bap', tags: ['boom-bap', '90s', 'minimal'], bpm: 81,
    src: '/beats-v2/darren-hirst-minimal-90s.mp3',
    license: 'Pixabay Content License',
    licenseUrl: 'https://pixabay.com/service/license-summary/',
    source: 'https://pixabay.com/music/beats-minimal-90s-rap-beat-312554/',
  },
  {
    id: 'leberch-hip-hop', name: 'Hip Hop', artist: 'Leberch',
    style: 'boom-bap', tags: ['boom-bap', 'classic'], bpm: 88,
    bar1OffsetSec: 1.72,
    src: '/beats-v2/leberch-hip-hop.mp3',
    license: 'Pixabay Content License',
    licenseUrl: 'https://pixabay.com/service/license-summary/',
    source: 'https://pixabay.com/music/beats-hip-hop-516914/',
  },
  {
    id: 'aspieduck-1-weirdo', name: '1 Weirdo', artist: 'Aspieduck',
    style: 'boom-bap', tags: ['boom-bap', 'old-school'], bpm: 92,
    bar1OffsetSec: 2.02,
    src: '/beats-v2/aspieduck-1-weirdo.mp3',
    license: 'Pixabay Content License',
    licenseUrl: 'https://pixabay.com/service/license-summary/',
    source: 'https://pixabay.com/music/beats-old-school-hip-hop-boom-bap-1-weirdo-176238/',
  },
  {
    id: 'alexgrohl-sad-soul', name: 'Sad Soul', artist: 'AlexGrohl',
    style: 'jazz-hop', tags: ['jazz-hop', 'soul', 'mellow'], bpm: 92,
    bar1OffsetSec: 14.63,
    src: '/beats-v2/alexgrohl-sad-soul.mp3',
    license: 'Pixabay Content License',
    licenseUrl: 'https://pixabay.com/service/license-summary/',
    source: 'https://pixabay.com/music/beats-sad-soul-hip-hop-185750/',
  },
  {
    id: 'doublehmajor-westcoast-90s', name: 'Westcoast 90s', artist: 'DoubleHMajor',
    style: 'old-school', tags: ['old-school', 'west-coast', 'g-funk'], bpm: 99,
    src: '/beats-v2/doublehmajor-westcoast-90s.mp3',
    license: 'Pixabay Content License',
    licenseUrl: 'https://pixabay.com/service/license-summary/',
    source: 'https://pixabay.com/music/beats-westcoast90stypebeat-508774/',
  },

  // ── Pro tier ───────────────────────────────────────────────────
  {
    id: 'pasabaa-anantha-pernel', name: 'Anantha Pernel', artist: 'Pasabaa',
    style: 'boom-bap', tags: ['boom-bap', 'modern'], bpm: 89,
    src: '/beats-v2/pasabaa-anantha-pernel.mp3',
    license: 'Pixabay Content License',
    licenseUrl: 'https://pixabay.com/service/license-summary/',
    source: 'https://pixabay.com/music/beats-rap-type-beat-anantha-pernel-instrumental-2025-416239/',
    pro: true,
  },
  {
    id: 'delosound-old-school', name: 'Old School', artist: 'Delosound',
    style: 'boom-bap', tags: ['boom-bap', 'old-school'], bpm: 86,
    // librosa returned 172.3 → halved (boom-bap convention; 172 is the
    // double-time hi-hat read, not the bar pulse).
    src: '/beats-v2/delosound-old-school.mp3',
    license: 'Pixabay Content License',
    licenseUrl: 'https://pixabay.com/service/license-summary/',
    source: 'https://pixabay.com/music/beats-hiphop-beat-old-school-boom-bap-421074/',
    pro: true,
  },
  {
    id: 'sound4stock-urban', name: 'Urban', artist: 'Sound4Stock',
    style: 'boom-bap', tags: ['boom-bap', 'urban'], bpm: 89,
    src: '/beats-v2/sound4stock-urban.mp3',
    license: 'Pixabay Content License',
    licenseUrl: 'https://pixabay.com/service/license-summary/',
    source: 'https://pixabay.com/music/beats-urban-hip-hop-rap-beat-464285/',
    pro: true,
  },
  {
    id: 'vxyage-territory', name: 'Territory', artist: 'Vxyage',
    style: 'boom-bap', tags: ['boom-bap', 'dark', 'horrorcore'], bpm: 99,
    src: '/beats-v2/vxyage-territory.mp3',
    license: 'Pixabay Content License',
    licenseUrl: 'https://pixabay.com/service/license-summary/',
    source: 'https://pixabay.com/music/beats-old-style-horrorcore-rap-territory-424309/',
    pro: true,
  },
  {
    id: 'yellowbirdbeats-back-right', name: 'Back Right', artist: 'YellowBirdBeats',
    style: 'boom-bap', tags: ['boom-bap', 'battle', 'freestyle'], bpm: 86,
    bar1OffsetSec: 1.51,
    // librosa returned 172.3 → halved; battle/freestyle context confirms
    // the slower bar pulse.
    src: '/beats-v2/yellowbirdbeats-back-right.mp3',
    license: 'Pixabay Content License',
    licenseUrl: 'https://pixabay.com/service/license-summary/',
    source: 'https://pixabay.com/music/beats-old-school-x-rap-x-hip-hop-beat-battle-x-freestyle-back-right-494512/',
    pro: true,
  },
  {
    id: 'jake-plah-freestyle', name: 'Freestyle', artist: 'Jake Plah',
    style: 'boom-bap', tags: ['boom-bap', 'freestyle', 'slow'], bpm: 76,
    // librosa returned 152 → halved. 76 fits the slow-warmup freestyle
    // pocket; if it's actually 152 trap, flip back and update the style.
    src: '/beats-v2/jake-plah-freestyle.mp3',
    license: 'Pixabay Content License',
    licenseUrl: 'https://pixabay.com/service/license-summary/',
    source: 'https://pixabay.com/music/beats-rap-freestyle-beat-435114/',
    pro: true,
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
