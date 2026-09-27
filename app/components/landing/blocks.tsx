"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Database, Layout, Server } from "lucide-react";
import { componentsListData } from "@/app/data/components";

const CARDS = [
  {
    key: "frontend",
    icon: Layout,
    title: "Frontend",
    desc: "UI blocks, animations, hooks",
    tags: ["navbars", "buttons", "heroes", "cards"],
  },
  {
    key: "backend",
    icon: Server,
    title: "Backend",
    desc: "API routes, auth, schemas",
    tags: ["auth", "prisma", "webhooks", "rate-limit"],
  },
  {
    key: "fullstack",
    icon: Database,
    title: "Fullstack",
    desc: "Server logic + UI, connected",
    tags: ["forms", "server-actions", "real-time"],
  },
] as const;

export function Blocks() {
  return (
    <section id="components" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
          Three layers. One workflow.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-zinc-500 dark:text-zinc-400">
          Every component bends to your needs — not the other way around.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {CARDS.map((card, i) => {
          const count = componentsListData.filter(
            (c) => c.category === card.key,
          ).length;
          return (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Link
                href={`/composants/${card.key}`}
                className="group flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                    <card.icon size={17} />
                  </span>
                  <div>
                    <p className="text-sm font-bold">{card.title}</p>
                    <p className="text-xs text-zinc-500">{card.desc}</p>
                  </div>
                </div>

                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  Includes
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                    >
                      <i className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between pt-5 text-xs font-semibold">
                  <span className="text-zinc-400">
                    {count} {count > 1 ? "components" : "component"}
                  </span>
                  <span className="inline-flex items-center gap-1 text-zinc-500 transition-colors group-hover:text-zinc-900 dark:group-hover:text-white">
                    Browse
                    <ArrowRight
                      size={13}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
