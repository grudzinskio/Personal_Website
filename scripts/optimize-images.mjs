/**
 * One-off / repeatable image optimizer.
 *
 * Generates downscaled WebP siblings for the heavy raster assets that the site
 * actually loads. Originals are left untouched so they remain as sources and as
 * fallbacks (the CSS background uses image-set with a PNG fallback).
 *
 * Run with: npm run optimize:images
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, extname } from 'node:path';
import { statSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// [ inputPath, { width?, quality? } ] -> writes a .webp sibling
const targets = [
  // Full-screen background (3840x2160). Sits under a dark gradient overlay,
  // so aggressive downscale/compression is visually imperceptible.
  ['public/background.png', { width: 2560, quality: 68 }],

  // Eager hero asset on the preclinical section.
  ['public/Mouse-Transparent-optimized.png', { quality: 80 }],

  // Project card / modal images (displayed at most ~768px wide).
  ['public/projects/CPAproject.jpg', { width: 1280, quality: 72 }],
  ['public/projects/MARLProject.png', { width: 1280, quality: 72 }],
  ['public/projects/QAProject.jpg', { width: 1280, quality: 72 }],
  ['public/projects/Radiohead.png', { width: 1280, quality: 72 }],
  ['public/projects/ONCO_GRID_AI.jpg', { width: 1280, quality: 72 }],
  ['public/projects/PhotoSynProject.png', { width: 1280, quality: 72 }],
  ['public/projects/CocoProject.png', { width: 1280, quality: 72 }],
  ['public/projects/DiabetesProject.png', { width: 1280, quality: 72 }],
  ['public/projects/WordleProject.png', { width: 1280, quality: 72 }],
  ['public/projects/ActionsProject.png', { width: 1280, quality: 72 }],
  ['public/projects/PosterManagement.png', { width: 1280, quality: 72 }],
  ['public/projects/PersonalWebsite.png', { width: 1280, quality: 72 }],

  // Imported section assets.
  ['src/assets/logos/coco_diagram_white_background.png', { width: 1600, quality: 80 }],
  ['src/assets/logos/CocoLogo_Transparent.png', { quality: 82 }],
];

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

let beforeTotal = 0;
let afterTotal = 0;

for (const [rel, opts] of targets) {
  const input = resolve(root, rel);
  const output = input.slice(0, -extname(input).length) + '.webp';

  let pipeline = sharp(input);
  if (opts.width) {
    pipeline = pipeline.resize({ width: opts.width, withoutEnlargement: true });
  }
  await pipeline.webp({ quality: opts.quality ?? 75, effort: 6 }).toFile(output);

  const before = statSync(input).size;
  const after = statSync(output).size;
  beforeTotal += before;
  afterTotal += after;
  const pct = (100 * (1 - after / before)).toFixed(0);
  console.log(`${rel.padEnd(52)} ${kb(before).padStart(9)} -> ${kb(after).padStart(9)}  (-${pct}%)`);
}

console.log('-'.repeat(80));
console.log(`TOTAL${''.padEnd(47)} ${kb(beforeTotal).padStart(9)} -> ${kb(afterTotal).padStart(9)}  (-${(100 * (1 - afterTotal / beforeTotal)).toFixed(0)}%)`);
