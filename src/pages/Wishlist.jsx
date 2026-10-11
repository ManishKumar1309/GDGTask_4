import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils/formatters';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, moveToCart } = useWishlist();

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div
          style={{
            maxWidth: '460px',
            margin: '0 auto',
            background: 'var(--bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '48px 32px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: '#FEF2F2',
              color: '#EF4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}
          >
            <Heart size={36} />
          </div>

          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '8px' }}>
            Your Wishlist is Empty
          </h2>

          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginBottom: '28px', lineHeight: 1.5 }}>
            Save products you like by clicking the heart icon on any card while browsing.
          </p>

          <Link to="/shop" className="btn btn-primary btn-lg" style={{ width: '100%', gap: '8px' }}>
            <span>Explore Products</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '32px', paddingBottom: '80px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '6px' }}>
          My Wishlist
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
          You have {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved in your wishlist.
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
              background: 'var(--bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-xs)',
              transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
            }}
          >
            {/* Image & Remove button */}
            <div style={{ position: 'relative', width: '100%', paddingTop: '90%', backgroundColor: 'var(--bg-secondary)' }}>
              <Link to={`/shop/${item.id}`}>
                <img
                  src={item.thumbnail}
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
                  backgroundColor: 'var(--bg-card)',
                  width: '34px',
                  height: '34px',
                  color: 'var(--color-danger)',
                }}
                title="Remove from wishlist"
                aria-label="Remove item"
              >
                <Trash2 size={16} />
              </button>
            </div>

            {/* Content */}
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <span style={{ fontSize: '0.725rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
                {item.category}
              </span>

              <Link to={`/shop/${item.id}`}>
                <h3
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: 'var(--color-text)',
                    lineHeight: 1.35,
                    marginBottom: '8px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    height: '2.7em',
                  }}
                >
                  {item.title}
                </h3>
              </Link>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px', marginTop: 'auto' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-text)' }}>
                  {formatPrice(item.price)}
                </span>
              </div>

              {/* Action buttons: Move to Cart or View Details */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => moveToCart(item)}
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1, gap: '6px' }}
                >
                  <ShoppingBag size={15} />
                  <span>Move to Cart</span>
                </button>
                <Link
                  to={`/shop/${item.id}`}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '8px 12px' }}
                  title="View Details"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
