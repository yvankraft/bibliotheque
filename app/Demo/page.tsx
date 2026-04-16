"use client";

import React from "react";
import { GlassNavbar } from "./components/GlassNavbar";
import { MagneticButton } from "./components/MagneticButton";
import { ModernInput } from "./components/ModernInput";
import { PortfolioRevealCard } from "./components/PortfolioRevealCard";
import { Toast } from "./components/Toast";
import { motion } from "framer-motion";

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-black">
      {/* 2. HERO SECTION */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto border-b border-zinc-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h1 className="text-[12vw] md:text-[8vw] font-black italic uppercase leading-[0.85] tracking-tighter">
            Design <br /> <span className="text-zinc-300">Without</span> <br />{" "}
            Limits
          </h1>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <p className="max-w-md text-zinc-500 text-lg leading-relaxed">
              We create digital components that bend to your requirements,
              ensuring a seamless fusion of aesthetics and performance.
            </p>
            {/* 3. INTERACTION (Famille Action) */}
            <MagneticButton label="Start a Project" pull={0.4} />
          </div>
        </motion.div>
      </section>

      {/* 4. GALLERY (Famille Contenu - RevealCards) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-zinc-400">
            Selected Works
          </h2>
          <span className="text-xs font-mono">01 — 03</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Image 1 : Structure Géométrique Noire */}
          <PortfolioRevealCard
            title="The Monolith"
            category="Berlin • 2026"
            image="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2067&auto=format&fit=crop"
          />

          {/* Image 2 : Escalier Minimaliste Blanc */}
          <PortfolioRevealCard
            title="Glass Pavilion"
            category="Tokyo • 2025"
            image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbuildgreennh.com%2Fwp-content%2Fuploads%2F2025%2F06%2Fglass-pavilion-minimalist-rectangular-facade-seamless-full-height-glazing-on-all-sides-slender-metallic-framing-flat-roof-with-minimal-overhang-transparent-walls-forming-uninterrupted-corners-re.webp&f=1&nofb=1&ipt=10df058cf2063e998e0d68dd2edaaff5a549b429a57cfdb3cba779322edd9dfd"
          />

          {/* Image 3 : Façade de Béton Brut */}
          <PortfolioRevealCard
            title="Concrete Soul"
            category="Paris • 2026"
            image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
          />
        </div>
      </section>

      {/* 5. CONTACT FORM (Famille Forms) */}
      <section className="py-24 bg-zinc-50 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="space-y-8">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter">
              Stay in the <span className="text-zinc-400">Loop</span>
            </h2>
            <p className="text-zinc-500">
              Subscribe to get notified about our latest component releases and
              design insights.
            </p>
          </div>

          <div className="space-y-12 py-4">
            <ModernInput label="Full Name" />
            <ModernInput label="Professional Email" type="email" />
            <div className="pt-4">
              <button className="w-full py-4 bg-black text-white font-bold uppercase italic text-sm tracking-widest hover:bg-zinc-800 transition-colors">
                Join the Circle
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TOAST DEMO (Famille Feedback) */}
      {/* Note: Dans une vraie démo, tu l'activerais via un bouton */}
      <Toast message="Welcome to the Studio" type="success" />

      {/* FOOTER SLOGAN */}
      <footer className="py-20 text-center border-t border-zinc-100">
        <p className="text-zinc-400 italic text-sm max-w-md mx-auto">
          "Because we believe our components should bend to your needs, not the
          other way around."
        </p>
      </footer>
    </main>
  );
}
