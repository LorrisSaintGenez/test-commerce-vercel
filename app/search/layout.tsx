import AlgoliaRefinementList from "components/algolia/refinement-list";
import AlgoliaSortBy from "components/algolia/sort-by";
import { Navbar } from "components/layout/navbar";
import SearchProvider from "components/search-provider";
import { Suspense } from "react";

// Define the sort indices based on your Algolia setup
const sortItems = [
  { label: "Relevance", value: "movie" },
  { label: "Popularity", value: "movies_popularity" },
  { label: "Rating", value: "movies_vote_average" },
];

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SearchProvider routing>
      <Navbar />
      <div className="flex flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white max-w-7xl w-full mx-auto">
        <div className="order-first w-full flex-none md:max-w-[125px] md:space-y-4">
          <AlgoliaRefinementList attribute="genres" title="Genres" />
          <AlgoliaRefinementList attribute="keywords" title="Keywords" />
          <AlgoliaRefinementList
            attribute="original_language"
            title="Languages"
          />
        </div>
        <div className="order-last min-h-screen w-full md:order-none">
          <Suspense fallback={null}>{children}</Suspense>
        </div>
        <div className="order-none flex-none md:order-last md:w-[125px]">
          <AlgoliaSortBy items={sortItems} title="Sort by" />
        </div>
      </div>
    </SearchProvider>
  );
}
