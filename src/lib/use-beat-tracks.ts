"use client";

import { useEffect, useState } from "react";
import type { BeatTrack } from "./beat-tracks";
import { getBeatTracks, refreshBeatTracks, shouldRefresh } from "./beat-source";

/**
 * React hook: returns the active beat list, refreshing from the published
 * Google Sheet in the background. First render gets cached or bundled
 * tracks (no network wait); fresh data swaps in when it arrives.
 */
export function useBeatTracks(): BeatTrack[] {
  const [tracks, setTracks] = useState<BeatTrack[]>(() => getBeatTracks());

  useEffect(() => {
    if (!shouldRefresh()) return;
    let cancelled = false;
    void refreshBeatTracks().then((fresh) => {
      if (cancelled || !fresh) return;
      setTracks(fresh);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return tracks;
}
