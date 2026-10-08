# jiram.nl

Portfolio site for **Jiram** — frontend developer & UI/UX designer.
Live: **https://www.jiram.nl**

## Stack

| | |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack), React 19 |
| Language | TypeScript, strict |
| Styling | Tailwind CSS v4 + CSS variables in `src/app/globals.css` |
| Animation | `motion` (imported from `motion/react`) |
| Fonts | Inter via `next/font` (weights 400 + 700) |
| Images | `next/image` + `ImageResponse` for generated share images |
| Hosting | Vercel |

No CMS. Projects are a typed array in `src/lib/projects.ts`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm start          # serve the build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm test           # node --test, project data invariants
```

Set `NEXT_PUBLIC_SITE_URL` in Vercel (and in `.env.local` if you want to
preview another host). It drives canonical URLs, `sitemap.xml`, `robots.txt`
and `og:url`. Defaults to `https://www.jiram.nl`.

## Add a project

Everything lives in `src/lib/projects.ts`. Append an object to `projects`
and give it the next `order`:

```ts
{
  slug: "new-project",              // URL: /projects/new-project
  name: "New Project",
  tagline: "One line for the card",
  timeline: "2026",                 // "2025" or "2023 - 2024"
  role: "Design & Development",
  client: "Client name",            // optional
  websiteUrl: "https://…",          // optional
  websiteLabel: "example.com",      // optional, defaults to the bare host
  disciplines: ["Interaction Design"],   // in the data, not rendered yet
  deliverables: ["Web Application"],
  summary: "One sentence. Used for meta descriptions and link previews.",
  description: "One or two sentences. Lead paragraph on the project page.",
  cover: {                          // grid tile + page header
    type: "video",                  // "image" | "video"
    url: "https://…/cover.webm",
    poster: "https://…/cover.jpg",  // required for video
    alt: "What is literally on screen",
  },
  gallery: [                        // first item is usually the cover
    { url: "https://…/a.jpg", alt: "Describe the image", caption: "Optional caption" },
    { url: "https://…/b.webm", poster: "https://…/b.jpg", alt: "Describe the video" },
  ],
  order: 5,
}
```

Rules the tests enforce (`npm test`):

- `order` values must be unique and ascending — they drive grid order and the
  sitemap.
- Every image and video needs real `alt` text describing the media, not the
  caption.
- Every video needs a `poster`, so reduced-motion visitors get a still frame.

Set `comingSoon: true` and the project still appears in the grid (with a
"Coming soon" badge, no link, no hover lift) but gets no page: the route 404s
and it is left out of the sitemap and of `generateStaticParams`. Drop the flag
to publish it.

`src/app/projects/[slug]/opengraph-image.tsx` builds the share image from the
project data automatically — no extra file per project.

Remote images are allowed from `framerusercontent.com` in `next.config.ts`.
Add other hosts there if you move your media.

## Layout

```
src/
  app/
    layout.tsx              fonts, metadata, JSON-LD, header + dock
    page.tsx                home: intro + project grid
    template.tsx            page transition
    not-found.tsx           styled 404
    opengraph-image.tsx     home share image
    icon.svg apple-icon.png favicon + touch icon
    robots.ts sitemap.ts
    projects/[slug]/
      page.tsx              project page
      opengraph-image.tsx   per-project share image
  components/
    Header.tsx              identity + social links
    NavigationHeader.tsx    the global header
    FloatingDock.tsx        home / contact / viewing-project pill
    ProjectsGrid.tsx        server rendered card grid
    VideoPlayer.tsx         play only on screen, pause control, poster
    FlyingLoader.tsx        one-time intro: name glides into the header
    PageLoaderContext.tsx   intro phase machine
  lib/
    projects.ts             project data + queries
    site.ts                 site URL, description, social links
    intro.ts                sessionStorage key + pre-paint bootstrap script
    motion.ts               the one easing curve
```

`design.md` holds the design system: colours, type scale, motion and the
accessibility rules. Read it before changing styles.