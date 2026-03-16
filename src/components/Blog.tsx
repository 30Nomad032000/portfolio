import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import SectionMarker from "./SectionMarker";
import { getLatestPosts } from "@/lib/blog";

export default function Blog() {
  const posts = getLatestPosts(3);

  if (posts.length === 0) return null;

  return (
    <section className="blog-section" id="writing">
      <div className="blog-header-block">
        <SectionMarker current={5} total={7} category="Thoughts" sublabel="Writing" />
        <h2>
          From the <span className="accent">Terminal.</span>
        </h2>
        <p className="blog-intro">
          Deep dives into performance, architecture, and the engineering
          decisions behind production systems.
        </p>
      </div>

      <div className="blog-grid">
        {posts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="blog-card"
          >
            <div className="blog-card-index">
              <span className="blog-card-num">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="blog-card-content">
              <div className="blog-card-meta">
                <time className="blog-card-date">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
                <span className="blog-card-sep">/</span>
                <span className="blog-card-time">
                  <Clock size={11} strokeWidth={1.8} />
                  {post.readingTime}
                </span>
              </div>
              <h3 className="blog-card-title">{post.title}</h3>
              <p className="blog-card-excerpt">{post.excerpt}</p>
              <div className="blog-card-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="blog-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="blog-card-arrow">
                Read post <ArrowRight size={14} strokeWidth={1.8} />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="blog-footer-cta">
        <Link href="/blog" className="blog-cta-btn">
          All posts <span className="arrow">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
