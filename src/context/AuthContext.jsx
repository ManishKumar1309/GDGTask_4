import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem, removeStorageItem, STORAGE_KEYS } from '../utils/storage';
import { useNotification } from './NotificationContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { addToast } = useNotification();

  const [user, setUser] = useState(() => {
    return getStorageItem(STORAGE_KEYS.AUTH_USER, null);
  });

  useEffect(() => {
    if (user) {
      setStorageItem(STORAGE_KEYS.AUTH_USER, user);
    } else {
      removeStorageItem(STORAGE_KEYS.AUTH_USER);
    }
  }, [user]);

  const login = (credentials) => {
    const { email, name } = credentials;
    const displayName = name || (email ? email.split('@')[0] : 'Shopify Member');
    const newUser = {
      id: 'USR-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
      email: email.trim(),
      name: displayName.charAt(0).toUpperCase() + displayName.slice(1),
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}&backgroundColor=0f172a,059669,2563eb`,
      joinedAt: new Date().toISOString(),
    };

    setUser(newUser);
    addToast(`Welcome back, ${newUser.name}!`, 'success');
    return newUser;
  };

  const logout = () => {
    const prevName = user?.name || 'User';
    setUser(null);
    removeStorageItem(STORAGE_KEYS.AUTH_USER);
    addToast(`Goodbye, ${prevName}. You have been logged out.`, 'info');
  };

  const updateProfile = (updates) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      setStorageItem(STORAGE_KEYS.AUTH_USER, updated);
      return updated;
    });
    addToast('Profile updated successfully!', 'success');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};
