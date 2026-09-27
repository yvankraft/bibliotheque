"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { componentsListData } from "@/app/data/components";

function Counter({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1800, bounce: 0 });

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);

  useEffect(
    () =>
      spring.on("change", (v) => {
        if (ref.current) ref.current.textContent = v.toFixed(decimals);
      }),
    [spring, decimals],
  );

  return <span ref={ref}>0</span>;
}

export function Stats() {
  const items = [
    {
      value: <Counter to={componentsListData.length} />,
      label: "Ready-to-use components",
    },
    {
      value: (
        <>
          <Counter to={3} />
        </>
      ),
      label: "Layers — frontend, backend, fullstack",
    },
    {
      value: (
        <>
          <Counter to={0} />
        </>
      ),
      label: "Runtime dependencies after export",
    },
  ];

  return (
    <section className="border-y border-zinc-200 bg-zinc-50/60 dark:border-zinc-800 dark:bg-zinc-900/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="text-center"
          >
            <p className="text-3xl font-black tracking-tight sm:text-4xl">
              {item.value}
            </p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
