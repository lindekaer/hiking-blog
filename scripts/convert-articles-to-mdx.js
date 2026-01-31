const fs = require("fs");
const path = require("path");

const articlesDir = path.join(process.cwd(), "articles");

const figureRegex =
  /<figure>\s*<img src="([^"]+)"[^>]*\/>\s*<figcaption>([\s\S]*?)<\/figcaption>\s*<\/figure>/g;

function escapeForAttr(text) {
  return text
    .trim()
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"');
}

function convert(content) {
  return content.replace(figureRegex, (_, src, figcaption) => {
    const desc = escapeForAttr(figcaption);
    return `<ArticleImage src="${src}" description="${desc}" />`;
  });
}

const files = fs.readdirSync(articlesDir);
const mdFiles = files.filter((f) => f.endsWith(".md") && !f.endsWith(".mdx"));

for (const file of mdFiles) {
  const slug = file.replace(/\.md$/, "");
  const mdPath = path.join(articlesDir, file);
  const mdxPath = path.join(articlesDir, `${slug}.mdx`);
  const content = fs.readFileSync(mdPath, "utf8");
  const converted = convert(content);
  fs.writeFileSync(mdxPath, converted, "utf8");
  fs.unlinkSync(mdPath);
  console.log(`Converted ${file} -> ${slug}.mdx`);
}

console.log(`Done. Converted ${mdFiles.length} articles.`);
