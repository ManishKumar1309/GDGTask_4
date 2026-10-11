import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { formatPrice, formatDate } from '../utils/formatters';
import {
  CheckCircle2,
  Package,
  Truck,
  ShoppingBag,
  MapPin,
  CreditCard,
} from 'lucide-react';

export default function OrderConfirmation() {
  const { id } = useParams();
  const { getOrderById, orders } = useOrders();

  // Find order by ID, or default to the most recent placed order if accessed immediately
  const order = getOrderById(id) || (orders.length > 0 ? orders[0] : null);

  if (!order) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <Package size={56} color="var(--color-text-secondary)" style={{ margin: '0 auto 16px' }} />
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>Order Confirmation</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
          No recent order details found. Please visit your order history or return to shop.
        </p>
        <Link to="/orders" className="btn btn-primary btn-md">
          View My Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 20px 80px', maxWidth: '800px' }}>
      {/* Top Banner */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '40px 32px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '28px',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#ECFDF5',
            color: '#10B981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
          }}
        >
          <CheckCircle2 size={36} />
        </div>

        <span className="badge badge-stock" style={{ marginBottom: '12px' }}>
          Order Confirmed
        </span>

        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '8px' }}>
          Thank You For Your Order!
        </h1>

        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.975rem', maxWidth: '520px', margin: '0 auto 20px' }}>
          We've received your order and are getting it ready for shipment. A simulated receipt has been saved to your account.
        </p>

        <div
          style={{
            display: 'inline-block',
            background: 'var(--bg-secondary)',
            border: '1px dashed var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 24px',
          }}
        >
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Order ID
          </span>
          <strong style={{ fontSize: '1.25rem', color: 'var(--color-text)', letterSpacing: '0.05em' }}>
            {order.id}
          </strong>
        </div>
      </div>

      {/* Order Details Card */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '32px',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '28px',
        }}
      >
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
          Delivery & Payment Details
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '28px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px' }}>
              <MapPin size={16} /> Delivery Address
            </div>
            <strong style={{ display: 'block', color: 'var(--color-text)', fontSize: '0.95rem' }}>{order.customer.fullName}</strong>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, marginTop: '2px' }}>
              {order.shippingAddress.address}<br />
              {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}<br />
              Mobile: {order.customer.phone}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px' }}>
              <CreditCard size={16} /> Payment Method
            </div>
            <div style={{ color: 'var(--color-text)', fontSize: '0.95rem', fontWeight: 600 }}>
              {order.paymentMethod || 'Cash on Delivery (COD)'}
            </div>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
              Status: Payment on delivery / Simulated
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px' }}>
              <Truck size={16} /> Estimated Delivery
            </div>
            <div style={{ color: 'var(--color-text)', fontSize: '0.95rem', fontWeight: 600 }}>
              {formatDate(order.estimatedDelivery)}
            </div>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
              Standard Express Delivery
            </div>
          </div>
        </div>

        {/* Products List */}
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', borderTop: '1px solid var(--color-border)', paddingTop: '20px' }}>
          Items in this Order ({order.totalQuantity} items)
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
          {order.items.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
              }}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                style={{ width: '56px', height: '56px', objectFit: 'contain', borderRadius: 'var(--radius-xs)', background: '#fff' }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.title}
                </h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                  Qty: {item.quantity} × {formatPrice(item.price)}
                </div>
              </div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--color-text)' }}>
                {formatPrice(item.subtotal || item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        {/* Price Breakdown */}
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px', maxWidth: '320px', marginLeft: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
            <span>Subtotal:</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
            <span>Shipping:</span>
            <span>{order.shippingCost === 0 ? 'FREE' : formatPrice(order.shippingCost)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-text)', borderTop: '1px solid var(--color-border)', paddingTop: '10px' }}>
            <span>Final Total:</span>
            <span style={{ color: 'var(--color-primary)' }}>{formatPrice(order.totalAmount)}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <Link to="/orders" className="btn btn-secondary btn-md">
          <Package size={18} /> View All Orders
        </Link>
        <Link to="/shop" className="btn btn-primary btn-md">
          <ShoppingBag size={18} /> Continue Shopping
        </Link>
      </div>
    </div>
  );
}
