"use client";

// Catches what src/app/error.tsx cannot: that boundary wraps only {children}, so
// a throw from ScrollToTop, NavigationHeader, FlyingLoader or FloatingDock —
// anything the root layout renders itself — bypasses it and lands on Next's
// built-in global error page instead. That is the "a problem occurred on
// <url>" screen, which names neither the component nor the message and offers
// nothing to do about it.
//
// global-error replaces the whole document, so it has to render its own
// html/body and cannot use the root layout, hence inline styles rather than
// the Tailwind classes the rest of the site uses. The digest is the key to the
// matching stack in the Vercel logs.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: "22px",
          padding: "22px",
          margin: "0",
          background: "#faf9f5",
          color: "#141413",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(28px, 7vw, 44px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Something broke
          </h1>
          <p style={{ margin: 0, fontSize: "15px", lineHeight: 1.4 }}>
            {error.message || "Unknown error."}
          </p>
          {error.digest && (
            <p
              style={{
                margin: 0,
                fontSize: "13px",
                lineHeight: 1.4,
                color: "#5c5c56",
                wordBreak: "break-all",
              }}
            >
              Reference: {error.digest}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={reset}
          style={{
            minHeight: "44px",
            padding: "0 20px",
            borderRadius: "9999px",
            border: "none",
            background: "#141413",
            color: "#ffffff",
            fontSize: "15px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
