import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts, getCategories } from '../services/api';
import ProductGrid from '../components/ProductGrid';
import FilterBar from '../components/FilterBar';
import SearchBar from '../components/SearchBar';
import { ProductSkeletonGrid } from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { SlidersHorizontal, ChevronDown, PackageCheck } from 'lucide-react';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  // API state
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter & Search states
  const categoryFromUrl = searchParams.get('category') || 'all';
  const searchFromUrl = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [searchQuery, setSearchQuery] = useState(searchFromUrl);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState('0');
  const [sortBy, setSortBy] = useState('featured');

  // Pagination / Load more
  const [visibleCount, setVisibleCount] = useState(12);

  // Sync state if URL changes
  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'all');
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

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
    setSelectedCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', cat);
    }
    setSearchParams(newParams);
    setVisibleCount(12);
  };

  // Update URL params when search query changes
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    const newParams = new URLSearchParams(searchParams);
    if (!query) {
      newParams.delete('search');
    } else {
      newParams.set('search', query);
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
    setSelectedCategory('all');
    setSearchQuery('');
    setMinPrice('');
    setMaxPrice('');
    setMinRating('0');
    setSortBy('featured');
    setSearchParams({});
    setVisibleCount(12);
  };

  // Combined Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // 1. Search Query Filter (Title, category, description, brand)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.brand && p.brand.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // 2. Category Filter
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // 3. Minimum Price Filter
    if (minPrice !== '' && !isNaN(Number(minPrice))) {
      result = result.filter((p) => p.price >= Number(minPrice));
    }

    // 4. Maximum Price Filter
    if (maxPrice !== '' && !isNaN(Number(maxPrice))) {
      result = result.filter((p) => p.price <= Number(maxPrice));
    }

    // 5. Minimum Rating Filter
    if (minRating !== '0' && !isNaN(Number(minRating))) {
      result = result.filter((p) => p.rating >= Number(minRating));
    }

    // 6. Sorting Logic
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'featured':
      default:
        // Default preserve ID or order
        break;
    }

    return result;
  }, [allProducts, searchQuery, selectedCategory, minPrice, maxPrice, minRating, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  return (
    <div className="container" style={{ paddingBottom: '80px', paddingTop: '32px' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-main)', marginBottom: '8px' }}>
          Catalog & Collections
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Explore our complete selection of curated lifestyle, decor, beauty, and home essentials.
        </p>
      </div>

      {/* Main Search Bar */}
      <div style={{ marginBottom: '20px', maxWidth: '640px' }}>
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Filter by title, brand, or keywords..."
          size="large"
        />
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

      {/* Content State */}
      {loading ? (
        <ProductSkeletonGrid count={12} />
      ) : error ? (
        <ErrorMessage
          title="Catalog Unreachable"
          message={error}
          onRetry={fetchData}
        />
      ) : (
        <>
          <ProductGrid
            products={displayedProducts}
            emptyTitle={searchQuery ? `No results for "${searchQuery}"` : 'No matching products'}
            emptyDescription="Try clearing your filters or searching for another keyword to discover items."
            onClearFilters={handleResetFilters}
          />

          {/* Load More Button */}
          {hasMore && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}>
              <button
                type="button"
                onClick={handleLoadMore}
                className="btn btn-secondary btn-lg"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '200px' }}
              >
                <span>Load More Products</span>
                <ChevronDown size={18} />
              </button>
            </div>
          )}

          {/* Product count footer */}
          {!hasMore && filteredProducts.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: '48px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              Showing all {filteredProducts.length} items
            </div>
          )}
        </>
      )}
    </div>
  );
}
