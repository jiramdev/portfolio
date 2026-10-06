"use client";

import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/projects";

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative aspect-[5/4] w-full overflow-hidden rounded-[16px] bg-[var(--color-surface)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow duration-[200ms] [transition-timing-function:var(--ease-anthropic)]">
      {/* Media Canvas */}
      <div className="relative w-full h-full overflow-hidden">
        {project.mediaType === "video" ? (
          <video
            src={project.mediaUrl}
            poster={project.poster}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover transition-transform duration-[800ms] [transition-timing-function:var(--ease-anthropic)] motion-reduce:transition-none group-hover:scale-[1.02]"
          />
        ) : (
          <Image
            src={project.mediaUrl}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-[800ms] [transition-timing-function:var(--ease-anthropic)] motion-reduce:transition-none group-hover:scale-[1.02]"
          />
        )}

        {/* Minimal gradient scrim for WCAG legibility (on-primary text) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)]/80 via-[var(--color-surface)]/15 to-transparent pointer-events-none"
        />
      </div>

      {/* Card Metadata Bar */}
      <div className="absolute inset-x-0 bottom-0 p-[16px] z-10 flex items-center justify-between pointer-events-none select-none">
        <div className="flex items-center gap-[12px]">
          {/* Logo Frame: 32×32px, radius.sm (8px) */}
          <div className="w-[32px] h-[32px] rounded-[8px] overflow-hidden bg-[var(--color-surface)]/40 backdrop-blur-md shrink-0 flex items-center justify-center">
            {project.logoUrl ? (
              <Image
                src={project.logoUrl}
                alt=""
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                className="w-[14px] h-[14px] stroke-[var(--color-on-primary)]"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="m9 9 6 6m0-6-6 6" />
              </svg>
            )}
          </div>

          {/* Title & Tagline in strict Anthropic Body Spec (12px, -0.24px) */}
          <div className="flex flex-col justify-center leading-none">
            <span className="text-[12px] font-[700] leading-[1.4] text-[var(--color-on-primary)] tracking-[-0.24px]">
              {project.name}
            </span>
            <span className="text-[12px] font-[400] leading-[1.4] text-[var(--color-on-primary)]/80 tracking-[-0.24px] mt-[2px]">
              {project.tagline}
            </span>
          </div>
        </div>

        {/* Year / Timeline */}
        <span className="text-[12px] font-[400] leading-[1.4] text-[var(--color-on-primary)]/80 tracking-[-0.24px] shrink-0">
          {project.timeline}
        </span>
      </div>
    </div>
  );
}

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <section className="w-full bg-[var(--color-background)]">
      <div className="max-w-[1440px] mx-auto px-[16px] md:px-[22px] py-[22px]">
        {/* Responsive 2-column grid using scale gap: 22px */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px]">
          {projects.map((project) => (
            <article key={project.slug} className="flex flex-col">
              <Link
                href={`/projects/${project.slug}`}
                aria-label={`${project.name} — ${project.tagline}`}
                className="block rounded-[16px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2"
              >
                <ProjectCard project={project} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}