"use client";

import { useHits } from "react-instantsearch";
import Grid from "components/grid";
import { GridTileImage } from "components/grid/tile";
import Link from "next/link";

export type AlgoliaHit = {
  objectID: string;
  handle: string;
  title: string;
  product_image: string;
  image: string;
  price: number;
  variants_min_price: number;
  variants_max_price: number;
  product_type: string;
  vendor: string;
  tags: string[];
  inventory_available: boolean;
  compare_at_price: number;
};

export function AlgoliaHitItem({ hit }: { hit: AlgoliaHit }) {
  const imageUrl = hit.product_image || hit.image;
  const price = hit.price || hit.variants_min_price;

  return (
    <Grid.Item className="animate-fadeIn">
      <Link
        className="relative inline-block h-full w-full"
        href={`/product/${hit.handle}`}
        prefetch={true}
      >
        <GridTileImage
          alt={hit.title}
          label={{
            title: hit.title,
            amount: price.toString(),
          }}
          src={imageUrl}
          fill
          sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </Link>
    </Grid.Item>
  );
}

export default function AlgoliaHits() {
  const { items } = useHits<AlgoliaHit>();

  if (items.length === 0) {
    return null;
  }

  return (
    <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((hit) => (
        <AlgoliaHitItem key={hit.objectID} hit={hit} />
      ))}
    </Grid>
  );
}
