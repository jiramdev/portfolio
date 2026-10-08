"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import { projects } from "@/lib/projects";
import { useLoader } from "@/components/PageLoaderContext";

// During the intro the header shows the studio identity, because that is the
// copy gliding into it. On dock, a project page rolls its own title, category
// and year into the same slot.
export default function NavigationHeader() {
  const pathname = usePathname();
  const { isIntroActive } = useLoader();

  const slug = isIntroActive
    ? null
    : pathname?.startsWith("/projects/")
      ? pathname.split("/")[2]
      : null;
  const project = slug
    ? projects.find((p) => p.slug === slug && !p.comingSoon)
    : null;

  if (!project) {
    return <Header />;
  }

  return (
    <Header
      title={project.name}
      subtitle={project.role}
      year={project.timeline}
      showCopyright={false}
    />
  );
}