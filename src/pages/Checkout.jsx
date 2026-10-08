import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { validateCheckoutForm } from '../utils/validation';
import { formatPrice, formatDate } from '../utils/formatters';
import {
  CheckCircle2,
  ShieldCheck,
  Truck,
  ArrowRight,
  Package,
  ShoppingBag,
  User,
  MapPin,
  Lock,
} from 'lucide-react';
import './Checkout.css';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, subtotal, shippingCost, grandTotal } = useCart();
  const { placeOrder } = useOrders();
  const { user } = useAuth();

  // Form Fields State
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  // If order was successfully placed in this session, show order confirmation screen
  if (placedOrder) {
    return (
      <div className="container" style={{ padding: '40px 20px 80px' }}>
        <div className="order-success-card">
          <div className="success-badge-icon">
            <CheckCircle2 size={40} />
          </div>

          <span className="badge badge-accent" style={{ marginBottom: '8px' }}>
            Receipt Confirmed
          </span>

          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
            Thank You For Your Order!
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '480px', margin: '0 auto 16px' }}>
            Your simulated order has been placed successfully and logged in your local order history.
          </p>

          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Order Reference Number</span>
            <div className="order-id-display">{placedOrder.id}</div>
          </div>

          {/* Placed Order Summary Breakdown */}
          <div
            style={{
              textAlign: 'left',
              background: 'var(--bg-body)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '24px',
              margin: '24px 0 32px',
            }}
          >
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '16px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
              Order Breakdown
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px', fontSize: '0.9rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block' }}>Customer Info:</span>
                <strong>{placedOrder.customer.fullName}</strong>
                <div>{placedOrder.customer.email}</div>
                <div>{placedOrder.customer.phone}</div>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block' }}>Shipping Destination:</span>
                <div>{placedOrder.shippingAddress.address}</div>
                <div>
                  {placedOrder.shippingAddress.city}, {placedOrder.shippingAddress.state} {placedOrder.shippingAddress.postalCode}
                </div>
                <div>{placedOrder.shippingAddress.country}</div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block', marginBottom: '8px' }}>Purchased Items:</span>
              {placedOrder.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '6px' }}>
                  <span>{item.title} × {item.quantity}</span>
                  <span style={{ fontWeight: 600 }}>{formatPrice(item.subtotal)}</span>
                </div>
              ))}

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.05rem', fontWeight: 800, marginTop: '12px', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
                <span>Total Amount</span>
                <span>{formatPrice(placedOrder.totalAmount)}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/orders" className="btn btn-primary btn-lg">
              <Package size={18} /> View All Orders
            </Link>
            <Link to="/products" className="btn btn-secondary btn-lg">
              <ShoppingBag size={18} /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty, prompt user to add items
  if (!cart || cart.length === 0) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '12px' }}>
          Your bag is currently empty
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
          Add products to your cart before proceeding to checkout.
        </p>
        <Link to="/products" className="btn btn-primary btn-lg">
          Browse Products
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

    // Mark all as touched
    const allTouched = Object.keys(formData).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);

    const validationErrors = validateCheckoutForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
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
        subtotal,
        shippingCost,
        grandTotal,
      });

      setSubmitting(false);
      setPlacedOrder(newOrder);
    }, 600);
  };

  const isFormValid = Object.keys(validateCheckoutForm(formData)).length === 0;

  return (
    <div className="container checkout-wrapper">
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px' }}>
          Checkout & Express Shipping
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Complete your customer and delivery details below to finalize your simulated order.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="checkout-grid">
          {/* Left Column: Form Fields */}
          <div>
            {/* 1. Customer Information */}
            <div className="checkout-section-box">
              <div className="checkout-section-header">
                <User size={20} color="var(--color-accent)" />
                <h2 className="checkout-section-title">1. Customer Information</h2>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="fullName">
                  Full Name <span className="required">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="e.g. Eleanor Vance"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  onBlur={() => handleBlur('fullName')}
                  className={`form-input ${touched.fullName && errors.fullName ? 'has-error' : ''}`}
                />
                {touched.fullName && errors.fullName && (
                  <p className="form-error">{errors.fullName}</p>
                )}
              </div>

              <div className="checkout-form-grid-2">
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
                    Phone Number <span className="required">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 019-2834"
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
            </div>

            {/* 2. Shipping Address */}
            <div className="checkout-section-box">
              <div className="checkout-section-header">
                <MapPin size={20} color="var(--color-accent)" />
                <h2 className="checkout-section-title">2. Shipping Address</h2>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="address">
                  Street Address <span className="required">*</span>
                </label>
                <input
                  id="address"
                  type="text"
                  placeholder="1248 Lexington Avenue, Suite 400"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  onBlur={() => handleBlur('address')}
                  className={`form-input ${touched.address && errors.address ? 'has-error' : ''}`}
                />
                {touched.address && errors.address && (
                  <p className="form-error">{errors.address}</p>
                )}
              </div>

              <div className="checkout-form-grid-3">
                <div className="form-group">
                  <label className="form-label" htmlFor="city">
                    City <span className="required">*</span>
                  </label>
                  <input
                    id="city"
                    type="text"
                    placeholder="New York"
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
                    State / Province <span className="required">*</span>
                  </label>
                  <input
                    id="state"
                    type="text"
                    placeholder="NY"
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
                    Postal / ZIP Code <span className="required">*</span>
                  </label>
                  <input
                    id="postalCode"
                    type="text"
                    placeholder="10028"
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

              <div className="form-group">
                <label className="form-label" htmlFor="country">
                  Country <span className="required">*</span>
                </label>
                <select
                  id="country"
                  value={formData.country}
                  onChange={(e) => handleChange('country', e.target.value)}
                  className="form-select"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="India">India</option>
                  <option value="Japan">Japan</option>
                </select>
              </div>
            </div>

            {/* 3. Simulated Payment Information Note */}
            <div className="checkout-section-box">
              <div className="checkout-section-header">
                <Lock size={20} color="var(--color-accent)" />
                <h2 className="checkout-section-title">3. Payment Method</h2>
              </div>
              <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 'var(--radius-sm)', padding: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <ShieldCheck size={28} color="#059669" />
                <div style={{ fontSize: '0.875rem', color: '#065f46', lineHeight: 1.5 }}>
                  <strong>Simulated Sandbox Environment:</strong> No real credit card or payment credentials are required. Clicking "Place Order" below will immediately generate an official order receipt and save it to your local storage.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Place Button */}
          <aside className="checkout-summary-box">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
              Order Summary ({cart.length} items)
            </h3>

            {/* Products preview */}
            <div style={{ maxHeight: '280px', overflowY: 'auto', marginBottom: '20px', paddingRight: '4px' }}>
              {cart.map((item) => (
                <div key={item.id} className="checkout-item-preview">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="checkout-item-img"
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                      Qty: {item.quantity} × {formatPrice(item.price)}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Amounts */}
            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <span>Express Shipping</span>
                <span style={{ color: shippingCost === 0 ? 'var(--color-accent)' : 'inherit', fontWeight: 600 }}>
                  {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', marginBottom: '24px' }}>
                <span>Total Due</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting || !isFormValid}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', gap: '8px' }}
            >
              <Lock size={18} />
              <span>{submitting ? 'Confirming Order...' : 'Place Order'}</span>
            </button>

            {!isFormValid && (
              <p style={{ color: 'var(--color-danger)', fontSize: '0.8rem', marginTop: '10px', textAlign: 'center' }}>
                Please fill in all required delivery details above.
              </p>
            )}

            <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.775rem', color: 'var(--text-muted)' }}>
              🔒 256-Bit Encrypted Simulated Transaction
            </div>
          </aside>
        </div>
      </form>
    </div>
  );
}
