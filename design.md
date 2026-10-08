<design-context>
---
version: alpha
name: Jiram
description: "Portfolio of a frontend developer and UI/UX designer. Built to show the work, not to decorate it."
sourceUrl: "https://www.jiram.nl"

colors:
  primary: "#141413"
  on-primary: "#ffffff"
  background: "#faf9f5"
  surface: "#141413"
  text: "#141413"
  text-muted: "#5c5c56"

typography:
  display:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: 58px
    fontWeight: 700
    lineHeight: 1.1
  heading:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: 58px
    fontWeight: 700
    lineHeight: 1.1
  body:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: -0.01em
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.4

spacing:
  base: 2px
  scale: [2, 4, 8, 12, 16, 22, 58, 68]

radius:
  sm: 8px
  md: 16px
  lg: 24px

shadows:
  card: "rgba(0, 0, 0, 0.01) 0px 2px 2px 0px, rgba(0, 0, 0, 0.02) 0px 4px 4px 0px, rgba(0, 0, 0, 0.04) 0px 16px 24px 0px"
  elevated: "rgba(0, 0, 0, 0.02) 0px 4px 8px 0px, rgba(0, 0, 0, 0.06) 0px 16px 32px 0px, rgba(0, 0, 0, 0.08) 0px 32px 64px 0px"

motion:
  duration-fast: 100ms
  duration-base: 200ms
  duration-slow: 800ms
  easing: "cubic-bezier(0.16, 1, 0.3, 1)"

breakpoints: [768px]
---

## Rationale

Deliberately restrained: a near-black ink (#141413) on a warm, off-white page (#faf9f5), with no accent colour at all. Two colours means every contrast decision is already made, so the work in the grid is the only thing on screen competing for attention.

Typography is one sans (Inter) plus a mono for anything technical. Body copy sits at 15px with slight negative tracking — readable for long descriptions, tight enough that a card never turns into a paragraph. Project titles run at 58px/700 with 1.1 leading, so a name lands as a statement instead of a label.

Motion is fast and eased out (`cubic-bezier(0.16, 1, 0.3, 1)`): 100–200ms for hover and focus, up to 800ms for media reveals. Shadows stay nearly invisible at rest and only lift on hover, so the grid reads as flat tiles until you reach for one.

## 1. Visual Theme & Atmosphere

The design language is **quiet portfolio**: near-black on warm off-white, no ornament. The achromatic core lets the project media be the only loud thing on screen. Generous negative space and barely-there card shadows keep the grid calm until you hover a tile.

## 2. Color System

**Palette:**
- **Primary (#141413):** Near-black. Text, borders, surfaces. Structural anchoring and maximum contrast.
- **On-Primary (#ffffff):** Text and controls sitting on dark surfaces (media captions, the floating dock).
- **Background (#faf9f5):** Warm off-white page surface. The cream undertone keeps it from feeling clinical.
- **Surface (#141413):** Identical to primary; media frames and the dock use it as a fill.
- **Text-Muted (#5c5c56):** Secondary text — captions, spec labels, metadata. Stays well clear of WCAG AA (≈6.9:1 on the background).

**Rationale:** Two colours remove ambiguity. Every element is either dark (content, interface) or light (background); hierarchy comes from size, weight and opacity, never from a new hue.

## 3. Typography

**Font Families:**
- **Inter:** Display, heading, and body.
- **System mono:** Code, tokens, anything technical. Not loaded as a webfont — fall back to the platform mono until something actually needs it.

**Scale & Hierarchy:**
- **Display & Heading:** 58px (project titles), weight 700, line-height 1.1.
- **Body:** 15px, weight 400, line-height 1.5, letter-spacing -0.01em. Big enough to read comfortably, tight enough that cards stay cards.
- **Mono:** 16px, weight 400, line-height 1.4.

**Intention:** Legibility first. This is a portfolio someone reads on a phone in bad light, so nothing important is set below 15px and nothing depends on weight 500 (only 400 and 700 are loaded).

## 4. Components & Patterns

- **Project card:** 5:4 tile, rounded 16px, media under a bottom scrim with name, tagline and year. The whole card is a link; a video pause button sits above it as a sibling.
- **Spec pair:** Client and Website, label above value, to the right of the lead paragraph and stacked under each other. On mobile they sit side by side under the paragraph.
- **Floating dock:** Dark pill, 44px targets, white-on-dark focus ring, with a "Viewing Project" indicator on project pages.
- **404:** Same type scale as a project page so a bad link still looks like the site.

**Interaction States:** hover shifts opacity to 70% and lifts the card shadow; focus is a 2px outline in the primary colour with 2px offset.

## 5. Spacing & Layout

**Scale:** [2, 4, 8, 12, 16, 22, 58, 68] pixels. Page gutter is 16px, 22px from 768px up. Content is capped at 1440px.

**Layout Grid:** One breakpoint at 768px.
- **Mobile (<768px):** Single column, 16px gutter, `pb-[110px]` so the dock never covers the last card.
- **Tablet/Desktop (≥768px):** Two-column project grid, two-up gallery batches inside project pages.

## 6. Motion & Interaction

**Timing:** 100ms hover and focus, 200ms entrances and hover shadows, 800ms media reveals.

**Easing:** cubic-bezier(0.16, 1, 0.3, 1) — an ease-out curve that feels immediate rather than floaty. Exposed as `--ease-out-expo` in CSS and `EASE` in `src/lib/motion.ts`; use one of those, never a third copy.

**Motion rules:**
- The intro runs once per session: ~2.2s with the name centred, then a 1.4s glide into the header slot before the curtain lifts. Clicking it skips to the end. It never runs for reduced-motion visitors.
- The curtain is server rendered and hidden by CSS; a script at the top of `<body>` reveals it before first paint. Do not set attributes on `<html>` for this — React hydrates it and will report a mismatch.
- Videos only play while at least half visible, and always have a pause control.
- Reduced motion: no intro, no autoplay video, near-zero CSS transitions.

## Accessibility

### Contrast Ratios

**Main pair: #141413 (text) on #faf9f5 (background)**
- Luminance of #141413 ≈ 0.02
- Luminance of #faf9f5 ≈ 0.97
- Contrast ratio ≈ **20.7:1**

This exceeds WCAG AAA (7:1) by a wide margin, ensuring legibility for all users, including those with low vision or color blindness.

**Secondary pair: #ffffff (on-primary) on #141413 (surface)**
- Luminance of #ffffff = 1.0
- Luminance of #141413 ≈ 0.02
- Contrast ratio ≈ **21:1**

Similarly excellent for inverse layouts.

### Minimum Requirements

- **Touch Target Size:** All interactive elements (buttons, links, form inputs) must be at least 44×44px (CSS pixels) to meet WCAG 2.1 Level AAA.
- **Focus Indicator:** All keyboard-navigable elements must have a visible focus state—recommend a 2px solid or outline stroke in the primary color (#141413) with a 2px offset, ensuring it's not obscured by shadows or borders. On dark backgrounds, use #ffffff for contrast.
- **Motion:** `prefers-reduced-motion` skips the intro, keeps videos on their poster, and flattens CSS transitions. Autoplaying video always has a pause control.

</design-context>

Use the design system above for all UI you generate.