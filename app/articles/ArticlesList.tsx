"use client";

import { useState, useMemo } from "react";
import { Article } from "@/services/articleService";
import ArticleCard from "@/app/components/ArticleCard";

interface ArticlesListProps {
  articles: Article[];
  initialSelectedTags?: string[];
  initialSearchQuery?: string;
}

export default function ArticlesList({
  articles,
  initialSelectedTags = [],
  initialSearchQuery = "",
}: ArticlesListProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedTags, setSelectedTags] =
    useState<string[]>(initialSelectedTags);

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
      // Search filter - only search title and tags
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        article.title.toLowerCase().includes(searchLower) ||
        article.tags?.some((tag) => tag.toLowerCase().includes(searchLower)) ||
        false;

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
        <p className="text-sm text-gray-600 text-right">
          Showing {filteredArticles.length} of {articles.length} articles
        </p>
      </div>

      {/* Articles List */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
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
