import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  Menu,
  X,
  Package,
  Sparkles,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { totalWishlist } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');

  const handleSearchSubmit = (query) => {
    if (query && query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      setMobileMenuOpen(false);
      setNavSearch('');
    }
  };

  return (
    <header className="navbar-wrapper">
      {/* Top Announcement Bar */}
      <div className="announcement-bar">
        <Sparkles size={14} color="#34d399" />
        <span>Complimentary Express Shipping on orders over $75 | 30-Day Effortless Returns</span>
      </div>

      {/* Main Bar */}
      <div className="container">
        <div className="main-navbar">
          {/* Left: Brand Logo & Links */}
          <div className="nav-left">
            <Link to="/" className="brand-logo" aria-label="AURA Store Home">
              <div className="brand-symbol">
                <ShoppingBag size={20} strokeWidth={2.4} />
              </div>
              <div className="brand-text">
                <span className="brand-name">AURA</span>
                <span className="brand-subtitle">COMMERCE</span>
              </div>
            </Link>

            <nav className="nav-links" aria-label="Primary Navigation">
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
                Home
              </NavLink>
              <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Catalog
              </NavLink>
              <NavLink to="/orders" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Orders
              </NavLink>
            </nav>
          </div>

          {/* Center: Search Bar */}
          <div className="nav-search-container">
            <SearchBar
              value={navSearch}
              onChange={setNavSearch}
              onSearch={handleSearchSubmit}
              placeholder="Search products, brands..."
            />
          </div>

          {/* Right: Actions */}
          <div className="nav-right">
            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="nav-action-btn"
              title="Wishlist"
              aria-label={`Wishlist (${totalWishlist} items)`}
            >
              <Heart size={21} />
              {totalWishlist > 0 && <span className="nav-badge-count">{totalWishlist}</span>}
            </Link>

            {/* Cart Link */}
            <Link
              to="/cart"
              className="nav-action-btn"
              title="Shopping Bag"
              aria-label={`Shopping Bag (${totalItems} items)`}
            >
              <ShoppingBag size={21} />
              {totalItems > 0 && <span className="nav-badge-count">{totalItems}</span>}
            </Link>

            {/* User Profile / Auth */}
            {isAuthenticated ? (
              <Link to="/profile" className="user-profile-badge" title="My Profile">
                <img
                  src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                  alt={user.name}
                  className="user-avatar"
                />
                <span style={{ maxWidth: '85px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user.name}
                </span>
              </Link>
            ) : (
              <Link to="/login" className="nav-action-btn" title="Sign In" aria-label="Sign In">
                <User size={21} />
              </Link>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="mobile-menu-btn"
              aria-label="Open mobile navigation"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <>
          <div className="mobile-nav-overlay" onClick={() => setMobileMenuOpen(false)} />
          <div className="mobile-nav-drawer" role="dialog" aria-label="Mobile Navigation">
            <div className="mobile-nav-header">
              <div className="brand-logo">
                <div className="brand-symbol">
                  <ShoppingBag size={18} />
                </div>
                <div className="brand-text">
                  <span className="brand-name" style={{ fontSize: '1.15rem' }}>AURA</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-icon"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Search */}
            <div style={{ marginBottom: '16px' }}>
              <SearchBar
                value={navSearch}
                onChange={setNavSearch}
                onSearch={handleSearchSubmit}
                placeholder="Search catalog..."
              />
            </div>

            {/* Mobile Navigation Links */}
            <nav className="mobile-nav-links">
              <Link
                to="/"
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Home</span>
                <ChevronRight size={16} color="var(--text-muted)" />
              </Link>

              <Link
                to="/products"
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>All Products</span>
                <ChevronRight size={16} color="var(--text-muted)" />
              </Link>

              <Link
                to="/orders"
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Package size={18} /> My Orders
                </span>
                <ChevronRight size={16} color="var(--text-muted)" />
              </Link>

              <Link
                to="/wishlist"
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Heart size={18} /> Wishlist ({totalWishlist})
                </span>
                <ChevronRight size={16} color="var(--text-muted)" />
              </Link>

              <Link
                to="/cart"
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShoppingBag size={18} /> Shopping Bag ({totalItems})
                </span>
                <ChevronRight size={16} color="var(--text-muted)" />
              </Link>
            </nav>

            {/* Mobile Auth Section at Bottom */}
            <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
              {isAuthenticated ? (
                <div>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}
                  >
                    <img src={user.avatar} alt={user.name} className="user-avatar" style={{ width: '36px', height: '36px' }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{user.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{user.email}</div>
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="btn btn-secondary btn-sm"
                    style={{ width: '100%', color: 'var(--color-danger)' }}
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  <User size={18} /> Sign In to Account
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
}
