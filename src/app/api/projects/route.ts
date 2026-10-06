import { NextResponse } from "next/server";
import { getProjects, saveProjects, type Project } from "@/lib/projects";

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  try {
    const updatedProjects: Project[] = await req.json();
    await saveProjects(updatedProjects);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save projects" }, { status: 500 });
  }
}