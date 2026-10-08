/**
 * API Service for Aura Store products.
 * Uses DummyJSON with graceful fallback to cached/mock catalog on network failure.
 */
import { FALLBACK_PRODUCTS } from './mockProducts';

const BASE_URL = 'https://dummyjson.com';
const TIMEOUT_MS = 10000;

/**
 * Fetch wrapper with timeout
 */
async function fetchWithTimeout(resource, options = {}) {
  const { timeout = TIMEOUT_MS } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

/**
 * Normalizes a product object to ensure all required fields are present and valid
 */
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
    brand: p.brand || 'Aura Signature',
    thumbnail: p.thumbnail || (p.images && p.images[0]) || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    images: Array.isArray(p.images) && p.images.length > 0 ? p.images : [p.thumbnail || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80'],
    reviews: Array.isArray(p.reviews) ? p.reviews : [],
    tags: Array.isArray(p.tags) ? p.tags : [],
    returnPolicy: p.returnPolicy || '30-day money-back return policy',
    shippingInformation: p.shippingInformation || 'Standard Free Shipping (2-4 business days)',
    warrantyInformation: p.warrantyInformation || '1-year standard warranty',
  };
}

/**
 * Fetch products list with optional category, search, limit, and skip
 */
export async function getProducts({ category = '', search = '', limit = 100, skip = 0 } = {}) {
  try {
    let url = `${BASE_URL}/products?limit=${limit}&skip=${skip}`;

    if (search && search.trim()) {
      url = `${BASE_URL}/products/search?q=${encodeURIComponent(search.trim())}&limit=${limit}&skip=${skip}`;
    } else if (category && category !== 'all') {
      url = `${BASE_URL}/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;
    }

    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      throw new Error(`API responded with HTTP status ${response.status}`);
    }

    const data = await response.json();
    return {
      products: (data.products || []).map(normalizeProduct),
      total: data.total || 0,
      skip: data.skip || 0,
      limit: data.limit || 0,
      isFallback: false,
    };
  } catch (error) {
    console.warn('[API] Failed to fetch products from live API, using fallback data:', error.message);
    
    // Filter fallback data to match requested criteria
    let list = [...FALLBACK_PRODUCTS].map(normalizeProduct);

    if (category && category !== 'all') {
      list = list.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((p) => 
        p.title.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    return {
      products: list.slice(skip, skip + limit),
      total: list.length,
      skip,
      limit,
      isFallback: true,
      errorNotice: error.message,
    };
  }
}

/**
 * Fetch single product by ID
 */
export async function getProductById(id) {
  if (!id) {
    throw new Error('Product ID is required');
  }

  try {
    const response = await fetchWithTimeout(`${BASE_URL}/products/${id}`);
    
    if (response.status === 404) {
      const notFoundErr = new Error(`Product with ID "${id}" was not found.`);
      notFoundErr.status = 404;
      throw notFoundErr;
    }

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    return normalizeProduct(data);
  } catch (error) {
    if (error.status === 404) {
      throw error;
    }

    console.warn(`[API] Failed to fetch product ${id} from live API, searching fallback:`, error.message);
    const fallbackItem = FALLBACK_PRODUCTS.find((p) => String(p.id) === String(id));
    if (fallbackItem) {
      return normalizeProduct(fallbackItem);
    }

    throw new Error(error.message || 'Unable to retrieve product details.');
  }
}

/**
 * Fetch product categories
 */
export async function getCategories() {
  try {
    const response = await fetchWithTimeout(`${BASE_URL}/products/categories`);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const data = await response.json();
    // DummyJSON returns array of objects { slug, name, url } or strings
    return data.map((item) => {
      if (typeof item === 'string') {
        return { slug: item, name: item.charAt(0).toUpperCase() + item.slice(1).replace('-', ' ') };
      }
      return { slug: item.slug, name: item.name };
    });
  } catch (error) {
    console.warn('[API] Failed to fetch categories, falling back to local categories:', error.message);
    return [
      { slug: 'beauty', name: 'Beauty' },
      { slug: 'fragrances', name: 'Fragrances' },
      { slug: 'furniture', name: 'Furniture' },
      { slug: 'groceries', name: 'Groceries' },
      { slug: 'home-decoration', name: 'Home Decoration' },
      { slug: 'kitchen-accessories', name: 'Kitchen Accessories' },
      { slug: 'mens-shirts', name: "Men's Shirts" },
      { slug: 'mens-shoes', name: "Men's Shoes" },
      { slug: 'mens-watches', name: "Men's Watches" },
      { slug: 'womens-bags', name: "Women's Bags" },
      { slug: 'womens-dresses', name: "Women's Dresses" },
      { slug: 'womens-jewellery', name: "Women's Jewellery" },
      { slug: 'sunglasses', name: 'Sunglasses' },
      { slug: 'smartphones', name: 'Smartphones' },
      { slug: 'laptops', name: 'Laptops' },
    ];
  }
}
