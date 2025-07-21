"use client";

import Grid from "components/grid";
import { GridTileImage } from "components/grid/tile";
import Link from "next/link";
import { useHits } from "react-instantsearch";

export type TMDBHit = {
  objectID: string;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  original_language: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  cast: Array<{
    name: string;
    character: string;
  }>;
  crew: Array<{
    name: string;
    job: string;
  }>;
  genres: string[];
  keywords: string[];
  attribution: string;
};

export function AlgoliaHitItem({ hit }: { hit: TMDBHit }) {
  const posterUrl = hit.poster_path;
  const releaseYear = hit.release_date
    ? new Date(hit.release_date).getFullYear()
    : "";
  const rating = hit.vote_average ? hit.vote_average.toFixed(1) : "N/A";

  return (
    <Grid.Item className="animate-fadeIn">
      <Link
        className="relative inline-block h-full w-full overflow-hidden"
        href={`/movie/${hit.id}`}
        prefetch={true}
      >
        <GridTileImage
          alt={hit.title}
          src={posterUrl}
          fill
          sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label">
          <div className="flex items-center justify-between rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white px-2 space-x-2">
            <h3 className="mr-4 line-clamp-1 flex-grow leading-none tracking-tight">
              {hit.title}
            </h3>
            {releaseYear && (
              <p className="text-xs text-neutral-500 dark:text-neutral-400 shrink-0">
                {releaseYear}
              </p>
            )}
            <p className="text-xs shrink-0">⭐ {rating}</p>
          </div>
        </div>
      </Link>
    </Grid.Item>
  );
}

export default function AlgoliaHits() {
  const { items } = useHits<TMDBHit>();

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
