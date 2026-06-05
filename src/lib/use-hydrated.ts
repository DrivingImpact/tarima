"use client";

import { useSyncExternalStore } from "react";

// Returns false during SSR and the first client render, true once hydrated.
// Built on useSyncExternalStore so there's no setState-in-effect (and no
// hydration mismatch): the server snapshot is always `false`, the client
// snapshot is always `true`. Use to defer rendering anything that depends on
// persisted/localStorage state (e.g. entitlements) past hydration.
const subscribe = () => () => {};

export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
