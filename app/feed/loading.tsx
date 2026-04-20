import { PostSkeleton, Skeleton } from "@/components/shared/Fallbacks";
export default function FeedLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10 gap-6 pt-30">
      <div className="w-full max-w-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-black text-white tracking-tight">
              Post<span className="text-purple-500">Node</span>{" "}
            </h1>
            <span
              className="px-2 py-0.5 rounded-full bg-purple-600/20 border border-purple-500/30
      text-purple-400 text-xs font-medium"
            >
              Beta
            </span>
          </div>
          <p className="text-zinc-500 text-sm">
            Share what&apos;s on your mind with the world
          </p>
        </div>

        <div className="border-t border-zinc-800 mt-5" />
      </div>
      <Skeleton className="w-full max-w-lg h-50 rounded-xl border border-zinc-800" />
      <div className="w-full max-w-lg flex flex-col gap-3">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    </div>
  );
}