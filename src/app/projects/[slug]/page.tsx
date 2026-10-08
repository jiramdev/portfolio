import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import VideoPlayer from "@/components/VideoPlayer";
import {
  getProjectBySlug,
  getPublishedProjects,
  type MediaItem,
} from "@/lib/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.name} — Jiram`,
      description: project.summary,
      url: `/projects/${project.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} — Jiram`,
      description: project.summary,
    },
  };
}

const isVideo = (item: MediaItem) => /\.(mp4|webm|mov)(\?|$)/i.test(item.url);

function MediaCard({
  item,
  aspectRatio,
  sizes,
}: {
  item: MediaItem;
  aspectRatio: string;
  sizes: string;
}) {
  return (
    <figure className="flex w-full flex-col gap-[8px]">
      <div
        className={`group relative ${aspectRatio} w-full overflow-hidden rounded-[16px] bg-[var(--color-surface)]/5 shadow-[var(--shadow-card)]`}
      >
        {isVideo(item) ? (
          <VideoPlayer src={item.url} poster={item.poster} alt={item.alt} />
        ) : (
          <Image
            src={item.url}
            alt={item.alt}
            fill
            sizes={sizes}
            className="object-cover"
          />
        )}
      </div>

      {item.caption && (
        <figcaption className="px-[2px] text-[15px] font-[400] leading-[1.4] tracking-[-0.01em] text-[var(--color-text)]">
          {item.caption}
        </figcaption>
      )}
    </figure>
  );
}

const FULL = { aspectRatio: "aspect-[16/9] md:aspect-[21/9]", sizes: "100vw" };
const HALF = {
  aspectRatio: "aspect-[16/10] md:aspect-[16/9]",
  sizes: "(min-width: 768px) 50vw, 100vw",
};

/** Full width, then a two-up batch of up to four, then full width. Repeats. */
function renderGallery(items: MediaItem[]) {
  const blocks: React.ReactNode[] = [];
  let index = 0;

  while (index < items.length) {
    blocks.push(<MediaCard key={`full-${index}`} item={items[index++]} {...FULL} />);

    const batch = items.slice(index, index + 4);
    if (batch.length > 0) {
      blocks.push(
        <div
          key={`grid-${index}`}
          className="grid grid-cols-1 gap-[22px] md:grid-cols-2"
        >
          {batch.map((item) => (
            <MediaCard key={item.url} item={item} {...HALF} />
          ))}
        </div>
      );
      index += batch.length;
    }
  }

  return blocks;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-[var(--color-background)] pb-[110px] text-[var(--color-text)]">
      <div className="mx-auto max-w-[1440px] px-[16px] py-[22px] md:px-[22px]">
        {/* Title, category and year live in the sticky header. The name stays
            as the page's h1 for screen readers and search engines only. Client
            and website sit to the right of the description, stacked; side by
            side on mobile. */}
        <div className="flex flex-col gap-[22px] pb-[58px] pt-0 md:flex-row md:items-start md:gap-[58px] md:pt-[22px]">
          <div className="md:max-w-[900px] md:flex-1">
            <h1 className="sr-only">{project.name}</h1>
            <p className="text-[20px] leading-[1.35] tracking-[-0.01em] text-[var(--color-text)] sm:text-[24px] md:text-[32px]">
              {project.description}
            </p>
          </div>

          <div className="grid w-full grid-cols-2 gap-[16px] md:ml-auto md:w-[220px] md:shrink-0 md:grid-cols-1 md:gap-[22px]">
            <div className="flex flex-col items-start md:items-end">
              <h2 className="text-[15px] font-[700] leading-[1.3] tracking-[-0.01em] md:text-right">
                Client
              </h2>
              <p className="mt-[12px] text-[15px] tracking-[-0.01em] text-[var(--color-text)] md:text-right">
                {project.client ?? "Independent"}
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end">
              <h2 className="text-[15px] font-[700] leading-[1.3] tracking-[-0.01em] md:text-right">
                Website
              </h2>
              {project.websiteUrl ? (
                <a
                  href={project.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-[12px] text-[15px] tracking-[-0.01em] underline underline-offset-[3px] transition-opacity duration-[100ms] hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2 md:text-right"
                >
                  {project.websiteLabel ??
                    project.websiteUrl
                      .replace(/^https?:\/\//, "")
                      .replace(/\/$/, "")}
                </a>
              ) : (
                <p className="mt-[12px] text-[15px] tracking-[-0.01em] text-[var(--color-text)] md:text-right">
                  Not published
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[22px]">{renderGallery(project.gallery)}</div>
      </div>
    </article>
  );
}