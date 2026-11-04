import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(process.cwd());
const assetsRoot = path.join(root, 'public', 'assets');
const brandingDir = path.join(assetsRoot, 'branding');
const foundersDir = path.join(assetsRoot, 'founders');
const heroDir = path.join(assetsRoot, 'hero');
const servicesDir = path.join(assetsRoot, 'services');
const portfolioRoot = path.join(assetsRoot, 'portfolio');

const ensureDir = (dir) => fs.mkdirSync(dir, { recursive: true });
const svgToWebp = async (svg, filePath) => {
  await sharp(Buffer.from(svg)).webp({ quality: 90 }).toFile(filePath);
};
const svgToPng = async (svg, filePath) => {
  await sharp(Buffer.from(svg)).png().toFile(filePath);
};

const logoSvg = (variant = 'dark') => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340">
  <defs>
    <linearGradient id="g1" x1="0" x2="1">
      <stop offset="0%" stop-color="#45EAF4"/>
      <stop offset="100%" stop-color="#7AE7FF"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" fill="transparent"/>
  <g transform="translate(30, 20)">
    <rect x="0" y="0" width="220" height="220" rx="52" fill="${variant === 'dark' ? '#0B113B' : '#EAFBFF'}" stroke="url(#g1)" stroke-width="8"/>
    <path d="M62 168L62 52H78L121 129L164 52H180V168H164V98L123 164H112L71 98V168H62Z" fill="${variant === 'dark' ? '#FFFFFF' : '#05082F'}"/>
    <path d="M36 82L44 82L77 82L77 94L58 94L58 173L46 173L46 94L36 94L36 82Z" fill="url(#g1)"/>
    <circle cx="160" cy="164" r="14" fill="url(#g1)"/>
  </g>
  <text x="300" y="130" font-size="82" font-weight="700" font-family="Segoe UI, Arial, sans-serif" fill="${variant === 'dark' ? '#F3F6FF' : '#05082F'}" letter-spacing="5">JA</text>
  <text x="304" y="206" font-size="46" font-weight="600" font-family="Segoe UI, Arial, sans-serif" fill="${variant === 'dark' ? '#45EAF4' : '#0B113B'}" letter-spacing="8">DIGITAL SOLVER</text>
  <rect x="304" y="228" width="250" height="4" rx="2" fill="url(#g1)"/>
</svg>
`;

const artCardSvg = ({ label, bg1, bg2, accent, dark = false, title = '' }) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700">
  <defs>
    <linearGradient id="grad" x1="0" x2="1">
      <stop offset="0%" stop-color="${bg1}"/>
      <stop offset="100%" stop-color="${bg2}"/>
    </linearGradient>
    <filter id="blur"><feGaussianBlur stdDeviation="14"/></filter>
  </defs>
  <rect width="1200" height="700" fill="url(#grad)"/>
  <circle cx="180" cy="130" r="230" fill="${accent}" opacity="0.18" filter="url(#blur)"/>
  <circle cx="1050" cy="580" r="300" fill="#45EAF4" opacity="0.12" filter="url(#blur)"/>
  <rect x="110" y="110" width="980" height="480" rx="32" fill="${dark ? '#081329' : '#F4FBFF'}" fill-opacity="0.72" stroke="${accent}" stroke-opacity="0.8"/>
  <g opacity="0.96">
    <rect x="170" y="170" width="220" height="140" rx="24" fill="${accent}" fill-opacity="0.18"/>
    <rect x="420" y="160" width="280" height="230" rx="28" fill="${dark ? '#10213D' : '#DFF9FF'}"/>
    <rect x="732" y="180" width="220" height="180" rx="28" fill="${accent}" fill-opacity="0.22"/>
    <rect x="610" y="440" width="310" height="100" rx="18" fill="${dark ? '#1A2948' : '#EEF7FF'}"/>
  </g>
  <g>
    <path d="M260 416 L470 290 L680 430 L880 260" stroke="${accent}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="260" cy="416" r="14" fill="${accent}"/>
    <circle cx="470" cy="290" r="12" fill="#FFFFFF" opacity="0.9"/>
    <circle cx="680" cy="430" r="14" fill="${accent}"/>
    <circle cx="880" cy="260" r="12" fill="#FFFFFF" opacity="0.9"/>
  </g>
  <text x="160" y="610" font-size="70" font-weight="700" font-family="Segoe UI, Arial, sans-serif" fill="${dark ? '#F6FBFF' : '#05082F'}" letter-spacing="3">${label}</text>
  <text x="160" y="660" font-size="28" font-weight="500" font-family="Segoe UI, Arial, sans-serif" fill="${dark ? '#A7DAF6' : '#2B416F'}">${title}</text>
</svg>
`;

const founderSvg = ({ name, accent, bg }) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 820">
  <defs>
    <linearGradient id="bg" x1="0" x2="1">
      <stop offset="0%" stop-color="${bg}"/>
      <stop offset="100%" stop-color="#08112f"/>
    </linearGradient>
  </defs>
  <rect width="700" height="820" rx="36" fill="url(#bg)"/>
  <circle cx="350" cy="260" r="180" fill="${accent}" opacity="0.2"/>
  <path d="M250 569 C 260 450, 440 450, 450 569 L 450 680 L 250 680 Z" fill="#DFF9FF" opacity="0.22"/>
  <circle cx="350" cy="274" r="142" fill="#D8F3FF" opacity="0.9"/>
  <path d="M256 575 C 267 475, 433 475, 444 575" stroke="${accent}" stroke-width="16" fill="none" stroke-linecap="round"/>
  <path d="M315 250 C 330 220, 370 220, 385 250" stroke="#08112f" stroke-width="10" fill="none" stroke-linecap="round"/>
  <circle cx="312" cy="305" r="8" fill="#08112f"/>
  <circle cx="388" cy="305" r="8" fill="#08112f"/>
  <path d="M310 355 Q350 390 390 355" stroke="#08112f" stroke-width="10" fill="none" stroke-linecap="round"/>
  <text x="350" y="710" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="42" font-weight="700" fill="#F4FBFF">${name}</text>
</svg>
`;

const renderAssets = async () => {
  ensureDir(brandingDir);
  ensureDir(foundersDir);
  ensureDir(heroDir);
  ensureDir(servicesDir);
  ensureDir(path.join(portfolioRoot, 'ahmed-engineering'));
  ensureDir(path.join(portfolioRoot, 'mobile-app'));
  ensureDir(path.join(portfolioRoot, 'graphic-design'));
  ensureDir(path.join(portfolioRoot, 'video-editing'));
  ensureDir(path.join(portfolioRoot, 'digital-marketing'));

  const sourcePdf = path.join(root, 'JA logo.pdf');
  if (fs.existsSync(sourcePdf)) {
    fs.copyFileSync(sourcePdf, path.join(brandingDir, 'ja-logo-original.pdf'));
  }

  const logoSvgDark = logoSvg('dark');
  const logoSvgLight = logoSvg('light');
  fs.writeFileSync(path.join(brandingDir, 'ja-logo.svg'), logoSvgDark);
  await svgToPng(logoSvgDark, path.join(brandingDir, 'ja-logo-dark.png'));
  await svgToPng(logoSvgLight, path.join(brandingDir, 'ja-logo-light.png'));
  await svgToPng(logoSvgDark, path.join(brandingDir, 'favicon.png'));

  const heroConfigs = [
    { file: 'hero-background.webp', label: 'Digital vision', bg1: '#071126', bg2: '#0b1f3d', accent: '#45EAF4', title: 'Premium growth' },
    { file: 'hero-object-01.webp', label: 'Strategy', bg1: '#0a1839', bg2: '#122d54', accent: '#45EAF4', title: 'Creative systems' },
    { file: 'hero-object-02.webp', label: 'Scale', bg1: '#07142c', bg2: '#11294d', accent: '#7AE7FF', title: 'Digital products' },
    { file: 'hero-object-03.webp', label: 'Launch', bg1: '#0b1834', bg2: '#071826', accent: '#45EAF4', title: 'Launch clarity' },
    { file: 'hero-texture.webp', label: 'Texture', bg1: '#0c1b34', bg2: '#081c2e', accent: '#45EAF4', title: 'Cyan light' },
  ];

  for (const item of heroConfigs) {
    const svg = artCardSvg({ label: item.label, bg1: item.bg1, bg2: item.bg2, accent: item.accent, dark: true, title: item.title });
    await svgToWebp(svg, path.join(heroDir, item.file));
  }

  const founderData = [
    { file: 'junaid-ali.webp', name: 'Junaid Ali', bg: '#0b1838', accent: '#45EAF4' },
    { file: 'umer.webp', name: 'Umer', bg: '#0c1534', accent: '#7AE7FF' },
    { file: 'muzammil.webp', name: 'Muzammil', bg: '#101d38', accent: '#6EE7FF' },
  ];
  for (const founder of founderData) {
    await svgToWebp(founderSvg({ name: founder.name, accent: founder.accent, bg: founder.bg }), path.join(foundersDir, founder.file));
  }

  const serviceCards = [
    { file: 'web-development.webp', label: 'Web Development', bg1: '#08172f', bg2: '#13355b', accent: '#45EAF4' },
    { file: 'app-development.webp', label: 'App Development', bg1: '#071728', bg2: '#183b4d', accent: '#76E4FF' },
    { file: 'graphic-design.webp', label: 'Graphic Design', bg1: '#171629', bg2: '#332d60', accent: '#61d9ff' },
    { file: 'video-editing.webp', label: 'Video Editing', bg1: '#180d1b', bg2: '#341e41', accent: '#65d7f5' },
    { file: 'digital-marketing.webp', label: 'Digital Marketing', bg1: '#0a1527', bg2: '#1c4b5f', accent: '#45EAF4' },
  ];
  for (const item of serviceCards) {
    const svg = artCardSvg({ label: item.label, bg1: item.bg1, bg2: item.bg2, accent: item.accent, dark: true, title: 'Brand-forward digital execution' });
    await svgToWebp(svg, path.join(servicesDir, item.file));
  }

  const portfolioCards = [
    { dir: 'ahmed-engineering', label: 'Ahmed Engineering', title: 'Corporate company website', accent: '#45EAF4', bg1: '#0c1836', bg2: '#162d56' },
    { dir: 'mobile-app', label: 'Mobile App', title: 'App concept design', accent: '#7AE7FF', bg1: '#0f1835', bg2: '#1e2f60' },
    { dir: 'graphic-design', label: 'Brand Identity', title: 'Premium visual language', accent: '#8be8ff', bg1: '#1a1630', bg2: '#352a5f' },
    { dir: 'video-editing', label: 'Video Reels', title: 'Visual storytelling systems', accent: '#9fe3ff', bg1: '#220d26', bg2: '#391d43' },
    { dir: 'digital-marketing', label: 'Growth Campaign', title: 'Audience-first marketing', accent: '#6EE7FF', bg1: '#091a2c', bg2: '#1d4460' },
  ];
  for (const item of portfolioCards) {
    const svg = artCardSvg({ label: item.label, bg1: item.bg1, bg2: item.bg2, accent: item.accent, dark: true, title: item.title });
    await svgToWebp(svg, path.join(portfolioRoot, item.dir, 'preview.webp'));
  }

  const bgSvg = artCardSvg({ label: 'JA Digital Solver', bg1: '#05082F', bg2: '#091a36', accent: '#45EAF4', dark: true, title: 'Premium motion and design' });
  await svgToWebp(bgSvg, path.join(assetsRoot, 'backgrounds', 'site-bg.webp'));
  await svgToWebp(bgSvg, path.join(assetsRoot, 'mockups', 'desktop-preview.webp'));
  await svgToWebp(bgSvg, path.join(assetsRoot, 'mockups', 'mobile-preview.webp'));
  await svgToWebp(bgSvg, path.join(assetsRoot, 'icons', 'brand-mark.webp'));
  await svgToWebp(artCardSvg({ label: 'Motion', bg1: '#08172d', bg2: '#11394b', accent: '#7AE7FF', dark: true, title: 'Animations' }), path.join(assetsRoot, 'animations', 'feature-motion.webp'));

  console.log('Asset generation complete.');
};

renderAssets().catch((error) => {
  console.error(error);
  process.exit(1);
});
