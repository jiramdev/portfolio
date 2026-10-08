// Set NEXT_PUBLIC_SITE_URL in Vercel (https://www.jiram.nl). The fallback is
// the canonical host so a fresh clone still emits correct canonicals.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.jiram.nl"
).replace(/\/$/, "");

export const SITE_DESCRIPTION =
  "Frontend Developer & UI/UX Designer building design systems, high-performance front-ends and interactive primitives.";

export const GITHUB_URL = "https://github.com/jiramdev";
export const LINKEDIN_URL = "https://linkedin.com/in/marijnsnoeren";
export const EMAIL = "hallo@jiram.nl";