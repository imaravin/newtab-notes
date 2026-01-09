# Architecture

**Analysis Date:** 2026-01-09

## Pattern Overview

**Overall:** Single-Page Application (SPA) - Chrome Extension with Layered Architecture

**Key Characteristics:**
- Client-side only (no backend server)
- Chrome new tab page override
- Storage-first design (Chrome Storage API as single source of truth)
- Service-oriented architecture with static classes
- Event-driven UI with debounced auto-save

## Layers

**Presentation Layer:**
- Purpose: UI structure and rendering
- Contains: HTML templates, CSS styling, DOM manipulation
- Location: `src/newtab/index.html`, `src/newtab/styles.css`
- Depends on: Application layer for data
- Used by: User interactions

**Application/Controller Layer:**
- Purpose: Orchestrates services, manages application state, handles user interactions
- Contains: Main application logic, event handlers, state management
- Location: `src/newtab/index.js` (379 lines)
- Depends on: Service layer (NotesService, StorageService, etc.)
- Used by: Presentation layer events

**Service/Business Logic Layer:**
- Purpose: Encapsulates business logic and data operations
- Contains: Static service classes with CRUD operations
- Locations:
  - `src/services/storage.js` - Chrome Storage API abstraction (216 lines)
  - `src/services/notes.js` - Note operations (236 lines)
  - `src/services/folders.js` - Folder operations (143 lines)
  - `src/services/search.js` - Search and indexing (162 lines)
  - `src/services/wallpaper.js` - Image handling (224 lines)
  - `src/services/recent-websites.js` - Website tracking (132 lines)
- Depends on: Storage service, Browser APIs
- Used by: Application layer

**Utility/Helper Layer:**
- Purpose: Reusable pure functions and configuration
- Contains: Helper functions, Quill editor configuration
- Locations:
  - `src/utils/helpers.js` - 15 utility functions (204 lines)
  - `src/utils/quill-config.js` - Editor configuration (171 lines)
- Depends on: Nothing (pure functions)
- Used by: All layers

**Data Layer:**
- Purpose: Persistent storage
- Contains: Chrome Storage API (`chrome.storage.local`)
- Storage structure: `{ notes: [], folders: [], settings: {}, wallpaper: {} }`
- Limit: 10MB

## Data Flow

**User Creates a Note:**

1. User clicks "+ New Note" button
2. Event handler: `createNewNote()` in `src/newtab/index.js`
3. Service call: `NotesService.createNote(folderId, title)` in `src/services/notes.js`
   - Generates ID: `note_${Date.now()}`
   - Creates note object with Quill Delta content
4. Storage: `StorageService.set({ notes: updatedArray })` wraps `chrome.storage.local.set()`
5. Reload: `loadAllData()` refreshes `notes` array from storage
6. Render: `selectNote(noteId)` loads content into Quill editor, updates UI

**Auto-Save Flow (Debounced):**

```
User types → Quill 'text-change' event
    ↓
debounce(1000ms) → saveCurrentNote()
    ↓
Extract Delta content from Quill
    ↓
Extract checklists & plainText
    ↓
NotesService.updateNote(noteId, updates)
    ↓
StorageService.set({ notes })
    ↓
UI feedback: "Saved" indicator
```

**Search Flow:**

```
User types search query
    ↓
SearchService.buildSearchIndex() (if not cached)
    ↓
Filter notes by title + plainText match
    ↓
Return matching notes array
    ↓
Update UI with filtered results
```

**State Management:**
- Global state stored in module-scope variables in `src/newtab/index.js`:
  - `let notes = []` - All notes
  - `let currentNote = null` - Selected note
  - `let quillEditor = null` - Editor instance
  - `let openTabs = []` - Open tab IDs

## Key Abstractions

**Service Pattern (Static Classes):**
- Purpose: Encapsulate domain logic
- Examples: `StorageService`, `NotesService`, `FoldersService`, `SearchService`
- Location: `src/services/*.js`
- Pattern: All methods are static, no instances created
- Benefits: Centralized logic, easy to test with mocks

**Quill Delta Format:**
- Purpose: Structured representation of rich text
- Example: `{ ops: [{ insert: "Bold", attributes: { bold: true } }] }`
- Used in: `src/services/notes.js`, `src/utils/quill-config.js`
- Pattern: JSON-based operational transform format

**Debounce Pattern:**
- Purpose: Prevent excessive storage writes during typing
- Location: `src/utils/helpers.js` (debounce utility), `src/newtab/index.js` (usage)
- Pattern: `const autoSave = debounce(saveCurrentNote, 1000);`

**Promise-Based Async:**
- Purpose: Clean async/await for storage operations
- All service methods return Promises
- Example: `async function loadAllData() { notes = await NotesService.getAllNotes(); }`

## Entry Points

**Primary Entry Point:**
- Location: `src/newtab/index.html`
- Triggers: Chrome opens new tab
- Configuration: `manifest.json` line 12: `"newtab": "src/newtab/index.html"`
- Responsibilities: DOM structure, loads scripts and styles

**JavaScript Entry:**
- Location: `src/newtab/index.js`
- Loaded by: `index.html` line 190 as module: `<script type="module" src="./index.js">`
- Initialization: `DOMContentLoaded` event listener
- Flow:
  1. Wait for Quill.js to load (polling pattern lines 27-35)
  2. Initialize storage defaults (`src/services/storage.js`)
  3. Load all data from Chrome storage
  4. Setup event listeners (buttons, keyboard shortcuts)
  5. Initialize Quill editor with configuration

**Build Entry:**
- Location: `vite.config.js`
- Input: `src/newtab/index.html` (line 37)
- Output: `dist/` folder with bundled assets
- Command: `npm run build`

## Error Handling

**Strategy:** Try-catch at service boundaries, bubble errors to controller

**Patterns:**
- Service methods: `try { ... } catch (error) { console.error(...); throw error; }`
- Controller: Catches errors, shows user feedback (toasts/alerts)
- Example: `src/services/notes.js` lines 46-75 (updateNote method)

## Cross-Cutting Concerns

**Logging:**
- Approach: `console.log()` for info, `console.error()` for errors
- Location: Throughout all services
- Example: `src/services/notes.js` line 30

**Validation:**
- Approach: Manual validation in service methods
- File type check: `src/services/wallpaper.js` line 16
- Size limits: `src/services/wallpaper.js` line 27 (5MB), `src/services/storage.js` line 203 (10MB)

**Auto-Save:**
- Approach: Debounced writes (1000ms delay)
- Location: `src/newtab/index.js` with `debounce()` from `src/utils/helpers.js`

**State Synchronization:**
- Storage is source of truth
- UI state reloaded after mutations
- Pattern: Save → Reload → Render

---

*Architecture analysis: 2026-01-09*
*Update when major patterns change*
