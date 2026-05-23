"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { WORD_BANK, getRhymeGroups } from "@/lib/words";
import { findRhymes } from "@/lib/rhyme-engine";

export default function DiccionarioPage() {
  const [search, setSearch] = useState("");
  const [rhymeType, setRhymeType] = useState<
    "consonante" | "asonante" | "ambas"
  >("consonante");

  const rhymeGroups = useMemo(() => getRhymeGroups(WORD_BANK), []);

  const searchResults = useMemo(() => {
    if (!search.trim()) return null;
    return findRhymes(search.trim().toLowerCase(), WORD_BANK, rhymeType);
  }, [search, rhymeType]);

  const topGroups = useMemo(() => {
    const entries = Array.from(rhymeGroups.entries());
    entries.sort((a, b) => b[1].length - a[1].length);
    return entries.slice(0, 20);
  }, [rhymeGroups]);

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
        <h1 className="text-lg font-bold">Diccionario</h1>
        <div className="w-10" />
      </div>

      <div className="text-center mb-6">
        <h2 className="text-4xl font-black uppercase tracking-wide gradient-text">
          Diccionario
        </h2>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted mt-2">
          Familias de rimas
        </p>
      </div>

      <div className="relative mb-4">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar una palabra..."
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl card-dark border-0 text-foreground placeholder-muted focus:outline-none focus:ring-1 focus:ring-accent/50"
        />
      </div>

      <div className="flex rounded-xl overflow-hidden mb-6 border border-white/5">
        {(["consonante", "asonante", "ambas"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setRhymeType(type)}
            className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
              rhymeType === type
                ? "bg-accent text-white"
                : "bg-surface text-muted hover:text-foreground"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {searchResults !== null ? (
        <div className="animate-fade-in">
          <p className="text-sm text-muted mb-3">
            <span className="text-accent font-bold">
              {searchResults.length}
            </span>{" "}
            rimas para &quot;{search.trim()}&quot;
          </p>
          {searchResults.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {searchResults.map((word) => (
                <button
                  key={word.text}
                  onClick={() => setSearch(word.text)}
                  className="px-3 py-1.5 rounded-xl card-dark text-sm font-medium hover:border-accent/30 transition-all"
                >
                  {word.text}
                  <span className="text-[10px] text-muted ml-1">
                    {word.syllables}sil
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-muted text-center py-8">
              Sin rimas. Probar con otra palabra.
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted">
            Familias populares
          </p>
          {topGroups.map(([ending, words]) => (
            <div key={ending} className="card-dark rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-accent">
                  -{ending}
                </span>
                <span className="text-[10px] text-muted">
                  {words.length} palabras
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {words.slice(0, 10).map((word) => (
                  <button
                    key={word.text}
                    onClick={() => setSearch(word.text)}
                    className="px-2 py-1 rounded-lg bg-white/5 text-xs hover:bg-accent/10 hover:text-accent transition-colors"
                  >
                    {word.text}
                  </button>
                ))}
                {words.length > 10 && (
                  <span className="px-2 py-1 text-[10px] text-muted">
                    +{words.length - 10}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
