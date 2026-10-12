# Shopora — Simple, Modern & User-Friendly E-Commerce Website

Shopora is a responsive e-commerce web application built using **React.js** and **Vite**. Inspired by modern, uncluttered storefronts, it delivers an intuitive shopping experience with Indian Rupee (₹) pricing, persistent LocalStorage state, a 60-30-10 color balance, and dark/light mode support.

---

## 🎨 Design Theme & Aesthetics

Shopora strictly follows the 60-30-10 design system:

| Role | Color | Hex Code |
| :--- | :--- | :--- |
| **Background** | Pure White | `#FFFFFF` |
| **Secondary Background** | Light Gray / Off-white | `#F8FAFC` |
| **Headings & Main Text** | Slate Dark | `#0F172A` |
| **Secondary Text** | Cool Slate | `#64748B` |
| **Primary Buttons & Highlights** | Vibrant Amber Orange | `#FF9900` |
| **Button Hover State** | Deep Orange | `#E68A00` |
| **Borders & Dividers** | Soft Slate | `#E2E8F0` |

- **Dark Mode Support**: Seamless toggle between Light and Dark themes, adhering to `#0F172A` dark slate surfaces while preserving the `#FF9900` primary accent.
- **Typography**: Clean, readable sans-serif typography (`Plus Jakarta Sans`).
- **Icons**: Lucide React.

---

## 🚀 Key Features

### 1. Navigation Bar
- **Shopora** brand logo with shopping bag emblem
- Desktop & mobile responsive hamburger menu
- Category navigation with dropdown
- Live search bar
- Theme switcher (Sun / Moon)
- Real-time Wishlist count badge
- Real-time Cart item count badge
- User account badge & Profile access

### 2. Homepage
- **Hero Section**: Two-column layout featuring *"Find Your Everyday Favorites"*, short description, orange *"Shop Now"* button, secondary *"Explore Categories"* button, and high-quality lifestyle imagery.
- **6 Core Categories**: Electronics, Fashion, Home & Living, Accessories, Beauty, Sports with direct category filtering.
- **Featured Products**: Responsive grid of 8 top-rated products showing image, title, star rating, current price in ₹, original price, discount percentage, wishlist toggle, and "Add to Cart" button.
- **Promotional Banner**: Up to 40% Off Everyday Essentials with *"Explore Deals"* button.
- **Recently Viewed**: Dynamically displays recently inspected products.
- **Footer**: Store information, customer support contacts, quick links, and copyright text.

### 3. Shop & Catalog Page (`/shop` and `/products`)
- Responsive product grid with pagination / "Load More"
- Search by product name and brand
- Category filter
- Price range filter in INR (₹)
- Minimum rating filter (4.5+, 4.0+, 3.5+, 3.0+)
- Sorting dropdown:
  - *Price: Low to High*
  - *Price: High to Low*
  - *Highest Rated*
  - *Newest First*
- "Clear Filters" button with empty state suggestions
- Mobile drawer filter panel

### 4. Product Details Page (`/shop/:id` and `/products/:id`)
- Image gallery with interactive thumbnail switcher
- Current price in ₹, original price, and savings badge
- Short description and stock availability
- Product specifications table (Brand, Material, Warranty, Shipping, Returns)
- Quantity selector
- **Add to Cart** and **Buy Now** buttons
- Verified customer reviews with star ratings and feedback
- Related products grid in the same category
- Automatically updates Recently Viewed history

### 5. Shopping Cart (`/cart`)
- Item listings with thumbnail, title, unit price, quantity adjustments, and item subtotals
- **Shipping Rules**:
  - **Free Shipping** for orders of ₹999 or above
  - **₹49 Shipping** for orders below ₹999
- Dynamic progress bar showing amount remaining for free shipping
- Clear cart option
- "Continue Shopping" and "Proceed to Checkout" actions
- Clean empty-cart illustration with "Start Shopping" button

### 6. Wishlist (`/wishlist`)
- Add/remove items with the heart icon
- Move products directly from Wishlist to Cart
- Instant count indicator in the navbar

### 7. Checkout & Order Confirmation (`/checkout` & `/order-confirmation/:id`)
- Customer fields: Full Name, Email, Mobile Number (10-digit validation), House & Street Address, City, State, PIN Code (6-digit validation)
- Inline form validation
- Order summary with item breakdown, shipping fee, and final payable amount in ₹
- Payment methods:
  - *Cash on Delivery (COD)*
  - *Demo Online Payment (UPI / Card / NetBanking)*
- Generates unique order ID (`SHO-XXXX`)
- Clears cart items upon completion
- Navigates to the Order Confirmation page displaying the order ID, destination, products, and final amount

### 8. Authentication & Orders (`/login`, `/signup`, `/profile`, `/orders`)
- Demo login and signup without storing plaintext passwords
- Order history with receipts and printable invoice view
- Guest users can browse and checkout without mandatory account creation

---

## 🛠️ Tech Stack

- **Framework**: React.js 19 with Vite
- **Routing**: React Router DOM v7
- **State Management**: React Context API (`CartContext`, `WishlistContext`, `OrderContext`, `AuthContext`, `ThemeContext`, `NotificationContext`)
- **Persistence**: Safe LocalStorage wrapper
- **Styling**: Vanilla CSS with CSS Variables
- **Icons**: Lucide React
- **Currency**: `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })`

---

## 💻 Running Locally

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Build production bundle
npm run build
```
