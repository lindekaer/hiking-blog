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
  author?: {
    name: string;
    avatar?: string;
  };
}

const articlesDirectory = path.join(process.cwd(), "articles");

export function getAllArticles(): Article[] {
  const fileNames = fs.readdirSync(articlesDirectory);
  const articles = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      return getArticleBySlug(slug);
    })
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return articles;
}

function stripFirstH1(content: string): string {
  // Remove the first h1 heading (with optional leading/trailing whitespace)
  return content.replace(/^#\s+.+$/m, "").trimStart();
}

export function getArticleBySlug(slug: string): Article {
  const fullPath = path.join(articlesDirectory, `${slug}.md`);
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
    author: data.author
      ? {
          name: data.author.name,
          avatar: data.author.avatar,
        }
      : undefined,
  };
}

export function getAllSlugs(): string[] {
  const fileNames = fs.readdirSync(articlesDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

export function getFeaturedArticles(limit: number = 6): Article[] {
  const allArticles = getAllArticles();
  return allArticles.filter((article) => article.featured).slice(0, limit);
}
