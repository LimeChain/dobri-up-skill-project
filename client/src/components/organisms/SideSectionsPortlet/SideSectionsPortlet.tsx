import LatestBlogs from "@/components/molecules/LatestBlogs/LatestBlogs";
import Link from "next/link";
import React from "react";

type SideSectionsPortletProps = { children: React.ReactNode };

const SideSectionsPortlet = ({ children }: SideSectionsPortletProps) => {
  return (
    <div className="flex gap-4 mx-2">
      <div className="flex-1/4 p-2 max-w-64 rounded-lg bg-gray-100 border-1 border-gray-200 shadow-md h-[100%]">
        <ul>
          <li className="p-2 hover:text-red-400 hover:cursor-pointer transition">
            📧 Menu Item 1
          </li>
          <li className="p-2 hover:text-red-400 hover:cursor-pointer transition">
            💾 Item Menu 2
          </li>
          <Link href="/dev-blog">
            <li className="p-2 hover:text-red-400 hover:cursor-pointer transition">
              🖥️ Dev Blog
            </li>
          </Link>
          <li className="p-2 hover:text-red-400 hover:cursor-pointer transition">
            🔍 Item Menu 4
          </li>
          <li className="p-2 hover:text-red-400 hover:cursor-pointer transition">
            🔒 Menu Item 5
          </li>
        </ul>
      </div>
      <div className="flex-1/2 max-w-180 mx-auto">{children}</div>
      <div className="flex-1/4 max-w-96 p-4 rounded-lg bg-gray-100 border-1 border-gray-200 shadow-md h-[100%]">
        <div className="min-h-[200px] border-b-1 border-gray-400 mb-2">
          SECTION 1
        </div>
        <div className="min-h-[200px] border-b-1 border-gray-400 mb-2">
          SECTION 2
        </div>
        <div className="min-h-[200px] mb-2">
          <LatestBlogs />
        </div>
      </div>
    </div>
  );
};

export default SideSectionsPortlet;
