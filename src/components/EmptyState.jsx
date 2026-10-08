import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmptyState({
  icon: Icon = ShoppingBag,
  title = 'Nothing here yet',
  description = 'Explore our catalog to find products you love.',
  actionLink = '/products',
  actionText = 'Start Shopping',
  onAction = null,
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '72px 24px',
      margin: '32px auto',
      maxWidth: '520px',
      background: 'var(--bg-surface)',
      borderRadius: 'var(--radius-xl)',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'var(--shadow-sm)',
    }}>
      <div style={{
        width: '72px',
        height: '72px',
        borderRadius: '50%',
        backgroundColor: 'var(--bg-subtle)',
        color: 'var(--text-secondary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px'
      }}>
        <Icon size={34} strokeWidth={1.75} />
      </div>

      <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '10px' }}>
        {title}
      </h3>

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '28px', maxWidth: '380px', lineHeight: 1.6 }}>
        {description}
      </p>

      {onAction ? (
        <button onClick={onAction} className="btn btn-primary btn-lg">
          {actionText} <ArrowRight size={18} />
        </button>
      ) : actionLink ? (
        <Link to={actionLink} className="btn btn-primary btn-lg">
          {actionText} <ArrowRight size={18} />
        </Link>
      ) : null}
    </div>
  );
}
