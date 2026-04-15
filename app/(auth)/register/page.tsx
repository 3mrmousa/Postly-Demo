"use client";

import { useActionState } from "react";
import { RegisterAction } from "@/lib/actions/auth.actions";
import Link from "next/link";

const initialState = { error: "", success: false };

function Register() {
  const [state, formAction, isPending] = useActionState(
    RegisterAction,
    initialState,
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 py-10">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 mb-2">
            <svg
              className="w-6 h-6 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Create Account
          </h1>
          <p className="text-zinc-400 text-sm">
            Join us and start your journey today
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-8">
          <form action={formAction} className="space-y-5">
            <div className="flex gap-3">
              <div className="flex-1 space-y-1.5">
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  First Name
                </label>
                <input
                  name="firstName"
                  placeholder="John"
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5
                  text-sm text-zinc-100 placeholder:text-zinc-600
                  outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50
                  transition duration-200"
                />
              </div>
              <div className="flex-1 space-y-1.5">
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Last Name
                </label>
                <input
                  name="lastName"
                  placeholder="Doe"
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5
                  text-sm text-zinc-100 placeholder:text-zinc-600
                  outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50
                  transition duration-200"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">
                  @
                </span>
                <input
                  name="username"
                  placeholder="johndoe"
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-7 pr-4 py-2.5
                  text-sm text-zinc-100 placeholder:text-zinc-600
                  outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50
                  transition duration-200"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Email
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <input
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-10 pr-4 py-2.5
                  text-sm text-zinc-100 placeholder:text-zinc-600
                  outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50
                  transition duration-200"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <input
                  name="password"
                  type="password"
                  placeholder="Min. 8 characters"
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-10 pr-4 py-2.5
                  text-sm text-zinc-100 placeholder:text-zinc-600
                  outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50
                  transition duration-200"
                />
              </div>
            </div>

            {state.error && (
              <div
                className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 
              text-red-400 text-sm p-3 rounded-xl"
              >
                {state.error}
              </div>
            )}

            {state.success && (
              <div
                className="flex items-start gap-2 bg-emerald-500/10 border border-emerald-500/20 
              text-emerald-400 text-sm p-3 rounded-xl"
              >
                Account created successfully! Redirecting...
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500
              text-white font-medium text-sm
              transition duration-200 active:scale-95
              disabled:opacity-60 disabled:cursor-not-allowed
              disabled:animate-pulse mt-2"
            >
              {isPending ? "Creating Account..." : "Create Account →"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-400 hover:text-blue-300 font-medium transition duration-200"
          >
            Sign in
          </Link>
        </p>

        <p className="text-center text-xs text-zinc-600">
          By creating an account you agree to our{" "}
          <span className="text-zinc-500 hover:text-zinc-400 cursor-pointer transition">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="text-zinc-500 hover:text-zinc-400 cursor-pointer transition">
            Privacy Policy
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
