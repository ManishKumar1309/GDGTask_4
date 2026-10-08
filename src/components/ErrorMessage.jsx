import React from 'react';
import { AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ErrorMessage({
  title = 'Something went wrong',
  message = 'Unable to load information. Please try again.',
  onRetry = null,
  backTo = null,
  backText = 'Return to Store'
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '60px 20px',
      margin: '24px auto',
      maxWidth: '560px',
      background: 'var(--bg-surface)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'var(--shadow-sm)',
    }}>
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-danger-light)',
        color: 'var(--color-danger)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '16px'
      }}>
        <AlertCircle size={28} />
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
        {title}
      </h3>

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginBottom: '24px', lineHeight: 1.5 }}>
        {message}
      </p>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {onRetry && (
          <button onClick={onRetry} className="btn btn-primary">
            <RefreshCw size={16} /> Try Again
          </button>
        )}
        {backTo && (
          <Link to={backTo} className="btn btn-secondary">
            <ArrowLeft size={16} /> {backText}
          </Link>
        )}
      </div>
    </div>
  );
}
