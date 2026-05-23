"use client";

import { GameMode } from "@/lib/types";

interface ModeCardProps {
  mode: GameMode;
  config: {
    label: string;
    icon: string;
    description: string;
    longDescription: string;
  };
  selected: boolean;
  onClick: () => void;
}

export function ModeCard({ config, selected, onClick }: ModeCardProps) {
  return (
    <button
      onClick={onClick}
      className={`group p-6 rounded-2xl border text-left transition-all hover:scale-[1.02] active:scale-[0.98] ${
        selected
          ? "border-accent bg-accent/5 shadow-lg shadow-accent/10"
          : "border-border bg-surface hover:border-accent/40 hover:shadow-md"
      }`}
    >
      <span className="text-3xl">{config.icon}</span>
      <h3 className="text-lg font-bold mt-3">{config.label}</h3>
      <p className="text-sm text-muted mt-1">{config.description}</p>
    </button>
  );
}
