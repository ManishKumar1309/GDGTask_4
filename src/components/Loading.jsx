import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingSpinner({ text = 'Loading...', size = 'default' }) {
  const iconSize = size === 'small' ? 18 : size === 'large' ? 36 : 24;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 20px',
      gap: '12px',
      color: 'var(--text-secondary)'
    }}>
      <Loader2
        size={iconSize}
        style={{ animation: 'spin 1s linear infinite', color: 'var(--color-primary)' }}
      />
      {text && <p style={{ fontSize: '0.9rem', fontWeight: 500 }}>{text}</p>}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export function ProductSkeletonGrid({ count = 8 }) {
  const items = Array.from({ length: count });

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
      gap: '24px',
      width: '100%',
    }}>
      {items.map((_, idx) => (
        <div
          key={idx}
          style={{
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}
        >
          <div className="skeleton" style={{ width: '100%', aspectRatio: '1/1', borderRadius: 'var(--radius-sm)' }} />
          <div className="skeleton" style={{ width: '40%', height: '14px' }} />
          <div className="skeleton" style={{ width: '85%', height: '20px' }} />
          <div className="skeleton" style={{ width: '60%', height: '14px' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
            <div className="skeleton" style={{ width: '30%', height: '22px' }} />
            <div className="skeleton" style={{ width: '35%', height: '36px', borderRadius: 'var(--radius-sm)' }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Loading({ text }) {
  return <LoadingSpinner text={text} size="large" />;
}
