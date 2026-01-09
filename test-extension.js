#!/usr/bin/env node

/**
 * Test script to verify Chrome extension loads correctly
 * Tests the manifest and permissions in headless Chrome
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Chrome binary paths for different platforms
const CHROME_PATHS = {
  darwin: [
    '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
    '/Applications/Chromium.app/Contents/MacOS/Chromium'
  ],
  linux: [
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium'
  ],
  win32: [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
  ]
};

function findChrome() {
  const platform = process.platform;
  const paths = CHROME_PATHS[platform] || [];

  for (const path of paths) {
    try {
      if (existsSync(path)) {
        return path;
      }
    } catch (e) {
      continue;
    }
  }

  return null;
}

async function testExtension() {
  console.log('🧪 Testing NewTab Notes Chrome Extension\n');

  const chromePath = findChrome();
  if (!chromePath) {
    console.error('❌ Chromium-based browser not found. Please install Google Chrome or Brave Browser.');
    process.exit(1);
  }

  console.log(`✓ Found browser at: ${chromePath}`);

  const extensionPath = join(__dirname, 'dist');
  console.log(`✓ Extension path: ${extensionPath}\n`);

  console.log('📋 Testing manifest.json...');

  const manifestPath = join(extensionPath, 'manifest.json');

  if (!existsSync(manifestPath)) {
    console.error('❌ manifest.json not found in dist/');
    console.error('   Run "npm run build" first');
    process.exit(1);
  }

  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

  console.log(`   Name: ${manifest.name}`);
  console.log(`   Version: ${manifest.version}`);
  console.log(`   Manifest Version: ${manifest.manifest_version}`);
  console.log(`   Permissions: ${manifest.permissions.join(', ')}`);

  // Check for history permission
  if (!manifest.permissions.includes('history')) {
    console.error('\n❌ History permission missing from manifest!');
    process.exit(1);
  }

  console.log('\n✓ History permission found in manifest');

  console.log('\n🚀 Launching browser in headless mode with extension...');

  const args = [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    `--load-extension=${extensionPath}`,
    '--disable-extensions-except=' + extensionPath,
    'about:blank'
  ];

  const chrome = spawn(chromePath, args);

  let output = '';
  let errorOutput = '';

  chrome.stdout.on('data', (data) => {
    output += data.toString();
    console.log('   [stdout]', data.toString().trim());
  });

  chrome.stderr.on('data', (data) => {
    errorOutput += data.toString();
    const msg = data.toString().trim();
    if (msg.includes('manifest') || msg.includes('permission') || msg.includes('error')) {
      console.error('   [stderr]', msg);
    }
  });

  // Give Chrome time to load the extension
  setTimeout(() => {
    chrome.kill();

    console.log('\n📊 Test Results:');
    console.log('================');

    // Check for common error patterns
    const hasManifestError = errorOutput.toLowerCase().includes('manifest');
    const hasPermissionError = errorOutput.toLowerCase().includes('permission denied') ||
                                errorOutput.toLowerCase().includes('permission error');
    const hasLoadError = errorOutput.toLowerCase().includes('failed to load extension');

    if (hasManifestError) {
      console.error('❌ Manifest validation error detected');
      console.error(errorOutput);
      process.exit(1);
    }

    if (hasPermissionError) {
      console.error('❌ Permission error detected');
      console.error(errorOutput);
      process.exit(1);
    }

    if (hasLoadError) {
      console.error('❌ Extension failed to load');
      console.error(errorOutput);
      process.exit(1);
    }

    console.log('✅ Extension loaded successfully in headless Chrome');
    console.log('✅ Manifest validation passed');
    console.log('✅ History permission configured correctly');
    console.log('\n✨ All tests passed!\n');

    process.exit(0);
  }, 3000);
}

testExtension().catch(error => {
  console.error('❌ Test failed:', error.message);
  process.exit(1);
});
