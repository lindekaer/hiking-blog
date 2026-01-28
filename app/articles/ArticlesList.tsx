"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/services/articleService";

interface ArticlesListProps {
  articles: Article[];
}

export default function ArticlesList({ articles }: ArticlesListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags from articles
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    articles.forEach((article) => {
      article.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [articles]);

  // Filter articles based on search and tags
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase());

      // Tag filter
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => article.tags?.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [articles, searchQuery, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <>
      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Input */}
        <div>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002855] focus:border-transparent"
          />
        </div>

        {/* Tag Filters */}
        {allTags.length > 0 && (
          <div>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                    selectedTags.includes(tag)
                      ? "bg-[#002855] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="mt-2 text-sm text-[#002855] hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Results count */}
        <p className="text-sm text-gray-600">
          Showing {filteredArticles.length} of {articles.length} articles
        </p>
      </div>

      {/* Articles List */}
      {filteredArticles.length > 0 ? (
        <div className="space-y-8">
          {filteredArticles.map((article) => (
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
                    <p className="text-sm text-gray-500 mb-3">
                      {new Date(article.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
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
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            No articles found matching your search criteria.
          </p>
        </div>
      )}
    </>
  );
}
