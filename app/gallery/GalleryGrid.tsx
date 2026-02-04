"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const COLS = 4; // max columns (lg)
const ROWS_INITIAL = 6;
const ROWS_PER_LOAD = 6;
const INITIAL_COUNT = ROWS_INITIAL * COLS;
const LOAD_MORE_COUNT = ROWS_PER_LOAD * COLS;

type GalleryImage = { src: string; alt: string };

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  const visibleImages = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

  useEffect(() => {
    if (!hasMore || images.length === 0) return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting || loadingRef.current) return;
        loadingRef.current = true;
        setVisibleCount((n) => Math.min(n + LOAD_MORE_COUNT, images.length));
      },
      { rootMargin: "200px", threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, images.length]);

  useEffect(() => {
    loadingRef.current = false;
  }, [visibleCount]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {visibleImages.map((image) => (
          <div
            key={image.src}
            className="relative aspect-[4/3] rounded-lg overflow-hidden"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            />
          </div>
        ))}
      </div>
      {hasMore && <div ref={sentinelRef} className="h-4" aria-hidden />}
    </>
  );
}
