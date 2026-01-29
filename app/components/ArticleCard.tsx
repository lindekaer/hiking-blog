import Link from "next/link";
import Image from "next/image";
import { Article } from "@/services/articleService";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="border border-gray-200 rounded-lg overflow-hidden">
      <Link href={`/articles/${article.slug}`} className="block group">
        {article.thumbnail ? (
          <div className="w-full aspect-video relative rounded-t-lg overflow-hidden mb-3">
            <Image
              src={article.thumbnail}
              alt={article.title}
              fill
              className="object-cover"
            />
            {/* Gradient overlay from bottom */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, black 0%, transparent 100%)",
              }}
            />
            {/* Title and author on top of image */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-lg font-bold mb-2 text-white transition-colors group-hover:text-white/90">
                {article.title}
              </h3>
              <div className="flex items-center gap-3 flex-wrap">
                {article.author && (
                  <div className="flex items-center gap-2">
                    {article.author.avatar ? (
                      <div className="w-8 h-8 relative rounded-full overflow-hidden ring-2 ring-white/50 shrink-0">
                        <Image
                          src={article.author.avatar}
                          alt={article.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/50 shrink-0">
                        <span className="text-white text-xs font-medium">
                          {article.author.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <span className="text-sm text-white font-medium">
                      {article.author.name}
                    </span>
                  </div>
                )}
                <span className="text-sm text-white/90">
                  {new Date(article.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-3">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 transition-colors group-hover:text-[#002855]">
              {article.title}
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              {new Date(article.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        )}
        <div className="p-4">
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
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
          <p className="text-gray-700 leading-relaxed text-sm">
            {article.excerpt}
          </p>
        </div>
      </Link>
    </article>
  );
}
