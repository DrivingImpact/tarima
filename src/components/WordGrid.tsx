"use client";

import { Word } from "@/lib/types";
import { useAppStore } from "@/lib/store";

interface WordGridProps {
  words: Word[];
  activeIndex: number;
  showHints: boolean;
  onWordTap?: (index: number) => void;
}

const RHYME_COLORS = [
  "border-indigo-400 bg-indigo-400/10",
  "border-emerald-400 bg-emerald-400/10",
  "border-amber-400 bg-amber-400/10",
  "border-rose-400 bg-rose-400/10",
  "border-cyan-400 bg-cyan-400/10",
  "border-violet-400 bg-violet-400/10",
  "border-orange-400 bg-orange-400/10",
  "border-teal-400 bg-teal-400/10",
];

export function WordGrid({ words, activeIndex, showHints, onWordTap }: WordGridProps) {
  const { game } = useAppStore();
  const rhymeEndingsMap = new Map<string, number>();
  let colorIndex = 0;

  words.forEach((w) => {
    if (!rhymeEndingsMap.has(w.rhymeEnding)) {
      rhymeEndingsMap.set(w.rhymeEnding, colorIndex++);
    }
  });

  const cols = words.length <= 8 ? 2 : words.length <= 12 ? 3 : 4;

  return (
    <div
      className={`grid gap-3 ${
        cols === 2
          ? "grid-cols-2"
          : cols === 3
          ? "grid-cols-3"
          : "grid-cols-4"
      }`}
    >
      {words.map((word, i) => {
        const isActive = i === activeIndex;
        const rhymeColorIdx = rhymeEndingsMap.get(word.rhymeEnding) ?? 0;
        const rhymeColor = RHYME_COLORS[rhymeColorIdx % RHYME_COLORS.length];
        const isPast = i < activeIndex;

        return (
          <button
            key={`${word.text}-${i}`}
            onClick={() => onWordTap?.(i)}
            disabled={game.mode !== "toque"}
            className={`
              word-tile relative p-4 rounded-xl border-2 text-center font-bold
              ${isActive ? "word-tile-active" : ""}
              ${isPast ? "opacity-40" : ""}
              ${!isActive && !isPast ? rhymeColor : ""}
              ${!isActive && !isPast ? "hover:opacity-80" : ""}
              ${game.mode === "toque" && !isPast ? "cursor-pointer" : "cursor-default"}
            `}
          >
            <span className="text-lg sm:text-xl block">{word.text}</span>
            {showHints && !isActive && (
              <span className="text-[10px] text-muted mt-1 block font-normal opacity-60">
                {word.rhymeEnding}
              </span>
            )}
            {isActive && (
              <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                <div className="w-3 h-3 rounded-full bg-white shadow-lg animate-bounce-ball" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
