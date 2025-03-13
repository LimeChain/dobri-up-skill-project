"use server";

import { revalidateTag } from "next/cache";
import { errorFormat } from "@/utils/errorFormat";
import { Blog, DataResponse, ResponseTypes } from "@/types";
import { queryConfig } from "./queries";

const HYGRAPH_API = process.env.HYGRAPH_CONTENT_API ?? "";
const HYGRAPH_TOKEN = process.env.HYGRAPH_API_TOKEN ?? "";

export const getBlogs = async (
  query = queryConfig({}).getAllBlogs.query
): Promise<DataResponse<Blog[]>> => {
  try {
    const response = await fetch(HYGRAPH_API, {
      method: "POST",
      headers: {
        Authorization: HYGRAPH_TOKEN,
        "Content-Type": "application/json",
      },
      next: { tags: ["all-blogs"] },
      body: JSON.stringify({
        query,
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      return {
        data: [],
        message: json.errors[0].message,
        type: ResponseTypes.ERROR,
      };
    }

    const blogs: Blog[] = json.data.blogs;
    return { data: blogs, message: null, type: ResponseTypes.SUCCESS };
  } catch (error) {
    const err = errorFormat(error);
    return { data: [], message: err, type: ResponseTypes.ERROR };
  }
};

export const getBlog = async (
  blogId: string
): Promise<DataResponse<Blog | null>> => {
  const q = queryConfig({ blogId: blogId }).getSingleBlog;

  try {
    const response = await fetch(HYGRAPH_API, {
      method: "POST",
      headers: {
        Authorization: HYGRAPH_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(q),
    });

    const json = await response.json();

    if (!response.ok) {
      return {
        data: null,
        message: json.errors[0].message,
        type: ResponseTypes.ERROR,
      };
    }

    const blog: Blog = json.data.blog;
    return { data: blog, message: null, type: ResponseTypes.SUCCESS };
  } catch (error) {
    const err = errorFormat(error);
    return { data: null, message: err, type: ResponseTypes.ERROR };
  }
};

export const createBlogLike = async (
  blogId: string
): Promise<DataResponse<null>> => {
  if (!blogId)
    return {
      data: null,
      message: "Blog ID was not provided",
      type: ResponseTypes.ERROR,
    };

  // TO DO: Will be taken from cookie
  const userId = "Kristina Kirova 5";

  const blogToCheck = await getBlog(blogId);

  if (blogToCheck.data?.likesRef) {
    for (const blogLike of blogToCheck.data.likesRef) {
      if (blogLike.userId === userId) {
        // TO DO: Instead of error add dislike functionality...
        return {
          data: null,
          message: "Alredy liked this post",
          type: ResponseTypes.ERROR,
        };
      }
    }
  }

  try {
    const q = queryConfig({ blogId, userId }).createLike;

    const response = await fetch(HYGRAPH_API, {
      method: "POST",
      headers: {
        Authorization: HYGRAPH_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(q),
    });

    const json = await response.json();

    if (!response.ok) {
      return {
        data: null,
        message: json.errors[0].message,
        type: ResponseTypes.ERROR,
      };
    }

    console.log("blogId", blogId);

    console.log("userId", userId);

    console.log("json", json);

    const createdLike = json.data.createLike;

    if (createdLike.id) {
      const publishedLike = await publishLike(createdLike.id);

      if (publishedLike.id) {
        const publishedBlog = await publishBlog(publishedLike.blogRef.id);

        if (publishedBlog.id) {
          await new Promise((resolve) => setTimeout(resolve, 200));
          revalidateTag("all-blogs");
          return { data: null, message: null, type: ResponseTypes.SUCCESS };
        }
      }
    }
  } catch (error) {
    const err = errorFormat(error);
    return { data: null, message: err, type: ResponseTypes.ERROR };
  }

  return {
    data: null,
    message: "Unknown error: Failed to like the blog post",
    type: ResponseTypes.ERROR,
  };
};

export const publishBlog = async (blogId: string) => {
  const q = queryConfig({ blogId }).publishBlog;
  try {
    const response = await fetch(HYGRAPH_API, {
      method: "POST",
      headers: {
        Authorization: HYGRAPH_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(q),
    });

    const json = await response.json();
    const publishedBlog = json.data.publishBlog;
    return publishedBlog;
  } catch (error) {
    const err = errorFormat(error);
    return { message: err, type: "error" };
  }
};

export const publishLike = async (likeId: string) => {
  const q = queryConfig({ likeId }).publishLike;
  try {
    const response = await fetch(HYGRAPH_API, {
      method: "POST",
      headers: {
        Authorization: HYGRAPH_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(q),
    });

    const json = await response.json();

    console.log("json like", json);
    const publishedLike = json.data.publishLike;
    return publishedLike;
  } catch (error) {
    const err = errorFormat(error);
    return { message: err, type: "error" };
  }
};
