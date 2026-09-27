"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

const PROMPT_LINES = [
  "$ library export button.tsx",
  "",
  "→ reading canvas state…",
  "→ generating TSX…",
];

const EXPORTED = `export function Button({ variant = "primary" }) {
  return (
    <button className={styles[variant]}>
      {children}
    </button>
  );
}`;

const POINTS = [
  "TypeScript strict — no any, no surprises",
  "Tailwind classes, no runtime dependency",
  "Yours forever: rename, restyle, refactor freely",
];

export function CodeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setTyped((n) => {
        if (n >= PROMPT_LINES.length) {
          clearInterval(id);
          return n;
        }
        return n + 1;
      });
    }, 500);
    return () => clearInterval(id);
  }, [inView]);

  const done = typed >= PROMPT_LINES.length;

  return (
    <section className="border-y border-zinc-200 bg-zinc-50/60 py-20 dark:border-zinc-800 dark:bg-zinc-900/40">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            What you export is what you ship.
          </h2>
          <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-400">
            No hidden runtime, no proprietary format. Just a file you can read,
            diff and own — as if you had written it yourself.
          </p>
          <ul className="mt-6 space-y-3">
            {POINTS.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.12 }}
                className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
                  <Check size={12} />
                </span>
                {p}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#0d1117] shadow-2xl"
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
            <span className="flex gap-1.5">
              <i className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <i className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <i className="h-3 w-3 rounded-full bg-[#28c840]" />
            </span>
            <span className="ml-2 text-xs text-zinc-400">terminal</span>
          </div>
          <div className="p-4 font-mono text-[0.75rem] leading-6">
            <div className="min-h-[120px] text-emerald-300">
              {PROMPT_LINES.slice(0, typed).map((line, i) => (
                <div key={i}>{line || " "}</div>
              ))}
              {!done && <span className="animate-pulse">▋</span>}
            </div>
            {done && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 border-t border-white/10 pt-3"
              >
                <p className="text-zinc-500">{"// button.tsx — generated"}</p>
                <pre className="mt-1 whitespace-pre-wrap text-zinc-300">
                  {EXPORTED}
                </pre>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
