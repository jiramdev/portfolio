import ProjectsGrid from "@/components/ProjectsGrid";
import { getProjects } from "@/lib/projects";
import { SITE_DESCRIPTION } from "@/lib/site";

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <>
      {/* The header renders the name as per-letter spans, which naive text
          extractors read as "J i r a m". This is the page's real heading. */}
      <h1 className="sr-only">Jiram — {SITE_DESCRIPTION}</h1>
      <ProjectsGrid projects={projects} />
    </>
  );
}