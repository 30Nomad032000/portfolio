import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Writing — Ebin John Joseph",
  description:
    "Deep dives into frontend performance, system architecture, and engineering decisions behind production systems.",
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    title: "Writing — Ebin John Joseph",
    description:
      "Deep dives into frontend performance, system architecture, and engineering decisions.",
    type: "website",
    url: "https://ebin.pro/blog",
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="blog-page">
      <nav className="blog-page-nav">
        <Link href="/" className="blog-back-link">
          <ArrowLeft size={16} strokeWidth={1.8} />
          <span>EJ</span>
        </Link>
      </nav>

      <header className="blog-page-header">
        <p className="blog-page-label">// Writing</p>
        <h1>
          From the <span className="accent">Terminal.</span>
        </h1>
        <p className="blog-page-desc">
          Performance deep dives, architecture decisions, and things I learned
          building production systems.
        </p>
      </header>

      <div className="blog-list">
        {posts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="blog-list-item"
          >
            <div className="blog-list-num">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="blog-list-content">
              <div className="blog-list-meta">
                <time>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
                <span className="blog-list-sep">/</span>
                <span className="blog-list-time">
                  <Clock size={11} strokeWidth={1.8} />
                  {post.readingTime}
                </span>
              </div>
              <h2 className="blog-list-title">{post.title}</h2>
              <p className="blog-list-excerpt">{post.excerpt}</p>
              <div className="blog-list-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="blog-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="blog-empty">
          <p>No posts yet. Check back soon.</p>
        </div>
      )}
    </div>
  );
}
