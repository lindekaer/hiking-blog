import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 hover:text-[#002855] transition-colors"
          >
            Ultralight Life
          </Link>
          <div className="flex space-x-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-[#002855] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/articles"
              className="text-gray-700 hover:text-[#002855] transition-colors"
            >
              Articles
            </Link>
            <Link
              href="/gallery"
              className="text-gray-700 hover:text-[#002855] transition-colors"
            >
              Gallery
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-[#002855] transition-colors"
            >
              About
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
