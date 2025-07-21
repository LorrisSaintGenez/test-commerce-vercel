import { Navbar } from "components/layout/navbar";
import SearchProvider from "components/search-provider";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SearchProvider>
      <Navbar />
      <div className="flex flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white max-w-7xl w-full mx-auto">
        <div className="order-last min-h-screen w-full md:order-none">
          <Suspense fallback={null}>{children}</Suspense>
        </div>
      </div>
    </SearchProvider>
  );
}
