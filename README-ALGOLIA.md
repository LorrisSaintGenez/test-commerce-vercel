# Algolia Search Integration

This commerce template has been updated to use Algolia for search functionality. Here's how to set it up:

## Required Environment Variables

Copy `.env.example` to `.env.local` and fill in your Algolia credentials:

```bash
NEXT_PUBLIC_ALGOLIA_APPLICATION_ID=your_algolia_app_id
NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY=your_algolia_search_api_key
```

## Algolia Index Configuration

### Main Index: `shopify_products`

This is your primary index containing all products.

### Sort Indices (Optional but Recommended)

Create these replica indices for sorting functionality:

1. `shopify_products_price_asc` - Sort by price ascending
2. `shopify_products_price_desc` - Sort by price descending
3. `shopify_products_created_at_desc` - Sort by creation date descending

### Required Record Structure

Your Algolia records should match this structure (based on the provided example):

```json
{
  "price": 629.95,
  "compare_at_price": 0,
  "price_ratio": 1,
  "price_range": "600:700",
  "variants_min_price": 629.95,
  "variants_max_price": 629.95,
  "id": 15040586416514,
  "product_type": "snowboard",
  "vendor": "Multi-managed Vendor",
  "title": "The Multi-managed Snowboard",
  "handle": "the-multi-managed-snowboard",
  "product_image": "https://example.com/image.jpg",
  "tags": ["Premium", "Snow", "Snowboard", "Sport", "Winter"],
  "inventory_available": true,
  "objectID": "55457693794690"
}
```

### Key Attributes for Search & Filtering

- `title` - Product name (searchable)
- `product_type` - Used for category/collection filtering
- `tags` - Additional filtering options
- `price`, `variants_min_price`, `variants_max_price` - Price fields for sorting
- `handle` - URL slug for product pages
- `product_image` or `image` - Product image URL
- `inventory_available` - Stock status

## Features Implemented

- ✅ Search box with real-time search
- ✅ Search results with product grid
- ✅ Category/collection filtering (via `product_type`)
- ✅ Sort by price, date, relevance, trending
- ✅ Search result stats and query display
- ✅ Mobile-responsive search interface

## Component Structure

- `components/algolia/search-box.tsx` - Search input component
- `components/algolia/hits.tsx` - Search results display
- `components/algolia/refinement-list.tsx` - Category filtering
- `components/algolia/sort-by.tsx` - Sort options
- `components/algolia/stats.tsx` - Result count and query display
- `components/search-provider.tsx` - Algolia InstantSearch wrapper

## Customization

### Adding More Filters

To add more refinement options, create new `AlgoliaRefinementList` components:

```tsx
<AlgoliaRefinementList attribute="vendor" title="Brands" />
<AlgoliaRefinementList attribute="tags" title="Tags" />
```

### Custom Hit Component

Modify `components/algolia/hits.tsx` to customize how search results are displayed.

### Index Configuration

Update the sort indices in `app/search/layout.tsx` to match your Algolia dashboard configuration.
