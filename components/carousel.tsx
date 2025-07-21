"use client";

import Link from "next/link";
import { useHits } from "react-instantsearch";
import { TMDBHit } from "./algolia/hits";
import { GridTileImage } from "./grid/tile";

export default function Carousel() {
  const { items: products } = useHits<TMDBHit>();

  if (!products?.length) return null;

  return (
    <div className="w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex animate-carousel gap-4">
        {products.map((product, i) => (
          <li
            key={`${product.id}${i}`}
            className="relative aspect-square h-[40vh] max-h-[275px] flex-none"
          >
            <Link
              href={`/movie/${product.id}`}
              className="relative h-full w-full"
            >
              <GridTileImage
                alt={product.title}
                src={product.poster_path}
                fill
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
