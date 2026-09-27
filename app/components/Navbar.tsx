"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { BookOpen, Boxes, LayoutDashboard, Loader2, LogIn, Menu, Rocket, X } from "lucide-react";
import { authClient } from "@/app/lib/auth-client";
import { withTimeout } from "@/app/lib/with-timeout";
import { useLanguage } from "@/app/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-sm font-black text-white shadow-sm dark:bg-zinc-100 dark:text-zinc-900">
        L
      </span>
      <span className="text-lg font-bold tracking-tight">Library</span>
      <span className="rounded-full bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-600 dark:bg-zinc-500/15 dark:text-zinc-400">
        Beta
      </span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // Referme le menu mobile quand la route change (ajustement pendant le render)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => scrollY.on("change", (v) => setScrolled(v > 8)), [scrollY]);

  useEffect(() => {
    withTimeout(authClient.getSession())
      .then((s) => setIsLoggedIn(!!s?.data?.session))
      .catch(() => setIsLoggedIn(false));
  }, [pathname]);

  const links = [
    { href: "/composants", label: t("components"), icon: Boxes },
    { href: "/documentation", label: t("documentation"), icon: BookOpen },
    { href: "/Demo", label: t("demo"), icon: Rocket },
  ];

  const authCta = isLoggedIn ? (
    <Link
      href="/dashboard"
      className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.03] active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900"
    >
      <LayoutDashboard size={14} />
      {t("dashboard")}
    </Link>
  ) : (
    <Link
      href="/auth/login"
      className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.03] active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900"
    >
      <LogIn size={14} />
      {t("signIn")}
    </Link>
  );

  return (
    <header
      className={`sticky top-0 z-50 border-b border-zinc-200/60 bg-white/70 backdrop-blur-xl transition-shadow dark:border-zinc-800/60 dark:bg-zinc-950/70 ${scrolled
        ? "shadow-[0_1px_12px_rgb(0_0_0/0.06)] dark:shadow-[0_1px_12px_rgb(0_0_0/0.4)]"
        : ""
        }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        {/* Liens desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active =
              pathname === l.href ||
              (l.href !== "/" && pathname?.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${active
                  ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                  }`}
              >
                <l.icon size={14} />
                {l.label}
              </Link>
            );
          })}
        </div>

        {/* Actions desktop */}
        <div className="hidden items-center gap-1.5 md:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          {isLoggedIn === null ? (
            <span className="flex h-9 w-9 items-center justify-center">
              <Loader2 size={15} className="animate-spin text-zinc-400" />
            </span>
          ) : (
            authCta
          )}
        </div>

        {/* Actions mobile */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={t("menu")}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Drawer mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-zinc-200/60 md:hidden dark:border-zinc-800/60"
          >
            <div className="space-y-1 px-4 py-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                >
                  <l.icon size={15} className="text-zinc-400" />
                  {l.label}
                </Link>
              ))}
              <div className="flex items-center gap-2 pt-3">
                <LanguageSwitcher />
                {isLoggedIn ? (
                  <Link
                    href="/dashboard"
                    className="flex-1 rounded-full bg-zinc-900 px-4 py-2 text-center text-sm font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900"
                  >
                    {t("dashboard")}
                  </Link>
                ) : (
                  <Link
                    href="/auth/login"
                    className="flex-1 rounded-full bg-zinc-900 px-4 py-2 text-center text-sm font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900"
                  >
                    {t("signIn")}
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
