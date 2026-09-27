"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MousePointer2, FileCode2, SlidersHorizontal } from "lucide-react";

const PROPS = ["variant", "radius", "size"];

export function BuilderMockup() {
  const [activeProp, setActiveProp] = useState(0);
  const [radius, setRadius] = useState(60);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveProp((p) => (p + 1) % PROPS.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const target = [60, 12, 30][activeProp];
    const id = setInterval(() => {
      setRadius((r) => {
        if (r === target) return r;
        return r + Math.sign(target - r) * 4;
      });
    }, 24);
    return () => clearInterval(id);
  }, [activeProp]);

  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* Fenêtre canvas */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white/90 shadow-2xl shadow-zinc-500/10 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/90">
        {/* Barre d'outils */}
        <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="font-mono text-xs text-zinc-400">canvas · button.tsx</span>
          <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            saved
          </span>
        </div>

        {/* Zone canvas en pointillés */}
        <div className="relative flex h-44 items-center justify-center bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#3f3f46_1px,transparent_1px)]">
          <motion.button
            animate={{ borderRadius: radius }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="bg-zinc-900 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg dark:bg-zinc-100 dark:text-zinc-900"
          >
            Get started
          </motion.button>
          <motion.div
            aria-hidden
            animate={{ x: [0, 14, 0], y: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-6 right-10 text-zinc-900 dark:text-zinc-100"
          >
            <MousePointer2 size={16} className="fill-zinc-900 dark:fill-zinc-100" />
          </motion.div>
        </div>

        {/* Panneau de props */}
        <div className="border-t border-zinc-100 px-4 py-3 dark:border-zinc-800">
          <div className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            <SlidersHorizontal size={11} />
            Props
          </div>
          <div className="flex gap-2">
            {PROPS.map((prop, i) => (
              <span
                key={prop}
                className={`rounded-lg border px-2.5 py-1 font-mono text-[11px] transition-colors duration-300 ${i === activeProp
                    ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                    : "border-zinc-200 text-zinc-500 dark:border-zinc-700 dark:text-zinc-400"
                  }`}
              >
                {prop}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Carte flottante : code exporté */}
      <motion.div
        className="absolute -bottom-6 -right-4 flex items-center gap-2.5 rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 dark:bg-zinc-100">
          <FileCode2 size={14} className="text-white dark:text-zinc-900" />
        </div>
        <div>
          <p className="text-xs font-semibold">Exported</p>
          <p className="font-mono text-[10px] text-zinc-500">button.tsx · 0 deps</p>
        </div>
      </motion.div>
    </div>
  );
}
