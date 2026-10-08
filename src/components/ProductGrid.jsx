import React from 'react';
import ProductCard from './ProductCard';
import EmptyState from './EmptyState';
import { PackageOpen } from 'lucide-react';

export default function ProductGrid({
  products = [],
  emptyTitle = 'No products found',
  emptyDescription = 'Try adjusting your search keywords or filter options.',
  onClearFilters = null
}) {
  if (!products || products.length === 0) {
    return (
      <EmptyState
        icon={PackageOpen}
        title={emptyTitle}
        description={emptyDescription}
        actionText={onClearFilters ? 'Reset Filters' : 'Browse All Products'}
        actionLink={onClearFilters ? null : '/products'}
        onAction={onClearFilters}
      />
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '24px',
        width: '100%',
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
