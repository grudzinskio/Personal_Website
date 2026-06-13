/**
 * Image build step. Source masters live in /raw-assets (tracked in git but NOT
 * bundled or deployed). This script downscales + compresses them into the
 * served assets under /public and /src/assets that the app actually references.
 *
 * Run with: npm run optimize:images
 *
 * To add a new image: drop the original in raw-assets/, add an entry below,
 * and reference the generated output from the app.
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { statSync, mkdirSync, existsSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// { in: source under repo root, out: generated file, fmt, width?, quality? }
const jobs = [
  // Full-screen background (3840x2160). Sits under a dark gradient overlay, so
  // aggressive downscale/compression is visually imperceptible. WebP is the
  // primary; a small JPG is the fallback for browsers without image-set/WebP.
  { in: 'raw-assets/background.png', out: 'public/background.webp', fmt: 'webp', width: 2560, quality: 68 },
  { in: 'raw-assets/background.png', out: 'public/background.jpg', fmt: 'jpeg', width: 1600, quality: 72 },

  // Social share card (og:image / twitter:image) -> served at /Portfolio.png.
  { in: 'raw-assets/Portfolio.png', out: 'public/Portfolio.png', fmt: 'png', width: 1200 },

  // Eager hero asset on the preclinical section (keeps transparency).
  { in: 'raw-assets/Mouse-Transparent-optimized.png', out: 'public/Mouse-Transparent-optimized.webp', fmt: 'webp', quality: 80 },

  // Project card / modal images (displayed at most ~768px wide).
  ...[
    'CPAproject', 'MARLProject', 'QAProject', 'Radiohead', 'ONCO_GRID_AI',
    'PhotoSynProject', 'CocoProject', 'DiabetesProject', 'WordleProject',
    'ActionsProject', 'PosterManagement', 'PersonalWebsite',
  ].map((name) => {
    const src = ['CPAproject', 'QAProject', 'ONCO_GRID_AI'].includes(name)
      ? `raw-assets/projects/${name}.jpg`
      : `raw-assets/projects/${name}.png`;
    return { in: src, out: `public/projects/${name}.webp`, fmt: 'webp', width: 1280, quality: 72 };
  }),

  // Bundler-imported section assets.
  { in: 'raw-assets/logos/coco_diagram_white_background.png', out: 'src/assets/logos/coco_diagram_white_background.webp', fmt: 'webp', width: 1600, quality: 80 },
  { in: 'raw-assets/logos/CocoLogo_Transparent.png', out: 'src/assets/logos/CocoLogo_Transparent.webp', fmt: 'webp', quality: 82 },
];

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
let beforeTotal = 0;
let afterTotal = 0;

for (const job of jobs) {
  const input = resolve(root, job.in);
  const output = resolve(root, job.out);
  mkdirSync(dirname(output), { recursive: true });

  let pipeline = sharp(input);
  if (job.width) pipeline = pipeline.resize({ width: job.width, withoutEnlargement: true });
  if (job.fmt === 'webp') pipeline = pipeline.webp({ quality: job.quality ?? 75, effort: 6 });
  else if (job.fmt === 'jpeg') pipeline = pipeline.jpeg({ quality: job.quality ?? 75, mozjpeg: true });
  else if (job.fmt === 'png') pipeline = pipeline.png({ compressionLevel: 9, palette: true });
  await pipeline.toFile(output);

  const before = statSync(input).size;
  const after = statSync(output).size;
  beforeTotal += before;
  afterTotal += after;
  const pct = (100 * (1 - after / before)).toFixed(0);
  console.log(`${job.out.padEnd(54)} ${kb(before).padStart(9)} -> ${kb(after).padStart(9)}  (-${pct}%)`);
}

console.log('-'.repeat(82));
console.log(`TOTAL${''.padEnd(49)} ${kb(beforeTotal).padStart(9)} -> ${kb(afterTotal).padStart(9)}  (-${(100 * (1 - afterTotal / beforeTotal)).toFixed(0)}%)`);
