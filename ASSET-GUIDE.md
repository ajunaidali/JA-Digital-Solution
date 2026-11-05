# JA Digital Solver Asset Guide

All website media is stored locally under `public/assets/`. The component-facing paths are centralized in [`src/config/assets.ts`](./src/config/assets.ts); replace a file with the same filename and compatible format to update it without changing components.

The supplied `JA logo.pdf` is preserved as `branding/ja-logo-original.pdf`, but its page appears blank. The displayed `logo-primary` and `logo-light` files are temporary, text-based wordmarks, not extracted versions of the original logo.

## Asset inventory

| File | Purpose and website location | Recommended replacement dimensions | Supported formats |
|---|---|---:|---|
| `branding/ja-logo-original.pdf` | Supplied reference logo; not displayed | Original PDF | PDF |
| `branding/logo-primary.svg` | Navbar and footer wordmark on dark backgrounds | 680 × 150 viewBox | SVG |
| `branding/logo-light.svg` | Wordmark for light backgrounds | 680 × 150 viewBox | SVG |
| `branding/logo-primary.png` | Raster dark-background wordmark | 1360 × 300 px | PNG, WebP |
| `branding/logo-light.png` | Raster light-background wordmark | 1360 × 300 px | PNG, WebP |
| `branding/favicon.png` | Browser tab icon (`index.html`) | 256 × 256 px | PNG |
| `founders/founder-junaid.webp` | Junaid Ali founder profile visual | 700 × 820 px | WebP, PNG, JPEG |
| `founders/founder-umer.webp` | Umer founder profile visual | 700 × 820 px | WebP, PNG, JPEG |
| `founders/founder-muzammil.webp` | Muzammil founder profile visual | 700 × 820 px | WebP, PNG, JPEG |
| `hero/hero-main.webp` | Main hero artwork | 1200 × 700 px | WebP, PNG, JPEG |
| `hero/hero-object-01.webp` | Hero strategy / floating object layer | 1200 × 700 px | WebP, PNG, JPEG |
| `hero/hero-object-02.webp` | Hero product / floating object layer | 1200 × 700 px | WebP, PNG, JPEG |
| `hero/hero-object-03.webp` | Hero launch / floating object layer | 1200 × 700 px | WebP, PNG, JPEG |
| `hero/hero-texture.webp` | Hero texture and lighting layer | 1200 × 700 px | WebP, PNG, JPEG |
| `3d/models/hero-objects.glb` | Local 3D hero geometry | Keep scene scale and origin compatible | GLB |
| `3d/textures/cyan-grid.webp` | Three-dimensional scene surface texture | 1200 × 700 px | WebP, PNG, JPEG |
| `3d/environments/hero-environment.webp` | Three-dimensional scene environment artwork | 1200 × 700 px | WebP, PNG, JPEG |
| `services/service-web-development.webp` | Web development service artwork | 1200 × 700 px | WebP, PNG, JPEG |
| `services/service-app-development.webp` | App development service artwork | 1200 × 700 px | WebP, PNG, JPEG |
| `services/service-ui-ux-design.webp` | UI/UX service artwork | 1200 × 700 px | WebP, PNG, JPEG |
| `services/service-graphic-design.webp` | Graphic design and branding artwork | 1200 × 700 px | WebP, PNG, JPEG |
| `services/service-video-editing.webp` | Video editing poster and fallback | 1200 × 700 px | WebP, PNG, JPEG |
| `services/service-digital-marketing.webp` | Digital marketing service artwork | 1200 × 700 px | WebP, PNG, JPEG |
| `portfolio/portfolio-ahmed-engineering.webp` | Ahmed Engineering project card and mobile preview fallback | 1200 × 700 px | WebP, PNG, JPEG |
| `portfolio/portfolio-mobile-app.webp` | Clearly labeled mobile app concept sample | 1200 × 700 px | WebP, PNG, JPEG |
| `portfolio/portfolio-graphic-design.webp` | Clearly labeled branding concept sample | 1200 × 700 px | WebP, PNG, JPEG |
| `portfolio/portfolio-video-editing.webp` | Clearly labeled video editing sample poster | 1200 × 700 px | WebP, PNG, JPEG |
| `portfolio/portfolio-digital-marketing.webp` | Clearly labeled marketing concept sample | 1200 × 700 px | WebP, PNG, JPEG |
| `videos/video-editing-preview.mp4` | Muted, lazy, viewport-triggered motion preview; poster fallback is the service/portfolio image | 960 × 540 px, 3 seconds | MP4 (H.264) |
| `backgrounds/site-background.webp` | Site background texture | 1200 × 700 px | WebP, PNG, JPEG |
| `icons/brand-mark.svg` | Compact JA brand mark | 128 × 128 viewBox | SVG |
| `mockups/desktop-preview.webp` | Desktop mockup support artwork | 1200 × 700 px | WebP, PNG, JPEG |
| `mockups/mobile-preview.webp` | Mobile mockup support artwork | 1200 × 700 px | WebP, PNG, JPEG |
| `animations/feature-motion.webp` | Motion feature artwork and poster | 1200 × 700 px | WebP, PNG, JPEG |

Generated founder illustrations are abstract placeholders, not portraits. Portfolio concept/sample assets are demonstrations rather than completed client work. The Ahmed Engineering page itself is shown in a live embedded preview when the remote site permits framing, and can also be opened directly.

## Replacing assets

1. Keep the path and filename from the inventory. Website code refers to these files through `src/config/assets.ts`; the favicon path is also declared in `index.html`.
2. Keep the listed aspect ratio and use a supported format. Raster replacements can use WebP, PNG, or JPEG while retaining the `.webp` path only if the replacement is encoded as WebP. For SVG and GLB, retain their respective formats.
3. Keep video muted/autoplay-friendly and provide the matching poster image; the UI falls back to the poster when motion is reduced, the video cannot play, or loading fails.
4. Run `npm run assets:verify` to check manifest files, image decoding and dimensions, video decoding, and the GLB header.
5. To regenerate the original local demonstration artwork, run `npm run assets:generate`. This overwrites generated assets and removes known legacy filenames.

## Motion implementation

- `src/components/KineticText.tsx` provides word- and character-level masked headline reveals.
- `src/components/Marquee.tsx` renders continuous brand text strips.
- `src/components/ServiceVisual.tsx` and `src/index.css` provide service-specific animated illustrations.
- `src/components/VideoPreview.tsx` lazy-loads the local video near the viewport and keeps poster/reduced-motion fallbacks.
- `src/components/HeroScene3D.tsx` loads the local GLB model, environment, and grid texture into the Three.js hero composition. It is dynamically imported only on desktop, near the viewport, and when reduced motion is not requested.
- The Three.js render loop pauses off-screen and when the browser tab is hidden. Mobile and reduced-motion visitors receive the lightweight CSS composition instead.
