const base = import.meta.env.BASE_URL;
const asset = (path: string) => `${base}assets/${path}`;

export const assets = {
  branding: {
    originalPdf: asset('branding/ja-logo-original.pdf'),
    logoPrimarySvg: asset('branding/logo-primary.svg'),
    logoLightSvg: asset('branding/logo-light.svg'),
    logoPrimaryPng: asset('branding/logo-primary.png'),
    logoLightPng: asset('branding/logo-light.png'),
    favicon: asset('branding/favicon.png'),
  },
  founders: {
    junaid: asset('founders/founder-junaid.webp'),
    umer: asset('founders/founder-umer.webp'),
    muzammil: asset('founders/founder-muzammil.webp'),
  },
  hero: {
    main: asset('hero/hero-main.webp'),
    object1: asset('hero/hero-object-01.webp'),
    object2: asset('hero/hero-object-02.webp'),
    object3: asset('hero/hero-object-03.webp'),
    texture: asset('hero/hero-texture.webp'),
  },
  threeD: {
    heroModel: asset('3d/models/hero-objects.glb'),
    cyanGridTexture: asset('3d/textures/cyan-grid.webp'),
    heroEnvironment: asset('3d/environments/hero-environment.webp'),
  },
  services: {
    webDevelopment: asset('services/service-web-development.webp'),
    appDevelopment: asset('services/service-app-development.webp'),
    uiUxDesign: asset('services/service-ui-ux-design.webp'),
    graphicDesign: asset('services/service-graphic-design.webp'),
    videoEditing: asset('services/service-video-editing.webp'),
    digitalMarketing: asset('services/service-digital-marketing.webp'),
  },
  portfolio: {
    ahmedEngineering: asset('portfolio/portfolio-ahmed-engineering.webp'),
    mobileApp: asset('portfolio/portfolio-mobile-app.webp'),
    graphicDesign: asset('portfolio/portfolio-graphic-design.webp'),
    videoEditing: asset('portfolio/portfolio-video-editing.webp'),
    digitalMarketing: asset('portfolio/portfolio-digital-marketing.webp'),
  },
  videos: {
    videoEditingPreview: asset('videos/video-editing-preview.mp4'),
  },
  backgrounds: {
    site: asset('backgrounds/site-background.webp'),
  },
  animations: {
    featureMotion: asset('animations/feature-motion.webp'),
  },
  mockups: {
    desktop: asset('mockups/desktop-preview.webp'),
    mobile: asset('mockups/mobile-preview.webp'),
  },
  icons: {
    brand: asset('icons/brand-mark.svg'),
  },
} as const;
