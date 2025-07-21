import clsx from "clsx";
import Image from "next/image";
import { TMDBHit } from "../algolia/hits";

export function GridTileImage({
  isInteractive = true,
  active,
  data,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  data?: TMDBHit;
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx(
        "group relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black",
        {
          "border-2 border-blue-600": active,
          "border-neutral-200 dark:border-neutral-800": !active,
        }
      )}
    >
      {data ? (
        <div className="hidden absolute top-0 left-0 w-full h-full z-10 bg-black/80 group-hover:block">
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-white text-center text-2xl font-bold">
              {data.title}
            </p>
            {data.release_date && (
              <p className="text-white text-center text-sm">
                {new Date(data.release_date).getFullYear()}
              </p>
            )}
          </div>
        </div>
      ) : null}
      <Image
        className={clsx("relative h-full w-full object-contain", {
          "transition duration-300 ease-in-out group-hover:scale-105":
            isInteractive,
        })}
        {...props}
      />
    </div>
  );
}
