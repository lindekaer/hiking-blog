import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import Image from "next/image";
import {
  getAllSlugs,
  getArticleBySlug,
  getFeaturedArticles,
} from "@/services/articleService";
import Breadcrumb from "@/app/components/Breadcrumb";
import ShareButton from "@/app/components/ShareButton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  let article;

  try {
    article = getArticleBySlug(slug);
  } catch (error) {
    notFound();
  }

  const featuredArticles = getFeaturedArticles(7);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <Breadcrumb articleTitle={article.title} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Article Content */}
          <div className="lg:col-span-2">
            <article>
              {article.thumbnail ? (
                <div className="w-full aspect-[4/3] relative rounded-lg overflow-hidden mb-8">
                  <Image
                    src={article.thumbnail}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                  {/* Gradient overlay from bottom */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)",
                    }}
                  />
                  {/* Title and author on top of image */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                      {article.title}
                    </h1>
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-4 flex-wrap">
                        {article.author && (
                          <div className="flex items-center gap-3">
                            {article.author.avatar ? (
                              <div className="w-10 h-10 relative rounded-full overflow-hidden ring-2 ring-white/50">
                                <Image
                                  src={article.author.avatar}
                                  alt={article.author.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/50">
                                <span className="text-white text-sm font-medium">
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
                </div>
              ) : null}
              {/* Tags and Share button row below image */}
              {article.thumbnail && article.tags && article.tags.length > 0 && (
                <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
                  <div className="flex flex-wrap gap-2 items-center">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-700 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ShareButton slug={slug} />
                </div>
              )}
              {!article.thumbnail && (
                <>
                  <h1 className="text-4xl font-bold mb-4 text-gray-900">
                    {article.title}
                  </h1>
                  <div className="flex items-center gap-4 mb-4">
                    {article.author && (
                      <div className="flex items-center gap-3">
                        {article.author.avatar ? (
                          <div className="w-10 h-10 relative rounded-full overflow-hidden">
                            <Image
                              src={article.author.avatar}
                              alt={article.author.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-gray-600 text-sm font-medium">
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
                </>
              )}
              {!article.thumbnail &&
                article.tags &&
                article.tags.length > 0 && (
                  <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
                    <div className="flex flex-wrap gap-2 items-center">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-700 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <ShareButton slug={slug} />
                  </div>
                )}
              <div className="prose prose-lg max-w-none mt-8">
                <ReactMarkdown>{article.content}</ReactMarkdown>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="space-y-12">
              {/* Featured Articles */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Featured
                </h2>
                <ul className="space-y-6">
                  {featuredArticles
                    .filter((featured) => featured.slug !== slug)
                    .slice(0, 6)
                    .map((featured) => (
                      <li key={featured.slug}>
                        <Link
                          href={`/articles/${featured.slug}`}
                          className="block group"
                        >
                          {featured.thumbnail && (
                            <div className="w-full aspect-video relative rounded-lg overflow-hidden mb-3">
                              <Image
                                src={featured.thumbnail}
                                alt={featured.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <h3 className="text-base font-semibold text-gray-900 transition-colors mb-1 group-hover:text-[#002855]">
                            {featured.title}
                          </h3>
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {featured.excerpt}
                          </p>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Ko-fi Widget */}
              <div className="mt-8">
                <iframe
                  id="kofiframe"
                  src="https://ko-fi.com/lindekaer/?hidefeed=true&widget=true&embed=true&preview=true"
                  style={{
                    border: "none",
                    width: "100%",
                  }}
                  height="712"
                  title="lindekaer"
                />
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
