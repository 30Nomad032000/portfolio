import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} — Ebin John Joseph`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      url: `https://ebin.pro/blog/${slug}`,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="blog-page">
      <nav className="blog-page-nav">
        <Link href="/blog" className="blog-back-link">
          <ArrowLeft size={16} strokeWidth={1.8} />
          <span>All posts</span>
        </Link>
      </nav>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            datePublished: post.date,
            author: {
              "@type": "Person",
              name: "Ebin John Joseph",
              url: "https://ebin.pro",
            },
            description: post.excerpt,
            url: `https://ebin.pro/blog/${slug}`,
            keywords: post.tags,
          }),
        }}
      />

      <article className="blog-post">
        <header className="blog-post-header">
          <div className="blog-post-meta">
            <time>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span className="blog-list-sep">/</span>
            <span className="blog-list-time">
              <Clock size={12} strokeWidth={1.8} />
              {post.readingTime}
            </span>
          </div>
          <h1 className="blog-post-title">{post.title}</h1>
          <div className="blog-post-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="blog-tag">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div
          className="blog-post-body"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer className="blog-post-footer">
          <Link href="/blog" className="blog-cta-btn">
            <ArrowLeft size={14} strokeWidth={1.8} />
            Back to all posts
          </Link>
        </footer>
      </article>
    </div>
  );
}
