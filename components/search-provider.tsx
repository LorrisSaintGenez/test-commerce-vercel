"use client";

import { searchClient } from "lib/algolia";
import { InstantSearchNext } from "react-instantsearch-nextjs";

export default function SearchProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <InstantSearchNext
      searchClient={searchClient}
      indexName="shopify_products"
      routing={true}
    >
      {children}
    </InstantSearchNext>
  );
}
