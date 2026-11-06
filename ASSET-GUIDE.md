# UMJ Digital Asset Guide

Website media is kept in `public/assets/`; runtime paths are centralized in [`src/config/assets.ts`](./src/config/assets.ts). Submitted source files remain untouched. Smaller web-ready derivatives are stored beside source images and video.

## Submitted asset review

The image folders were visually reviewed and image dimensions/formats checked. Founders use the submitted portraits. Service and portfolio pages use the matching submitted UI screenshots; the app screenshot is portrait, so it is shown contained instead of being cropped. The hero uses the submitted background artwork, related artwork collage, environment, grid, and animation.

| Asset | Actual content and use | Dimensions / details |
|---|---|---:|
| `branding/logo-primary.svg` | Submitted UMJ Digital logo; header and footer | 707 × 357 |
| `branding/logo-primary.png` | Submitted raster UMJ logo; retained source | 707 × 357 |
| `branding/favicon.png` | Submitted UMJ mark | 525 × 252 |
| `branding/favicon-square.png` | Square browser icon derived from the submitted favicon | 256 × 256 |
| `founders/founder-junaid.webp` | Junaid Ali portrait | 896 × 1200 |
| `founders/founder-umer.webp` | Umer portrait | 1086 × 1448 |
| `founders/founder-muzammil.webp` | Muzammil portrait | 848 × 1264 |
| `hero/hero-main.webp` | Homepage hero artwork | 1332 × 712 |
| `hero/hero-object-01.webp` | Strategy / interface artwork in the homepage collage | 1296 × 705 |
| `hero/hero-object-02.webp` | Digital product artwork in the homepage story | 1300 × 708 |
| `hero/hero-object-03.webp` | Growth artwork in the homepage collage | 1392 × 720 |
| `hero/hero-texture.webp` | Subtle hero-scene overlay | 1370 × 716 |
| `3d/models/hero-objects.json` | **Lottie 2D vector animation, not a 3D model**; rendered with `lottie-web` | 1203 × 756; 42 layers; 24 fps; 7 seconds |
| `3d/environments/hero-environment.webp` | Three.js environment/reflection texture | 1406 × 741 |
| `3d/textures/cyan-grid.webp` | Grid plane texture in the Three.js hero | 1512 × 766 |
| `services/service-web-development.webp` | Website development service visual | 1882 × 897 |
| `services/service-app-development.webp` | Portrait mobile app screenshot; displayed with `object-fit: contain` | 714 × 1599 |
| `services/service-ui-ux-design.webp` | UI/UX service visual | 835 × 467 |
| `services/service-graphic-design.webp` | Graphic design service visual | 886 × 391 |
| `services/service-video-editing.webp` | Video-editing software screenshot | 1408 × 768 |
| `services/service-digital-marketing.webp` | Marketing analytics screenshot | 958 × 555 |
| `portfolio/portfolio-ahmed-engineering.webp` | Ahmed Engineering project preview | 1882 × 897 |
| `portfolio/portfolio-mobile-app.webp` | Portrait CarApp screen; displayed without cropping | 714 × 1599 |
| `portfolio/portfolio-graphic-design.webp` | Graphic-design project visual | 886 × 391 |
| `portfolio/portfolio-video-editing.webp` | Video-editing project visual | 1408 × 768 |
| `portfolio/portfolio-digital-marketing.webp` | Marketing project visual | 958 × 555 |
| `videos/video-editing-preview.mp4` | Submitted original video; retained unchanged | 1918 × 954; 6.6 sec; 6.68 MB |
| `videos/video-editing-preview-optimized.mp4` | Lazy-loaded web preview derivative | 960 × 478; 6.6 sec; 118 KB |
| `backgrounds/site-background.webp` | Submitted original site background; retained unchanged | 1382 × 751; 279 KB |
| `backgrounds/site-background-optimized.webp` | Site background used by the app | 1200 × 652; 36 KB |
| `animations/feature-motion.webp` | Motion artwork in the homepage visual collage | 1200 × 700 |
| `branding/ja-logo-original.pdf` | Original JA logo PDF kept as a reference; not the active UMJ mark | PDF |

## File notes

- The three service/portfolio pairs for graphic design, video editing, and digital marketing are byte-identical submitted screenshots, intentionally reused in both sections.
- `mockups/desktop-preview.webp` and `mockups/mobile-preview.webp` are identical legacy files and are not used.
- `branding/logo-light.svg`, `branding/logo-light.png`, and `icons/brand-mark.svg` are legacy JA-branded files and are not used after the UMJ rebrand.
- The original favicon and background are preserved; their square/compressed derivatives are the files used by the site.
- Portfolio concepts/samples remain labelled as concepts/samples. The Ahmed Engineering page is an existing live project preview and may be blocked from embedding by the remote host.

## Performance and motion

- `src/components/HeroAnimation.tsx` lazy-loads the submitted Lottie JSON only when the hero nears the viewport, pauses it while hidden, and shows its first frame when reduced motion is requested.
- `src/components/HeroScene3D.tsx` creates the interactive Three.js geometry and loads the submitted environment and grid texture. It is dynamically imported only on desktop, near the viewport, and when reduced motion is not requested; it pauses off-screen and when the browser tab is hidden.
- The submitted JSON is a 2D Bodymovin/Lottie animation (`ddd: 0`); it is intentionally not passed to a GLB/GLTF loader.
- `src/components/VideoPreview.tsx` loads the compressed MP4 only near the viewport, uses the matching poster, and does not autoplay when reduced motion is enabled.
- Main and below-the-fold images use eager/high priority only for the hero, and lazy loading for content further down the page. App-screen previews use `object-fit: contain` to preserve their content.

## Validation and replacement

Run `npm run assets:verify` to validate manifest paths, image dimensions, video decoding, and Lottie JSON structure. Do not run `npm run assets:generate` on the submitted assets: the generator now requires the explicit `--overwrite-existing-assets` flag because it replaces website artwork with demos.
