import React, { useState } from 'react';
import { SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import './FilterBar.css';

export default function FilterBar({
  categories = [],
  selectedCategory = 'all',
  onSelectCategory,
  minPrice = '',
  maxPrice = '',
  onPriceChange,
  minRating = '0',
  onRatingChange,
  sortBy = 'featured',
  onSortChange,
  onResetFilters,
  totalResults = 0,
}) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    minPrice !== '' ||
    maxPrice !== '' ||
    minRating !== '0' ||
    sortBy !== 'featured';

  const filterContent = (isMobile = false) => (
    <>
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '16px', alignItems: isMobile ? 'stretch' : 'center', flexWrap: 'wrap' }}>
        {/* Category Filter */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Category
          </label>
          <select
            className="filter-select"
            value={selectedCategory}
            onChange={(e) => onSelectCategory(e.target.value)}
            aria-label="Filter by category"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Price Range ($)
          </label>
          <div className="price-inputs-wrapper">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => onPriceChange({ min: e.target.value, max: maxPrice })}
              className="price-input"
              min="0"
              aria-label="Minimum price"
            />
            <span style={{ color: 'var(--text-muted)' }}>–</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => onPriceChange({ min: minPrice, max: e.target.value })}
              className="price-input"
              min="0"
              aria-label="Maximum price"
            />
          </div>
        </div>

        {/* Rating Filter */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Min Rating
          </label>
          <select
            className="filter-select"
            value={minRating}
            onChange={(e) => onRatingChange(e.target.value)}
            aria-label="Filter by rating"
          >
            <option value="0">All Ratings</option>
            <option value="4.5">4.5+ Stars</option>
            <option value="4.0">4.0+ Stars</option>
            <option value="3.5">3.5+ Stars</option>
            <option value="3.0">3.0+ Stars</option>
          </select>
        </div>

        {/* Sorting Dropdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Sort By
          </label>
          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sort products"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Rating: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>

        {/* Reset Button */}
        {hasActiveFilters && (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', marginTop: isMobile ? '8px' : '0' }}>
            <button
              type="button"
              onClick={onResetFilters}
              className="btn btn-secondary btn-sm"
              style={{ color: 'var(--color-danger)', borderColor: 'var(--color-danger-border)', height: '38px' }}
            >
              <RotateCcw size={14} /> Clear All
            </button>
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Filter Bar */}
      <div className="filter-bar-desktop">
        <div className="filter-row-top">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <SlidersHorizontal size={18} color="var(--color-primary)" />
            <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Filters & Sorting</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              ({totalResults} {totalResults === 1 ? 'product' : 'products'})
            </span>
          </div>

          {filterContent(false)}
        </div>
      </div>

      {/* Mobile Filter Trigger Button */}
      <div className="mobile-filter-trigger">
        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          {totalResults} items
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            className="btn btn-secondary btn-sm"
            style={{ display: 'inline-flex', gap: '6px' }}
          >
            <SlidersHorizontal size={15} />
            Filters {hasActiveFilters && '•'}
          </button>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="btn btn-ghost btn-sm"
              style={{ color: 'var(--color-danger)' }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileDrawerOpen && (
        <div className="mobile-filter-drawer-overlay" onClick={() => setMobileDrawerOpen(false)}>
          <div
            className="mobile-filter-drawer"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Filter dialog"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Filters & Sorting</h3>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="btn-icon"
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
              {filterContent(true)}
            </div>

            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Apply Filters ({totalResults} products)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
