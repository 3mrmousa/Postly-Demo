import { Post } from "@/types/types";
import LikeButton from "./LikeButton";
import CommentsButton from "./CommentsButton";

function PostItem({
  post,
  currentUserId,
}: {
  post: Post;
  currentUserId: string;
}) {
  const isLiked = (post.likes || []).includes(currentUserId);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 
        flex items-center justify-center text-blue-400 text-md font-bold"
        >
          {post.user.username.charAt(0).toUpperCase()}
        </div>
        <span className="text-zinc-500 text-sm">@{post.user.username}</span>
      </div>

      <p
        className="text-zinc-100 text-md font-semibold bg-zinc-800 p-3
      rounded-lg"
      >
        {post.title}
      </p>

      <div className="flex items-center gap-5 mt-2">
        <LikeButton
          postId={post.id}
          likesCount={post.likesCount}
          isLiked={isLiked}
        />
        <CommentsButton post={post} commentsCount={post.commentsCount}/>
      </div>
    </div>
  );
}

export default PostItem;
