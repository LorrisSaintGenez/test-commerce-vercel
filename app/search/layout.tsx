import AlgoliaRefinementList from "components/algolia/refinement-list";
import AlgoliaSortBy from "components/algolia/sort-by";
import { Suspense } from "react";

// Define the sort indices based on your Algolia setup
export const sortItems = [
  { label: "Relevance", value: "shopify_products" },
  { label: "Price: Low to high", value: "shopify_products_price_asc" },
  { label: "Price: High to low", value: "shopify_products_price_desc" },
  { label: "Latest arrivals", value: "shopify_products_created_at_desc" },
  { label: "Trending", value: "shopify_products_trending_desc" },
];

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-auto flex max-w-(--breakpoint-2xl) flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
        <div className="order-first w-full flex-none md:max-w-[125px] md:space-y-4">
          <AlgoliaRefinementList attribute="product_type" title="Collections" />
          <AlgoliaRefinementList attribute="tags" title="Tags" />
          <AlgoliaRefinementList attribute="options.color" title="Colors" />
        </div>
        <div className="order-last min-h-screen w-full md:order-none">
          <Suspense fallback={null}>{children}</Suspense>
        </div>
        <div className="order-none flex-none md:order-last md:w-[125px]">
          <AlgoliaSortBy items={sortItems} title="Sort by" />
        </div>
      </div>
    </>
  );
}
