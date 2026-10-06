"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type AnimationPhase = "idle" | "center" | "gliding" | "docked";

interface LoaderContextType {
  phase: AnimationPhase;
  startGlide: () => void;
  dockHeader: () => void;
  isFirstVisit: boolean;
  hasHydrated: boolean;
}

const LoaderContext = createContext<LoaderContextType>({
  phase: "idle",
  startGlide: () => {},
  dockHeader: () => {},
  isFirstVisit: false,
  hasHydrated: false,
});

const STORAGE_KEY = "jiram_portfolio_intro_seen_v2";

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<AnimationPhase>("idle");
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem(STORAGE_KEY);
    if (!hasSeen) {
      setIsFirstVisit(true);
      setPhase("center");
    } else {
      setPhase("docked");
    }
    setHasHydrated(true);
  }, []);

  const startGlide = () => {
    setPhase("gliding");
  };

  const dockHeader = () => {
    sessionStorage.setItem(STORAGE_KEY, "true");
    setPhase("docked");
  };

  return (
    <LoaderContext.Provider
      value={{ phase, startGlide, dockHeader, isFirstVisit, hasHydrated }}
    >
      {children}
    </LoaderContext.Provider>
  );
}

export const useLoader = () => useContext(LoaderContext);