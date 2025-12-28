/**
 * Folders Service - Handles folder CRUD operations
 */

import StorageService from './storage.js';

class FoldersService {
  /**
   * Create a new folder
   * @param {string} name - Folder name
   * @param {string} color - Folder color (hex)
   * @returns {Promise<Object>} - Created folder
   */
  static async createFolder(name, color = '#4A90E2') {
    try {
      const folders = await StorageService.getFolders();

      const newFolder = {
        id: `folder_${Date.now()}`,
        name: name.trim(),
        color,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        noteCount: 0
      };

      folders.push(newFolder);
      await StorageService.set({ folders });

      console.log('Folder created:', newFolder);
      return newFolder;
    } catch (error) {
      console.error('Failed to create folder:', error);
      throw error;
    }
  }

  /**
   * Update a folder
   * @param {string} folderId - Folder ID
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object>} - Updated folder
   */
  static async updateFolder(folderId, updates) {
    try {
      const folders = await StorageService.getFolders();
      const folderIndex = folders.findIndex(f => f.id === folderId);

      if (folderIndex === -1) {
        throw new Error('Folder not found');
      }

      folders[folderIndex] = {
        ...folders[folderIndex],
        ...updates,
        updatedAt: Date.now()
      };

      await StorageService.set({ folders });

      console.log('Folder updated:', folders[folderIndex]);
      return folders[folderIndex];
    } catch (error) {
      console.error('Failed to update folder:', error);
      throw error;
    }
  }

  /**
   * Delete a folder and all its notes
   * @param {string} folderId - Folder ID
   * @returns {Promise<void>}
   */
  static async deleteFolder(folderId) {
    try {
      const folders = await StorageService.getFolders();
      const notes = await StorageService.getNotes();

      // Remove folder
      const updatedFolders = folders.filter(f => f.id !== folderId);

      // Remove all notes in this folder
      const updatedNotes = notes.filter(n => n.folderId !== folderId);

      await StorageService.set({
        folders: updatedFolders,
        notes: updatedNotes
      });

      console.log('Folder deleted:', folderId);
    } catch (error) {
      console.error('Failed to delete folder:', error);
      throw error;
    }
  }

  /**
   * Get a folder by ID
   * @param {string} folderId - Folder ID
   * @returns {Promise<Object|null>} - Folder or null if not found
   */
  static async getFolder(folderId) {
    try {
      const folders = await StorageService.getFolders();
      return folders.find(f => f.id === folderId) || null;
    } catch (error) {
      console.error('Failed to get folder:', error);
      throw error;
    }
  }

  /**
   * Get all folders
   * @returns {Promise<Array>}
   */
  static async getAllFolders() {
    try {
      return await StorageService.getFolders();
    } catch (error) {
      console.error('Failed to get folders:', error);
      throw error;
    }
  }

  /**
   * Update note count for a folder
   * @param {string} folderId - Folder ID
   * @returns {Promise<void>}
   */
  static async updateNoteCount(folderId) {
    try {
      const notes = await StorageService.getNotes();
      const count = notes.filter(n => n.folderId === folderId).length;

      await this.updateFolder(folderId, { noteCount: count });
    } catch (error) {
      console.error('Failed to update note count:', error);
      throw error;
    }
  }
}

export default FoldersService;
