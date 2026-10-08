import ProjectsGrid from "@/components/ProjectsGrid";
import { getProjects } from "@/lib/projects";

export default async function HomePage() {
  const projects = await getProjects();

  return <ProjectsGrid projects={projects} />;
}