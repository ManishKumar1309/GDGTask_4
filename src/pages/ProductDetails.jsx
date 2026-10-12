import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, getProducts } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils/formatters';
import { addRecentlyViewedProduct } from '../utils/storage';
import QuantitySelector from '../components/QuantitySelector';
import ProductGrid from '../components/ProductGrid';
import { LoadingSpinner } from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import {
  Heart,
  ShoppingBag,
  Zap,
  Star,
  Truck,
  ShieldCheck,
  RefreshCw,
  Check,
  PackageCheck,
  CheckCircle2,
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

      // Save to recently viewed
      addRecentlyViewedProduct(data);

      // Fetch related products in the same category
      if (data.category) {
        try {
          const relatedRes = await getProducts({ category: data.category, limit: 5 });
          const filtered = (relatedRes.products || []).filter((p) => String(p.id) !== String(data.id));
          setRelatedProducts(filtered.slice(0, 4));
        } catch {
          // Ignore
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
      <div className="container" style={{ padding: '60px 20px' }}>
        <ErrorMessage
          title="Product Not Found"
          message={`We couldn't locate any product matching ID "${id}". It may be unavailable or moved.`}
          backTo="/shop"
          backText="Return to Shop"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ padding: '60px 20px' }}>
        <ErrorMessage
          title="Failed to Load Product"
          message={error}
          onRetry={fetchDetails}
          backTo="/shop"
          backText="Back to Shop"
        />
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const discount = Math.round(product.discountPercentage || 0);
  const originalPrice = discount > 0 ? Math.round(product.price / (1 - discount / 100)) : null;
  const imageGallery = product.images && product.images.length > 0 ? product.images : [product.thumbnail];

  const handleAddToCart = () => {
    setAddingToCart(true);
    addToCart(product, quantity);
    setTimeout(() => {
      setAddingToCart(false);
    }, 600);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="container product-details-wrapper">
      {/* Breadcrumb Navigation */}
      <nav className="details-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/shop">Shop</Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category}`}>{product.category}</Link>
        <span>/</span>
        <span className="breadcrumb-current">{product.title}</span>
      </nav>

      {/* Main Two-Column Layout */}
      <div className="details-grid">
        {/* Left Column: Image Gallery and Thumbnails */}
        <div className="details-gallery-col">
          <div className="main-image-frame">
            <img
              src={activeImage || product.thumbnail}
              alt={product.title}
              className="main-preview-img"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
            />
            {discount > 0 && (
              <span className="details-badge-discount">{discount}% OFF</span>
            )}
          </div>

          {/* Thumbnails */}
          {imageGallery.length > 1 && (
            <div className="thumbnails-row">
              {imageGallery.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  className={`thumb-btn ${activeImage === img ? 'active' : ''}`}
                  aria-label={`Thumbnail image ${idx + 1}`}
                >
                  <img src={img} alt={`${product.title} view ${idx + 1}`} referrerPolicy="no-referrer" crossOrigin="anonymous" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Information & Purchase Controls */}
        <div className="details-info-col">
          <span className="details-category-tag">{product.category}</span>
          <h1 className="details-title">{product.title}</h1>

          {/* Rating & Stock Status */}
          <div className="details-meta-row">
            <div className="stars-rating-badge">
              <Star size={15} fill="#F59E0B" color="#F59E0B" />
              <span>{Number(product.rating || 4.5).toFixed(1)}</span>
            </div>
            <span className="meta-sep">•</span>
            <span className="reviews-count-label">
              {product.reviews && product.reviews.length > 0
                ? `${product.reviews.length} Customer Reviews`
                : 'Verified Customer Ratings'}
            </span>
            <span className="meta-sep">•</span>
            <span className="stock-in-label">
              <PackageCheck size={15} /> In Stock ({product.stock} left)
            </span>
          </div>

          {/* Pricing Row: Current price in ₹, Original price, Discount */}
          <div className="details-price-container">
            <span className="current-price-display">{formatPrice(product.price)}</span>
            {originalPrice && (
              <span className="original-price-display">
                {formatPrice(originalPrice)}
              </span>
            )}
            {discount > 0 && (
              <span className="save-amount-badge">Save {discount}%</span>
            )}
          </div>

          {/* Short Description */}
          <p className="details-description-text">{product.description}</p>

          {/* Quantity Selector & Action Buttons */}
          <div className="details-buy-section">
            <div className="quantity-select-row">
              <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text)' }}>
                Quantity:
              </span>
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                min={1}
                max={product.stock || 20}
              />
            </div>

            {/* Prominent Purchase Buttons */}
            <div className="action-buttons-group">
              {/* Add to Cart button */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={addingToCart}
                className="btn btn-secondary btn-lg"
                style={{ flex: 1, gap: '8px' }}
              >
                {addingToCart ? (
                  <>
                    <Check size={18} />
                    <span>Adding to Cart...</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              {/* Buy Now button */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="btn btn-primary btn-lg"
                style={{ flex: 1, gap: '8px' }}
              >
                <Zap size={18} />
                <span>Buy Now</span>
              </button>

              {/* Wishlist Icon Button */}
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`btn-icon ${isFavorited ? 'wishlist-active' : ''}`}
                style={{ width: '50px', height: '50px', flexShrink: 0 }}
                title={isFavorited ? "Remove from Wishlist" : "Save to Wishlist"}
                aria-label="Wishlist toggle"
              >
                <Heart
                  size={22}
                  fill={isFavorited ? '#EF4444' : 'none'}
                  color={isFavorited ? '#EF4444' : 'var(--color-text)'}
                />
              </button>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="details-guarantees-row">
            <div className="guarantee-chip">
              <Truck size={16} />
              <span>Free Delivery over ₹999</span>
            </div>
            <div className="guarantee-chip">
              <RefreshCw size={16} />
              <span>7-Day Replacement</span>
            </div>
            <div className="guarantee-chip">
              <ShieldCheck size={16} />
              <span>100% Genuine</span>
            </div>
          </div>

          {/* Product Specifications Table */}
          <div className="specifications-box">
            <h3 className="specs-title">Product Specifications</h3>
            <div className="specs-table">
              {Object.entries(product.specs || {}).map(([key, value]) => (
                <div key={key} className="specs-row">
                  <span className="specs-key">{key}</span>
                  <span className="specs-value">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="reviews-section">
        <h2 className="section-title" style={{ marginBottom: '20px' }}>
          Customer Reviews ({product.reviews?.length || 0})
        </h2>

        {product.reviews && product.reviews.length > 0 ? (
          <div className="reviews-grid">
            {product.reviews.map((rev, idx) => (
              <div key={idx} className="review-card">
                <div className="review-header">
                  <div className="review-user-info">
                    <strong className="reviewer-name">{rev.reviewerName}</strong>
                    <span className="verified-badge">
                      <CheckCircle2 size={13} /> Verified Buyer
                    </span>
                  </div>
                  <div className="review-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < Math.floor(rev.rating) ? '#F59E0B' : 'none'}
                        color={i < Math.floor(rev.rating) ? '#F59E0B' : 'var(--color-border)'}
                      />
                    ))}
                  </div>
                </div>
                <p className="review-comment">"{rev.comment}"</p>
                <span className="review-date">{rev.date}</span>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
            No customer reviews yet. Be the first to leave a review after your purchase!
          </p>
        )}
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="related-section" style={{ marginTop: '60px' }}>
          <h2 className="section-title" style={{ marginBottom: '24px' }}>
            Related Products
          </h2>
          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </div>
  );
}
