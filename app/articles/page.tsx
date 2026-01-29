import { getAllArticles } from "@/services/articleService";
import Breadcrumb from "@/app/components/Breadcrumb";
import ArticlesList from "./ArticlesList";

interface PageProps {
  searchParams: Promise<{ tag?: string }>;
}

export default async function ArticlesPage({ searchParams }: PageProps) {
  const articles = getAllArticles();
  const { tag } = await searchParams;
  const initialSelectedTags = tag ? [tag] : [];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <Breadcrumb />
        <h1 className="text-4xl font-bold mb-8 text-gray-900">
          Browse everything I've written
        </h1>
        <ArticlesList articles={articles} initialSelectedTags={initialSelectedTags} />
      </main>
    </div>
  );
}
