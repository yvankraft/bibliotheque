// lib/ui-blocks/heroes.ts

export const heroes = [
  {
    id: "hero-1-centered-luxe",
    name: "Centered Typography Luxe",
    category: "Hero",
    code: `
<section className="w-full bg-white dark:bg-zinc-950 py-24 md:py-32 px-6 flex flex-col items-center text-center transition-colors duration-300">
  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-xs font-medium text-zinc-600 dark:text-zinc-300 font-sans mb-8">
    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
    Nouvelle Collection 2026
  </div>
  <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-zinc-900 dark:text-white max-w-4xl tracking-tight leading-tight mb-6">
    L'élégance redéfinie pour le web moderne.
  </h1>
  <p className="font-sans text-base md:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mb-10">
    Créez des expériences numériques inoubliables avec notre suite d'outils visuels conçue pour les créateurs exigeants.
  </p>
  <div className="flex flex-col sm:flex-row gap-4 font-sans w-full sm:w-auto">
    <button className="px-8 py-3.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold hover:opacity-90 transition shadow-lg">
      Découvrir l'outil
    </button>
    <button className="px-8 py-3.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-900 transition">
      Voir le portfolio
    </button>
  </div>
</section>
    `,
  },
  {
    id: "hero-2-split-corporate",
    name: "Split Corporate & Image",
    category: "Hero",
    code: `
<section className="w-full bg-zinc-50 dark:bg-zinc-900/50 py-16 md:py-24 px-6 md:px-12 transition-colors duration-300">
  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <div className="flex flex-col items-start text-left">
      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white leading-[1.1] mb-6">
        Construisez l'avenir de votre <span className="italic font-light">marque</span>.
      </h1>
      <p className="font-sans text-zinc-600 dark:text-zinc-400 text-lg mb-8 max-w-md">
        Une plateforme tout-en-un pour gérer vos projets, vos designs et votre code, avec une esthétique irréprochable.
      </p>
      <button className="font-sans px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium rounded-lg hover:opacity-90 transition flex items-center gap-2">
        Commencer gratuitement
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
    </div>
    <div className="w-full aspect-[4/3] rounded-2xl bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 shadow-2xl overflow-hidden relative flex items-center justify-center">
      {/* Remplacer par une vraie image */}
      <span className="font-mono text-zinc-400 dark:text-zinc-500 text-sm">Image / Dashboard Mockup</span>
    </div>
  </div>
</section>
    `,
  },
  {
    id: "hero-3-dark-gold",
    name: "Dark Luxury Minimal",
    category: "Hero",
    code: `
<section className="w-full bg-zinc-950 py-32 px-6 flex flex-col items-center justify-center relative overflow-hidden">
  {/* Lueur de fond */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none"></div>
  
  <div className="relative z-10 flex flex-col items-center text-center">
    <p className="font-sans text-amber-500 uppercase tracking-[0.2em] text-xs font-bold mb-6">Maison de Design</p>
    <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
      L'art du détail.
    </h1>
    <div className="w-16 h-px bg-amber-500/50 mb-8"></div>
    <p className="font-sans text-zinc-400 max-w-lg mb-10 text-sm md:text-base leading-relaxed">
      Nous concevons des espaces numériques uniques où le minimalisme rencontre le luxe absolu.
    </p>
    <button className="font-sans px-8 py-4 border border-amber-500/30 text-amber-500 hover:bg-amber-500 hover:text-zinc-950 uppercase tracking-widest text-xs transition duration-500">
      Explorer la galerie
    </button>
  </div>
</section>
    `,
  },
  {
    id: "hero-4-stats-bottom",
    name: "Typography with Metrics",
    category: "Hero",
    code: `
<section className="w-full bg-white dark:bg-zinc-950 pt-24 pb-16 px-6 transition-colors duration-300 border-b border-zinc-200 dark:border-zinc-800">
  <div className="max-w-6xl mx-auto">
    <div className="max-w-3xl mb-16">
      <h1 className="font-serif text-5xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6 leading-tight">
        L'infrastructure des <br className="hidden md:block" /> équipes créatives.
      </h1>
      <p className="font-sans text-lg text-zinc-500 dark:text-zinc-400 mb-8 max-w-xl">
        De l'idée à la production en quelques secondes. Découvrez l'outil préféré des agences et des développeurs freelances.
      </p>
      <div className="flex gap-4 font-sans">
        <button className="px-6 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black font-semibold hover:scale-105 transition-transform">
          Ouvrir l'éditeur
        </button>
      </div>
    </div>
    
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-zinc-200 dark:border-zinc-800">
      <div>
        <p className="font-serif text-3xl font-bold text-zinc-900 dark:text-white">99.9%</p>
        <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wider">Uptime</p>
      </div>
      <div>
        <p className="font-serif text-3xl font-bold text-zinc-900 dark:text-white">2M+</p>
        <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wider">Utilisateurs</p>
      </div>
      <div>
        <p className="font-serif text-3xl font-bold text-zinc-900 dark:text-white">&lt;50ms</p>
        <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wider">Latence moyenne</p>
      </div>
      <div>
        <p className="font-serif text-3xl font-bold text-zinc-900 dark:text-white">4.9/5</p>
        <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wider">Note globale</p>
      </div>
    </div>
  </div>
</section>
    `,
  },
  {
    id: "hero-5-bento-grid",
    name: "Bento Layout Minimal",
    category: "Hero",
    code: `
<section className="w-full bg-zinc-100 dark:bg-zinc-950 py-16 px-6 transition-colors duration-300">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4">
    {/* Carte principale texte */}
    <div className="md:col-span-8 bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-center shadow-sm">
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
        Design System. <br/> <span className="text-zinc-400 dark:text-zinc-500">Unifié.</span>
      </h1>
      <p className="font-sans text-zinc-500 dark:text-zinc-400 mb-8 max-w-md">
        Assemblez vos pages web visuellement avec notre bibliothèque de blocs exclusifs.
      </p>
      <button className="font-sans self-start px-6 py-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium hover:opacity-90 transition">
        Explorer les blocs
      </button>
    </div>
    
    {/* Cartes secondaires (Bento) */}
    <div className="md:col-span-4 flex flex-col gap-4">
      <div className="flex-1 bg-zinc-900 dark:bg-zinc-800 rounded-3xl p-8 border border-zinc-800 dark:border-zinc-700 flex flex-col justify-between shadow-sm">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-amber-500 mb-4" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        <p className="font-serif text-lg font-bold text-white">Architecture robuste</p>
      </div>
      <div className="flex-1 bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between shadow-sm">
        <p className="font-serif text-3xl font-bold text-zinc-900 dark:text-white mb-2">100+</p>
        <p className="font-sans text-sm text-zinc-500 dark:text-zinc-400">Composants prêts à l'emploi pour vos projets.</p>
      </div>
    </div>
  </div>
</section>
    `,
  }
];