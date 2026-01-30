/**
 * Returns the public URL for an author's avatar image.
 * Converts name to a slug (lowercase, spaces to hyphens) and expects
 * a file at public/{slug}.jpg (e.g. public/theodor-lindekaer.jpg).
 */
export function getAuthorAvatar(authorName: string): string {
  const slug = authorName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  return `/${slug}.jpg`;
}
