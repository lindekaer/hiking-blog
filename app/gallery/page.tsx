import Image from "next/image";
import Breadcrumb from "@/app/components/Breadcrumb";
import JsonLd from "@/app/components/JsonLd";
import { jsonLdService } from "@/services/jsonLdService";
import { getGalleryImages } from "@/services/galleryService";

export default function GalleryPage() {
  const jsonLd = jsonLdService.getGalleryPageJsonLd();
  const galleryImages = getGalleryImages();

  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={jsonLd} />
      <main className="flex-1 max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <Breadcrumb />
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Gallery</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image) => (
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
      </main>
    </div>
  );
}
