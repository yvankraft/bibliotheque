"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Check, ClipboardCopy, Code2, SlidersHorizontal } from "lucide-react";

const GEN_LINES = [
  "<Button",
  '  variant="primary"',
  '  radius="lg"',
  '  size="md"',
  "/>",
];

export function HowItWorks() {
  const [radius, setRadius] = useState(24);
  const [typed, setTyped] = useState(0);
  const [copied, setCopied] = useState(false);

  // Génération : les lignes apparaissent une à une en boucle
  useEffect(() => {
    const id = setInterval(() => {
      setTyped((n) => (n >= GEN_LINES.length ? 0 : n + 1));
    }, 900);
    return () => clearInterval(id);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(GEN_LINES.join("\n")).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const steps = [
    {
      icon: SlidersHorizontal,
      title: "Configure",
      desc: "Adjust every prop visually on the canvas — no code touched yet.",
      body: (
        <div className="flex h-full min-h-40 flex-col items-center justify-center gap-4 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-900">
          <button
            style={{ borderRadius: radius }}
            className="bg-zinc-900 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white transition-[border-radius] duration-150 dark:bg-zinc-100 dark:text-zinc-900"
          >
            Button
          </button>
          <input
            type="range"
            min={4}
            max={40}
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            aria-label="Border radius"
            className="w-full accent-zinc-900 dark:accent-zinc-100"
          />
          <span className="font-mono text-[10px] text-zinc-400">
            radius: {radius}px
          </span>
        </div>
      ),
    },
    {
      icon: Code2,
      title: "Generate",
      desc: "The source rewrites itself in real time — typed and clean.",
      body: (
        <div className="flex h-full min-h-40 flex-col justify-center rounded-xl bg-[#0d1117] p-4 font-mono text-[11px] leading-6 text-zinc-300">
          {GEN_LINES.slice(0, typed).map((line, i) => (
            <div key={i}>
              <span className="text-zinc-600">{i + 1} </span>
              <span className="text-emerald-300">{line}</span>
            </div>
          ))}
          <span className="animate-pulse text-emerald-300">▋</span>
        </div>
      ),
    },
    {
      icon: ClipboardCopy,
      title: "Ship it",
      desc: "Copy the code straight into your repo. Zero dependencies left.",
      body: (
        <div className="flex h-full min-h-40 flex-col items-center justify-center gap-3 rounded-xl bg-zinc-50 dark:bg-zinc-900">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold text-white transition-transform hover:scale-105 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900"
          >
            {copied ? (
              <Check size={14} className="text-emerald-400" />
            ) : (
              <ClipboardCopy size={14} />
            )}
            {copied ? "Copied!" : "Copy component"}
          </button>
          <span className="text-[10px] text-zinc-400">→ your-project/components/</span>
        </div>
      ),
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
          Three moves. That&apos;s the whole workflow.
        </h2>
        <p className="mt-3 text-zinc-500 dark:text-zinc-400">
          From canvas to codebase in seconds.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
                <step.icon size={17} />
              </span>
              <span className="text-xs font-bold text-zinc-400">0{i + 1}</span>
            </div>
            <h3 className="font-semibold">{step.title}</h3>
            <p className="mb-4 mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              {step.desc}
            </p>
            <div className="mt-auto">{step.body}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
