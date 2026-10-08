import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import { formatPrice, formatDate } from '../utils/formatters';

export default function OrderCard({ order }) {
  if (!order) return null;

  return (
    <div
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '24px',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
      }}
    >
      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '12px',
          borderBottom: '1px solid var(--border-light)',
          paddingBottom: '16px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Package size={18} color="var(--color-accent)" />
            <span style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '0.02em' }}>
              {order.id}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <Calendar size={14} />
            <span>{formatDate(order.date)}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: 700,
              backgroundColor: '#ecfdf5',
              color: '#065f46',
            }}
          >
            <CheckCircle2 size={14} />
            {order.status || 'Order Placed'}
          </span>
        </div>
      </div>

      {/* Middle: Items preview */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {(order.items || []).slice(0, 4).map((item, idx) => (
            <div
              key={idx}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                backgroundColor: '#fafbfc',
                overflow: 'hidden',
                position: 'relative',
              }}
              title={item.title}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }}
              />
              {item.quantity > 1 && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: '2px',
                    right: '2px',
                    backgroundColor: 'var(--color-primary)',
                    color: '#fff',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    borderRadius: '4px',
                    padding: '0 4px',
                  }}
                >
                  x{item.quantity}
                </span>
              )}
            </div>
          ))}

          {(order.items || []).length > 4 && (
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-subtle)',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.85rem',
              }}
            >
              +{order.items.length - 4}
            </div>
          )}
        </div>

        <div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'right' }}>
            {order.totalQuantity || (order.items || []).reduce((acc, i) => acc + i.quantity, 0)} items
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', textAlign: 'right' }}>
            {formatPrice(order.totalAmount)}
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '8px' }}>
        <Link to={`/orders/${order.id}`} className="btn btn-secondary btn-sm" style={{ display: 'inline-flex', gap: '6px' }}>
          <span>View Order Details</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
