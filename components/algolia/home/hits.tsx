"use client";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useHits, useSearchBox } from "react-instantsearch";
import { TMDBHit } from "../hits";

export function AlgoliaHitItem({ hit }: { hit: TMDBHit }) {
  const posterUrl = hit.poster_path;
  const releaseYear = hit.release_date
    ? new Date(hit.release_date).getFullYear()
    : "";
  const rating = hit.vote_average ? hit.vote_average.toFixed(1) : "N/A";

  return (
    <div className="animate-fadeIn group">
      <Link
        className="relative block overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-2 md:p-4 shadow-xl hover:shadow-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
        href={`/movie/${hit.id}`}
        prefetch={true}
      >
        <div className="flex md:flex-col gap-4 items-start">
          {/* Poster Image */}
          <div className="relative flex-shrink-0 overflow-hidden rounded-md shadow-lg">
            <Image
              src={posterUrl}
              alt={hit.title}
              width={80}
              height={120}
              className="object-cover transition-transform duration-300 group-hover:scale-105 w-auto h-12 md:w-20 md:h-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h3 className="font-bold text-lg leading-tight text-white group-hover:text-blue-100 transition-colors duration-200 line-clamp-1">
              {hit.title}
            </h3>

            {/* Metadata Row */}
            <div className="flex items-center gap-4 text-sm mt-2">
              {releaseYear && (
                <span className="text-blue-100/80">{releaseYear}</span>
              )}
              <span className="text-yellow-100">{rating} ★</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function AlgoliaHits() {
  const { items } = useHits<TMDBHit>();
  const { query } = useSearchBox();

  if (items.length === 0 || !query) {
    return null;
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/40 rounded-2xl p-2 md:p-4 shadow-2xl w-full overflow-hidden relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 overflow-y-auto max-h-80 pb-8">
        {items.map((hit) => (
          <AlgoliaHitItem key={hit.objectID} hit={hit} />
        ))}
      </div>
      <div className="flex justify-end absolute bottom-0 right-0 bg-black/80 p-2 md:p-4 w-full">
        <Link
          href={`/search?query=${query}`}
          className="text-blue-400 flex items-center gap-2"
        >
          View all <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
