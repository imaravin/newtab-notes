// Simple script to generate placeholder icon files
// These are minimal valid PNG files

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Minimal 1x1 blue PNG (base64 encoded)
const bluePNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
  'base64'
);

// Create icons directory
const iconsDir = path.join(__dirname, 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Create placeholder icon files
const sizes = [16, 32, 48, 128];

sizes.forEach(size => {
  const filename = path.join(iconsDir, `icon${size}.png`);
  fs.writeFileSync(filename, bluePNG);
  console.log(`✓ Created ${filename}`);
});

console.log('\n✓ Placeholder icons created successfully!');
console.log('⚠ These are minimal 1x1 placeholder icons.');
console.log('For production, replace them with proper icons from:');
console.log('  - https://www.favicon-generator.org/');
console.log('  - https://realfavicongenerator.net/');
