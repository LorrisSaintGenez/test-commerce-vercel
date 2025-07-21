import AlgoliaHomeContainer from "components/algolia/home/container";
import InfiniteCarousel from "components/infinite-carousel";
import SearchProvider from "components/search-provider";

export const metadata = {
  description:
    "High-performance ecommerce store built with Next.js, Vercel, and Algolia search.",
  openGraph: {
    type: "website",
  },
};

export default function HomePage() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent z-10">
        <div className="max-w-3xl mx-auto flex flex-col items-center px-4">
          <div className="text-center mb-12 mt-24 w-full">
            <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
              Your Entertainment
              <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Universe
              </span>
            </h1>
            <p className="text-gray-200 text-md md:text-xl mx-auto">
              Discover millions of movies, TV shows, and the talented people who
              bring them to life. From timeless classics to the latest
              blockbusters, your ultimate entertainment guide awaits.
            </p>
          </div>
          <AlgoliaHomeContainer />
        </div>
      </div>
      <SearchProvider>
        <InfiniteCarousel />
      </SearchProvider>
    </div>
  );
}
