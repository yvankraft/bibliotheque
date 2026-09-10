"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "../../api/lib/auth-client";
import UniversalModal from "../../components/UniversalModal";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // État uniquement pour la modale de succès
  const [successModal, setSuccessModal] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanUsername = name.trim();
    const cleanEmail = email.trim();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error: authError } = await authClient.signUp.email({
      email: cleanEmail,
      password: password,
      name: cleanUsername,
    });
    setLoading(false);

    if (authError) {
      console.error("Erreur d'inscription:", authError);

      let userFriendlyMessage = "An unexpected error occurred during signup.";

      if (authError.status === 422 || authError.code === "FAILED_TO_CREATE_USER") {
        userFriendlyMessage = "This username or email is already taken.";
      } else if (authError.code === "INVALID_EMAIL") {
        userFriendlyMessage = "Please enter a valid email address.";
      } else if (authError.code === "PASSWORD_TOO_SHORT") {
        userFriendlyMessage = "Password is too short.";
      } else if (authError.message) {
        userFriendlyMessage = authError.message;
      }

      setError(userFriendlyMessage);
    } else {
      setSuccessModal(true);
    }
  };

  const handleSocialSignIn = async (provider: "google") => {
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/dashboard",
      });
    } catch (err) {
      console.error(`Erreur de connexion avec ${provider}:`, err);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 flex items-center justify-center p-4 transition-colors duration-300">
      
      {/* Style CSS pour l'animation infinie des bulles montantes */}
      <style jsx global>{`
        @keyframes floatUp {
          0% {
            transform: translateY(120vh) scale(0.8);
            opacity: 0;
          }
          20% {
            opacity: 0.6;
          }
          80% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-20vh) scale(1.2);
            opacity: 0;
          }
        }
        .animate-bubble-1 {
          animation: floatUp 12s infinite linear;
        }
        .animate-bubble-2 {
          animation: floatUp 16s infinite linear 2s;
        }
        .animate-bubble-3 {
          animation: floatUp 10s infinite linear 4s;
        }
        .animate-bubble-4 {
          animation: floatUp 14s infinite linear 1s;
        }
      `}</style>

      <div className="w-full max-w-5xl bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        
        {/* Côté Gauche : Bulles animées lentes du bas vers le haut */}
        <div className="relative hidden lg:flex items-center justify-center bg-zinc-950 overflow-hidden p-12">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-zinc-900/40 to-slate-900/80 opacity-90" />

          {/* Container des bulles montantes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute left-[15%] w-36 h-36 rounded-full bg-gradient-to-br from-slate-500/30 to-indigo-500/20 backdrop-blur-md shadow-2xl animate-bubble-1" />
            <div className="absolute left-[55%] w-48 h-48 rounded-full bg-gradient-to-tr from-zinc-400/20 via-slate-600/30 to-purple-500/10 backdrop-blur-md shadow-2xl animate-bubble-2" />
            <div className="absolute left-[75%] w-24 h-24 rounded-full bg-gradient-to-bl from-white/20 to-slate-500/30 backdrop-blur-md shadow-xl animate-bubble-3" />
            <div className="absolute left-[35%] w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-400/20 to-slate-400/30 backdrop-blur-md shadow-lg animate-bubble-4" />
          </div>

          <div className="relative z-10 text-center space-y-2">
            <h1 className="text-7xl font-serif font-bold text-zinc-100 tracking-wider">Library</h1>
            <h2 className="text-2xl font-serif font-bold text-zinc-100 tracking-wider">Start Building</h2>
            <p className="text-xs uppercase tracking-widest text-zinc-400 font-mono">Visual Web Builder for Developers</p>
          </div>
        </div>

        {/* Côté Droit : Formulaire */}
        <div className="flex flex-col justify-center p-8 sm:p-12">
          <div className="max-w-md w-full mx-auto space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-serif font-bold tracking-tight">Create Account</h1>
              <p className="text-sm text-zinc-500 mt-2">Get started with your developer workspace</p>
            </div>

            {error && (
              <div className="p-3 text-xs bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-600 dark:text-zinc-400 mb-1.5">
                  Full Name / Username
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-600 dark:text-zinc-400 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-600 dark:text-zinc-400 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-600 dark:text-zinc-400 mb-1.5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-medium hover:opacity-90 transition disabled:opacity-50 text-sm shadow-sm mt-2 cursor-pointer"
              >
                {loading ? "Creating account..." : "Sign Up"}
              </button>
            </form>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
              <span className="flex-shrink mx-4 text-xs text-zinc-400 uppercase">Or</span>
              <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
            </div>

            <button
              onClick={() => handleSocialSignIn("google")}
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition text-sm font-medium cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              Sign Up with Google
            </button>

            <p className="text-center text-xs text-zinc-500">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-slate-500 font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>

      </div>

      <UniversalModal
        isOpen={successModal}
        onClose={() => {
          window.location.reload();
          setSuccessModal(false);
        }}
        title="Welcome Aboard"
        message="Your account has been successfully created!"
        type="success"
        confirmText="Log In"
        onConfirm={() => router.push("/auth/login")}
      />
    </div>
  );
}