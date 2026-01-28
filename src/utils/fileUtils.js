/**
 * Utility functions for file handling in the exam evaluation system
 */

/**
 * Convert a File object to a Base64 string
 * @param {File} file - The file to convert
 * @returns {Promise<string>} - Base64 encoded string
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

/**
 * Convert a Base64 string back to a Blob URL
 * @param {string} base64String - The Base64 encoded string (data:image/jpeg;base64,... or data:application/pdf;base64,...)
 * @returns {string} - Blob URL that can be used in src attributes
 */
export const base64ToBlobUrl = (base64String) => {
  if (!base64String || typeof base64String !== 'string') {
    return null;
  }

  try {
    // Extract MIME type and base64 data
    const [mimeInfo, base64Data] = base64String.split(',');
    const mimeType = mimeInfo.split(':')[1].split(';')[0];

    // Convert base64 to binary
    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Create blob and return URL
    const blob = new Blob([bytes], { type: mimeType });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error converting base64 to blob URL:', error);
    return null;
  }
};

/**
 * Safely revoke blob URLs to prevent memory leaks
 * @param {...string} urls - Blob URLs to revoke
 */
export const revokeBlobUrls = (...urls) => {
  urls.forEach(url => {
    if (url && url.startsWith('blob:') && url !== 'blob:') {
      try {
        URL.revokeObjectURL(url);
      } catch (error) {
        console.warn('Failed to revoke blob URL:', error);
      }
    }
  });
};

/**
 * Check if a string is a valid Base64 data URL
 * @param {string} str - String to check
 * @returns {boolean} - True if it's a valid Base64 data URL
 */
export const isBase64DataUrl = (str) => {
  return str && typeof str === 'string' && str.startsWith('data:') && str.includes('base64,');
};

/**
 * Get MIME type from Base64 data URL
 * @param {string} base64String - Base64 data URL
 * @returns {string|null} - MIME type or null if invalid
 */
export const getMimeTypeFromBase64 = (base64String) => {
  if (!isBase64DataUrl(base64String)) {
    return null;
  }
  try {
    const mimeInfo = base64String.split(',')[0];
    return mimeInfo.split(':')[1].split(';')[0];
  } catch (error) {
    return null;
  }
};