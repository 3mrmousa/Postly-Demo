"use client";

import { toggleLikeAction } from "@/lib/actions/post.actions";
import { useState } from "react";

function LikeButton({
  postId,
  likesCount,
  isLiked,
}: {
  postId: string;
  likesCount: number;
  isLiked: boolean;
}) {
  const [liked, setLiked] = useState(isLiked);
  const [likes, setLikes] = useState(likesCount);

  const handleLike = async () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
    await toggleLikeAction(postId);
  };

  return (
    <button
      onClick={handleLike}
      className={`flex items-center transition duration-200 group cursor-pointer
        ${liked ? "text-red-500" : "text-zinc-500 hover:text-red-400"}`}
    >
      {liked ? (
        <svg
          className="w-8 h-8 transition-transform duration-200 group-active:scale-125"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ) : (
        <svg
          className="w-8 h-8 transition-transform duration-200 group-active:scale-125"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      )}
      <span className="text-xl">{likes}</span>
    </button>
  );
}

export default LikeButton;
