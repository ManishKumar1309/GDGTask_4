import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Mail, Phone, MapPin, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-container">
      {/* 3 Core Highlights */}
      <div className="footer-highlights">
        <div className="container">
          <div className="highlights-grid">
            <div className="highlight-item">
              <Truck size={20} className="highlight-icon" />
              <div>
                <h4>Free Shipping</h4>
                <p>On all orders of ₹999 or above</p>
              </div>
            </div>
            <div className="highlight-item">
              <RefreshCw size={20} className="highlight-icon" />
              <div>
                <h4>7-Day Easy Returns</h4>
                <p>Hassle-free return policy</p>
              </div>
            </div>
            <div className="highlight-item">
              <ShieldCheck size={20} className="highlight-icon" />
              <div>
                <h4>100% Secure Checkout</h4>
                <p>Safe simulated payments & COD</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container footer-main">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-col">
            <Link to="/" className="brand-logo" style={{ marginBottom: '12px' }}>
              <div className="brand-icon">
                <ShoppingBag size={20} />
              </div>
              <span className="brand-name">
                Shopora<span className="brand-dot">.</span>
              </span>
            </Link>
            <p className="footer-description">
              Find your everyday favorites at prices you'll love. Simple, transparent, and modern online shopping.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h3 className="footer-col-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop All Products</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
              <li><Link to="/cart">Shopping Cart</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-col">
            <h3 className="footer-col-title">Categories</h3>
            <ul className="footer-links">
              <li><Link to="/shop?category=electronics">Electronics</Link></li>
              <li><Link to="/shop?category=fashion">Fashion</Link></li>
              <li><Link to="/shop?category=home-living">Home & Living</Link></li>
              <li><Link to="/shop?category=accessories">Accessories</Link></li>
              <li><Link to="/shop?category=beauty">Beauty</Link></li>
              <li><Link to="/shop?category=sports">Sports</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="footer-col">
            <h3 className="footer-col-title">Customer Support</h3>
            <div className="footer-contact-item">
              <Mail size={16} />
              <span>support@shopora.in</span>
            </div>
            <div className="footer-contact-item">
              <Phone size={16} />
              <span>+91 1800 200 4848 (Toll-Free)</span>
            </div>
            <div className="footer-contact-item">
              <MapPin size={16} />
              <span>Mon - Sat: 9:00 AM - 7:00 PM IST</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Shopora. All rights reserved. Built with React & Vite.</p>
        </div>
      </div>
    </footer>
  );
}
