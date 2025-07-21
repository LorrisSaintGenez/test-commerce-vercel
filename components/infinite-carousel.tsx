"use client";

import clsx from "clsx";
import Link from "next/link";
import { useHits } from "react-instantsearch";
import { TMDBHit } from "./algolia/hits";
import { GridTileImage } from "./grid/tile";

export default function InfiniteCarousel() {
  const { items: products } = useHits<TMDBHit>();

  if (!products?.length) return null;

  const firstSplit = products.slice(0, products.length / 3);
  const secondSplit = products.slice(
    products.length / 3,
    (products.length / 3) * 2
  );
  const thirdSplit = products.slice((products.length / 3) * 2);

  const carouselItems = [firstSplit, secondSplit, thirdSplit];

  return (
    <div className="w-full overflow-x-auto pb-6 pt-1 space-y-4 overflow-hidden">
      {carouselItems.map((items, index) => (
        <div className="overflow-auto" key={`carousel-${index}`}>
          <ul className={clsx("flex gap-4", index % 2 === 0 ? "animate-carousel" : "animate-reverse-carousel")}>
            {items.map((product, i) => (
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
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    data={product}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
