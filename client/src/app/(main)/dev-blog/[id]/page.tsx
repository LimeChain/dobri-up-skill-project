import Blog from "@/components/organisms/Blog/Blog";
import { getBlog } from "@/lib/hygraph";
import { ResponseTypes } from "@/types";

type SingleDevBlogProps = { params: Promise<{ id: string }> };

export default async function SingleDevBlog({ params }: SingleDevBlogProps) {
  const { id } = await params;
  const { data: blog, message, type } = await getBlog(id);

  if (type === ResponseTypes.ERROR)
    return <p>Error fetching blog: {message}</p>;

  return blog ? (
    <Blog
      id={blog.id}
      title={blog.title}
      content={blog.content}
      image={blog.image}
      backgroundColor={blog.backgroundColor}
      createdAt={blog.createdAt}
      createdBy={blog.createdBy}
      likesRef={blog.likesRef}
    />
  ) : (
    <p>
      Blog <span className="font-bold">"{id}"</span> was not found...
    </p>
  );
}
