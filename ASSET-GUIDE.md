# JA Digital Solver Asset Guide

This project keeps all visual assets local inside the `public/assets` directory so the website remains portable and easy to maintain.

## Core branding

- `public/assets/branding/ja-logo-original.pdf` — original supplied logo file. Keep this as the reference asset.
- `public/assets/branding/ja-logo-dark.png` — dark-background logo version. Recommended size: 1600x420 px.
- `public/assets/branding/ja-logo-light.png` — light-background logo version. Recommended size: 1600x420 px.
- `public/assets/branding/ja-logo.svg` — editable vector version for future refinements.
- `public/assets/branding/favicon.png` — favicon for browser tabs. Recommended size: 256x256 px.

## Founder placeholders

- `public/assets/founders/junaid-ali.webp`
- `public/assets/founders/umer.webp`
- `public/assets/founders/muzammil.webp`

These are abstract placeholder visuals built to match the premium dark brand aesthetic. Replace them with new files using the same filenames when actual founder portraits are available.

## Hero visuals

- `public/assets/hero/hero-background.webp`
- `public/assets/hero/hero-object-01.webp`
- `public/assets/hero/hero-object-02.webp`
- `public/assets/hero/hero-object-03.webp`
- `public/assets/hero/hero-texture.webp`

Recommended image size: 1600x1000 px. Use these for background layers, lighting accents and floating 3D-style decorative surfaces.

## Service imagery

- `public/assets/services/web-development.webp`
- `public/assets/services/app-development.webp`
- `public/assets/services/graphic-design.webp`
- `public/assets/services/video-editing.webp`
- `public/assets/services/digital-marketing.webp`

Recommended size: 1200x700 px. These provide clean visual references for each main service category.

## Portfolio placeholders

- `public/assets/portfolio/ahmed-engineering/preview.webp`
- `public/assets/portfolio/mobile-app/preview.webp`
- `public/assets/portfolio/graphic-design/preview.webp`
- `public/assets/portfolio/video-editing/preview.webp`
- `public/assets/portfolio/digital-marketing/preview.webp`

Recommended size: 1400x900 px. These are used for portfolio previews and can be replaced without changing component logic.

## Supporting visuals

- `public/assets/backgrounds/site-bg.webp`
- `public/assets/icons/brand-mark.webp`
- `public/assets/mockups/desktop-preview.webp`
- `public/assets/mockups/mobile-preview.webp`
- `public/assets/animations/feature-motion.webp`

These are supporting decorative and presentation visuals for the marketing sections and mockup layouts.

## Central asset configuration

All references are centralized in `src/config/assets.ts` so the website can automatically display replacements whenever the same filename is reused.

To replace any asset:

1. Prepare a new image in the same folder.
2. Keep the same filename.
3. Save it with a matching extension and similar aspect ratio.
4. Refresh the page or rebuild the app to see the updated asset immediately.

## Important notes

- Do not remove or rename any file referenced by `src/config/assets.ts`.
- Keep all replacement assets local to the project.
- Avoid broken external image URLs or indirect dependencies.
- If a real founder photo, service image or portfolio preview is added later, the same name should be retained so the app continues working without code changes.

## Motion and performance

- `src/components/KineticText.tsx` provides word- and character-level masked headline reveals.
- `src/components/Marquee.tsx` renders the continuous brand text strips.
- `src/components/ServiceVisual.tsx` and `src/index.css` provide the five service-specific animated illustrations.
- `src/components/HeroScene3D.tsx` contains the native Three.js hero composition. It is dynamically imported only on desktop, when near the viewport, and when reduced motion is not requested.
- The 3D render loop pauses off-screen and when the browser tab is hidden. Mobile and reduced-motion visitors receive the lightweight CSS composition instead.
- Framer Motion and CSS transitions power page changes, scroll reveals, portfolio filtering and accordions. No GSAP ScrollTrigger is needed for these layouts.

Run `npm run assets:generate` to regenerate the local SVG-based preview assets.
