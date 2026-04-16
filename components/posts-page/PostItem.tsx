import { Post } from "@/types/types";
import LikeButton from "./LikeButton";
import CommentsButton from "./CommentsButton";
import Link from "next/link";

function PostItem({
  post,
  currentUserId,
  isAuth,
}: {
  post: Post;
  currentUserId: string;
  isAuth: boolean;
}) {
  const isLiked = (post.likes || []).includes(currentUserId);

  return (
    <div
      className="bg-zinc-900/70 border-2 border-purple-800/30 rounded-2xl p-5
    hover:border-purple-700/50 transition duration-200"
    >
      <div className="flex items-center gap-3 mb-4">
        <Link href={`/${post.user.username}`}>
          <div
            className="w-9 h-9 rounded-full bg-blue-600/20 border border-blue-500/30 
        flex items-center justify-center text-blue-400 text-sm font-bold shrink-0"
          >
            {post.user.username.charAt(0).toUpperCase()}
          </div>
        </Link>
        <div>
          <p className="text-white text-sm font-medium">{post.user.username}</p>
          <p className="text-zinc-500 text-xs">@{post.user.username}</p>
        </div>
      </div>

      <div className="mb-4 space-y-1">
        <p className="text-white font-semibold">{post.title}</p>
        {post.content && (
          <p className="text-zinc-400 text-sm leading-relaxed">
            {post.content}
          </p>
        )}
      </div>

      <div className="border-t border-zinc-800 pt-3 flex items-center gap-5">
        <LikeButton
          postId={post.id}
          likesCount={post.likesCount}
          isLiked={isLiked}
          isAuth={isAuth}
        />
        <CommentsButton post={post} commentsCount={post.commentsCount} />
      </div>
    </div>
  );
}

export default PostItem;
