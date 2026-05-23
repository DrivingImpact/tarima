"use client";

import { useAppStore } from "@/lib/store";

interface GameControlsProps {
  onStop: () => void;
  bpm: number;
  onBpmChange: (bpm: number) => void;
}

export function GameControls({ onStop, bpm, onBpmChange }: GameControlsProps) {
  const { game, pauseGame, resumeGame, settings, updateSettings, toggleRecording } =
    useAppStore();

  return (
    <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-surface border border-border">
      <div className="flex items-center gap-2">
        <button
          onClick={() => (game.isPaused ? resumeGame() : pauseGame())}
          className="w-10 h-10 rounded-full bg-surface-hover flex items-center justify-center hover:bg-accent/10 transition-colors"
          title={game.isPaused ? "Reanudar" : "Pausar"}
        >
          {game.isPaused ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          )}
        </button>

        <button
          onClick={onStop}
          className="w-10 h-10 rounded-full bg-surface-hover flex items-center justify-center hover:bg-danger/10 text-danger transition-colors"
          title="Parar"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <rect x="4" y="4" width="16" height="16" rx="2" />
          </svg>
        </button>

        <button
          onClick={toggleRecording}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
            game.isRecording
              ? "bg-danger text-white"
              : "bg-surface-hover hover:bg-danger/10 text-muted"
          }`}
          title={game.isRecording ? "Parar grabación" : "Grabar"}
        >
          <div
            className={`w-3 h-3 rounded-full ${
              game.isRecording ? "bg-white animate-pulse" : "bg-danger"
            }`}
          />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateSettings({ metronomeEnabled: !settings.metronomeEnabled })}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              settings.metronomeEnabled
                ? "bg-accent/10 text-accent border border-accent/30"
                : "bg-surface-hover text-muted border border-transparent"
            }`}
          >
            Metro
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onBpmChange(Math.max(60, bpm - 5))}
            className="w-7 h-7 rounded-md bg-surface-hover flex items-center justify-center text-xs font-bold hover:bg-accent/10 transition-colors"
          >
            -
          </button>
          <span className="text-sm font-mono font-semibold w-12 text-center">
            {bpm}
          </span>
          <button
            onClick={() => onBpmChange(Math.min(180, bpm + 5))}
            className="w-7 h-7 rounded-md bg-surface-hover flex items-center justify-center text-xs font-bold hover:bg-accent/10 transition-colors"
          >
            +
          </button>
          <span className="text-[10px] text-muted">BPM</span>
        </div>
      </div>
    </div>
  );
}
