import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-auto bg-gray-50">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Description */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Ultralight Life
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              A blog dedicated to sharing hiking adventures, outdoor
              exploration, and inspiring others to discover the beauty of nature
              one trail at a time.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-600 transition-colors hover:text-[#002855]"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="text-sm text-gray-600 transition-colors hover:text-[#002855]"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 transition-colors hover:text-[#002855]"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-sm text-gray-600 transition-colors hover:text-[#002855]"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Additional Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 transition-colors hover:text-[#002855]"
                >
                  Trail Guides
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 transition-colors hover:text-[#002855]"
                >
                  Gear Reviews
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 transition-colors hover:text-[#002855]"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} Hiking Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
