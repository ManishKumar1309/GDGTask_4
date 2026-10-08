import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem, STORAGE_KEYS } from '../utils/storage';
import { useNotification } from './NotificationContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { addToast } = useNotification();
  
  // Safe initialization from LocalStorage
  const [cart, setCart] = useState(() => {
    const stored = getStorageItem(STORAGE_KEYS.CART, []);
    return Array.isArray(stored) ? stored : [];
  });

  // Sync to LocalStorage whenever cart changes
  useEffect(() => {
    setStorageItem(STORAGE_KEYS.CART, cart);
  }, [cart]);

  /**
   * Add item to cart or increment quantity if already present
   */
  const addToCart = (product, quantity = 1) => {
    if (!product || !product.id) return;
    const qty = Math.max(1, parseInt(quantity, 10) || 1);

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id);

      if (existingIndex > -1) {
        const updated = [...prevCart];
        const currentQty = updated[existingIndex].quantity;
        const maxStock = product.stock || 99;
        const newQty = Math.min(currentQty + qty, maxStock);
        
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            title: product.title,
            price: Number(product.price) || 0,
            thumbnail: product.thumbnail || (product.images && product.images[0]) || '',
            category: product.category || 'General',
            stock: product.stock || 99,
            quantity: qty,
          },
        ];
      }
    });

    addToast(`"${product.title}" added to your bag`, 'success');
  };

  /**
   * Remove item from cart
   */
  const removeFromCart = (productId, showNotification = true) => {
    const item = cart.find((i) => i.id === productId);
    setCart((prev) => prev.filter((i) => i.id !== productId));
    if (showNotification && item) {
      addToast(`Removed "${item.title}" from bag`, 'info');
    }
  };

  /**
   * Update quantity of an item
   */
  const updateQuantity = (productId, newQuantity) => {
    const qty = parseInt(newQuantity, 10);
    if (isNaN(qty) || qty <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          const maxStock = item.stock || 99;
          return {
            ...item,
            quantity: Math.min(qty, maxStock),
          };
        }
        return item;
      })
    );
  };

  /**
   * Clear all items in cart
   */
  const clearCart = () => {
    setCart([]);
  };

  // Computations
  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  // Free shipping threshold at $75
  const shippingThreshold = 75;
  const shippingCost = subtotal === 0 ? 0 : subtotal >= shippingThreshold ? 0 : 9.99;
  const grandTotal = subtotal + shippingCost;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        shippingCost,
        shippingThreshold,
        grandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
};
