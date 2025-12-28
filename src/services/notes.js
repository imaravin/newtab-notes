/**
 * Notes Service - Handles note CRUD operations and checklist management
 */

import StorageService from './storage.js';

class NotesService {
  /**
   * Create a new note
   * @param {string|null} folderId - Parent folder ID (optional, can be null)
   * @param {string} title - Note title
   * @returns {Promise<Object>} - Created note
   */
  static async createNote(folderId = null, title = 'Untitled') {
    try {
      const notes = await StorageService.getNotes();

      const newNote = {
        id: `note_${Date.now()}`,
        title: title.trim(),
        content: { ops: [] }, // Empty Quill Delta
        plainText: '',
        checklistItems: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        isPinned: false
      };

      notes.push(newNote);
      await StorageService.set({ notes });

      console.log('Note created:', newNote);
      return newNote;
    } catch (error) {
      console.error('Failed to create note:', error);
      throw error;
    }
  }

  /**
   * Update a note
   * @param {string} noteId - Note ID
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object>} - Updated note
   */
  static async updateNote(noteId, updates) {
    try {
      const notes = await StorageService.getNotes();
      const noteIndex = notes.findIndex(n => n.id === noteId);

      if (noteIndex === -1) {
        throw new Error('Note not found');
      }

      // If content is updated, extract checklists and plain text
      if (updates.content) {
        updates.checklistItems = this.extractChecklistItems(updates.content);
        updates.plainText = this.deltaToPlainText(updates.content);
      }

      notes[noteIndex] = {
        ...notes[noteIndex],
        ...updates,
        updatedAt: Date.now()
      };

      await StorageService.set({ notes });

      console.log('Note updated:', notes[noteIndex]);
      return notes[noteIndex];
    } catch (error) {
      console.error('Failed to update note:', error);
      throw error;
    }
  }

  /**
   * Delete a note
   * @param {string} noteId - Note ID
   * @returns {Promise<void>}
   */
  static async deleteNote(noteId) {
    try {
      const notes = await StorageService.getNotes();
      const note = notes.find(n => n.id === noteId);

      if (!note) {
        throw new Error('Note not found');
      }

      const updatedNotes = notes.filter(n => n.id !== noteId);
      await StorageService.set({ notes: updatedNotes });

      console.log('Note deleted:', noteId);
    } catch (error) {
      console.error('Failed to delete note:', error);
      throw error;
    }
  }

  /**
   * Get a note by ID
   * @param {string} noteId - Note ID
   * @returns {Promise<Object|null>} - Note or null if not found
   */
  static async getNote(noteId) {
    try {
      const notes = await StorageService.getNotes();
      return notes.find(n => n.id === noteId) || null;
    } catch (error) {
      console.error('Failed to get note:', error);
      throw error;
    }
  }

  /**
   * Get all notes for a folder (deprecated - kept for backwards compatibility)
   * @param {string} folderId - Folder ID
   * @returns {Promise<Array>}
   */
  static async getNotesByFolder(folderId) {
    try {
      const notes = await StorageService.getNotes();
      return notes.filter(n => n.folderId === folderId);
    } catch (error) {
      console.error('Failed to get notes by folder:', error);
      return [];
    }
  }

  /**
   * Get all notes
   * @returns {Promise<Array>}
   */
  static async getAllNotes() {
    try {
      return await StorageService.getNotes();
    } catch (error) {
      console.error('Failed to get all notes:', error);
      throw error;
    }
  }

  /**
   * Toggle pin status of a note
   * @param {string} noteId - Note ID
   * @returns {Promise<Object>} - Updated note
   */
  static async togglePin(noteId) {
    try {
      const note = await this.getNote(noteId);
      if (!note) {
        throw new Error('Note not found');
      }

      return await this.updateNote(noteId, { isPinned: !note.isPinned });
    } catch (error) {
      console.error('Failed to toggle pin:', error);
      throw error;
    }
  }

  /**
   * Extract checklist items from Quill Delta
   * @param {Object} delta - Quill Delta object
   * @returns {Array} - Array of checklist items
   */
  static extractChecklistItems(delta) {
    if (!delta || !delta.ops) return [];

    const checklistItems = [];
    let position = 0;

    delta.ops.forEach((op, index) => {
      if (op.attributes && op.attributes.list === 'checked') {
        checklistItems.push({
          id: `check_${Date.now()}_${index}`,
          text: op.insert.trim(),
          completed: true,
          position: position++
        });
      } else if (op.attributes && op.attributes.list === 'unchecked') {
        checklistItems.push({
          id: `check_${Date.now()}_${index}`,
          text: op.insert.trim(),
          completed: false,
          position: position++
        });
      }
    });

    return checklistItems;
  }

  /**
   * Convert Quill Delta to plain text
   * @param {Object} delta - Quill Delta object
   * @returns {string} - Plain text
   */
  static deltaToPlainText(delta) {
    if (!delta || !delta.ops) return '';

    return delta.ops
      .map(op => {
        if (typeof op.insert === 'string') {
          return op.insert;
        }
        return '';
      })
      .join('')
      .trim();
  }

  /**
   * Move note to different folder (deprecated - no longer used)
   * @param {string} noteId - Note ID
   * @param {string} newFolderId - New folder ID
   * @returns {Promise<Object>} - Updated note
   */
  static async moveNote(noteId, newFolderId) {
    try {
      const note = await this.getNote(noteId);
      if (!note) {
        throw new Error('Note not found');
      }

      const updatedNote = await this.updateNote(noteId, { folderId: newFolderId });
      return updatedNote;
    } catch (error) {
      console.error('Failed to move note:', error);
      throw error;
    }
  }
}

export default NotesService;
