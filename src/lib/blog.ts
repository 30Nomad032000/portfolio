import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked, type Tokens } from "marked";
import { createHighlighter, type Highlighter } from "shiki";
import { diagramToSvg } from "./diagram-svg";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
  content: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
}

const BLOG_DIR = path.join(process.cwd(), "content/blog");

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["vitesse-dark"],
      langs: ["typescript", "tsx", "javascript", "bash", "json", "css", "html"],
    });
  }
  return highlighterPromise;
}

function calculateReadingTime(content: string): string {
  const words = content.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 230));
  return `${minutes} min read`;
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  const posts = files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
      const { data, content } = matter(raw);

      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        excerpt: data.excerpt ?? "",
        tags: data.tags ?? [],
        readingTime: calculateReadingTime(content),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const highlighter = await getHighlighter();

  const renderer = new marked.Renderer();

  renderer.code = ({ text, lang }: Tokens.Code) => {
    const escaped = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Detect ASCII diagrams — box-drawing characters, arrows, pipes
    const hasBoxChars = /[┌┐└┘├┤┬┴┼─│▶◀▼▲═║╔╗╚╝╠╣╦╩╬╭╮╰╯↑↓←→↗↘↙↖]/.test(text);
    if (!lang && hasBoxChars) {
      return diagramToSvg(text);
    }

    const language = lang || "text";
    try {
      const loadedLangs = highlighter.getLoadedLanguages();
      if (loadedLangs.includes(language as never)) {
        return highlighter.codeToHtml(text, {
          lang: language,
          theme: "vitesse-dark",
        });
      }
    } catch {
      // fall through to plain rendering
    }
    return `<pre class="shiki"><code>${escaped}</code></pre>`;
  };

  const html = marked.parse(content, { renderer, async: false }) as string;

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    tags: data.tags ?? [],
    readingTime: calculateReadingTime(content),
    content: html,
  };
}

export function getLatestPosts(count: number = 3): BlogPostMeta[] {
  return getAllPosts().slice(0, count);
}
