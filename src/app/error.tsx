"use client";

// Next's built-in boundary renders a white page reading "a problem occurred on
// <url>", which names neither the component nor the message, and offers nothing
// to do about it. This one shows the real message and retries in place, so a
// transient failure during a history pop is one tap from recovered instead of a
// dead tab. The digest is the key to the matching stack in the Vercel logs.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col items-start justify-center gap-[22px] px-[16px] py-[22px] md:px-[22px]">
      <div className="flex flex-col gap-[6px]">
        <h1 className="text-[32px] font-[700] leading-[1.1] tracking-[-0.02em] md:text-[44px]">
          Something broke
        </h1>
        <p className="text-[15px] leading-[1.4] text-[var(--color-text-muted)]">
          {error.message || "Unknown error."}
        </p>
        {error.digest && (
          <p className="text-[13px] leading-[1.4] text-[var(--color-text-muted)]">
            Reference: {error.digest}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={reset}
        className="inline-flex min-h-[44px] items-center rounded-full bg-[var(--color-surface)] px-[20px] text-[15px] font-[700] text-[var(--color-on-primary)] transition-opacity duration-[100ms] hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2"
      >
        Try again
      </button>
    </div>
  );
}
