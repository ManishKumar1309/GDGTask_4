import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';
import QuantitySelector from '../components/QuantitySelector';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Truck,
  ShieldCheck,
} from 'lucide-react';
import './Cart.css';

export default function Cart() {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    shippingCost,
    shippingThreshold,
    grandTotal,
  } = useCart();

  // Empty Cart State
  if (!cart || cart.length === 0) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div
          style={{
            maxWidth: '460px',
            margin: '0 auto',
            background: 'var(--bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '48px 32px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          {/* Simple empty-cart illustration */}
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 153, 0, 0.1)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}
          >
            <ShoppingBag size={40} />
          </div>

          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '8px' }}>
            Your Cart is Empty
          </h2>

          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginBottom: '28px', lineHeight: 1.5 }}>
            Looks like you haven't added anything to your cart yet. Explore our everyday favorites and discover great deals!
          </p>

          {/* "Start Shopping" button as specifically requested */}
          <Link to="/shop" className="btn btn-primary btn-lg" style={{ width: '100%', gap: '8px' }}>
            <span>Start Shopping</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  const amountToFreeShipping = Math.max(0, shippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / shippingThreshold) * 100);

  return (
    <div className="container cart-page-container">
      {/* Page Header */}
      <div className="cart-header-row">
        <div>
          <h1 className="cart-page-title">Shopping Cart</h1>
          <p className="cart-page-subtitle">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (window.confirm('Are you sure you want to remove all items from your cart?')) {
              clearCart();
            }
          }}
          className="btn btn-ghost btn-sm"
          style={{ color: 'var(--color-danger)' }}
        >
          <Trash2 size={15} /> Clear Entire Cart
        </button>
      </div>

      <div className="cart-grid">
        {/* Left Column: Free Shipping Indicator + Cart Items List */}
        <div className="cart-items-column">
          {/* Free Shipping Alert Box */}
          <div className="shipping-progress-card">
            <div className="shipping-progress-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Truck size={18} color="var(--color-primary)" />
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text)' }}>
                  {subtotal >= shippingThreshold ? (
                    '🎉 You qualified for FREE Express Shipping!'
                  ) : (
                    <>Add <strong>{formatPrice(amountToFreeShipping)}</strong> more to get FREE Delivery</>
                  )}
                </span>
              </div>
            </div>
            <div className="shipping-bar-track">
              <div
                className="shipping-bar-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* List of Cart Items */}
          <div className="cart-items-list">
            {cart.map((item) => {
              const itemSubtotal = item.price * item.quantity;

              return (
                <div key={item.id} className="cart-item-card">
                  <Link to={`/shop/${item.id}`} className="cart-item-image-box">
                    <img src={item.thumbnail} alt={item.title} className="cart-item-img" />
                  </Link>

                  <div className="cart-item-details">
                    <div className="cart-item-info">
                      <span className="cart-item-category">{item.category}</span>
                      <Link to={`/shop/${item.id}`}>
                        <h3 className="cart-item-title">{item.title}</h3>
                      </Link>
                      <div className="cart-item-unit-price">
                        {formatPrice(item.price)} each
                      </div>
                    </div>

                    <div className="cart-item-actions-row">
                      {/* Quantity Selector */}
                      <QuantitySelector
                        value={item.quantity}
                        onChange={(qty) => updateQuantity(item.id, qty)}
                        min={1}
                        max={item.stock || 20}
                        size="small"
                      />

                      {/* Item Subtotal */}
                      <div className="cart-item-subtotal">
                        <span className="subtotal-label">Subtotal:</span>
                        <strong>{formatPrice(itemSubtotal)}</strong>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="cart-item-remove-btn"
                        title="Remove product"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Continue Shopping Link */}
          <div style={{ marginTop: '20px' }}>
            <Link to="/shop" className="btn btn-secondary btn-md" style={{ gap: '8px' }}>
              <ArrowLeft size={16} />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="cart-summary-column">
          <div className="cart-summary-card">
            <h2 className="summary-card-title">Order Summary</h2>

            <div className="summary-breakdown">
              <div className="summary-row">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="summary-row">
                <span>Items Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <div className="summary-row">
                <span>Shipping Fee</span>
                <span>
                  {shippingCost === 0 ? (
                    <span style={{ color: '#10B981', fontWeight: 700 }}>FREE</span>
                  ) : (
                    formatPrice(shippingCost)
                  )}
                </span>
              </div>

              {shippingCost > 0 && (
                <div className="shipping-hint">
                  Free delivery for orders of ₹999 or above (Current order: {formatPrice(subtotal)})
                </div>
              )}

              <div className="summary-divider" />

              <div className="summary-total-row">
                <span>Final Payable Amount</span>
                <span className="summary-final-price">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* Proceed to Checkout Button */}
            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: '20px', gap: '8px' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            {/* Guarantees */}
            <div className="summary-footer-guarantee">
              <ShieldCheck size={16} color="#10B981" />
              <span>Safe & Secure Checkout Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
