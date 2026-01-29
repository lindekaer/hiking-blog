"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbProps {
  articleTitle?: string;
}

export default function Breadcrumb({ articleTitle }: BreadcrumbProps) {
  const pathname = usePathname();

  // Don't show breadcrumb on home page
  if (pathname === "/") {
    return null;
  }

  const getBreadcrumbs = () => {
    const crumbs: { label: string; href: string }[] = [
      { label: "Home", href: "/" },
    ];

    if (pathname === "/articles") {
      crumbs.push({ label: "Articles", href: "/articles" });
    } else if (pathname.startsWith("/articles/")) {
      crumbs.push({ label: "Articles", href: "/articles" });
      if (articleTitle) {
        crumbs.push({ label: articleTitle, href: pathname });
      }
    } else if (pathname === "/about") {
      crumbs.push({ label: "About", href: "/about" });
    } else if (pathname === "/gallery") {
      crumbs.push({ label: "Gallery", href: "/gallery" });
    }

    return crumbs;
  };

  const crumbs = getBreadcrumbs();

  return (
    <nav className="mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-sm flex-wrap">
        {crumbs.map((crumb, index) => (
          <li
            key={`${crumb.href}-${index}`}
            className="flex items-center gap-2"
          >
            {index > 0 && (
              <span className="text-gray-400 shrink-0" aria-hidden="true">
                &gt;
              </span>
            )}
            {index === crumbs.length - 1 ? (
              <span className="text-gray-900 font-medium">{crumb.label}</span>
            ) : (
              <Link
                href={crumb.href}
                className="text-gray-600 hover:text-[#002855] transition-colors"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
