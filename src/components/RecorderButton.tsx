"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAppStore } from "@/lib/store";
import type { RecordingMeta } from "@/lib/types";
import {
  recordingSupported,
  startRecording,
  stopRecording,
  saveRecordingBlob,
} from "@/lib/recorder";

// Self-contained mic toggle. Drop it anywhere — it reads the active beat / mode
// / bars from the store itself, so it needs no props. Tap to start, tap again
// to stop and save. Renders nothing if the platform can't record.
export default function RecorderButton() {
  const addRecording = useAppStore((s) => s.addRecording);

  const [supported, setSupported] = useState(false);
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [busy, setBusy] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Feature detection must run on the client (avoids SSR mismatch).
  useEffect(() => {
    setSupported(recordingSupported());
  }, []);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => clearTimer, [clearTimer]);

  const handleStart = useCallback(async () => {
    if (busy || recording) return;
    setBusy(true);
    try {
      await startRecording();
      setRecording(true);
      setElapsed(0);
      const startedAt = Date.now();
      clearTimer();
      timerRef.current = setInterval(() => {
        setElapsed((Date.now() - startedAt) / 1000);
      }, 250);
    } catch {
      // Permission denied or unsupported — leave the button idle.
      setRecording(false);
    } finally {
      setBusy(false);
    }
  }, [busy, recording, clearTimer]);

  const handleStop = useCallback(async () => {
    if (busy) return;
    setBusy(true);
    clearTimer();
    try {
      const { blob, durationSec, mime } = await stopRecording();
      setRecording(false);
      setElapsed(0);

      if (blob.size === 0) return; // nothing captured

      const storageKey = await saveRecordingBlob(blob);
      const game = useAppStore.getState().game;
      const meta: RecordingMeta = {
        id:
          typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        createdAt: new Date().toISOString(),
        durationSec: Math.round(durationSec),
        beatId: game.currentBeat?.id ?? null,
        beatName: game.currentBeat?.name ?? null,
        mode: game.mode,
        bars: game.barsCompleted,
        storage: "idb",
        storageKey,
      };
      // mime is captured in the blob's type; meta keeps only what the contract
      // declares. (referenced so the value isn't flagged unused)
      void mime;
      addRecording(meta);
    } catch {
      setRecording(false);
    } finally {
      setBusy(false);
    }
  }, [busy, clearTimer, addRecording]);

  if (!supported) return null;

  const onClick = recording ? handleStop : handleStart;
  const seconds = Math.floor(elapsed);
  const mmss = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={onClick}
        disabled={busy}
        aria-label={recording ? "Detener grabación" : "Grabar"}
        aria-pressed={recording}
        className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all disabled:opacity-50 ${
          recording
            ? "bg-accent text-[#0a0a0b]"
            : "card-dark text-accent hover:border-accent/40"
        }`}
      >
        {recording ? (
          // Stop square
          <span className="block w-5 h-5 rounded-[4px] bg-[#0a0a0b]" />
        ) : (
          // Mic glyph
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="2" width="6" height="12" rx="3" />
            <path d="M5 10v1a7 7 0 0 0 14 0v-1" />
            <line x1="12" y1="19" x2="12" y2="22" />
          </svg>
        )}
      </button>

      {recording && (
        <div className="flex items-center gap-2 text-xs font-mono text-accent">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>{mmss}</span>
        </div>
      )}
    </div>
  );
}
