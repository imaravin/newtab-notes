# Technology Stack

**Analysis Date:** 2026-01-09

## Languages

**Primary:**
- JavaScript (ES6+ modules) - All application code (`package.json`, `src/` directory)

**Secondary:**
- HTML5 - UI markup (`src/newtab/index.html`, `index.html`, `privacy.html`)
- CSS3 - Styling (`src/newtab/styles.css`)

## Runtime

**Environment:**
- Node.js (ES modules) - `package.json` specifies `"type": "module"`
- Chrome Browser (Extension API) - Runtime environment via Manifest V3
- No version constraints specified (.nvmrc not present)

**Package Manager:**
- npm - `package.json` and `package-lock.json` present
- Lockfile: `package-lock.json` (committed)

## Frameworks

**Core:**
- Quill.js 2.0.3 - Rich text editor (`package.json` dependencies, `src/utils/quill-config.js`)
- Vanilla JavaScript - No UI framework (no React, Vue, etc.)

**Testing:**
- None detected - No test framework configured

**Build/Dev:**
- Vite 5.0.0 - Build tool and dev server (`vite.config.js`, `package.json` devDependencies)
- Custom build plugin - `copyExtensionFiles()` in `vite.config.js` for extension packaging

## Key Dependencies

**Critical:**
- `quill@^2.0.3` - Rich text editor for note content (`package.json` line 25)
  - Used in: `src/newtab/index.html`, `src/utils/quill-config.js`
  - Loaded as local library: `public/lib/quill.js`, `public/lib/quill.snow.css`

**Infrastructure:**
- Chrome Storage API - Data persistence (`src/services/storage.js`)
- Chrome Extension APIs - Manifest V3 (`manifest.json`)
- Canvas API - Image compression (`src/services/wallpaper.js` lines 57-114)
- FileReader API - File handling (`src/services/wallpaper.js` lines 122-136)

**Development:**
- `sharp@^0.34.5` - Image processing for icon generation (`package.json` line 21)
  - Used in: `create-icons-svg.js`, `convert-svg-to-png.js`
- `vite@^5.0.0` - Build tool (`package.json` line 22)

## Configuration

**Environment:**
- No .env files - Extension uses Chrome storage instead
- Chrome Storage API - 10MB limit enforced (`src/services/storage.js` line 203)
- ES modules throughout (`"type": "module"` in `package.json`)

**Build:**
- `vite.config.js` - Build configuration with custom plugin
  - Custom `copyExtensionFiles()` plugin for manifest and icons
  - `minify: false` set for debugging (line 46)
- `manifest.json` - Chrome Extension manifest V3

## Platform Requirements

**Development:**
- Any platform with Node.js and npm
- No OS-specific dependencies
- Chrome browser for testing

**Production:**
- Chrome Browser (Manifest V3 compatible)
- Distributed as unpacked extension (load from `dist/` folder)
- All data stored locally via Chrome Storage API (no backend required)

---

*Stack analysis: 2026-01-09*
*Update after major dependency changes*
