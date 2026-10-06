"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import { useLoader } from "@/components/PageLoaderContext";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  year?: string;
  showCopyright?: boolean;
  githubUrl?: string;
  linkedinUrl?: string;
}

const anthropicEase = [0.16, 1, 0.3, 1] as const;

const characterTransition: Transition = {
  duration: 0.35,
  ease: anthropicEase,
};

export function RollingText({
  text,
  className = "",
  delay = 0,
  skipInitialRoll = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  skipInitialRoll?: boolean;
}) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  return (
    <span className={`inline-flex flex-wrap overflow-hidden ${className}`}>
      <AnimatePresence mode="popLayout" initial={!skipInitialRoll}>
        <motion.span
          key={text}
          className="inline-flex flex-wrap"
          initial={isFirstRender.current && skipInitialRoll ? false : "initial"}
          animate="animate"
          exit="exit"
          transition={{
            staggerChildren: 0.015,
            delayChildren: delay,
          }}
        >
          {Array.from(text).map((char, index) => (
            <span
              key={`${char}-${index}`}
              className="relative inline-block overflow-hidden"
            >
              <motion.span
                className="inline-block whitespace-pre"
                variants={{
                  initial: { y: "100%", opacity: 0 },
                  animate: { y: "0%", opacity: 1 },
                  exit: { y: "-100%", opacity: 0 },
                }}
                transition={characterTransition}
              >
                {char}
              </motion.span>
            </span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function IdentityStack({
  title = "Jiram",
  subtitle = "Frontend Developer & UI/UX Designer",
  year = "2026",
  showCopyright = true,
  skipInitialRoll = false,
}: {
  title?: string;
  subtitle?: string;
  year?: string;
  showCopyright?: boolean;
  skipInitialRoll?: boolean;
}) {
  const displayYear = showCopyright ? `\u00A9 ${year}` : year;

  return (
    <div className="flex flex-col select-none">
      <Link
        href="/"
        className="text-[14px] font-[700] leading-[1.3] tracking-[-0.24px] text-[var(--color-text)] hover:opacity-70 transition-opacity duration-[100ms] [transition-timing-function:var(--ease-anthropic)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2 inline-flex items-center min-h-[44px] -my-[12px]"
      >
        <RollingText
          text={title}
          delay={0}
          skipInitialRoll={skipInitialRoll}
        />
      </Link>

      <div className="mt-[12px]">
        <RollingText
          text={subtitle}
          delay={0.06}
          className="text-[12px] font-[400] leading-[1.4] tracking-[-0.24px] text-[var(--color-text)]"
          skipInitialRoll={skipInitialRoll}
        />
      </div>

      <div className="mt-[2px]">
        <RollingText
          text={displayYear}
          delay={0.12}
          className="text-[12px] font-[400] leading-[1.4] tracking-[-0.24px] text-[var(--color-text)]"
          skipInitialRoll={skipInitialRoll}
        />
      </div>
    </div>
  );
}

export default function Header({
  title = "Jiram",
  subtitle = "Frontend Developer & UI/UX Designer",
  year = "2026",
  showCopyright = true,
  githubUrl = "https://github.com",
  linkedinUrl = "https://linkedin.com",
}: HeaderProps) {
  const { phase, isFirstVisit, hasHydrated } = useLoader();
  const displayYear = showCopyright ? `\u00A9 ${year}` : year;

  const showControls = hasHydrated && (!isFirstVisit || phase === "docked");

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-700 ${
        showControls
          ? "bg-[color-mix(in_srgb,var(--color-background)_82%,transparent)] backdrop-blur-md supports-[backdrop-filter]:bg-[color-mix(in_srgb,var(--color-background)_82%,transparent)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-[16px] md:px-[22px] py-[22px] flex items-start justify-between min-h-[88px]">
        {/* Left: Identity Slot */}
        <div id="header-identity-target" className="flex flex-col">
          {hasHydrated && (!isFirstVisit || phase === "docked") ? (
            <IdentityStack
              title={title}
              subtitle={subtitle}
              year={year}
              showCopyright={showCopyright}
              skipInitialRoll={isFirstVisit && phase === "docked"}
            />
          ) : (
            <div
              className="opacity-0 pointer-events-none select-none flex flex-col"
              aria-hidden="true"
            >
              <span className="text-[14px] font-[700] leading-[1.3] min-h-[44px] -my-[12px] inline-flex items-center">
                {title}
              </span>
              <span className="mt-[12px] text-[12px] font-[400] leading-[1.4]">
                {subtitle}
              </span>
              <span className="mt-[2px] text-[12px] font-[400] leading-[1.4]">
                {displayYear}
              </span>
            </div>
          )}
        </div>

        {/* Right: Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showControls ? 1 : 0 }}
          transition={{
            duration: 0.6,
            delay: showControls && isFirstVisit ? 0.2 : 0,
            ease: anthropicEase,
          }}
          className={`flex items-center gap-[8px] -mr-[12px] ${
            showControls ? "pointer-events-auto" : "pointer-events-none select-none"
          }`}
        >
          <Link
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="w-[44px] h-[44px] inline-flex items-center justify-center text-[var(--color-text)] hover:opacity-60 transition-opacity duration-[100ms] [transition-timing-function:var(--ease-anthropic)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2 rounded-[8px]"
          >
            <svg
              className="w-[18px] h-[18px] fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
          </Link>

          <Link
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="w-[44px] h-[44px] inline-flex items-center justify-center text-[var(--color-text)] hover:opacity-60 transition-opacity duration-[100ms] [transition-timing-function:var(--ease-anthropic)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2 rounded-[8px]"
          >
            <svg
              className="w-[18px] h-[18px] fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </header>
  );
}