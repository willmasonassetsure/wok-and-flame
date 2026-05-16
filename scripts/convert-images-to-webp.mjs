// Batch PNG → WebP conversion at quality 88 — the threshold confirmed
// visually indistinguishable from the source during the eyeball test
// (see scripts/compare-image-formats.mjs).
//
// Run with:  node scripts/convert-images-to-webp.mjs
//
// Behaviour:
//   - Writes <name>.webp next to every <name>.png in public/images/
//   - Skips files that already have a .webp sibling
//   - Leaves the original .png on disk (safe rollback path)
//
// After running, swap source references in code from .png to .webp.

import sharp from "sharp";
import { readdir, stat, access } from "node:fs/promises";
import { constants } from "node:fs";
import { join, parse } from "node:path";

const DIR = "public/images";
const QUALITY = 88;

const files = await readdir(DIR);
const pngs = files.filter((f) => f.toLowerCase().endsWith(".png"));

let totalIn = 0;
let totalOut = 0;
const results = [];

for (const file of pngs) {
  const { name } = parse(file);
  const src = join(DIR, file);
  const out = join(DIR, `${name}.webp`);

  try {
    await access(out, constants.F_OK);
    results.push({ file, status: "skipped (exists)", inKb: 0, outKb: 0 });
    continue;
  } catch {
    // .webp does not exist yet — proceed.
  }

  const inStat = await stat(src);
  await sharp(src).webp({ quality: QUALITY }).toFile(out);
  const outStat = await stat(out);

  const inKb = Math.round(inStat.size / 1024);
  const outKb = Math.round(outStat.size / 1024);
  totalIn += inKb;
  totalOut += outKb;

  results.push({ file, status: "converted", inKb, outKb });
}

console.log(`\nWebP conversion @ quality ${QUALITY}\n`);
for (const r of results) {
  if (r.status === "skipped (exists)") {
    console.log(`  ${r.file.padEnd(34)}  ${r.status}`);
  } else {
    const pct = ((r.outKb / r.inKb) * 100).toFixed(1);
    console.log(
      `  ${r.file.padEnd(34)}  ${r.inKb.toString().padStart(5)} KB → ${r.outKb.toString().padStart(4)} KB  (${pct.padStart(5)}%)`,
    );
  }
}

if (totalIn > 0) {
  const totalPct = ((totalOut / totalIn) * 100).toFixed(1);
  const savedMb = ((totalIn - totalOut) / 1024).toFixed(2);
  console.log(
    `\n  Total                            ${totalIn.toLocaleString().padStart(5)} KB → ${totalOut.toLocaleString().padStart(4)} KB  (${totalPct.padStart(5)}%)`,
  );
  console.log(`  Saved: ${savedMb} MB\n`);
} else {
  console.log("\n  Nothing converted — all files already have .webp siblings.\n");
}
