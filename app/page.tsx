import Link from "next/link";
import Image from "next/image";
import { getAllArticles } from "@/services/articleService";

export default function Home() {
  const articles = getAllArticles();

  return (
    <div className="min-h-screen flex flex-col">
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

        <div className="space-y-8">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="border-b border-gray-200 pb-8 last:border-b-0"
            >
              <Link href={`/articles/${article.slug}`} className="block group">
                <div className="flex gap-6">
                  {article.thumbnail && (
                    <div className="flex-shrink-0 w-48 h-32 relative rounded-lg overflow-hidden">
                      <Image
                        src={article.thumbnail}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2 text-gray-900 transition-colors group-hover:text-[#002855]">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-4 mb-3 flex-wrap">
                      {article.author && (
                        <div className="flex items-center gap-2">
                          {article.author.avatar ? (
                            <div className="w-8 h-8 relative rounded-full overflow-hidden">
                              <Image
                                src={article.author.avatar}
                                alt={article.author.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                              <span className="text-gray-600 text-xs font-medium">
                                {article.author.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <span className="text-sm text-gray-700 font-medium">
                            {article.author.name}
                          </span>
                        </div>
                      )}
                      <span className="text-sm text-gray-500">
                        {new Date(article.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-gray-700 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
