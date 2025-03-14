"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { BiCommentAdd } from "react-icons/bi";
import { createBlogComment } from "@/lib/hygraph";
import { Blog, ResponseTypes } from "@/types";

type InputCommentProps = Pick<Blog, "id">;

const InputComment = ({ id }: InputCommentProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddComment = async () => {
    const { message, type } = await createBlogComment(id, inputValue);

    if (type === ResponseTypes.ERROR) {
      toast.error(message, { position: "bottom-right" });
    }

    if (type === ResponseTypes.SUCCESS) {
      setInputValue("");
    }
  };
  return (
    <div className="flex gap-2 mb-2">
      <textarea
        name="comment"
        value={inputValue}
        onChange={(e) => setInputValue(e.currentTarget.value)}
        rows={3}
        className="py-1 px-3 rounded-lg border-1 border-gray-200 bg-white flex-1 resize-none"
      />
      <button
        onClick={handleAddComment}
        className="hover:text-red-400 hover:scale-110 transition"
      >
        <BiCommentAdd size="26" />
      </button>
    </div>
  );
};

export default InputComment;
