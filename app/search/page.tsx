import AlgoliaHits from "components/algolia/hits";
import AlgoliaStats from "components/algolia/stats";

export const metadata = {
  title: "Search",
  description: "Search for products in the store.",
};

export const dynamic = "force-dynamic";

export default function SearchPage() {
  return (
    <>
      <AlgoliaStats />
      <AlgoliaHits />
    </>
  );
}
