/**
 * Storage Service - Abstraction layer for Chrome storage API
 * Handles all interactions with chrome.storage.local
 */

class StorageService {
  /**
   * Get data from chrome.storage.local
   * @param {string|string[]|null} keys - Keys to retrieve, or null for all data
   * @returns {Promise<Object>} - Retrieved data
   */
  static async get(keys) {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.local.get(keys, (result) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(result);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Set data in chrome.storage.local
   * @param {Object} items - Key-value pairs to store
   * @returns {Promise<void>}
   */
  static async set(items) {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.local.set(items, () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve();
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Remove data from chrome.storage.local
   * @param {string|string[]} keys - Keys to remove
   * @returns {Promise<void>}
   */
  static async remove(keys) {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.local.remove(keys, () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve();
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Clear all data from chrome.storage.local
   * @returns {Promise<void>}
   */
  static async clear() {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.local.clear(() => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve();
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get bytes in use for storage
   * @param {string|string[]|null} keys - Keys to check, or null for all
   * @returns {Promise<number>} - Bytes in use
   */
  static async getBytesInUse(keys = null) {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.local.getBytesInUse(keys, (bytes) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(bytes);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Initialize default data structure if not exists
   * @returns {Promise<void>}
   */
  static async initializeDefaults() {
    try {
      const data = await this.get(null);

      // Check if data is already initialized
      if (data.version) {
        console.log('Storage already initialized with version:', data.version);
        return;
      }

      // Initialize default structure
      const defaults = {
        version: '1.0.0',
        settings: {
          darkMode: false,
          wallpaper: {
            type: 'default',
            value: 'default-wallpaper.jpg',
            opacity: 0.3
          },
          defaultFolderId: null
        },
        folders: [
          {
            id: `folder_${Date.now()}`,
            name: 'My Notes',
            color: '#4A90E2',
            createdAt: Date.now(),
            updatedAt: Date.now(),
            noteCount: 0
          }
        ],
        notes: [],
        searchIndex: {}
      };

      await this.set(defaults);
      console.log('Storage initialized with defaults');
    } catch (error) {
      console.error('Failed to initialize defaults:', error);
      throw error;
    }
  }

  /**
   * Get all folders
   * @returns {Promise<Array>}
   */
  static async getFolders() {
    const data = await this.get('folders');
    return data.folders || [];
  }

  /**
   * Get all notes
   * @returns {Promise<Array>}
   */
  static async getNotes() {
    const data = await this.get('notes');
    return data.notes || [];
  }

  /**
   * Get settings
   * @returns {Promise<Object>}
   */
  static async getSettings() {
    const data = await this.get('settings');
    return data.settings || {};
  }

  /**
   * Update settings
   * @param {Object} newSettings - Settings to update
   * @returns {Promise<void>}
   */
  static async updateSettings(newSettings) {
    const currentSettings = await this.getSettings();
    const updatedSettings = { ...currentSettings, ...newSettings };
    await this.set({ settings: updatedSettings });
  }

  /**
   * Check storage usage and warn if approaching limit
   * @returns {Promise<Object>} - {bytes, percentage, warning}
   */
  static async checkStorageUsage() {
    const bytes = await this.getBytesInUse(null);
    const maxBytes = 10 * 1024 * 1024; // 10MB limit
    const percentage = (bytes / maxBytes) * 100;
    const warning = percentage > 80;

    return {
      bytes,
      percentage: percentage.toFixed(2),
      warning,
      message: warning ? 'Storage usage is above 80%. Consider exporting and clearing old data.' : null
    };
  }
}

export default StorageService;
