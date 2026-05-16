// Convert the two downloaded Pexels JPGs to WebP at q88 and stash them at
// the final paths the components will reference.
//
// Run with:  node scripts/convert-pexels-locals.mjs

import sharp from "sharp";
import { stat, unlink } from "node:fs/promises";

const jobs = [
  {
    src: "public/images/_pexels-hero-source.jpg",
    out: "public/images/hero-stopgap.webp",
    label: "hero",
  },
  {
    src: "public/images/_pexels-about-source.jpg",
    out: "public/images/about-wok.webp",
    label: "about",
  },
];

console.log("\nPexels → local WebP @ quality 88\n");

for (const job of jobs) {
  const inStat = await stat(job.src);
  await sharp(job.src).webp({ quality: 88 }).toFile(job.out);
  const outStat = await stat(job.out);

  const inKb = Math.round(inStat.size / 1024);
  const outKb = Math.round(outStat.size / 1024);
  const pct = ((outKb / inKb) * 100).toFixed(1);

  console.log(
    `  ${job.label.padEnd(6)}  ${inKb.toString().padStart(5)} KB → ${outKb.toString().padStart(4)} KB (${pct.padStart(5)}%)  → ${job.out}`,
  );

  // Source JPG is now redundant — webp lives at the final path.
  await unlink(job.src);
}

console.log("\nSource JPGs removed. WebP outputs ready at their final paths.\n");
