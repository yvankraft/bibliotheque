"use client";
import { motion } from "framer-motion";

export const GlassNavbar = ({ logoText = "STUDIO", blur = 10 }) => (
  <motion.nav
    style={{ backdropFilter: `blur(${blur}px)` }}
    className="fixed top-4 inset-x-4 h-16 border border-white/20 bg-white/70 rounded-2xl flex items-center justify-between px-8 z-50 shadow-sm"
  >
    <span className="font-black italic tracking-tighter text-xl">
      {logoText}
    </span>
    <div className="flex gap-6 text-sm font-bold uppercase tracking-widest">
      <a href="#">Works</a>
      <a href="#">About</a>
      <button className="bg-black text-white px-4 py-1.5 rounded-full text-xs">
        Contact
      </button>
    </div>
  </motion.nav>
);
