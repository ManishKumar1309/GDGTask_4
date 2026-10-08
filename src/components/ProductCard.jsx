import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils/formatters';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);
  const discount = Math.round(product.discountPercentage || 0);
  const originalPrice = discount > 0 ? (product.price / (1 - discount / 100)) : null;

  const fallbackImage = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80';

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <article className="product-card">
      <div className="product-card-media">
        <div className="product-card-badges">
          {discount > 5 && (
            <span className="badge badge-sale">-{discount}%</span>
          )}
          {product.stock < 10 && product.stock > 0 && (
            <span className="badge badge-accent">Low Stock</span>
          )}
        </div>

        <button
          type="button"
          onClick={handleWishlistClick}
          className={`product-card-wishlist ${isFavorited ? 'active' : ''}`}
          aria-label={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart
            size={18}
            fill={isFavorited ? '#dc2626' : 'none'}
            strokeWidth={2}
          />
        </button>

        <Link to={`/products/${product.id}`} tabIndex={-1}>
          <img
            src={imageError ? fallbackImage : (product.thumbnail || fallbackImage)}
            alt={product.title}
            className="product-card-image"
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            style={{ opacity: imageLoaded ? 1 : 0.6 }}
          />
        </Link>
      </div>

      <div className="product-card-content">
        <div className="product-card-meta">
          <span className="product-card-category">{product.category}</span>
          <div className="product-card-rating">
            <Star size={13} fill="#d97706" color="#d97706" />
            <span>{Number(product.rating || 4.5).toFixed(1)}</span>
          </div>
        </div>

        <Link to={`/products/${product.id}`}>
          <h3 className="product-card-title" title={product.title}>
            {product.title}
          </h3>
        </Link>

        <div className="product-card-pricing">
          <span className="product-card-price">{formatPrice(product.price)}</span>
          {originalPrice && (
            <span className="product-card-original-price">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>

        <div className="product-card-actions">
          <button
            type="button"
            onClick={handleAddToCart}
            className="product-card-btn-cart"
            title="Add to Cart"
          >
            <ShoppingBag size={16} />
            <span>Add to Bag</span>
          </button>

          <Link
            to={`/products/${product.id}`}
            className="product-card-btn-details"
            aria-label="View product details"
            title="View Details"
          >
            <Eye size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
