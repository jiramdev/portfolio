import { notFound } from "next/navigation";
import Image from "next/image";
import { getProjects, getProjectBySlug, type GalleryItem } from "@/lib/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

function MediaCard({
  item,
  aspectRatio,
}: {
  item: GalleryItem;
  aspectRatio: string;
}) {
  return (
    <figure className="flex flex-col gap-[8px] w-full">
      <div
        className={`relative w-full ${aspectRatio} rounded-[16px] overflow-hidden bg-[var(--color-surface)]/5 shadow-[var(--shadow-card)]`}
      >
        {item.type === "video" ? (
          <video
            src={item.url}
            poster={item.poster}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={item.url}
            alt={item.caption ?? "Project media"}
            fill
            className="object-cover"
            priority={false}
          />
        )}
      </div>

      {item.caption && (
        <figcaption className="text-[12px] font-[400] leading-[1.4] tracking-[-0.24px] text-[var(--color-text)]/60 px-[2px]">
          {item.caption}
        </figcaption>
      )}
    </figure>
  );
}

function renderGalleryRhythm(items: GalleryItem[]) {
  const elements: React.ReactNode[] = [];
  let index = 0;
  let cycle = 0;

  while (index < items.length) {
    if (index < items.length) {
      elements.push(
        <div key={`full-top-${cycle}-${index}`} className="w-full">
          <MediaCard
            item={items[index]}
            aspectRatio="aspect-[16/9] md:aspect-[21/9]"
          />
        </div>
      );
      index += 1;
    }

    if (index < items.length) {
      const fourBatch = items.slice(index, index + 4);
      if (fourBatch.length > 0) {
        elements.push(
          <div
            key={`two-by-two-${cycle}-${index}`}
            className="grid grid-cols-1 md:grid-cols-2 gap-[22px]"
          >
            {fourBatch.map((item, itemIdx) => (
              <MediaCard
                key={`sub-${cycle}-${index + itemIdx}`}
                item={item}
                aspectRatio="aspect-[16/10] md:aspect-[16/9]"
              />
            ))}
          </div>
        );
        index += fourBatch.length;
      }
    }

    if (index < items.length) {
      elements.push(
        <div key={`full-bottom-${cycle}-${index}`} className="w-full">
          <MediaCard
            item={items[index]}
            aspectRatio="aspect-[16/9] md:aspect-[21/9]"
          />
        </div>
      );
      index += 1;
    }

    cycle += 1;
  }

  return elements;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const gallery = project.gallery ?? [];
  const primaryDiscipline = project.discipline ?? project.role;

  return (
    <article className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] pb-[72px]">
      <div className="max-w-[1440px] mx-auto px-[16px] md:px-[22px] py-[22px]">
        {/* 1. Headline Statement */}
        <div className="max-w-[1080px] pt-[22px] pb-[58px]">
          <h1 className="text-[24px] sm:text-[30px] md:text-[38px] font-[500] leading-[1.2] tracking-[-0.4px] text-[var(--color-text)]">
            {project.description || project.summary}
          </h1>
        </div>

        {/* 2. Metadata Spec Bar */}
        <div className="pb-[58px] grid grid-cols-2 sm:grid-cols-4 gap-[22px] items-start">
          <div className="flex flex-col items-start">
            <span className="text-[14px] font-[700] leading-[1.3] tracking-[-0.24px] text-[var(--color-text)]">
              Client
            </span>
            <span className="text-[12px] font-[400] leading-[1.4] tracking-[-0.24px] text-[var(--color-text)] mt-[12px] truncate">
              {project.client ?? "Independent"}
            </span>
          </div>

          <div className="flex flex-col items-start">
            <span className="text-[14px] font-[700] leading-[1.3] tracking-[-0.24px] text-[var(--color-text)]">
              Website
            </span>
            {project.websiteUrl ? (
              <div className="inline-flex items-center min-h-[44px] -my-[14px] mt-[0px]">
                <a
                  href={project.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit inline-block text-[12px] font-[400] leading-[1.4] tracking-[-0.24px] text-[var(--color-text)] underline underline-offset-[3px] decoration-[var(--color-text)] hover:opacity-70 transition-opacity duration-[100ms] [transition-timing-function:var(--ease-anthropic)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2 rounded-[2px]"
                >
                  {project.websiteUrl.replace(/^https?:\/\//, "")}
                </a>
              </div>
            ) : (
              <span className="text-[12px] font-[400] leading-[1.4] tracking-[-0.24px] text-[var(--color-text)]/50 mt-[12px]">
                N/A
              </span>
            )}
          </div>

          <div className="flex flex-col items-start">
            <span className="text-[14px] font-[700] leading-[1.3] tracking-[-0.24px] text-[var(--color-text)]">
              Role
            </span>
            <span className="text-[12px] font-[400] leading-[1.4] tracking-[-0.24px] text-[var(--color-text)] mt-[12px] truncate">
              {project.role}
            </span>
          </div>

          <div className="flex flex-col items-start">
            <span className="text-[14px] font-[700] leading-[1.3] tracking-[-0.24px] text-[var(--color-text)]">
              Discipline
            </span>
            <span className="text-[12px] font-[400] leading-[1.4] tracking-[-0.24px] text-[var(--color-text)] mt-[12px] truncate">
              {primaryDiscipline}
            </span>
          </div>
        </div>

        {/* 3. Pure Curated Image & Video Gallery */}
        <div className="space-y-[22px]">
          {renderGalleryRhythm(gallery)}
        </div>
      </div>
    </article>
  );
}