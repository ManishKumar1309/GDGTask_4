import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Tag, ChevronRight, CheckCircle2 } from 'lucide-react';
import { getProducts, getCategories } from '../services/api';
import ProductGrid from '../components/ProductGrid';
import { ProductSkeletonGrid } from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { getRecentlyViewedProducts } from '../utils/storage';
import ProductCard from '../components/ProductCard';
import './Home.css';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [heroImageSrc, setHeroImageSrc] = useState(
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80'
  );

  const fallbackHeroImage =
    'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&auto=format&fit=crop&q=80';

  const fetchHomeData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [prodRes, catRes] = await Promise.all([
        getProducts({ limit: 8 }),
        getCategories(),
      ]);
      setFeaturedProducts(prodRes.products || []);
      setCategories(catRes || []);
      setRecentlyViewed(getRecentlyViewedProducts());
    } catch (err) {
      console.error('Home page data error:', err);
      setError('Failed to load featured products. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  return (
    <div className="home-container">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            {/* Left Column: Headline, Supporting Text, and Action Buttons */}
            <div className="hero-left">
              <h1 className="hero-title">
                Good Finds. Great Prices.
              </h1>
              <p className="hero-subtitle">
                Discover products you'll love, from everyday tech to little upgrades for your home and lifestyle.
              </p>
              <div className="hero-btn-group">
                <Link to="/shop" className="btn btn-primary btn-lg">
                  <span>Shop Now</span>
                  <ArrowRight size={18} />
                </Link>
                <a href="#categories" className="btn btn-secondary btn-lg">
                  Explore Categories
                </a>
              </div>

              {/* Tasteful reassurance micro-detail */}
              <div className="hero-trust-bar">
                <div className="hero-trust-item">
                  <CheckCircle2 size={16} className="hero-trust-icon" />
                  <span>Free Delivery &gt; ₹999</span>
                </div>
                <span className="hero-trust-dot">•</span>
                <div className="hero-trust-item">
                  <CheckCircle2 size={16} className="hero-trust-icon" />
                  <span>100% Genuine</span>
                </div>
                <span className="hero-trust-dot">•</span>
                <div className="hero-trust-item">
                  <CheckCircle2 size={16} className="hero-trust-icon" />
                  <span>7-Day Easy Returns</span>
                </div>
              </div>
            </div>

            {/* Right Column: Real, high-quality editorial lifestyle shopping photograph */}
            <div className="hero-right">
              <div className="hero-image-wrapper">
                <img
                  src={heroImageSrc}
                  alt="Curated lifestyle products and modern store collection"
                  className="hero-image"
                  loading="eager"
                  onError={() => setHeroImageSrc(fallbackHeroImage)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION */}
      <section id="categories" className="categories-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Shop by Category</h2>
              <p className="section-subtitle">Explore top collections curated for your daily lifestyle</p>
            </div>
            <Link to="/shop" className="view-all-link">
              <span>View All</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="categories-grid">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/shop?category=${cat.slug}`}
                className="category-card"
              >
                <div className="category-img-wrapper">
                  <img src={cat.image} alt={cat.name} className="category-img" />
                </div>
                <div className="category-card-content">
                  <h3 className="category-name">{cat.name}</h3>
                  <span className="category-count">{cat.count}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS SECTION */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Featured Products</h2>
              <p className="section-subtitle">Handpicked customer favorites with exceptional ratings</p>
            </div>
            <Link to="/shop" className="view-all-link">
              <span>Explore All Products</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          {loading ? (
            <ProductSkeletonGrid count={8} />
          ) : error ? (
            <ErrorMessage title="Unable to load products" message={error} onRetry={fetchHomeData} />
          ) : (
            <ProductGrid products={featuredProducts} />
          )}
        </div>
      </section>

      {/* 4. SMALL PROMOTIONAL BANNER */}
      <section className="promo-banner-section">
        <div className="container">
          <div className="promo-banner">
            <div className="promo-banner-content">
              <div className="promo-badge">
                <Tag size={15} /> Limited Time Offer
              </div>
              <h2 className="promo-title">Up to 40% Off Everyday Essentials</h2>
              <p className="promo-desc">
                Upgrade your gear, wardrobe, and home with hand-selected deals at unbeatable prices.
              </p>
              <Link to="/shop" className="btn btn-primary btn-md">
                Explore Deals
              </Link>
            </div>
            <div className="promo-banner-media">
              <img
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=700&auto=format&fit=crop&q=80"
                alt="Special Deals and Promotions"
                className="promo-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. RECENTLY VIEWED PRODUCTS (If present in LocalStorage) */}
      {recentlyViewed.length > 0 && (
        <section className="recently-viewed-section">
          <div className="container">
            <div className="section-header">
              <div>
                <h2 className="section-title">Recently Viewed</h2>
                <p className="section-subtitle">Jump straight back to items you looked at earlier</p>
              </div>
            </div>
            <div className="recently-viewed-grid">
              {recentlyViewed.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
