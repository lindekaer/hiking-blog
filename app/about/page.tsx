import Breadcrumb from "@/app/components/Breadcrumb";
import JsonLd from "@/app/components/JsonLd";
import { jsonLdService } from "@/services/jsonLdService";

export default function AboutPage() {
  const jsonLd = jsonLdService.getAboutPageJsonLd();

  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={jsonLd} />
      <main className="flex-1 max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <Breadcrumb />
        <h1 className="text-4xl font-bold mb-8 text-gray-900">About</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6">
            This is my personal blog. I’m passionate about hiking - especially
            ultralight - and I love the outdoors.
          </p>

          <p className="text-gray-700 mb-6">
            I’m thankful to have shared many trails and trips with people I care
            about. Those experiences are what this site is about.
          </p>

          <p className="text-gray-700">
            I hope the stories and photos here inspire you to travel more and
            get outside, whether that’s a long trail or a short walk.
          </p>
        </div>
      </main>
    </div>
  );
}
