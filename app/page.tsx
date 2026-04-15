import PostFormWarper from "@/components/posts-page/PostFormWarper";
import PostItem from "@/components/posts-page/PostItem";
import { getMe } from "@/lib/auth/getMe";
import { getPosts } from "@/lib/services/post.service";

export default async function Home() {
  const [posts, user] = await Promise.all([getPosts(), getMe()]);

  return (
    <main className="min-h-screen bg-neutral-950 flex flex-col items-center px-4 py-10 gap-6">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-black text-white tracking-tight">
          Postly
        </h1>
        <p className="text-neutral-500 text-sm mt-1">
          Share what&apos;s on your mind.
        </p>
      </div>

      <div className="w-full max-w-lg">
        <PostFormWarper />
      </div>

      <div className="w-full max-w-lg flex flex-col gap-3">
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-neutral-800 p-10 text-center">
            <p className="text-neutral-500 text-sm">
              No posts yet. Be the first.
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <PostItem
              post={post}
              key={post.id}
              currentUserId={user?._id.toString()}
            />
          ))
        )}
      </div>
    </main>
  );
}
