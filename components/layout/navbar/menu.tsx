"use client";

import Link from "next/link";
import { useRefinementList } from "react-instantsearch";

const Menu = () => {
  const { items: menu } = useRefinementList({
    attribute: "product_type",
  });

  return (
    <ul className="hidden gap-6 text-sm md:flex md:items-center">
      {menu.map((item) => (
        <li key={item.value}>
          <Link
            href={`/search/${item.value}`}
            prefetch={true}
            className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
