import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  ShoppingCart,
  Heart,
  User,
  Search,
  Menu,
  X,
  Moon,
  Sun,
  ChevronDown,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { totalWishlist } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();
  const { toggleTheme, isDark } = useTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');

  const categories = [
    { name: 'Electronics', slug: 'electronics' },
    { name: 'Fashion', slug: 'fashion' },
    { name: 'Home & Living', slug: 'home-living' },
    { name: 'Accessories', slug: 'accessories' },
    { name: 'Beauty', slug: 'beauty' },
    { name: 'Sports', slug: 'sports' },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (navSearch && navSearch.trim()) {
      navigate(`/shop?search=${encodeURIComponent(navSearch.trim())}`);
      setMobileMenuOpen(false);
      setNavSearch('');
    }
  };

  const handleCategoryClick = (slug) => {
    navigate(`/shop?category=${slug}`);
    setCategoriesDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-wrapper">
      <div className="container">
        <div className="main-navbar">
          {/* 1. Shopora Logo */}
          <div className="nav-left">
            <Link to="/" className="brand-logo" aria-label="Shopora Home">
              <div className="brand-icon">
                <ShoppingBag size={22} strokeWidth={2.4} />
              </div>
              <span className="brand-name">
                Shopora
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="desktop-nav-links" aria-label="Main Navigation">
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
                Home
              </NavLink>
              <NavLink to="/shop" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Shop
              </NavLink>

              {/* Categories Dropdown */}
              <div
                className="categories-menu-container"
                onMouseEnter={() => setCategoriesDropdownOpen(true)}
                onMouseLeave={() => setCategoriesDropdownOpen(false)}
              >
                <button
                  type="button"
                  className="nav-link categories-trigger"
                  onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                  aria-expanded={categoriesDropdownOpen}
                >
                  <span>Categories</span>
                  <ChevronDown size={15} className={`chevron-icon ${categoriesDropdownOpen ? 'rotated' : ''}`} />
                </button>

                {categoriesDropdownOpen && (
                  <div className="categories-dropdown">
                    {categories.map((cat) => (
                      <button
                        key={cat.slug}
                        type="button"
                        className="category-dropdown-item"
                        onClick={() => handleCategoryClick(cat.slug)}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* 2. Search Bar */}
          <div className="nav-search-wrapper">
            <form onSubmit={handleSearchSubmit} className="nav-search-form">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                placeholder="Search products, brands and essentials..."
                className="nav-search-input"
                aria-label="Search products"
              />
            </form>
          </div>

          {/* 3. Action Icons */}
          <div className="nav-actions">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="nav-icon-btn"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle theme mode"
            >
              {isDark ? <Sun size={20} color="#FF9900" /> : <Moon size={20} />}
            </button>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="nav-icon-btn"
              title="Wishlist"
              aria-label={`Wishlist with ${totalWishlist} items`}
            >
              <Heart size={21} />
              {totalWishlist > 0 && <span className="nav-badge">{totalWishlist}</span>}
            </Link>

            {/* Flipkart-Style Shopping Trolley Cart Icon */}
            <Link
              to="/cart"
              className="nav-icon-btn cart-btn"
              title="Shopping Cart"
              aria-label={`Shopping Cart with ${totalItems} items`}
            >
              <ShoppingCart size={22} strokeWidth={2.2} />
              {totalItems > 0 && <span className="nav-badge">{totalItems}</span>}
            </Link>

            {/* Account Icon */}
            {isAuthenticated ? (
              <Link to="/profile" className="user-profile-btn" title="My Account">
                <img
                  src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                  alt={user.name}
                  className="user-nav-avatar"
                />
                <span className="user-nav-name">{user.name.split(' ')[0]}</span>
              </Link>
            ) : (
              <Link to="/login" className="nav-icon-btn" title="Account Sign In" aria-label="Sign In">
                <User size={21} />
              </Link>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="mobile-hamburger-btn"
              aria-label="Open mobile navigation menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <>
          <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)} />
          <div className="mobile-drawer" role="dialog" aria-label="Mobile Navigation">
            <div className="mobile-drawer-header">
              <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
                <div className="brand-icon">
                  <ShoppingBag size={20} strokeWidth={2.4} />
                </div>
                <span className="brand-name">
                  Shopora
                </span>
              </Link>
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
            <div className="mobile-search-box">
              <form onSubmit={handleSearchSubmit} className="nav-search-form">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  value={navSearch}
                  onChange={(e) => setNavSearch(e.target.value)}
                  placeholder="Search products..."
                  className="nav-search-input"
                />
              </form>
            </div>

            {/* Mobile Nav Links */}
            <nav className="mobile-nav-list">
              <Link to="/" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                <span>Home</span>
                <ChevronRight size={18} color="var(--color-text-secondary)" />
              </Link>

              <Link to="/shop" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                <span>Shop All Products</span>
                <ChevronRight size={18} color="var(--color-text-secondary)" />
              </Link>

              <Link to="/orders" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                <span>My Orders</span>
                <ChevronRight size={18} color="var(--color-text-secondary)" />
              </Link>

              <Link to="/wishlist" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                <span>Wishlist ({totalWishlist})</span>
                <ChevronRight size={18} color="var(--color-text-secondary)" />
              </Link>

              <Link to="/cart" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShoppingCart size={18} />
                  <span>Shopping Cart ({totalItems})</span>
                </span>
                <ChevronRight size={18} color="var(--color-text-secondary)" />
              </Link>

              <div className="mobile-categories-section">
                <div className="mobile-section-title">Shop by Category</div>
                <div className="mobile-categories-grid">
                  {categories.map((cat) => (
                    <button
                      key={cat.slug}
                      type="button"
                      className="mobile-category-chip"
                      onClick={() => handleCategoryClick(cat.slug)}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </nav>

            {/* Mobile Footer with Account & Theme */}
            <div className="mobile-drawer-footer">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                  Theme Mode
                </span>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="btn btn-secondary btn-sm"
                  style={{ gap: '6px' }}
                >
                  {isDark ? <Sun size={16} color="#FF9900" /> : <Moon size={16} />}
                  <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>

              {isAuthenticated ? (
                <div>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}
                  >
                    <img src={user.avatar} alt={user.name} className="user-nav-avatar" style={{ width: '40px', height: '40px' }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{user.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{user.email}</div>
                    </div>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="btn btn-secondary btn-sm"
                    style={{ width: '100%', color: 'var(--color-danger)' }}
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn btn-primary btn-md"
                    style={{ flex: 1 }}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn btn-secondary btn-md"
                    style={{ flex: 1 }}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
}
