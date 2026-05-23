"use client";

import { useAppStore } from "@/lib/store";
import { DIFFICULTY_CONFIG } from "@/lib/types";

export function GameStats() {
  const { game } = useAppStore();

  const elapsed = game.sessionStartTime
    ? Math.floor((Date.now() - game.sessionStartTime) / 1000)
    : 0;
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-4">
        <div>
          <span className="text-muted text-xs">Barras</span>
          <p className="font-bold text-lg">{game.barsCompleted}</p>
        </div>
        <div>
          <span className="text-muted text-xs">Puntos</span>
          <p className="font-bold text-lg">{game.score}</p>
        </div>
      </div>

      <div className="text-right">
        <span className="text-muted text-xs">
          {DIFFICULTY_CONFIG[game.difficulty].label}
        </span>
        <p className="font-mono font-bold text-lg">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}
