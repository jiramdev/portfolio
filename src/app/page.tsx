import { getProjects } from "@/lib/projects";
import HomeClient from "@/components/HomeClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const projects = await getProjects();
  return <HomeClient projects={projects} />;
}