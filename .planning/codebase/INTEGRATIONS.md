# External Integrations

**Analysis Date:** 2026-01-09

## APIs & External Services

**No external API integrations detected.**

This extension is completely standalone with no external service dependencies.

## Data Storage

**Databases:**
- Chrome Storage API (`chrome.storage.local`) - Local data persistence
  - Connection: Via `src/services/storage.js` (lines 15-108)
  - Storage limit: 10MB enforced (`src/services/storage.js` line 203)
  - Data stored: notes, folders, settings, wallpaper (base64), search index
  - Permission: `"storage"` in `manifest.json` line 8

**File Storage:**
- No external file storage (S3, etc.)
- Wallpapers stored as base64 data URIs in Chrome Storage
  - Compression: Canvas-based JPEG compression to keep under 5MB (`src/services/wallpaper.js` lines 57-114)

**Caching:**
- No external caching layer
- Search index cached in Chrome Storage (`src/services/search.js`)

## Authentication & Identity

**Auth Provider:**
- None - No authentication required
- Extension works locally per Chrome profile
- No user accounts or cloud sync

## Monitoring & Observability

**Error Tracking:**
- None - Uses `console.error()` only

**Analytics:**
- None detected

**Logs:**
- Console logging only (browser DevTools)

## CI/CD & Deployment

**Hosting:**
- Local installation only (unpacked extension)
- No automated deployment
- Build command: `npm run build` produces `dist/` folder

**CI Pipeline:**
- None configured
- No GitHub Actions or other CI

## Environment Configuration

**Development:**
- No environment variables required
- Chrome storage used for all configuration
- No `.env` files

**Production:**
- Identical to development
- No separate production configuration

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

## Browser APIs Used

**Chrome Extension APIs:**
- `chrome.storage.local` - Data persistence (`manifest.json` permission, `src/services/storage.js`)
- `chrome_url_overrides.newtab` - New tab page override (`manifest.json` lines 11-13)

**Web APIs:**
- Canvas API - Image compression (`src/services/wallpaper.js` lines 57-114)
- FileReader API - File upload handling (`src/services/wallpaper.js` lines 122-136)
- Clipboard API - Copy-to-clipboard (`src/utils/helpers.js` lines 144-160)
- URL API - Favicon extraction (`src/services/recent-websites.js` lines 81-102)

## Content Security Policy

**Extension CSP:**
- Configured in: `manifest.json` lines 32-34
- Policy: `script-src 'self'; object-src 'self'`
- Impact: No external scripts allowed, all resources must be bundled

## Third-Party Libraries

**Bundled Libraries:**
- Quill.js 2.0.3 - Rich text editor
  - Loaded locally: `public/lib/quill.js`, `public/lib/quill.snow.css`
  - No CDN usage (required by CSP)

---

*Integration audit: 2026-01-09*
*Update when adding/removing external services*

**Summary:** This is a **completely self-contained Chrome extension** with **zero external service dependencies**. All data is stored locally using Chrome Storage API. The extension works entirely offline.
