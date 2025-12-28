// Create SVG icons that we'll convert to PNG
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SVG icon design - notepad with checkmark
function createIconSVG(size) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
  <!-- Background circle -->
  <circle cx="64" cy="64" r="60" fill="#4A90E2"/>

  <!-- Notepad/Document -->
  <rect x="38" y="32" width="52" height="64" rx="4" fill="#FFFFFF"/>

  <!-- Lines on notepad -->
  <line x1="45" y1="45" x2="83" y2="45" stroke="#4A90E2" stroke-width="2" stroke-linecap="round"/>
  <line x1="45" y1="55" x2="83" y2="55" stroke="#4A90E2" stroke-width="2" stroke-linecap="round"/>
  <line x1="45" y1="65" x2="75" y2="65" stroke="#4A90E2" stroke-width="2" stroke-linecap="round"/>

  <!-- Checkmark -->
  <circle cx="64" cy="82" r="12" fill="#27AE60"/>
  <path d="M 59 82 L 62 85 L 69 78" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</svg>`;
}

// Create icons directory
const iconsDir = path.join(__dirname, 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Save SVG files
const sizes = [16, 32, 48, 128];

sizes.forEach(size => {
  const svg = createIconSVG(size);
  const filename = path.join(iconsDir, `icon${size}.svg`);
  fs.writeFileSync(filename, svg);
  console.log(`✓ Created ${filename}`);
});

console.log('\n✓ SVG icons created!');
console.log('\nNext step: Converting SVG to PNG...');
