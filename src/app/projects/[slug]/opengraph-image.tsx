import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/lib/projects";

export const alt = "Project cover";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#faf9f5",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: "24px", color: "#141413", opacity: 0.7 }}>
          {project?.tagline}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h1
            style={{
              fontSize: "72px",
              lineHeight: 1.05,
              fontWeight: 700,
              color: "#141413",
              margin: 0,
              letterSpacing: "-2px",
            }}
          >
            {project?.name}
          </h1>
          <p style={{ fontSize: "24px", color: "#141413", opacity: 0.75, margin: 0 }}>
            {[project?.role, project?.timeline].filter(Boolean).join(" · ")}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "20px",
            color: "#141413",
            opacity: 0.6,
            borderTop: "1px solid rgba(20, 20, 19, 0.15)",
            paddingTop: "24px",
          }}
        >
          <span>Jiram</span>
          <span>Frontend Developer &amp; UI/UX Designer</span>
        </div>
      </div>
    ),
    { ...size }
  );
}