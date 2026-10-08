import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  RefreshCw,
  Headphones,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import { isValidEmail } from '../utils/validation';
import './Footer.css';

export default function Footer() {
  const { addToast } = useNotification();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !isValidEmail(email)) {
      addToast('Please enter a valid email address to subscribe', 'error');
      return;
    }
    setSubscribed(true);
    addToast('Subscribed! Check your inbox for your 15% discount code.', 'success');
    setEmail('');
  };

  return (
    <footer className="footer-wrapper">
      <div className="container">
        {/* Trust Badges Bar */}
        <div className="footer-trust-features">
          <div className="trust-feature-item">
            <div className="trust-icon-box">
              <Truck size={22} />
            </div>
            <div>
              <div className="trust-text-title">Complimentary Shipping</div>
              <div className="trust-text-desc">On orders over $75 within 48h</div>
            </div>
          </div>

          <div className="trust-feature-item">
            <div className="trust-icon-box">
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className="trust-text-title">Secure Checkout</div>
              <div className="trust-text-desc">256-Bit SSL encryption guarantee</div>
            </div>
          </div>

          <div className="trust-feature-item">
            <div className="trust-icon-box">
              <RefreshCw size={22} />
            </div>
            <div>
              <div className="trust-text-title">30-Day Effortless Returns</div>
              <div className="trust-text-desc">No questions asked return policy</div>
            </div>
          </div>

          <div className="trust-feature-item">
            <div className="trust-icon-box">
              <Headphones size={22} />
            </div>
            <div>
              <div className="trust-text-title">Dedicated Support</div>
              <div className="trust-text-desc">7 days a week customer care</div>
            </div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="footer-grid">
          {/* Brand Col */}
          <div>
            <div className="footer-brand-title">
              <ShoppingBag size={22} color="#10b981" />
              <span>AURA & CO.</span>
            </div>
            <p className="footer-brand-desc">
              Curated everyday luxury and lifestyle essentials engineered for the modern aesthetic. Designed with minimalist elegance and effortless functionality.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span className="payment-badge">SSL VERIFIED</span>
              <span className="payment-badge">SHOPIFY INSPIRED</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="footer-heading">Shop Collections</h4>
            <ul className="footer-links-list">
              <li><Link to="/products?category=beauty" className="footer-link">Beauty & Cosmetics</Link></li>
              <li><Link to="/products?category=fragrances" className="footer-link">Fragrances & Perfumes</Link></li>
              <li><Link to="/products?category=furniture" className="footer-link">Modern Furniture</Link></li>
              <li><Link to="/products?category=groceries" className="footer-link">Organic Groceries</Link></li>
              <li><Link to="/products" className="footer-link">All Collections</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="footer-heading">Customer Care</h4>
            <ul className="footer-links-list">
              <li><Link to="/orders" className="footer-link">Track Your Orders</Link></li>
              <li><Link to="/wishlist" className="footer-link">Your Wishlist</Link></li>
              <li><Link to="/cart" className="footer-link">Shopping Bag</Link></li>
              <li><Link to="/profile" className="footer-link">Account Settings</Link></li>
              <li><span className="footer-link" style={{ cursor: 'pointer' }} onClick={() => addToast('Shipping Policy: Free expedited delivery for orders over $75.', 'info')}>Shipping Policy</span></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="footer-heading">Join The Circle</h4>
            <p style={{ fontSize: '0.875rem', marginBottom: '12px', lineHeight: 1.5 }}>
              Subscribe for private previews, members-only releases, and 15% off your first purchase.
            </p>
            {subscribed ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '0.9rem', fontWeight: 600 }}>
                <CheckCircle size={18} /> You're on the list!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="footer-newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="footer-newsletter-input"
                  aria-label="Email address for newsletter"
                />
                <button type="submit" className="btn btn-accent btn-sm" aria-label="Subscribe">
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} AURA Commerce Inc. All rights reserved. A modern Shopify-inspired storefront.</p>
          <div className="payment-badges">
            <span className="payment-badge">VISA</span>
            <span className="payment-badge">MASTERCARD</span>
            <span className="payment-badge">AMEX</span>
            <span className="payment-badge">APPLE PAY</span>
            <span className="payment-badge">PAYPAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
