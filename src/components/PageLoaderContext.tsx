"use client";

import { createContext, useContext, useEffect, useState, useSyncExternalStore } from "react";
import { INTRO_KEY } from "@/lib/intro";

export type AnimationPhase = "idle" | "center" | "gliding" | "docked";

const INTRO_MS = 2200;

// No external store: the client snapshot is only ever read once on mount.
const subscribe = () => () => {};

function readFirstVisit() {
  return (
    !window.sessionStorage.getItem(INTRO_KEY) &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

interface LoaderContextType {
  phase: AnimationPhase;
  /** True from the first paint of a first visit until the header docks. */
  isIntroActive: boolean;
  hasHydrated: boolean;
  startGlide: () => void;
  dockHeader: () => void;
}

const LoaderContext = createContext<LoaderContextType>({
  phase: "idle",
  isIntroActive: false,
  hasHydrated: false,
  startGlide: () => {},
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

    const timer = setTimeout(() => setPhase("gliding"), INTRO_MS);
    return () => clearTimeout(timer);
  }, [effectivePhase]);

  const dockHeader = () => {
    window.sessionStorage.setItem(INTRO_KEY, "true");
    setPhase("docked");
  };

  return (
    <LoaderContext.Provider
      value={{
        phase: effectivePhase,
        isIntroActive,
        hasHydrated,
        startGlide: () => setPhase("gliding"),
        dockHeader,
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
}

export const useLoader = () => useContext(LoaderContext);