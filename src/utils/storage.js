/**
 * Safe LocalStorage utilities with fallback and corruption handling.
 */

const STORAGE_KEYS = {
  CART: 'aura_cart_v1',
  WISHLIST: 'aura_wishlist_v1',
  ORDERS: 'aura_orders_v1',
  AUTH_USER: 'aura_auth_user_v1',
  SEARCH_HISTORY: 'aura_recent_searches_v1',
};

export { STORAGE_KEYS };

/**
 * Get item from LocalStorage safely with fallback
 * @param {string} key 
 * @param {any} defaultValue 
 * @returns {any}
 */
export const getStorageItem = (key, defaultValue = null) => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null || raw === undefined) {
      return defaultValue;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`[storage] Error parsing "${key}" from localStorage, falling back to default:`, err);
    return defaultValue;
  }
};

/**
 * Save item to LocalStorage safely
 * @param {string} key 
 * @param {any} value 
 * @returns {boolean}
 */
export const setStorageItem = (key, value) => {
  if (typeof window === 'undefined') return false;
  try {
    const serialized = JSON.stringify(value);
    window.localStorage.setItem(key, serialized);
    return true;
  } catch (err) {
    console.error(`[storage] Error saving "${key}" to localStorage:`, err);
    return false;
  }
};

/**
 * Remove an item from LocalStorage
 * @param {string} key 
 */
export const removeStorageItem = (key) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(key);
  } catch (err) {
    console.error(`[storage] Error removing "${key}" from localStorage:`, err);
  }
};

/**
 * Clear all store-specific keys
 */
export const clearStoreStorage = () => {
  if (typeof window === 'undefined') return;
  Object.values(STORAGE_KEYS).forEach((k) => removeStorageItem(k));
};
