import PostItem from "@/components/posts-page/PostItem";
import { getMe } from "@/lib/auth/getMe";
import { getUserPosts } from "@/lib/services/post.service";
import { Post } from "@/types/types";
import { redirect } from "next/navigation";

async function Profile() {
  const user = await getMe();
  const posts = await getUserPosts(user._id.toString());

  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="w-full h-48 bg-linear-to-r from-indigo-900 via-indigo-800 to-blue-900" />

      <div className="max-w-2xl mx-auto px-4">
        <div className="relative -mt-12 mb-4 flex items-end justify-between">
          <div
            className="w-24 h-24 rounded-2xl bg-indigo-600 border-4 border-zinc-950
          flex items-center justify-center text-3xl font-bold text-white shadow-xl"
          >
            {user.username?.charAt(0).toUpperCase()}
          </div>

          <button
            className="px-4 py-2 rounded-xl border border-zinc-700 text-zinc-400
          hover:border-zinc-500 hover:text-white text-sm font-medium transition duration-200"
          >
            Edit Profile
          </button>
        </div>

        <div className="space-y-1 mb-4">
          <h1 className="text-xl font-bold text-white">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-zinc-400 text-sm">@{user.username}</p>
        </div>

        <div className="border-t border-zinc-800 mb-6" />

        {/* <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-center">
            <p className="text-xl font-bold text-white">0</p>
            <p className="text-zinc-500 text-xs mt-1">Posts</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-center">
            <p className="text-xl font-bold text-white">0</p>
            <p className="text-zinc-500 text-xs mt-1">Followers</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-center">
            <p className="text-xl font-bold text-white">0</p>
            <p className="text-zinc-500 text-xs mt-1">Following</p>
          </div>
        </div> */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4">
            Posts
          </h2>
          {posts ? (
            posts.map((post: Post) => (
              <PostItem
                post={post}
                currentUserId={user._id.toString()}
                key={post.id}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 gap-2">
              <svg
                className="w-10 h-10 text-zinc-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <p className="text-zinc-500 text-sm">No posts yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
