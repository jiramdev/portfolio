"use client";

import ProjectsGrid from "@/components/ProjectsGrid";
import FlyingLoader from "@/components/FlyingLoader";
import { useLoader } from "@/components/PageLoaderContext";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";

const anthropicEase = [0.16, 1, 0.3, 1] as const;

export default function HomeClient({ projects }: { projects: Project[] }) {
  const { phase, isFirstVisit, hasHydrated } = useLoader();

  if (!hasHydrated) {
    return <div className="min-h-screen bg-[var(--color-background)]" />;
  }

  const isVisible = !isFirstVisit || phase === "docked";

  return (
    <>
      <FlyingLoader />
      <motion.div
        initial={isFirstVisit ? { opacity: 0, y: 16 } : false}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 16,
        }}
        transition={{
          duration: 0.9,
          delay: phase === "docked" ? 0.15 : 0,
          ease: anthropicEase,
        }}
        className={
          isVisible ? "pointer-events-auto" : "pointer-events-none select-none"
        }
      >
        <ProjectsGrid projects={projects} />
      </motion.div>
    </>
  );
}