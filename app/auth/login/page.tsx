"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";
import { withTimeout } from "@/app/lib/with-timeout";
import AuthSidePanel from "../components/AuthSidePanel";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error } = await withTimeout(authClient.signIn.email({
        email,
        password,
      }));

      if (error) {
        setError(error.message || "Invalid email or password");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await withTimeout(authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      }));
    } catch {
      setError("Network error — the server is unreachable. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 p-4 transition-colors duration-300">
      <div className="w-full max-w-5xl bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        {/* Côté Gauche : Bulles animées */}
        <AuthSidePanel tagline="Reinventing No-Code" />

        {/* Côté Droit : Formulaire de Connexion */}
        <div className="flex flex-col justify-center p-8 sm:p-12">
          <div className="max-w-md w-full mx-auto space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-serif font-bold tracking-tight">
                Welcome Back
              </h1>
              <p className="text-sm text-zinc-500 mt-2">
                Enter your email and password to access your account
              </p>
            </div>

            {error && (
              <div className="p-3 text-sm bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSignIn} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs uppercase tracking-wider font-semibold text-zinc-600 dark:text-zinc-400 mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 transition"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-xs uppercase tracking-wider font-semibold text-zinc-600 dark:text-zinc-400 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 transition"
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center space-x-2 cursor-pointer text-zinc-600 dark:text-zinc-400">
                  <input
                    type="checkbox"
                    className="rounded border-zinc-300 dark:border-zinc-700 text-slate-600 focus:ring-slate-500"
                  />
                  <span>Remember me</span>
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="hover:underline text-zinc-600 dark:text-zinc-400"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-medium hover:opacity-90 transition disabled:opacity-50 text-sm shadow-sm cursor-pointer"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
              <span className="flex-shrink mx-4 text-xs text-zinc-400 uppercase">
                Or
              </span>
              <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition text-sm font-medium cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              Sign In with Google
            </button>

            <p className="text-center text-xs text-zinc-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-slate-500 font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
