# Roadmap: NewTab Notes - Quick Links Enhancement

## Overview

Adding quick links to 5 frequently visited websites in the top navigation bar. This enhancement uses the Chrome History API to automatically identify and display the user's most visited sites, providing seamless navigation without leaving the note-taking interface. The implementation maintains performance, matches the existing Notion-inspired design, and requires minimal user configuration.

## Domain Expertise

None

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Manifest & Permissions** - Add Chrome history permission to manifest
- [ ] **Phase 2: History Service** - Create service to query Chrome History API for frequency data
- [ ] **Phase 3: Quick Links UI Component** - Build top bar UI component for displaying links
- [ ] **Phase 4: Integration & State Management** - Connect history service to UI, handle navigation
- [ ] **Phase 5: Performance Optimization** - Caching and lazy loading to prevent load time impact
- [ ] **Phase 6: Visual Polish** - Match design system, favicons, spacing, responsive behavior
- [ ] **Phase 7: Edge Cases & Error Handling** - Handle empty history, API errors, missing favicons
- [ ] **Phase 8: Testing & Documentation** - Manual testing and README updates

## Phase Details

### Phase 1: Manifest & Permissions
**Goal**: Update Chrome extension manifest to request history permission
**Depends on**: Nothing (first phase)
**Research**: Unlikely (straightforward manifest change)
**Plans**: 1 plan

Plans:
- [x] 01-01: Add history permission to manifest.json, update CSP if needed

### Phase 2: History Service
**Goal**: Create service to fetch and rank frequently visited websites
**Depends on**: Phase 1 (requires history permission)
**Research**: Likely (Chrome History API patterns)
**Research topics**: Chrome History API query methods, visit count vs frequency algorithms, performance implications of history queries, data structure returned by chrome.history.search
**Plans**: 3 plans

Plans:
- [ ] 02-01: Create HistoryService with chrome.history.search wrapper
- [ ] 02-02: Implement frequency ranking algorithm (visit count + recency)
- [ ] 02-03: Add caching layer to avoid repeated history queries

### Phase 3: Quick Links UI Component
**Goal**: Build UI component to display 5 quick links in top navigation bar
**Depends on**: Nothing (can build in parallel with Phase 2)
**Research**: Unlikely (established UI patterns in codebase)
**Plans**: 2 plans

Plans:
- [ ] 03-01: Create HTML structure in top nav bar between button and tabs
- [ ] 03-02: Add CSS styling for quick links (match existing design)

### Phase 4: Integration & State Management
**Goal**: Connect HistoryService to UI, handle click navigation
**Depends on**: Phase 2, Phase 3
**Research**: Unlikely (following existing service integration patterns)
**Plans**: 3 plans

Plans:
- [ ] 04-01: Fetch top 5 sites on app load, populate quick links
- [ ] 04-02: Implement click handler to navigate to website (current tab)
- [ ] 04-03: Handle loading states and empty states

### Phase 5: Performance Optimization
**Goal**: Ensure no performance impact on new tab load time
**Depends on**: Phase 4
**Research**: Unlikely (standard performance patterns)
**Plans**: 2 plans

Plans:
- [ ] 05-01: Implement debounced history updates (don't query on every load)
- [ ] 05-02: Add localStorage cache with TTL (reduce chrome.history calls)

### Phase 6: Visual Polish
**Goal**: Match existing design system, add favicons, perfect spacing
**Depends on**: Phase 4
**Research**: Unlikely (design system established)
**Plans**: 3 plans

Plans:
- [ ] 06-01: Add favicon display for each quick link
- [ ] 06-02: Refine spacing, alignment, and responsive behavior
- [ ] 06-03: Add hover states and visual feedback

### Phase 7: Edge Cases & Error Handling
**Goal**: Handle empty history, API errors, missing favicons gracefully
**Depends on**: Phase 6
**Research**: Unlikely (standard error handling patterns)
**Plans**: 2 plans

Plans:
- [ ] 07-01: Handle empty/new browser profiles (no history)
- [ ] 07-02: Handle chrome.history API errors and missing favicon fallbacks

### Phase 8: Testing & Documentation
**Goal**: Verify functionality works, update user documentation
**Depends on**: Phase 7
**Research**: Unlikely (internal documentation)
**Plans**: 2 plans

Plans:
- [ ] 08-01: Manual testing (various history sizes, edge cases)
- [ ] 08-02: Update README.md with new quick links feature

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Manifest & Permissions | 1/1 | ✓ Complete | 2026-01-09 |
| 2. History Service | 0/3 | Not started | - |
| 3. Quick Links UI Component | 0/2 | Not started | - |
| 4. Integration & State Management | 0/3 | Not started | - |
| 5. Performance Optimization | 0/2 | Not started | - |
| 6. Visual Polish | 0/3 | Not started | - |
| 7. Edge Cases & Error Handling | 0/2 | Not started | - |
| 8. Testing & Documentation | 0/2 | Not started | - |
