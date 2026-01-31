import { getAllArticles } from "@/services/articleService";
import { jsonLdService } from "@/services/jsonLdService";
import Breadcrumb from "@/app/components/Breadcrumb";
import JsonLd from "@/app/components/JsonLd";
import ArticlesList from "./ArticlesList";

interface PageProps {
  searchParams: Promise<{ tag?: string; query?: string }>;
}

export default async function ArticlesPage({ searchParams }: PageProps) {
  const articles = getAllArticles();
  const { tag, query } = await searchParams;
  const initialSelectedTags = tag ? [tag] : [];
  const initialSearchQuery = query ?? "";
  const jsonLd = jsonLdService.getArticlesPageJsonLd(articles.length);

  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={jsonLd} />
      <main className="flex-1 max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <Breadcrumb />
        <h1 className="text-4xl font-bold mb-8 text-gray-900">
          Browse everything I've written
        </h1>
        <ArticlesList
          articles={articles}
          initialSelectedTags={initialSelectedTags}
          initialSearchQuery={initialSearchQuery}
        />
      </main>
    </div>
  );
}
