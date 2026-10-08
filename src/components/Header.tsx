"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, type Transition } from "motion/react";
import { EASE } from "@/lib/motion";
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/site";
import { useLoader } from "@/components/PageLoaderContext";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  year?: string;
  showCopyright?: boolean;
  githubUrl?: string;
  linkedinUrl?: string;
}

const characterTransition: Transition = {
  duration: 0.35,
  ease: EASE,
};

export function RollingText({
  text,
  className = "",
  delay = 0,
  skipInitialRoll = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  /** Default true keeps the letters readable in the server HTML and without
   *  JS. The intro passes false, where the curtain hides the page anyway. */
  skipInitialRoll?: boolean;
}) {
  // mode="popLayout" pops the outgoing line out of flow so the incoming one
  // takes its box: both roll at once, the old pushed up and out while the new
  // rises into the same space.
  // No overflow-hidden here: popLayout takes the outgoing line out of flow, so the
    // wrapper is only as wide as the incoming line and a longer outgoing line
    // would be clipped. Each letter clips itself, which is all the roll needs.
  return (
    <span
      aria-label={text}
      className={`relative inline-flex ${className}`}
    >
      <AnimatePresence mode="popLayout" initial={!skipInitialRoll}>
        <motion.span
          key={text}
          className="inline-flex flex-wrap"
          initial="initial"
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
              aria-hidden="true"
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
  year = `${new Date().getFullYear()}`,
  showCopyright = true,
  skipInitialRoll = true,
}: {
  title?: string;
  subtitle?: string;
  year?: string;
  showCopyright?: boolean;
  skipInitialRoll?: boolean;
}) {
  const displayYear = showCopyright ? `\u00A9 ${year}` : year;
  const pathname = usePathname();

  // Clicking the name while already home is not a navigation, so nothing would
  // scroll. Treat it as "back to top".
  const onTitleClick = (event: React.MouseEvent) => {
    if (pathname !== "/") return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex select-none flex-col">
      <Link
        href="/"
        onClick={onTitleClick}
        className="inline-flex min-h-[44px] -my-[10px] items-center text-[15px] font-[700] leading-[1.3] tracking-[-0.01em] text-[var(--color-text)] transition-opacity duration-[100ms] [transition-timing-function:var(--ease-out-expo)] hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2"
      >
        <RollingText text={title} delay={0} skipInitialRoll={skipInitialRoll} />
      </Link>

      <div className="mt-[10px] text-[15px] font-[400] leading-[1.4] tracking-[-0.01em] text-[var(--color-text)]">
        <RollingText
          text={subtitle}
          delay={0.06}
          skipInitialRoll={skipInitialRoll}
        />
      </div>

      <div className="mt-[2px] text-[15px] font-[400] leading-[1.4] tracking-[-0.01em] text-[var(--color-text)]">
        <RollingText
          text={displayYear}
          delay={0.12}
          skipInitialRoll={skipInitialRoll}
        />
      </div>
    </div>
  );
}

export default function Header({
  title = "Jiram",
  subtitle = "Frontend Developer & UI/UX Designer",
  year = `${new Date().getFullYear()}`,
  showCopyright = true,
  githubUrl = GITHUB_URL,
  linkedinUrl = LINKEDIN_URL,
}: HeaderProps) {
  const { isIntroActive, hasHydrated } = useLoader();
  const showControls = hasHydrated && !isIntroActive;

  return (
    <header className="sticky top-0 z-40 w-full bg-[color-mix(in_srgb,var(--color-background)_82%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex min-h-[88px] max-w-[1440px] items-start justify-between px-[16px] py-[22px] md:px-[22px]">
        <div
          id="header-identity-target"
          className={`flex flex-col ${
            isIntroActive ? "opacity-0" : "opacity-100"
          } transition-opacity duration-[400ms] [transition-timing-function:var(--ease-out-expo)] motion-reduce:transition-none`}
        >
          <IdentityStack
            title={title}
            subtitle={subtitle}
            year={year}
            showCopyright={showCopyright}
          />
        </div>

        <div
          className={`-mr-[12px] flex items-center gap-[8px] ${
            showControls ? "pointer-events-auto" : "pointer-events-none select-none opacity-0"
          }`}
        >
          <Link
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-[8px] text-[var(--color-text)] transition-opacity duration-[100ms] [transition-timing-function:var(--ease-out-expo)] hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2"
          >
            <svg
              className="h-[18px] w-[18px] fill-current"
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
            className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-[8px] text-[var(--color-text)] transition-opacity duration-[100ms] [transition-timing-function:var(--ease-out-expo)] hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2"
          >
            <svg
              className="h-[18px] w-[18px] fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}