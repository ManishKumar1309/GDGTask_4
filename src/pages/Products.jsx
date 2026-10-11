import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts, getCategories } from '../services/api';
import ProductGrid from '../components/ProductGrid';
import FilterBar from '../components/FilterBar';
import { ProductSkeletonGrid } from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { RotateCcw, Search } from 'lucide-react';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  // API state
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter & Search states from URL
  const selectedCategory = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState('0');
  const [sortBy, setSortBy] = useState('featured');

  // Pagination / Load more
  const [visibleCount, setVisibleCount] = useState(12);

  // Fetch initial products and categories
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        getProducts({ limit: 100 }),
        getCategories(),
      ]);
      setAllProducts(productsRes.products || []);
      setCategories(categoriesRes || []);
    } catch (err) {
      console.error('Error fetching catalog:', err);
      setError('Unable to load products. Please check your network and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update URL params when category changes
  const handleSelectCategory = (cat) => {
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', cat);
    }
    setSearchParams(newParams);
    setVisibleCount(12);
  };

  const handlePriceChange = ({ min, max }) => {
    setMinPrice(min);
    setMaxPrice(max);
    setVisibleCount(12);
  };

  const handleRatingChange = (rating) => {
    setMinRating(rating);
    setVisibleCount(12);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  const handleResetFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setMinRating('0');
    setSortBy('featured');
    setSearchParams({});
    setVisibleCount(12);
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // 1. Category filter
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // 2. Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    }

    // 3. Min Price in INR
    if (minPrice !== '' && !isNaN(Number(minPrice))) {
      result = result.filter((p) => p.price >= Number(minPrice));
    }

    // 4. Max Price in INR
    if (maxPrice !== '' && !isNaN(Number(maxPrice))) {
      result = result.filter((p) => p.price <= Number(maxPrice));
    }

    // 5. Min Rating filter
    if (minRating !== '0') {
      result = result.filter((p) => (p.rating || 0) >= Number(minRating));
    }

    // 6. Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      case 'featured':
      default:
        // Keep original order
        break;
    }

    return result;
  }, [allProducts, selectedCategory, searchQuery, minPrice, maxPrice, minRating, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <div className="container" style={{ paddingTop: '32px', paddingBottom: '80px' }}>
      {/* Header Banner */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '6px' }}>
          Shop All Products
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
          Discover curated electronics, fashion, home essentials, and lifestyle gear at realistic Indian prices.
        </p>
      </div>

      {/* Filter and Sort Toolbar */}
      <FilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onPriceChange={handlePriceChange}
        minRating={minRating}
        onRatingChange={handleRatingChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        onResetFilters={handleResetFilters}
        totalResults={filteredProducts.length}
      />

      {/* Main Content State */}
      {loading ? (
        <ProductSkeletonGrid count={12} />
      ) : error ? (
        <ErrorMessage
          title="Could Not Load Products"
          message={error}
          onRetry={fetchData}
        />
      ) : filteredProducts.length === 0 ? (
        /* Helpful message when no products match the selected filters */
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '60px 24px',
            textAlign: 'center',
            maxWidth: '520px',
            margin: '40px auto',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--color-text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}
          >
            <Search size={28} />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px', color: 'var(--color-text)' }}>
            No Matching Products Found
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.925rem', marginBottom: '24px', lineHeight: 1.5 }}>
            We couldn't find any products matching your active filters or search terms. Try adjusting the price range, rating, or clearing your filters.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="btn btn-primary btn-md"
            style={{ gap: '8px' }}
          >
            <RotateCcw size={16} />
            <span>Clear All Filters</span>
          </button>
        </div>
      ) : (
        <>
          {/* Product Grid */}
          <ProductGrid products={displayedProducts} />

          {/* Load More Button */}
          {hasMore && (
            <div style={{ textAlign: 'center', marginTop: '48px' }}>
              <button
                type="button"
                onClick={handleLoadMore}
                className="btn btn-secondary btn-lg"
                style={{ minWidth: '200px' }}
              >
                Load More Products ({filteredProducts.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
