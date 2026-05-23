import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  GameMode,
  Difficulty,
  RhymeScheme,
  BeatConfig,
  Word,
  GameState,
  UserProgress,
  Achievement,
  GameSettings,
} from './types';
import { DIFFICULTY_CONFIG } from './types';
import { generateRound, calculateScore } from './game-engine';
import type { BeatTrack } from './beat-tracks';
import {
  canStartSession,
  rollUsage,
  type DailyUsage,
  type SessionCheck,
} from './entitlements';

// ── Achievement definitions ──────────────────────────────────────

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'primera-rima',
    name: 'Primera Rima',
    description: 'Primera sesión completada',
    icon: 'trophy',
    unlockedAt: null,
    requirement: { type: 'sessions', value: 1 },
  },
  {
    id: 'calentando',
    name: 'Calentando',
    description: '5 sesiones completadas',
    icon: 'fire',
    unlockedAt: null,
    requirement: { type: 'sessions', value: 5 },
  },
  {
    id: 'veterano',
    name: 'Veterano',
    description: '25 sesiones completadas',
    icon: 'star',
    unlockedAt: null,
    requirement: { type: 'sessions', value: 25 },
  },
  {
    id: 'en-racha',
    name: 'En Racha',
    description: 'Racha de 3 dias seguidos',
    icon: 'zap',
    unlockedAt: null,
    requirement: { type: 'streak', value: 3 },
  },
  {
    id: 'imparable',
    name: 'Imparable',
    description: 'Racha de 7 dias seguidos',
    icon: 'flame',
    unlockedAt: null,
    requirement: { type: 'streak', value: 7 },
  },
  {
    id: 'leyenda',
    name: 'Leyenda',
    description: 'Racha de 30 dias seguidos',
    icon: 'crown',
    unlockedAt: null,
    requirement: { type: 'streak', value: 30 },
  },
  {
    id: '100-barras',
    name: '100 Barras',
    description: '100 barras rimadas en total',
    icon: 'mic',
    unlockedAt: null,
    requirement: { type: 'bars', value: 100 },
  },
  {
    id: 'mil-barras',
    name: 'Mil Barras',
    description: '1000 barras rimadas en total',
    icon: 'mic-vocal',
    unlockedAt: null,
    requirement: { type: 'bars', value: 1000 },
  },
  {
    id: '5000-barras',
    name: 'Maquina de Rimas',
    description: '5000 barras rimadas en total',
    icon: 'rocket',
    unlockedAt: null,
    requirement: { type: 'bars', value: 5000 },
  },
  {
    id: 'maestro-clasico',
    name: 'Maestro Clasico',
    description: '50 sesiones en modo Clasico',
    icon: 'target',
    unlockedAt: null,
    requirement: { type: 'mode', value: 50, mode: 'clasico' },
  },
  {
    id: 'toque-perfecto',
    name: 'Toque Perfecto',
    description: '50 sesiones en modo Toque',
    icon: 'hand',
    unlockedAt: null,
    requirement: { type: 'mode', value: 50, mode: 'toque' },
  },
  {
    id: 'infinito',
    name: 'Infinito',
    description: '100 barras en una sesion de Barras Infinitas',
    icon: 'infinity',
    unlockedAt: null,
    requirement: { type: 'mode', value: 100, mode: 'barras-infinitas' },
  },
  {
    id: 'generador-pro',
    name: 'Generador Pro',
    description: '50 sesiones en modo Generador',
    icon: 'dice',
    unlockedAt: null,
    requirement: { type: 'mode', value: 50, mode: 'generador' },
  },
  {
    id: 'nivel-experto',
    name: 'Nivel Experto',
    description: 'Una sesión en Experto',
    icon: 'skull',
    unlockedAt: null,
    requirement: { type: 'difficulty', value: 1, difficulty: 'experto' },
  },
  {
    id: 'maratonista',
    name: 'Maratonista',
    description: 'Sesión de más de 10 minutos',
    icon: 'timer',
    unlockedAt: null,
    requirement: { type: 'sessions', value: 1 },
  },
  {
    id: 'diez-sesiones',
    name: 'Dedicado',
    description: '10 sesiones completadas',
    icon: 'medal',
    unlockedAt: null,
    requirement: { type: 'sessions', value: 10 },
  },
];

// ── Mode session counters (not persisted individually, tracked in-memory) ───

interface ModeSessionCounts {
  clasico: number;
  toque: number;
  'barras-infinitas': number;
  generador: number;
}

// ── Store types ──────────────────────────────────────────────────

interface GameSlice extends GameState {
  // Transient session tracking
  wordPool: Word[];
  usedWords: Set<string>;
}

interface ProgressSlice extends UserProgress {
  modeSessions: ModeSessionCounts;
  difficultySessions: Record<Difficulty, number>;
}

// ── Entitlements (persisted) ─────────────────────────────────────
// Pro flag + the daily-session counter for the free tier. Kept in its own
// slice (not on `progress`) so the gating rules in entitlements.ts have
// exactly one place to read from and one place to write to.
interface EntitlementsSlice {
  isPro: boolean;
  // Resets at local midnight via `rollUsage()`. Persisted as plain JSON.
  dailyUsage: DailyUsage;
}

interface AppStore {
  // ── Game state (not persisted) ──
  game: GameSlice;

  // ── User progress (persisted) ──
  progress: ProgressSlice;

  // ── Settings (persisted) ──
  settings: GameSettings;

  // ── Entitlements (persisted) ──
  entitlements: EntitlementsSlice;

  // ── Actions ──
  startGame: (
    mode: GameMode,
    difficulty: Difficulty,
    scheme: RhymeScheme,
    beat: BeatConfig | null,
    wordPool: Word[],
  ) => void;
  pauseGame: () => void;
  resumeGame: () => void;
  stopGame: () => void;
  advanceWord: () => void;
  completeBar: () => void;
  endSession: () => void;
  updateStreak: () => void;
  unlockAchievement: (id: string) => void;
  updateSettings: (partial: Partial<GameSettings>) => void;
  toggleRecording: () => void;

  // ── Entitlements actions ──
  /** Activate / revoke Pro. Today the only caller is the manual /pro flow;
   *  once a payment provider is wired (RevenueCat / Stripe), the webhook
   *  hands off to this same setter. */
  setPro: (value: boolean) => void;
  /** Pure read: would this beat be allowed right now? Doesn't mutate state.
   *  UI calls this before navigating into the game. */
  checkSession: (beat: BeatTrack) => SessionCheck;
  /** Mark a free session as spent today. No-op for Pro. Called from the
   *  home page right after `startGame` so a paused/abandoned session still
   *  counts (otherwise free users get unlimited retries by quitting). */
  recordSessionStart: () => void;
}

// ── Helpers ──────────────────────────────────────────────────────

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string): number {
  const msPerDay = 86_400_000;
  return Math.round(
    (new Date(b).getTime() - new Date(a).getTime()) / msPerDay,
  );
}

function mergeAchievements(
  stored: Achievement[],
  defaults: Achievement[],
): Achievement[] {
  const map = new Map<string, Achievement>();
  for (const a of defaults) map.set(a.id, { ...a });
  // Overlay stored unlock dates
  for (const a of stored) {
    if (map.has(a.id)) {
      map.get(a.id)!.unlockedAt = a.unlockedAt;
    }
  }
  return Array.from(map.values());
}

// ── Initial states ───────────────────────────────────────────────

const initialGame: GameSlice = {
  mode: 'clasico',
  difficulty: 'principiante',
  rhymeScheme: 'AABB',
  isPlaying: false,
  isPaused: false,
  currentBeat: null,
  currentWords: [],
  activeWordIndex: 0,
  currentRhymeGroup: 0,
  score: 0,
  barsCompleted: 0,
  sessionStartTime: null,
  isRecording: false,
  wordPool: [],
  usedWords: new Set(),
};

const initialProgress: ProgressSlice = {
  totalSessions: 0,
  totalBars: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastSessionDate: null,
  achievements: ACHIEVEMENTS.map((a) => ({ ...a })),
  favoriteMode: null,
  favoriteBeat: null,
  modeSessions: {
    clasico: 0,
    toque: 0,
    'barras-infinitas': 0,
    generador: 0,
  },
  difficultySessions: {
    principiante: 0,
    intermedio: 0,
    avanzado: 0,
    experto: 0,
  },
};

const initialSettings: GameSettings = {
  metronomeEnabled: true,
  metronomeVolume: 0.7,
  beatVolume: 0.8,
  wordChangeInterval: 4000,
  showRhymeHints: true,
  autoAdvance: true,
  countdownEnabled: true,
  rhymeType: 'ambas',
};

const initialEntitlements: EntitlementsSlice = {
  isPro: false,
  // `rollUsage(null)` returns today's date with count=0 — safe initial value
  // even if the store is first instantiated server-side (todayLocalStr just
  // reads the build-time / SSR clock; the client will re-roll on hydration).
  dailyUsage: rollUsage(null),
};

// ── Store ────────────────────────────────────────────────────────

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      game: { ...initialGame },
      progress: { ...initialProgress },
      settings: { ...initialSettings },
      entitlements: { ...initialEntitlements },

      // ── Game actions ──

      startGame: (mode, difficulty, scheme, beat, wordPool) => {
        const config = DIFFICULTY_CONFIG[difficulty];
        const count = config.wordsPerRound;
        const words = generateRound(wordPool, scheme, count);
        set({
          game: {
            ...initialGame,
            mode,
            difficulty,
            rhymeScheme: scheme,
            isPlaying: true,
            currentBeat: beat,
            currentWords: words,
            sessionStartTime: Date.now(),
            wordPool,
            usedWords: new Set(words.map((w) => w.text)),
          },
          settings: {
            ...get().settings,
            wordChangeInterval: config.wordChangeMs,
            showRhymeHints: config.showRhymeHints,
          },
        });
      },

      pauseGame: () => {
        set((state) => ({
          game: { ...state.game, isPaused: true },
        }));
      },

      resumeGame: () => {
        set((state) => ({
          game: { ...state.game, isPaused: false },
        }));
      },

      stopGame: () => {
        const { game } = get();
        if (game.isPlaying) {
          get().endSession();
        }
        set({
          game: { ...initialGame },
        });
      },

      advanceWord: () => {
        set((state) => {
          const { game } = state;
          const nextIndex = game.activeWordIndex + 1;

          // If we've gone through all current words, generate more (for endless mode)
          if (nextIndex >= game.currentWords.length) {
            if (game.mode === 'barras-infinitas') {
              const config = DIFFICULTY_CONFIG[game.difficulty];
              const newWords = generateRound(
                game.wordPool,
                game.rhymeScheme,
                config.wordsPerRound,
              );
              const newUsed = new Set(game.usedWords);
              for (const w of newWords) newUsed.add(w.text);

              return {
                game: {
                  ...game,
                  currentWords: newWords,
                  activeWordIndex: 0,
                  currentRhymeGroup: game.currentRhymeGroup + 1,
                  usedWords: newUsed,
                },
              };
            }
            // Non-endless: stay at last word
            return { game };
          }

          return {
            game: {
              ...game,
              activeWordIndex: nextIndex,
            },
          };
        });
      },

      completeBar: () => {
        set((state) => ({
          game: {
            ...state.game,
            barsCompleted: state.game.barsCompleted + 1,
            score: calculateScore(
              state.game.barsCompleted + 1,
              state.game.difficulty,
              state.game.mode,
            ),
          },
        }));
      },

      endSession: () => {
        const { game, progress } = get();
        if (!game.isPlaying && game.barsCompleted === 0) return;

        const sessionDurationMs = game.sessionStartTime
          ? Date.now() - game.sessionStartTime
          : 0;
        const sessionMinutes = sessionDurationMs / 60_000;

        const newTotalSessions = progress.totalSessions + 1;
        const newTotalBars = progress.totalBars + game.barsCompleted;
        const newModeSessions = { ...progress.modeSessions };
        newModeSessions[game.mode] += 1;
        const newDifficultySessions = { ...progress.difficultySessions };
        newDifficultySessions[game.difficulty] += 1;

        // Find favorite mode
        let favoriteMode: GameMode = game.mode;
        let maxSessions = 0;
        for (const [mode, count] of Object.entries(newModeSessions)) {
          if (count > maxSessions) {
            maxSessions = count;
            favoriteMode = mode as GameMode;
          }
        }

        // Update streak
        const today = todayStr();
        let { currentStreak, longestStreak } = progress;
        if (progress.lastSessionDate) {
          const gap = daysBetween(progress.lastSessionDate, today);
          if (gap === 1) {
            currentStreak += 1;
          } else if (gap > 1) {
            currentStreak = 1;
          }
          // gap === 0 means same day, streak stays the same
        } else {
          currentStreak = 1;
        }
        if (currentStreak > longestStreak) {
          longestStreak = currentStreak;
        }

        // Check achievements
        const achievements = mergeAchievements(
          progress.achievements,
          ACHIEVEMENTS,
        );
        const now = new Date().toISOString();

        for (const a of achievements) {
          if (a.unlockedAt) continue; // already unlocked

          switch (a.requirement.type) {
            case 'sessions':
              if (a.id === 'maratonista') {
                if (sessionMinutes >= 10) a.unlockedAt = now;
              } else if (newTotalSessions >= a.requirement.value) {
                a.unlockedAt = now;
              }
              break;
            case 'bars':
              if (newTotalBars >= a.requirement.value) {
                a.unlockedAt = now;
              }
              break;
            case 'streak':
              if (currentStreak >= a.requirement.value) {
                a.unlockedAt = now;
              }
              break;
            case 'mode':
              if (a.requirement.mode) {
                // "infinito" is special: 100 bars in a single endless session
                if (a.id === 'infinito') {
                  if (
                    game.mode === 'barras-infinitas' &&
                    game.barsCompleted >= a.requirement.value
                  ) {
                    a.unlockedAt = now;
                  }
                } else if (
                  newModeSessions[a.requirement.mode] >= a.requirement.value
                ) {
                  a.unlockedAt = now;
                }
              }
              break;
            case 'difficulty':
              if (
                a.requirement.difficulty &&
                game.difficulty === a.requirement.difficulty &&
                newDifficultySessions[a.requirement.difficulty] >=
                  a.requirement.value
              ) {
                a.unlockedAt = now;
              }
              break;
          }
        }

        set({
          progress: {
            ...progress,
            totalSessions: newTotalSessions,
            totalBars: newTotalBars,
            currentStreak,
            longestStreak,
            lastSessionDate: today,
            achievements,
            favoriteMode,
            favoriteBeat: game.currentBeat?.id ?? progress.favoriteBeat,
            modeSessions: newModeSessions,
            difficultySessions: newDifficultySessions,
          },
          game: {
            ...get().game,
            isPlaying: false,
          },
        });
      },

      updateStreak: () => {
        set((state) => {
          const today = todayStr();
          let { currentStreak, longestStreak, lastSessionDate } =
            state.progress;

          if (lastSessionDate) {
            const gap = daysBetween(lastSessionDate, today);
            if (gap > 1) {
              currentStreak = 0;
            }
          }

          return {
            progress: {
              ...state.progress,
              currentStreak,
              longestStreak:
                currentStreak > longestStreak ? currentStreak : longestStreak,
            },
          };
        });
      },

      unlockAchievement: (id: string) => {
        set((state) => {
          const achievements = state.progress.achievements.map((a) =>
            a.id === id && !a.unlockedAt
              ? { ...a, unlockedAt: new Date().toISOString() }
              : a,
          );
          return {
            progress: { ...state.progress, achievements },
          };
        });
      },

      updateSettings: (partial: Partial<GameSettings>) => {
        set((state) => ({
          settings: { ...state.settings, ...partial },
        }));
      },

      toggleRecording: () => {
        set((state) => ({
          game: { ...state.game, isRecording: !state.game.isRecording },
        }));
      },

      // ── Entitlements ──

      setPro: (value: boolean) => {
        set((state) => ({
          entitlements: { ...state.entitlements, isPro: value },
        }));
      },

      checkSession: (beat) => {
        const { entitlements } = get();
        // Roll the counter through `canStartSession` reading — but don't
        // persist the roll here; this is a pure check. The roll happens
        // for real inside `recordSessionStart`.
        const usage = rollUsage(entitlements.dailyUsage);
        return canStartSession(beat, entitlements.isPro, usage);
      },

      recordSessionStart: () => {
        set((state) => {
          if (state.entitlements.isPro) return state; // unlimited
          const rolled = rollUsage(state.entitlements.dailyUsage);
          return {
            entitlements: {
              ...state.entitlements,
              dailyUsage: { ...rolled, count: rolled.count + 1 },
            },
          };
        });
      },
    }),
    {
      name: 'tarima-storage',
      partialize: (state) => ({
        progress: {
          ...state.progress,
          // Convert Set to serialisable form isn't needed here since
          // usedWords lives on the game slice, not progress
        },
        settings: state.settings,
        entitlements: state.entitlements,
      }),
      merge: (persisted, current) => {
        const p = persisted as Partial<AppStore>;
        return {
          ...current,
          progress: {
            ...current.progress,
            ...p.progress,
            achievements: mergeAchievements(
              p.progress?.achievements ?? [],
              ACHIEVEMENTS,
            ),
          },
          settings: {
            ...current.settings,
            ...p.settings,
          },
          entitlements: {
            ...current.entitlements,
            ...p.entitlements,
            // Roll the counter on every hydration so a free user who reopens
            // the app the next day starts fresh, even before they touch a
            // session — keeps the home-screen "X sesiones restantes hoy"
            // honest.
            dailyUsage: rollUsage(p.entitlements?.dailyUsage),
          },
        };
      },
    },
  ),
);
