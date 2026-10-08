import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({
  value = '',
  onChange,
  onSearch,
  placeholder = 'Search products, brands, categories...',
  size = 'default'
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(value);
  };

  const handleClear = () => {
    onChange('');
    if (onSearch) onSearch('');
  };

  const isLarge = size === 'large';

  return (
    <form onSubmit={handleSubmit} style={{ position: 'relative', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'var(--bg-surface)',
          border: '1.5px solid var(--border-subtle)',
          borderRadius: isLarge ? 'var(--radius-md)' : 'var(--radius-sm)',
          padding: isLarge ? '4px 16px' : '2px 14px',
          boxShadow: 'var(--shadow-xs)',
          transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
        }}
      >
        <Search
          size={isLarge ? 20 : 18}
          color="var(--text-muted)"
          style={{ marginRight: '10px', flexShrink: 0 }}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label="Search products"
          style={{
            width: '100%',
            height: isLarge ? '44px' : '38px',
            border: 'none',
            outline: 'none',
            fontSize: isLarge ? '1rem' : '0.92rem',
            color: 'var(--text-main)',
            backgroundColor: 'transparent',
          }}
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            style={{
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              color: 'var(--text-muted)',
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>
    </form>
  );
}
