"use client";

import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { DIFFICULTY_CONFIG, MODE_CONFIG } from "@/lib/types";

export function SessionSummary() {
  const router = useRouter();
  const { game, progress } = useAppStore();

  const elapsed = game.sessionStartTime
    ? Math.floor((Date.now() - game.sessionStartTime) / 1000)
    : 0;
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-slide-up">
        <div className="bg-surface border border-border rounded-2xl p-6 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Sesión Completa</h2>
            <p className="text-muted mt-1">Buen trabajo</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-background text-center">
              <p className="text-3xl font-bold text-accent">
                {game.barsCompleted}
              </p>
              <p className="text-xs text-muted mt-1">Barras</p>
            </div>
            <div className="p-4 rounded-xl bg-background text-center">
              <p className="text-3xl font-bold text-accent">{game.score}</p>
              <p className="text-xs text-muted mt-1">Puntos</p>
            </div>
            <div className="p-4 rounded-xl bg-background text-center">
              <p className="text-3xl font-bold">
                {minutes}:{String(seconds).padStart(2, "0")}
              </p>
              <p className="text-xs text-muted mt-1">Duración</p>
            </div>
            <div className="p-4 rounded-xl bg-background text-center">
              <p className="text-3xl font-bold">{progress.currentStreak}</p>
              <p className="text-xs text-muted mt-1">Racha</p>
            </div>
          </div>

          <div className="text-xs text-muted text-center space-y-1">
            <p>
              {MODE_CONFIG[game.mode].label} ·{" "}
              {DIFFICULTY_CONFIG[game.difficulty].label}
            </p>
            <p>Esquema {game.rhymeScheme}</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => router.push("/")}
              className="flex-1 py-3 rounded-xl border border-border bg-surface font-semibold hover:bg-surface-hover transition-colors"
            >
              Inicio
            </button>
            <button
              onClick={() => router.push("/perfil")}
              className="flex-1 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark transition-colors"
            >
              Ver Perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
