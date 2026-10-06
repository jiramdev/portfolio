"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import { projects } from "@/data/projects";

export default function NavigationHeader() {
  const pathname = usePathname();

  // Hide the global header on all /admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const match = pathname?.startsWith("/projects/")
    ? pathname.replace("/projects/", "").split("/")[0]
    : null;

  const currentProject = match ? projects.find((p) => p.slug === match) : null;

  return (
    <Header
      title={currentProject?.name ?? "Jiram"}
      subtitle={currentProject?.role ?? "Frontend Developer & UI/UX Designer"}
      year={currentProject?.timeline ?? "2026"}
      showCopyright={!currentProject}
    />
  );
}