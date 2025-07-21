"use client";

import SearchProvider from "components/search-provider";
import AlgoliaHits from "./hits";
import AlgoliaHomeSearchBox from "./search-box";

export default function AlgoliaHomeContainer() {
  return (
    <SearchProvider hitsPerPage={12}>
      <div className="flex flex-col max-w-2xl w-full mx-auto gap-1">
        <AlgoliaHomeSearchBox />
        <AlgoliaHits />
      </div>
    </SearchProvider>
  );
}
