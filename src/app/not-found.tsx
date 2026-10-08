import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-[1440px] flex-col justify-center px-[16px] py-[58px] md:px-[22px]">
      <p className="text-[15px] tracking-[-0.01em] text-[var(--color-text-muted)]">
        404
      </p>
      <h1 className="mt-[8px] text-[32px] font-[700] leading-[1.1] tracking-[-0.02em] sm:text-[40px] md:text-[58px]">
        This page does not exist.
      </h1>
      <Link
        href="/"
        className="mt-[22px] inline-flex min-h-[44px] w-fit items-center text-[15px] tracking-[-0.01em] underline underline-offset-[3px] transition-opacity duration-[100ms] hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-4"
      >
        Back to the work
      </Link>
    </div>
  );
}