"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface RevealCardProps {
  title?: string;
  category?: string;
  image?: string;
  accentColor?: string;
}

export const PortfolioRevealCard = ({
  title = "Architecture Studio",
  category = "Branding • 2026",
  image = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
  accentColor = "#ffffff",
}: RevealCardProps) => {
  return (
    <div className="relative w-full max-w-sm aspect-[3/4] rounded-[2rem] overflow-hidden bg-zinc-100 group cursor-pointer shadow-2xl">
      {/* 1. L'Image de fond avec effet de zoom au survol */}
      <motion.img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* 2. L'Overlay qui remonte (Le "Reveal") */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent translate-y-[70%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.22, 1, 0.36, 1] p-8 flex flex-col justify-end">
        {/* Contenu qui apparaît */}
        <div className="space-y-2">
          <motion.span
            className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            {category}
          </motion.span>

          <div className="flex justify-between items-end">
            <h3
              className="text-2xl font-black italic uppercase leading-none tracking-tighter"
              style={{ color: accentColor }}
            >
              {title}
            </h3>

            {/* Petit bouton iconique qui apparaît en fondu */}
            <div className="bg-white p-2 rounded-full text-black opacity-0 group-hover:opacity-100 transition-opacity delay-100">
              <ArrowUpRight size={20} />
            </div>
          </div>
        </div>

        {/* 3. Description supplémentaire cachée */}
        <p className="text-zinc-400 text-sm mt-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity delay-200 leading-relaxed">
          A minimalist approach to urban spaces, focusing on raw materials and
          natural light integration.
        </p>
      </div>

      {/* Badge discret "New" en haut à droite */}
      <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full">
        <span className="text-[10px] font-bold text-white uppercase tracking-widest">
          Case Study
        </span>
      </div>
    </div>
  );
};
