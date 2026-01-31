"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home", exact: true },
  { href: "/articles", label: "Articles", exact: false },
  { href: "/gallery", label: "Gallery", exact: true },
  { href: "/about", label: "About", exact: true },
] as const;

function isActive(pathname: string, href: string, exact: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-2xl font-bold text-gray-900 hover:text-[#002855] transition-colors"
          >
            LINDEKAER
          </Link>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-8">
              {navItems.map(({ href, label, exact }) => {
                const active = isActive(pathname, href, exact);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`text-base font-medium border-b-2 pb-0.5 transition-colors ${
                      active
                        ? "text-[#002855] border-[#002855]"
                        : "text-gray-700 border-transparent hover:text-[#002855]"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
            <form
              action="/articles"
              method="GET"
              className="flex items-stretch border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#002855] focus-within:border-transparent"
            >
              <input
                type="search"
                name="query"
                placeholder="Search articles..."
                className="w-40 sm:w-48 px-3 py-2 text-sm border-0 focus:outline-none focus:ring-0"
                aria-label="Search articles"
              />
              <button
                type="submit"
                className="px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 border-l border-gray-300 hover:bg-gray-200 transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}
