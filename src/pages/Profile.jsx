import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import {
  User,
  LogOut,
  Package,
  Heart,
  ShoppingBag,
  Calendar,
  Mail,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { orders } = useOrders();
  const { totalWishlist } = useWishlist();
  const { totalItems } = useCart();

  if (!isAuthenticated || !user) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '440px', margin: '0 auto', background: 'var(--bg-surface)', padding: '40px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)' }}>
          <User size={48} color="var(--text-muted)" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>Sign in to View Profile</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.95rem' }}>
            Please sign in to access your personal dashboard, saved addresses, and order history.
          </p>
          <Link to="/login" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
            Sign In Now
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container" style={{ paddingTop: '36px', paddingBottom: '80px', maxWidth: '880px' }}>
      {/* Profile Header */}
      <div
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          padding: '36px',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          marginBottom: '32px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <img
            src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
            alt={user.name}
            style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--bg-subtle)' }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {user.name}
              </h1>
              <span className="badge badge-accent">
                <Sparkles size={12} /> Member
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <Mail size={14} />
              <span>{user.email}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="btn btn-secondary"
          style={{ color: 'var(--color-danger)', borderColor: 'var(--color-danger-border)' }}
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>

      {/* Account Highlights Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
        <Link
          to="/orders"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', background: 'var(--color-accent-light)', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Package size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{orders.length}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Completed Orders</div>
          </div>
        </Link>

        <Link
          to="/wishlist"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Heart size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{totalWishlist}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Saved in Wishlist</div>
          </div>
        </Link>

        <Link
          to="/cart"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-subtle)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingBag size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{totalItems}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Items in Bag</div>
          </div>
        </Link>
      </div>

      {/* Account Details Box */}
      <div
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '32px',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '20px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
          Account Security & Details
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '0.925rem' }}>
          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block' }}>Account ID:</span>
            <code style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}>{user.id || 'AUR-USER-DEMO'}</code>
          </div>

          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block' }}>Registered Email:</span>
            <span style={{ fontWeight: 600 }}>{user.email}</span>
          </div>

          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block' }}>Member Status:</span>
            <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>Active • Verified Buyer</span>
          </div>

          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block' }}>Persistence Mode:</span>
            <span>LocalStorage Synced (Browser Session)</span>
          </div>
        </div>

        <div style={{ marginTop: '32px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <Link to="/orders" className="btn btn-primary">
            <Package size={16} /> View Order History
          </Link>
          <Link to="/products" className="btn btn-secondary">
            <ShoppingBag size={16} /> Browse Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
