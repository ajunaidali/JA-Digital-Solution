# JA Digital Solver

A React, TypeScript, and Vite website for JA Digital Solver, with locally stored demonstration assets and a reduced-motion-aware animation system.

## Run locally

1. Install dependencies with `npm install`.
2. Start the development server with `npm run dev`.
3. Open the local URL printed by Vite (usually `http://localhost:5173`).
4. Create a production build with `npm run build`.

## Assets

Website media is stored in `public/assets/` and documented in [ASSET-GUIDE.md](./ASSET-GUIDE.md). Replace a file while retaining its filename, format, and approximate aspect ratio to update it without changing components.

- `npm run assets:verify` checks manifest paths, image dimensions, video decoding, and the GLB header.
- `npm run assets:generate` regenerates the local SVG-based demonstration artwork and motion preview. This overwrites generated assets.

The supplied logo PDF is retained as a reference, but it renders blank. The displayed text-based logo is temporary and replaceable.

## Contact form delivery

Set `VITE_FORMSPREE_ENDPOINT` in `.env` or your deployment environment to send inquiries through Formspree. Alternatively, set `VITE_CONTACT_EMAIL` to let visitors open a pre-filled email draft. The form reports an unavailable delivery setup rather than showing a false success when neither value is configured.
