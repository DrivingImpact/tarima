import type { Metadata } from "next";
import Link from "next/link";
import { BEAT_TRACKS } from "@/lib/beat-tracks";

export const metadata: Metadata = {
  title: "Créditos — Tarima",
  description: "Créditos de música y licencias de Tarima.",
};

// Music credits. Attribution isn't required by the Pixabay Content License,
// but crediting every artist + linking the source is good faith and makes the
// licensing transparent. Generated from the bundled track list.
export default function CreditosPage() {
  return (
    <div className="app-screen flex flex-col px-5 pt-8 pb-12 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/"
          aria-label="Volver"
          className="w-10 h-10 rounded-full card-dark flex items-center justify-center text-muted hover:text-foreground"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
          Créditos
        </span>
        <div className="w-10" />
      </div>

      <h1 className="text-4xl font-display uppercase tracking-tight text-foreground mb-2">
        Créditos
      </h1>
      <p className="text-sm text-muted mb-8 leading-relaxed">
        Todos los beats provienen de Pixabay y se usan bajo la Licencia de
        Contenido de Pixabay. Gracias a cada artista por su trabajo.
      </p>

      <div className="space-y-2">
        {BEAT_TRACKS.map((t) => (
          <a
            key={t.id}
            href={t.source}
            target="_blank"
            rel="noopener noreferrer"
            className="card-dark rounded-2xl p-4 flex items-center justify-between hover:border-white/15 transition-colors"
          >
            <div className="min-w-0">
              <p className="font-bold text-sm truncate">{t.name}</p>
              <p className="text-xs text-muted truncate">
                {t.artist} · Pixabay
              </p>
            </div>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted flex-shrink-0 ml-3">
              <path d="M7 17L17 7M17 7H8M17 7v9" />
            </svg>
          </a>
        ))}
      </div>

      <p className="text-[10px] text-muted/70 text-center mt-8 leading-relaxed">
        Licencia:{" "}
        <a
          href="https://pixabay.com/service/license-summary/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent transition-colors underline"
        >
          Pixabay Content License
        </a>
      </p>
    </div>
  );
}
