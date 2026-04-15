"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import {
  LoginByEmailAction,
  LoginByUsernameAction,
} from "@/lib/actions/auth.actions";

const initialState = { error: "", success: false };

function Login() {
  const [mode, setMode] = useState<"email" | "username">("email");

  const [emailState, emailFormAction, isEmailPending] = useActionState(
    LoginByEmailAction,
    initialState,
  );
  const [usernameState, usernameFormAction, isUsernamePending] = useActionState(
    LoginByUsernameAction,
    initialState,
  );

  const state = mode === "email" ? emailState : usernameState;
  const formAction = mode === "email" ? emailFormAction : usernameFormAction;
  const isPending = mode === "email" ? isEmailPending : isUsernamePending;

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
            Welcome Back
          </h1>
          <p className="text-zinc-400 text-sm">Sign in to your account</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-8 space-y-5">
          <div className="flex bg-zinc-950 border border-zinc-800 rounded-xl p-1">
            <button
              type="button"
              onClick={() => setMode("email")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition duration-200
                ${
                  mode === "email"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-zinc-400 hover:text-zinc-300"
                }`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => setMode("username")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition duration-200
                ${
                  mode === "username"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-zinc-400 hover:text-zinc-300"
                }`}
            >
              Username
            </button>
          </div>

          <form action={formAction} className="space-y-4">
            {mode === "email" ? (
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
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-10 pr-4 py-2.5
                    text-sm text-zinc-100 placeholder:text-zinc-600
                    outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50
                    transition duration-200"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Username
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">
                    @
                  </span>
                  <input
                    type="text"
                    name="username"
                    placeholder="johndoe"
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-7 pr-4 py-2.5
                    text-sm text-zinc-100 placeholder:text-zinc-600
                    outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50
                    transition duration-200"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Password
                </label>
                <span className="text-xs text-blue-400 hover:text-blue-300 cursor-pointer transition duration-200">
                  Forgot password?
                </span>
              </div>
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
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-10 pr-4 py-2.5
                  text-sm text-zinc-100 placeholder:text-zinc-600
                  outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50
                  transition duration-200"
                />
              </div>
            </div>

            {state.error && (
              <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl">
                {state.error}
              </div>
            )}
            {state.success && (
              <div className="flex items-start gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm p-3 rounded-xl">
                Logged in successfully! Redirecting...
              </div>
            )}

            <button
              disabled={isPending}
              type="submit"
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500
              text-white font-medium text-sm
              transition duration-200 active:scale-95 mt-2"
            >
              Sign In →
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-zinc-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-blue-400 hover:text-blue-300 font-medium transition duration-200"
          >
            Create one
          </Link>
        </p>

        <p className="text-center text-xs text-zinc-600">
          By signing in you agree to our{" "}
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

export default Login;
