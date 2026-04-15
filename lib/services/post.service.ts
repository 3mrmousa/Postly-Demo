import mongoose from "mongoose";
import { connectDB } from "../mongodb";
import Post from "@/models/post.model";

export async function toggleLike(postId: string, userId: string) {
  await connectDB();

  const post = await Post.findById(postId);
  if (!post) throw new Error("Post not found");

  const alreadyLiked = (post.likes || []).some(
    (id: mongoose.Types.ObjectId) => id.toString() === userId,
  );

  if (alreadyLiked) {
    await Post.findByIdAndUpdate(postId, {
      $pull: { likes: userId },
    });
  } else {
    await Post.findByIdAndUpdate(postId, {
      $push: { likes: userId },
    });
  }
}

export async function addComment(
  postId: string,
  userId: string,
  content: string,
) {
  await connectDB();

  await Post.findByIdAndUpdate(
    postId,
    {
      $push: {
        comments: {
          user: new mongoose.Types.ObjectId(userId),
          content,
        },
      },
    },
    { new: true },
  );
}

export async function deleteComment(
  postId: string,
  userId: string,
  commentId: string,
) {
  await connectDB();

  await Post.findByIdAndUpdate(postId, {
    $pull: {
      comments: {
        _id: new mongoose.Types.ObjectId(commentId),
        user: new mongoose.Types.ObjectId(userId),
      },
    },
  });
}

export async function getPosts() {
  await connectDB();
  const posts = await Post.find()
    .populate("user", "username")
    .sort({ createdAt: -1 })
    .lean();

  await Post.populate(posts, {
    path: "comments.user",
    select: "username",
    strictPopulate: false,
  });

  return posts.map((post) => ({
    id: post._id.toString(),
    title: post.title,
    content: post.content,
    user: {
      id: post.user._id.toString(),
      username: post.user.username,
    },
    likes: (post.likes || []).map((id: mongoose.Types.ObjectId) =>
      id.toString(),
    ),
    likesCount: post.likes?.length || 0,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    comments: (post.comments || []).map((comment: any) => ({
      id: comment._id.toString(),
      content: comment.content,
      createdAt: comment.createdAt?.toString() ?? "",
      user: {
        id: comment.user?._id?.toString() ?? "",
        username: comment.user?.username ?? "",
      },
    })),
    commentsCount: post.comments?.length || 0,
    createdAt: post.createdAt.toISOString(),
  }));
}

export async function getUserPosts(userId: string) {
  await connectDB();
  const posts = await Post.find({ user: userId })
    .populate("user", "username")
    .sort({ createdAt: -1 })
    .lean();
  return posts.map((post) => ({
    id: post._id.toString(),
    title: post.title,
    content: post.content,
    user: {
      id: post.user._id.toString(),
      username: post.user.username,
    },
    likes: (post.likes || []).map((id: mongoose.Types.ObjectId) =>
      id.toString(),
    ),
    likesCount: post.likes?.length || 0,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    comments: (post.comments || []).map((comment: any) => ({
      id: comment._id.toString(),
      content: comment.content,
      createdAt: comment.createdAt?.toString() ?? "",
      user: {
        id: comment.user?._id?.toString() ?? "",
        username: comment.user?.username ?? "",
      },
    })),
    commentsCount: post.comments?.length || 0,
    createdAt: post.createdAt.toISOString(),
  }));
}

export async function createPost(
  title: string,
  content: string,
  userId: string,
) {
  await connectDB();
  const post = await Post.create({
    title,
    content,
    user: new mongoose.Types.ObjectId(userId),
  });
  return {
    id: post._id.toString(),
    title: post.title,
    content: post.content,
  };
}

export async function updatePost(
  postId: string,
  title: string,
  content: string,
  userId: string,
) {
  await connectDB();
  const post = await Post.findOneAndUpdate(
    { _id: postId, user: userId },
    { title, content },
  );
  if (!post) throw new Error("Post not found or unauthorized");
}

export async function deletePost(postId: string, userId: string) {
  await connectDB();
  await Post.findOneAndDelete({ _id: postId, user: userId });
}
