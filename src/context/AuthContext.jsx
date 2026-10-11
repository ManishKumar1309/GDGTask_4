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

  const login = ({ email, password, name }) => {
    const displayName = name || (email ? email.split('@')[0] : 'Shopora Member');
    const cleanName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
    
    // Store only safe profile data - NO plain-text passwords
    const newUser = {
      id: 'USR-' + Math.floor(100000 + Math.random() * 900000),
      email: email.trim(),
      name: cleanName,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanName)}&backgroundColor=0f172a,ff9900`,
      joinedAt: new Date().toISOString(),
    };

    setUser(newUser);
    addToast(`Welcome back, ${newUser.name}!`, 'success');
    return newUser;
  };

  const signup = ({ name, email, password }) => {
    const cleanName = (name || email.split('@')[0]).trim();
    const formattedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

    // Store only safe profile data - NO plain-text passwords
    const newUser = {
      id: 'USR-' + Math.floor(100000 + Math.random() * 900000),
      email: email.trim(),
      name: formattedName,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(formattedName)}&backgroundColor=0f172a,ff9900`,
      joinedAt: new Date().toISOString(),
    };

    setUser(newUser);
    addToast(`Account created! Welcome to Shopora, ${newUser.name}!`, 'success');
    return newUser;
  };

  const logout = () => {
    const prevName = user?.name || 'User';
    setUser(null);
    removeStorageItem(STORAGE_KEYS.AUTH_USER);
    addToast(`Logged out successfully. Have a great day, ${prevName}!`, 'info');
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
        signup,
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
