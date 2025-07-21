'use client';

import { useStats, useSearchBox } from 'react-instantsearch';

export default function AlgoliaStats() {
  const { nbHits } = useStats();
  const { query } = useSearchBox();

  if (!query && !nbHits) return null;

  const resultsText = nbHits > 1 ? 'results' : 'result';

  return (
    <>
      {query ? (
        <p className="mb-4">
          {nbHits === 0
            ? 'There are no products that match '
            : `Showing ${nbHits} ${resultsText} for `}
          <span className="font-bold">&quot;{query}&quot;</span>
        </p>
      ) : null}
    </>
  );
} 