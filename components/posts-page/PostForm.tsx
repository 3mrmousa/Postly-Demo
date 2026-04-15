"use client";

import { createPostAction } from "@/lib/actions/post.actions";
import SubmitButton from "./SubmitButton";
import { useActionState } from "react";
import { initialFormState } from "@/types/types";

function PostForm() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, formAction, isPending] = useActionState(
    createPostAction,
    initialFormState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <div className="flex flex-col gap-5 bg-neutral-900 border border-neutral-800 rounded-2xl px-4 py-3 focus-within:border-violet-500 transition duration-200">
        <input
          type="text"
          name="title"
          placeholder="Title here"
          className="bg-transparent text-sm text-white placeholder:text-neutral-600
           outline-none border border-zinc-800 py-2 px-3 rounded-xl"
        />
        <textarea
          name="content"
          placeholder="What's on your mind?"
          className="bg-transparent text-sm text-white placeholder:text-neutral-600
           outline-none border border-zinc-800 py-2 px-3 rounded-xl"
        />
        <SubmitButton ButtonTitle="Post" onPending="Posting" />
      </div>

      {state.message && state.error && (
        <div>
          <p className="text-xs text-red-400 px-1">✕ {state.message}</p>
          <p className="text-xs text-rose-400 px-1">✕ {state.error}</p>
        </div>
      )}
      {state.success === true && (
        <p className="text-xs text-emerald-400 px-1">✓ {state.message}</p>
      )}
    </form>
  );
}

export default PostForm;
