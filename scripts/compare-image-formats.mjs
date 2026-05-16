// One-off eyeball test: convert dish-plate-close.png to four format/quality
// combos so we can compare them in a browser before committing to a batch
// PNG → WebP migration across the whole gallery.
//
// Run with:  node scripts/compare-image-formats.mjs
//
// Outputs land in /public/images/_test/ so they're servable by `next dev`
// at /images/_test/<file>.

import sharp from "sharp";
import { stat } from "node:fs/promises";
import { join } from "node:path";

const SRC = "public/images/dish-plate-close.png";
const OUT = "public/images/_test";

const variants = [
  { label: "webp-q82", apply: (p) => p.webp({ quality: 82 }), ext: "webp" },
  { label: "webp-q88", apply: (p) => p.webp({ quality: 88 }), ext: "webp" },
  { label: "webp-q92", apply: (p) => p.webp({ quality: 92 }), ext: "webp" },
  { label: "avif-q70", apply: (p) => p.avif({ quality: 70 }), ext: "avif" },
];

const srcStat = await stat(SRC);
const origKb = Math.round(srcStat.size / 1024);

console.log(`\nSource: ${SRC} — ${origKb.toLocaleString()} KB (PNG, lossless)\n`);
console.log("Conversions:");

for (const v of variants) {
  const out = join(OUT, `dish-plate-close-${v.label}.${v.ext}`);
  await v.apply(sharp(SRC)).toFile(out);
  const s = await stat(out);
  const kb = Math.round(s.size / 1024);
  const pct = ((kb / origKb) * 100).toFixed(1);
  const saved = (100 - parseFloat(pct)).toFixed(1);
  console.log(
    `  ${v.label.padEnd(10)}  ${kb.toString().padStart(5)} KB  ` +
      `(${pct.padStart(5)}% of original, ${saved}% saved)  → ${out}`,
  );
}

console.log(
  "\nOpen each in a browser tab alongside the source PNG to eyeball the difference.",
);
