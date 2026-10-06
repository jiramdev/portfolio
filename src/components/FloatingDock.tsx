"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useLoader } from "@/components/PageLoaderContext";

// Anthropic Design System Motion Tokens
const anthropicEase = [0.16, 1, 0.3, 1] as const;

export default function FloatingDock() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isProjectPage = pathname.startsWith("/projects/");

  const { phase, isFirstVisit, hasHydrated } = useLoader();

  // On first visit, stay hidden until the header has reached 'docked' phase
  const isVisible = hasHydrated && (!isFirstVisit || phase === "docked");

  return (
    <aside
      aria-label="Floating Navigation"
      className="fixed bottom-[22px] inset-x-0 z-50 flex justify-center pointer-events-none px-[16px] pb-[env(safe-area-inset-bottom)]"
    >
      <motion.nav
        layout
        initial={{ opacity: 0, y: 18 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 18,
        }}
        transition={{
          duration: 0.52,
          delay: isFirstVisit && phase === "docked" ? 1.0 : 0,
          ease: anthropicEase,
          layout: { duration: 0.3, ease: anthropicEase },
        }}
        className={`pointer-events-auto flex items-center gap-[4px] p-[4px] rounded-full bg-[#141413] text-[#ffffff] border border-[#141413] shadow-[rgba(0,0,0,0.01)_0px_2px_2px_0px,rgba(0,0,0,0.02)_0px_4px_4px_0px,rgba(0,0,0,0.04)_0px_16px_24px_0px] transform-gpu will-change-[transform,opacity] ${
          isVisible ? "pointer-events-auto" : "pointer-events-none select-none"
        }`}
      >
        {/* 1. Home Navigation Action */}
        <Link
          href="/"
          className={`group relative flex items-center gap-[8px] min-h-[44px] px-[16px] rounded-full text-[12px] leading-[1.4] tracking-[-0.24px] transition-all duration-[200ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ffffff] focus-visible:outline-offset-2 motion-reduce:transition-none ${
            isHome
              ? "bg-[#faf9f5] text-[#141413] font-[700]"
              : "text-[#ffffff]/80 hover:text-[#ffffff] hover:bg-[#ffffff]/10 font-[400]"
          }`}
          aria-current={isHome ? "page" : undefined}
        >
          <svg
            className="w-[14px] h-[14px] stroke-current shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>Home</span>
        </Link>

        {/* 2. Contact CTA */}
        <a
          href="mailto:hallo@jiram.nl"
          className="flex items-center gap-[8px] min-h-[44px] px-[16px] rounded-full text-[12px] font-[400] leading-[1.4] tracking-[-0.24px] text-[#ffffff]/80 hover:text-[#ffffff] hover:bg-[#ffffff]/10 transition-all duration-[200ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ffffff] focus-visible:outline-offset-2 motion-reduce:transition-none"
        >
          <svg
            className="w-[14px] h-[14px] stroke-current shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <span>Contact</span>
        </a>

        {/* 3. Viewing Project Indicator (All the way to the right) */}
        {isProjectPage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, width: 0 }}
            animate={{ opacity: 1, scale: 1, width: "auto" }}
            exit={{ opacity: 0, scale: 0.95, width: 0 }}
            transition={{ duration: 0.3, ease: anthropicEase }}
            className="flex items-center gap-[8px] pl-[12px] pr-[16px] min-h-[44px] text-[12px] font-[400] leading-[1.4] tracking-[-0.24px] text-[#ffffff]/60 border-l border-[#ffffff]/15 select-none overflow-hidden"
          >
            <span
              className="w-[6px] h-[6px] rounded-full bg-[#faf9f5] shrink-0"
              aria-hidden="true"
            />
            <span className="font-[400] text-[12px] tracking-[-0.24px] whitespace-nowrap">
              Viewing Project
            </span>
          </motion.div>
        )}
      </motion.nav>
    </aside>
  );
}