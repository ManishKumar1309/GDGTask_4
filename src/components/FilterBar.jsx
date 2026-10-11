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
    <div className={`filter-controls ${isMobile ? 'mobile-mode' : ''}`}>
      {/* 1. Category Filter */}
      <div className="filter-group">
        <label className="filter-label">Category</label>
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

      {/* 2. Price Range in INR (₹) */}
      <div className="filter-group">
        <label className="filter-label">Price Range (₹)</label>
        <div className="price-inputs">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => onPriceChange({ min: e.target.value, max: maxPrice })}
            className="filter-input-number"
            min="0"
            aria-label="Minimum price in INR"
          />
          <span className="price-sep">–</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => onPriceChange({ min: minPrice, max: e.target.value })}
            className="filter-input-number"
            min="0"
            aria-label="Maximum price in INR"
          />
        </div>
      </div>

      {/* 3. Minimum Rating Filter */}
      <div className="filter-group">
        <label className="filter-label">Min Rating</label>
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

      {/* 4. Sorting Dropdown */}
      <div className="filter-group">
        <label className="filter-label">Sort By</label>
        <select
          className="filter-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Sort products"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Highest Rated</option>
          <option value="newest">Newest First</option>
        </select>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onResetFilters}
          className="filter-reset-btn"
          title="Reset all filters"
        >
          <RotateCcw size={14} />
          <span>Clear Filters</span>
        </button>
      )}
    </div>
  );

  return (
    <div className="filterbar-container">
      {/* Desktop Filter Bar */}
      <div className="desktop-filters">
        {filterContent(false)}
        <div className="filter-results-count">
          <strong>{totalResults}</strong> {totalResults === 1 ? 'product' : 'products'} found
        </div>
      </div>

      {/* Mobile Trigger Button */}
      <div className="mobile-filter-trigger-row">
        <button
          type="button"
          onClick={() => setMobileDrawerOpen(true)}
          className="mobile-filter-btn"
        >
          <SlidersHorizontal size={16} />
          <span>Filters & Sort</span>
          {hasActiveFilters && <span className="active-dot" />}
        </button>

        <span className="mobile-results-count">
          {totalResults} products
        </span>
      </div>

      {/* Mobile Drawer Panel */}
      {mobileDrawerOpen && (
        <>
          <div className="mobile-filter-overlay" onClick={() => setMobileDrawerOpen(false)} />
          <div className="mobile-filter-drawer" role="dialog" aria-label="Filter Options">
            <div className="mobile-drawer-top">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <SlidersHorizontal size={18} color="var(--color-primary)" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Filter & Sort</h3>
              </div>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="btn-icon"
                aria-label="Close filters"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mobile-drawer-body">
              {filterContent(true)}
            </div>

            <div className="mobile-drawer-bottom">
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="btn btn-primary btn-md"
                style={{ width: '100%' }}
              >
                Apply Filters ({totalResults} Results)
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
