import { getMe } from "@/lib/auth/getMe";
import Link from "next/link";

export default async function Home() {
  const user = await getMe();

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center px-4 gap-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <div
          className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20
        text-purple-400 text-xs font-medium mb-2 animate-fade-in"
        >
          Share with the world
        </div>
        <h1 className="text-6xl font-black text-white tracking-tight animate-fade-in-up">
          Post<span className="text-purple-500 animate-glow">Node</span>
        </h1>
        <p className="text-zinc-500 text-lg max-w-sm leading-relaxed animate-fade-in">
          Share what&apos;s on your mind with the world — simply and
          beautifully.
        </p>
      </div>

      <div className="animate-fade-in">
        {user ? (
          <Link
            href="/feed"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500
          text-white text-sm font-semibold rounded-xl
          transition duration-200 active:scale-95"
          >
            Go to Feed →
          </Link>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-3">
              <Link
                href="/login"
                className="px-6 py-3 rounded-xl border border-zinc-700 text-zinc-300
              hover:border-zinc-500 hover:text-white text-sm font-medium
              transition duration-200"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500
              text-white text-sm font-semibold
              transition duration-200 active:scale-95"
              >
                Register →
              </Link>
            </div>

            <Link
              href="/feed"
              className="text-sm font-medium text-zinc-500 hover:text-zinc-300 
            transition duration-200"
            >
              Or browse as a guest
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
