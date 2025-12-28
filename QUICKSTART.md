# Quick Start Guide - NewTab Notes Chrome Extension

## ✅ Installation Complete!

Your Chrome extension is ready to be loaded with all dependencies bundled locally (no external CDN dependencies).

**Latest Update:** Quill.js is now included locally to comply with Chrome's Content Security Policy.

## 📦 What's Been Created

The extension includes:
- ✅ Folder organization with color coding
- ✅ Rich text editor (Quill.js) with formatting toolbar
- ✅ Interactive checklists (create with toolbar button)
- ✅ Search across all notes
- ✅ Dark mode toggle
- ✅ Custom wallpaper upload with opacity control
- ✅ Export/Import data as JSON
- ✅ Pin important notes
- ✅ Auto-save (debounced 1 second)
- ✅ Keyboard shortcuts

## 🚀 Load Extension in Chrome

1. **Open Chrome Extensions Page**
   - Navigate to `chrome://extensions/`
   - OR: Chrome Menu → More Tools → Extensions

2. **Enable Developer Mode**
   - Toggle "Developer mode" switch in the top-right corner

3. **Load the Extension**
   - Click "Load unpacked"
   - Navigate to: `/Users/aravinth/Desktop/newtab_notes/dist`
   - Click "Select"

4. **Test It**
   - Open a new tab (Cmd+T or Ctrl+T)
   - You should see the NewTab Notes interface!

## 🎯 First Steps

1. **Create Your First Folder**
   - Click "📁 New Folder" button in the sidebar
   - Enter a name (e.g., "Personal", "Work", "Ideas")
   - Choose a color
   - Click "Save"

2. **Create Your First Note**
   - Click "+ New Note" under your folder
   - Type a title
   - Start writing in the rich text editor
   - Notes auto-save every second

3. **Add a Checklist**
   - Click the checklist button (☑) in the toolbar
   - Type your checklist items
   - Press Enter for new items
   - Click checkboxes to mark complete

4. **Try Dark Mode**
   - Click the 🌙 moon icon in the header
   - Everything switches to dark theme

5. **Upload a Wallpaper**
   - Click ⚙️ Settings
   - Click "Upload Wallpaper"
   - Choose an image (will be compressed)
   - Adjust opacity slider

## ⌨️ Keyboard Shortcuts

- `Cmd/Ctrl + N` → New note in current folder
- `Cmd/Ctrl + F` → Focus search
- `Esc` → Close modals or clear search

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Development mode (with hot reload)
npm run dev

# Generate placeholder icons
node generate-icons.js
```

## 📁 Project Structure

```
newtab_notes/
├── dist/                          ← Load this in Chrome!
│   ├── manifest.json
│   ├── icons/
│   ├── src/newtab/index.html
│   ├── newtab.js
│   └── assets/newtab.css
├── src/
│   ├── newtab/                   ← Main UI
│   │   ├── index.html
│   │   ├── index.js
│   │   └── styles.css
│   ├── services/                 ← Business logic
│   │   ├── storage.js
│   │   ├── folders.js
│   │   ├── notes.js
│   │   ├── search.js
│   │   └── wallpaper.js
│   └── utils/                    ← Helper functions
│       ├── helpers.js
│       └── quill-config.js
├── manifest.json                 ← Extension config
├── package.json
├── vite.config.js
└── README.md                     ← Full documentation
```

## 🎨 Customization

### Replace Placeholder Icons

The current icons are minimal 1x1 placeholders. For better icons:

1. Create proper icons at:
   - https://www.favicon-generator.org/
   - https://realfavicongenerator.net/

2. Save as:
   - `public/icons/icon16.png` (16x16)
   - `public/icons/icon32.png` (32x32)
   - `public/icons/icon48.png` (48x48)
   - `public/icons/icon128.png` (128x128)

3. Rebuild:
   ```bash
   npm run build
   cp -r public/icons dist/
   ```

4. Reload extension in Chrome

### Customize Colors

Edit `src/newtab/styles.css` and modify CSS variables:

```css
:root {
  --accent-color: #4A90E2;  /* Main accent color */
  --bg-primary: #ffffff;     /* Background */
  /* ... etc */
}
```

## 🐛 Troubleshooting

### Extension Not Loading
- Make sure you selected the `dist` folder, not the project root
- Check Chrome console (F12) for errors

### Icons Not Showing
- Run: `cp -r public/icons dist/`
- Reload extension in Chrome

### Changes Not Appearing
- After code changes, run: `npm run build`
- Click reload icon (🔄) on extension card in chrome://extensions/

### Data Not Saving
- Open DevTools (F12) → Console
- Check for Chrome storage errors
- Verify extension permissions include "storage"

## 📊 Storage Info

- **Limit**: 10MB (Chrome storage.local)
- **Current Usage**: Check bottom of sidebar
- **Export**: Settings → Export All Data
- **Import**: Settings → Import Data

## 🎉 Features Overview

### Folders
- Color-coded organization
- Click to expand/collapse
- Delete with confirmation

### Notes
- Rich text formatting (bold, italic, underline)
- Headings (H1, H2, H3)
- Lists (ordered, bullet, checkbox)
- Links
- Auto-save (1 second debounce)
- Pin to keep at top

### Checklists
- Created via toolbar button
- Interactive checkboxes
- Track completion
- Count shown in note info

### Search
- Real-time search
- Searches titles and content
- Results grouped by folder
- Clear with Esc

### Wallpaper
- Upload custom images
- Auto-compression
- Adjustable opacity
- Remove to reset

### Dark Mode
- Toggle with one click
- Applies to all components
- Includes editor
- Preference saved

### Export/Import
- JSON format
- Complete data backup
- Includes all folders, notes, settings
- Replace or merge on import

## 📝 Next Steps

1. **Test all features** - Try creating folders, notes, checklists
2. **Customize icons** - Replace placeholders with proper icons
3. **Add content** - Start organizing your notes and ideas
4. **Export regularly** - Backup your data periodically
5. **Enjoy!** - You now have a powerful note-taking new tab!

## 🤝 Support

For issues or questions:
- Check README.md for full documentation
- Review code in `src/` directory
- Open Chrome DevTools for debugging

---

**Built with**: Manifest V3, Quill.js, Vite, Chrome Storage API

**Version**: 1.0.0

Enjoy your new tab note-taking experience! 📝✨
