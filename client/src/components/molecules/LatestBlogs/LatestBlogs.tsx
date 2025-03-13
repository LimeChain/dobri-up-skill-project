import { getBlogs } from "@/lib/hygraph";
import { ResponseTypes } from "@/types";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";

const LatestBlogs = async () => {
  const q = `
    {blogs(first: 3, orderBy: createdAt_DESC) {
        id
        title
        createdAt
    }}`;

  const { data: latestBlogs, message, type } = await getBlogs(q);

  return (
    <div>
      <p className="mb-4">Latest Dev Blogs</p>
      {type === ResponseTypes.SUCCESS ? (
        <ul>
          {latestBlogs.map(({ id, title, createdAt }) => {
            return (
              <li key={id} className="mb-4 hover:text-red-400">
                <Link href={`/dev-blog/${id}`} className="flex gap-1">
                  <p className="text-sm flex-2/3">{title}</p>
                  <div className="flex-1/4 text-right">
                    <p className="text-xs">
                      {format(createdAt, "dd MMMM yy ")}
                    </p>
                    <p className="text-xs">{format(createdAt, "kk:mm")}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-xs">
          Error while fetching latest blogs: <span>{message}</span>
        </p>
      )}
    </div>
  );
};

export default LatestBlogs;
