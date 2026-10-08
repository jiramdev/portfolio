"use client";

import { useEffect, useRef } from "react";

// Plays only while at least half the video is on screen, and never for
// visitors who asked for reduced motion: those keep the poster frame.
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !motion.matches) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`absolute inset-0 ${className}`}>
      <video
        ref={videoRef}
        src={src}
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