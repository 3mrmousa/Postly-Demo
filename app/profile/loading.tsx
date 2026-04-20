import {
  ProfileSkeleton,
  PostSkeleton,
  Skeleton,
} from "@/components/shared/Fallbacks";

export default function ProfileLoading() {
  return (
    <div className="min-h-screen text-zinc-100 pb-20 w-full">
      <div className="w-full h-48 bg-zinc-900 overflow-hidden relative -z-10" />

      <div className="max-w-2xl mx-auto px-4">
        <div className="-mt-12 z-20">
          <ProfileSkeleton />
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div
            className="bg-purple-500/5 border border-purple-500/20
          rounded-2xl p-4 flex flex-col items-center justify-center"
          >
            <Skeleton className="w-6 h-6 rounded mb-1" />
            <p className="text-zinc-500 text-xs mt-1">Posts</p>
          </div>
          <div
            className="bg-purple-500/5 border border-purple-500/20
          rounded-2xl p-4 flex flex-col items-center justify-center"
          >
            <Skeleton className="w-6 h-6 rounded mb-1" />
            <p className="text-zinc-500 text-xs mt-1">Followers</p>
          </div>
          <div
            className="bg-purple-500/5 border border-purple-500/20
          rounded-2xl p-4 flex flex-col items-center justify-center"
          >
            <Skeleton className="w-6 h-6 rounded mb-1" />
            <p className="text-zinc-500 text-xs mt-1">Following</p>
          </div>
        </div>

        <div className="w-full max-w-2xl px-4">
          <div className="border-t border-purple-500/20 mb-6" />

          <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-6 mb-10">
            <h2 className="flex text-sm font-medium text-purple-400 uppercase tracking-wider mb-4">
              POSTS (<Skeleton className="w-4 h-4 rounded" />)
            </h2>
            <div className="flex flex-col gap-3">
              <PostSkeleton />
              <PostSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
