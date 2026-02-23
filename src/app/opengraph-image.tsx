import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ebin John Joseph — Full-Stack Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [spaceGrotesk, dmSerif, spaceMono] = await Promise.all([
    fetch("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap")
      .then((res) => res.text())
      .then((css) => {
        const url = css.match(/src: url\((.+?)\)/)?.[1];
        return url ? fetch(url).then((r) => r.arrayBuffer()) : null;
      }),
    fetch("https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@1&display=swap")
      .then((res) => res.text())
      .then((css) => {
        const url = css.match(/src: url\((.+?)\)/)?.[1];
        return url ? fetch(url).then((r) => r.arrayBuffer()) : null;
      }),
    fetch("https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap")
      .then((res) => res.text())
      .then((css) => {
        const url = css.match(/src: url\((.+?)\)/)?.[1];
        return url ? fetch(url).then((r) => r.arrayBuffer()) : null;
      }),
  ]);

  const fonts: { name: string; data: ArrayBuffer; style?: "italic" | "normal"; weight?: 400 | 700 }[] = [];
  if (spaceGrotesk) fonts.push({ name: "Space Grotesk", data: spaceGrotesk, weight: 700 });
  if (dmSerif) fonts.push({ name: "DM Serif Display", data: dmSerif, style: "italic", weight: 400 });
  if (spaceMono) fonts.push({ name: "Space Mono", data: spaceMono, weight: 400 });

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#0c0c0c",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid dots */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Accent glow — bottom left */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: "-120px",
            left: "-80px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(230, 59, 46, 0.08) 0%, transparent 70%)",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "56px 72px",
            position: "relative",
          }}
        >
          {/* Top row: domain + status */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#4ade80",
                  boxShadow: "0 0 8px rgba(74, 222, 128, 0.5)",
                }}
              />
              <span
                style={{
                  fontFamily: "Space Mono",
                  fontSize: "16px",
                  color: "rgba(250, 248, 245, 0.4)",
                  letterSpacing: "0.05em",
                }}
              >
                ebin.pro
              </span>
            </div>

            {/* Label */}
            <div
              style={{
                display: "flex",
                fontFamily: "Space Mono",
                fontSize: "13px",
                color: "#E63B2E",
                letterSpacing: "0.15em",
                textTransform: "uppercase" as const,
              }}
            >
              Developer · Engineer · Builder
            </div>
          </div>

          {/* Center: Hero text */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0px",
            }}
          >
            <span
              style={{
                fontFamily: "Space Grotesk",
                fontSize: "82px",
                fontWeight: 700,
                color: "#FAF8F5",
                letterSpacing: "-3px",
                lineHeight: 1.05,
              }}
            >
              Build the
            </span>
            <span
              style={{
                fontFamily: "DM Serif Display",
                fontSize: "120px",
                fontStyle: "italic",
                color: "#E63B2E",
                letterSpacing: "-3px",
                lineHeight: 0.95,
                marginTop: "-4px",
              }}
            >
              System.
            </span>
          </div>

          {/* Bottom row */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            {/* Name + role */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span
                style={{
                  fontFamily: "Space Grotesk",
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#FAF8F5",
                  letterSpacing: "-0.5px",
                }}
              >
                Ebin John Joseph
              </span>
              <span
                style={{
                  fontFamily: "Space Mono",
                  fontSize: "15px",
                  color: "rgba(250, 248, 245, 0.4)",
                }}
              >
                Full-Stack Engineer
              </span>
            </div>

            {/* Tech pills */}
            <div style={{ display: "flex", gap: "8px" }}>
              {["React", "Next.js", "TypeScript", "Node.js"].map((tag) => (
                <div
                  key={tag}
                  style={{
                    padding: "6px 16px",
                    borderRadius: "999px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    fontFamily: "Space Mono",
                    color: "rgba(250, 248, 245, 0.35)",
                    fontSize: "13px",
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Border frame */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            inset: "0",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            pointerEvents: "none",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts,
    }
  );
}
