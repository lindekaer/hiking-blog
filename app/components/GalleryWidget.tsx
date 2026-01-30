import Image from "next/image";
import Link from "next/link";
import { getGalleryImages } from "@/services/galleryService";

const PREVIEW_COUNT = 8;

export default function GalleryWidget() {
  const allImages = getGalleryImages();
  const galleryImages = allImages.slice(0, PREVIEW_COUNT);

  return (
    <div className="w-full bg-gray-50 py-12">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Gallery</h2>
          <Link
            href="/gallery"
            className="font-medium transition-colors"
            style={{ color: "#002855" }}
            data-primary-hover
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {galleryImages.map((image) => (
            <div
              key={image.src}
              className="relative aspect-square rounded-lg overflow-hidden"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
