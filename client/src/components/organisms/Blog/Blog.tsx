import Image from "next/image";
import LikeBlog from "@/components/molecules/LikeBlog/LikeBlog";
import DateTime from "@/components/atoms/DateTime/DateTime";
import { Blog as BlogType } from "@/types";
import CommentsSection from "@/components/molecules/CommentsSection/CommentsSection";

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
  comment,
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
          width={46}
          height={46}
          className="border-2 border-gray-300 rounded-full"
        />
        <p>{createdBy.name}</p>
        <DateTime
          date={createdAt}
          formatStr="dd LLLL yyyy"
          className="ml-auto"
        />
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
      <CommentsSection comment={comment} id={id} />
    </div>
  );
};

export default Blog;
