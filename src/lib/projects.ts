export interface MediaItem {
  url: string;
  /** Describes the media for people who cannot see it. Never reuse the caption for this. */
  alt: string;
  caption?: string;
  /** Still frame for videos. Also the poster shown to reduced-motion visitors. */
  poster?: string;
}

export interface Cover extends MediaItem {
  type: "image" | "video";
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  /** Free-form year or range, e.g. "2025" or "2023 - 2024". */
  timeline: string;
  role: string;
  client?: string;
  websiteUrl?: string;
  websiteLabel?: string;
  /** One sentence. Used for meta descriptions and link previews. */
  summary: string;
  /** One or two sentences. Used as the lead paragraph on the project page. */
  description: string;
  disciplines: string[];
  deliverables: string[];
  /** Optional logo tile for the card badge. Falls back to initials. */
  logoUrl?: string;
  /** Grid + page header media. First gallery item if omitted. */
  cover: Cover;
  gallery: MediaItem[];
  /** Ascending. Drives grid order and the sitemap. */
  order: number;
  /** Shown in the grid, but no page is generated and the card is not a link. */
  comingSoon?: boolean;
}

export const projects: Project[] = [
  {
    slug: "repstr",
    name: "Repstr",
    tagline: "Workout tracker & fitness application",
    timeline: "2026",
    role: "Design & Development",
    client: "Freelance",
    websiteUrl: "https://workouts-xi-eight.vercel.app/",
    websiteLabel: "repstr.app",
    disciplines: ["Product Architecture", "Design Systems", "Full-Stack Development"],
    deliverables: ["Responsive Web Application", "Workout Logging Engine", "Progression Analytics"],
    summary:
      "A minimalist, high-performance workout companion and progression tracker built for friction-free exercise logging and volume analysis.",
    description:
      "Repstr removes the friction of workout tracking during training: a mobile-first interface optimized for rapid input, visual routine builders, and real-time exercise volume tracking.",
    order: 1,
    // Self-hosted and re-encoded. The original was a 989KB VP9 WebM, which iOS
    // Safari cannot decode at all, so this card could never render on iPhone.
    // Now h264/yuv420p at 160KB, with a matching poster instead of a 2880px JPEG.
    cover: {
      type: "video",
      url: "/projects/repstr/repstr-loop-5x4.mp4",
      alt: "Repstr workout screen showing the exercise set tracker mid-session",
      poster: "/projects/repstr/repstr-poster-5x4.jpg",
    },
    gallery: [
      {
        url: "/projects/repstr/repstr-loop.mp4",
        alt: "Repstr active session view with the exercise set tracker",
        caption: "Active session view and exercise set tracker.",
        poster: "/projects/repstr/repstr-poster.jpg",
      },
      {
        url: "/projects/repstr/routine-builder.jpg",
        alt: "Repstr routine builder listing exercises with rep targets and rest timers",
        caption: "Routine builder with customizable sets, rep targets, and rest timers.",
      },
      {
        url: "/projects/repstr/volume-progression.jpg",
        alt: "Repstr volume progression chart comparing weekly training load",
        caption: "Volume progression charts and progressive overload calculations.",
      },
      {
        url: "/projects/repstr/exercise-database.jpg",
        alt: "Repstr exercise database grouped by muscle group and movement pattern",
        caption: "Exercise database categorized by muscle group and movement patterns.",
      },
      {
        // The original shipped a 316kbps AAC track on a muted decorative loop.
        url: "/projects/repstr/repstr-setlog.mp4",
        alt: "Repstr live set logging with the rest timer counting down",
        caption: "Live logging and auto-advancing rest timer demonstration.",
        poster: "/projects/repstr/repstr-setlog-poster.jpg",
      },
    ],
  },
  {
    slug: "jiram-brand",
    name: "Jiram",
    tagline: "Personal brand identity",
    timeline: "2026",
    role: "Brand Identity",
    client: "Personal",
    websiteUrl: "https://www.jiram.nl",
    websiteLabel: "jiram.nl",
    /** Optional logo tile. Falls back to the project's initials. */
    logoUrl: "/jiram-mark.svg",
    disciplines: ["Brand Strategy", "Visual Identity", "Design Systems"],
    deliverables: ["Logo & Mark", "Color & Type System", "Portfolio Site"],
    summary:
      "A personal brand identity built from a single geometric mark: a near-black and off-white system carried from favicon to portfolio.",
    description:
      "The identity is one mark and one palette, applied consistently everywhere it appears. Two folded shapes carry the name, and a near-black on warm off-white palette keeps every surface high contrast and legible. The same tokens that set the favicon set the portfolio, so brand and product are never out of step.",
    order: 2,
    comingSoon: true,
    // The 5:4 loop matches the card crop exactly, so nothing is letterboxed.
    cover: {
      type: "video",
      url: "/projects/jiram/jiram-logo-loop-5x4.mp4",
      poster: "/projects/jiram/jiram-logo-poster-5x4.jpg",
      alt: "The Jiram mark assembling from two folded shapes",
    },
    gallery: [
      {
        url: "/projects/jiram/jiram-logo-loop.mp4",
        poster: "/projects/jiram/jiram-logo-poster.jpg",
        alt: "The Jiram mark assembling from two folded shapes on a dark field",
        caption: "Primary mark, animated from its two folded halves.",
      },
      {
        url: "/projects/jiram/jiram-logo-poster.jpg",
        alt: "The completed Jiram mark in cream on near-black",
        caption: "Final mark: cream on near-black.",
      },
    ],
  },
  {
    slug: "levensgloed",
    name: "Levensgloed",
    tagline: "Holistic practice",
    timeline: "2025",
    role: "Brand Identity",
    client: "Levensgloed",
    logoUrl: "/projects/levensgloed/levensgloed-mark.svg",
    disciplines: ["Brand Strategy", "Visual Identity", "Art Direction"],
    deliverables: ["Logo & Mark", "Color & Type System", "Brand Guidelines"],
    summary:
      "A calm, botanical identity for a holistic practice: a lotus mark and a sage palette built to feel grounded rather than clinical.",
    description:
      "The identity needed to read as care, not as a medical brand. A lotus built from three stroked petals sits under three gold dots, drawn in white over a muted sage field, and the same palette carries every touchpoint. Rounded forms and generous space keep the practice approachable while the high-contrast mark stays legible at favicon size.",
    order: 3,
    comingSoon: true,
    // The 5:4 loop matches the card crop exactly, so nothing is letterboxed.
    cover: {
      type: "video",
      url: "/projects/levensgloed/levensgloed-logo-loop-5x4.mp4",
      poster: "/projects/levensgloed/levensgloed-logo-poster-5x4.jpg",
      alt: "The Levensgloed lotus mark blooming on a sage green field",
    },
    gallery: [
      {
        url: "/projects/levensgloed/levensgloed-logo-loop.mp4",
        poster: "/projects/levensgloed/levensgloed-logo-poster.jpg",
        alt: "The Levensgloed lotus mark blooming on a sage green field",
        caption: "Primary mark, animated as the petals open.",
      },
      {
        url: "/projects/levensgloed/levensgloed-logo-poster.jpg",
        alt: "The completed Levensgloed lotus mark in white on sage green",
        caption: "Final mark: white lotus and gold dots on sage.",
      },
    ],
  },
];

const byOrder = [...projects].sort((a, b) => a.order - b.order);

/** Everything, coming soon included. For the grid. */
export async function getProjects(): Promise<Project[]> {
  return byOrder;
}

/** Only published work. For routes, the sitemap and navigation. */
export async function getPublishedProjects(): Promise<Project[]> {
  return byOrder.filter((p) => !p.comingSoon);
}

/** Null for a coming soon project, so its page 404s. */
export async function getProjectBySlug(
  slug: string
): Promise<Project | null> {
  return byOrder.find((p) => p.slug === slug && !p.comingSoon) ?? null;
}