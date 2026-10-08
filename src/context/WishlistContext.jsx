import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem, STORAGE_KEYS } from '../utils/storage';
import { useNotification } from './NotificationContext';
import { useCart } from './CartContext';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const { addToast } = useNotification();
  const { addToCart } = useCart();

  const [wishlist, setWishlist] = useState(() => {
    const stored = getStorageItem(STORAGE_KEYS.WISHLIST, []);
    return Array.isArray(stored) ? stored : [];
  });

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.WISHLIST, wishlist);
  }, [wishlist]);

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const addToWishlist = (product) => {
    if (!product || !product.id) return;
    if (isInWishlist(product.id)) {
      addToast(`"${product.title}" is already in your wishlist`, 'info');
      return;
    }

    setWishlist((prev) => [
      ...prev,
      {
        id: product.id,
        title: product.title,
        price: Number(product.price) || 0,
        rating: Number(product.rating) || 4.5,
        thumbnail: product.thumbnail || (product.images && product.images[0]) || '',
        category: product.category || 'General',
        brand: product.brand || 'Aura',
        stock: product.stock || 20,
      },
    ]);

    addToast(`Saved "${product.title}" to wishlist`, 'success');
  };

  const removeFromWishlist = (productId, showNotification = true) => {
    const item = wishlist.find((i) => i.id === productId);
    setWishlist((prev) => prev.filter((i) => i.id !== productId));
    if (showNotification && item) {
      addToast(`Removed "${item.title}" from wishlist`, 'info');
    }
  };

  const toggleWishlist = (product) => {
    if (!product || !product.id) return;
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const moveToCart = (product) => {
    if (!product) return;
    addToCart(product, 1);
    removeFromWishlist(product.id, false);
    addToast(`Moved "${product.title}" to cart!`, 'success');
  };

  const totalWishlist = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        moveToCart,
        totalWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return ctx;
};
