export type GameMode = 'clasico' | 'toque' | 'barras-infinitas' | 'generador';
export type Difficulty = 'principiante' | 'intermedio' | 'avanzado' | 'experto';
export type RhymeScheme = 'AABB' | 'ABAB' | 'ABBA' | 'AAAA';

// Most rap is 4/4 but lofi/jazz-hop can sit in 6/8 swing, and halftime
// reframes 4/4 (kick on 1, snare on 3, half the perceived tempo). The UI
// reads the parsed beatsPerBar to draw the staff.
export type TimeSignature = '4/4' | '3/4' | '6/8' | '4/4-halftime';

export function beatsPerBarFor(sig: TimeSignature): number {
  switch (sig) {
    case '3/4':
      return 3;
    case '6/8':
      return 6;
    case '4/4-halftime':
    case '4/4':
    default:
      return 4;
  }
}

export interface Word {
  text: string;
  syllables: number;
  difficulty: Difficulty;
  rhymeEnding: string;
  category: WordCategory;
}

export type WordCategory =
  | 'comun'
  | 'verbo'
  | 'adjetivo'
  | 'abstracto'
  | 'urbano'
  | 'emocion'
  | 'naturaleza'
  | 'cuerpo'
  | 'musica'
  | 'tiempo';

export interface RhymeGroup {
  ending: string;
  words: Word[];
}

export interface BeatConfig {
  id: string;
  name: string;
  bpm: number;
  style: BeatStyle;
  pattern: DrumPattern;
  timeSignature?: TimeSignature; // defaults to '4/4'
  // Full URL or path to the MP3. Sheet-supplied tracks ship absolute URLs
  // (Cloudflare R2); bundled fallbacks use relative paths under /public.
  // Optional only because the legacy synthesised-drum beat library has no
  // audio file — that path is no longer reachable from the UI.
  src?: string;
  // Seconds into the audio buffer where beat 1 of bar 1 lives. Skips the
  // intro / pickup. If undefined, MusicClock auto-detects on load.
  bar1OffsetSec?: number;
}

export type BeatStyle = 'boom-bap' | 'trap' | 'lofi' | 'reggaeton' | 'old-school' | 'jazz-hop' | 'latin' | 'drill';

export interface DrumPattern {
  kick: boolean[];
  snare: boolean[];
  hihat: boolean[];
  openhat: boolean[];
  perc: boolean[];
  steps: number;
}

export interface GameState {
  mode: GameMode;
  difficulty: Difficulty;
  rhymeScheme: RhymeScheme;
  isPlaying: boolean;
  isPaused: boolean;
  currentBeat: BeatConfig | null;
  currentWords: Word[];
  activeWordIndex: number;
  currentRhymeGroup: number;
  score: number;
  barsCompleted: number;
  sessionStartTime: number | null;
  isRecording: boolean;
}

export interface UserProgress {
  totalSessions: number;
  totalBars: number;
  currentStreak: number;
  longestStreak: number;
  lastSessionDate: string | null;
  achievements: Achievement[];
  favoriteMode: GameMode | null;
  favoriteBeat: string | null;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string | null;
  requirement: AchievementRequirement;
}

export interface AchievementRequirement {
  type: 'sessions' | 'bars' | 'streak' | 'mode' | 'difficulty';
  value: number;
  mode?: GameMode;
  difficulty?: Difficulty;
}

export interface GameSettings {
  metronomeEnabled: boolean;
  metronomeVolume: number;
  beatVolume: number;
  wordChangeInterval: number;
  showRhymeHints: boolean;
  autoAdvance: boolean;
  countdownEnabled: boolean;
  rhymeType: 'consonante' | 'asonante' | 'ambas';
}

export const DIFFICULTY_CONFIG: Record<Difficulty, {
  label: string;
  wordChangeMs: number;
  syllableRange: [number, number];
  wordsPerRound: number;
  showRhymeHints: boolean;
  description: string;
}> = {
  principiante: {
    label: 'Principiante',
    wordChangeMs: 4000,
    syllableRange: [1, 2],
    wordsPerRound: 8,
    showRhymeHints: true,
    description: 'Palabras simples, ritmo lento',
  },
  intermedio: {
    label: 'Intermedio',
    wordChangeMs: 2500,
    syllableRange: [1, 3],
    wordsPerRound: 12,
    showRhymeHints: true,
    description: 'Más palabras, ritmo moderado',
  },
  avanzado: {
    label: 'Avanzado',
    wordChangeMs: 1800,
    syllableRange: [2, 4],
    wordsPerRound: 16,
    showRhymeHints: false,
    description: 'Vocabulario amplio, ritmo rápido',
  },
  experto: {
    label: 'Experto',
    wordChangeMs: 1200,
    syllableRange: [2, 5],
    wordsPerRound: 20,
    showRhymeHints: false,
    description: 'Sin ayuda, velocidad máxima',
  },
};

export const MODE_CONFIG: Record<GameMode, {
  label: string;
  icon: string;
  description: string;
  longDescription: string;
}> = {
  clasico: {
    label: 'Clásico',
    icon: '🎯',
    description: 'La bola marca el ritmo',
    longDescription: 'Una bola rebota sobre las palabras al ritmo del beat. Rima con la palabra iluminada.',
  },
  toque: {
    label: 'Toque',
    icon: '👆',
    description: 'Ritmo libre',
    longDescription: 'Un toque para avanzar a la siguiente palabra. Práctica al ritmo elegido.',
  },
  'barras-infinitas': {
    label: 'Barras Infinitas',
    icon: '♾️',
    description: 'Freestyle sin fin',
    longDescription: 'Las palabras siguen llegando sin parar. Resistencia y flujo.',
  },
  generador: {
    label: 'Generador',
    icon: '🎲',
    description: 'Palabras al azar',
    longDescription: 'Palabras aleatorias a la velocidad elegida. Entrenamiento de improvisación.',
  },
};
