import Breadcrumb from "@/app/components/Breadcrumb";
import JsonLd from "@/app/components/JsonLd";
import { jsonLdService } from "@/services/jsonLdService";
import { getGalleryImages } from "@/services/galleryService";
import GalleryGrid from "./GalleryGrid";

export default function GalleryPage() {
  const jsonLd = jsonLdService.getGalleryPageJsonLd();
  const galleryImages = getGalleryImages();

  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={jsonLd} />
      <main className="flex-1 max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <Breadcrumb />
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Gallery</h1>

        <GalleryGrid images={galleryImages} />
      </main>
    </div>
  );
}
