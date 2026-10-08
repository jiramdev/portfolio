"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Every route starts at the top, including back and forward. Next.js restores
// the previous offset on those, and skips its own scroll-to-top for small
// offsets, so do it by hand and take the browser out of the business.
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}