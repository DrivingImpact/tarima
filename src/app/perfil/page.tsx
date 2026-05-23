"use client";

import Link from "next/link";
import { useAppStore } from "@/lib/store";

const ACHIEVEMENT_ICONS: Record<string, string> = {
  trophy: "🏆",
  fire: "🔥",
  star: "⭐",
  zap: "⚡",
  medal: "🥇",
  crown: "👑",
  mic: "🎤",
  headphones: "🎧",
  infinity: "♾️",
  dice: "🎲",
  diamond: "💎",
  timer: "⏱️",
  rocket: "🚀",
};

export default function PerfilPage() {
  const { progress } = useAppStore();

  const unlocked = progress.achievements.filter((a) => a.unlockedAt !== null);
  const locked = progress.achievements.filter((a) => a.unlockedAt === null);

  return (
    <div className="app-screen flex flex-col px-4 pt-6 pb-6 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/"
          className="w-10 h-10 rounded-full card-dark flex items-center justify-center text-muted hover:text-foreground"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-lg font-bold">Perfil</h1>
        <div className="w-10" />
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-black uppercase tracking-wide">
          Tu
        </h2>
        <h2 className="text-3xl font-black uppercase tracking-wide gradient-text">
          Perfil
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="card-dark rounded-2xl p-4 text-center">
          <p className="text-2xl font-black text-accent">
            {progress.totalSessions}
          </p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">
            Sesiones
          </p>
        </div>
        <div className="card-dark rounded-2xl p-4 text-center">
          <p className="text-2xl font-black text-gold">
            {progress.totalBars}
          </p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">
            Barras
          </p>
        </div>
        <div className="card-dark rounded-2xl p-4 text-center">
          <p className="text-2xl font-black text-foreground">
            {progress.currentStreak}
          </p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">
            Racha Actual
          </p>
        </div>
        <div className="card-dark rounded-2xl p-4 text-center">
          <p className="text-2xl font-black text-foreground">
            {progress.longestStreak}
          </p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">
            Mejor Racha
          </p>
        </div>
      </div>

      <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted mb-3">
        Logros ({unlocked.length}/{progress.achievements.length})
      </p>

      {unlocked.length > 0 && (
        <div className="space-y-2 mb-4">
          {unlocked.map((a) => (
            <div
              key={a.id}
              className="card-dark rounded-2xl p-4 flex items-center gap-3 card-selected"
            >
              <span className="text-2xl">
                {ACHIEVEMENT_ICONS[a.icon] || "🏅"}
              </span>
              <div className="flex-1">
                <p className="font-bold text-sm">{a.name}</p>
                <p className="text-xs text-muted">{a.description}</p>
              </div>
              <span className="text-[10px] text-accent">
                {a.unlockedAt &&
                  new Date(a.unlockedAt).toLocaleDateString("es")}
              </span>
            </div>
          ))}
        </div>
      )}

      {locked.length > 0 && (
        <div className="space-y-2">
          {locked.map((a) => (
            <div
              key={a.id}
              className="card-dark rounded-2xl p-4 flex items-center gap-3 opacity-40"
            >
              <span className="text-2xl grayscale">
                {ACHIEVEMENT_ICONS[a.icon] || "🏅"}
              </span>
              <div>
                <p className="font-bold text-sm">{a.name}</p>
                <p className="text-xs text-muted">{a.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {progress.totalSessions === 0 && (
        <div className="text-center py-12">
          <p className="text-5xl mb-4">🎤</p>
          <p className="text-muted">
            Sin sesiones aún. ¡A rapear!
          </p>
          <Link
            href="/"
            className="inline-block mt-4 px-6 py-3 rounded-2xl btn-primary text-sm"
          >
            Jugar
          </Link>
        </div>
      )}
    </div>
  );
}
