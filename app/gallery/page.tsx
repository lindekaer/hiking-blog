import Image from "next/image";
import Breadcrumb from "@/app/components/Breadcrumb";

export default function GalleryPage() {
  // Gallery images - replace these with actual images from your public folder
  const galleryImages = [
    {
      id: 1,
      src: "/placeholder-1.jpg",
      alt: "Mountain peak",
      gradient: "from-green-400 to-emerald-600",
    },
    {
      id: 2,
      src: "/placeholder-2.jpg",
      alt: "Coastal trail",
      gradient: "from-blue-400 to-cyan-600",
    },
    {
      id: 3,
      src: "/placeholder-3.jpg",
      alt: "Forest path",
      gradient: "from-green-500 to-teal-600",
    },
    {
      id: 4,
      src: "/placeholder-4.jpg",
      alt: "Desert landscape",
      gradient: "from-amber-400 to-orange-600",
    },
    {
      id: 5,
      src: "/placeholder-5.jpg",
      alt: "Glacial lake",
      gradient: "from-blue-300 to-indigo-600",
    },
    {
      id: 6,
      src: "/placeholder-6.jpg",
      alt: "Tropical islands",
      gradient: "from-teal-400 to-blue-500",
    },
    {
      id: 7,
      src: "/placeholder-7.jpg",
      alt: "Ancient ruins",
      gradient: "from-stone-400 to-amber-600",
    },
    {
      id: 8,
      src: "/placeholder-8.jpg",
      alt: "Wildlife",
      gradient: "from-green-500 to-lime-600",
    },
    {
      id: 9,
      src: "/placeholder-9.jpg",
      alt: "Mountain monastery",
      gradient: "from-slate-400 to-gray-600",
    },
    {
      id: 10,
      src: "/placeholder-10.jpg",
      alt: "Volcanic landscape",
      gradient: "from-red-400 to-orange-600",
    },
    {
      id: 11,
      src: "/placeholder-11.jpg",
      alt: "Rock formations",
      gradient: "from-cyan-400 to-blue-600",
    },
    {
      id: 12,
      src: "/placeholder-12.jpg",
      alt: "Tropical flora",
      gradient: "from-pink-400 to-rose-600",
    },
    {
      id: 13,
      src: "/placeholder-13.jpg",
      alt: "Hiking trail",
      gradient: "from-emerald-400 to-green-600",
    },
    {
      id: 14,
      src: "/placeholder-14.jpg",
      alt: "Sunset vista",
      gradient: "from-orange-400 to-red-600",
    },
    {
      id: 15,
      src: "/placeholder-15.jpg",
      alt: "Alpine meadow",
      gradient: "from-blue-400 to-purple-600",
    },
    {
      id: 16,
      src: "/placeholder-16.jpg",
      alt: "River crossing",
      gradient: "from-teal-500 to-cyan-600",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <Breadcrumb />
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Gallery</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="relative aspect-[4/3] rounded-lg overflow-hidden"
            >
              {/* Placeholder - replace with actual Image component when you have images */}
              <div
                className={`w-full h-full bg-gradient-to-br ${image.gradient} rounded-lg`}
              />
              {/* Uncomment and use this when you have actual images:
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />
              */}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
