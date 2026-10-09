"use client";

import { useEffect, useRef, useState } from "react";

// Plays only while at least half the video is on screen, and never for visitors
// who asked for reduced motion: those keep the poster frame.
//
// The src is attached the first time the video is at least half on screen, and
// stays attached after that. Attaching lazily matters: every <video> carrying a
// src opens a media pipeline and fetches at least its metadata, even at
// preload="metadata", and the white page on iOS was a dead JS context rather
// than anything in the app throwing. Detaching again was what made it flicker
// on the way back, so the gate only ever opens. While there is no src the poster
// frame stands in, so nothing looks different.
export default function VideoPlayer({
  src,
  alt,
  poster,
}: {
  src: string;
  alt: string;
  poster?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [onScreen, setOnScreen] = useState(false);
  // Latched once the video has been seen. Detaching the src again made it
  // flicker on the way back: iOS tears the media pipeline down, so re-adding it
  // flashed the poster and restarted playback from zero. An off-screen video
  // with a src but paused is inert, which is all we need it to be.
  const [attached, setAttached] = useState(false);

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
        if (entry.intersectionRatio >= 0.5) {
          setAttached(true);
          setOnScreen(true);
        } else {
          setOnScreen(false);
          video.pause();
        }
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
    <div className="absolute inset-0">
      <video
        ref={videoRef}
        src={attached ? src : undefined}
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
