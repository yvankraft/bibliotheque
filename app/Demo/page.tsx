"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";

const projects = [
  {
    id: "01",
    title: "Yvancorps",
    subtitle: "Digital Design Studio",
    description:
      "Une agence de design radicale axée sur le minimalisme et la performance.",
    href: "https://yvancorps.vercel.app/",
    image:
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2067",
    color: "bg-zinc-100",
  },
  {
    id: "02",
    title: "The Vault",
    subtitle: "Security SaaS",
    description: "A dark technology interface with secure input components.",
    href: "/Demo/the-vault",
    image:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070",
    color: "bg-black text-white",
  },
  {
    id: "03",
    title: "Orizon",
    subtitle: "E-commerce Furniture",
    description:
      "Exploration of RevealCards for the presentation of high-end furniture.",
    href: "/Demo/orizon",
    image:
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1964",
    color: "bg-zinc-50",
  },
];

export default function DemoCatalogue() {
  return (
    <main className="min-h-screen bg-white text-black pb-24">
      <Navbar />
      {/* Hero Header */}
      <header className="pt-40 px-6 max-w-7xl mx-auto mb-24">
        <h1 className="text-[12vw] font-black italic uppercase leading-none tracking-tighter">
          Project <br /> <span className="text-zinc-300">Catalogue</span>
        </h1>
        <p className="mt-8 text-xl text-zinc-500 max-w-xl border-l-4 border-black pl-6">
          Explorez nos démonstrations interactives construites exclusivement
          avec nos composants personnalisés.
        </p>
      </header>

      {/* Grille de projets */}
      <div className="px-6 max-w-7xl mx-auto space-y-32">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`group flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-12 items-center`}
          >
            {/* Preview Image */}
            <div className="w-full md:w-3/5 aspect-video overflow-hidden rounded-[2.5rem] bg-zinc-100 border border-zinc-200 shadow-xl">
              <img
                src={project.image}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt={project.title}
              />
            </div>

            {/* Infos Projet */}
            <div className="w-full md:w-2/5 space-y-6">
              <span className="text-xs font-mono font-bold text-zinc-400 italic">
                Project {project.id}
              </span>
              <h2 className="text-5xl font-black italic uppercase tracking-tighter">
                {project.title}
              </h2>
              <p className="text-zinc-500 leading-relaxed text-lg italic">
                {project.description}
              </p>

              <Link
                href={project.href}
                className="inline-flex items-center gap-4 bg-black text-white px-8 py-4 rounded-full font-bold uppercase italic tracking-widest text-xs hover:scale-105 transition-all"
              >
                Launch Demo <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
