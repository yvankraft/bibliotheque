export const productCards = [
  {
    id: "prod-1-minimal", name: "Minimalist Studio", category: "Product", code: `
<div className="w-72 group cursor-pointer font-sans">
  <div className="aspect-[4/5] bg-zinc-100 dark:bg-zinc-900 rounded-2xl overflow-hidden mb-4 relative transition-colors duration-300">
    <div className="absolute inset-0 bg-black/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition duration-300"></div>
  </div>
  <div className="flex justify-between items-start">
    <div>
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Chaise Minimaliste</h3>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Édition Limitée</p>
    </div>
    <span className="text-sm font-serif font-bold text-zinc-900 dark:text-white">299€</span>
  </div>
</div>`
  },
  {
    id: "prod-2-dark-luxe", name: "Dark Luxe Accent", category: "Product", code: `
<div className="w-80 bg-zinc-950 border border-zinc-800 p-4 rounded-xl group hover:border-amber-500/50 transition duration-300">
  <div className="aspect-square bg-zinc-900 rounded-lg mb-4"></div>
  <h3 className="font-serif text-lg text-white mb-1">Montre Chronographe</h3>
  <p className="text-xs text-zinc-500 mb-4 font-sans">Acier inoxydable, verre saphir.</p>
  <div className="flex justify-between items-center font-sans">
    <span className="text-amber-500 font-semibold">1 450€</span>
    <button className="text-xs uppercase tracking-wider text-white border border-zinc-700 hover:border-amber-500 hover:text-amber-500 px-4 py-2 rounded transition">Ajouter</button>
  </div>
</div>`
  },
  {
    id: "prod-3-horizontal", name: "Split Horizontal", category: "Product", code: `
<div className="w-full max-w-xl flex bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
  <div className="w-1/3 bg-zinc-100 dark:bg-zinc-800 min-h-[150px]"></div>
  <div className="w-2/3 p-6 flex flex-col justify-center font-sans">
    <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">Sac en Cuir Noir</h3>
    <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 line-clamp-2">Conçu à la main avec du cuir italien pleine fleur. Idéal pour le quotidien.</p>
    <button className="self-start text-xs font-semibold text-zinc-900 dark:text-white underline underline-offset-4 hover:text-amber-500 transition">Acheter maintenant</button>
  </div>
</div>`
  },
  {
    id: "prod-4-glass", name: "Glassmorphism Card", category: "Product", code: `
<div className="w-72 p-4 rounded-3xl bg-white/30 dark:bg-zinc-900/30 backdrop-blur-xl border border-white/40 dark:border-zinc-700/40 shadow-lg relative overflow-hidden group">
  <div className="absolute top-4 right-4 bg-white dark:bg-zinc-950 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-zinc-900 dark:text-white z-10">Nouveau</div>
  <div className="aspect-square bg-zinc-200/50 dark:bg-zinc-800/50 rounded-2xl mb-4"></div>
  <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white">Casque Audio Pro</h3>
  <p className="font-sans text-sm text-zinc-600 dark:text-zinc-400 font-medium mt-1">349€</p>
</div>`
  },
  {
    id: "prod-5-overlay", name: "Hover Overlay Action", category: "Product", code: `
<div className="w-72 aspect-[3/4] relative group rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 font-sans">
  <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    <h3 className="text-white font-bold text-lg">Veste en Lin</h3>
    <p className="text-zinc-300 text-sm mb-4">120€</p>
    <button className="w-full bg-white text-black py-2.5 rounded-lg text-xs font-semibold hover:bg-zinc-200 transition">Ajouter au panier</button>
  </div>
</div>`
  }
];