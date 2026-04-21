"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

export const MagneticButton = ({ label = "Explore", pull = 0.35 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0));
  const y = useSpring(useMotionValue(0));

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * pull);
    y.set((clientY - (top + height / 2)) * pull);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x, y }}
    >
      <button className="px-8 py-4 bg-black text-white rounded-full font-bold italic uppercase border-2 border-transparent hover:border-black hover:bg-white hover:text-black transition-colors">
        {label}
      </button>
    </motion.div>
  );
};
