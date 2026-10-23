"use client";

import { useSyncExternalStore } from "react";

// No-op subscribe — the hydration state never changes after mount,
// so there are no external updates to listen for.
const subscribe = () => () => {};

/**
 * Returns `false` on the server (and on the client's first render),
 * then `true` after hydration is complete.
 *
 * Uses `useSyncExternalStore` which is the React 18 / Next.js 15 idiomatic
 * approach — unlike the `useEffect + useState(false)` pattern, this avoids
 * scheduling an extra re-render cycle.
 *
 * Usage:
 *   const hydrated = useHydrated();
 *   if (!hydrated) return null;          // or return <Skeleton />
 *   // safe to use window, localStorage, etc.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,   // client snapshot — always true after hydration
    () => false,  // server snapshot — always false
  );
}
