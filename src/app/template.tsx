"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useLoader } from "@/components/PageLoaderContext";

// Anthropic Design System Tokens
const anthropicEase = [0.16, 1, 0.3, 1] as const;

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isFirstVisit, phase, hasHydrated } = useLoader();

  // On initial visit to the root homepage, defer animation control to FlyingLoader / HomeClient
  const isIntroActive = pathname === "/" && isFirstVisit && phase !== "docked";

  if (!hasHydrated || isIntroActive) {
    return <div className="w-full">{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.994 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.52,
        ease: anthropicEase,
      }}
      className="w-full transform-gpu will-change-[transform,opacity]"
    >
      {children}
    </motion.div>
  );
}