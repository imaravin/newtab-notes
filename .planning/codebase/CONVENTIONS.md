# Coding Conventions

**Analysis Date:** 2026-01-09

## Naming Patterns

**Files:**
- kebab-case for all files: `storage.js`, `quill-config.js`, `recent-websites.js`
- Test files: None present (no testing structure)
- HTML files: `index.html` (standard naming)

**Functions:**
- camelCase for all functions
- Examples: `createNote()`, `getAllNotes()`, `updateNote()`, `deleteNote()`
- Async functions: No special prefix (just `async` keyword)
- Event handlers: `handleEventName` pattern not consistently used

**Variables:**
- camelCase for variables: `currentNote`, `openTabs`, `quillEditor`
- Constants: UPPER_SNAKE_CASE for module-level constants
- Examples: `MAX_RECENT_WEBSITES`, `QUILL_EVENTS`, `RECENT_WEBSITES_KEY`
- Private: No underscore prefix (JavaScript privacy via module scope)

**Types:**
- Classes: PascalCase - `StorageService`, `NotesService`, `FoldersService`
- No interfaces or types (pure JavaScript, no TypeScript)
- JSDoc types in comments: `@param {string}`, `@returns {Promise<Object>}`

## Code Style

**Formatting:**
- No formatter configured (no Prettier)
- Indentation: 2 spaces throughout codebase
- Line length: No enforced limit (~80-100 characters typical)
- Quotes: Single quotes for strings: `'string'`
- Semicolons: Omitted (modern ES modules style)
- Template literals: Used for interpolation: `` `${prefix}_${Date.now()}` ``

**Linting:**
- No linter configured (no ESLint)
- No `.eslintrc` or similar files

## Import Organization

**Order:**
1. Service imports: `import StorageService from '../services/storage.js'`
2. Utility imports: `import { debounce } from '../utils/helpers.js'`
3. No external package imports in main code (Quill loaded via HTML script tag)

**Grouping:**
- No explicit grouping or sorting
- Related imports together
- All imports use .js extension explicitly

**Path Aliases:**
- None configured
- Relative imports: `../services/`, `../utils/`
- No `@/` or other alias patterns

## Error Handling

**Patterns:**
- Try-catch in all async service methods
- Example pattern:
```javascript
static async methodName() {
  try {
    // operations
    return result;
  } catch (error) {
    console.error('Failed to ...:', error);
    throw error;
  }
}
```
- Errors bubble up to controller layer
- UI shows user feedback via toasts/alerts

**Error Types:**
- Standard `Error` objects with descriptive messages
- Example: `throw new Error('Invalid file type. Please upload an image.')`
- No custom error classes

## Logging

**Framework:**
- Native console API: `console.log()`, `console.error()`
- No structured logging library (pino, winston, etc.)

**Patterns:**
- Debug logging: `console.log('Note created:', newNote);`
- Error logging: `console.error('Failed to create note:', error);`
- Location: Service layer (after operations), controller layer (on errors)
- Production: Console logs remain (not stripped)

## Comments

**When to Comment:**
- File headers: JSDoc block describing module purpose
- Function documentation: JSDoc with `@param`, `@returns`, `@throws`
- Complex logic: Inline comments explaining "why" not "what"
- Example: `src/services/notes.js` line 55: `// If content is updated, extract checklists and plain text`

**JSDoc/TSDoc:**
- Required for all service methods
- Format:
```javascript
/**
 * Create a new note
 * @param {string|null} folderId - Parent folder ID
 * @param {string} title - Note title
 * @returns {Promise<Object>} - Created note
 */
```
- Used in: All files in `src/services/`, `src/utils/`

**TODO Comments:**
- Format: `// TODO: description` (no username)
- No systematic tracking
- Example not found in codebase (clean of TODOs)

## Function Design

**Size:**
- Functions range 10-50 lines typically
- Largest: ~80 lines in complex operations
- Service methods tend to be concise (CRUD operations)

**Parameters:**
- Typically 1-3 parameters
- Object destructuring not used in parameters
- Optional parameters with defaults: `function method(required, optional = 'default')`
- Example: `static async createFolder(name, color = '#4A90E2')`

**Return Values:**
- Explicit return statements
- Promise-based returns for async operations
- Example: `return await StorageService.get(key);`
- Early returns for validation: `if (!folderId) return [];`

## Module Design

**Exports:**
- Default exports for service classes: `export default StorageService;`
- Named exports for utilities: `export function debounce() { ... }`
- Named exports for multiple items: `export { getQuillConfig, QUILL_EVENTS }`

**Barrel Files:**
- Not used (no `index.js` re-export pattern)
- Direct imports: `import StorageService from '../services/storage.js'`

**Dependencies:**
- Service layer depends only on `StorageService`
- Utilities have no dependencies (pure functions)
- No circular dependencies

## Special Patterns

**Static Service Classes:**
```javascript
class StorageService {
  static async get(key) { ... }
  static async set(items) { ... }
}
export default StorageService;
```
- All methods static (no instances)
- Used throughout: `NotesService`, `FoldersService`, `SearchService`, etc.

**Debounced Operations:**
```javascript
const autoSave = debounce(saveCurrentNote, 1000);
quillEditor.on('text-change', autoSave);
```

**ID Generation:**
- Pattern: `${prefix}_${Date.now()}`
- Example: `note_${Date.now()}`, `folder_${Date.now()}`
- For uniqueness: Add random suffix via `Math.random().toString(36).substr(2, 9)`

---

*Convention analysis: 2026-01-09*
*Update when patterns change*

**Note:** No automated formatting or linting. Code style is maintained manually. Consider adding ESLint and Prettier for consistency.
