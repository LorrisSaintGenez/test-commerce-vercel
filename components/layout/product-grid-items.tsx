import { TMDBHit } from "components/algolia/hits";
import Grid from "components/grid";
import { GridTileImage } from "components/grid/tile";
import Link from "next/link";

export default function ProductGridItems({
  products,
}: {
  products: TMDBHit[];
}) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.id} className="animate-fadeIn">
          <Link
            className="relative inline-block h-full w-full"
            href={`/movie/${product.id}`}
            prefetch={true}
          >
            <GridTileImage
              alt={product.title}
              src={product.poster_path}
              fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
