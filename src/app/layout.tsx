import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import NavigationHeader from "@/components/NavigationHeader";
import FloatingDock from "@/components/FloatingDock";
import { LoaderProvider } from "@/components/PageLoaderContext";
import "./globals.css";

const sansFont = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-anthropic-sans",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anthropic-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jiram.nl";

export const viewport: Viewport = {
  themeColor: "#faf9f5",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jiram — Frontend Developer & UI/UX Designer",
    template: "%s | Jiram",
  },
  description:
    "Portfolio of Jiram, specializing in design systems, high-performance web architecture, and craft-driven interactive interfaces.",
  keywords: [
    "Jiram",
    "Frontend Developer",
    "UI/UX Designer",
    "Product Design",
    "Next.js",
    "Design Systems",
    "Web Application Development",
    "Netherlands",
  ],
  authors: [{ name: "Jiram", url: siteUrl }],
  creator: "Jiram",
  publisher: "Jiram",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Jiram — Frontend Developer & UI/UX Designer",
    description:
      "Crafting high-performance web architecture, design systems, and thoughtful digital interfaces.",
    url: siteUrl,
    siteName: "Jiram Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jiram — Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jiram — Frontend Developer & UI/UX Designer",
    description:
      "Crafting high-performance web architecture, design systems, and thoughtful digital interfaces.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org Person & WebSite JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Jiram",
        jobTitle: "Frontend Developer & UI/UX Designer",
        url: siteUrl,
        email: "hallo@jiram.nl",
        sameAs: [],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Jiram — Portfolio",
        publisher: { "@id": `${siteUrl}/#person` },
      },
    ],
  };

  return (
    <html lang="en" className={`${sansFont.variable} ${monoFont.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-[var(--color-background)] text-[var(--color-text)]">
        <LoaderProvider>
          <NavigationHeader />
          <main>{children}</main>
          <FloatingDock />
        </LoaderProvider>
      </body>
    </html>
  );
}