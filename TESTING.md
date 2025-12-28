# Testing Guide - NewTab Notes

## ✅ All Issues Fixed!

I've fixed and improved:

1. ✅ **Folder Creation** - Now works with proper error handling
2. ✅ **Cross-Tab Sync** - Folders and notes sync across all tabs in real-time
3. ✅ **Note Creation** - Multiple ways to create notes
4. ✅ **Note Editing** - Full rich text editing with auto-save
5. ✅ **Toast Notifications** - Visual feedback for all actions
6. ✅ **Better Error Handling** - Detailed console logs and user-friendly messages

## 🔄 Reload Extension First

Before testing, reload the extension:

1. Go to `brave://extensions/`
2. Find "NewTab Notes"
3. Click the **🔄 reload button**
4. Open a new tab to test

## 📋 Step-by-Step Testing

### Test 1: Create Folders

1. **Open a new tab**
2. **Click "📁 New Folder"** button in sidebar
3. **Enter folder name** (e.g., "Work", "Personal", "Ideas")
4. **Choose a color** by clicking one of the color buttons
5. **Click "Save"**
6. **Expected Result:**
   - ✅ Green toast notification: "Folder created successfully!"
   - ✅ Folder appears in sidebar with chosen color
   - ✅ Console shows: "Folder created successfully: {folder details}"

### Test 2: Cross-Tab Folder Sync

1. **Create a folder** in Tab 1 (e.g., "Tab 1 Folder")
2. **Open a second new tab** (Tab 2)
3. **Expected Result:**
   - ✅ The new folder automatically appears in Tab 2
   - ✅ Console in Tab 2 shows: "Storage changed in another tab"
   - ✅ Console shows: "Data reloaded from storage sync"

### Test 3: Create Notes (Method 1 - Folder Button)

1. **Expand a folder** by clicking on it
2. **Click "+ New Note"** at the bottom of the folder
3. **Expected Result:**
   - ✅ Green toast: "Note created!"
   - ✅ Note appears in the folder's note list
   - ✅ Editor opens with "Untitled Note" selected
   - ✅ Title input is focused and selected
   - ✅ Console shows: "Note created: {note details}"

### Test 4: Create Notes (Method 2 - Keyboard Shortcut)

1. **Click on a folder** to select it
2. **Press Cmd+N** (Mac) or **Ctrl+N** (Windows/Linux)
3. **Expected Result:**
   - ✅ Same as Test 3
   - ✅ Note is created in the selected folder

### Test 5: Edit Note Title

1. **Create or select a note**
2. **Change the title** in the title input field
3. **Wait 1 second** (auto-save delay)
4. **Expected Result:**
   - ✅ Footer shows "Saved" briefly, then "All changes saved"
   - ✅ Sidebar note list updates with new title
   - ✅ Console shows: "Note updated: {updated note}"

### Test 6: Edit Note Content (Rich Text)

1. **Select a note**
2. **Type in the editor**
3. **Try formatting:**
   - Click **B** for bold
   - Click **I** for italic
   - Click **U** for underline
   - Select heading from dropdown
4. **Expected Result:**
   - ✅ Text appears with formatting
   - ✅ Auto-saves after 1 second
   - ✅ Footer shows "Saved"

### Test 7: Add Checklists

1. **Select a note**
2. **Click the checklist button (☑)** in toolbar
3. **Type checklist item** and press Enter
4. **Add more items**
5. **Click checkboxes** to mark complete
6. **Expected Result:**
   - ✅ Checkboxes appear in editor
   - ✅ Can check/uncheck items
   - ✅ Auto-saves changes
   - ✅ Footer shows checklist count: "X words, Y checklist items"

### Test 8: Cross-Tab Note Sync

1. **Create/Edit a note in Tab 1**
2. **Check Tab 2**
3. **Expected Result:**
   - ✅ New/updated note appears in Tab 2
   - ✅ If the same note is open, it updates automatically
   - ✅ Console shows sync messages

### Test 9: Search Notes

1. **Create several notes** with different content
2. **Type in the search bar** at the top
3. **Expected Result:**
   - ✅ Results filter in real-time
   - ✅ Only matching notes show
   - ✅ Results grouped by folder
   - ✅ Clear search with Esc key

### Test 10: Pin Notes

1. **Select a note**
2. **Click the pin button (📌)**
3. **Expected Result:**
   - ✅ Pin icon changes to 📍
   - ✅ Note title shows 📌 in sidebar
   - ✅ Note moves to top of folder

### Test 11: Delete Notes

1. **Select a note**
2. **Click delete button (🗑️)**
3. **Confirm deletion**
4. **Expected Result:**
   - ✅ Confirmation modal appears
   - ✅ Note is removed from list
   - ✅ Folder note count updates
   - ✅ Editor shows empty state

### Test 12: Delete Folders

1. **Hover over a folder**
2. **Click the delete icon (🗑️)**
3. **Confirm deletion**
4. **Expected Result:**
   - ✅ Confirmation: "Delete folder 'X' and all its notes?"
   - ✅ Folder and all notes are deleted
   - ✅ Updates across all tabs

### Test 13: Dark Mode

1. **Click the moon icon (🌙)** in header
2. **Expected Result:**
   - ✅ Entire UI switches to dark theme
   - ✅ Icon changes to ☀️
   - ✅ Editor (Quill) also switches to dark
   - ✅ Preference saved (persists across tabs)

### Test 14: Upload Wallpaper

1. **Click ⚙️ Settings**
2. **Click "Upload Wallpaper"**
3. **Select an image file**
4. **Expected Result:**
   - ✅ Green toast: "Wallpaper uploaded successfully!"
   - ✅ Background changes to your image
   - ✅ Image is compressed if large
   - ✅ Console shows upload success

### Test 15: Adjust Wallpaper Opacity

1. **With wallpaper set, go to Settings**
2. **Move the opacity slider**
3. **Expected Result:**
   - ✅ Background transparency changes in real-time
   - ✅ Percentage updates next to slider
   - ✅ Setting saves automatically

### Test 16: Export Data

1. **Click ⚙️ Settings**
2. **Click "Export All Data"**
3. **Expected Result:**
   - ✅ JSON file downloads
   - ✅ Green toast: "Data exported successfully!"
   - ✅ File named: `newtab-notes-backup-{timestamp}.json`
   - ✅ Console shows export success

### Test 17: Import Data

1. **Click ⚙️ Settings**
2. **Click "Import Data"**
3. **Select the exported JSON file**
4. **Confirm replacement**
5. **Expected Result:**
   - ✅ Confirmation: "This will replace all current data. Continue?"
   - ✅ Data is restored
   - ✅ Green toast: "Data imported successfully!"
   - ✅ All folders and notes reappear

### Test 18: Storage Usage

1. **Check bottom of sidebar**
2. **Create many folders and notes**
3. **Expected Result:**
   - ✅ Shows: "Storage: X%"
   - ✅ Percentage increases as you add data
   - ✅ Turns orange/red if over 80%

## 🐛 Debugging Tips

### If something doesn't work:

1. **Open Console** (Press F12)
2. **Check for errors** (red text)
3. **Look for these success messages:**
   - "Chrome storage API detected"
   - "Quill loaded"
   - "Storage initialized"
   - "Cross-tab sync enabled"
   - "NewTab Notes initialized successfully"

### Common Issues:

**Folder not creating?**
- Check console for error
- Look for "Creating folder:" log
- Verify Chrome storage permission

**Notes not syncing across tabs?**
- Check console for "Storage changed in another tab"
- Verify both tabs are fully loaded
- Refresh both tabs

**Auto-save not working?**
- Wait 1 full second after typing
- Check console for "Note updated:" log
- Verify you're in a real note (not empty state)

## ✅ What Should Work Now

### Folder Operations
- ✅ Create folders with custom colors
- ✅ Delete folders (with confirmation)
- ✅ Folders sync across tabs instantly
- ✅ Folder note count updates automatically

### Note Operations
- ✅ Create notes via "+ New Note" button
- ✅ Create notes via Cmd/Ctrl+N
- ✅ Edit note titles (auto-save)
- ✅ Edit note content (rich text + auto-save)
- ✅ Add checklists with toolbar
- ✅ Check/uncheck items
- ✅ Pin/unpin notes
- ✅ Delete notes
- ✅ Notes sync across tabs

### Editor Features
- ✅ Bold, Italic, Underline, Strikethrough
- ✅ Headings (H1, H2, H3)
- ✅ Lists (ordered, bullet, checklist)
- ✅ Colors and backgrounds
- ✅ Links
- ✅ Auto-save (1 second debounce)

### Global Features
- ✅ Real-time search
- ✅ Dark mode toggle
- ✅ Wallpaper upload/remove
- ✅ Opacity adjustment
- ✅ Export/Import
- ✅ Cross-tab sync
- ✅ Toast notifications
- ✅ Storage usage display

### Keyboard Shortcuts
- ✅ Cmd/Ctrl+N - New note
- ✅ Cmd/Ctrl+F - Focus search
- ✅ Esc - Close modals/clear search

## 📊 Success Criteria

All tests should pass with:
- ✅ No console errors
- ✅ Toast notifications appear
- ✅ Data saves and loads correctly
- ✅ Syncs across multiple tabs
- ✅ All UI elements responsive

---

**If any test fails**, check the console (F12) and let me know the exact error message!

Happy testing! 🎉
