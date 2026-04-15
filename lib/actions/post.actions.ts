"use server";

import {
  addComment,
  createPost,
  deleteComment,
  deletePost,
  toggleLike,
  updatePost,
} from "@/lib/services/post.service";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getMe } from "../auth/getMe";
import { FormState } from "@/types/types";

const PostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required at least 1 char")
    .max(30, "Title must be less than 30 chars"),

  content: z
    .string()
    .trim()
    .min(1, "Content is required at least 1 char")
    .max(500, "Content must be less than 500 chars"),
});

const CommentsSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Comment cannot be empty")
    .max(250, "Comment must be less than 250 chars"),
});



export async function createPostAction(
  prevState: FormState,
  formData: FormData,
) {
  const user = await getMe();
  if (!user)
    return {
      success: false,
      message: "Unauthorized",
      error: "Unauthorized",
      data: undefined,
    };

  const raw = Object.fromEntries(formData);
  const result = PostSchema.safeParse(raw);

  if (!result.success) {
    return {
      success: false,
      message: "Please fix the errors and try again",
      error: result.error.issues.map((i) => i.message).join(", "),
    };
  }

  try {
    await createPost(
      result.data.title,
      result.data.content,
      user._id.toString(),
    );
    revalidatePath("/");
    return { success: true, message: "Post added successfully", error: null };
  } catch {
    return {
      success: false,
      message: "Something went wrong",
      error: "Server error",
    };
  }
}

export async function updatePostAction(
  prevState: FormState,
  formData: FormData,
) {
  const user = await getMe();
  if (!user)
    return {
      success: false,
      message: "Unauthorized",
      error: "Unauthorized",
      data: undefined,
    };

  const raw = Object.fromEntries(formData);

  const postId = raw.postId as string;

  const result = PostSchema.safeParse(raw);

  if (!result.success) {
    return {
      success: false,
      message: "Please fix the errors and try again",
      error: result.error.issues.map((i) => i.message).join(", "),
    };
  }

  await updatePost(
    postId,
    result.data.title,
    result.data.content,
    user._id.toString(),
  );
  revalidatePath("/");
  return {
    success: true,
    message: "Post added successfully",
    data: { title: result.data.title },
  };
}

export async function deletePostAction(postId: string) {
  const user = await getMe();
  if (!user)
    return {
      success: false,
      message: "Unauthorized",
      error: "Unauthorized",
      data: undefined,
    };
  await deletePost(postId, user._id.toString());
  revalidatePath("/");

  return {
    success: true,
    message: "Post deleted successfully",
  };
}

export async function toggleLikeAction(postId: string) {
  const user = await getMe();
  if (!user)
    return {
      success: false,
      message: "Unauthorized",
      error: "Unauthorized",
      data: undefined,
    };
  await toggleLike(postId, user._id.toString());
  revalidatePath("/");
  return {
    success: true,
    message: "Like updated",
    error: null,
    data: undefined,
  };
}

export async function addCommentAction(
  prevState: FormState,
  formData: FormData,
) {
  const user = await getMe();
  if (!user)
    return {
      success: false,
      message: "Unauthorized",
      error: "Unauthorized",
      data: undefined,
    };

  const result = CommentsSchema.safeParse({
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      success: false,
      message: "Please fix the errors and try again",
      error: result.error.issues.map((i) => i.message).join(", "),
    };
  }

  const postId = formData.get("postId") as string;

  if (!postId)
    return {
      success: false,
      message: "Post not found",
      error: "Post not found",
    };
try {
  await addComment(postId, user._id.toString(), result.data.content);
  revalidatePath("/");
  return {
    success: true,
    message: "Comment has been added",
    error: null, 
  };
} catch {
  return {
    success: false,
    message: "Something went wrong",
    error: "Server error",
  };
}
}

export async function deleteCommentAction(postId: string, commentId: string) {
  const user = await getMe();
  if (!user)
    return {
      success: false,
      message: "Unauthorized",
      error: "Unauthorized",
      data: undefined,
    };

  await deleteComment(postId, user._id.toString(), commentId);
  revalidatePath("/");
  return {
    success: true,
    message: "Comment deleted",
    error: null,
    data: undefined,
  };
}
