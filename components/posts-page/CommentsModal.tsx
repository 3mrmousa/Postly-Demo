"use client";
import { Comment, initialFormState, Post } from "@/types/types";
import SubmitButton from "./SubmitButton";
import { useActionState } from "react";
import { addCommentAction } from "@/lib/actions/post.actions";

function CommentsModal({ post, onClose }: { post: Post; onClose: () => void }) {
  const [state, formAction] = useActionState(
    addCommentAction,
    initialFormState,
  );

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black/50 z-40" />
      <div
        className="size-120 fixed z-100 top-1/2 left-1/2 -translate-1/2
         bg-zinc-800 p-5 rounded-lg
         flex flex-col"
      >
        <div className="flex justify-between items-center">
          <h4 className="text-xl font-semibold">Comments</h4>
          <button
            className="text-4xl text-red-500
        cursor-pointer hover:text-red-600
        hover:scale-110 duration-300"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="flex flex-col flex-1 gap-3 max-h-90 overflow-y-auto">
          {post.comments.length === 0 ? (
            <p className="text-zinc-500 text-sm text-center py-6">
              No comments yet
            </p>
          ) : (
            post.comments.map((comment: Comment) => (
              <div
                key={comment.id}
                className="bg-zinc-700 rounded-xl px-4 py-3 flex flex-col gap-1"
              >
                <span className="text-zinc-400 text-xs">
                  @{comment.user.username}
                </span>
                <p className="text-zinc-100 text-sm wrap-break-word">
                  {comment.content}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="mt-3">
          <form action={formAction} className="flex w-full gap-5">
            <input
              type="text"
              readOnly
              name="postId"
              hidden={true}
              value={post.id}
            />
            <input
              type="text"
              name="content"
              placeholder={`${state.error ? state.error : "add comment here"}`}
              className={`bg-transparent text-sm text-white placeholder:text-neutral-600
           outline-none border border-zinc-700 py-2 px-3 rounded-xl w-full
           ${
             state.error
               ? "placeholder:text-red-500"
               : "placeholder:text-white"
           }`}
            />
            <SubmitButton />
          </form>
        </div>
      </div>
    </>
  );
}

export default CommentsModal;
