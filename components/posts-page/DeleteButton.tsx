"use client";

import { deletePostAction } from "@/lib/actions/post.actions";

function DeleteButton({ postId }: { postId: string }) {
  return (
    <button
      onClick={async () => await deletePostAction(postId)}
      className="text-xs font-semibold text-neutral-500 hover:text-rose-400
      px-3 py-1.5 rounded-xl border border-neutral-800 hover:border-rose-800
      transition duration-200"
    >
      Delete
    </button>
  );
}

export default DeleteButton;
