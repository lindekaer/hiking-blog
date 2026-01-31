"use client";

import { useState } from "react";
import Image from "next/image";
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

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <span className="block w-6 h-5 relative">
      <span
        className={`absolute left-0 w-6 h-0.5 bg-gray-700 transition-all duration-200 ${
          open ? "top-2 rotate-45" : "top-0"
        }`}
        aria-hidden
      />
      <span
        className={`absolute left-0 top-2 w-6 h-0.5 bg-gray-700 transition-all duration-200 ${
          open ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden
      />
      <span
        className={`absolute left-0 w-6 h-0.5 bg-gray-700 transition-all duration-200 ${
          open ? "top-2 -rotate-45" : "top-4"
        }`}
        aria-hidden
      />
    </span>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-22">
          <Link
            href="/"
            className="flex items-center hover:opacity-90 transition-opacity"
            aria-label="Lindekaer – Home"
          >
            <Image
              src="/logo.svg"
              alt="Lindekaer"
              width={245}
              height={70}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop: nav + search */}
          <div className="hidden md:flex items-center gap-6">
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

          {/* Mobile: burger button */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden p-2 -m-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#002855] rounded-lg"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <BurgerIcon open={menuOpen} />
          </button>
        </div>

        {/* Mobile: dropdown menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 flex flex-col divide-y divide-gray-200">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium py-3 border-b-2 border-transparent text-gray-700 hover:text-[#002855] transition-colors first:pt-0"
              >
                {label}
              </Link>
            ))}
            <div className="pt-4">
              <form
                action="/articles"
                method="GET"
                className="pt-2"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-stretch border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#002855] focus-within:border-transparent">
                  <input
                    type="search"
                    name="query"
                    placeholder="Search articles..."
                    className="flex-1 min-w-0 px-3 py-2 text-sm border-0 focus:outline-none focus:ring-0"
                    aria-label="Search articles"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 border-l border-gray-300 hover:bg-gray-200 transition-colors"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
