import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { formatPrice, formatDate } from '../utils/formatters';
import ErrorMessage from '../components/ErrorMessage';
import {
  Calendar,
  CheckCircle2,
  ArrowLeft,
  Truck,
  MapPin,
  CreditCard,
  Printer,
} from 'lucide-react';

export default function OrderDetails() {
  const { id } = useParams();
  const { getOrderById } = useOrders();

  const order = getOrderById(id);

  if (!order) {
    return (
      <div className="container" style={{ padding: '60px 20px' }}>
        <ErrorMessage
          title="Order Not Found"
          message={`We could not find an order matching identifier "${id}". It might have been cleared from local storage.`}
          backTo="/orders"
          backText="Return to Orders"
        />
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container" style={{ paddingTop: '32px', paddingBottom: '80px', maxWidth: '820px' }}>
      {/* Top Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <Link to="/orders" className="btn btn-secondary btn-sm" style={{ gap: '6px' }}>
          <ArrowLeft size={16} />
          <span>Back to All Orders</span>
        </Link>

        <button type="button" onClick={handlePrint} className="btn btn-secondary btn-sm" style={{ gap: '6px' }}>
          <Printer size={15} />
          <span>Print Receipt</span>
        </button>
      </div>

      {/* Main Order Card */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '36px',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '16px',
            borderBottom: '1px solid var(--color-border)',
            paddingBottom: '24px',
            marginBottom: '28px',
          }}
        >
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary)' }}>
              Order Receipt
            </span>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text)', marginTop: '4px' }}>
              Order {order.id}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginTop: '6px' }}>
              <Calendar size={14} />
              <span>Placed on {formatDate(order.date)}</span>
            </div>
          </div>

          <span className="badge badge-stock" style={{ fontSize: '0.875rem', padding: '6px 14px' }}>
            <CheckCircle2 size={16} />
            {order.status || 'Order Confirmed'}
          </span>
        </div>

        {/* Customer & Shipping Summary Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px' }}>
              <MapPin size={16} /> Destination
            </div>
            <strong style={{ color: 'var(--color-text)', fontSize: '0.95rem', display: 'block' }}>{order.customer.fullName}</strong>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, marginTop: '2px' }}>
              {order.shippingAddress.address}<br />
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}<br />
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
              Local Simulated Transaction
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px' }}>
              <Truck size={16} /> Delivery Schedule
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
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '16px', borderTop: '1px solid var(--color-border)', paddingTop: '24px' }}>
          Purchased Items ({order.totalQuantity} items)
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
          {(order.items || []).map((item, idx) => (
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
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.title}
                </h3>
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

        {/* Financial Summary */}
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px', maxWidth: '300px', marginLeft: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
            <span>Subtotal:</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
            <span>Shipping:</span>
            <span>{order.shippingCost === 0 ? 'FREE' : formatPrice(order.shippingCost)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text)', borderTop: '1px solid var(--color-border)', paddingTop: '10px' }}>
            <span>Final Total:</span>
            <span style={{ color: 'var(--color-primary)' }}>{formatPrice(order.totalAmount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
