"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";
import { withTimeout } from "@/app/lib/with-timeout";
import { CheckCircle2 } from "lucide-react";

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!token) {
      setError("Reset token is missing. Please request a new link.");
      return;
    }

    setLoading(true);

    try {
      await withTimeout(authClient.resetPassword(
        { newPassword: password, token },
        {
          onSuccess: () => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => router.push("/auth/login"), 3000);
          },
          onError: (ctx) => {
            setLoading(false);
            setError(ctx.error.message || "Failed to reset password.");
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
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-serif font-bold tracking-tight">
            Set New Password
          </h1>
          <p className="text-sm text-zinc-500">
            Choose a strong password for your account.
          </p>
        </div>

        {error && (
          <div className="p-3 text-sm bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-center">
            {error}
          </div>
        )}

        {success ? (
          <div className="flex flex-col items-center gap-4 p-6 text-center bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <CheckCircle2 size={28} className="text-emerald-500" />
            <p className="text-sm text-emerald-600 dark:text-emerald-400">
              Your password has been updated. Redirecting you to sign in…
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="password"
                className="block text-xs uppercase tracking-wider font-semibold text-zinc-600 dark:text-zinc-400 mb-2"
              >
                New Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 transition disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-xs uppercase tracking-wider font-semibold text-zinc-600 dark:text-zinc-400 mb-2"
              >
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 transition disabled:opacity-60"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-medium hover:opacity-90 transition disabled:opacity-50 text-sm shadow-sm cursor-pointer"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}

        <p className="text-center text-xs text-zinc-500">
          Back to{" "}
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

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950 font-mono text-xs text-zinc-400">
      Loading...
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
