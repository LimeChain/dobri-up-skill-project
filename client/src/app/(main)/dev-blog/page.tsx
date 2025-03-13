import Blog from "@/components/organisms/Blog/Blog";
import { getBlogs } from "@/lib/hygraph";
import { ResponseTypes } from "@/types";

export default async function DevBlog() {
  const { data: blogs, message, type } = await getBlogs();

  if (type === ResponseTypes.ERROR)
    return <p>Error while fetch blogs: {message}</p>;

  return blogs.length ? (
    <>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          id={blog.id}
          title={blog.title}
          content={blog.content}
          image={blog.image}
          backgroundColor={blog.backgroundColor}
          createdAt={blog.createdAt}
          createdBy={blog.createdBy}
          likesRef={blog.likesRef}
        />
      ))}
    </>
  ) : (
    <p>No entries to show...</p>
  );
}
