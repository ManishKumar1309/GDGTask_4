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
  const placeOrder = ({ customer, shipping, items, paymentMethod = 'Cash on Delivery', subtotal, shippingCost, grandTotal }) => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4);

    const newOrder = {
      id: generateOrderId(),
      date: new Date().toISOString(),
      status: 'Order Confirmed',
      paymentMethod,
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
        country: shipping.country || 'India',
      },
      items: items.map((item) => ({
        id: item.id,
        title: item.title,
        price: Number(item.price) || 0,
        quantity: item.quantity,
        thumbnail: item.thumbnail,
        category: item.category,
        subtotal: (Number(item.price) || 0) * item.quantity,
      })),
      totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal,
      shippingCost,
      totalAmount: grandTotal,
      estimatedDelivery: deliveryDate.toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    addToast(`Order ${newOrder.id} placed successfully!`, 'success', 5000);

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
