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
  Mail,
  ArrowRight,
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
        <div style={{ maxWidth: '440px', margin: '0 auto', background: 'var(--bg-card)', padding: '40px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <User size={48} color="var(--color-text-secondary)" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px', color: 'var(--color-text)' }}>
            Sign In to View Profile
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px', fontSize: '0.95rem' }}>
            Please sign in to access your orders, saved items, and account settings.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link to="/login" className="btn btn-primary btn-lg" style={{ flex: 1 }}>
              Sign In
            </Link>
            <Link to="/signup" className="btn btn-secondary btn-lg" style={{ flex: 1 }}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container" style={{ paddingTop: '36px', paddingBottom: '80px', maxWidth: '820px' }}>
      {/* Profile Header */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '32px',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '28px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <img
            src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
            alt={user.name}
            style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-primary)' }}
          />
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '4px' }}>
              {user.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
              <Mail size={14} />
              <span>{user.email}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="btn btn-secondary btn-sm"
          style={{ color: 'var(--color-danger)' }}
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>

      {/* Account Highlights Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px', marginBottom: '32px' }}>
        <Link
          to="/orders"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '24px 20px',
            textAlign: 'center',
            textDecoration: 'none',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255, 153, 0, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
            <Package size={20} />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '4px' }}>
            {orders.length}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
            Total Orders
          </div>
        </Link>

        <Link
          to="/wishlist"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '24px 20px',
            textAlign: 'center',
            textDecoration: 'none',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#FEF2F2', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
            <Heart size={20} />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '4px' }}>
            {totalWishlist}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
            Wishlist Items
          </div>
        </Link>

        <Link
          to="/cart"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '24px 20px',
            textAlign: 'center',
            textDecoration: 'none',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
            <ShoppingBag size={20} />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '4px' }}>
            {totalItems}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
            Cart Items
          </div>
        </Link>
      </div>

      {/* Quick Navigation Links */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '16px', color: 'var(--color-text)' }}>
          Quick Actions
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link to="/orders" className="btn btn-secondary" style={{ justifyContent: 'space-between', padding: '14px 18px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Package size={18} /> View All Past Orders
            </span>
            <ArrowRight size={16} />
          </Link>
          <Link to="/wishlist" className="btn btn-secondary" style={{ justifyContent: 'space-between', padding: '14px 18px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Heart size={18} /> My Saved Wishlist
            </span>
            <ArrowRight size={16} />
          </Link>
          <Link to="/shop" className="btn btn-primary" style={{ justifyContent: 'space-between', padding: '14px 18px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShoppingBag size={18} /> Browse Products
            </span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
