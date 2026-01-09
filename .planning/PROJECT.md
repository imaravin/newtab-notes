# NewTab Notes - Quick Links Enhancement

## What This Is

A Chrome extension that replaces the new tab page with a powerful note-taking application featuring rich text editing, folders, checklists, and search. Now adding quick links to frequently visited websites in the top navigation bar for faster access to commonly used sites.

## Core Value

Provide a seamless blend of note-taking and web navigation in a single new tab experience, making both writing notes and accessing frequent websites effortless.

## Requirements

### Validated

- ✓ Rich text note editing with Quill.js — existing
- ✓ Folder organization with color-coding — existing
- ✓ Interactive checklists within notes — existing
- ✓ Full-text search across all notes — existing
- ✓ Custom wallpaper backgrounds — existing
- ✓ Export/import data as JSON — existing
- ✓ Chrome Storage API for local persistence — existing
- ✓ Service-oriented architecture with static classes — existing
- ✓ Debounced auto-save to prevent data loss — existing

### Active

- [ ] Display 5 frequently visited websites in top navigation bar
- [ ] Use Chrome History API to identify most visited sites
- [ ] Show website favicons with site names/URLs
- [ ] Click to navigate (replace current tab with website)
- [ ] Maintain performance (no impact on new tab load time)
- [ ] Match existing Notion-inspired design aesthetic
- [ ] Request `history` permission in manifest.json

### Out of Scope

- Manual link management (add/remove/reorder) — automatic only based on visit frequency
- Advanced configuration (time ranges, filters, blacklists) — keep it simple
- Link customization (custom names, icons) — use actual site data
- Opening links in new tabs — current tab navigation only for v1

## Context

**Existing Codebase:**
- Chrome extension using Manifest V3
- Single-page application with layered architecture
- Service layer handles all business logic (StorageService, NotesService, etc.)
- Has `recent-websites.js` service (tracks recently visited, but not by frequency)
- Clean separation: UI layer, controller, services, utilities
- No testing infrastructure yet

**User Need:**
- The top navigation bar currently has empty space between "New Note" button and note tabs
- Users want quick access to frequently visited websites without leaving the note-taking interface
- Chrome History API can provide visit frequency data

**Technical Environment:**
- JavaScript ES6+ modules
- Vite for building
- Quill.js 2.0.3 for rich text
- Chrome Storage API (10MB limit)
- No external services (completely local)

## Constraints

- **Performance**: Must not impact new tab load time (currently fast, keep it that way)
- **Design**: Must match existing Notion-inspired UI aesthetic and spacing
- **Chrome Permissions**: Will require adding `history` permission to `manifest.json`
- **Storage**: Chrome History API read-only access (no modification of browser history)
- **Layout**: Limited horizontal space in top bar (5 links max)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Use Chrome History API instead of existing recent-websites service | User wants frequency-based (most visited) not recency-based tracking | — Pending |
| Show 5 links maximum | Balance utility vs UI clutter in limited top bar space | — Pending |
| Click navigates in current tab | Simplest implementation, matches typical quick link behavior | — Pending |
| No manual configuration in v1 | Keep implementation simple, automatic based on actual usage | — Pending |

---
*Last updated: 2026-01-09 after initialization*
