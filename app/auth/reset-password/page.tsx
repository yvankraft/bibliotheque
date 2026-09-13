"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/app/api/lib/auth-client";
import { Suspense } from "react";

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);


  const router = useRouter();
  const searchParams = useSearchParams();
  // Récupère le token depuis l'URL (?token=...)
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (!token) {
      setError(
        "Reset token is missing. Please request a new link.",
      );
      setLoading(false);
      return;
    }

    await authClient.resetPassword(
      {
        newPassword: password,
        token: token, // Transmet explicitement le token ici
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          setLoading(false);
          setSuccess(true);
          setTimeout(() => {
            router.push("/auth/login");
          }, 3000);
        },
        onError: (ctx) => {
          setLoading(false);
          setError(
            (ctx.error.message || "Failed to reset password.") ?? "Failed to reset password.",
          );
        },
      },
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black p-4">
      <div className="w-full max-w-[320px] space-y-12">
        <div className="text-center space-y-2">
          <h1 className="text-[10px] uppercase tracking-[0.3em] text-black dark:text-white">
            Set New Password
          </h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-800 dark:text-zinc-400">
            Please enter your new password below.
          </p>
        </div>

        {success ? (
          <div className="text-[10px] uppercase tracking-[0.2em] text-sky-400 dark:text-sky-300 text-center border-b border-sky-400 dark:border-sky-300 pb-4">
            Your password has been successfully updated.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <input
                type="password"
                required
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-800 py-2 text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-black dark:focus:border-white outline-none transition text-[10px] uppercase tracking-[0.2em]"
                disabled={loading}
              />
              <input
                type="password"
                required
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-800 py-2 text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-sky-400 dark:focus:border-sky-300 outline-none transition text-[10px] uppercase tracking-[0.2em]"
                disabled={loading}
              />
            </div>

            {error && (
              <div className="text-[10px] uppercase tracking-[0.2em] text-red-900 border border-red-900 p-4">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full text-[10px] uppercase tracking-[0.3em] text-black dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-white transition duration-500 border border-zinc-300 dark:border-zinc-800 py-4 active:scale-95 disabled:opacity-30"
            >
              {loading ? "Loading..." : "Confirm"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="h-screen flex items-center justify-center text-sky-300">
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
