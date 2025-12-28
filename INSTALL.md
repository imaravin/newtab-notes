# NewTab Notes - Installation & Testing Guide

## Quick Installation

### Step 1: Load the Extension

1. **Open Chrome/Brave Extensions Page**
   - Chrome: Navigate to `chrome://extensions/`
   - Brave: Navigate to `brave://extensions/`

2. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner

3. **Load the Extension**
   - Click "Load unpacked"
   - Navigate to: `/Users/aravinth/Desktop/newtab_notes/dist`
   - Select the `dist` folder
   - Click "Select"

4. **Verify Installation**
   - You should see "NewTab Notes v1.0.0" in your extensions list
   - Icon should appear with a note emoji 📝

### Step 2: Test the Extension

1. **Open a New Tab**
   - Press `Cmd+T` (Mac) or `Ctrl+T` (Windows/Linux)
   - OR click the new tab button

2. **You Should See:**
   - ✅ Clean white background
   - ✅ Floating clock in top-right corner (showing current time)
   - ✅ "Frequently Visited" section with your top websites
   - ✅ "+ New Note" button in top-left
   - ✅ Settings icon (⚙️) in top-right
   - ✅ Welcome message in the center

---

## Testing the Features

### 1. Test Horizontal Tabs

**Create a New Note:**
```
1. Click "+ New Note" button
2. A new tab should appear in the tab bar
3. Title input should be focused
4. Type a title (e.g., "My First Note")
```

**Create Multiple Notes:**
```
1. Press Cmd+N (Mac) or Ctrl+N (Windows)
2. Create 3-5 notes with different titles
3. Verify tabs appear in the tab bar
```

**Switch Between Tabs:**
```
1. Click on different tabs
2. Verify content changes
3. Active tab should be highlighted
```

**Close a Tab:**
```
1. Hover over a tab
2. Click the × button
3. Tab should close
4. Next/previous tab becomes active
```

---

### 2. Test Cursor Fix

**This is the CRITICAL test for the main bug fix:**

```
1. Create a new note
2. Type: "Hello World"
3. Place cursor between "Hello" and "World"
4. Wait 1-2 seconds (for auto-save)
5. Continue typing (e.g., "Beautiful ")

Expected: Cursor stays between "Hello" and "World"
Result: "Hello Beautiful World"
```

**Rapid Typing Test:**
```
1. Type continuously for 10+ seconds
2. Don't pause
3. Observe cursor behavior

Expected: No cursor jumping or interruptions
```

---

### 3. Test Floating Clock

**Visual Check:**
```
1. Look at top-right corner
2. Verify clock is visible
3. Check format: "09:45" (HH:MM)
4. Check date: "Sat, Dec 28"
```

**Update Check:**
```
1. Watch clock for 60 seconds
2. Verify it updates every second
3. Verify time is accurate
```

**Hover Effect:**
```
1. Hover mouse over clock
2. Should lift slightly
3. Shadow becomes more prominent
```

---

### 4. Test Frequently Visited Websites

**Visual Check:**
```
1. Look for "FREQUENTLY VISITED" section
2. Should show 8 websites (if you have browsing history)
3. Each should have:
   - Favicon icon
   - Website name/title
```

**Click Test:**
```
1. Click on a website
2. Should open in NEW tab
3. NewTab page should remain open
```

**Empty State (Optional):**
```
1. Test with fresh browser profile (no history)
2. Should show: "No frequently visited websites yet"
```

---

### 5. Test Note Editing

**Create and Edit:**
```
1. Create new note
2. Type title: "Test Note"
3. Type body content with formatting:
   - Bold text (Ctrl+B)
   - Italic text (Ctrl+I)
   - Bullet list
   - Numbered list
   - Checklist
```

**Auto-Save:**
```
1. Type some text
2. Stop typing
3. Wait 1 second
4. Check footer: should say "Saved" then "All changes saved"
```

**Persistence:**
```
1. Create a note with content
2. Refresh page (F5)
3. Verify note persists
4. Verify tabs persist
```

---

### 6. Test Settings

**Open Settings:**
```
1. Click ⚙️ icon
2. Settings modal should open
3. Backdrop blur visible
```

**Export Data:**
```
1. Click "Export All Data"
2. JSON file should download
3. Filename: "newtab-notes-backup-[timestamp].json"
```

**Import Data:**
```
1. Click "Import Data"
2. Select previously exported file
3. Confirm replacement
4. All notes should restore
```

---

## Visual Validation Checklist

### Theme & Design
- [ ] Background is pure white (#ffffff)
- [ ] Text is dark and readable (#37352f)
- [ ] Blue accent color for buttons (#2383e2)
- [ ] Clean, minimal design (Notion-like)
- [ ] No dark mode elements visible
- [ ] Smooth hover effects on all interactive elements

### Typography
- [ ] Note titles are large (40px) and bold
- [ ] Body text is 16px with good line-height
- [ ] Font family: System fonts (-apple-system, etc.)
- [ ] Text is crisp and easy to read

### Layout
- [ ] Everything is centered and well-spaced
- [ ] No overlapping elements
- [ ] Clock doesn't overlap content
- [ ] Tabs don't overflow (or scroll smoothly if many)
- [ ] Editor is centered with max-width 900px

---

## Keyboard Shortcuts

Test these shortcuts:

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + N` | Create new note |
| `Cmd/Ctrl + W` | Close current tab |
| `Cmd/Ctrl + B` | Bold text (in editor) |
| `Cmd/Ctrl + I` | Italic text (in editor) |
| `Esc` | Close modals |

---

## Performance Checks

### Speed
- [ ] Extension loads in < 1 second
- [ ] No lag when typing
- [ ] Smooth tab switching
- [ ] Clock updates smoothly
- [ ] No freezing or stuttering

### Memory
- [ ] Open browser task manager (Shift+Esc in Chrome)
- [ ] Check "NewTab Notes" memory usage
- [ ] Should be < 100 MB with 20 tabs

---

## Common Issues & Solutions

### Issue: "topSites" permission error
**Solution:** Make sure you're using Chrome/Brave (not Firefox)

### Issue: Clock shows wrong time
**Solution:** Check system time, refresh page

### Issue: No websites showing
**Solution:**
1. Browse to a few websites first
2. Refresh the extension
3. Check if topSites permission is granted

### Issue: Cursor still jumping
**Solution:**
1. Clear browser cache
2. Reload extension
3. Try in incognito mode
4. Check browser console for errors (F12)

### Issue: Tabs not persisting
**Solution:**
1. Check if storage permission is granted
2. Open browser console, check for storage errors
3. Try exporting data, uninstalling, reinstalling

### Issue: Quill editor not loading
**Solution:**
1. Check dist/lib/quill.js exists
2. Check browser console for 404 errors
3. Rebuild: `npm run build`

---

## Developer Console Testing

Open browser console (F12) and check for:

### ✅ No Errors Expected
```
Console should show:
- "NewTab Notes initializing..."
- "Chrome storage API detected"
- "Quill loaded"
- "Storage initialized"
- "NewTab Notes initialized successfully"
```

### ❌ If You See Errors
Common errors to investigate:
- "Chrome storage API not available" → Not loaded as extension
- "topSites is undefined" → Permission not granted
- "Quill is not defined" → Quill library not loaded
- "Failed to load resource" → File path issue

---

## Comparison: Before vs After

### Before (Old Design)
- ❌ Cursor jumped to beginning while typing
- ❌ Dark sidebar with folders
- ❌ No tab system
- ❌ Clock in header (center)
- ❌ No frequently visited websites
- ❌ Complex folder management

### After (New Design)
- ✅ Cursor stays in place
- ✅ Clean white background
- ✅ Horizontal tabs for notes
- ✅ Floating clock (top-right)
- ✅ Frequently visited websites panel
- ✅ Simplified note management

---

## Next Steps After Testing

### If Everything Works:
1. ✅ Use it daily for note-taking
2. ✅ Report any bugs you find
3. ✅ Consider additional features (see below)

### If Issues Found:
1. Check TEST_CASES.md for detailed test cases
2. Check VALIDATION.md for technical details
3. Open browser console for error messages
4. Report issues with:
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser version
   - Console errors (if any)

---

## Future Enhancement Ideas

Based on the new design, these could be added:

1. **Tab Features:**
   - Drag & drop to reorder tabs
   - Pin tabs
   - Recently closed tabs
   - Tab search/filter

2. **Note Features:**
   - Global search across all notes
   - Tags/labels
   - Note templates
   - Markdown export

3. **UI Enhancements:**
   - Custom backgrounds (while keeping theme clean)
   - Adjustable editor width
   - Font size customization
   - Custom website shortcuts (in addition to frequent)

4. **Productivity:**
   - Quick notes (popup from any page)
   - Keyboard navigation between tabs
   - Command palette (Cmd+K)
   - Daily notes / journal mode

---

## Support

For questions or issues:
1. Check TEST_CASES.md for detailed testing
2. Check VALIDATION.md for technical details
3. Review browser console for errors
4. Check manifest.json permissions

---

**Installation Guide Version:** 1.0
**Last Updated:** 2025-12-28
**Compatible With:** Chrome/Brave (Manifest V3)
