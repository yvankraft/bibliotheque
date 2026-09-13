"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/app/api/lib/auth-client";

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

    await authClient.requestPasswordReset(
      {
        email,
        redirectTo: "/auth/reset-password",
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          setLoading(false);
          setSuccess(true);
          setError("");
        },
        onError: () => {
          setLoading(false);
          setSuccess(false);
          setError("There was an error sending the reset link. Please try again.");
        },
      },
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-white dark:bg-black text-black dark:text-white antialiased font-sans transition-colors duration-500">
      <div className="w-full max-w-sm space-y-12">
        {/* Navigation */}
        <Link
          href="/auth/login"
          className="text-zinc-400 dark:text-zinc-600 hover:text-bleu-500 transition text-[10px] uppercase tracking-[0.3em] inline-block"
        >
          ← Go Back
        </Link>

        {/* Header */}
        <div className="space-y-4">
          <h1 className="font-serif text-3xl tracking-wide">
            Forgot Password
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
            Enter your email address below and we'll send you a link to reset your password.
          </p>
        </div>

        {/* Logique d'affichage */}
        {error ? (
          <div className="p-6 text-xs text-red-600 dark:text-red-500 border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-950/5 ">
            <p>{error}</p>
            <Link
              href="/auth/signup"
              className="block mt-4 font-bold underline text-black dark:text-white hover:text-bleu-500 transition text-[10px] uppercase tracking-[0.2em]"
            >
              Create an Account
            </Link>
          </div>
        ) : success ? (
          <div className="p-6 text-xs text-bleu-500 border border-bleu-500/20 bg-bleu-500/5 ">
            A reset link has been sent to your email.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-1">
              <input
                id="email"
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-zinc-300 dark:border-zinc-800 bg-transparent py-3 focus:outline-none focus:border-bleu-500 transition duration-500 placeholder-zinc-400 dark:placeholder-zinc-700 text-sm tracking-widest"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full border border-bleu-500 text-bleu-500 py-4  font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-bleu-500 hover:text-white dark:hover:text-black transition duration-500 disabled:opacity-50 active:scale-95"
            >
              {loading ? "Sending reset link..." : "Send reset link"}
            </button>
          </form>
        )}

        <div className="text-center text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
          <Link
            href="/auth/login"
            className="hover:text-black dark:hover:text-white transition"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
