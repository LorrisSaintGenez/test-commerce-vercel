"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSearchBox } from "react-instantsearch";

export default function AlgoliaSearchBox() {
  const { query, refine } = useSearchBox();
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("query");
    if (query) {
      refine(query);
    }
  }, [refine]);

  const redirectToSearch = () => {
    if (!window.location.pathname.startsWith("/search")) {
      router.replace("/search");
    }
  };

  return (
    <form
      className="w-max-[550px] relative w-full lg:w-80 xl:w-full"
      onSubmit={(e) => {
        e.preventDefault();
        redirectToSearch();
      }}
    >
      <input
        type="text"
        placeholder="Search for movies, actors, directors, etc.…"
        autoComplete="off"
        value={query}
        onFocus={redirectToSearch}
        onChange={(e) => refine(e.target.value)}
        className="text-md w-full rounded-lg border bg-white px-4 py-2 text-black placeholder:text-neutral-500 md:text-sm dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </form>
  );
}

export function AlgoliaSearchBoxSkeleton() {
  return (
    <form className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <input
        placeholder="Search for movies, actors, directors, etc.…"
        className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </form>
  );
}
