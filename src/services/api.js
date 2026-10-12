/**
 * API Service for Shopora products.
 * Provides resilient access to the product catalog, category filters, and product details.
 */
import { FALLBACK_PRODUCTS, CATEGORIES_LIST } from './mockProducts.js';

export function normalizeProduct(p) {
  if (!p) return null;
  return {
    id: p.id,
    title: p.title || 'Untitled Product',
    description: p.description || 'No description available.',
    category: p.category || 'general',
    price: typeof p.price === 'number' ? p.price : parseFloat(p.price) || 0,
    discountPercentage: p.discountPercentage || 0,
    rating: typeof p.rating === 'number' ? p.rating : 4.5,
    stock: typeof p.stock === 'number' ? p.stock : 20,
    brand: p.brand || 'Shopora',
    thumbnail: p.thumbnail || (p.images && p.images[0]) || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><rect width="600" height="600" fill="%23F8FAFC"/><path d="M240 280l60-60 60 60M200 380h200M230 340l40-40 50 50 40-40 40 40" stroke="%23CBD5E1" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><circle cx="250" cy="210" r="24" fill="%23CBD5E1"/></svg>',
    images: Array.isArray(p.images) && p.images.length > 0 ? p.images : [p.thumbnail || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><rect width="600" height="600" fill="%23F8FAFC"/><path d="M240 280l60-60 60 60M200 380h200M230 340l40-40 50 50 40-40 40 40" stroke="%23CBD5E1" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><circle cx="250" cy="210" r="24" fill="%23CBD5E1"/></svg>'],
    reviews: Array.isArray(p.reviews) ? p.reviews : [],
    specs: p.specs || {
      "Brand": p.brand || "Shopora",
      "Warranty": "1 Year Manufacturer Warranty",
      "Shipping": "Free delivery on orders over ₹999",
      "Return Policy": "7-Day Easy Return"
    },
    returnPolicy: p.returnPolicy || '7-day easy return policy',
    shippingInformation: p.shippingInformation || 'Standard Delivery (2-4 business days)',
    warrantyInformation: p.warrantyInformation || '1-year standard warranty',
  };
}

/**
 * Fetch products list with optional category, search, limit, and skip
 */
export async function getProducts({ category = '', search = '', limit = 100, skip = 0 } = {}) {
  // Simulate standard network latency for realistic UX with skeletons
  await new Promise((resolve) => setTimeout(resolve, 80));

  let list = [...FALLBACK_PRODUCTS].map(normalizeProduct);

  if (category && category !== 'all') {
    list = list.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    list = list.filter((p) =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q)
    );
  }

  return {
    products: list.slice(skip, skip + limit),
    total: list.length,
    skip,
    limit,
    isFallback: true,
  };
}

/**
 * Fetch single product by ID
 */
export async function getProductById(id) {
  if (!id) {
    throw new Error('Product ID is required');
  }

  await new Promise((resolve) => setTimeout(resolve, 50));

  const found = FALLBACK_PRODUCTS.find((p) => String(p.id) === String(id));
  if (found) {
    return normalizeProduct(found);
  }

  const notFoundErr = new Error(`Product with ID "${id}" was not found.`);
  notFoundErr.status = 404;
  throw notFoundErr;
}

/**
 * Fetch categories
 */
export async function getCategories() {
  await new Promise((resolve) => setTimeout(resolve, 30));
  return CATEGORIES_LIST.map((cat) => {
    const productCount = FALLBACK_PRODUCTS.filter((p) => p.category.toLowerCase() === cat.slug.toLowerCase()).length;
    return {
      ...cat,
      count: `${productCount} Products`,
    };
  });
}
