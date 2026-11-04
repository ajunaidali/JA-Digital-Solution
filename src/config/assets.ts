const base = import.meta.env.BASE_URL;

export const assets = {
  branding: {
    logoOriginal: `${base}assets/branding/ja-logo-original.pdf`,
    logoDark: `${base}assets/branding/ja-logo-dark.png`,
    logoLight: `${base}assets/branding/ja-logo-light.png`,
    logoSvg: `${base}assets/branding/ja-logo.svg`,
    favicon: `${base}assets/branding/favicon.png`,
  },
  founders: {
    junaid: `${base}assets/founders/junaid-ali.webp`,
    umer: `${base}assets/founders/umer.webp`,
    muzammil: `${base}assets/founders/muzammil.webp`,
  },
  hero: {
    background: `${base}assets/hero/hero-background.webp`,
    object1: `${base}assets/hero/hero-object-01.webp`,
    object2: `${base}assets/hero/hero-object-02.webp`,
    object3: `${base}assets/hero/hero-object-03.webp`,
    texture: `${base}assets/hero/hero-texture.webp`,
  },
  services: {
    webDevelopment: `${base}assets/services/web-development.webp`,
    appDevelopment: `${base}assets/services/app-development.webp`,
    graphicDesign: `${base}assets/services/graphic-design.webp`,
    videoEditing: `${base}assets/services/video-editing.webp`,
    digitalMarketing: `${base}assets/services/digital-marketing.webp`,
  },
  portfolio: {
    ahmedEngineering: `${base}assets/portfolio/ahmed-engineering/preview.webp`,
    mobileApp: `${base}assets/portfolio/mobile-app/preview.webp`,
    graphicDesign: `${base}assets/portfolio/graphic-design/preview.webp`,
    videoEditing: `${base}assets/portfolio/video-editing/preview.webp`,
    digitalMarketing: `${base}assets/portfolio/digital-marketing/preview.webp`,
  },
  backgrounds: {
    siteBg: `${base}assets/backgrounds/site-bg.webp`,
    abstract: `${base}assets/animations/feature-motion.webp`,
  },
  mockups: {
    desktop: `${base}assets/mockups/desktop-preview.webp`,
    mobile: `${base}assets/mockups/mobile-preview.webp`,
  },
  icons: {
    brand: `${base}assets/icons/brand-mark.webp`,
  },
} as const;
