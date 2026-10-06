export interface GalleryItem {
    url: string;
    type: "image" | "video";
    poster?: string;
    caption?: string;
    aspect?: "aspect-[16/10]" | "aspect-[5/4]" | "aspect-[4/3]" | "aspect-[16/9]";
    span?: "full" | "half";
  }
  
  export interface Project {
    slug: string;
    name: string;
    tagline: string;
    timeline: string;
    role: string;
    summary: string;
    description: string;
    client?: string;
    websiteUrl?: string;
    websiteLabel?: string;
    discipline?: string;
    disciplines?: string[];
    deliverables?: string[];
    gallery: GalleryItem[];
    mediaUrl: string;
    mediaType: "image" | "video";
    poster?: string;
    logoUrl?: string;
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
        "Repstr is designed to remove the friction of workout tracking during training. Featuring a mobile-first interface optimized for rapid input, visual routine builders, and real-time exercise volume tracking.",
      mediaUrl: "https://framerusercontent.com/assets/FX5mimXKX7Yfd5rl6WCOVG5xwo4.webm",
      poster: "https://framerusercontent.com/images/pWfJZFg9W9Pgu1YJHpxS3n5DyzU.jpg?width=2880&height=2160",
      logoUrl: "https://framerusercontent.com/images/ieyS1vv8DRNCS2HspT52HzYbNY.jpg?width=160&height=160",
      mediaType: "video",
      gallery: [
        {
          url: "https://framerusercontent.com/assets/FX5mimXKX7Yfd5rl6WCOVG5xwo4.webm",
          type: "video",
          poster: "https://framerusercontent.com/images/pWfJZFg9W9Pgu1YJHpxS3n5DyzU.jpg?width=2880&height=2160",
          caption: "Repstr active session view and exercise set tracker.",
          span: "full",
          aspect: "aspect-[16/10]",
        },
        {
          url: "https://framerusercontent.com/images/pWfJZFg9W9Pgu1YJHpxS3n5DyzU.jpg?width=2880&height=2160",
          type: "image",
          caption: "Routine builder with customizable sets, rep targets, and rest timers.",
          span: "half",
          aspect: "aspect-[4/3]",
        },
        {
          url: "https://framerusercontent.com/images/JymNjNMkTX8HqO6KMaNkRsN7Po.jpg",
          type: "image",
          caption: "Volume progression charts and progressive overload calculations.",
          span: "half",
          aspect: "aspect-[4/3]",
        },
        {
          url: "https://framerusercontent.com/images/7Mhf5f4JC1DBu8fFYwhFGkP7HHY.jpg",
          type: "image",
          caption: "Exercise database categorized by muscle group and movement patterns.",
          span: "half",
          aspect: "aspect-[4/3]",
        },
        {
          url: "https://framerusercontent.com/images/ieyS1vv8DRNCS2HspT52HzYbNY.jpg?width=160&height=160",
          type: "image",
          caption: "Design tokens and mobile-first micro-interaction hierarchy.",
          span: "half",
          aspect: "aspect-[4/3]",
        },
        {
          url: "https://framerusercontent.com/assets/7JkzhSJSRlLBF8aCbxCCPUdg.mp4",
          type: "video",
          caption: "Live logging and auto-advancing rest timer demonstration.",
          span: "full",
          aspect: "aspect-[16/10]",
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
        "Bringing spatial interior design tools directly to everyday customers without requiring LiDAR hardware. Co-designed and maintained the AR toolset within IKEA retailer apps worldwide, establishing natural room scanning motions and realistic lighting models.",
      mediaUrl: "https://framerusercontent.com/assets/r7Hd0ofSCIqWu298GYqCmdoQ.mp4",
      poster: "https://framerusercontent.com/images/7Mhf5f4JC1DBu8fFYwhFGkP7HHY.jpg",
      mediaType: "video",
      gallery: [
        {
          url: "https://framerusercontent.com/assets/r7Hd0ofSCIqWu298GYqCmdoQ.mp4",
          type: "video",
          poster: "https://framerusercontent.com/images/7Mhf5f4JC1DBu8fFYwhFGkP7HHY.jpg",
          caption: "AR room surface detection and spatial guidance interaction loops.",
          span: "full",
          aspect: "aspect-[16/10]",
        },
        {
          url: "https://framerusercontent.com/images/7Mhf5f4JC1DBu8fFYwhFGkP7HHY.jpg",
          type: "image",
          caption: "3D model placement grid and floor plane anchoring.",
          span: "half",
          aspect: "aspect-[4/3]",
        },
        {
          url: "https://framerusercontent.com/images/JymNjNMkTX8HqO6KMaNkRsN7Po.jpg",
          type: "image",
          caption: "Material shader preview and real-time lighting calculation.",
          span: "half",
          aspect: "aspect-[4/3]",
        },
        {
          url: "https://framerusercontent.com/images/pWfJZFg9W9Pgu1YJHpxS3n5DyzU.jpg?width=2880&height=2160",
          type: "image",
          caption: "Room perimeter dimensional annotations and boundary limits.",
          span: "half",
          aspect: "aspect-[4/3]",
        },
        {
          url: "https://framerusercontent.com/images/ieyS1vv8DRNCS2HspT52HzYbNY.jpg?width=160&height=160",
          type: "image",
          caption: "Spatial guidance UI token set.",
          span: "half",
          aspect: "aspect-[4/3]",
        },
        {
          url: "https://framerusercontent.com/assets/FX5mimXKX7Yfd5rl6WCOVG5xwo4.webm",
          type: "video",
          poster: "https://framerusercontent.com/images/pWfJZFg9W9Pgu1YJHpxS3n5DyzU.jpg?width=2880&height=2160",
          caption: "Complete end-to-end furniture staging and AR inspection loop.",
          span: "full",
          aspect: "aspect-[16/10]",
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
        "Architected enterprise-grade token distribution pipelines and accessible component primitives across multi-brand organizations, reducing regression rates and standardizing typography, elevation, and color variables.",
      mediaUrl: "https://framerusercontent.com/images/JymNjNMkTX8HqO6KMaNkRsN7Po.jpg",
      mediaType: "image",
      gallery: [
        {
          url: "https://framerusercontent.com/images/JymNjNMkTX8HqO6KMaNkRsN7Po.jpg",
          type: "image",
          caption: "Semantic token registry and multi-brand theme transforms.",
          span: "full",
          aspect: "aspect-[16/10]",
        },
        {
          url: "https://framerusercontent.com/images/pWfJZFg9W9Pgu1YJHpxS3n5DyzU.jpg?width=2880&height=2160",
          type: "image",
          caption: "Component documentation and typography scale tokens.",
          span: "half",
          aspect: "aspect-[4/3]",
        },
        {
          url: "https://framerusercontent.com/images/7Mhf5f4JC1DBu8fFYwhFGkP7HHY.jpg",
          type: "image",
          caption: "Visual regression verification suite across light and dark tokens.",
          span: "half",
          aspect: "aspect-[4/3]",
        },
        {
          url: "https://framerusercontent.com/images/ieyS1vv8DRNCS2HspT52HzYbNY.jpg?width=160&height=160",
          type: "image",
          caption: "Core primitives icon tokens.",
          span: "half",
          aspect: "aspect-[4/3]",
        },
        {
          url: "https://framerusercontent.com/images/JymNjNMkTX8HqO6KMaNkRsN7Po.jpg",
          type: "image",
          caption: "Breakpoint matrix and responsive column variables.",
          span: "half",
          aspect: "aspect-[4/3]",
        },
        {
          url: "https://framerusercontent.com/assets/7JkzhSJSRlLBF8aCbxCCPUdg.mp4",
          type: "video",
          caption: "Live token hot-reloading pipeline demonstration.",
          span: "full",
          aspect: "aspect-[16/10]",
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
      mediaUrl: "https://framerusercontent.com/assets/7JkzhSJSRlLBF8aCbxCCPUdg.mp4",
      mediaType: "video",
      gallery: [
        {
          url: "https://framerusercontent.com/assets/7JkzhSJSRlLBF8aCbxCCPUdg.mp4",
          type: "video",
          caption: "Spring dynamics and gesture drag inertia prototype.",
          span: "full",
          aspect: "aspect-[16/10]",
        },
        {
          url: "https://framerusercontent.com/images/JymNjNMkTX8HqO6KMaNkRsN7Po.jpg",
          type: "image",
          caption: "Curve velocity maps and deceleration timings.",
          span: "half",
          aspect: "aspect-[4/3]",
        },
        {
          url: "https://framerusercontent.com/images/7Mhf5f4JC1DBu8fFYwhFGkP7HHY.jpg",
          type: "image",
          caption: "Tactile response bounds and touch targets.",
          span: "half",
          aspect: "aspect-[4/3]",
        },
        {
          url: "https://framerusercontent.com/images/pWfJZFg9W9Pgu1YJHpxS3n5DyzU.jpg?width=2880&height=2160",
          type: "image",
          caption: "Gesture overshoot damping and restoration coefficients.",
          span: "half",
          aspect: "aspect-[4/3]",
        },
        {
          url: "https://framerusercontent.com/images/ieyS1vv8DRNCS2HspT52HzYbNY.jpg?width=160&height=160",
          type: "image",
          caption: "Touch gesture kinetic states.",
          span: "half",
          aspect: "aspect-[4/3]",
        },
        {
          url: "https://framerusercontent.com/assets/FX5mimXKX7Yfd5rl6WCOVG5xwo4.webm",
          type: "video",
          caption: "Spatial micro-interaction loop with real-time acceleration.",
          span: "full",
          aspect: "aspect-[16/10]",
        },
      ],
    },
  ];
  
  export async function getProjects(): Promise<Project[]> {
    return projects;
  }
  
  export async function getProjectBySlug(slug: string): Promise<Project | null> {
    return projects.find((p) => p.slug === slug) ?? null;
  }