import { algoliasearch } from "algoliasearch";
import { TMDBHit } from "components/algolia/hits";

export const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!
);

export const getMovieById = async (id: string) => {
  const result = await searchClient.browseObjects<TMDBHit>({
    indexName: "movie",
    browseParams: {
      filters: `id = ${id}`,
    },
    aggregator: ({ hits }) => {
      return { hits };
    },
  });
  return result;
};
