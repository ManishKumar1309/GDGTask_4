import React from 'react';
import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({
  value = 1,
  onChange,
  min = 1,
  max = 99,
  disabled = false,
  size = 'medium',
}) {
  const current = Math.max(min, Math.min(Number(value) || min, max));

  const handleDecrease = () => {
    if (disabled || current <= min) return;
    onChange(current - 1);
  };

  const handleIncrease = () => {
    if (disabled || current >= max) return;
    onChange(current + 1);
  };

  const handleInputChange = (e) => {
    const raw = e.target.value;
    if (raw === '') return;
    const parsed = parseInt(raw, 10);
    if (!isNaN(parsed)) {
      const clamped = Math.max(min, Math.min(parsed, max));
      onChange(clamped);
    }
  };

  const isSmall = size === 'small';

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: 'var(--bg-surface)',
        border: '1.5px solid var(--border-subtle)',
        borderRadius: 'var(--radius-sm)',
        overflow: 'hidden',
        height: isSmall ? '36px' : '44px',
      }}
    >
      <button
        type="button"
        onClick={handleDecrease}
        disabled={disabled || current <= min}
        aria-label="Decrease quantity"
        style={{
          width: isSmall ? '34px' : '40px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: current <= min ? 'var(--text-muted)' : 'var(--text-main)',
          backgroundColor: 'transparent',
          transition: 'background var(--transition-fast)',
        }}
        onMouseEnter={(e) => {
          if (!disabled && current > min) e.currentTarget.style.backgroundColor = 'var(--bg-subtle)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <Minus size={isSmall ? 14 : 16} />
      </button>

      <input
        type="number"
        value={current}
        onChange={handleInputChange}
        min={min}
        max={max}
        disabled={disabled}
        aria-label="Quantity"
        style={{
          width: isSmall ? '40px' : '48px',
          height: '100%',
          textAlign: 'center',
          border: 'none',
          outline: 'none',
          fontWeight: 600,
          fontSize: isSmall ? '0.85rem' : '0.95rem',
          color: 'var(--text-main)',
          backgroundColor: 'transparent',
          MozAppearance: 'textfield',
        }}
      />

      <button
        type="button"
        onClick={handleIncrease}
        disabled={disabled || current >= max}
        aria-label="Increase quantity"
        style={{
          width: isSmall ? '34px' : '40px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: current >= max ? 'var(--text-muted)' : 'var(--text-main)',
          backgroundColor: 'transparent',
          transition: 'background var(--transition-fast)',
        }}
        onMouseEnter={(e) => {
          if (!disabled && current < max) e.currentTarget.style.backgroundColor = 'var(--bg-subtle)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <Plus size={isSmall ? 14 : 16} />
      </button>
    </div>
  );
}
