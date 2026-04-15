import { getMe } from "@/lib/auth/getMe";
import PostForm from "./PostForm";
import Link from "next/link";

async function PostFormWarper() {
  const user = await getMe();
  console.log(user);

  return (
    <>
      {user ? (
        <PostForm />
      ) : (
        <div className="text-2xl text-center my-5 animate-pulse">
          Please{" "}
          <Link className="text-blue-500" href="/login">
            Login
          </Link>{" "}
          or{" "}
          <Link className="text-blue-500" href="/register">
            Register
          </Link>{" "}
          to can post
        </div>
      )}
    </>
  );
}

export default PostFormWarper;
