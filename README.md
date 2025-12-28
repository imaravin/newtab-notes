# NewTab Notes - Chrome Extension

A powerful note-taking Chrome extension that replaces your new tab page with a feature-rich notes application.

## Features

- **📁 Folder Organization**: Organize notes into color-coded folders
- **✏️ Rich Text Editor**: Full WYSIWYG editor powered by Quill.js
- **✅ Checklists**: Create interactive checklists within your notes
- **🔍 Search**: Quickly find notes by title or content
- **🎨 Custom Wallpapers**: Upload your own background images
- **🌙 Dark Mode**: Easy on the eyes with dark theme support
- **💾 Export/Import**: Backup and restore your data as JSON
- **📌 Pin Notes**: Keep important notes at the top
- **⌨️ Keyboard Shortcuts**: Efficient navigation and actions

## Installation

### Development Mode (Unpacked Extension)

1. **Install Dependencies**
   ```bash
   cd newtab_notes
   npm install
   ```

2. **Build the Extension**
   ```bash
   npm run build
   ```

3. **Load in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `dist` folder from this project

4. **Test the Extension**
   - Open a new tab
   - You should see the NewTab Notes interface

### Production Build

For a production-ready build:
```bash
npm run build
```

This creates optimized files in the `dist` folder.

## Setup Instructions

### 1. Create Extension Icons

You need to create icons in the following sizes and place them in `public/icons/`:
- `icon16.png` (16x16 pixels)
- `icon32.png` (32x32 pixels)
- `icon48.png` (48x48 pixels)
- `icon128.png` (128x128 pixels)

**Quick Icon Creation:**
- Use [Favicon Generator](https://www.favicon-generator.org/)
- Use [RealFaviconGenerator](https://realfavicongenerator.net/)
- Or create your own using any image editor

### 2. Copy Manifest to Dist

After building, manually copy the manifest.json to the dist folder:
```bash
cp manifest.json dist/
cp -r public/icons dist/
```

**Or create a build script** (already included in package.json):
The build process should automatically include manifest.json.

## Usage

### Creating Folders
1. Click the "New Folder" button in the sidebar
2. Enter a folder name
3. Choose a color
4. Click "Save"

### Creating Notes
1. Click "+ New Note" in any folder
2. Type your note title
3. Use the rich text editor for formatting
4. Notes auto-save as you type

### Adding Checklists
1. In the editor toolbar, click the checklist button (☑)
2. Type your checklist item
3. Press Enter to add more items
4. Click checkboxes to mark items complete

### Keyboard Shortcuts
- `Cmd/Ctrl + N`: Create new note (in current folder)
- `Cmd/Ctrl + F`: Focus search bar
- `Cmd/Ctrl + S`: Manual save (auto-save already enabled)
- `Esc`: Close modals or clear search

### Search
- Type in the global search bar at the top
- Search works across all note titles and content
- Results are grouped by folder

### Settings
1. Click the ⚙️ settings icon
2. **Wallpaper**: Upload custom background or remove it
3. **Opacity**: Adjust background transparency
4. **Export/Import**: Backup or restore your data

### Dark Mode
- Click the 🌙 moon icon to toggle dark mode
- Your preference is saved automatically

## Development

### Project Structure
```
newtab_notes/
├── manifest.json          # Chrome extension manifest
├── package.json           # Dependencies and scripts
├── vite.config.js         # Build configuration
├── public/
│   └── icons/             # Extension icons
├── src/
│   ├── newtab/
│   │   ├── index.html     # Main HTML
│   │   ├── index.js       # Main JavaScript
│   │   └── styles.css     # All styles
│   ├── services/          # Business logic
│   │   ├── storage.js
│   │   ├── folders.js
│   │   ├── notes.js
│   │   ├── search.js
│   │   └── wallpaper.js
│   └── utils/             # Helper functions
│       ├── helpers.js
│       └── quill-config.js
└── dist/                  # Build output
```

### Technologies Used
- **Manifest V3**: Latest Chrome extension standard
- **Quill.js 2.0**: Rich text editor
- **Vite**: Fast build tool
- **Chrome Storage API**: Local data persistence
- **Vanilla JavaScript**: No framework overhead

### Storage Limits
- Chrome storage local limit: 10MB
- Wallpapers are compressed to stay under 5MB
- Export data if approaching limit

## Troubleshooting

### Extension Not Loading
1. Make sure you ran `npm install` and `npm run build`
2. Verify `manifest.json` and icons are in the `dist` folder
3. Check Chrome DevTools console for errors

### Icons Missing
1. Create icons in `public/icons/` folder
2. Copy them to `dist/icons/` after build
3. Or use placeholder images temporarily

### Data Not Saving
1. Check Chrome extension permissions
2. Open DevTools (F12) and check console for errors
3. Verify Chrome storage isn't full

### Wallpaper Not Showing
1. Make sure image is under 5MB
2. Use JPEG format for best compression
3. Try lowering image resolution

## Future Enhancements

Potential features for future versions:
- [ ] Tags for notes
- [ ] Markdown export
- [ ] Cloud sync (Google Drive, Dropbox)
- [ ] Note templates
- [ ] Multiple note views (list, grid, kanban)
- [ ] Collaboration features
- [ ] Browser sync across devices
- [ ] PDF export

## Privacy

All data is stored locally in your browser using Chrome's storage API. No data is sent to external servers.

## License

MIT License - Feel free to modify and distribute

## Support

For issues or questions, please open an issue on GitHub or contact the developer.

---

**Enjoy your new tab note-taking experience!** 📝✨
