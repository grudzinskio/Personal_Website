# raw-assets

Original, full-resolution source images. These are **tracked in git** but are
**not bundled or deployed** — Vite only ships files under `public/` (served at
the site root) and files imported from `src/`.

The build step `npm run optimize:images` (see `scripts/optimize-images.mjs`)
reads the masters here and writes downscaled, compressed copies to where the app
references them:

- `public/background.webp` + `public/background.jpg` (CSS background, fallback)
- `public/Portfolio.png` (social `og:image`)
- `public/Mouse-Transparent-optimized.webp`
- `public/projects/*.webp` (referenced by `src/data/projects.json`)
- `src/assets/logos/*.webp` (imported by section components)

## Workflow

1. Add or replace a master image in here.
2. Add/adjust its entry in `scripts/optimize-images.mjs`.
3. Run `npm run optimize:images`.
4. Reference the generated output from the app.

Do not reference files in `raw-assets/` directly from app code — they won't exist
in the production build.
