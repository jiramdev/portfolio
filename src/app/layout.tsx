import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import NavigationHeader from "@/components/NavigationHeader";
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

export const metadata: Metadata = {
  title: "Jiram — Portfolio",
  description: "Frontend Developer & UI/UX Designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sansFont.variable} ${monoFont.variable}`}>
      <body className="antialiased bg-[var(--color-background)] text-[var(--color-text)]">
        <LoaderProvider>
          <NavigationHeader />
          <main>{children}</main>
        </LoaderProvider>
      </body>
    </html>
  );
}