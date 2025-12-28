/**
 * Search Service - Handles note searching and indexing
 */

import StorageService from './storage.js';

class SearchService {
  /**
   * Build search index from notes
   * @param {Array} notes - Array of notes
   * @returns {Object} - Search index
   */
  static buildSearchIndex(notes) {
    const index = {};

    notes.forEach(note => {
      index[note.id] = {
        title: note.title.toLowerCase(),
        content: note.plainText.toLowerCase()
      };
    });

    return index;
  }

  /**
   * Search notes by query
   * @param {string} query - Search query
   * @param {Array} notes - Array of notes to search
   * @param {Object} searchIndex - Pre-built search index (optional)
   * @returns {Array} - Filtered notes
   */
  static searchNotes(query, notes, searchIndex = null) {
    const q = query.toLowerCase().trim();

    if (!q) {
      return notes;
    }

    // If no index provided, build on the fly
    if (!searchIndex) {
      searchIndex = this.buildSearchIndex(notes);
    }

    return notes.filter(note => {
      const indexed = searchIndex[note.id];
      if (!indexed) return false;

      return indexed.title.includes(q) || indexed.content.includes(q);
    });
  }

  /**
   * Highlight search terms in text
   * @param {string} text - Text to highlight
   * @param {string} query - Search query
   * @returns {string} - HTML with highlighted terms
   */
  static highlightText(text, query) {
    if (!query || !text) return text;

    const q = query.trim();
    if (!q) return text;

    // Escape special regex characters
    const escapedQuery = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');

    return text.replace(regex, '<mark>$1</mark>');
  }

  /**
   * Get search suggestions based on note titles
   * @param {string} query - Search query
   * @param {Array} notes - Array of notes
   * @param {number} limit - Max suggestions (default: 5)
   * @returns {Array} - Array of suggested titles
   */
  static getSearchSuggestions(query, notes, limit = 5) {
    const q = query.toLowerCase().trim();

    if (!q) return [];

    const suggestions = notes
      .filter(note => note.title.toLowerCase().includes(q))
      .map(note => note.title)
      .slice(0, limit);

    return suggestions;
  }

  /**
   * Search notes by folder
   * @param {string} query - Search query
   * @param {string} folderId - Folder ID
   * @param {Array} notes - Array of notes
   * @returns {Array} - Filtered notes
   */
  static searchInFolder(query, folderId, notes) {
    const folderNotes = notes.filter(note => note.folderId === folderId);
    return this.searchNotes(query, folderNotes);
  }

  /**
   * Advanced search with filters
   * @param {Object} options - Search options
   * @returns {Promise<Array>} - Filtered notes
   */
  static async advancedSearch(options = {}) {
    try {
      const {
        query = '',
        folderId = null,
        hasChecklists = null,
        isPinned = null,
        dateFrom = null,
        dateTo = null
      } = options;

      let notes = await StorageService.getNotes();

      // Filter by folder
      if (folderId) {
        notes = notes.filter(n => n.folderId === folderId);
      }

      // Filter by text query
      if (query) {
        notes = this.searchNotes(query, notes);
      }

      // Filter by checklists
      if (hasChecklists !== null) {
        notes = notes.filter(n => {
          const hasChecklist = n.checklistItems && n.checklistItems.length > 0;
          return hasChecklists ? hasChecklist : !hasChecklist;
        });
      }

      // Filter by pinned status
      if (isPinned !== null) {
        notes = notes.filter(n => n.isPinned === isPinned);
      }

      // Filter by date range
      if (dateFrom) {
        notes = notes.filter(n => n.createdAt >= dateFrom);
      }

      if (dateTo) {
        notes = notes.filter(n => n.createdAt <= dateTo);
      }

      return notes;
    } catch (error) {
      console.error('Advanced search failed:', error);
      throw error;
    }
  }
}

export default SearchService;
