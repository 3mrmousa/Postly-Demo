export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-zinc-600/50 ${className}`} />;
}

export function PostSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-5 rounded-2xl bg-[#2a2a2a]/50 border border-zinc-800/50 mb-4">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-24 h-3" />
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-5/6 h-4" />
        <Skeleton className="w-4/6 h-4" />
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="flex flex-col items-start gap-2">
      <Skeleton className="w-24 h-24 rounded-2xl border-4 border-black" />
      <div className="flex flex-col gap-5 mb-5">
        <Skeleton className="w-32 h-6" />
        <Skeleton className="w-16 h-2" />
        <Skeleton className="w-16 h-2" />
      </div>
    </div>
  );
}

export function ListItemSkeleton() {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-zinc-800/50">
      <Skeleton className="w-10 h-10 rounded-full" />
      <Skeleton className="w-40 h-4" />
    </div>
  );
}
