"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-700 px-6 py-16 text-center text-white sm:px-12"
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgb(255_255_255/0.12),transparent_60%)]"
        />
        <h2 className="relative text-3xl font-black tracking-tight sm:text-4xl">
          Your next project starts differently.
        </h2>
        <p className="relative mx-auto mt-3 max-w-md text-zinc-300">
          Open the canvas. Place a block. Export the code. Ship it.
        </p>
        <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-zinc-900 shadow-xl transition-transform hover:scale-[1.04] active:scale-[0.97]"
          >
            Create your workspace
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/composants"
            className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Browse components
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
