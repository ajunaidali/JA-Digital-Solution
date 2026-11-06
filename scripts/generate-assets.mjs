import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import ffmpegPath from 'ffmpeg-static';
import sharp from 'sharp';

const execFileAsync = promisify(execFile);
const root = path.resolve(process.cwd());
const assetsRoot = path.join(root, 'public', 'assets');
const brandingDir = path.join(assetsRoot, 'branding');
const foundersDir = path.join(assetsRoot, 'founders');
const heroDir = path.join(assetsRoot, 'hero');
const servicesDir = path.join(assetsRoot, 'services');
const portfolioRoot = path.join(assetsRoot, 'portfolio');
const threeDir = path.join(assetsRoot, '3d');
const videoDir = path.join(assetsRoot, 'videos');
const backgroundDir = path.join(assetsRoot, 'backgrounds');
const mockupDir = path.join(assetsRoot, 'mockups');
const iconDir = path.join(assetsRoot, 'icons');
const animationDir = path.join(assetsRoot, 'animations');

if (!process.argv.includes('--overwrite-existing-assets')) {
  throw new Error('This generator overwrites submitted assets. To explicitly restore demo assets, rerun with --overwrite-existing-assets.');
}

const ensureDir = (dir) => fs.mkdirSync(dir, { recursive: true });
const svgToWebp = async (svg, filePath) => {
  await sharp(Buffer.from(svg)).webp({ quality: 90 }).toFile(filePath);
};
const svgToPng = async (svg, filePath) => {
  await sharp(Buffer.from(svg)).png().toFile(filePath);
};

const logoSvg = (variant = 'dark') => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 150" role="img" aria-labelledby="title description">
  <title id="title">JA Digital Solver temporary text logo</title>
  <desc id="description">Replaceable text-only wordmark. The supplied source PDF renders as a blank page.</desc>
  <text x="8" y="111" font-size="108" font-weight="750" font-family="Segoe UI, Arial, sans-serif" fill="${variant === 'dark' ? '#FFFFFF' : '#05082F'}" letter-spacing="-8">JA</text>
  <path d="M202 32V118" stroke="${variant === 'dark' ? '#45EAF4' : '#087F91'}" stroke-width="3"/>
  <text x="232" y="73" font-size="39" font-weight="650" font-family="Segoe UI, Arial, sans-serif" fill="${variant === 'dark' ? '#FFFFFF' : '#05082F'}" letter-spacing="4">DIGITAL</text>
  <text x="235" y="112" font-size="24" font-weight="500" font-family="Segoe UI, Arial, sans-serif" fill="${variant === 'dark' ? '#45EAF4' : '#087F91'}" letter-spacing="9">SOLVER</text>
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

const motionFrameSvg = (frame, totalFrames, accent, label) => {
  const progress = frame / totalFrames;
  const orbitX = 455 + Math.cos(progress * Math.PI * 2) * 92;
  const orbitY = 250 + Math.sin(progress * Math.PI * 2) * 72;
  const trailX = 470 + Math.sin(progress * Math.PI * 2) * 270;
  const titleY = 300 + Math.sin(progress * Math.PI * 2) * 8;

  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#05082f"/><stop offset="1" stop-color="#102c49"/>
      </linearGradient>
      <radialGradient id="glow"><stop offset="0" stop-color="${accent}" stop-opacity=".42"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="960" height="540" fill="url(#bg)"/>
    <circle cx="${orbitX}" cy="${orbitY}" r="228" fill="url(#glow)"/>
    <path d="M0 438 C 170 370, 310 512, 482 420 S 780 356, 960 427" fill="none" stroke="${accent}" stroke-opacity=".16" stroke-width="1"/>
    <path d="M0 462 C 185 398, 310 530, 508 440 S 800 383, 960 446" fill="none" stroke="#d7faff" stroke-opacity=".12" stroke-width="1"/>
    <g transform="translate(${orbitX} ${orbitY}) rotate(${progress * 360})">
      <rect x="-108" y="-108" width="216" height="216" rx="46" fill="#0c2747" fill-opacity=".72" stroke="${accent}" stroke-opacity=".82" stroke-width="2"/>
      <path d="M-65 42 L-18 -34 L27 23 L71 -47" fill="none" stroke="${accent}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="-65" cy="42" r="7" fill="#fff"/><circle cx="-18" cy="-34" r="7" fill="${accent}"/>
      <circle cx="27" cy="23" r="7" fill="#fff"/><circle cx="71" cy="-47" r="7" fill="${accent}"/>
    </g>
    <circle cx="${trailX}" cy="180" r="5" fill="#fff"/>
    <path d="M125 179 H ${trailX - 18}" stroke="${accent}" stroke-opacity=".42" stroke-width="1"/>
    <text x="72" y="${titleY}" fill="#f3fbff" font-family="Segoe UI,Arial,sans-serif" font-size="36" font-weight="600" letter-spacing="3">${label}</text>
    <text x="74" y="341" fill="${accent}" font-family="Segoe UI,Arial,sans-serif" font-size="13" letter-spacing="5">FRAME / FORM / FEEL</text>
    <text x="74" y="478" fill="#d8efff" fill-opacity=".65" font-family="Segoe UI,Arial,sans-serif" font-size="11" letter-spacing="4">JA DIGITAL SOLVER — MOTION STUDY 01</text>
    <path d="M76 500 H884" stroke="#d8efff" stroke-opacity=".2"/>
    <circle cx="${76 + progress * 808}" cy="500" r="4" fill="${accent}"/>
  </svg>`;
};

const createGlb = () => {
  const geometries = [
    {
      name: 'Cyan glass cube',
      material: 0,
      positions: [
        -0.5,-0.5,0.5, 0.5,-0.5,0.5, 0.5,0.5,0.5, -0.5,-0.5,0.5, 0.5,0.5,0.5, -0.5,0.5,0.5,
        0.5,-0.5,-0.5, -0.5,-0.5,-0.5, -0.5,0.5,-0.5, 0.5,-0.5,-0.5, -0.5,0.5,-0.5, 0.5,0.5,-0.5,
        -0.5,-0.5,-0.5, -0.5,-0.5,0.5, -0.5,0.5,0.5, -0.5,-0.5,-0.5, -0.5,0.5,0.5, -0.5,0.5,-0.5,
        0.5,-0.5,0.5, 0.5,-0.5,-0.5, 0.5,0.5,-0.5, 0.5,-0.5,0.5, 0.5,0.5,-0.5, 0.5,0.5,0.5,
        -0.5,0.5,0.5, 0.5,0.5,0.5, 0.5,0.5,-0.5, -0.5,0.5,0.5, 0.5,0.5,-0.5, -0.5,0.5,-0.5,
        -0.5,-0.5,-0.5, 0.5,-0.5,-0.5, 0.5,-0.5,0.5, -0.5,-0.5,-0.5, 0.5,-0.5,0.5, -0.5,-0.5,0.5,
      ],
      indices: Array.from({ length: 36 }, (_, index) => index),
    },
    {
      name: 'Faceted prism',
      material: 1,
      positions: [
        0,0.8,0, 0.7,0,0, 0,0,0.7, 0,0.8,0, 0,0,0.7, -0.7,0,0,
        0,0.8,0, -0.7,0,0, 0,0,-0.7, 0,0.8,0, 0,0,-0.7, 0.7,0,0,
        0,-0.8,0, 0,0,0.7, 0.7,0,0, 0,-0.8,0, -0.7,0,0, 0,0,0.7,
        0,-0.8,0, 0,0,-0.7, -0.7,0,0, 0,-0.8,0, 0.7,0,0, 0,0,-0.7,
      ],
      indices: Array.from({ length: 24 }, (_, index) => index),
    },
  ];

  const binaryParts = [];
  const bufferViews = [];
  const accessors = [];
  const meshes = [];
  let byteOffset = 0;

  geometries.forEach((geometry, index) => {
    const positionBytes = Buffer.alloc(geometry.positions.length * 4);
    geometry.positions.forEach((value, positionIndex) => positionBytes.writeFloatLE(value, positionIndex * 4));
    const positionOffset = byteOffset;
    binaryParts.push(positionBytes);
    byteOffset += positionBytes.length;
    bufferViews.push({ buffer: 0, byteOffset: positionOffset, byteLength: positionBytes.length, target: 34962 });
    const coordinates = Array.from({ length: geometry.positions.length / 3 }, (_, vertex) => [
      geometry.positions[vertex * 3],
      geometry.positions[vertex * 3 + 1],
      geometry.positions[vertex * 3 + 2],
    ]);
    accessors.push({
      bufferView: bufferViews.length - 1,
      componentType: 5126,
      count: coordinates.length,
      type: 'VEC3',
      min: [0, 1, 2].map((axis) => Math.min(...coordinates.map((point) => point[axis]))),
      max: [0, 1, 2].map((axis) => Math.max(...coordinates.map((point) => point[axis]))),
    });
    const positionAccessor = accessors.length - 1;

    const indexBytes = Buffer.alloc(geometry.indices.length * 2);
    geometry.indices.forEach((value, indexValue) => indexBytes.writeUInt16LE(value, indexValue * 2));
    const indexOffset = byteOffset;
    binaryParts.push(indexBytes);
    byteOffset += indexBytes.length;
    bufferViews.push({ buffer: 0, byteOffset: indexOffset, byteLength: indexBytes.length, target: 34963 });
    accessors.push({ bufferView: bufferViews.length - 1, componentType: 5123, count: geometry.indices.length, type: 'SCALAR', min: [0], max: [geometry.indices.length - 1] });
    const indexAccessor = accessors.length - 1;

    meshes.push({ name: geometry.name, primitives: [{ attributes: { POSITION: positionAccessor }, indices: indexAccessor, material: geometry.material }] });
  });

  const gltf = {
    asset: { version: '2.0', generator: 'JA Digital Solver asset generator' },
    scene: 0,
    scenes: [{ nodes: [0, 1] }],
    nodes: [
      { name: 'Cyan glass cube', mesh: 0, translation: [-0.8, 0, 0], rotation: [0.12, 0.2, 0.05, 0.97] },
      { name: 'Faceted prism', mesh: 1, translation: [0.72, 0.08, 0.08], scale: [0.9, 0.9, 0.9] },
    ],
    meshes,
    materials: [
      { name: 'JA electric cyan', pbrMetallicRoughness: { baseColorFactor: [0.12, 0.83, 0.9, 1], metallicFactor: 0.72, roughnessFactor: 0.18 }, emissiveFactor: [0.02, 0.16, 0.18] },
      { name: 'JA polished silver', pbrMetallicRoughness: { baseColorFactor: [0.78, 0.93, 0.97, 1], metallicFactor: 0.9, roughnessFactor: 0.14 } },
    ],
    buffers: [{ byteLength: byteOffset }],
    bufferViews,
    accessors,
  };

  const binary = Buffer.concat(binaryParts);
  const jsonChunk = Buffer.from(JSON.stringify(gltf));
  const jsonPadding = (4 - (jsonChunk.length % 4)) % 4;
  const binPadding = (4 - (binary.length % 4)) % 4;
  const paddedJson = Buffer.concat([jsonChunk, Buffer.alloc(jsonPadding, 0x20)]);
  const paddedBin = Buffer.concat([binary, Buffer.alloc(binPadding)]);
  const totalLength = 12 + 8 + paddedJson.length + 8 + paddedBin.length;
  const header = Buffer.alloc(12);
  header.writeUInt32LE(0x46546c67, 0);
  header.writeUInt32LE(2, 4);
  header.writeUInt32LE(totalLength, 8);
  const jsonHeader = Buffer.alloc(8);
  jsonHeader.writeUInt32LE(paddedJson.length, 0);
  jsonHeader.writeUInt32LE(0x4e4f534a, 4);
  const binHeader = Buffer.alloc(8);
  binHeader.writeUInt32LE(paddedBin.length, 0);
  binHeader.writeUInt32LE(0x004e4942, 4);
  return Buffer.concat([header, jsonHeader, paddedJson, binHeader, paddedBin]);
};

const renderVideo = async ({ fileName, label, accent, tempDir }) => {
  const frameDir = path.join(tempDir, path.parse(fileName).name);
  ensureDir(frameDir);
  const totalFrames = 72;

  for (let frame = 0; frame < totalFrames; frame += 1) {
    const svg = motionFrameSvg(frame, totalFrames, accent, label);
    await sharp(Buffer.from(svg)).png().toFile(path.join(frameDir, `frame-${String(frame).padStart(3, '0')}.png`));
  }

  await execFileAsync(ffmpegPath, [
    '-hide_banner', '-loglevel', 'error', '-y',
    '-framerate', '24',
    '-i', path.join(frameDir, 'frame-%03d.png'),
    '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '26', '-profile:v', 'baseline', '-level', '3.0',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-t', '3',
    path.join(videoDir, fileName),
  ], { windowsHide: true });
};

const renderAssets = async () => {
  ensureDir(brandingDir);
  ensureDir(foundersDir);
  ensureDir(heroDir);
  ensureDir(servicesDir);
  ensureDir(path.join(threeDir, 'models'));
  ensureDir(path.join(threeDir, 'textures'));
  ensureDir(path.join(threeDir, 'environments'));
  ensureDir(videoDir);
  ensureDir(backgroundDir);
  ensureDir(mockupDir);
  ensureDir(iconDir);
  ensureDir(animationDir);
  ensureDir(portfolioRoot);

  const sourcePdf = path.join(root, 'JA logo.pdf');
  if (fs.existsSync(sourcePdf)) {
    fs.copyFileSync(sourcePdf, path.join(brandingDir, 'ja-logo-original.pdf'));
  }

  const logoSvgDark = logoSvg('dark');
  const logoSvgLight = logoSvg('light');
  const faviconSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      <rect width="256" height="256" rx="56" fill="#05082F"/>
      <text x="128" y="164" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="116" font-weight="700" letter-spacing="-9" fill="#FFFFFF">JA</text>
      <path d="M52 193 H204" stroke="#45EAF4" stroke-width="8" stroke-linecap="round"/>
    </svg>`;
  fs.writeFileSync(path.join(brandingDir, 'logo-primary.svg'), logoSvgDark);
  fs.writeFileSync(path.join(brandingDir, 'logo-light.svg'), logoSvgLight);
  await svgToPng(logoSvgDark, path.join(brandingDir, 'logo-primary.png'));
  await svgToPng(logoSvgLight, path.join(brandingDir, 'logo-light.png'));
  await svgToPng(faviconSvg, path.join(brandingDir, 'favicon.png'));
  fs.writeFileSync(
    path.join(iconDir, 'brand-mark.svg'),
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect x="7" y="7" width="114" height="114" rx="28" fill="#05082F" stroke="#45EAF4" stroke-width="3"/><text x="64" y="81" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="54" font-weight="700" letter-spacing="-5" fill="#FFFFFF">JA</text></svg>',
  );

  const heroConfigs = [
    { file: 'hero-main.webp', label: 'Digital vision', bg1: '#071126', bg2: '#0b1f3d', accent: '#45EAF4', title: 'Premium growth' },
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
    { file: 'founder-junaid.webp', name: 'Junaid Ali', bg: '#0b1838', accent: '#45EAF4' },
    { file: 'founder-umer.webp', name: 'Umer', bg: '#0c1534', accent: '#7AE7FF' },
    { file: 'founder-muzammil.webp', name: 'Muzammil', bg: '#101d38', accent: '#6EE7FF' },
  ];
  for (const founder of founderData) {
    await svgToWebp(founderSvg({ name: founder.name, accent: founder.accent, bg: founder.bg }), path.join(foundersDir, founder.file));
  }

  const serviceCards = [
    { file: 'service-web-development.webp', label: 'Web Development', bg1: '#08172f', bg2: '#13355b', accent: '#45EAF4' },
    { file: 'service-app-development.webp', label: 'App Development', bg1: '#071728', bg2: '#183b4d', accent: '#76E4FF' },
    { file: 'service-ui-ux-design.webp', label: 'UI/UX Design', bg1: '#081b33', bg2: '#165065', accent: '#78eaff' },
    { file: 'service-graphic-design.webp', label: 'Graphic Design', bg1: '#171629', bg2: '#332d60', accent: '#61d9ff' },
    { file: 'service-video-editing.webp', label: 'Video Editing', bg1: '#180d1b', bg2: '#341e41', accent: '#65d7f5' },
    { file: 'service-digital-marketing.webp', label: 'Digital Marketing', bg1: '#0a1527', bg2: '#1c4b5f', accent: '#45EAF4' },
  ];
  for (const item of serviceCards) {
    const svg = artCardSvg({ label: item.label, bg1: item.bg1, bg2: item.bg2, accent: item.accent, dark: true, title: 'Brand-forward digital execution' });
    await svgToWebp(svg, path.join(servicesDir, item.file));
  }

  const portfolioCards = [
    { file: 'portfolio-ahmed-engineering.webp', label: 'Ahmed Engineering', title: 'Real corporate website project', accent: '#45EAF4', bg1: '#0c1836', bg2: '#162d56' },
    { file: 'portfolio-mobile-app.webp', label: 'Mobile App', title: 'Concept sample / app design', accent: '#7AE7FF', bg1: '#0f1835', bg2: '#1e2f60' },
    { file: 'portfolio-graphic-design.webp', label: 'Brand Identity', title: 'Concept sample / brand system', accent: '#8be8ff', bg1: '#1a1630', bg2: '#352a5f' },
    { file: 'portfolio-video-editing.webp', label: 'Video Reels', title: 'Concept sample / motion study', accent: '#9fe3ff', bg1: '#220d26', bg2: '#391d43' },
    { file: 'portfolio-digital-marketing.webp', label: 'Growth Campaign', title: 'Concept sample / campaign visuals', accent: '#6EE7FF', bg1: '#091a2c', bg2: '#1d4460' },
  ];
  for (const item of portfolioCards) {
    const svg = artCardSvg({ label: item.label, bg1: item.bg1, bg2: item.bg2, accent: item.accent, dark: true, title: item.title });
    await svgToWebp(svg, path.join(portfolioRoot, item.file));
  }

  const bgSvg = artCardSvg({ label: 'JA Digital Solver', bg1: '#05082F', bg2: '#091a36', accent: '#45EAF4', dark: true, title: 'Premium motion and design' });
  await svgToWebp(bgSvg, path.join(backgroundDir, 'site-background.webp'));
  await svgToWebp(bgSvg, path.join(mockupDir, 'desktop-preview.webp'));
  await svgToWebp(bgSvg, path.join(mockupDir, 'mobile-preview.webp'));
  await svgToWebp(artCardSvg({ label: 'Motion', bg1: '#08172d', bg2: '#11394b', accent: '#7AE7FF', dark: true, title: 'Animations' }), path.join(animationDir, 'feature-motion.webp'));
  await svgToWebp(artCardSvg({ label: 'Environment', bg1: '#05082f', bg2: '#0b1f3d', accent: '#45EAF4', dark: true, title: 'Procedural cyan environment' }), path.join(threeDir, 'environments', 'hero-environment.webp'));
  await svgToWebp(artCardSvg({ label: 'Grid texture', bg1: '#071126', bg2: '#0b1f3d', accent: '#45EAF4', dark: true, title: 'Subtle 3D surface texture' }), path.join(threeDir, 'textures', 'cyan-grid.webp'));
  fs.writeFileSync(path.join(threeDir, 'models', 'hero-objects.glb'), createGlb());

  const videoTempDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'ja-digital-solver-video-'));
  try {
    await renderVideo({ fileName: 'video-editing-preview.mp4', label: 'MOTION STUDY', accent: '#45EAF4', tempDir: videoTempDir });
  } finally {
    await fs.promises.rm(videoTempDir, { recursive: true, force: true });
  }

  const legacyFiles = [
    'videos/video-editing-preview.webm',
    'branding/ja-logo-dark.png',
    'branding/ja-logo-light.png',
    'branding/ja-logo.svg',
    'founders/junaid-ali.webp',
    'founders/umer.webp',
    'founders/muzammil.webp',
    'hero/hero-background.webp',
    'services/web-development.webp',
    'services/app-development.webp',
    'services/graphic-design.webp',
    'services/video-editing.webp',
    'services/digital-marketing.webp',
    'backgrounds/site-bg.webp',
    'icons/brand-mark.webp',
    'portfolio/ahmed-engineering/preview.webp',
    'portfolio/mobile-app/preview.webp',
    'portfolio/graphic-design/preview.webp',
    'portfolio/video-editing/preview.webp',
    'portfolio/digital-marketing/preview.webp',
  ];
  for (const relativePath of legacyFiles) {
    await fs.promises.rm(path.join(assetsRoot, relativePath), { force: true });
  }
  for (const legacyDirectory of [
    'portfolio/ahmed-engineering',
    'portfolio/mobile-app',
    'portfolio/graphic-design',
    'portfolio/video-editing',
    'portfolio/digital-marketing',
  ]) {
    await fs.promises.rmdir(path.join(assetsRoot, legacyDirectory)).catch((error) => {
      if (error.code !== 'ENOENT' && error.code !== 'ENOTEMPTY') throw error;
    });
  }

  console.log('Asset generation complete.');
};

renderAssets().catch((error) => {
  console.error(error);
  process.exit(1);
});
