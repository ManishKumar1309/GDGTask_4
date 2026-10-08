import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Star,
  CheckCircle,
  Award,
  Flame,
  Tag,
  Copy,
  Check,
  ShoppingBag,
  Sparkle,
  Compass,
} from 'lucide-react';
import { getProducts } from '../services/api';
import ProductGrid from '../components/ProductGrid';
import { ProductSkeletonGrid } from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { useNotification } from '../context/NotificationContext';
import './Home.css';

export default function Home() {
  const { addToast } = useNotification();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const fetchHomeData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getProducts({ limit: 16 });
      const all = res.products || [];
      // Split into featured (e.g. highest rating) and trending
      const sortedByRating = [...all].sort((a, b) => b.rating - a.rating);
      setFeaturedProducts(sortedByRating.slice(0, 8));
      setTrendingProducts(all.slice(8, 16));
    } catch (err) {
      console.error('Home page data error:', err);
      setError('Failed to load featured products. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('AURA20');
    setCopiedCode(true);
    addToast('Coupon code "AURA20" copied to clipboard!', 'success');
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const topCategories = [
    { slug: 'beauty', name: 'Beauty & Skincare', count: '10+ items', icon: '✨' },
    { slug: 'fragrances', name: 'Luxury Fragrance', count: '8+ items', icon: '🌿' },
    { slug: 'furniture', name: 'Modern Living', count: '12+ items', icon: '🛋️' },
    { slug: 'groceries', name: 'Artisan Gourmet', count: '15+ items', icon: '🍇' },
  ];

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-pill">
                <Sparkles size={14} />
                <span>Shopify-Inspired Modern Architecture</span>
              </div>

              <h1 className="hero-title">
                Curated Design For <span>Modern Living</span>
              </h1>

              <p className="hero-desc">
                Elevate your daily routine with meticulously sourced lifestyle, beauty, and home essentials. Experience seamless checkout, real-time persistence, and effortless shopping.
              </p>

              <div className="hero-actions">
                <Link to="/products" className="btn btn-accent btn-lg">
                  <span>Explore Catalog</span>
                  <ArrowRight size={18} />
                </Link>
                <a href="#featured" className="btn btn-secondary btn-lg" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                  View Best Sellers
                </a>
              </div>

              <div className="hero-stats">
                <div className="stat-item">
                  <h4>10k+</h4>
                  <p>Delighted Customers</p>
                </div>
                <div className="stat-item">
                  <h4>4.9 ★</h4>
                  <p>Customer Rating</p>
                </div>
                <div className="stat-item">
                  <h4>100%</h4>
                  <p>Secure Simulated Checkout</p>
                </div>
              </div>
            </div>

            {/* Visual Column */}
            <div className="hero-visual">
              <div className="hero-image-card">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80"
                  alt="Aura Lifestyle Showcase"
                  className="hero-image-display"
                />

                <div className="hero-badge-float hero-badge-float-left">
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800 }}>Free Express Delivery</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>On orders over $75</div>
                  </div>
                </div>

                <div className="hero-badge-float hero-badge-float-right">
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Star size={20} fill="#d97706" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800 }}>Verified Reviews</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Over 4,500 reviews</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Categories Section */}
      <section className="section-padding" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <span className="badge badge-accent" style={{ marginBottom: '8px' }}>Collections</span>
              <h2 className="section-title">Explore by Category</h2>
              <p className="section-subtitle">Browse hand-selected products organized by department.</p>
            </div>
            <Link to="/products" className="btn btn-secondary btn-sm">
              <span>View All Categories</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="categories-grid">
            {topCategories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/products?category=${cat.slug}`}
                className="category-card"
              >
                <div className="category-icon-circle" style={{ fontSize: '1.6rem' }}>
                  {cat.icon}
                </div>
                <div>
                  <h3 className="category-name">{cat.name}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{cat.count}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Products */}
      <section id="featured" className="section-padding">
        <div className="container">
          <div className="section-header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Award size={18} color="var(--color-accent)" />
                <span className="badge badge-accent">Curated Selection</span>
              </div>
              <h2 className="section-title">Featured Products</h2>
              <p className="section-subtitle">Top-rated items favored by our community of design enthusiasts.</p>
            </div>
            <Link to="/products" className="btn btn-secondary btn-sm">
              <span>Shop All Products</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <ProductSkeletonGrid count={8} />
          ) : error ? (
            <ErrorMessage
              title="Unable to load products"
              message={error}
              onRetry={fetchHomeData}
            />
          ) : (
            <ProductGrid products={featuredProducts} />
          )}
        </div>
      </section>

      {/* 4. Promotional Banner Section */}
      <section className="section-padding" style={{ paddingTop: '20px', paddingBottom: '60px' }}>
        <div className="container">
          <div className="promo-banner">
            <div>
              <span className="badge badge-dark" style={{ background: 'rgba(0,0,0,0.3)', color: '#fff', marginBottom: '12px' }}>
                Limited Time Promo
              </span>
              <h2 className="promo-title">Take 20% Off Your Curated Order</h2>
              <p className="promo-desc">
                Elevate your sanctuary with our seasonal catalog. Enter promo code at checkout or copy below to apply simulated savings.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div className="promo-code-box">AURA20</div>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="btn btn-secondary btn-sm"
                  style={{ background: '#fff', color: '#0f172a' }}
                >
                  {copiedCode ? <Check size={16} color="#059669" /> : <Copy size={16} />}
                  <span>{copiedCode ? 'Code Copied' : 'Copy Code'}</span>
                </button>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(8px)', borderRadius: 'var(--radius-lg)', padding: '28px', border: '1px solid rgba(255,255,255,0.2)' }}>
                <Flame size={36} color="#fbbf24" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '6px' }}>Autumn Exclusives</h4>
                <p style={{ fontSize: '0.875rem', color: '#e2e8f0', marginBottom: '16px' }}>Complimentary shipping included on all eligible baskets.</p>
                <Link to="/products" className="btn btn-primary btn-sm" style={{ width: '100%' }}>
                  Claim Offer Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Trending / New Arrivals Section */}
      {trendingProducts.length > 0 && (
        <section className="section-padding" style={{ background: 'var(--bg-surface)' }}>
          <div className="container">
            <div className="section-header">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <TrendingUp size={18} color="var(--color-accent)" />
                  <span className="badge badge-accent">Trending Now</span>
                </div>
                <h2 className="section-title">New Arrivals & Hot Picks</h2>
                <p className="section-subtitle">Fresh additions newly stocked in our global distribution center.</p>
              </div>
              <Link to="/products" className="btn btn-secondary btn-sm">
                <span>View All</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <ProductGrid products={trendingProducts} />
          </div>
        </section>
      )}
    </div>
  );
}
