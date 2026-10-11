import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrderProvider } from './context/OrderContext';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import ErrorBoundary from './components/ErrorBoundary';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

/**
 * Automatically scrolls to top on route change
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <NotificationProvider>
          <CartProvider>
            <WishlistProvider>
              <OrderProvider>
                <AuthProvider>
                  <Router>
                    <ScrollToTop />
                    <div className="app-container">
                      <Navbar />
                      <main className="main-content">
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/shop" element={<Products />} />
                          <Route path="/products" element={<Products />} />
                          <Route path="/shop/:id" element={<ProductDetails />} />
                          <Route path="/products/:id" element={<ProductDetails />} />
                          <Route path="/cart" element={<Cart />} />
                          <Route path="/wishlist" element={<Wishlist />} />
                          <Route path="/checkout" element={<Checkout />} />
                          <Route path="/order-confirmation" element={<OrderConfirmation />} />
                          <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
                          <Route path="/orders" element={<Orders />} />
                          <Route path="/orders/:id" element={<OrderDetails />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/signup" element={<Signup />} />
                          <Route path="/profile" element={<Profile />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </main>
                      <Footer />
                      <Toast />
                    </div>
                  </Router>
                </AuthProvider>
              </OrderProvider>
            </WishlistProvider>
          </CartProvider>
        </NotificationProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
