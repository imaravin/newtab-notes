// Convert SVG icons to PNG using sharp
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.join(__dirname, 'public', 'icons');
const sizes = [16, 32, 48, 128];

async function convertIcons() {
  console.log('Converting SVG icons to PNG...\n');

  for (const size of sizes) {
    const svgPath = path.join(iconsDir, `icon${size}.svg`);
    const pngPath = path.join(iconsDir, `icon${size}.png`);

    try {
      await sharp(svgPath)
        .resize(size, size)
        .png()
        .toFile(pngPath);

      console.log(`✓ Converted icon${size}.svg → icon${size}.png`);
    } catch (error) {
      console.error(`✗ Failed to convert icon${size}.svg:`, error.message);
    }
  }

  console.log('\n✓ All icons converted successfully!');
  console.log('\nNow run: npm run build && cp -r public/icons dist/');
}

convertIcons();
