import Image from "next/image";
import TimeAgo from "@/components/atoms/TimeAgo/TimeAgo";
import { Blog } from "@/types";
import InputComment from "@/components/atoms/InputComment/InputComment";

type CommentsSectionProps = Pick<Blog, "comment" | "id">;

const CommentsSection = ({ id, comment }: CommentsSectionProps) => {
  // TO DO: Add edit / delete of comments
  // TO DO: Add comment likes
  return (
    <>
      <p className="mb-2">Commnets</p>
      <InputComment id={id} />
      {comment?.length ? (
        comment.map((c) => (
          <div
            key={c.id}
            className="flex flex-col gap-2 mb-2 p-2 border-1 border-gray-200 bg-white rounded-lg"
          >
            <div className="flex items-center gap-2">
              <Image
                alt="User profile"
                src={"/user2.png"}
                width={38}
                height={38}
                className="object-contain self-start border-2 border-gray-300 rounded-full"
              />
              <p className="text-sm">{c.userId}</p>
              <TimeAgo
                date={c.createdAt}
                className="ml-auto text-xs self-start"
              />
            </div>
            <p className="text-sm ml-11 whitespace-pre-wrap">{c.content}</p>
          </div>
        ))
      ) : (
        <p className="text-center">No comments yet!</p>
      )}
    </>
  );
};

export default CommentsSection;
