import { getMe } from "@/lib/auth/getMe";
import PostForm from "./PostForm";
import Link from "next/link";

async function PostFormWrapper() {
  const user = await getMe();

  return (
    <>
      {user ? (
        <PostForm />
      ) : (
        <div
          className="flex flex-col items-center gap-4 py-6 px-4 
        bg-zinc-900 border border-zinc-800 rounded-2xl text-center"
        >
          <div
            className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700
          flex items-center justify-center"
          >
            <svg
              className="w-6 h-6 text-zinc-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <div className="space-y-1">
            <p className="text-white font-semibold">Join the conversation</p>
            <p className="text-zinc-500 text-sm">
              Login or create an account to start posting
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/login"
              className="px-5 py-2 rounded-xl border border-zinc-700 text-zinc-300
              hover:border-zinc-500 hover:text-white text-sm font-medium
              transition duration-200"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500
              text-white text-sm font-medium transition duration-200 active:scale-95"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default PostFormWrapper;
