import { getPosts } from "@/lib/posts-store";

export async function GET() {
  const posts = await getPosts();
  return Response.json({ posts });
}
