import fs from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import ffmpegPath from 'ffmpeg-static';
import sharp from 'sharp';

const execFileAsync = promisify(execFile);
const root = path.resolve(process.cwd());
const assetsRoot = path.join(root, 'public', 'assets');
const manifestPath = path.join(root, 'src', 'config', 'assets.ts');
const manifest = fs.readFileSync(manifestPath, 'utf8');
const assetPaths = Array.from(manifest.matchAll(/asset\('([^']+)'\)/g), (match) => match[1]);
const requiredDirectories = [
  'branding', 'founders', 'hero', '3d', 'services', 'portfolio', 'videos',
  'backgrounds', 'icons', 'mockups', 'animations',
];

if (assetPaths.length === 0) throw new Error('No local asset paths were found in src/config/assets.ts.');

for (const directory of requiredDirectories) {
  const resolvedDirectory = path.join(assetsRoot, directory);
  if (!fs.existsSync(resolvedDirectory) || !fs.readdirSync(resolvedDirectory).length) {
    throw new Error(`Required asset directory is missing or empty: public/assets/${directory}`);
  }
}

for (const assetPath of assetPaths) {
  const filePath = path.join(assetsRoot, assetPath);
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    throw new Error(`Manifest asset is missing: public/assets/${assetPath}`);
  }

  if (/\.(png|webp|jpe?g|avif)$/i.test(filePath)) {
    const metadata = await sharp(filePath).metadata();
    if (!metadata.width || !metadata.height) throw new Error(`Image has invalid dimensions: ${assetPath}`);
    if (assetPath.endsWith('branding/favicon-square.png') && (metadata.width !== metadata.height || metadata.width < 128)) {
      throw new Error(`Square favicon dimensions are invalid: ${assetPath}`);
    }
  } else if (/\.(mp4|webm)$/i.test(filePath)) {
    await execFileAsync(ffmpegPath, [
      '-hide_banner', '-loglevel', 'error', '-i', filePath, '-f', 'null', '-',
    ], { windowsHide: true });
  } else if (/\.json$/i.test(filePath)) {
    const animation = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (
      typeof animation.v !== 'string'
      || !Number.isFinite(animation.fr) || animation.fr <= 0
      || !Number.isFinite(animation.ip)
      || !Number.isFinite(animation.op) || animation.op <= animation.ip
      || !Number.isFinite(animation.w) || animation.w <= 0
      || !Number.isFinite(animation.h) || animation.h <= 0
      || !Array.isArray(animation.layers)
    ) {
      throw new Error(`Lottie animation structure is invalid: ${assetPath}`);
    }
  } else if (/\.pdf$/i.test(filePath)) {
    if (fs.readFileSync(filePath).subarray(0, 5).toString('ascii') !== '%PDF-') {
      throw new Error(`PDF signature is invalid: ${assetPath}`);
    }
  } else if (/\.svg$/i.test(filePath)) {
    if (!fs.readFileSync(filePath, 'utf8').includes('<svg')) throw new Error(`SVG content is invalid: ${assetPath}`);
  }
}

const lottiePath = assetPaths.find((assetPath) => /\.json$/i.test(assetPath));
const lottie = lottiePath ? JSON.parse(fs.readFileSync(path.join(assetsRoot, lottiePath), 'utf8')) : null;
const lottieSummary = lottie ? ` Lottie animation: ${lottie.layers.length} layers, ${((lottie.op - lottie.ip) / lottie.fr).toFixed(1)} seconds.` : '';
console.log(`Verified ${assetPaths.length} manifest assets, required asset directories, image dimensions, video decoding, and JSON animation structure.${lottieSummary}`);
