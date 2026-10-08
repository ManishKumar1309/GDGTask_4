import React from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import OrderCard from '../components/OrderCard';
import EmptyState from '../components/EmptyState';
import { Package, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function Orders() {
  const { orders } = useOrders();

  if (!orders || orders.length === 0) {
    return (
      <div className="container" style={{ padding: '60px 20px' }}>
        <EmptyState
          icon={Package}
          title="No Orders Found"
          description="You haven't placed any orders yet. Once you complete checkout, your order history will appear here."
          actionText="Start Shopping"
          actionLink="/products"
        />
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '36px', paddingBottom: '80px' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Package size={20} color="var(--color-accent)" />
          <span className="badge badge-accent">Order History</span>
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
          My Orders
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Review and track all your previously completed orders and purchases.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>

      <div style={{ marginTop: '36px' }}>
        <Link to="/products" className="btn btn-secondary">
          <ArrowLeft size={16} /> Continue Shopping
        </Link>
      </div>
    </div>
  );
}
