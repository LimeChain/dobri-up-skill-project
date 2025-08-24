"use client";

import { useTransition } from "react";
import { createBlogLike } from "@/lib/hygraph";
import { ToastContainer, toast } from "react-toastify";
import { ResponseTypes } from "@/types";
import { FiThumbsUp } from "react-icons/fi";
import { useAuthStore } from "@/lib/store";

type LikeBlogProps = {
  blogId: string;
  likesCount: number;
};

const LikeBlog = ({ blogId, likesCount }: LikeBlogProps) => {
  const [pending, start] = useTransition();
  const user = useAuthStore((state) => state.user);

  const handleBlogLike = () => {
    if (!user) {
      toast.error("Please login to like blogs", {
        position: "bottom-right",
      });
      return;
    }
    start(async () => {
      const { type, message } = await createBlogLike(blogId, user.id);

      if (type === ResponseTypes.ERROR) {
        toast.error(message, { position: "bottom-right" });
      }
    });
  };

  return (
    <div className="flex gap-2 border-b-1 border-gray-400 py-4 mb-4">
      <button
        disabled={pending}
        onClick={handleBlogLike}
        className="hover:text-red-400 hover:scale-110 transition"
      >
        {/* TO DO: If liked: className="fill-red-200 text-red-500" */}
        <FiThumbsUp size="22" />
      </button>
      {likesCount}
      <ToastContainer />
    </div>
  );
};

export default LikeBlog;
