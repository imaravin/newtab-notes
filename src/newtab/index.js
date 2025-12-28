/**
 * NewTab Notes - Notion-Like Design
 */

import StorageService from '../services/storage.js';
import NotesService from '../services/notes.js';
import { debounce } from '../utils/helpers.js';
import { getQuillConfig, QUILL_EVENTS } from '../utils/quill-config.js';

// Global State
let notes = [];
let currentNote = null;
let quillEditor = null;
let openTabs = []; // Array of note IDs that are open in tabs

// Initialize Application
document.addEventListener('DOMContentLoaded', async () => {
  console.log('NewTab Notes initializing...');

  try {
    // Check if chrome.storage is available
    if (typeof chrome === 'undefined' || !chrome.storage) {
      throw new Error('Chrome storage API not available.');
    }

    // Wait for Quill to load
    if (typeof Quill === 'undefined') {
      await new Promise((resolve) => {
        const checkQuill = setInterval(() => {
          if (typeof Quill !== 'undefined') {
            clearInterval(checkQuill);
            resolve();
          }
        }, 100);
      });
    }

    // Initialize storage with defaults
    await StorageService.initializeDefaults();

    // Load data
    await loadAllData();

    // Setup UI
    setupEventListeners();
    initializeEditor();

    console.log('NewTab Notes initialized successfully');
  } catch (error) {
    console.error('Failed to initialize app:', error);
    showError('Failed to initialize application: ' + error.message);
  }
});

// Load all data from storage
async function loadAllData() {
  notes = await NotesService.getAllNotes();

  // Load open tabs from storage
  const settings = await StorageService.getSettings();
  openTabs = settings.openTabs || [];

  // If no tabs are open, show empty state
  if (openTabs.length === 0) {
    showEmptyState();
  } else {
    // Render tabs and load first note
    renderTabs();
    if (currentNote === null && openTabs.length > 0) {
      selectNote(openTabs[0]);
    }
  }
}

// Render note tabs
function renderTabs() {
  const tabsContainer = document.getElementById('noteTabs');
  tabsContainer.innerHTML = '';

  openTabs.forEach(noteId => {
    const note = notes.find(n => n.id === noteId);
    if (!note) return; // Note might have been deleted

    const tab = document.createElement('button');
    tab.className = 'note-tab' + (currentNote && currentNote.id === noteId ? ' active' : '');
    tab.innerHTML = `
      <span class="note-tab-title">${escapeHtml(note.title || 'Untitled')}</span>
      <span class="note-tab-close" data-note-id="${noteId}">×</span>
    `;

    tab.addEventListener('click', (e) => {
      if (!e.target.classList.contains('note-tab-close')) {
        selectNote(noteId);
      }
    });

    // Close tab handler
    tab.querySelector('.note-tab-close').addEventListener('click', async (e) => {
      e.stopPropagation();
      await closeTab(noteId);
    });

    tabsContainer.appendChild(tab);
  });
}

// Select a note
async function selectNote(noteId) {
  const note = await NotesService.getNote(noteId);
  if (!note) {
    // Note was deleted, remove from tabs
    await closeTab(noteId);
    return;
  }

  currentNote = note;

  // Update tabs
  renderTabs();

  // Show editor
  document.getElementById('emptyState').style.display = 'none';
  document.getElementById('editorContainer').style.display = 'flex';

  // Load note into editor
  document.getElementById('noteTitle').value = note.title;

  // Preserve cursor position if we're already showing this note
  const selection = quillEditor.getSelection();
  quillEditor.setContents(note.content);
  if (selection && currentNote.id === noteId) {
    quillEditor.setSelection(selection.index, selection.length);
  }
}

// Create new note and open in tab
async function createNewNote() {
  try {
    // Create note (no folder needed anymore)
    const note = await NotesService.createNote(null, 'Untitled');

    // Add to open tabs
    openTabs.push(note.id);
    await saveOpenTabs();

    // Reload data and select new note
    await loadAllData();
    selectNote(note.id);

    // Focus on title input
    setTimeout(() => {
      document.getElementById('noteTitle').focus();
      document.getElementById('noteTitle').select();
    }, 100);
  } catch (error) {
    console.error('Error creating note:', error);
    showError('Failed to create note: ' + error.message);
  }
}

// Close a tab
async function closeTab(noteId) {
  const index = openTabs.indexOf(noteId);
  if (index > -1) {
    openTabs.splice(index, 1);
    await saveOpenTabs();
  }

  // If we closed the current note, select another tab or show empty state
  if (currentNote && currentNote.id === noteId) {
    if (openTabs.length > 0) {
      // Select previous tab or first tab
      const newIndex = Math.max(0, index - 1);
      selectNote(openTabs[newIndex]);
    } else {
      showEmptyState();
    }
  } else {
    renderTabs();
  }
}

// Save current note
async function saveCurrentNote() {
  if (!currentNote || !quillEditor) return;

  const content = quillEditor.getContents();
  const title = document.getElementById('noteTitle').value.trim() || 'Untitled';

  // Save cursor position before updating
  const selection = quillEditor.getSelection();

  await NotesService.updateNote(currentNote.id, {
    title,
    content
  });

  // Update current note reference
  currentNote = await NotesService.getNote(currentNote.id);

  // Reload notes data
  notes = await NotesService.getAllNotes();

  // Update tab title
  renderTabs();

  // Restore cursor position
  if (selection) {
    quillEditor.setSelection(selection.index, selection.length);
  }

  // Show saved indicator
  const lastSavedEl = document.getElementById('lastSaved');
  lastSavedEl.textContent = 'Saved';
  setTimeout(() => {
    lastSavedEl.textContent = 'All changes saved';
  }, 2000);
}

// Save open tabs to storage
async function saveOpenTabs() {
  await StorageService.updateSettings({ openTabs });
}

// Show empty state
function showEmptyState() {
  document.getElementById('emptyState').style.display = 'flex';
  document.getElementById('editorContainer').style.display = 'none';
  currentNote = null;
  renderTabs();
}

// Initialize Quill Editor
function initializeEditor() {
  const editorEl = document.getElementById('editor');
  const config = getQuillConfig();

  quillEditor = new Quill(editorEl, config);

  // Auto-save on text change (debounced)
  const autoSave = debounce(async () => {
    if (currentNote && quillEditor) {
      await saveCurrentNote();
    }
  }, 1000);

  quillEditor.on(QUILL_EVENTS.TEXT_CHANGE, autoSave);
}

// Setup event listeners
function setupEventListeners() {
  // New Note Button
  document.getElementById('newNoteButton').addEventListener('click', createNewNote);

  // Note Title Input
  document.getElementById('noteTitle').addEventListener('input', debounce(async () => {
    if (currentNote) {
      await saveCurrentNote();
    }
  }, 1000));

  // Keyboard shortcuts
  document.addEventListener('keydown', async (e) => {
    // Cmd/Ctrl + N: New Note
    if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
      e.preventDefault();
      await createNewNote();
    }

    // Cmd/Ctrl + W: Close current tab
    if ((e.metaKey || e.ctrlKey) && e.key === 'w' && currentNote) {
      e.preventDefault();
      await closeTab(currentNote.id);
    }

    // Esc: Close modals
    if (e.key === 'Escape') {
      const confirmModal = document.getElementById('confirmModal');
      if (confirmModal) {
        confirmModal.style.display = 'none';
      }
    }
  });
}

// Utility: Escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Notification helpers
function showSuccess(message) {
  console.log('Success:', message);

  const toast = document.createElement('div');
  toast.className = 'toast toast-success';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #27AE60;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

function showError(message) {
  console.error('Error:', message);

  const toast = document.createElement('div');
  toast.className = 'toast toast-error';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #E74C3C;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 300);
  }, 5000);
}

// Toast animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
