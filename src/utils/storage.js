/**
 * Safe LocalStorage utilities with fallback and corruption handling for Shopora.
 */

const STORAGE_KEYS = {
  CART: 'shopora_cart_v1',
  WISHLIST: 'shopora_wishlist_v1',
  ORDERS: 'shopora_orders_v1',
  AUTH_USER: 'shopora_auth_user_v1',
  THEME: 'shopora_theme_v1',
  RECENTLY_VIEWED: 'shopora_recently_viewed_v1',
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

/**
 * Recently Viewed products helper
 */
export const addRecentlyViewedProduct = (product) => {
  if (!product || !product.id) return;
  try {
    const existing = getStorageItem(STORAGE_KEYS.RECENTLY_VIEWED, []);
    const filtered = existing.filter((p) => p.id !== product.id);
    const updated = [
      {
        id: product.id,
        title: product.title,
        price: product.price,
        discountPercentage: product.discountPercentage,
        rating: product.rating,
        thumbnail: product.thumbnail,
        category: product.category,
      },
      ...filtered,
    ].slice(0, 8); // Keep last 8 items
    setStorageItem(STORAGE_KEYS.RECENTLY_VIEWED, updated);
  } catch (err) {
    console.error('Error adding to recently viewed:', err);
  }
};

export const getRecentlyViewedProducts = () => {
  return getStorageItem(STORAGE_KEYS.RECENTLY_VIEWED, []);
};
