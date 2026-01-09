# Codebase Concerns

**Analysis Date:** 2026-01-09

## Tech Debt

**Full Data Reload After Each Save:**
- Issue: `loadAllData()` reloads entire notes array after every update
- Files: `src/newtab/index.js` (lines 201-202 in `saveCurrentNote()`)
- Why: Simple implementation, ensures consistency
- Impact: Poor scaling with large note collections (1000+ notes = noticeable slowdown)
- Fix approach: Update local state directly after save, only reload on conflicts

**Polling for Quill Library Load:**
- Issue: Poll-based library loading with 100ms interval and 50-attempt limit
- File: `src/newtab/index.js` (lines 27-35)
- Why: Simple way to wait for external script to load
- Impact: Unreliable (could fail if Quill takes >5 seconds), CPU inefficient
- Fix approach: Use proper Promise-based script loading or dynamic import

**Repeated DOM Queries:**
- Issue: Multiple `document.querySelector()` calls throughout code, not cached
- File: `src/newtab/index.js` (15 DOM queries scattered)
- Why: Simple implementation
- Impact: Minor performance hit on re-renders
- Fix approach: Cache DOM references at initialization

**Duplicate Checklist Extraction Logic:**
- Issue: `extractChecklistItems()` implemented twice with slight variations
- Files:
  - `src/services/notes.js` (lines 168-193)
  - `src/utils/quill-config.js` (lines 94-138)
- Why: Evolved independently
- Impact: DRY violation, maintenance burden if logic changes
- Fix approach: Consolidate into single utility in `src/utils/quill-config.js`

## Known Bugs

**Race Condition in ID Generation:**
- Symptoms: Potential duplicate IDs if multiple notes created rapidly
- Trigger: Create two notes within same millisecond
- Files:
  - `src/services/notes.js` (line 19): `id: \`note_${Date.now()}\``
  - `src/services/folders.js` (line 19): `id: \`folder_${Date.now()}\``
- Workaround: None - rare occurrence but theoretically possible
- Root cause: `Date.now()` lacks sufficient entropy for concurrent operations
- Fix: Use `generateId()` from `src/utils/helpers.js` (adds randomness) or UUID library

**No Timeout on Quill Load:**
- Symptoms: Application hangs if Quill fails to load
- Trigger: Network issues, CSP violations, corrupted library file
- File: `src/newtab/index.js` (line 28) - `await new Promise` with no timeout
- Workaround: Reload page
- Root cause: Polling loop could theoretically hang
- Fix: Add timeout and error handling

## Security Considerations

**Missing Input Length Limits:**
- Risk: Note title has no maxlength, could cause storage bloat
- Files:
  - `src/newtab/index.html` (line 46) - `noteTitle` input lacks maxlength
  - Compare: `src/newtab/index.html` (line 145) - `folderName` has maxlength=50
- Current mitigation: None
- Recommendations: Add `maxlength="500"` to note title input

**Superficial File Type Validation:**
- Risk: File type check can be spoofed via MIME type manipulation
- File: `src/services/wallpaper.js` (line 16)
- Code: `if (!file.type.startsWith('image/'))`
- Current mitigation: None - trusts browser-reported MIME type
- Recommendations: Validate actual file header (magic bytes) or Canvas rendering verification

**Deprecated Method Used:**
- Risk: `String.prototype.substr()` is deprecated
- File: `src/utils/helpers.js` (line 11)
- Code: `.substr(2, 9)` should be `.slice(2, 11)`
- Current mitigation: Still works but may break in future JavaScript versions
- Recommendations: Replace with `.slice()`

**No Validation of Imported Data:**
- Risk: Import functionality could accept malformed JSON, corrupting app state
- File: `src/newtab/index.js` (import handler - implementation not in viewed code)
- Current mitigation: Unknown
- Recommendations: Add JSON schema validation before importing data

## Performance Bottlenecks

**Inefficient Tab Rendering:**
- Problem: `renderTabs()` rebuilds entire tab bar DOM on every call
- File: `src/newtab/index.js` (line 76)
- Measurement: Not measured, but scales O(n) with number of notes
- Cause: Full innerHTML rebuild instead of incremental updates
- Improvement path: Cache tab elements, only update changed/selected state

**No Search Index Caching:**
- Problem: Search index rebuilt on every query if not explicitly cached
- File: `src/services/search.js` (line 42 in `buildSearchIndex()`)
- Measurement: Not measured, but O(n) for every search
- Cause: Index not persisted between searches
- Improvement path: Cache index in memory after first build, invalidate on note changes

**Large Base64 Wallpapers in Storage:**
- Problem: Wallpapers stored as base64 data URIs (up to 5MB)
- File: `src/services/wallpaper.js` (line 33)
- Measurement: 5MB wallpaper = ~6.7MB base64 string (33% overhead)
- Cause: Base64 encoding inflates size
- Improvement path: Store as Blob in IndexedDB instead of Chrome Storage

## Fragile Areas

**Quill Delta Format Parsing:**
- File: `src/services/notes.js` (lines 168-193 in `extractChecklistItems()`)
- Why fragile: Relies on specific Quill op structure (`{ insert, attributes: { list } }`)
- Common failures: Quill version changes, unsupported list formats
- Safe modification: Test against multiple Delta structures before changing
- Test coverage: None (no tests)

**Storage Limit Enforcement:**
- File: `src/services/storage.js` (lines 201-213 in `checkStorageUsage()`)
- Why fragile: Method exists but never called from UI
- Common failures: Users hit 10MB limit silently, no warning shown
- Safe modification: Call `checkStorageUsage()` before every write, show warning at 80%
- Test coverage: None

## Scaling Limits

**Chrome Storage 10MB Limit:**
- Current capacity: 10MB total storage (enforced by Chrome)
- Limit: ~5,000 notes (assuming 2KB average per note) OR ~2 wallpapers
- Symptoms at limit: `chrome.storage.set()` fails, data loss possible
- Scaling path: Migrate to IndexedDB (unlimited storage) or add cloud sync

**Single-File Application:**
- Current capacity: All code in `src/newtab/index.js` (379 lines)
- Limit: Maintainability decreases as features added
- Symptoms at limit: Difficult to navigate, increased merge conflicts
- Scaling path: Split into multiple modules (TabManager, EditorController, etc.)

## Dependencies at Risk

**Quill.js 2.0.3:**
- Risk: Latest version (2.0.3) is up-to-date as of analysis
- Impact: If breaking changes in future versions, would need updates to Delta parsing
- Migration plan: Pin version in package.json, test before upgrading

**Vite 5.0.0:**
- Risk: Build tool actively maintained, no immediate risk
- Impact: Build process breakage if deprecated features used
- Migration plan: Monitor Vite releases, update when security issues arise

**Sharp 0.34.5:**
- Risk: Native dependency (can break on Node version changes)
- Impact: Icon generation script fails (not critical - icons already generated)
- Migration plan: Update when Node version changes or switch to pure JS alternative

## Missing Critical Features

**No Storage Quota Warning:**
- Problem: Users can hit 10MB limit without warning
- Current workaround: None - silent failure
- Blocks: User confusion, potential data loss
- Implementation complexity: Low - call `checkStorageUsage()` before writes, show toast

**No Error Recovery:**
- Problem: No mechanism to recover from storage write failures
- Current workaround: User must reload page and retry
- Blocks: Data loss on storage errors
- Implementation complexity: Medium - implement retry logic with exponential backoff

**No Backup/Restore UI Integration:**
- Problem: Export/Import mentioned in README but not fully visible in main index.js
- Current workaround: Manual data management
- Blocks: User confidence in data safety
- Implementation complexity: Low - UI elements exist, verify implementation

## Test Coverage Gaps

**No Tests for Core Functionality:**
- What's not tested: Entire codebase (0% coverage)
- Risk: Refactoring could break features silently, regressions undetected
- Priority: High
- Difficulty to test: Medium (requires Chrome Storage API mocking)

**Critical Untested Paths:**
- `src/services/notes.js` - Note CRUD operations
- `src/services/storage.js` - Storage wrapper (core functionality)
- `src/services/search.js` - Search and indexing
- `src/utils/helpers.js` - Pure functions (easiest to test)

## Console Logging in Production

**Issue: Debug Logs Not Stripped**
- Files: All service files contain `console.log()` and `console.error()`
- Count: 17+ console statements throughout codebase
- Examples:
  - `src/services/notes.js` (line 30): `console.log('Note created:', newNote);`
  - `src/services/storage.js` (line 71): `console.error('Failed to set data:', error);`
- Impact: Performance overhead (minor), exposes internal state in production
- Recommendation: Wrap with `if (DEBUG)` flag or strip during build

---

*Concerns audit: 2026-01-09*
*Update as issues are fixed or new ones discovered*

**Overall Assessment:** This is a **well-structured, clean codebase** with good separation of concerns. Main concerns are **performance scaling** (reloading all data, inefficient rendering) and **missing test coverage**. The code is production-ready for personal use but would benefit from testing infrastructure before wider distribution. No critical security vulnerabilities detected.
