/**
 * Wallpaper Service - Handles wallpaper upload, compression, and management
 */

import StorageService from './storage.js';

class WallpaperService {
  /**
   * Upload and set wallpaper
   * @param {File} file - Image file
   * @returns {Promise<Object>} - Wallpaper settings
   */
  static async uploadWallpaper(file) {
    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Invalid file type. Please upload an image.');
      }

      // Compress image
      const compressed = await this.compressImage(file, 1920, 1080, 0.8);

      // Convert to data URI
      const dataUri = await this.fileToDataUri(compressed);

      // Check size (keep under 5MB)
      const sizeInBytes = dataUri.length * 0.75; // Base64 encoding overhead
      if (sizeInBytes > 5 * 1024 * 1024) {
        throw new Error('Image too large even after compression. Please use a smaller image.');
      }

      // Save to storage
      const wallpaperSettings = {
        type: 'custom',
        value: dataUri,
        opacity: 0.3
      };

      await StorageService.updateSettings({ wallpaper: wallpaperSettings });

      console.log('Wallpaper uploaded successfully');
      return wallpaperSettings;
    } catch (error) {
      console.error('Failed to upload wallpaper:', error);
      throw error;
    }
  }

  /**
   * Compress image using Canvas API
   * @param {File|Blob} file - Image file
   * @param {number} maxWidth - Maximum width
   * @param {number} maxHeight - Maximum height
   * @param {number} quality - JPEG quality (0-1)
   * @returns {Promise<Blob>} - Compressed image blob
   */
  static compressImage(file, maxWidth, maxHeight, quality = 0.8) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions
        if (width > maxWidth || height > maxHeight) {
          const aspectRatio = width / height;

          if (width > height) {
            width = maxWidth;
            height = width / aspectRatio;
          } else {
            height = maxHeight;
            width = height * aspectRatio;
          }
        }

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Draw image on canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          'image/jpeg',
          quality
        );
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      // Load image from file
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      reader.readAsDataURL(file);
    });
  }

  /**
   * Convert file to data URI
   * @param {File|Blob} file - File to convert
   * @returns {Promise<string>} - Data URI
   */
  static fileToDataUri(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        resolve(e.target.result);
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsDataURL(file);
    });
  }

  /**
   * Remove custom wallpaper and reset to default
   * @returns {Promise<Object>} - Default wallpaper settings
   */
  static async removeWallpaper() {
    try {
      const wallpaperSettings = {
        type: 'default',
        value: 'default-wallpaper.jpg',
        opacity: 0.3
      };

      await StorageService.updateSettings({ wallpaper: wallpaperSettings });

      console.log('Wallpaper removed, reset to default');
      return wallpaperSettings;
    } catch (error) {
      console.error('Failed to remove wallpaper:', error);
      throw error;
    }
  }

  /**
   * Set wallpaper opacity
   * @param {number} opacity - Opacity value (0-1)
   * @returns {Promise<Object>} - Updated wallpaper settings
   */
  static async setOpacity(opacity) {
    try {
      const settings = await StorageService.getSettings();
      const wallpaper = settings.wallpaper || {};

      wallpaper.opacity = Math.max(0, Math.min(1, opacity));

      await StorageService.updateSettings({ wallpaper });

      console.log('Wallpaper opacity updated:', wallpaper.opacity);
      return wallpaper;
    } catch (error) {
      console.error('Failed to set opacity:', error);
      throw error;
    }
  }

  /**
   * Set solid color background
   * @param {string} color - Hex color code
   * @returns {Promise<Object>} - Color wallpaper settings
   */
  static async setColorBackground(color) {
    try {
      const wallpaperSettings = {
        type: 'color',
        value: color,
        opacity: 1.0
      };

      await StorageService.updateSettings({ wallpaper: wallpaperSettings });

      console.log('Color background set:', color);
      return wallpaperSettings;
    } catch (error) {
      console.error('Failed to set color background:', error);
      throw error;
    }
  }

  /**
   * Get current wallpaper settings
   * @returns {Promise<Object>} - Wallpaper settings
   */
  static async getWallpaperSettings() {
    try {
      const settings = await StorageService.getSettings();
      return settings.wallpaper || {
        type: 'default',
        value: 'default-wallpaper.jpg',
        opacity: 0.3
      };
    } catch (error) {
      console.error('Failed to get wallpaper settings:', error);
      throw error;
    }
  }
}

export default WallpaperService;
