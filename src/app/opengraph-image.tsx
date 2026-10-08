import { ImageResponse } from "next/og";
import { EMAIL, SITE_DESCRIPTION } from "@/lib/site";

export const alt = "Jiram — Frontend Developer & UI/UX Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              backgroundColor: "#141413",
              color: "#faf9f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              fontWeight: 700,
            }}
          >
            J
          </div>
          <span style={{ fontSize: "24px", color: "#141413", fontWeight: 700 }}>
            Jiram
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h1
            style={{
              fontSize: "58px",
              lineHeight: 1.1,
              fontWeight: 700,
              color: "#141413",
              margin: 0,
              letterSpacing: "-1px",
            }}
          >
            Frontend Developer &<br />UI/UX Designer
          </h1>
          <p
            style={{
              fontSize: "20px",
              color: "#141413",
              opacity: 0.7,
              margin: 0,
            }}
          >
            {SITE_DESCRIPTION}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "16px",
            color: "#141413",
            opacity: 0.5,
            borderTop: "1px solid rgba(20, 20, 19, 0.15)",
            paddingTop: "24px",
          }}
        >
          <span>Available for select projects</span>
          <span>{EMAIL}</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}