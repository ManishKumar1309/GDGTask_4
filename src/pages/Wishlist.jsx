import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils/formatters';
import EmptyState from '../components/EmptyState';
import {
  Heart,
  ShoppingBag,
  Trash2,
  Star,
  Eye,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, moveToCart } = useWishlist();

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="container" style={{ padding: '60px 20px' }}>
        <EmptyState
          icon={Heart}
          title="Your Wishlist is Empty"
          description="Save items you love by tapping the heart icon on any product card while browsing."
          actionText="Explore Collections"
          actionLink="/products"
        />
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '36px', paddingBottom: '80px' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Heart size={20} color="#dc2626" fill="#dc2626" />
          <span className="badge badge-accent">Saved Items</span>
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
          My Wishlist
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          You have {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved in your private collection.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '24px',
        }}
      >
        {wishlist.map((item) => (
          <div
            key={item.id}
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-sm)',
              transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
            }}
          >
            {/* Image & Remove overlay */}
            <div style={{ position: 'relative', width: '100%', paddingTop: '100%', backgroundColor: '#fafbfc' }}>
              <Link to={`/products/${item.id}`}>
                <img
                  src={item.thumbnail || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300'}
                  alt={item.title}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    padding: '16px',
                  }}
                />
              </Link>

              <button
                type="button"
                onClick={() => removeFromWishlist(item.id)}
                className="btn-icon"
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  width: '34px',
                  height: '34px',
                  color: 'var(--color-danger)',
                }}
                title="Remove from Wishlist"
                aria-label="Remove from Wishlist"
              >
                <Trash2 size={16} />
              </button>
            </div>

            {/* Content */}
            <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  {item.category}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  <Star size={12} fill="#d97706" color="#d97706" />
                  <span>{Number(item.rating || 4.5).toFixed(1)}</span>
                </div>
              </div>

              <Link to={`/products/${item.id}`}>
                <h3
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    lineHeight: 1.4,
                    marginBottom: '12px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    height: '2.8em',
                  }}
                >
                  {item.title}
                </h3>
              </Link>

              <div style={{ marginTop: 'auto', marginBottom: '16px', fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {formatPrice(item.price)}
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => moveToCart(item)}
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '10px 14px', fontSize: '0.875rem' }}
                >
                  <ShoppingBag size={16} />
                  <span>Move to Bag</span>
                </button>

                <Link
                  to={`/products/${item.id}`}
                  className="btn btn-secondary"
                  style={{ padding: '10px 12px' }}
                  title="View Details"
                  aria-label="View Details"
                >
                  <Eye size={16} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
