import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  getProductById,
  getProducts,
} from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils/formatters';
import QuantitySelector from '../components/QuantitySelector';
import ProductGrid from '../components/ProductGrid';
import { LoadingSpinner } from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import {
  Heart,
  ShoppingBag,
  Star,
  ArrowLeft,
  Truck,
  ShieldCheck,
  RefreshCw,
  Check,
  PackageCheck,
  UserCheck,
} from 'lucide-react';
import './ProductDetails.css';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [addingToCart, setAddingToCart] = useState(false);

  const fetchDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProductById(id);
      if (!data) {
        throw new Error('Product not found');
      }
      setProduct(data);
      setActiveImage(data.images && data.images[0] ? data.images[0] : data.thumbnail);
      setQuantity(1);

      // Fetch related products in the same category
      if (data.category) {
        try {
          const relatedRes = await getProducts({ category: data.category, limit: 5 });
          const filtered = (relatedRes.products || []).filter((p) => p.id !== data.id);
          setRelatedProducts(filtered.slice(0, 4));
        } catch {
          // Non-critical, ignore
        }
      }
    } catch (err) {
      console.error('Error fetching product details:', err);
      if (err.status === 404 || err.message?.includes('not found')) {
        setError('404');
      } else {
        setError(err.message || 'Unable to load product details.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingSpinner text="Retrieving product details..." size="large" />
      </div>
    );
  }

  if (error === '404' || !product) {
    return (
      <div className="container">
        <ErrorMessage
          title="Product Not Found"
          message={`We couldn't locate any product matching ID "${id}". It may be discontinued or unavailable.`}
          backTo="/products"
          backText="Return to All Products"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <ErrorMessage
          title="Failed to Load Product"
          message={error}
          onRetry={fetchDetails}
          backTo="/products"
          backText="Back to Products"
        />
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const discount = Math.round(product.discountPercentage || 0);
  const originalPrice = discount > 0 ? product.price / (1 - discount / 100) : null;
  const imageGallery = product.images && product.images.length > 0 ? product.images : [product.thumbnail];

  const handleAddToCart = () => {
    setAddingToCart(true);
    addToCart(product, quantity);
    setTimeout(() => {
      setAddingToCart(false);
    }, 600);
  };

  return (
    <div className="container product-details-container">
      {/* Breadcrumb Navigation */}
      <nav className="details-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/products">Products</Link>
        <span>/</span>
        <Link to={`/products?category=${product.category}`}>{product.category}</Link>
        <span>/</span>
        <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{product.title}</span>
      </nav>

      {/* Main Grid: Gallery & Info */}
      <div className="details-main-grid">
        {/* Left: Product Images Gallery */}
        <div className="gallery-wrapper">
          <div className="gallery-main-view">
            <img
              src={activeImage || product.thumbnail}
              alt={product.title}
              className="gallery-main-img"
            />
          </div>

          {imageGallery.length > 1 && (
            <div className="gallery-thumbs-row">
              {imageGallery.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  className={`gallery-thumb-btn ${activeImage === img ? 'active' : ''}`}
                  aria-label={`View image ${idx + 1}`}
                >
                  <img src={img} alt={`${product.title} preview ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Information & Purchase Controls */}
        <div className="details-info-col">
          <span className="details-category-pill">{product.category}</span>
          <h1 className="details-title">{product.title}</h1>

          {/* Rating & Review Count */}
          <div className="details-rating-row">
            <div className="details-stars">
              <Star size={16} fill="#d97706" color="#d97706" />
              <span>{Number(product.rating || 4.5).toFixed(1)}</span>
            </div>
            <span style={{ color: 'var(--border-strong)' }}>|</span>
            <span className="details-review-count">
              {product.reviews && product.reviews.length > 0
                ? `${product.reviews.length} Customer Reviews`
                : '18 Verified Ratings'}
            </span>
            <span style={{ color: 'var(--border-strong)' }}>|</span>
            <span style={{ fontSize: '0.85rem', color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <PackageCheck size={14} /> In Stock ({product.stock} units)
            </span>
          </div>

          {/* Price Box */}
          <div className="details-price-box">
            <span className="details-price">{formatPrice(product.price)}</span>
            {originalPrice && (
              <span className="details-original-price">
                {formatPrice(originalPrice)}
              </span>
            )}
            {discount > 0 && (
              <span className="badge badge-sale">Save {discount}%</span>
            )}
          </div>

          {/* Description */}
          <p className="details-description">{product.description}</p>

          {/* Quantity Selector & Action Buttons */}
          <div className="details-actions-wrapper">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Quantity:</span>
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                min={1}
                max={product.stock || 20}
              />
            </div>

            <div className="details-action-buttons">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={addingToCart}
                className="btn btn-primary btn-lg"
                style={{ flex: 1, gap: '8px' }}
              >
                {addingToCart ? (
                  <>
                    <Check size={18} />
                    <span>Adding to Bag...</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`btn btn-secondary btn-lg ${isFavorited ? 'active' : ''}`}
                style={{
                  color: isFavorited ? '#dc2626' : 'var(--text-main)',
                  borderColor: isFavorited ? '#fca5a5' : 'var(--border-subtle)',
                  padding: '12px 18px',
                }}
                aria-label="Wishlist toggle"
              >
                <Heart
                  size={20}
                  fill={isFavorited ? '#dc2626' : 'none'}
                />
              </button>
            </div>

            <Link
              to="/products"
              className="btn btn-ghost"
              style={{ width: 'fit-content', padding: '6px 0', fontSize: '0.9rem' }}
            >
              <ArrowLeft size={16} /> Back to All Products
            </Link>
          </div>

          {/* Trust Guarantees */}
          <div className="details-trust-bullets">
            <div className="trust-bullet-item">
              <Truck size={18} color="var(--color-accent)" />
              <span>{product.shippingInformation || 'Free delivery over $75'}</span>
            </div>
            <div className="trust-bullet-item">
              <RefreshCw size={18} color="var(--color-accent)" />
              <span>{product.returnPolicy || '30-Day Money Back Guarantee'}</span>
            </div>
            <div className="trust-bullet-item">
              <ShieldCheck size={18} color="var(--color-accent)" />
              <span>{product.warrantyInformation || '1-Year Official Warranty'}</span>
            </div>
            <div className="trust-bullet-item">
              <Check size={18} color="var(--color-accent)" />
              <span>100% Guaranteed Authentic</span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="details-reviews-section">
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>
          Customer Reviews & Feedback
        </h2>

        {product.reviews && product.reviews.length > 0 ? (
          <div className="reviews-grid">
            {product.reviews.map((rev, idx) => (
              <div key={idx} className="review-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <UserCheck size={16} color="var(--color-accent)" />
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>
                      {rev.reviewerName || 'Verified Buyer'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#d97706' }}>
                    <Star size={13} fill="#d97706" />
                    <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{rev.rating || 5}</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, fontStyle: 'italic' }}>
                  "{rev.comment}"
                </p>
                {rev.date && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {new Date(rev.date).toLocaleDateString()}
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>
            No written reviews yet. Be the first to order and share your thoughts!
          </p>
        )}
      </section>

      {/* Related Products from same category */}
      {relatedProducts.length > 0 && (
        <section style={{ marginTop: '72px', borderTop: '1px solid var(--border-subtle)', paddingTop: '48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Related Products</h2>
            <Link to={`/products?category=${product.category}`} className="btn btn-secondary btn-sm">
              Explore More {product.category}
            </Link>
          </div>
          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </div>
  );
}
