import Link from "next/link";
import { getTagCloud } from "@/services/articleService";

export default function TagCloud() {
  const tags = getTagCloud();

  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {tags.map(({ tag }) => (
        <Link
          key={tag}
          href={`/articles?tag=${encodeURIComponent(tag)}`}
          className="text-sm px-2 py-1 font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
