import { MENU_ITEMS } from "@/constants";
import Link from "next/link";
import React from "react";

export const MenuItems = () => {
  return (
    <ul className="p-2 rounded-lg bg-gray-100 border-1 border-gray-200 shadow-md">
      {MENU_ITEMS.map((item) => (
        <Link key={item.name} href={item.href}>
          <li className="p-2 hover:text-red-400 hover:cursor-pointer transition">
            {item.name}
          </li>
        </Link>
      ))}
    </ul>
  );
};
