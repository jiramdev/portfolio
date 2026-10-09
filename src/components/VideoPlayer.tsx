"use client";

import { useEffect, useRef, useState } from "react";

// Plays only while the video is on screen, and never for visitors who asked for
// reduced motion: those keep the poster frame.
//
// The src is attached lazily and detached again once the video leaves a margin
// around the viewport. Every <video> carrying a src opens a media pipeline and
// fetches at least its metadata, even at preload="metadata". Measuring 10 fast
// home/project round trips issued 56 mp4 requests with 2-3 playing at once, and
// on a phone that churn is enough to exhaust WebKit's media resources and take
// the content process down with it. A dead process is a white page with an empty
// console, because the JS context is gone with it. While there is no src the
// poster frame stands in, so nothing looks different.
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
  const [nearViewport, setNearViewport] = useState(false);
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
        // isIntersecting includes the rootMargin below, so it decides when to
        // attach the src. intersectionRatio does not, so it decides when to
        // play. Without the split the margin would start playback off screen.
        setNearViewport(entry.isIntersecting);
        setOnScreen(entry.intersectionRatio >= 0.5);
        if (entry.intersectionRatio < 0.5) video.pause();
      },
      // Attach the src a little before it is needed, so the first frame is ready
      // rather than popping in.
      { rootMargin: "200px" }
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
        src={nearViewport ? src : undefined}
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
