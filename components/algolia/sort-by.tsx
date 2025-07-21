"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useSortBy } from "react-instantsearch";

interface AlgoliaSortByProps {
  items: Array<{
    label: string;
    value: string;
  }>;
  title?: string;
}

function SortItem({
  label,
  value,
  isActive,
  onSelect,
}: {
  label: string;
  value: string;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <li className="flex text-sm text-black dark:text-white">
      <button
        onClick={onSelect}
        className={clsx(
          "w-full text-left hover:font-bold cursor-pointer text-sm",
          isActive ? "font-bold" : "font-thin"
        )}
      >
        {label}
      </button>
    </li>
  );
}

function SortItemDropdown({
  items,
  currentRefinement,
  refine,
}: {
  items: Array<{
    label: string;
    value: string;
  }>;
  currentRefinement: string;
  refine: (value: string) => void;
}) {
  const [active, setActive] = useState("");
  const [openSelect, setOpenSelect] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenSelect(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const activeItem = items.find((item) => item.value === currentRefinement);
    setActive(activeItem ? activeItem.label : items[0]?.label || "");
  }, [currentRefinement, items]);

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
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AlgoliaSortBy({
  items,
  title = "Sort by",
}: AlgoliaSortByProps) {
  const { currentRefinement, options, refine } = useSortBy({
    items,
  });

  return (
    <nav>
      {title ? (
        <h3 className="hidden text-xs text-neutral-500 md:block dark:text-neutral-400 mb-2">
          {title}
        </h3>
      ) : null}
      <ul className="hidden md:block space-y-1">
        {options.map((option) => (
          <SortItem
            key={option.value}
            label={option.label}
            value={option.value}
            isActive={currentRefinement === option.value}
            onSelect={() => refine(option.value)}
          />
        ))}
      </ul>
      <ul className="md:hidden">
        <SortItemDropdown
          items={options}
          currentRefinement={currentRefinement}
          refine={refine}
        />
      </ul>
    </nav>
  );
}
