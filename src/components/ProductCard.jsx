import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils/formatters';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);
  const discount = Math.round(product.discountPercentage || 0);
  const originalPrice = discount > 0 ? Math.round(product.price / (1 - discount / 100)) : null;

  const fallbackImage = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><rect width="600" height="600" fill="%23F8FAFC"/><path d="M240 280l60-60 60 60M200 380h200M230 340l40-40 50 50 40-40 40 40" stroke="%23CBD5E1" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><circle cx="250" cy="210" r="24" fill="%23CBD5E1"/></svg>';

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 900);
  };

  return (
    <article className="product-card">
      {/* Product Image Area */}
      <div className="product-card-media">
        {discount > 0 && (
          <span className="product-card-discount-tag">
            {discount}% OFF
          </span>
        )}

        <button
          type="button"
          onClick={handleWishlistClick}
          className={`product-card-wishlist-btn ${isFavorited ? 'active' : ''}`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={18}
            fill={isFavorited ? '#EF4444' : 'none'}
            color={isFavorited ? '#EF4444' : 'var(--color-text)'}
          />
        </button>

        <Link to={`/shop/${product.id}`} className="product-card-img-link" tabIndex={-1}>
          <img
            src={product.thumbnail || fallbackImage}
            alt={product.title}
            className={`product-card-image ${imageLoaded ? 'loaded' : ''}`}
            loading="lazy"
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              if (e.currentTarget.src !== fallbackImage) {
                e.currentTarget.src = fallbackImage;
              }
              setImageLoaded(true);
            }}
          />
        </Link>
      </div>

      {/* Product Details Area */}
      <div className="product-card-body">
        {/* Category & Star Rating */}
        <div className="product-card-meta">
          <span className="product-card-category">{product.category}</span>
          <div className="product-card-rating">
            <Star size={13} fill="#F59E0B" color="#F59E0B" />
            <span>{Number(product.rating || 4.5).toFixed(1)}</span>
          </div>
        </div>

        {/* Product Name */}
        <Link to={`/shop/${product.id}`}>
          <h3 className="product-card-title" title={product.title}>
            {product.title}
          </h3>
        </Link>

        {/* Pricing: Current price in ₹, Original price */}
        <div className="product-card-price-row">
          <span className="product-card-price">{formatPrice(product.price)}</span>
          {originalPrice && (
            <span className="product-card-original-price">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>

        {/* Add to Cart button */}
        <button
          type="button"
          onClick={handleAddToCart}
          className={`product-card-add-btn ${addedAnimation ? 'added' : ''}`}
        >
          {addedAnimation ? (
            <>
              <Check size={16} />
              <span>Added to Cart</span>
            </>
          ) : (
            <>
              <ShoppingBag size={16} />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}
