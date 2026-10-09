"use client";

import { useEffect, useRef, useState } from "react";

// Plays only while at least half the video is on screen, and never for visitors
// who asked for reduced motion: those keep the poster frame.
//
// The src is attached only while that gate is open and removed again when it
// closes. Every <video> carrying a src opens a media pipeline and fetches at
// least its metadata, even at preload="metadata", and the white page on iOS is a
// dead JS context rather than anything in the app throwing. Measuring 10 fast
// home/project round trips issued 56 mp4 requests with 2-3 playing at once.
// While there is no src the poster frame stands in, so nothing looks different.
export default function VideoPlayer({
  src,
  alt,
  poster,
  className = "",
}: {
  src: string;
  alt: string;
  poster?: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // entries can be empty: WebKit delivers an empty list when an observer is
        // torn down during a history pop or bfcache restore. Destructuring
        // [entry] straight off it threw a TypeError and took the whole tree down.
        const entry = entries[0];
        if (!entry) return;
        setOnScreen(entry.intersectionRatio >= 0.5);
        if (entry.intersectionRatio < 0.5) video.pause();
      },
      { threshold: [0, 0.5, 1] }
    );
    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  // Separate from the observer on purpose. Playing from the observer callback
  // ran before React had attached the src, so play() hit a sourceless element
  // and silently did nothing.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !onScreen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    void video.play().catch(() => {});
  }, [onScreen]);

  return (
    <div className={`absolute inset-0 ${className}`}>
      <video
        ref={videoRef}
        src={onScreen ? src : undefined}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={alt}
        className="h-full w-full object-cover transition-transform duration-[800ms] [transition-timing-function:var(--ease-out-expo)] motion-reduce:transition-none group-hover:scale-[1.02]"
      />
    </div>
  );
}
