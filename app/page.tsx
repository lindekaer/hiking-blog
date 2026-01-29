import { getAllArticles } from "@/services/articleService";
import { jsonLdService } from "@/services/jsonLdService";
import ArticleCard from "@/app/components/ArticleCard";
import JsonLd from "@/app/components/JsonLd";

export default function Home() {
  const articles = getAllArticles().slice(0, 4);
  const jsonLd = jsonLdService.getHomePageJsonLd();

  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={jsonLd} />
      {/* Banner Image */}
      <div
        className="relative w-full h-64 md:h-96"
        style={{
          background: "linear-gradient(to right, #002855, #0353a4)",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center px-4">
            Hiking Adventures
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">
          Latest Articles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </main>
    </div>
  );
}
