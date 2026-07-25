// Scans public/products/<slug>/ and writes lib/product-images.json.
// Drop any-named .jpg/.png/.webp into a color folder — the site picks them up.
// Runs automatically before `npm run dev` and `npm run build` (see package.json).
import { readdirSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const base = join(root, "public", "products");

// folder name  ->  product slug
const folders = {
  swim: "the-gold-coast",
  blush: "the-blush-set",
  noir: "the-noir-set",
  rouge: "the-rouge-set",
};

const exts = /\.(jpe?g|png|webp|avif)$/i;
const out = {};

for (const [folder, slug] of Object.entries(folders)) {
  const dir = join(base, folder);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  const files = readdirSync(dir)
    .filter((f) => exts.test(f) && !f.startsWith("."))
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
  out[slug] = files.map((f) => `/products/${folder}/${f}`);
}

writeFileSync(
  join(root, "lib", "product-images.json"),
  JSON.stringify(out, null, 2) + "\n"
);

const counts = Object.entries(out)
  .map(([s, a]) => `${s}: ${a.length}`)
  .join("  ·  ");
console.log("✓ product images scanned —", counts);
