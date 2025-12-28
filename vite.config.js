import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync, mkdirSync, existsSync } from 'fs';

// Plugin to copy manifest and icons to dist
function copyExtensionFiles() {
  return {
    name: 'copy-extension-files',
    closeBundle() {
      // Copy manifest.json to dist
      copyFileSync('manifest.json', 'dist/manifest.json');
      console.log('✓ Copied manifest.json to dist/');

      // Copy icons to dist
      if (!existsSync('dist/icons')) {
        mkdirSync('dist/icons', { recursive: true });
      }

      // Copy lib folder (Quill.js) to dist
      if (!existsSync('dist/lib')) {
        mkdirSync('dist/lib', { recursive: true });
      }

      // Note: Icons need to be manually created in public/icons/
      // This just creates the directory structure
      console.log('✓ Created dist/icons/ and dist/lib/ directories');
      console.log('⚠ Remember to run: cp -r public/icons dist/ && cp -r public/lib dist/');
    }
  };
}

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        newtab: resolve(__dirname, 'src/newtab/index.html'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    },
    // Don't minify for easier debugging during development
    minify: false,
  },
  // Ensure compatibility with Chrome extension
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  },
  plugins: [copyExtensionFiles()]
});
