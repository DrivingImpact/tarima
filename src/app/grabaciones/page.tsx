"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import type { RecordingMeta } from "@/lib/types";
import { loadRecordingBlob, deleteRecordingBlob } from "@/lib/recorder";

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("es", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDuration(sec: number): string {
  const s = Math.max(0, Math.round(sec));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

// ── Single recording row: lazy-loads its blob into an object URL ───
function RecordingRow({ rec }: { rec: RecordingMeta }) {
  const deleteRecording = useAppStore((s) => s.deleteRecording);
  const addRecording = useAppStore((s) => s.addRecording);

  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [missing, setMissing] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [draft, setDraft] = useState(rec.title ?? "");

  // Load the blob once, build an object URL, and revoke it on unmount.
  useEffect(() => {
    let active = true;
    let objectUrl: string | null = null;
    setLoading(true);
    loadRecordingBlob(rec.storageKey)
      .then((blob) => {
        if (!active) return;
        if (!blob) {
          setMissing(true);
          return;
        }
        objectUrl = URL.createObjectURL(blob);
        setUrl(objectUrl);
      })
      .catch(() => {
        if (active) setMissing(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [rec.storageKey]);

  async function handleDelete() {
    if (typeof window !== "undefined") {
      const ok = window.confirm("¿Eliminar esta grabación?");
      if (!ok) return;
    }
    try {
      await deleteRecordingBlob(rec.storageKey);
    } catch {
      // Even if the blob is already gone, drop the metadata.
    }
    deleteRecording(rec.id);
  }

  // No store "rename" action exists, so renaming = delete the old meta and
  // re-add it with the new title. The blob stays put (same storageKey).
  function saveRename() {
    const title = draft.trim();
    deleteRecording(rec.id);
    addRecording({ ...rec, title: title || undefined });
    setRenaming(false);
  }

  const heading = rec.title?.trim() || formatDate(rec.createdAt);

  return (
    <div className="card-dark rounded-2xl p-4">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="min-w-0 flex-1">
          {renaming ? (
            <input
              type="text"
              value={draft}
              autoFocus
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") saveRename();
                if (e.key === "Escape") setRenaming(false);
              }}
              placeholder="Nombre de la toma..."
              className="w-full px-3 py-2 rounded-xl bg-white/5 border-0 text-sm text-foreground placeholder-muted focus:outline-none focus:ring-1 focus:ring-accent/50"
            />
          ) : (
            <p className="font-bold text-sm truncate">{heading}</p>
          )}
          <p className="text-[11px] text-muted mt-1 truncate">
            {rec.beatName ?? "Sin beat"}
            <span className="mx-1.5 text-muted/40">·</span>
            {rec.bars} {rec.bars === 1 ? "barra" : "barras"}
            <span className="mx-1.5 text-muted/40">·</span>
            {formatDuration(rec.durationSec)}
          </p>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {renaming ? (
            <button
              type="button"
              onClick={saveRename}
              aria-label="Guardar nombre"
              className="w-8 h-8 rounded-full flex items-center justify-center text-accent hover:bg-white/5"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setDraft(rec.title ?? "");
                setRenaming(true);
              }}
              aria-label="Renombrar"
              className="w-8 h-8 rounded-full flex items-center justify-center text-muted hover:text-foreground hover:bg-white/5"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
            </button>
          )}
          <button
            type="button"
            onClick={handleDelete}
            aria-label="Eliminar"
            className="w-8 h-8 rounded-full flex items-center justify-center text-muted hover:text-red-400 hover:bg-white/5"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </button>
        </div>
      </div>

      {missing ? (
        <p className="text-[11px] text-muted/70 italic">
          Audio no encontrado.
        </p>
      ) : loading ? (
        <p className="text-[11px] text-muted/70">Cargando audio...</p>
      ) : url ? (
        <audio controls src={url} className="w-full h-9 mt-1" />
      ) : null}
    </div>
  );
}

export default function GrabacionesPage() {
  const recordings = useAppStore((s) => s.recordings);

  // Newest first. createdAt is an ISO string, so lexical = chronological.
  const sorted = [...recordings].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );

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
        <h1 className="text-lg font-bold">Grabaciones</h1>
        <div className="w-10" />
      </div>

      <div className="text-center mb-6">
        <h2 className="text-5xl font-display uppercase tracking-tight text-foreground">
          Grabaciones
        </h2>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted mt-2">
          Tus tomas
        </p>
      </div>

      {sorted.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-5xl mb-4">🎙️</p>
          <p className="text-muted">
            Sin grabaciones aún. Grabar una sesión para escucharla aquí.
          </p>
          <Link
            href="/"
            className="inline-block mt-4 px-6 py-3 rounded-2xl btn-primary text-sm"
          >
            Empezar
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((rec) => (
            <RecordingRow key={rec.id} rec={rec} />
          ))}
        </div>
      )}
    </div>
  );
}
