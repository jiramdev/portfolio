"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IdentityStack } from "@/components/Header";
import { useLoader } from "@/components/PageLoaderContext";
import { EASE } from "@/lib/motion";

const GLIDE_S = 1.4;

// Intro: hold the studio identity in the centre, glide it into the header slot,
// then lift the curtain. Click anywhere to skip. Once per session, on any page.
//
// The markup ships in the HTML so the animation starts on the first paint. It
// is display:none by default and only shown by the bootstrap script in <body>,
// so repeat visitors (and anyone without JS) never see a flash of it.
export default function FlyingLoader() {
  const { phase, isIntroActive, hasHydrated, dockHeader } = useLoader();
  const flyingRef = useRef<HTMLDivElement>(null);
  const [destination, setDestination] = useState<{ x: number; y: number } | null>(
    null
  );

  useEffect(() => {
    if (phase !== "center") return;

    const targetEl = document.getElementById("header-identity-target");
    if (targetEl && flyingRef.current) {
      const target = targetEl.getBoundingClientRect();
      const flying = flyingRef.current.getBoundingClientRect();
      setDestination({
        x: target.left - flying.left,
        y: target.top - flying.top,
      });
    }
  }, [phase]);

  const gliding = phase === "gliding" && destination;

  // Rendered through hydration even when the intro is not running: CSS keeps it
  // hidden until the bootstrap script says "play", and AnimatePresence fades it
  // out on dock instead of yanking it away.
  return (
    <AnimatePresence>
      {(!hasHydrated || isIntroActive) && (
        <motion.div
          key="intro"
          data-intro-curtain
          aria-hidden="true"
          onClick={dockHeader}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="fixed inset-0 z-[60] flex cursor-pointer items-center justify-center bg-[var(--color-background)]"
        >
          <motion.div
            ref={flyingRef}
            className="will-change-transform"
            initial={{ x: 0, y: 0 }}
            animate={{ x: gliding ? destination.x : 0, y: gliding ? destination.y : 0 }}
            transition={{ duration: GLIDE_S, ease: EASE }}
            onAnimationComplete={() => {
              if (phase === "gliding") dockHeader();
            }}
          >
            <IdentityStack skipInitialRoll={false} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}