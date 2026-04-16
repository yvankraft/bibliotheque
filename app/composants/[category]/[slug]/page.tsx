"use client";

import { useState, use } from "react";
import { componentsListData, ComponentItem } from "@/app/data/components";
import { notFound } from "next/navigation";
import CopyButton from "@/app/components/CopyButton";
import Link from "next/link";

export default function ComponentStudioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  // 1. ÉTATS DE CUSTOMISATION (Exemple pour un bouton)
  const [text, setText] = useState("Click Me");
  const [color, setColor] = useState("#000000");
  const [radius, setRadius] = useState("full");

  // 2. GÉNÉRATEUR DE CODE (C'est ce que l'utilisateur copiera)
  const dynamicCode = `
<SeeMoreButton 
  text="${text}"
  color="${color}"
  radius="${radius}"
  href="/destination"
/>`.trim();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      {/* ZONE DE GAUCHE : LE CANVAS */}
      <div className="flex-1 flex flex-col items-center justify-center p-12 border-r border-zinc-100 bg-zinc-50/50">
        <div className="mb-8 text-xs font-mono text-zinc-400 uppercase tracking-widest">
          Live Preview
        </div>

        {/* LE COMPOSANT REEL (Injecte tes états ici) */}
        <div className="p-20 bg-white shadow-xl rounded-3xl border border-zinc-200">
          <button
            style={{
              backgroundColor: color,
              borderRadius: radius === "full" ? "9999px" : "8px",
            }}
            className="px-6 py-2 text-white font-bold uppercase italic"
          >
            {text}
          </button>
        </div>
      </div>

      {/* ZONE DE DROITE : LES RÉGLAGES & CODE */}
      <div className="w-full lg:w-[400px] mt-15 p-8 space-y-10 overflow-y-auto bg-white ">
        <div>
          <h2 className="text-2xl font-black uppercase italic italic mb-6">
            Configure
          </h2>

          {/* LES CONTRÔLES */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-zinc-400">
                Label Text
              </label>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-3 border border-zinc-200 rounded-xl focus:border-black outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-zinc-400">
                Theme Color
              </label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-12 rounded-xl cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* SECTION CODE MISE À JOUR EN DIRECT */}
        <div className="pt-10 border-t border-zinc-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-bold uppercase tracking-widest">
              Get the Code
            </h3>
            <CopyButton code={dynamicCode} />
          </div>
          <pre className="bg-zinc-900 text-zinc-400 p-5 rounded-2xl text-[11px] font-mono leading-relaxed overflow-x-auto border border-zinc-800">
            {dynamicCode}
          </pre>
        </div>
      </div>
    </div>
  );
}
