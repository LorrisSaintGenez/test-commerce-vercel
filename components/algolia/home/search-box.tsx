"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useSearchBox } from "react-instantsearch";

export default function AlgoliaHomeSearchBox() {
  const { query, refine } = useSearchBox();
  const router = useRouter();

  return (
    <div className="w-full">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 shadow-2xl">
        <form
          className="w-max-[550px] relative w-full lg:w-80 xl:w-full"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            placeholder="Search for movies, actors, directors, etc.…"
            autoComplete="off"
            value={query}
            onChange={(e) => refine(e.target.value)}
            className="text-md w-full rounded-lg border bg-gray-100 px-4 py-2 text-black placeholder:text-neutral-500 md:text-sm outline-blue-400"
          />
          <div className="absolute right-0 top-0 mr-3 hidden h-full items-center md:flex">
            <MagnifyingGlassIcon className="h-4 text-blue-500" />
          </div>
        </form>
      </div>
    </div>
  );
}

export function AlgoliaSearchBoxSkeleton() {
  return (
    <form className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <input
        placeholder="Search for movies, actors, directors, etc.…"
        className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </form>
  );
}
