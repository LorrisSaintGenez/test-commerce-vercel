"use client";

import clsx from "clsx";
import { useRefinementList } from "react-instantsearch";
import { useSearchParams, usePathname } from "next/navigation";
import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface AlgoliaRefinementListProps {
  attribute: string;
  title?: string;
}

function RefinementItem({
  value,
  count,
  isRefined,
  refine,
}: {
  value: string;
  count: number;
  isRefined: boolean;
  refine: () => void;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    refine();
  };

  return (
    <li className="mt-2 flex text-black dark:text-white">
      <button
        onClick={handleClick}
        className={clsx(
          "w-full text-left text-sm underline-offset-4 hover:underline dark:hover:text-neutral-100",
          {
            "underline underline-offset-4 font-medium": isRefined,
          },
        )}
      >
        {value} ({count})
      </button>
    </li>
  );
}

function RefinementItemDropdown({
  items,
  refine,
}: {
  items: Array<{
    value: string;
    label: string;
    count: number;
    isRefined: boolean;
  }>;
  refine: (value: string) => void;
}) {
  const [active, setActive] = React.useState("");
  const [openSelect, setOpenSelect] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenSelect(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  React.useEffect(() => {
    const activeItem = items.find((item) => item.isRefined);
    setActive(activeItem ? activeItem.label : "All Categories");
  }, [items]);

  return (
    <div className="relative" ref={ref}>
      <div
        onClick={() => setOpenSelect(!openSelect)}
        className="flex w-full items-center justify-between rounded-sm border border-black/30 px-4 py-2 text-sm dark:border-white/30"
      >
        <div>{active}</div>
        <ChevronDownIcon className="h-4" />
      </div>
      {openSelect && (
        <div
          onClick={() => setOpenSelect(false)}
          className="absolute z-40 w-full rounded-b-md bg-white p-4 shadow-md dark:bg-black"
        >
          {items.map((item) => (
            <button
              key={item.value}
              onClick={() => refine(item.value)}
              className="block w-full text-left text-sm hover:underline"
            >
              {item.label} ({item.count})
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AlgoliaRefinementList({
  attribute,
  title = "Collections",
}: AlgoliaRefinementListProps) {
  const { items, refine } = useRefinementList({
    attribute,
    limit: 20,
  });

  if (items.length === 0) return null;

  return (
    <nav>
      {title ? (
        <h3 className="hidden text-xs text-neutral-500 md:block dark:text-neutral-400">
          {title}
        </h3>
      ) : null}
      <ul className="hidden md:block">
        {items.map((item) => (
          <RefinementItem
            key={item.value}
            value={item.label}
            count={item.count}
            isRefined={item.isRefined}
            refine={() => refine(item.value)}
          />
        ))}
      </ul>
      <ul className="md:hidden">
        <RefinementItemDropdown items={items} refine={refine} />
      </ul>
    </nav>
  );
}
