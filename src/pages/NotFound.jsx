import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, ShoppingBag } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '100px 20px',
          minHeight: '65vh',
        }}
      >
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-subtle)',
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
          }}
        >
          <Compass size={44} strokeWidth={1.5} />
        </div>

        <span
          style={{
            fontSize: '0.85rem',
            fontWeight: 800,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
            marginBottom: '8px',
          }}
        >
          Error 404
        </span>

        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '12px' }}>
          Page Not Found
        </h1>

        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '1.05rem',
            maxWidth: '480px',
            lineHeight: 1.6,
            marginBottom: '32px',
          }}
        >
          The page you are looking for doesn't exist, has been removed, or has had its address changed.
        </p>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/" className="btn btn-primary btn-lg">
            <Home size={18} /> Back to Home
          </Link>
          <Link to="/products" className="btn btn-secondary btn-lg">
            <ShoppingBag size={18} /> Browse Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
