"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import { withTimeout } from "@/app/lib/with-timeout";
import { ArrowLeft, MailCheck } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      await withTimeout(authClient.requestPasswordReset(
        {
          email,
          redirectTo: "/auth/reset-password",
        },
        {
          onSuccess: () => {
            setLoading(false);
            setSuccess(true);
          },
          onError: () => {
            setLoading(false);
            setError(
              "There was an error sending the reset link. Please try again.",
            );
          },
        },
      ));
    } catch {
      setLoading(false);
      setError("Network error — the server is unreachable. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl p-8 sm:p-10 space-y-8">
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition"
        >
          <ArrowLeft size={14} />
          Back to login
        </Link>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-serif font-bold tracking-tight">
            Forgot Password
          </h1>
          <p className="text-sm text-zinc-500">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
        </div>

        {error && (
          <div className="p-3 text-sm bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-center">
            {error}
          </div>
        )}

        {success ? (
          <div className="flex flex-col items-center gap-4 p-6 text-center bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <MailCheck size={28} className="text-emerald-500" />
            <p className="text-sm text-emerald-600 dark:text-emerald-400">
              A reset link has been sent to{" "}
              <span className="font-semibold">{email}</span>. Check your inbox.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
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
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 transition disabled:opacity-60"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-medium hover:opacity-90 transition disabled:opacity-50 text-sm shadow-sm cursor-pointer"
            >
              {loading ? "Sending reset link..." : "Send reset link"}
            </button>
          </form>
        )}

        <p className="text-center text-xs text-zinc-500">
          Remember your password?{" "}
          <Link
            href="/auth/login"
            className="text-slate-500 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
