import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Article {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  featured?: boolean;
  thumbnail?: string;
  tags?: string[];
  author?: string;
  /** True when the source file is .mdx (use MDX renderer). */
  isMdx?: boolean;
}

const articlesDirectory = path.join(process.cwd(), "articles");

export function getAllArticles(): Article[] {
  const slugs = getAllSlugs();
  return slugs
    .map((slug) => getArticleBySlug(slug))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function stripFirstH1(content: string): string {
  // Remove the first h1 heading (with optional leading/trailing whitespace)
  return content.replace(/^#\s+.+$/m, "").trimStart();
}

export function getArticleBySlug(slug: string): Article {
  const mdxPath = path.join(articlesDirectory, `${slug}.mdx`);
  const mdPath = path.join(articlesDirectory, `${slug}.md`);
  const isMdx = fs.existsSync(mdxPath);
  const fullPath = isMdx ? mdxPath : mdPath;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // Strip the first h1 heading since we render the title from metadata
  const processedContent = stripFirstH1(content);

  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    content: processedContent,
    featured: data.featured || false,
    thumbnail: data.thumbnail,
    tags: data.tags || [],
    author:
      typeof data.author === "string"
        ? data.author
        : data.author?.name
          ? data.author.name
          : undefined,
    isMdx: isMdx || undefined,
  };
}

export function getAllSlugs(): string[] {
  const fileNames = fs.readdirSync(articlesDirectory);
  const mdSlugs = new Set(
    fileNames
      .filter((f) => f.endsWith(".md") && !f.endsWith(".mdx"))
      .map((f) => f.replace(/\.md$/, ""))
  );
  const mdxSlugs = fileNames
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
  // Prefer .mdx over .md when both exist
  mdxSlugs.forEach((s) => mdSlugs.add(s));
  return Array.from(mdSlugs);
}

export function getFeaturedArticles(limit: number = 6): Article[] {
  const allArticles = getAllArticles();
  return allArticles.filter((article) => article.featured).slice(0, limit);
}

export interface TagWithCount {
  tag: string;
  count: number;
}

export function getTagCloud(): TagWithCount[] {
  const allArticles = getAllArticles();
  const tagCounts = new Map<string, number>();
  allArticles.forEach((article) => {
    article.tags?.forEach((tag) => {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    });
  });
  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}
