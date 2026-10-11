import React from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import OrderCard from '../components/OrderCard';
import { Package, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function Orders() {
  const { orders } = useOrders();

  if (!orders || orders.length === 0) {
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
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}
          >
            <Package size={36} />
          </div>

          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '8px' }}>
            No Orders Yet
          </h2>

          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginBottom: '28px', lineHeight: 1.5 }}>
            You haven't placed any orders yet. Once you complete checkout, your order receipts will be stored here.
          </p>

          <Link to="/shop" className="btn btn-primary btn-lg" style={{ width: '100%', gap: '8px' }}>
            <ShoppingBag size={18} />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '32px', paddingBottom: '80px', maxWidth: '860px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '6px' }}>
          My Orders
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
          View and track all your past simulated purchases.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>

      <div style={{ marginTop: '36px' }}>
        <Link to="/shop" className="btn btn-secondary btn-md" style={{ gap: '8px' }}>
          <ArrowLeft size={16} />
          <span>Continue Shopping</span>
        </Link>
      </div>
    </div>
  );
}
