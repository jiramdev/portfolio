import fs from "fs/promises";
import path from "path";

export interface GalleryItem {
  url: string;
  type: "image" | "video";
  poster?: string;
  caption?: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  timeline: string;
  role: string;
  discipline?: string;
  client?: string;
  websiteUrl?: string;
  summary: string;
  description: string;
  mediaType: "image" | "video";
  mediaUrl: string;
  poster?: string;
  logoUrl?: string;
  gallery: GalleryItem[];
}

const DATA_FILE = path.join(process.cwd(), "data", "projects.json");

export async function getProjects(): Promise<Project[]> {
  try {
    const file = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(file);
  } catch (error) {
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}

export async function saveProjects(projects: Project[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(projects, null, 2), "utf-8");
}