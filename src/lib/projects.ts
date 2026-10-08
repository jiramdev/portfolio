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
    cover: {
      type: "video",
      url: "https://framerusercontent.com/assets/FX5mimXKX7Yfd5rl6WCOVG5xwo4.webm",
      alt: "Repstr workout screen showing the exercise set tracker mid-session",
      poster: "https://framerusercontent.com/images/pWfJZFg9W9Pgu1YJHpxS3n5DyzU.jpg?width=2880&height=2160",
    },
    gallery: [
      {
        url: "https://framerusercontent.com/assets/FX5mimXKX7Yfd5rl6WCOVG5xwo4.webm",
        alt: "Repstr active session view with the exercise set tracker",
        caption: "Active session view and exercise set tracker.",
        poster: "https://framerusercontent.com/images/pWfJZFg9W9Pgu1YJHpxS3n5DyzU.jpg?width=2880&height=2160",
      },
      {
        url: "https://framerusercontent.com/images/pWfJZFg9W9Pgu1YJHpxS3n5DyzU.jpg?width=2880&height=2160",
        alt: "Repstr routine builder listing exercises with rep targets and rest timers",
        caption: "Routine builder with customizable sets, rep targets, and rest timers.",
      },
      {
        url: "https://framerusercontent.com/images/JymNjNMkTX8HqO6KMaNkRsN7Po.jpg",
        alt: "Repstr volume progression chart comparing weekly training load",
        caption: "Volume progression charts and progressive overload calculations.",
      },
      {
        url: "https://framerusercontent.com/images/7Mhf5f4JC1DBu8fFYwhFGkP7HHY.jpg",
        alt: "Repstr exercise database grouped by muscle group and movement pattern",
        caption: "Exercise database categorized by muscle group and movement patterns.",
      },
      {
        url: "https://framerusercontent.com/assets/7JkzhSJSRlLBF8aCbxCCPUdg.mp4",
        alt: "Repstr live set logging with the rest timer counting down",
        caption: "Live logging and auto-advancing rest timer demonstration.",
        poster: "https://framerusercontent.com/images/pWfJZFg9W9Pgu1YJHpxS3n5DyzU.jpg?width=2880&height=2160",
      },
    ],
  },
  {
    slug: "ikea-studio",
    name: "IKEA",
    tagline: "Augmented reality interior toolset",
    timeline: "2023 - 2024",
    role: "Product Design",
    client: "IKEA Retail",
    websiteUrl: "https://ikea.com",
    disciplines: ["Spatial UX", "Augmented Reality", "Interaction Design"],
    deliverables: ["AR Scan Primitives", "Catalog Interaction Toolset", "Design Guidelines"],
    summary:
      "Co-designed and maintained the AR toolset within retailer apps for IKEA worldwide, making interior design tools available for the many. Commissioned by Bakken & Baeck.",
    description:
      "Bringing spatial interior design tools directly to everyday customers without requiring LiDAR hardware: co-designed and maintained the AR toolset within IKEA retailer apps worldwide, establishing natural room scanning motions and realistic lighting models.",
    order: 2,
    comingSoon: true,
    cover: {
      type: "video",
      url: "https://framerusercontent.com/assets/r7Hd0ofSCIqWu298GYqCmdoQ.mp4",
      alt: "IKEA app scanning a room and placing furniture in augmented reality",
      poster: "https://framerusercontent.com/images/7Mhf5f4JC1DBu8fFYwhFGkP7HHY.jpg",
    },
    gallery: [
      {
        url: "https://framerusercontent.com/assets/r7Hd0ofSCIqWu298GYqCmdoQ.mp4",
        alt: "IKEA AR tool detecting room surfaces and guiding the scan",
        caption: "AR room surface detection and spatial guidance interaction loops.",
        poster: "https://framerusercontent.com/images/7Mhf5f4JC1DBu8fFYwhFGkP7HHY.jpg",
      },
      {
        url: "https://framerusercontent.com/images/7Mhf5f4JC1DBu8fFYwhFGkP7HHY.jpg",
        alt: "IKEA AR furniture placed on a detected floor plane",
        caption: "3D model placement grid and floor plane anchoring.",
      },
      {
        url: "https://framerusercontent.com/images/JymNjNMkTX8HqO6KMaNkRsN7Po.jpg",
        alt: "IKEA AR material preview lit by the room's real light",
        caption: "Material shader preview and real-time lighting calculation.",
      },
      {
        url: "https://framerusercontent.com/images/pWfJZFg9W9Pgu1YJHpxS3n5DyzU.jpg?width=2880&height=2160",
        alt: "IKEA AR room scan with dimension annotations around the perimeter",
        caption: "Room perimeter dimensional annotations and boundary limits.",
      },
      {
        url: "https://framerusercontent.com/assets/FX5mimXKX7Yfd5rl6WCOVG5xwo4.webm",
        alt: "End-to-end IKEA AR staging of a complete living room",
        caption: "Complete end-to-end furniture staging and AR inspection loop.",
        poster: "https://framerusercontent.com/images/pWfJZFg9W9Pgu1YJHpxS3n5DyzU.jpg?width=2880&height=2160",
      },
    ],
  },
  {
    slug: "design-systems-core",
    name: "Design Systems",
    tagline: "Cross-platform enterprise tokens",
    timeline: "2025",
    role: "Frontend & Architecture",
    client: "Enterprise Platform Core",
    disciplines: ["Design Systems", "Web Architecture", "Accessibility"],
    deliverables: ["Semantic Token Registry", "Multi-brand UI Engine", "Documentation Kit"],
    summary:
      "Engineered token pipelines and accessible component primitives for enterprise platforms, reducing front-end regression rates while standardizing multi-brand theming.",
    description:
      "Architected token distribution pipelines and accessible component primitives across multi-brand organizations, reducing regression rates and standardizing typography, elevation, and color variables.",
    order: 3,
    comingSoon: true,
    cover: {
      type: "image",
      url: "https://framerusercontent.com/images/JymNjNMkTX8HqO6KMaNkRsN7Po.jpg",
      alt: "Semantic design token registry shown alongside transformed brand themes",
    },
    gallery: [
      {
        url: "https://framerusercontent.com/images/JymNjNMkTX8HqO6KMaNkRsN7Po.jpg",
        alt: "Semantic token registry with multi-brand theme transforms",
        caption: "Semantic token registry and multi-brand theme transforms.",
      },
      {
        url: "https://framerusercontent.com/images/pWfJZFg9W9Pgu1YJHpxS3n5DyzU.jpg?width=2880&height=2160",
        alt: "Component documentation page showing the typography scale tokens",
        caption: "Component documentation and typography scale tokens.",
      },
      {
        url: "https://framerusercontent.com/images/7Mhf5f4JC1DBu8fFYwhFGkP7HHY.jpg",
        alt: "Visual regression suite comparing light and dark token output",
        caption: "Visual regression verification suite across light and dark tokens.",
      },
      {
        url: "https://framerusercontent.com/assets/7JkzhSJSRlLBF8aCbxCCPUdg.mp4",
        alt: "Token hot-reloading pipeline updating components live in the browser",
        caption: "Live token hot-reloading pipeline demonstration.",
        poster: "https://framerusercontent.com/images/JymNjNMkTX8HqO6KMaNkRsN7Po.jpg",
      },
    ],
  },
  {
    slug: "kinetic-interfaces",
    name: "Kinetic UI",
    tagline: "Physics-based interaction primitives",
    timeline: "2026",
    role: "Interaction Design",
    client: "R&D Prototype",
    disciplines: ["Interaction Design", "Motion Physics", "Creative Engineering"],
    deliverables: ["Gesture Physics Model", "Interactive Prototypes", "Haptic Specs"],
    summary:
      "Explored physics-based gestures, spring dynamics, and spatial micro-interactions for next-generation touch and cursor interfaces.",
    description:
      "An exploratory investigation into organic physics-based gestures, fluid micro-interactions, and velocity-informed spring dynamics for modern touch and cursor surfaces.",
    order: 4,
    comingSoon: true,
    cover: {
      type: "video",
      url: "https://framerusercontent.com/assets/7JkzhSJSRlLBF8aCbxCCPUdg.mp4",
      alt: "Kinetic UI prototype showing spring dynamics on a dragged element",
      poster: "https://framerusercontent.com/images/JymNjNMkTX8HqO6KMaNkRsN7Po.jpg",
    },
    gallery: [
      {
        url: "https://framerusercontent.com/assets/7JkzhSJSRlLBF8aCbxCCPUdg.mp4",
        alt: "Kinetic UI prototype with spring dynamics and gesture drag inertia",
        caption: "Spring dynamics and gesture drag inertia prototype.",
        poster: "https://framerusercontent.com/images/JymNjNMkTX8HqO6KMaNkRsN7Po.jpg",
      },
      {
        url: "https://framerusercontent.com/images/JymNjNMkTX8HqO6KMaNkRsN7Po.jpg",
        alt: "Gesture curve velocity map with deceleration timings",
        caption: "Curve velocity maps and deceleration timings.",
      },
      {
        url: "https://framerusercontent.com/images/7Mhf5f4JC1DBu8fFYwhFGkP7HHY.jpg",
        alt: "Touch target bounds diagram for tactile response states",
        caption: "Tactile response bounds and touch targets.",
      },
      {
        url: "https://framerusercontent.com/assets/FX5mimXKX7Yfd5rl6WCOVG5xwo4.webm",
        alt: "Spatial micro-interaction loop reacting to real-time acceleration",
        caption: "Spatial micro-interaction loop with real-time acceleration.",
        poster: "https://framerusercontent.com/images/pWfJZFg9W9Pgu1YJHpxS3n5DyzU.jpg?width=2880&height=2160",
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