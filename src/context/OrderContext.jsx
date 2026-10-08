import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem, STORAGE_KEYS } from '../utils/storage';
import { generateOrderId } from '../utils/formatters';
import { useNotification } from './NotificationContext';
import { useCart } from './CartContext';

const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  const { addToast } = useNotification();
  const { clearCart } = useCart();

  const [orders, setOrders] = useState(() => {
    const stored = getStorageItem(STORAGE_KEYS.ORDERS, []);
    return Array.isArray(stored) ? stored : [];
  });

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.ORDERS, orders);
  }, [orders]);

  /**
   * Place an order
   */
  const placeOrder = ({ customer, shipping, items, subtotal, shippingCost, grandTotal }) => {
    const newOrder = {
      id: generateOrderId(),
      date: new Date().toISOString(),
      status: 'Order Placed',
      customer: {
        fullName: customer.fullName.trim(),
        email: customer.email.trim(),
        phone: customer.phone.trim(),
      },
      shippingAddress: {
        address: shipping.address.trim(),
        city: shipping.city.trim(),
        state: shipping.state.trim(),
        postalCode: shipping.postalCode.trim(),
        country: shipping.country.trim(),
      },
      items: items.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        thumbnail: item.thumbnail,
        subtotal: item.price * item.quantity,
      })),
      totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal,
      shippingCost,
      totalAmount: grandTotal,
      estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    addToast(`Order ${newOrder.id} confirmed!`, 'success', 4500);

    return newOrder;
  };

  const getOrderById = (orderId) => {
    if (!orderId) return null;
    return orders.find((o) => o.id === orderId) || null;
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        placeOrder,
        getOrderById,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return ctx;
};
