import Image from "next/image";
import Link from "next/link";

export default function GalleryWidget() {
  // Show a preview of 8 images from the gallery
  const galleryImages = [
    { id: 1, src: "/image-1.jpg", alt: "Mountain peak" },
    { id: 2, src: "/image-2.jpg", alt: "Coastal trail" },
    { id: 3, src: "/image-3.jpg", alt: "Forest path" },
    { id: 4, src: "/image-4.jpg", alt: "Desert landscape" },
    { id: 5, src: "/image-5.jpg", alt: "Glacial lake" },
    { id: 6, src: "/image-6.jpg", alt: "Tropical islands" },
    { id: 7, src: "/image-7.jpg", alt: "Ancient ruins" },
    { id: 8, src: "/image-8.jpg", alt: "Wildlife" },
  ];

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
              key={image.id}
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
