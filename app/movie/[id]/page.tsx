import { getMovieById } from "lib/algolia";
import Image from "next/image";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { hits: movies } = await getMovieById(id);

  if (movies.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Movie not found</h1>
          <p className="mt-2 text-gray-400">
            The movie you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const movie = movies[0];

  if (!movie) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Movie not found</h1>
          <p className="mt-2 text-gray-400">
            The movie you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <div className="min-h-screen">
      {/* Hero Section with Backdrop */}
      <div className="relative md:h-[60vh] w-full overflow-hidden rounded-xl">
        {movie.backdrop_path && (
          <Image
            src={movie.backdrop_path}
            alt={movie.title}
            fill
            className="object-cover blur-2xl hidden md:block"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent hidden md:block" />
        <div className="md:absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <div className="flex flex-col md:flex-row gap-6 items-end">
              {/* Poster */}
              {movie.poster_path && (
                <div className="absolute md:opacity-100 opacity-20 md:relative h-full w-full md:h-80 md:w-56 flex-shrink-0 rounded-lg overflow-hidden shadow-2xl">
                  <Image
                    src={movie.poster_path}
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Movie Info */}
              <div className="flex-1 text-white pt-8 md:pt-0">
                <h1 className="text-3xl md:text-5xl font-bold mb-2">
                  {movie.title}
                </h1>
                {movie.original_title !== movie.title && (
                  <p className="text-lg md:text-xl text-gray-300 mb-4">
                    {movie.original_title}
                  </p>
                )}
                <div className="flex flex-wrap gap-4 mb-4">
                  {releaseYear && (
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                      {releaseYear}
                    </span>
                  )}
                  <span className="bg-yellow-500/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    ⭐ {rating}
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    {movie.vote_count.toLocaleString()} votes
                  </span>
                </div>
                {movie.genres && movie.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {movie.genres.map((genre, index) => (
                      <span
                        key={index}
                        className="bg-blue-500/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                )}
                {movie.overview && (
                  <p className="text-gray-200 text-sm md:text-base max-w-3xl leading-relaxed">
                    {movie.overview}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cast */}
          {movie.cast && movie.cast.length > 0 && (
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6 text-white">Cast</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {movie.cast.slice(0, 12).map((actor, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                  >
                    <h3 className="font-semibold text-white">{actor.name}</h3>
                    <p className="text-sm text-gray-400">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Crew */}
          {movie.crew && movie.crew.length > 0 && (
            <div className="lg:col-span-2 mt-2">
              <h2 className="text-2xl font-bold mb-6 text-white">Crew</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {movie.crew.map((member, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                  >
                    <h3 className="font-semibold text-white text-sm">
                      {member.name}
                    </h3>
                    <p className="text-xs text-gray-400">{member.job}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Movie Details */}
          <div className="lg:col-start-3 lg:col-span-1 lg:row-start-1 lg:row-span-2">
            <h2 className="text-2xl font-bold mb-6 text-white">Details</h2>
            <div className="space-y-4">
              {movie.release_date && (
                <div>
                  <h3 className="font-semibold text-white">Release Date</h3>
                  <p className="text-gray-400">
                    {new Date(movie.release_date).toLocaleDateString()}
                  </p>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-white">Rating</h3>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">⭐</span>
                  <span className="text-white">{rating}/10</span>
                  <span className="text-gray-500">
                    ({movie.vote_count.toLocaleString()} votes)
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-white">Popularity</h3>
                <p className="text-gray-400">{movie.popularity.toFixed(1)}</p>
              </div>

              {movie.original_language && (
                <div>
                  <h3 className="font-semibold text-white">Language</h3>
                  <p className="text-gray-400 uppercase">
                    {movie.original_language}
                  </p>
                </div>
              )}

              {movie.keywords && movie.keywords.length > 0 && (
                <div>
                  <h3 className="font-semibold text-white mb-2">Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.keywords.slice(0, 10).map((keyword, index) => (
                      <span
                        key={index}
                        className="bg-gray-700 text-gray-300 px-2 py-1 rounded-md text-xs"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
