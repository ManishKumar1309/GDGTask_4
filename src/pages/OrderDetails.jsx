import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { formatPrice, formatDate } from '../utils/formatters';
import ErrorMessage from '../components/ErrorMessage';
import {
  Package,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Truck,
  User,
  MapPin,
  FileText,
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
          message={`We could not find an order matching identifier "${id}". It might have been cleared or does not exist.`}
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
    <div className="container" style={{ paddingTop: '36px', paddingBottom: '80px', maxWidth: '860px' }}>
      {/* Top Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <Link to="/orders" className="btn btn-ghost" style={{ padding: '6px 0', fontSize: '0.9rem' }}>
          <ArrowLeft size={16} /> Back to All Orders
        </Link>

        <button type="button" onClick={handlePrint} className="btn btn-secondary btn-sm">
          <Printer size={15} /> Print Receipt
        </button>
      </div>

      {/* Main Order Card */}
      <div
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
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
            borderBottom: '1px solid var(--border-light)',
            paddingBottom: '24px',
            marginBottom: '28px',
          }}
        >
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-accent)' }}>
              Official Order Receipt
            </span>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>
              Order {order.id}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '6px' }}>
              <Calendar size={14} />
              <span>Placed on {formatDate(order.date)}</span>
            </div>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.875rem',
              fontWeight: 700,
              backgroundColor: '#ecfdf5',
              color: '#065f46',
            }}
          >
            <CheckCircle2 size={16} />
            <span>{order.status || 'Order Placed'}</span>
          </div>
        </div>

        {/* Order Progress Steps */}
        <div style={{ background: 'var(--bg-body)', borderRadius: 'var(--radius-md)', padding: '20px', marginBottom: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', textAlign: 'center', fontSize: '0.8rem', fontWeight: 700 }}>
            <div style={{ color: '#059669' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#059669', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px' }}>✓</div>
              <span>Placed</span>
            </div>
            <div style={{ color: '#059669' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#059669', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px' }}>✓</div>
              <span>Confirmed</span>
            </div>
            <div style={{ color: 'var(--text-muted)' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--bg-muted)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px' }}>3</div>
              <span>In Transit</span>
            </div>
            <div style={{ color: 'var(--text-muted)' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--bg-muted)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px' }}>4</div>
              <span>Delivered</span>
            </div>
          </div>
        </div>

        {/* Customer & Shipping Information Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '36px' }}>
          <div style={{ background: 'var(--bg-body)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, marginBottom: '12px', color: 'var(--text-main)' }}>
              <User size={18} color="var(--color-accent)" />
              <span>Customer Information</span>
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <strong>{order.customer.fullName}</strong>
              <div>{order.customer.email}</div>
              <div>{order.customer.phone}</div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-body)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, marginBottom: '12px', color: 'var(--text-main)' }}>
              <MapPin size={18} color="var(--color-accent)" />
              <span>Shipping Destination</span>
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div>{order.shippingAddress.address}</div>
              <div>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
              </div>
              <div>{order.shippingAddress.country}</div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '16px' }}>
            Purchased Items ({order.items.length})
          </h3>

          <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            {order.items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  borderBottom: idx === order.items.length - 1 ? 'none' : '1px solid var(--border-light)',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    style={{
                      width: '56px',
                      height: '56px',
                      objectFit: 'contain',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: '#fafbfc',
                      border: '1px solid var(--border-subtle)',
                      padding: '4px',
                    }}
                  />
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      {item.title}
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Qty: {item.quantity} × {formatPrice(item.price)}
                    </span>
                  </div>
                </div>

                <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)' }}>
                  {formatPrice(item.subtotal)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Summary */}
        <div style={{ maxWidth: '340px', marginLeft: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <span>Subtotal:</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <span>Shipping:</span>
            <span style={{ color: order.shippingCost === 0 ? 'var(--color-accent)' : 'inherit', fontWeight: 600 }}>
              {order.shippingCost === 0 ? 'FREE' : formatPrice(order.shippingCost)}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
            <span>Total Paid:</span>
            <span>{formatPrice(order.totalAmount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
