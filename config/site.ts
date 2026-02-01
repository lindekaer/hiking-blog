const DEFAULT_BASE_URL = "https://lindekaer.com";

export const SITE_URL =
  typeof process.env.NEXT_PUBLIC_SITE_URL === "string"
    ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
    : DEFAULT_BASE_URL;

export const site = {
  name: "Lindekaer",
  description: "A blog about hiking adventures and outdoor exploration",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
} as const;

export const pages = {
  Home: { name: "Home", path: "/", url: SITE_URL },
  About: { name: "About", path: "/about", url: `${SITE_URL}/about` },
  Articles: {
    name: "Articles",
    path: "/articles",
    url: `${SITE_URL}/articles`,
  },
  Gallery: { name: "Gallery", path: "/gallery", url: `${SITE_URL}/gallery` },
} as const;
