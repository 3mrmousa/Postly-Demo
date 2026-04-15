import { logoutAction } from "@/lib/actions/auth.actions";
import { getMe } from "@/lib/auth/getMe";
import Link from "next/link";

async function Nav() {
  const user = await getMe();

  return (
    <nav
      className="bg-zinc-900 py-4 px-5 
    fixed w-full"
    >
      <div className="w-full flex justify-between">
        <Link
          href="/"
          className="text-white font-bold text-lg tracking-tight hover:text-blue-400 transition duration-200"
        >
          Postly
        </Link>

        {user ? (
          <div className="flex items-center gap-3">
            <Link
              href="/profile"
              className="flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition duration-200"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xs font-bold">
                {user.username?.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:block">{user.username}</span>
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="text-sm px-4 py-1 rounded-xl
                border border-zinc-700 text-zinc-400
                hover:border-red-500/50 hover:bg-red-500/10 hover:scale-105
                duration-300 cursor-pointer"
              >
                Logout
              </button>
            </form>
          </div>
        ) : (
          <ul className="flex items-center gap-2">
            <li>
              <Link
                href="/login"
                className="text-sm px-4 py-2 rounded-xl border border-zinc-700 text-zinc-400
                hover:border-zinc-500 hover:text-white
                transition duration-200"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="text-sm px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500
                text-white font-medium transition duration-200 active:scale-95"
              >
                Register
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Nav;
