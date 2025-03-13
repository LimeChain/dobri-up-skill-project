import Image from "next/image";
import LikeBlog from "@/components/molecules/LikeBlog/LikeBlog";
import { Blog as BlogType } from "@/types";
import { format } from "date-fns";

type BlogProps = BlogType;

const Blog = ({
  id,
  backgroundColor,
  content,
  createdAt,
  createdBy,
  image,
  title,
  likesRef,
}: BlogProps) => {
  return (
    <div
      key={id}
      className="p-4 rounded-lg mb-4 mx-auto bg-gray-100 border-1 border-gray-200 shadow-md"
      style={{ backgroundColor: backgroundColor?.css ?? "" }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Image
          alt="publisher"
          src={createdBy.picture}
          width={40}
          height={40}
          className="rounded-full"
        />
        <p>{createdBy.name}</p>
        <p className="ml-auto">🗓️ {format(createdAt, "dd LLLL yyyy")}</p>
      </div>
      <p className="text-2xl pb-4 mb-4 border-b-1 border-gray-400">{title}</p>
      <p className="mb-2">{content}</p>
      {image && (
        <Image
          alt={title}
          src={image.url}
          width={image.width}
          height={image.height}
          className="mx-auto"
        />
      )}
      <LikeBlog blogId={id} likesCount={likesRef.length} />
      <div className="">COMMENTS</div>
    </div>
  );
};

export default Blog;
