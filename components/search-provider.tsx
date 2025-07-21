"use client";

import { searchClient } from "lib/algolia";
import { Configure } from "react-instantsearch";
import { InstantSearchNext } from "react-instantsearch-nextjs";

export default function SearchProvider({
  children,
  routing,
  hitsPerPage = 100,
}: {
  children: React.ReactNode;
  routing?: boolean;
  hitsPerPage?: number;
}) {
  return (
    <InstantSearchNext
      searchClient={searchClient}
      indexName="movie"
      routing={
        routing
          ? {
              stateMapping: {
                stateToRoute(uiState) {
                  const indexUiState = uiState.movie || {};
                  return {
                    query: indexUiState.query,
                  };
                },
                routeToState(routeState) {
                  return {
                    movie: {
                      query: routeState.query,
                    },
                  };
                },
              },
            }
          : false
      }
    >
      <Configure hitsPerPage={hitsPerPage} />
      {children}
    </InstantSearchNext>
  );
}
