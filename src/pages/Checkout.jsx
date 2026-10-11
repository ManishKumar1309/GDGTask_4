import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { validateCheckoutForm } from '../utils/validation';
import { formatPrice } from '../utils/formatters';
import {
  Lock,
  ShieldCheck,
  ShoppingBag,
  CreditCard,
  Banknote,
} from 'lucide-react';
import './Checkout.css';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, subtotal, shippingCost, grandTotal } = useCart();
  const { placeOrder } = useOrders();
  const { user } = useAuth();

  // All Hooks MUST be called unconditionally at the top level
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
  });

  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery (COD)');
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // If cart is empty, show empty state AFTER all hooks
  if (!cart || cart.length === 0) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <ShoppingBag size={56} color="var(--color-text-secondary)" style={{ margin: '0 auto 16px' }} />
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '8px' }}>Your Cart is Empty</h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
          Please add items to your cart before proceeding to checkout.
        </p>
        <Link to="/shop" className="btn btn-primary btn-md">
          Explore Products
        </Link>
      </div>
    );
  }

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);

    if (touched[field]) {
      const currentErrors = validateCheckoutForm(updated);
      setErrors(currentErrors);
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const currentErrors = validateCheckoutForm(formData);
    setErrors(currentErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);

    const validationErrors = validateCheckoutForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setSubmitting(true);

    // Simulate order placement
    setTimeout(() => {
      const newOrder = placeOrder({
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
        },
        shipping: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        items: cart,
        paymentMethod,
        subtotal,
        shippingCost,
        grandTotal,
      });

      setSubmitting(false);
      navigate(`/order-confirmation/${newOrder.id}`);
    }, 600);
  };

  return (
    <div className="container checkout-container">
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '6px' }}>
          Checkout & Delivery
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
          Please complete your delivery address and choose a payment method.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="checkout-grid">
          {/* Left Column: Customer Form & Payment Options */}
          <div className="checkout-form-column">
            {/* 1. Customer & Shipping Details */}
            <div className="checkout-box">
              <h2 className="checkout-box-title">
                1. Delivery Information
              </h2>

              {/* Full Name */}
              <div className="form-group">
                <label className="form-label" htmlFor="fullName">
                  Full Name <span className="required">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  onBlur={() => handleBlur('fullName')}
                  className={`form-input ${touched.fullName && errors.fullName ? 'has-error' : ''}`}
                />
                {touched.fullName && errors.fullName && (
                  <p className="form-error">{errors.fullName}</p>
                )}
              </div>

              {/* Email & Mobile Number Grid */}
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Email Address <span className="required">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={`form-input ${touched.email && errors.email ? 'has-error' : ''}`}
                  />
                  {touched.email && errors.email && (
                    <p className="form-error">{errors.email}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">
                    Mobile Number <span className="required">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    className={`form-input ${touched.phone && errors.phone ? 'has-error' : ''}`}
                  />
                  {touched.phone && errors.phone && (
                    <p className="form-error">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* House and Street Address */}
              <div className="form-group">
                <label className="form-label" htmlFor="address">
                  House / Flat No. & Street Address <span className="required">*</span>
                </label>
                <input
                  id="address"
                  type="text"
                  placeholder="Flat 402, Sunshine Apartments, MG Road"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  onBlur={() => handleBlur('address')}
                  className={`form-input ${touched.address && errors.address ? 'has-error' : ''}`}
                />
                {touched.address && errors.address && (
                  <p className="form-error">{errors.address}</p>
                )}
              </div>

              {/* City, State, PIN code */}
              <div className="form-row-3">
                <div className="form-group">
                  <label className="form-label" htmlFor="city">
                    City <span className="required">*</span>
                  </label>
                  <input
                    id="city"
                    type="text"
                    placeholder="e.g. Bengaluru"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    onBlur={() => handleBlur('city')}
                    className={`form-input ${touched.city && errors.city ? 'has-error' : ''}`}
                  />
                  {touched.city && errors.city && (
                    <p className="form-error">{errors.city}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="state">
                    State <span className="required">*</span>
                  </label>
                  <input
                    id="state"
                    type="text"
                    placeholder="e.g. Karnataka"
                    value={formData.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    onBlur={() => handleBlur('state')}
                    className={`form-input ${touched.state && errors.state ? 'has-error' : ''}`}
                  />
                  {touched.state && errors.state && (
                    <p className="form-error">{errors.state}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="postalCode">
                    PIN Code <span className="required">*</span>
                  </label>
                  <input
                    id="postalCode"
                    type="text"
                    placeholder="6 digits (e.g. 560001)"
                    value={formData.postalCode}
                    onChange={(e) => handleChange('postalCode', e.target.value)}
                    onBlur={() => handleBlur('postalCode')}
                    className={`form-input ${touched.postalCode && errors.postalCode ? 'has-error' : ''}`}
                  />
                  {touched.postalCode && errors.postalCode && (
                    <p className="form-error">{errors.postalCode}</p>
                  )}
                </div>
              </div>
            </div>

            {/* 2. Simulated Payment Options */}
            <div className="checkout-box">
              <h2 className="checkout-box-title">
                2. Payment Method
              </h2>

              <div className="payment-options-group">
                {/* Cash on Delivery option */}
                <label className={`payment-option-card ${paymentMethod === 'Cash on Delivery (COD)' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Cash on Delivery (COD)"
                    checked={paymentMethod === 'Cash on Delivery (COD)'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="payment-radio"
                  />
                  <div className="payment-icon-box">
                    <Banknote size={22} color="var(--color-primary)" />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--color-text)' }}>
                      Cash on Delivery (COD)
                    </strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                      Pay in cash or UPI when your parcel arrives at your doorstep
                    </span>
                  </div>
                </label>

                {/* Demo Online Payment option */}
                <label className={`payment-option-card ${paymentMethod === 'Demo Online Payment (UPI / Card)' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Demo Online Payment (UPI / Card)"
                    checked={paymentMethod === 'Demo Online Payment (UPI / Card)'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="payment-radio"
                  />
                  <div className="payment-icon-box">
                    <CreditCard size={22} color="var(--color-primary)" />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--color-text)' }}>
                      Demo Online Payment (UPI / Card / NetBanking)
                    </strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                      Simulated instant online transaction (no real card details required)
                    </span>
                  </div>
                </label>
              </div>

              <div className="sandbox-info-banner">
                <ShieldCheck size={20} color="#10B981" />
                <span>
                  <strong>Demo Mode:</strong> No real payment is deducted. Clicking "Place Order" will generate an official order ID and save the order in LocalStorage.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Place Order Button */}
          <div className="checkout-summary-column">
            <div className="checkout-summary-card">
              <h2 className="summary-card-title">Order Summary ({cart.length} items)</h2>

              {/* Products preview */}
              <div className="checkout-items-preview-list">
                {cart.map((item) => (
                  <div key={item.id} className="checkout-item-row">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="checkout-item-thumb"
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="checkout-item-name" title={item.title}>
                        {item.title}
                      </div>
                      <div className="checkout-item-qty">
                        Qty: {item.quantity} × {formatPrice(item.price)}
                      </div>
                    </div>
                    <div className="checkout-item-price">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculations */}
              <div className="checkout-totals-box">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="summary-row">
                  <span>Shipping Charges</span>
                  <span>
                    {shippingCost === 0 ? (
                      <strong style={{ color: '#10B981' }}>FREE</strong>
                    ) : (
                      formatPrice(shippingCost)
                    )}
                  </span>
                </div>

                <div className="summary-divider" />

                <div className="summary-total-row">
                  <span>Final Payable Amount</span>
                  <span className="summary-final-price">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', marginTop: '24px', gap: '8px' }}
              >
                <Lock size={18} />
                <span>{submitting ? 'Placing Order...' : 'Place Order'}</span>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '16px' }}>
                <ShieldCheck size={15} color="#10B981" />
                <span>Simulated Order • Instant Local Confirmation</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
