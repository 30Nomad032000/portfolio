import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";

export const runtime = "nodejs";
export const alt = "Blog post — Ebin John Joseph";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return new ImageResponse(<div style={{ display: "flex", background: "#0c0c0c", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 32 }}>Post not found</div>, { ...size });
  }

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

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
        {/* Grid dots */}
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

        {/* Accent glow */}
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

        {/* Content */}
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
          {/* Top: domain + article label */}
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
                ebin.pro/blog
              </span>
            </div>
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
              Article
            </div>
          </div>

          {/* Center: post title */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <span
              style={{
                fontFamily: "Space Mono",
                fontSize: "16px",
                color: "rgba(250, 248, 245, 0.4)",
              }}
            >
              {formattedDate}
            </span>
            <span
              style={{
                fontFamily: "Space Grotesk",
                fontSize: post.title.length > 60 ? "42px" : "52px",
                fontWeight: 700,
                color: "#FAF8F5",
                letterSpacing: "-2px",
                lineHeight: 1.1,
                maxWidth: "900px",
              }}
            >
              {post.title}
            </span>
          </div>

          {/* Bottom: name + tags */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span
                style={{
                  fontFamily: "Space Grotesk",
                  fontSize: "24px",
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
                  fontSize: "14px",
                  color: "rgba(250, 248, 245, 0.4)",
                }}
              >
                {post.readingTime}
              </span>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {post.tags.slice(0, 4).map((tag) => (
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
