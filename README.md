# UMJ Digital

A React, TypeScript, and Vite website for UMJ Digital, using submitted local media, a lazy-loaded Lottie hero animation, and a reduced-motion-aware animation system.

## Run locally

1. Install dependencies with `npm install`.
2. Start the development server with `npm run dev`.
3. Open the local URL printed by Vite (usually `http://localhost:5173`).
4. Create a production build with `npm run build`.

## Assets

Website media is stored in `public/assets/` and documented in [ASSET-GUIDE.md](./ASSET-GUIDE.md). The submitted hero JSON is a 2D Lottie animation, not a 3D model; the website renders it with the Lottie player while a separate lazy-loaded Three.js scene supplies interactive 3D geometry.

- `npm run assets:verify` checks manifest paths, image dimensions, video decoding, and the Lottie JSON structure.
- Do not run `npm run assets:generate` on submitted artwork. It now exits by default; `npm run assets:generate -- --overwrite-existing-assets` explicitly overwrites the submitted media with demo assets.

The submitted UMJ Digital logo is used in the header and footer. Original submitted assets are preserved; optimized favicon, background, and video derivatives are stored alongside their originals.

## Contact form delivery

Set `VITE_FORMSPREE_ENDPOINT` in `.env` or your deployment environment to send inquiries through Formspree. Alternatively, set `VITE_CONTACT_EMAIL` to let visitors open a pre-filled email draft. The form reports an unavailable delivery setup rather than showing a false success when neither value is configured.
