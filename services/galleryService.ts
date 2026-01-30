import fs from "fs";
import path from "path";

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

export function getGalleryImages(): { src: string; alt: string }[] {
  const articleDir = path.join(process.cwd(), "public", "article");
  if (!fs.existsSync(articleDir)) return [];
  const files = fs.readdirSync(articleDir);
  return files
    .filter((file) =>
      IMAGE_EXTENSIONS.some((ext) => file.toLowerCase().endsWith(ext))
    )
    .sort()
    .map((file) => ({
      src: `/article/${file}`,
      alt: file
        .replace(/\.[^/.]+$/, "")
        .replace(/^[^.]+\./, "")
        .replace(/[-._]/g, " "),
    }));
}
