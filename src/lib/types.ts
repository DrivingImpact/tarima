export type GameMode = 'clasico' | 'toque' | 'barras-infinitas' | 'generador';
export type Difficulty = 'principiante' | 'intermedio' | 'avanzado' | 'experto';
export type RhymeScheme = 'AABB' | 'ABAB' | 'ABBA' | 'AAAA';

// ── Drills: prompt kind + session modifier ───────────────────────
// A drill is two orthogonal dimensions layered on top of the existing modes,
// so GameMode stays stable. `PromptKind` chooses what the changing prompt
// banner shows (real freestyle "deja": an object, an emotion, a place, a
// situation, or a theme to weave in); 'palabras' = no banner, classic word
// flow only. `SessionModifier` reshapes the beat/tempo during the session.
export type PromptKind =
  | 'palabras'
  | 'objeto'
  | 'emocion'
  | 'lugar'
  | 'situacion'
  | 'tematica';

export interface PromptCard {
  kind: PromptKind;
  // The thing to incorporate, e.g. "una llave oxidada", "nostalgia",
  // "un andén vacío", "perdiste la última batalla".
  text: string;
  // Optional second line for flavour / instruction.
  hint?: string;
}

// 'ninguno' = steady beat. 'doble-tempo' = words/banner speed ramps up over
// the session (double-time trainer). 'sangre' = the beat character switches
// partway (4x4 battle simulation: adapt mid-flow).
export type SessionModifier = 'ninguno' | 'doble-tempo' | 'sangre';

export const PROMPT_KIND_CONFIG: Record<PromptKind, {
  label: string;
  icon: string;
  description: string;
}> = {
  palabras: { label: 'Palabras', icon: '🔤', description: 'Solo palabras al ritmo' },
  objeto: { label: 'Deja / Objeto', icon: '🎁', description: 'Mete el objeto que aparece' },
  emocion: { label: 'Emoción', icon: '💔', description: 'Rapea desde la emoción dada' },
  lugar: { label: 'Lugar', icon: '📍', description: 'Sitúa la rima en ese lugar' },
  situacion: { label: 'Situación', icon: '🎬', description: 'Improvisa sobre la escena' },
  tematica: { label: 'Temática', icon: '🧠', description: 'Todo gira en torno al tema' },
};

export const MODIFIER_CONFIG: Record<SessionModifier, {
  label: string;
  icon: string;
  description: string;
}> = {
  ninguno: { label: 'Normal', icon: '▶️', description: 'Ritmo constante' },
  'doble-tempo': { label: 'Doble Tempo', icon: '⚡', description: 'La velocidad sube poco a poco' },
  sangre: { label: 'Sangre / 4x4', icon: '🩸', description: 'El beat cambia a mitad' },
};

// ── Recordings (record & review) ─────────────────────────────────
export interface RecordingMeta {
  id: string;
  createdAt: string; // ISO timestamp
  durationSec: number;
  beatId: string | null;
  beatName: string | null;
  mode: GameMode;
  bars: number;
  // Where the audio blob lives. Web → IndexedDB under `storageKey`; native
  // (Capacitor) → Filesystem path under `storageKey`. Metadata persists in the
  // store; the blob is fetched on demand for playback.
  storage: 'idb' | 'filesystem';
  storageKey: string;
  // Optional user-given title.
  title?: string;
}

// ── Daily challenge (reto del día) ───────────────────────────────
export interface DailyChallengeDef {
  date: string; // YYYY-MM-DD (local)
  beatId: string;
  scheme: RhymeScheme;
  difficulty: Difficulty;
  promptKind: PromptKind;
  // Deterministic seed so everyone gets the same words on the same day.
  seed: number;
}

export interface DailyState {
  lastCompletedDate: string | null; // YYYY-MM-DD
  streak: number;
  bestBars: number;
  // Recent results, newest first, capped by the store.
  history: { date: string; bars: number }[];
}

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
  // ── Drill state (set at startGame) ──
  promptKind: PromptKind;
  modifier: SessionModifier;
  // The live prompt banner for non-'palabras' drills; null for 'palabras'.
  currentPrompt: PromptCard | null;
  // True while running a reto-del-día session (counts toward the daily streak).
  isDaily: boolean;
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
  // ── Honest training-breadth stats (folded in at endSession) ──
  // Unique words the trainer has shown this user, capped by the store.
  // Length = "palabras entrenadas" (vocabulary range trained on).
  vocabUsed: string[];
  // Slowest / fastest BPM the user has actually practised at.
  bpmTrainedMin: number | null;
  bpmTrainedMax: number | null;
  // Distinct rhyme schemes and prompt kinds practised.
  schemesPracticed: RhymeScheme[];
  promptKindsPracticed: PromptKind[];
  // Total practice time in seconds.
  totalSeconds: number;
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
