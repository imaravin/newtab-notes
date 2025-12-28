# NewTab Notes - Test Cases

## Test Environment
- Browser: Chrome/Brave
- Extension Version: 1.0.0
- Test Date: 2025-12-28

---

## 1. Cursor Position Fix Tests

### TC-1.1: Cursor stays in place while typing
**Priority:** Critical
**Steps:**
1. Open a new tab
2. Create a new note
3. Type "Hello World" in the editor
4. Place cursor between "Hello" and "World"
5. Continue typing and wait for auto-save (1 second)

**Expected Result:**
- Cursor should remain between "Hello" and "World"
- Cursor should NOT jump to the beginning or end
- New text should appear at cursor position

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

### TC-1.2: Cursor position preserved during rapid typing
**Priority:** High
**Steps:**
1. Create a new note
2. Type continuously for 10+ seconds without pausing
3. Observe cursor behavior during multiple auto-saves

**Expected Result:**
- Cursor should stay at typing position
- No interruptions to typing flow
- Text should appear smoothly

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

### TC-1.3: Cursor position with text selection
**Priority:** Medium
**Steps:**
1. Type some text
2. Select a portion of text (highlight)
3. Wait for auto-save
4. Continue typing to replace selection

**Expected Result:**
- Selection should remain highlighted during save
- Typing should replace selected text
- Cursor should be at replacement point

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

## 2. Notion-Like Theme Tests

### TC-2.1: Clean white background
**Priority:** Critical
**Steps:**
1. Open a new tab
2. Verify background colors

**Expected Result:**
- Body background: Pure white (#ffffff)
- No dark theme toggle visible
- All panels have clean white/off-white backgrounds
- Text is dark and readable (#37352f)

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

### TC-2.2: Typography and spacing
**Priority:** High
**Steps:**
1. Create a new note
2. Type a title and some body text
3. Verify font sizes and spacing

**Expected Result:**
- Title input: 40px, bold (700)
- Body text: 16px, line-height 1.8
- Clean spacing between elements
- Fonts: -apple-system, BlinkMacSystemFont, 'Segoe UI'

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

### TC-2.3: Color palette consistency
**Priority:** Medium
**Steps:**
1. Navigate through all UI elements
2. Check buttons, borders, text colors

**Expected Result:**
- Accent blue: #2383e2
- Text primary: #37352f
- Text secondary: #787774
- Border color: #e9e9e7
- Consistent color usage throughout

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

### TC-2.4: Hover effects and transitions
**Priority:** Medium
**Steps:**
1. Hover over buttons, tabs, website items
2. Verify smooth transitions

**Expected Result:**
- Smooth transitions (0.2s cubic-bezier)
- Subtle transform on hover (translateY(-1px))
- No jarring color changes
- Professional feel

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

## 3. Horizontal Tabs Tests

### TC-3.1: Create and open new tab
**Priority:** Critical
**Steps:**
1. Open new tab
2. Click "+ New Note" button
3. Verify tab appears

**Expected Result:**
- New tab appears in tab bar
- Tab shows "Untitled" initially
- Tab is selected (active state)
- Editor opens with focus on title

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

### TC-3.2: Switch between tabs
**Priority:** Critical
**Steps:**
1. Create 3 notes with different titles
2. Click between tabs
3. Verify content switches

**Expected Result:**
- Clicking tab switches to that note
- Active tab is highlighted
- Content updates correctly
- No data loss when switching

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

### TC-3.3: Close tab functionality
**Priority:** Critical
**Steps:**
1. Create multiple tabs
2. Hover over a tab
3. Click the × close button

**Expected Result:**
- Close button (×) appears on hover
- Clicking closes the tab
- Next/previous tab becomes active
- If last tab, show empty state

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

### TC-3.4: Tab persistence across reloads
**Priority:** High
**Steps:**
1. Open 3 notes in tabs
2. Refresh the page (F5)
3. Verify tabs persist

**Expected Result:**
- All tabs reappear after reload
- Same order maintained
- Previously active tab is selected
- Content is preserved

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

### TC-3.5: Tab title updates
**Priority:** High
**Steps:**
1. Create new note
2. Change title from "Untitled" to "My Note"
3. Wait for auto-save
4. Check tab label

**Expected Result:**
- Tab title updates to "My Note"
- Updates happen smoothly
- No flickering or jumping

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

### TC-3.6: Keyboard shortcut - New tab (Cmd/Ctrl+N)
**Priority:** Medium
**Steps:**
1. Press Cmd+N (Mac) or Ctrl+N (Windows/Linux)

**Expected Result:**
- New note opens in new tab
- Focus moves to title input
- Previous tabs remain open

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

### TC-3.7: Keyboard shortcut - Close tab (Cmd/Ctrl+W)
**Priority:** Medium
**Steps:**
1. Select a tab
2. Press Cmd+W (Mac) or Ctrl+W (Windows/Linux)

**Expected Result:**
- Current tab closes
- Previous/next tab becomes active
- If last tab, show empty state

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

### TC-3.8: Multiple tabs scrolling
**Priority:** Low
**Steps:**
1. Create 10+ notes
2. Verify tab overflow behavior

**Expected Result:**
- Tabs should scroll horizontally if too many
- Scrollbar hidden
- Can scroll with mouse/trackpad
- No layout breaking

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

## 4. Floating Clock Tests

### TC-4.1: Clock visibility and positioning
**Priority:** High
**Steps:**
1. Open new tab
2. Locate floating clock

**Expected Result:**
- Clock visible in top-right corner
- Position: 24px from top, 24px from right
- Glassmorphism effect (backdrop blur)
- White background with subtle shadow

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

### TC-4.2: Time display format
**Priority:** Critical
**Steps:**
1. Check clock time display
2. Wait and verify it updates

**Expected Result:**
- Format: HH:MM (e.g., "09:45", "14:23")
- Updates every second
- Leading zeros for single digits
- Time is accurate

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

### TC-4.3: Date display format
**Priority:** High
**Steps:**
1. Check date display under time

**Expected Result:**
- Format: "Day, Mon DD" (e.g., "Mon, Dec 28")
- Correct current date
- Font size: 13px
- Color: secondary text color

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

### TC-4.4: Clock hover effect
**Priority:** Low
**Steps:**
1. Hover mouse over clock

**Expected Result:**
- Subtle lift animation (translateY(-2px))
- Shadow becomes more prominent
- Smooth transition
- Returns to normal on mouse out

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

### TC-4.5: Clock doesn't overlap content
**Priority:** Medium
**Steps:**
1. Create note and scroll
2. Verify clock stays in place

**Expected Result:**
- Clock is fixed position
- Doesn't scroll with content
- Doesn't overlap important UI elements
- Always visible and accessible

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

## 5. Frequently Visited Websites Tests

### TC-5.1: Websites panel display
**Priority:** High
**Steps:**
1. Open new tab
2. Locate "Frequently Visited" section

**Expected Result:**
- Panel appears below navigation
- Title: "FREQUENTLY VISITED" (uppercase, 14px)
- Grid layout with 8 columns (or less if fewer sites)
- Clean borders and spacing

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

### TC-5.2: Top sites loading
**Priority:** Critical
**Steps:**
1. Browse to several websites before testing
2. Open new tab
3. Check if sites appear

**Expected Result:**
- Top 8 most visited sites display
- Sites are from actual browsing history
- Loads within 1-2 seconds
- No errors in console

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

### TC-5.3: Website item display
**Priority:** High
**Steps:**
1. Check individual website items
2. Verify favicon and title

**Expected Result:**
- Favicon displays (32x32px)
- Site title/hostname visible
- Fallback emoji (🌐) if favicon fails
- Text truncates if too long
- Each item has border and hover effect

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

### TC-5.4: Website click navigation
**Priority:** Critical
**Steps:**
1. Click on a website item

**Expected Result:**
- Opens website in new tab
- URL matches the website
- Current tab remains as new tab
- No errors

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

### TC-5.5: Empty state handling
**Priority:** Medium
**Steps:**
1. Test with fresh browser profile (no history)
2. Check websites panel

**Expected Result:**
- Shows message: "No frequently visited websites yet"
- No broken layout
- No JavaScript errors
- Panel still displays properly

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

### TC-5.6: Favicon fallback
**Priority:** Low
**Steps:**
1. Find a site with missing/broken favicon
2. Check display

**Expected Result:**
- Fallback SVG emoji displays (🌐)
- No broken image icons
- Layout remains intact
- No console errors

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

## 6. Integration Tests

### TC-6.1: No sidebar/folders visible
**Priority:** Critical
**Steps:**
1. Open new tab
2. Look for sidebar or folder interface

**Expected Result:**
- No sidebar visible
- No folder UI elements
- No "New Folder" button
- Clean interface without old folder system

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

### TC-6.2: Settings modal accessibility
**Priority:** High
**Steps:**
1. Click settings icon (⚙️)
2. Verify modal opens

**Expected Result:**
- Modal opens centered on screen
- Contains wallpaper and data management settings
- Can close with × or Esc key
- Backdrop blur effect visible

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

### TC-6.3: Auto-save functionality
**Priority:** Critical
**Steps:**
1. Create note and type
2. Wait 1+ seconds without typing
3. Check "last saved" indicator

**Expected Result:**
- Shows "Saved" briefly
- Changes to "All changes saved"
- No data loss on refresh
- Saves every 1 second after typing stops

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

### TC-6.4: Data export/import
**Priority:** High
**Steps:**
1. Create several notes
2. Export data
3. Clear all data
4. Import exported file

**Expected Result:**
- Export creates JSON file
- Import restores all notes
- Tabs restore correctly
- No data corruption

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

### TC-6.5: Empty state display
**Priority:** Medium
**Steps:**
1. Close all tabs
2. Verify empty state

**Expected Result:**
- Shows "Welcome to NewTab Notes" message
- Large note icon (📝)
- "Create a new note to get started" text
- Clean, centered layout

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

## 7. Performance Tests

### TC-7.1: Initial load time
**Priority:** High
**Steps:**
1. Open new tab
2. Measure time to interactive

**Expected Result:**
- Loads in < 1 second
- No visible lag
- Smooth animations
- Clock starts immediately

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

### TC-7.2: Typing performance
**Priority:** Critical
**Steps:**
1. Type rapidly for 30 seconds
2. Check for lag or stuttering

**Expected Result:**
- No input lag
- Smooth typing experience
- Auto-save doesn't cause freezes
- Cursor stays responsive

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

### TC-7.3: Memory usage with multiple tabs
**Priority:** Medium
**Steps:**
1. Open 20+ note tabs
2. Check browser task manager

**Expected Result:**
- Reasonable memory usage (< 100MB)
- No memory leaks
- Tabs remain responsive
- No browser slowdown

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

## 8. Responsive Design Tests

### TC-8.1: Mobile/small screen layout
**Priority:** Low
**Steps:**
1. Resize browser to < 768px width
2. Check layout adaptation

**Expected Result:**
- Clock adjusts size and padding
- Websites grid reduces columns
- Editor padding reduces
- Everything remains usable

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

## 9. Browser Compatibility

### TC-9.1: Chrome compatibility
**Priority:** Critical
**Steps:**
1. Test on latest Chrome browser

**Expected Result:**
- All features work
- No console errors
- topSites API works
- Smooth performance

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

### TC-9.2: Brave compatibility
**Priority:** High
**Steps:**
1. Test on latest Brave browser

**Expected Result:**
- All features work
- topSites API works
- No permission issues
- Identical to Chrome experience

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

## 10. Edge Cases

### TC-10.1: Very long note titles
**Priority:** Low
**Steps:**
1. Create note with 100+ character title

**Expected Result:**
- Tab truncates title with ellipsis
- Title input scrolls
- No layout breaking
- Full title visible in input

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

### TC-10.2: Special characters in titles
**Priority:** Medium
**Steps:**
1. Use emojis, unicode, HTML in titles

**Expected Result:**
- Characters display correctly
- No XSS vulnerabilities
- HTML is escaped
- Emojis render properly

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

### TC-10.3: Rapid tab open/close
**Priority:** Medium
**Steps:**
1. Quickly create and close 10 tabs

**Expected Result:**
- No UI glitches
- No JavaScript errors
- Smooth animations
- Correct tab selection

**Status:** ⬜ Not Tested | ✅ Pass | ❌ Fail

---

## Test Summary

**Total Test Cases:** 49
**Critical:** 15
**High:** 16
**Medium:** 14
**Low:** 4

**Pass Rate:** ____%
**Failed Cases:** ___
**Blocked Cases:** ___
**Not Tested:** ___

## Notes
- Test on both Mac and Windows if possible
- Clear extension storage between major test runs
- Check browser console for errors during all tests
- Report any unexpected behavior
