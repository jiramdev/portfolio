"use client";

import { motion } from "motion/react";
import { useLoader } from "@/components/PageLoaderContext";
import { EASE } from "@/lib/motion";

// Next remounts template.tsx on every navigation, so there is no outgoing tree
// to animate out: the transition is an enter only. Opacity plus a short drift
// from the top, so the page settles under the sticky header instead of popping.
export default function Template({ children }: { children: React.ReactNode }) {
  const { hasHydrated, isIntroActive } = useLoader();

  return (
    <motion.div
      initial={
        hasHydrated && !isIntroActive ? { opacity: 0, y: 14 } : false
      }
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="w-full origin-top"
    >
      {children}
    </motion.div>
  );
}