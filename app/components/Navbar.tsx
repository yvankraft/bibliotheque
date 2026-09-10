"use client";
import Link from "next/link";
import { Tooltip } from "./Tooltip";
import { useState, useEffect } from "react";
import { Menu, X, Search, LayoutDashboard, LogIn } from "lucide-react";
import { authClient } from "../lib/auth-client";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      if (data) {
        setUser(data.user);
      }
      setLoading(false);
    });
  }, []);

  return (
    <nav className="fixed bg-white dark:bg-zinc-950 z-50 top-0 left-0 right-0 border border-gray-500 w-full max-w-[1600px] mx-auto px-6 h-16 flex justify-between items-center">
      
      {/* Logo / Titre */}
      <div>
        <Tooltip text="home">
          <Link href="/">
            <span className="title font-bold text-lg">Library</span>
          </Link>
        </Tooltip>
      </div>

      {/* Liens Desktop */}
      <div className="hidden md:flex items-center gap-6">
        <Tooltip text="go to components page">
          <Link href="/composants">
            <span className="text-black/40 dark:text-white/40 hover:text-black/80 dark:hover:text-white/80 transition duration-300 hover:cursor-pointer">
              Components
            </span>
          </Link>
        </Tooltip>
        <Tooltip text="Go to documentation">
          <Link href="/documentation">
            <span className="text-black/40 dark:text-white/40 hover:text-black/80 dark:hover:text-white/80 transition duration-300 hover:cursor-pointer">
              Documentation
            </span>
          </Link>
        </Tooltip>
        <Tooltip text="go to show page">
          <Link href="/Demo">
            <span className="text-black/40 dark:text-white/40 hover:text-black/80 dark:hover:text-white/80 transition duration-300 hover:cursor-pointer">
              Demo
            </span>
          </Link>
        </Tooltip>
      </div>

      {/* Actions (Bouton Connexion/Dashboard + Recherche mobile + Burger) */}
      <div className="flex items-center gap-3">
        {/* Bouton Dynamique Connexion / Dashboard (Desktop & Tablette) */}
        {!loading && (
          <div className="hidden sm:block">
            {user ? (
              <Link href="/dashboard">
                <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black text-xs font-semibold hover:opacity-90 transition cursor-pointer">
                  <LayoutDashboard size={14} />
                  <span>Dashboard</span>
                </button>
              </Link>
            ) : (
              <Link href="/auth/login">
                <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition cursor-pointer">
                  <LogIn size={14} />
                  <span>Se connecter</span>
                </button>
              </Link>
            )}
          </div>
        )}

        {/* Recherche Mobile */}
        <div className="relative md:hidden flex items-center">
          <div
            className={`absolute right-full mr-2 flex items-center transition-all duration-500 ease-out overflow-hidden ${isSearchOpen ? "w-48 opacity-100" : "w-0 opacity-0"}`}
          >
            <input
              type="text"
              placeholder="Rechercher..."
              className="backdrop-blur-2xl bg-white z-[200] dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-full w-full py-1.5 px-4 text-xs focus:outline-none focus:ring-1 focus:ring-gray-500 transition duration-300"
            />
          </div>
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="z-10 p-2 cursor-pointer"
          >
            {isSearchOpen ? <X size={20} /> : <Search size={20} />}
          </button>
        </div>

        {/* Menu Burger (Mobile) */}
        <button
          className="md:hidden p-2 text-slate-900 dark:text-slate-50 z-20 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Menu latéral (Mobile) */}
      <div
        className={
          "fixed inset-0 transition-visibility z-[100] duration-300 " +
          (isOpen ? "visible" : "invisible")
        }
      >
        <div
          className={
            "absolute inset-0 bg-slate-900/20 h-screen w-screen backdrop-blur-sm transition-opacity duration-300 " +
            (isOpen ? "opacity-100" : "opacity-0")
          }
          onClick={() => setIsOpen(false)}
        />

        <div
          className={
            "absolute right-0 top-0 w-[300px] h-full z-[200] bg-white dark:bg-zinc-950 backdrop-blur-2xl border-l border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out " +
            (isOpen ? "translate-x-0" : "translate-x-full")
          }
        >
          <div>
            <div className="flex justify-between items-center mb-6 w-full">
              <span className="title font-bold text-base">Menu</span>
              <button onClick={() => setIsOpen(false)} className="cursor-pointer">
                <X size={22} />
              </button>
            </div>

            <nav
              className="flex flex-col gap-4 w-full"
              onClick={() => setIsOpen(false)}
            >
              <Link className="flex justify-between py-2 border-b border-zinc-200 dark:border-zinc-800 text-sm" href="/composants">
                <span>Components</span>
              </Link>
              <Link className="flex justify-between py-2 border-b border-zinc-200 dark:border-zinc-800 text-sm" href="/documentation">
                <span>Documentation</span>
              </Link>
              <Link className="flex justify-between py-2 border-b border-zinc-200 dark:border-zinc-800 text-sm" href="/">
                <span>Home</span>
              </Link>
              <Link className="flex justify-between py-2 border-b border-zinc-200 dark:border-zinc-800 text-sm" href="/Demo">
                <span>Demo</span>
              </Link>
            </nav>
          </div>

          {!loading && (
            <div className="w-full pt-4">
              {user ? (
                <Link
                  href="/dashboard"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black text-xs font-semibold"
                >
                  <LayoutDashboard size={14} />
                  <span>Dashboard</span>
                </Link>
              ) : (
                <Link
                  href="/auth/login"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-medium"
                >
                  <LogIn size={14} />
                  <span>Se connecter</span>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;