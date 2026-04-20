import FollowButton from "@/components/posts-page/FollowButton";
import PostItem from "@/components/posts-page/PostItem";
import { getMe } from "@/lib/auth/getMe";
import { getUserPosts } from "@/lib/services/post.service";
import { getUserByUsername } from "@/lib/services/user.service";
import { Post } from "@/types/types";
import { redirect } from "next/navigation";

async function UserProfile({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const [user, currentUser] = await Promise.all([
    getUserByUsername(username),
    getMe(), 
  ]);

  if (!user) redirect("/feed");

  const posts = await getUserPosts(user.id);

  const isFollowing = (user.followers || []).includes(
    currentUser?._id?.toString() ?? "",
  );

  const isOwnProfile = currentUser?._id?.toString() === user.id;

  return (
    <div className="min-h-screen text-zinc-100 pb-20">
      <div
        className="w-full h-48 bg-linear-to-r from-purple-950 via-purple-900 to-indigo-950
       overflow-hidden -z-100"
      >
        <div
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-full h-32
        bg-purple-500/30 rounded-full blur-3xl -z-100"
        />
      </div>

      <div className="max-w-2xl mx-auto px-4">
        <div className="relative -mt-12 mb-4 flex items-end justify-between">
          <div
            className="w-24 h-24 rounded-2xl bg-linear-to-br from-purple-600 to-indigo-600
          border-4 border-zinc-950 flex items-center justify-center
          text-3xl font-bold text-white shadow-xl shadow-purple-900/50"
          >
            {user.username?.charAt(0).toUpperCase()}
          </div>

          {isOwnProfile ? (
            <button
              className="px-4 py-2 rounded-xl border border-purple-500/30 text-purple-400
            hover:bg-purple-500/10 hover:border-purple-400 text-sm font-medium transition duration-200"
            >
              Edit Profile
            </button>
          ) : (
            <FollowButton targetUserId={user.id} isFollowing={isFollowing} />
          )}
        </div>

        <div className="space-y-1 mb-4">
          <h1 className="text-xl font-bold text-white">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-purple-400 text-sm">@{user.username}</p>
          {user.email && <p className="text-zinc-500 text-xs">{user.email}</p>}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-4 text-center">
            <p className="text-xl font-bold text-white">{posts?.length || 0}</p>
            <p className="text-zinc-500 text-xs mt-1">Posts</p>
          </div>
          <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-4 text-center">
            <p className="text-xl font-bold text-white">
              {user.followersCount}
            </p>
            <p className="text-zinc-500 text-xs mt-1">Followers</p>
          </div>
          <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-4 text-center">
            <p className="text-xl font-bold text-white">
              {user.followingCount}
            </p>
            <p className="text-zinc-500 text-xs mt-1">Following</p>
          </div>
        </div>

        <div className="border-t border-purple-500/20 mb-6" />

        <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-6 mb-10">
          <h2 className="text-sm font-medium text-purple-400 uppercase tracking-wider mb-4">
            Posts ({posts?.length || 0})
          </h2>

          {posts && posts.length > 0 ? (
            <div className="flex flex-col gap-3">
              {posts.map((post: Post) => (
                <PostItem
                  post={post}
                  currentUserId={currentUser?._id?.toString() ?? ""}
                  key={post.id}
                  isAuth={!!currentUser}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <div
                className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20
              flex items-center justify-center"
              >
                <svg
                  className="w-7 h-7 text-purple-500/50"
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
              </div>
              <p className="text-zinc-500 text-sm">No posts yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
