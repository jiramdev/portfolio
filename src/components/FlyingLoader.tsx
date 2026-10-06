"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IdentityStack } from "@/components/Header";
import { useLoader } from "@/components/PageLoaderContext";

const anthropicEase = [0.16, 1, 0.3, 1] as const;

export default function FlyingLoader() {
  const { phase, startGlide, dockHeader } = useLoader();
  const flyingRef = useRef<HTMLDivElement>(null);
  const [destination, setDestination] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (phase !== "center") return;

    const targetEl = document.getElementById("header-identity-target");
    if (targetEl && flyingRef.current) {
      const targetRect = targetEl.getBoundingClientRect();
      const centerRect = flyingRef.current.getBoundingClientRect();

      setDestination({
        x: targetRect.left - centerRect.left,
        y: targetRect.top - centerRect.top,
      });
    }

    const glideTimer = setTimeout(() => {
      startGlide();
    }, 2200);

    return () => clearTimeout(glideTimer);
  }, [phase, startGlide]);

  if (phase === "idle" || phase === "docked") {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[60] pointer-events-none overflow-visible"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <motion.div
          ref={flyingRef}
          className="will-change-transform"
          initial={{ x: 0, y: 0 }}
          animate={{
            x: phase === "gliding" && destination ? destination.x : 0,
            y: phase === "gliding" && destination ? destination.y : 0,
          }}
          transition={{
            duration: 1.4,
            ease: anthropicEase,
          }}
          onAnimationComplete={() => {
            if (phase === "gliding") {
              dockHeader();
            }
          }}
        >
          <IdentityStack skipInitialRoll={false} />
        </motion.div>
      </div>
    </div>
  );
}