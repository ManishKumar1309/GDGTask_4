import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import { formatPrice, formatDate } from '../utils/formatters';

export default function OrderCard({ order }) {
  if (!order) return null;

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: '24px',
        boxShadow: 'var(--shadow-xs)',
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
          borderBottom: '1px solid var(--color-border)',
          paddingBottom: '16px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Package size={18} color="var(--color-primary)" />
            <span style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-text)' }}>
              {order.id}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
            <Calendar size={14} />
            <span>{formatDate(order.date)}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="badge badge-stock">
            <CheckCircle2 size={14} />
            {order.status || 'Order Confirmed'}
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
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--bg-secondary)',
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
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--color-text-secondary)',
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
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', textAlign: 'right' }}>
            {order.totalQuantity || (order.items || []).reduce((acc, i) => acc + i.quantity, 0)} items
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text)', textAlign: 'right' }}>
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
