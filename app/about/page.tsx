import Breadcrumb from "@/app/components/Breadcrumb";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <Breadcrumb />
        <h1 className="text-4xl font-bold mb-8 text-gray-900">About</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6">
            Welcome to Ultralight Life, a place where we share our passion for
            hiking, outdoor adventures, and exploring the natural world.
          </p>

          <p className="text-gray-700 mb-6">
            Our mission is to inspire others to get outside, explore new trails,
            and connect with nature. Whether you're a seasoned hiker or just
            starting out, we hope our stories and experiences will encourage you
            to embark on your own adventures.
          </p>

          <p className="text-gray-700 mb-6">
            From mountain peaks to coastal trails, from dense forests to desert
            landscapes, we document our journeys and share the beauty we
            discover along the way.
          </p>

          <p className="text-gray-700">
            Join us as we explore the great outdoors, one trail at a time.
          </p>
        </div>
      </main>
    </div>
  );
}
