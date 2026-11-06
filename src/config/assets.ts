const base = import.meta.env.BASE_URL;
const asset = (path: string) => `${base}assets/${path}`;

export const assets = {
  branding: {
    originalPdf: asset('branding/ja-logo-original.pdf'),
    logoPrimarySvg: asset('branding/logo-primary.svg'),
    logoPrimaryPng: asset('branding/logo-primary.png'),
    favicon: asset('branding/favicon-square.png'),
    faviconSource: asset('branding/favicon.png'),
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
    videoEditingPreview: asset('videos/video-editing-preview-optimized.mp4'),
    videoEditingOriginal: asset('videos/video-editing-preview.mp4'),
  },
  animations: {
    featureMotion: asset('animations/feature-motion.webp'),
    heroLottieJson: asset('3d/models/hero-objects.json'),
  },
  backgrounds: {
    site: asset('backgrounds/site-background-optimized.webp'),
    siteOriginal: asset('backgrounds/site-background.webp'),
  },
} as const;
