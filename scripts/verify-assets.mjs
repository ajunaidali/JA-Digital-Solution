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

  if (/\.(png|webp|jpe?g)$/i.test(filePath)) {
    const metadata = await sharp(filePath).metadata();
    if (!metadata.width || !metadata.height) throw new Error(`Image has invalid dimensions: ${assetPath}`);
  } else if (/\.(mp4|webm)$/i.test(filePath)) {
    await execFileAsync(ffmpegPath, [
      '-hide_banner', '-loglevel', 'error', '-i', filePath, '-f', 'null', '-',
    ], { windowsHide: true });
  } else if (/\.glb$/i.test(filePath)) {
    const buffer = fs.readFileSync(filePath);
    if (buffer.length < 20 || buffer.toString('ascii', 0, 4) !== 'glTF' || buffer.readUInt32LE(4) !== 2 || buffer.readUInt32LE(8) !== buffer.length) {
      throw new Error(`GLB header or length is invalid: ${assetPath}`);
    }
  } else if (/\.pdf$/i.test(filePath)) {
    if (fs.readFileSync(filePath).subarray(0, 5).toString('ascii') !== '%PDF-') {
      throw new Error(`PDF signature is invalid: ${assetPath}`);
    }
  } else if (/\.svg$/i.test(filePath)) {
    if (!fs.readFileSync(filePath, 'utf8').includes('<svg')) throw new Error(`SVG content is invalid: ${assetPath}`);
  }
}

console.log(`Verified ${assetPaths.length} manifest assets, required asset directories, image dimensions, video decoding, and GLB structure.`);
