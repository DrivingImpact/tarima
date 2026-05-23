"use client";

import { useState, useRef, useCallback } from "react";
import { BeatConfig, BeatStyle } from "@/lib/types";
import { BeatEngine } from "@/lib/beat-engine";

interface BeatSelectorProps {
  beats: BeatConfig[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const STYLE_LABELS: Record<BeatStyle, string> = {
  "boom-bap": "Boom Bap",
  trap: "Trap",
  lofi: "Lo-Fi",
  reggaeton: "Reggaetón",
  "old-school": "Old School",
  "jazz-hop": "Jazz Hop",
  latin: "Latin",
  drill: "Drill",
};

export function BeatSelector({ beats, selectedId, onSelect }: BeatSelectorProps) {
  const [previewingId, setPreviewingId] = useState<string | null>(null);
  const [filterStyle, setFilterStyle] = useState<BeatStyle | "all">("all");
  const engineRef = useRef<BeatEngine | null>(null);

  const styles = Array.from(new Set(beats.map((b) => b.style)));
  const filtered =
    filterStyle === "all" ? beats : beats.filter((b) => b.style === filterStyle);

  const togglePreview = useCallback(
    (beat: BeatConfig) => {
      if (previewingId === beat.id) {
        engineRef.current?.stop();
        setPreviewingId(null);
        return;
      }

      if (!engineRef.current) {
        engineRef.current = new BeatEngine();
      }
      engineRef.current.stop();
      engineRef.current.loadBeat(beat);
      engineRef.current.start();
      setPreviewingId(beat.id);
    },
    [previewingId]
  );

  return (
    <div>
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        <button
          onClick={() => setFilterStyle("all")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            filterStyle === "all"
              ? "bg-accent text-white"
              : "bg-surface border border-border text-muted hover:text-foreground"
          }`}
        >
          Todos
        </button>
        {styles.map((style) => (
          <button
            key={style}
            onClick={() => setFilterStyle(style)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              filterStyle === style
                ? "bg-accent text-white"
                : "bg-surface border border-border text-muted hover:text-foreground"
            }`}
          >
            {STYLE_LABELS[style]}
          </button>
        ))}
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
        {filtered.map((beat) => (
          <div
            key={beat.id}
            onClick={() => onSelect(beat.id)}
            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
              selectedId === beat.id
                ? "border-accent bg-accent/5"
                : "border-border bg-surface hover:border-accent/40"
            }`}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePreview(beat);
              }}
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                previewingId === beat.id
                  ? "bg-accent text-white"
                  : "bg-surface-hover text-muted hover:text-foreground"
              }`}
            >
              {previewingId === beat.id ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              )}
            </button>

            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{beat.name}</p>
              <p className="text-xs text-muted">
                {STYLE_LABELS[beat.style]} · {beat.bpm} BPM
              </p>
            </div>

            {selectedId === beat.id && (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="text-accent flex-shrink-0"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
