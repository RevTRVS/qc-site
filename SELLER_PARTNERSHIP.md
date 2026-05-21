# Seller Partnership System - NexaFinds

## Overview

This document outlines how the NexaFinds seller partnership system works and how to manage sellers in the store.

## How It Works

### 1. Adding a Seller Partner

When you establish a partnership with a seller (from Taobao, Weidian, or other marketplaces), follow these steps:

#### Step 1: Get Seller Information
- Seller name
- Seller icon/logo
- Rating (e.g., 4.5 stars)
- Follower count
- Minimum price (starting price for products)
- Seller profile image
- Number of products available

#### Step 2: Update the Sellers Database

Edit `/app/sellers/page.tsx` and add the seller to the `SELLERS` array:

```typescript
{
  id: 1,
  name: "Your Seller Name",
  icon: "🟠", // Emoji or seller initial
  rating: 4.5,
  followers: 500,
  minPrice: 5.99,
  minPriceFormatted: "€5.99",
  image: "👍", // Emoji representing seller type
  products: 250, // Number of products available
}
```

### 2. Linking Seller Products

For each seller partnership, you should:

1. **Create a seller profile link** - Point to their actual store
2. **Add products to the Products page** - Update `/app/products/page.tsx` with their products
3. **Update seller metadata** - Keep seller info in the database current

### 3. Product Addition

When adding products from a partner seller to the Products page:

```typescript
{
  id: "prod_1",
  name: "Product Name",
  price: 45,
  currency: "€",
  image: "https://...", // Product image URL
  category: "Bags",
  seller: "Seller Name", // Must match seller name
}
```

## Database Schema

### Sellers Structure
```typescript
interface Seller {
  id: number;
  name: string;              // Official seller name
  icon: string;              // Emoji or logo
  rating: number;            // Star rating (0-5)
  followers: number;         // Number of followers
  minPrice: number;          // Minimum price value
  minPriceFormatted: string; // Formatted price (e.g., "€5.99")
  image: string;             // Seller image/emoji
  products: number;          // Total products count
}
```

### Products Structure
```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  image?: string;
  category: string;
  seller: string;            // Must match seller name
}
```

## Integration Points

### 1. Sellers Page
- Location: `/app/sellers`
- Shows all active seller partnerships
- Search functionality to find sellers
- Category filters for seller browsing

### 2. Products Page
- Location: `/app/products`
- Displays products from all partnerships
- Filter by category
- Currency conversion (EUR, USD, GBP)
- Product search

### 3. Best Sellers Section
- Link in navbar points to `/sellers`
- Featured sellers highlighted on homepage

## Partnership Management Checklist

When onboarding a new seller partner:

- [ ] Collect seller information (name, rating, followers, etc.)
- [ ] Get seller logo/icon (emoji or image URL)
- [ ] Define product categories they offer
- [ ] Add seller to `SELLERS` array in `/app/sellers/page.tsx`
- [ ] Add initial product set to `/app/products/page.tsx`
- [ ] Create affiliate/referral link (if applicable)
- [ ] Test product links and seller page
- [ ] Update "Last Updated" timestamp for sellers

## API Integration (Future)

When moving to a production backend:

1. **Sellers API Endpoint**
   ```
   GET /api/sellers
   GET /api/sellers/:id
   POST /api/sellers (admin only)
   PUT /api/sellers/:id (admin only)
   ```

2. **Products API Endpoint**
   ```
   GET /api/products
   GET /api/products?seller=id
   GET /api/products?category=name
   POST /api/products (admin only)
   ```

## Affiliate/Partnership Links

When a user clicks on a seller or product:

1. Track the referral (optional - for analytics)
2. Redirect to seller's actual store
3. Include affiliate code if available (e.g., `?ref=nexafinds`)

## Security & Moderation

- Verify seller legitimacy before partnership
- Check seller ratings and reviews
- Ensure HTTPS for all seller links
- Regular quality checks on shared products
- Monitor for counterfeit or prohibited items

## Future Enhancements

- [ ] Automated seller sync from marketplace APIs
- [ ] Real-time inventory updates
- [ ] Product reviews from NexaFinds users
- [ ] Seller verification badges
- [ ] Partnership analytics dashboard
- [ ] Dynamic affiliate link generation
