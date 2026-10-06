"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import type { Project, GalleryItem } from "@/lib/projects";

const anthropicEase = [0.16, 1, 0.3, 1] as const;

const characterTransition: Transition = {
  duration: 0.35,
  ease: anthropicEase,
};

function RollingText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  return (
    <span className={`inline-flex flex-wrap overflow-hidden ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={text}
          className="inline-flex flex-wrap"
          initial={isFirstRender.current ? false : "initial"}
          animate="animate"
          exit="exit"
          transition={{
            staggerChildren: 0.015,
            delayChildren: delay,
          }}
        >
          {Array.from(text).map((char, index) => (
            <span
              key={`${char}-${index}`}
              className="relative inline-block overflow-hidden"
            >
              <motion.span
                className="inline-block whitespace-pre"
                variants={{
                  initial: { y: "100%", opacity: 0 },
                  animate: { y: "0%", opacity: 1 },
                  exit: { y: "-100%", opacity: 0 },
                }}
                transition={characterTransition}
              >
                {char}
              </motion.span>
            </span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function AdminHeader({
  statusMessage,
  saving,
  onSave,
  onCreateNew,
}: {
  statusMessage: string;
  saving: boolean;
  onSave: () => void;
  onCreateNew: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 w-full bg-[color-mix(in_srgb,var(--color-background)_85%,transparent)] backdrop-blur-md supports-[backdrop-filter]:bg-[color-mix(in_srgb,var(--color-background)_85%,transparent)] border-b border-[var(--color-primary)]/10">
      <div className="max-w-[1440px] mx-auto px-[16px] md:px-[22px] py-[22px] flex items-start justify-between min-h-[88px]">
        {/* Left: Identity Stack */}
        <div className="flex flex-col select-none">
          <Link
            href="/"
            className="text-[14px] font-[700] leading-[1.3] tracking-[-0.24px] text-[var(--color-text)] hover:opacity-70 transition-opacity duration-[100ms] [transition-timing-function:var(--ease-anthropic)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2 inline-flex items-center min-h-[44px] -my-[12px]"
          >
            <RollingText text="Admin" delay={0} />
          </Link>

          <div className="mt-[12px]">
            <RollingText
              text="Content Management System"
              delay={0.06}
              className="text-[12px] font-[400] leading-[1.4] tracking-[-0.24px] text-[var(--color-text)]"
            />
          </div>

          <div className="mt-[2px]">
            <RollingText
              text="2026"
              delay={0.12}
              className="text-[12px] font-[400] leading-[1.4] tracking-[-0.24px] text-[var(--color-text)]/60"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-[8px]">
          {statusMessage && (
            <span className="text-[12px] font-[400] leading-[1.4] tracking-[-0.24px] text-[var(--color-text)]/70 mr-[8px] hidden sm:inline">
              {statusMessage}
            </span>
          )}

          <button
            type="button"
            onClick={onCreateNew}
            className="min-h-[44px] px-[16px] rounded-[8px] bg-[var(--color-surface)]/5 hover:bg-[var(--color-surface)]/10 text-[var(--color-text)] text-[12px] font-[700] tracking-[-0.24px] transition-colors duration-[100ms] [transition-timing-function:var(--ease-anthropic)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2"
          >
            + New Project
          </button>

          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="min-h-[44px] px-[22px] rounded-[8px] bg-[var(--color-surface)] text-[var(--color-on-primary)] text-[12px] font-[700] tracking-[-0.24px] hover:opacity-85 transition-opacity duration-[100ms] [transition-timing-function:var(--ease-anthropic)] disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2 shadow-[var(--shadow-card)]"
          >
            {saving ? "Saving..." : "Save All"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeSlug, setActiveSlug] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data: Project[]) => {
        setProjects(data);
        if (data.length > 0) setActiveSlug(data[0].slug);
      });
  }, []);

  const activeProject = projects.find((p) => p.slug === activeSlug);

  const updateActiveProject = (updated: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p) => (p.slug === activeSlug ? { ...p, ...updated } : p))
    );
  };

  const handleFileUpload = async (
    file: File,
    onSuccess: (url: string) => void
  ) => {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    const data = await res.json();
    if (data.url) onSuccess(data.url);
  };

  const handleSave = async () => {
    setSaving(true);
    setStatusMessage("Saving...");
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projects),
      });
      if (res.ok) {
        setStatusMessage("Changes saved.");
      } else {
        setStatusMessage("Save failed.");
      }
    } catch {
      setStatusMessage("Save failed.");
    } finally {
      setSaving(false);
      setTimeout(() => setStatusMessage(""), 3000);
    }
  };

  const handleCreateNew = () => {
    const newSlug = `project-${Date.now()}`;
    const newProject: Project = {
      slug: newSlug,
      name: "Untitled Project",
      tagline: "Brief project tagline",
      timeline: "2026",
      role: "Product Design",
      discipline: "Interface Architecture",
      client: "Independent",
      websiteUrl: "https://example.com",
      summary: "Short overview of the project.",
      description:
        "Editorial headline statement displayed at the top of the detail page.",
      mediaType: "image",
      mediaUrl: "",
      gallery: [],
    };
    setProjects([newProject, ...projects]);
    setActiveSlug(newSlug);
  };

  const handleDelete = (slugToDelete: string) => {
    if (!confirm("Delete this project permanently?")) return;
    const remaining = projects.filter((p) => p.slug !== slugToDelete);
    setProjects(remaining);
    if (activeSlug === slugToDelete && remaining.length > 0) {
      setActiveSlug(remaining[0].slug);
    }
  };

  const addGalleryItem = () => {
    if (!activeProject) return;
    const newItem: GalleryItem = {
      url: "",
      type: "image",
      caption: `FIG 0${activeProject.gallery.length + 1}`,
    };
    updateActiveProject({ gallery: [...activeProject.gallery, newItem] });
  };

  const updateGalleryItem = (index: number, updated: Partial<GalleryItem>) => {
    if (!activeProject) return;
    const updatedGallery = activeProject.gallery.map((item, i) =>
      i === index ? { ...item, ...updated } : item
    );
    updateActiveProject({ gallery: updatedGallery });
  };

  const removeGalleryItem = (index: number) => {
    if (!activeProject) return;
    updateActiveProject({
      gallery: activeProject.gallery.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] pb-[72px]">
      <AdminHeader
        statusMessage={statusMessage}
        saving={saving}
        onSave={handleSave}
        onCreateNew={handleCreateNew}
      />

      <div className="max-w-[1440px] mx-auto px-[16px] md:px-[22px] py-[22px] grid grid-cols-1 md:grid-cols-12 gap-[22px] items-start">
        {/* Project Selector Sidebar */}
        <aside className="md:col-span-4 flex flex-col gap-[8px]">
          <span className="text-[12px] font-[700] uppercase tracking-[0.06em] text-[var(--color-text)]/50 pb-[8px]">
            Projects ({projects.length})
          </span>

          <div className="flex flex-col gap-[8px]">
            {projects.map((p) => {
              const isActive = p.slug === activeSlug;
              return (
                <div
                  key={p.slug}
                  onClick={() => setActiveSlug(p.slug)}
                  className={`group relative p-[16px] rounded-[16px] transition-all duration-[200ms] [transition-timing-function:var(--ease-anthropic)] cursor-pointer select-none ${
                    isActive
                      ? "bg-[var(--color-surface)] text-[var(--color-on-primary)] shadow-[var(--shadow-card)]"
                      : "bg-[var(--color-surface)]/[0.03] hover:bg-[var(--color-surface)]/[0.07] text-[var(--color-text)]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-[8px]">
                    <div className="flex flex-col min-w-0 pr-[8px]">
                      <span className="text-[14px] font-[700] leading-[1.3] tracking-[-0.24px] truncate">
                        {p.name || "Untitled"}
                      </span>
                      <span
                        className={`text-[12px] font-[400] leading-[1.4] tracking-[-0.24px] truncate mt-[2px] ${
                          isActive
                            ? "text-[var(--color-on-primary)]/75"
                            : "text-[var(--color-text)]/60"
                        }`}
                      >
                        /{p.slug}
                      </span>
                    </div>

                    <div className="flex items-center gap-[6px] shrink-0">
                      <span
                        className={`text-[12px] font-[400] tracking-[-0.24px] ${
                          isActive
                            ? "text-[var(--color-on-primary)]/75"
                            : "text-[var(--color-text)]/50"
                        }`}
                      >
                        {p.timeline}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(p.slug);
                        }}
                        aria-label={`Delete ${p.name}`}
                        className={`min-h-[44px] min-w-[44px] -mr-[12px] -my-[12px] inline-flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-[100ms] ${
                          isActive
                            ? "text-[var(--color-on-primary)]/75 hover:text-[var(--color-on-primary)]"
                            : "text-[var(--color-text)]/50 hover:text-red-600"
                        }`}
                      >
                        <svg
                          className="w-[14px] h-[14px] stroke-current"
                          viewBox="0 0 24 24"
                          fill="none"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Project Edit Workspace */}
        {activeProject ? (
          <main className="md:col-span-8 flex flex-col gap-[22px] p-[22px] rounded-[16px] bg-[var(--color-surface)]/[0.02] shadow-[var(--shadow-card)]">
            {/* Title & Slug */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
              <div className="flex flex-col items-start">
                <label className="text-[14px] font-[700] leading-[1.3] tracking-[-0.24px] mb-[8px]">
                  Project Name
                </label>
                <input
                  type="text"
                  value={activeProject.name}
                  onChange={(e) => updateActiveProject({ name: e.target.value })}
                  className="w-full text-[12px] font-[400] leading-[1.4] tracking-[-0.24px] px-[12px] py-[10px] rounded-[8px] bg-transparent border border-[var(--color-primary)]/15 focus:border-[var(--color-primary)] focus-visible:outline-none"
                />
              </div>

              <div className="flex flex-col items-start">
                <label className="text-[14px] font-[700] leading-[1.3] tracking-[-0.24px] mb-[8px]">
                  Slug Path
                </label>
                <input
                  type="text"
                  value={activeProject.slug}
                  onChange={(e) => updateActiveProject({ slug: e.target.value })}
                  className="w-full text-[12px] font-[400] leading-[1.4] tracking-[-0.24px] px-[12px] py-[10px] rounded-[8px] bg-transparent border border-[var(--color-primary)]/15 focus:border-[var(--color-primary)] focus-visible:outline-none"
                />
              </div>
            </div>

            {/* Tagline & Year */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
              <div className="flex flex-col items-start">
                <label className="text-[14px] font-[700] leading-[1.3] tracking-[-0.24px] mb-[8px]">
                  Card Tagline
                </label>
                <input
                  type="text"
                  value={activeProject.tagline}
                  onChange={(e) => updateActiveProject({ tagline: e.target.value })}
                  className="w-full text-[12px] font-[400] leading-[1.4] tracking-[-0.24px] px-[12px] py-[10px] rounded-[8px] bg-transparent border border-[var(--color-primary)]/15 focus:border-[var(--color-primary)] focus-visible:outline-none"
                />
              </div>

              <div className="flex flex-col items-start">
                <label className="text-[14px] font-[700] leading-[1.3] tracking-[-0.24px] mb-[8px]">
                  Timeline
                </label>
                <input
                  type="text"
                  value={activeProject.timeline}
                  onChange={(e) => updateActiveProject({ timeline: e.target.value })}
                  className="w-full text-[12px] font-[400] leading-[1.4] tracking-[-0.24px] px-[12px] py-[10px] rounded-[8px] bg-transparent border border-[var(--color-primary)]/15 focus:border-[var(--color-primary)] focus-visible:outline-none"
                />
              </div>
            </div>

            {/* Metadata Spec Bar Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[16px] pt-[8px]">
              <div className="flex flex-col items-start">
                <label className="text-[14px] font-[700] leading-[1.3] tracking-[-0.24px] mb-[8px]">
                  Client
                </label>
                <input
                  type="text"
                  value={activeProject.client || ""}
                  onChange={(e) => updateActiveProject({ client: e.target.value })}
                  className="w-full text-[12px] font-[400] leading-[1.4] tracking-[-0.24px] px-[12px] py-[10px] rounded-[8px] bg-transparent border border-[var(--color-primary)]/15 focus:border-[var(--color-primary)] focus-visible:outline-none"
                />
              </div>

              <div className="flex flex-col items-start">
                <label className="text-[14px] font-[700] leading-[1.3] tracking-[-0.24px] mb-[8px]">
                  Website URL
                </label>
                <input
                  type="text"
                  value={activeProject.websiteUrl || ""}
                  onChange={(e) => updateActiveProject({ websiteUrl: e.target.value })}
                  className="w-full text-[12px] font-[400] leading-[1.4] tracking-[-0.24px] px-[12px] py-[10px] rounded-[8px] bg-transparent border border-[var(--color-primary)]/15 focus:border-[var(--color-primary)] focus-visible:outline-none"
                />
              </div>

              <div className="flex flex-col items-start">
                <label className="text-[14px] font-[700] leading-[1.3] tracking-[-0.24px] mb-[8px]">
                  Role
                </label>
                <input
                  type="text"
                  value={activeProject.role}
                  onChange={(e) => updateActiveProject({ role: e.target.value })}
                  className="w-full text-[12px] font-[400] leading-[1.4] tracking-[-0.24px] px-[12px] py-[10px] rounded-[8px] bg-transparent border border-[var(--color-primary)]/15 focus:border-[var(--color-primary)] focus-visible:outline-none"
                />
              </div>

              <div className="flex flex-col items-start">
                <label className="text-[14px] font-[700] leading-[1.3] tracking-[-0.24px] mb-[8px]">
                  Discipline
                </label>
                <input
                  type="text"
                  value={activeProject.discipline || ""}
                  onChange={(e) => updateActiveProject({ discipline: e.target.value })}
                  className="w-full text-[12px] font-[400] leading-[1.4] tracking-[-0.24px] px-[12px] py-[10px] rounded-[8px] bg-transparent border border-[var(--color-primary)]/15 focus:border-[var(--color-primary)] focus-visible:outline-none"
                />
              </div>
            </div>

            {/* Headline Statement */}
            <div className="flex flex-col items-start pt-[8px]">
              <label className="text-[14px] font-[700] leading-[1.3] tracking-[-0.24px] mb-[8px]">
                Headline Statement
              </label>
              <textarea
                rows={3}
                value={activeProject.description}
                onChange={(e) => updateActiveProject({ description: e.target.value })}
                className="w-full text-[12px] font-[400] leading-[1.4] tracking-[-0.24px] p-[12px] rounded-[8px] bg-transparent border border-[var(--color-primary)]/15 focus:border-[var(--color-primary)] focus-visible:outline-none resize-y"
              />
            </div>

            {/* Home Grid Cover Media */}
            <div className="pt-[16px] border-t border-[var(--color-primary)]/10">
              <span className="text-[14px] font-[700] leading-[1.3] tracking-[-0.24px] block mb-[12px]">
                Homepage Cover Card
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-[12px] items-center">
                <div className="sm:col-span-3">
                  <select
                    value={activeProject.mediaType}
                    onChange={(e) =>
                      updateActiveProject({
                        mediaType: e.target.value as "image" | "video",
                      })
                    }
                    className="w-full text-[12px] font-[400] px-[12px] py-[10px] rounded-[8px] bg-transparent border border-[var(--color-primary)]/15 focus-visible:outline-none"
                  >
                    <option value="image">Image</option>
                    <option value="video">Looping Video</option>
                  </select>
                </div>

                <div className="sm:col-span-6">
                  <input
                    type="text"
                    value={activeProject.mediaUrl}
                    onChange={(e) => updateActiveProject({ mediaUrl: e.target.value })}
                    placeholder="Asset URL (or choose file)"
                    className="w-full text-[12px] font-[400] px-[12px] py-[10px] rounded-[8px] bg-transparent border border-[var(--color-primary)]/15 focus-visible:outline-none"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="min-h-[44px] px-[14px] rounded-[8px] bg-[var(--color-surface)] text-[var(--color-on-primary)] text-[12px] font-[700] inline-flex items-center justify-center cursor-pointer hover:opacity-85 transition-opacity w-full text-center">
                    Upload
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleFileUpload(file, (url) =>
                            updateActiveProject({ mediaUrl: url })
                          );
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Editorial Gallery Sequence */}
            <div className="pt-[16px] border-t border-[var(--color-primary)]/10">
              <div className="flex items-center justify-between mb-[16px]">
                <div>
                  <span className="text-[14px] font-[700] leading-[1.3] tracking-[-0.24px] block">
                    Editorial Gallery Sequence
                  </span>
                  <span className="text-[12px] font-[400] text-[var(--color-text)]/60">
                    Rhythm sequence: 1 Full Width → 4 Small (2×2) → 1 Full Width.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={addGalleryItem}
                  className="min-h-[44px] px-[16px] rounded-[8px] bg-[var(--color-surface)]/5 hover:bg-[var(--color-surface)]/10 text-[12px] font-[700] tracking-[-0.24px] transition-colors"
                >
                  + Add Slide
                </button>
              </div>

              <div className="space-y-[12px]">
                {activeProject.gallery.map((item, idx) => {
                  const isFullWidth = idx === 0 || idx === 5 || idx % 6 === 0;
                  return (
                    <div
                      key={idx}
                      className="p-[16px] rounded-[16px] bg-[var(--color-background)] shadow-[var(--shadow-card)] flex flex-col sm:flex-row sm:items-center gap-[12px]"
                    >
                      <div className="flex items-center gap-[8px] min-w-[90px] shrink-0">
                        <span className="text-[12px] font-[700] text-[var(--color-text)]/40">
                          #{idx + 1}
                        </span>
                        <span className="text-[11px] font-[400] px-[6px] py-[2px] rounded-[4px] bg-[var(--color-surface)]/5 text-[var(--color-text)]/70">
                          {isFullWidth ? "Full (21:9)" : "Grid (16:9)"}
                        </span>
                      </div>

                      <div className="w-[100px] shrink-0">
                        <select
                          value={item.type}
                          onChange={(e) =>
                            updateGalleryItem(idx, {
                              type: e.target.value as "image" | "video",
                            })
                          }
                          className="w-full text-[12px] font-[400] px-[8px] py-[6px] rounded-[6px] bg-transparent border border-[var(--color-primary)]/15 focus-visible:outline-none"
                        >
                          <option value="image">Image</option>
                          <option value="video">Video</option>
                        </select>
                      </div>

                      <div className="flex-1 flex gap-[8px]">
                        <input
                          type="text"
                          value={item.url}
                          onChange={(e) => updateGalleryItem(idx, { url: e.target.value })}
                          placeholder="Asset URL"
                          className="flex-1 text-[12px] font-[400] px-[10px] py-[6px] rounded-[6px] bg-transparent border border-[var(--color-primary)]/15 focus-visible:outline-none"
                        />
                        <label className="px-[10px] py-[6px] rounded-[6px] bg-[var(--color-surface)]/10 hover:bg-[var(--color-surface)]/20 text-[11px] font-[700] inline-flex items-center cursor-pointer shrink-0">
                          Upload
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleFileUpload(file, (url) =>
                                  updateGalleryItem(idx, { url })
                                );
                              }
                            }}
                          />
                        </label>
                      </div>

                      <div className="sm:w-[180px] shrink-0">
                        <input
                          type="text"
                          value={item.caption || ""}
                          onChange={(e) => updateGalleryItem(idx, { caption: e.target.value })}
                          placeholder="Caption (e.g. FIG 01)"
                          className="w-full text-[12px] font-[400] px-[10px] py-[6px] rounded-[6px] bg-transparent border border-[var(--color-primary)]/15 focus-visible:outline-none"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => removeGalleryItem(idx)}
                        aria-label={`Remove slide ${idx + 1}`}
                        className="min-h-[44px] min-w-[44px] -my-[10px] inline-flex items-center justify-center text-[var(--color-text)]/40 hover:text-red-600 transition-colors shrink-0"
                      >
                        <svg
                          className="w-[16px] h-[16px] stroke-current"
                          viewBox="0 0 24 24"
                          fill="none"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </main>
        ) : null}
      </div>
    </div>
  );
}