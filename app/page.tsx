import Image from "next/image";
import Link from "next/link";
import { getAllArticles } from "@/services/articleService";
import { countries, countryCodeToFlag } from "@/config/countries";
import { jsonLdService } from "@/services/jsonLdService";
import { getAuthorAvatar } from "@/utils/author";
import ArticleCard from "@/app/components/ArticleCard";
import JsonLd from "@/app/components/JsonLd";

export default function Home() {
  const articles = getAllArticles().slice(0, 4);
  const jsonLd = jsonLdService.getHomePageJsonLd();

  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={jsonLd} />
      {/* Banner Image */}
      <div
        className="relative w-full h-64 md:h-96 bg-gray-900"
        style={{
          backgroundImage: "url(/banner.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0 bg-black/40 flex items-center justify-center"
          aria-hidden
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center px-4 drop-shadow-lg">
            Hiking Adventures
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* About me */}
        <section className="mb-16 flex flex-col sm:flex-row items-center gap-8">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 rounded-full overflow-hidden bg-gray-200">
            <Image
              src={getAuthorAvatar("Theodor Lindekaer")}
              alt="Theodor Lindekaer"
              fill
              className="object-cover"
              sizes="160px"
            />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Hi, I’m Theodor
            </h2>
            <p className="text-gray-700">
              This is my personal blog. I’m into ultralight hiking and the
              outdoors, and I’ve been lucky to share a lot of trails with people
              I care about. I hope this inspires you to get out and travel more.
            </p>
            <Link
              href="/about"
              className="inline-block mt-3 text-[#002855] font-medium hover:underline"
            >
              More about me →
            </Link>
          </div>
        </section>

        <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center uppercase tracking-widest">
          Latest Articles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        {/* Countries I've visited */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center uppercase tracking-widest">
            Countries I&apos;ve Visited
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {countries.map(({ name, code }) => (
              <div
                key={code}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 border border-gray-200"
              >
                <span className="text-2xl" aria-hidden>
                  {countryCodeToFlag(code)}
                </span>
                <span className="text-gray-900 font-medium">{name}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 border-dashed">
              <span className="text-2xl text-gray-400" aria-hidden>
                …
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
