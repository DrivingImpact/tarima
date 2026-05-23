import type { BeatStyle, TimeSignature } from './types';

export interface BeatTrack {
  id: string;
  name: string;
  artist: string;
  style: BeatStyle;
  tags: string[];
  // Authoritative BPM — drives the master clock. No runtime detection;
  // sync depends on this being accurate. Verify by tapping along to the
  // first 30 seconds on a metronome and adjust here if off by ±1.
  bpm: number;
  // Optional: seconds into the buffer where beat 1 of bar 1 lives.
  // Default 0 = file starts on a downbeat. Users can fine-tune live via
  // the resync button; the tuned value is cached in localStorage.
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

// Old-school 80-95 BPM hip-hop instrumentals from 5 different producers.
// Max 3 tracks per artist for diversity. All Creative Commons licensed.
export const BEAT_TRACKS: BeatTrack[] = [
  // ── Lamar Cole — "Dance With Wolves" beat tape (CC0) ──
  {
    id: 'lovely-nights', name: 'Lovely Nights', artist: 'Lamar Cole',
    style: 'boom-bap', tags: ['boom-bap', '90s', 'smooth'], bpm: 90,
    src: '/beats-v2/lovely-nights.mp3',
    license: 'CC0 1.0 (Public Domain)',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    source: 'https://archive.org/details/DanceWithWolvesBeatTape',
  },
  {
    id: 'in-the-park', name: 'In The Park', artist: 'Lamar Cole',
    style: 'boom-bap', tags: ['boom-bap', 'mellow'], bpm: 88,
    src: '/beats-v2/in-the-park.mp3',
    license: 'CC0 1.0 (Public Domain)',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    source: 'https://archive.org/details/DanceWithWolvesBeatTape',
    pro: true,
  },
  {
    id: 'goodbye-love', name: 'Goodbye Love', artist: 'Lamar Cole',
    style: 'boom-bap', tags: ['boom-bap', 'soul'], bpm: 88,
    src: '/beats-v2/goodbye-love.mp3',
    license: 'CC0 1.0 (Public Domain)',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    source: 'https://archive.org/details/DanceWithWolvesBeatTape',
    pro: true,
  },

  // ── Kravvall (CC0) ──
  {
    id: 'kravvall-coupe', name: 'Coupe de Grace', artist: 'Kravvall',
    style: 'boom-bap', tags: ['boom-bap', 'cinematic'], bpm: 90,
    src: '/beats-v2/kravvall-coupe.mp3',
    license: 'CC0 1.0 (Public Domain)',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    source: 'https://archive.org/details/KravvallCoupeDeGrace',
  },
  {
    id: 'kravvall-marching', name: 'Marching Forward', artist: 'Kravvall',
    style: 'boom-bap', tags: ['boom-bap', 'driving'], bpm: 88,
    src: '/beats-v2/kravvall-marching.mp3',
    license: 'CC0 1.0 (Public Domain)',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    source: 'https://archive.org/details/KravvallCoupeDeGrace',
    pro: true,
  },
  {
    id: 'kravvall-days', name: 'Days Gone By', artist: 'Kravvall',
    style: 'lofi', tags: ['lofi', 'nostalgic'], bpm: 82,
    src: '/beats-v2/kravvall-days.mp3',
    license: 'CC0 1.0 (Public Domain)',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    source: 'https://archive.org/details/KravvallCoupeDeGrace',
  },

  // ── Cely Grande (CC0) ──
  {
    id: 'love-at-first-sight', name: 'Love At First Sight', artist: 'Cely Grande',
    style: 'jazz-hop', tags: ['boom-bap', 'romantic', 'soulful'], bpm: 88,
    src: '/beats-v2/love-at-first-sight.mp3',
    license: 'CC0 1.0 (Public Domain)',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    source: 'https://archive.org/details/CelyGrande-LoveAtFirstSighthip-hopInstrumental',
  },
  {
    id: 'free-as-a-bird', name: 'Free As A Bird', artist: 'Cely Grande',
    style: 'boom-bap', tags: ['boom-bap', 'uplifting'], bpm: 90,
    src: '/beats-v2/free-as-a-bird.mp3',
    license: 'CC0 1.0 (Public Domain)',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    source: 'https://archive.org/details/CelyGrande-HiphopInstrumentalfreeAsABird',
    pro: true,
  },
  {
    id: 'friends-4-ever', name: 'Friends 4 Ever', artist: 'Cely Grande',
    style: 'boom-bap', tags: ['boom-bap', 'sample-heavy'], bpm: 92,
    src: '/beats-v2/friends-4-ever.mp3',
    license: 'CC0 1.0 (Public Domain)',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    source: 'https://archive.org/details/CelyGrande-Friends4Everhip-hopInstrumental',
    pro: true,
  },

  // ── Katrah-Quey — "Radio Tag" (CC-BY-SA 3.0) ──
  {
    id: 'katrah-ultratranslucent', name: 'Ultratranslucent', artist: 'Katrah-Quey',
    style: 'jazz-hop', tags: ['boom-bap', 'jazzy', 'sample-heavy'], bpm: 88,
    src: '/beats-v2/katrah-ultratranslucent.mp3',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    source: 'https://archive.org/details/RadioTag',
    pro: true,
  },
  {
    id: 'katrah-morning-photos', name: 'Morning Photographs', artist: 'Katrah-Quey',
    style: 'jazz-hop', tags: ['boom-bap', 'mellow', 'jazzy'], bpm: 86,
    src: '/beats-v2/katrah-morning-photos.mp3',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    source: 'https://archive.org/details/RadioTag',
    pro: true,
  },
  {
    id: 'katrah-cardboard', name: 'Cardboard Conveyors', artist: 'Katrah-Quey',
    style: 'jazz-hop', tags: ['boom-bap', 'gritty', 'experimental'], bpm: 90,
    src: '/beats-v2/katrah-cardboard.mp3',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    source: 'https://archive.org/details/RadioTag',
    pro: true,
  },

  // ── OE Beats (CC0) ──
  {
    id: 'everything-okay', name: 'Everything Is Okay', artist: 'OE Beats',
    style: 'jazz-hop', tags: ['storytelling', 'lofi'], bpm: 85,
    src: '/beats-v2/everything-okay.mp3',
    license: 'CC0 1.0 (Public Domain)',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    source: 'https://archive.org/details/oe-beats-everything-is-okay',
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
