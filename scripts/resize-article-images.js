/**
 * One-shot script: resize all images in public/article/ to max width 1800px, quality 90.
 * Overwrites files in place. Run: node scripts/resize-article-images.js
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ARTICLE_DIR = path.join(process.cwd(), "public", "article");
const MAX_WIDTH = 1800;
const QUALITY = 90;
const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

async function run() {
  if (!fs.existsSync(ARTICLE_DIR)) {
    console.error("Directory not found:", ARTICLE_DIR);
    process.exit(1);
  }

  const files = fs.readdirSync(ARTICLE_DIR).filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return EXTENSIONS.includes(ext);
  });

  if (files.length === 0) {
    console.log("No images found in", ARTICLE_DIR);
    return;
  }

  console.log(`Processing ${files.length} image(s) (max width ${MAX_WIDTH}, quality ${QUALITY})...`);

  for (const file of files) {
    const filePath = path.join(ARTICLE_DIR, file);
    const tmpPath = path.join(ARTICLE_DIR, `.tmp.${file}`);
    const ext = path.extname(file).toLowerCase();
    try {
      let pipeline = sharp(filePath).resize(MAX_WIDTH, null, { withoutEnlargement: true });

      if (ext === ".jpg" || ext === ".jpeg") {
        pipeline = pipeline.jpeg({ quality: QUALITY });
      } else if (ext === ".webp") {
        pipeline = pipeline.webp({ quality: QUALITY });
      } else if (ext === ".png") {
        pipeline = pipeline.png({ compressionLevel: 6 });
      }

      await pipeline.toFile(tmpPath);
      fs.renameSync(tmpPath, filePath);
      console.log("  OK", file);
    } catch (err) {
      if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
      console.error("  FAIL", file, err.message);
    }
  }

  console.log("Done.");
}

run();
