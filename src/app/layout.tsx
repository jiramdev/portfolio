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
const siteDescription = "Frontend Developer & UI/UX Designer";

export const viewport: Viewport = {
  themeColor: "#faf9f5",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "jiram",
    template: "jiram | %s",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  description: siteDescription,
  keywords: [
    "jiram",
    "Frontend Developer",
    "UI/UX Designer",
    "Design Systems",
    "Web Development",
    "Netherlands",
  ],
  authors: [{ name: "jiram", url: siteUrl }],
  creator: "jiram",
  publisher: "jiram",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "jiram",
    description: siteDescription,
    url: siteUrl,
    siteName: "jiram",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "jiram",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "jiram",
    description: siteDescription,
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "jiram",
        jobTitle: "Frontend Developer & UI/UX Designer",
        url: siteUrl,
        email: "hallo@jiram.nl",
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "jiram",
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