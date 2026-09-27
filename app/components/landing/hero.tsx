"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { BuilderMockup } from "./builder-mockup";

export function Hero() {
  const words = "Design visually. Ship real code.".split(" ");

  return (
    <section className="relative overflow-hidden">
      {/* fond grille */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,#71717a14_1px,transparent_1px),linear-gradient(to_bottom,#71717a14_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_35%,black_55%,transparent_100%)]"
      />
      {/* glow animé */}
      <motion.div
        aria-hidden
        className="absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-zinc-400/15 blur-3xl dark:bg-zinc-500/15"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-3 py-1 text-xs font-medium text-zinc-600 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Visual web builder for developers
          </motion.div>

          <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {words.map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i, duration: 0.5 }}
                className="mr-[0.28em] inline-block last:mr-0"
              >
                {w}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-5 max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400"
          >
            Design on a canvas like Figma, then export clean, typed,
            production-ready fullstack code. No lock-in — the code is yours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href="/documentation"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              <BookOpen size={16} />
              Read the docs
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-zinc-500/25 transition-transform hover:scale-[1.03] active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900"
            >
              Start building
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="hidden sm:block"
        >
          <BuilderMockup />
        </motion.div>
      </div>
    </section>
  );
}
