import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';
import QuantitySelector from '../components/QuantitySelector';
import EmptyState from '../components/EmptyState';
import { useNotification } from '../context/NotificationContext';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Truck,
  Sparkles,
  ShieldCheck,
  Tag,
  Check,
} from 'lucide-react';
import './Cart.css';

export default function Cart() {
  const navigate = useNavigate();
  const { addToast } = useNotification();
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

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  if (!cart || cart.length === 0) {
    return (
      <div className="container" style={{ padding: '60px 20px' }}>
        <EmptyState
          icon={ShoppingBag}
          title="Your Shopping Bag is Empty"
          description="Looks like you haven't added anything to your cart yet. Explore our latest arrivals to get started."
          actionText="Discover Products"
          actionLink="/products"
        />
      </div>
    );
  }

  const amountToFreeShipping = Math.max(0, shippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / shippingThreshold) * 100);

  // Apply promo discount
  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoCode.trim()) return;

    if (promoCode.trim().toUpperCase() === 'AURA20') {
      setDiscountPercent(20);
      addToast('Promo code "AURA20" applied! 20% discount granted.', 'success');
    } else {
      addToast('Invalid promo code. Try "AURA20" for 20% off.', 'error');
    }
  };

  const discountAmount = (subtotal * discountPercent) / 100;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  return (
    <div className="container cart-page-wrapper">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-main)' }}>
            Shopping Bag
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            {totalItems} {totalItems === 1 ? 'item' : 'items'} ready for checkout
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (window.confirm('Are you sure you want to clear all items from your bag?')) {
              clearCart();
            }
          }}
          className="btn btn-ghost btn-sm"
          style={{ color: 'var(--color-danger)' }}
        >
          <Trash2 size={15} /> Clear Entire Bag
        </button>
      </div>

      <div className="cart-layout-grid">
        {/* Left Column: Progress Bar + Item List */}
        <div>
          {/* Shipping Threshold Progress */}
          <div className="shipping-progress-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 600 }}>
              <Truck size={18} color="var(--color-accent)" />
              {amountToFreeShipping === 0 ? (
                <span style={{ color: 'var(--color-accent)' }}>
                  🎉 You've unlocked Complimentary Express Shipping!
                </span>
              ) : (
                <span>
                  Add <strong>{formatPrice(amountToFreeShipping)}</strong> more to unlock{' '}
                  <strong style={{ color: 'var(--color-accent)' }}>Free Worldwide Shipping</strong>
                </span>
              )}
            </div>
            <div className="shipping-progress-track">
              <div
                className="shipping-progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="cart-items-card">
            {cart.map((item) => (
              <div key={item.id} className="cart-item-row">
                <Link to={`/products/${item.id}`}>
                  <img
                    src={item.thumbnail || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300'}
                    alt={item.title}
                    className="cart-item-image"
                  />
                </Link>

                <div>
                  <Link to={`/products/${item.id}`}>
                    <h3 className="cart-item-title">{item.title}</h3>
                  </Link>
                  <div className="cart-item-meta">
                    {formatPrice(item.price)} each • {item.category}
                  </div>
                </div>

                <div>
                  <QuantitySelector
                    value={item.quantity}
                    onChange={(newQty) => updateQuantity(item.id, newQty)}
                    min={1}
                    max={item.stock || 99}
                    size="small"
                  />
                </div>

                <div className="cart-item-subtotal">
                  {formatPrice(item.price * item.quantity)}
                </div>

                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="cart-item-remove-btn"
                  aria-label={`Remove ${item.title}`}
                  title="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '24px' }}>
            <Link to="/products" className="btn btn-secondary">
              <ArrowLeft size={16} /> Continue Shopping
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <aside className="order-summary-card">
          <h2 className="summary-title">Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal ({totalItems} items)</span>
            <span style={{ fontWeight: 600 }}>{formatPrice(subtotal)}</span>
          </div>

          <div className="summary-row">
            <span>Estimated Shipping</span>
            <span style={{ fontWeight: 600, color: shippingCost === 0 ? 'var(--color-accent)' : 'inherit' }}>
              {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
            </span>
          </div>

          {discountAmount > 0 && (
            <div className="summary-row" style={{ color: 'var(--color-accent)' }}>
              <span>Special Discount ({discountPercent}%)</span>
              <span style={{ fontWeight: 700 }}>-{formatPrice(discountAmount)}</span>
            </div>
          )}

          {/* Promo code form */}
          <form onSubmit={handleApplyPromo} className="summary-promo-form">
            <input
              type="text"
              placeholder="Promo Code (AURA20)"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="form-input"
              style={{ padding: '8px 12px', fontSize: '0.85rem' }}
            />
            <button
              type="submit"
              className="btn btn-secondary btn-sm"
              style={{ height: 'auto', padding: '8px 14px' }}
            >
              Apply
            </button>
          </form>

          <div className="summary-row total-row">
            <span>Estimated Total</span>
            <span>{formatPrice(finalTotal)}</span>
          </div>

          <button
            type="button"
            onClick={() => navigate('/checkout')}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', marginTop: '20px', gap: '8px' }}
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={18} />
          </button>

          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <ShieldCheck size={16} color="var(--color-accent)" />
              <span>Simulated Checkout • No real money charged</span>
            </div>
            <div>Free 30-day effortless returns on all items</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
