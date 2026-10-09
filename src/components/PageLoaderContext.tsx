"use client";

import { createContext, useContext, useEffect, useState, useSyncExternalStore } from "react";
import { hasSeenIntro, markIntroSeen } from "@/lib/intro";

type AnimationPhase = "idle" | "center" | "gliding" | "docked";

const INTRO_MS = 2200;

// No external store: the client snapshot is only ever read once on mount.
const subscribe = () => () => {};

// Read once and cached. The intro writes the seen flag the moment it starts, so
// re-deriving this from storage on every render flipped it false partway
// through, which unmounted the curtain before the glide ever ran.
let firstVisitSnapshot: boolean | null = null;

function readFirstVisit() {
  if (firstVisitSnapshot === null) {
    firstVisitSnapshot =
      !hasSeenIntro() &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  return firstVisitSnapshot;
}

interface LoaderContextType {
  phase: AnimationPhase;
  /** True from the first paint of a first visit until the header docks. */
  isIntroActive: boolean;
  hasHydrated: boolean;
  dockHeader: () => void;
}

const LoaderContext = createContext<LoaderContextType>({
  phase: "idle",
  isIntroActive: false,
  hasHydrated: false,
  dockHeader: () => {},
});

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const hasHydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
  const firstVisit = useSyncExternalStore(subscribe, readFirstVisit, () => false);
  const [phase, setPhase] = useState<AnimationPhase>("idle");

  // Server render and first paint both sit on "idle", so the intro opens from
  // there instead of switching state inside an effect. It runs on every route,
  // so the header must show the studio identity until it docks.
  const effectivePhase: AnimationPhase =
    firstVisit && phase === "idle" ? "center" : phase;
  const isIntroActive = firstVisit && effectivePhase !== "docked";

  useEffect(() => {
    if (effectivePhase !== "center") return;

    // Flag it as seen the moment it starts, not when it docks. The intro runs
    // for 3.6s and dockHeader only fires at the very end of it, so anyone who
    // navigated away mid-intro — tapping a card, pressing back — left the flag
    // unset and got the full-screen curtain replayed on every back navigation.
    // It does not cancel the intro in flight; firstVisit is only read on mount.
    markIntroSeen();

    const timer = setTimeout(() => setPhase("gliding"), INTRO_MS);
    return () => clearTimeout(timer);
  }, [effectivePhase]);

  const dockHeader = () => setPhase("docked");

  return (
    <LoaderContext.Provider
      value={{
        phase: effectivePhase,
        isIntroActive,
        hasHydrated,
        dockHeader,
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
}

export const useLoader = () => useContext(LoaderContext);