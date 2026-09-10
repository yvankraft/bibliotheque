export const gridFeatures = [
  {
    id: "grid-1-bento", name: "Bento Minimal", category: "Grid Features", code: `
<div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
  <div className="md:col-span-2 bg-zinc-100 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800">
    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Performance Ultime</h3>
    <p className="text-zinc-500 text-sm">Optimisé pour la vitesse et le SEO par défaut.</p>
  </div>
  <div className="bg-amber-500/10 p-8 rounded-3xl border border-amber-500/20">
    <h3 className="text-xl font-bold text-amber-600 dark:text-amber-500 mb-2">Design</h3>
  </div>
</div>`
  },
  {
    id: "grid-2-icon-cards", name: "3-Column Icons", category: "Grid Features", code: `
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-sans px-6 py-12 max-w-6xl mx-auto">
  {[1,2,3].map(i => (
    <div key={i} className="flex flex-col items-start border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl bg-white dark:bg-zinc-950 shadow-sm hover:shadow-md transition">
      <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-4 text-zinc-800 dark:text-zinc-200">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/></svg>
      </div>
      <h3 className="text-base font-semibold text-zinc-900 dark:text-white mb-2">Modularité</h3>
      <p className="text-sm text-zinc-500">Adaptez chaque composant à vos besoins en un clic.</p>
    </div>
  ))}
</div>`
  },
  { id: "grid-3-zigzag", name: "ZigZag Layout", category: "Grid Features", code: `<div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto px-6 py-16"><div className="w-full md:w-1/2 aspect-video bg-zinc-200 dark:bg-zinc-800 rounded-2xl"></div><div className="w-full md:w-1/2 space-y-4 font-sans"><h3 className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">Création visuelle</h3><p className="text-zinc-500">Ne touchez plus au code si vous ne le souhaitez pas.</p></div></div>` },
  { id: "grid-4-dark-glow", name: "Dark Glowing Cards", category: "Grid Features", code: `<div className="grid grid-cols-2 gap-4 bg-zinc-950 p-8"><div className="p-6 border border-zinc-800 rounded-xl hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition"><h3 className="text-white font-serif font-bold">Sécurité</h3></div><div className="p-6 border border-zinc-800 rounded-xl hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition"><h3 className="text-white font-serif font-bold">Rapidité</h3></div></div>` },
  { id: "grid-5-numbered", name: "Numbered Steps", category: "Grid Features", code: `<div className="flex flex-col sm:flex-row gap-8 max-w-4xl mx-auto font-sans p-8"><div className="flex-1"><span className="text-4xl font-bold text-zinc-200 dark:text-zinc-800">01</span><h4 className="font-semibold text-zinc-900 dark:text-white mt-2">Choisir</h4></div><div className="flex-1"><span className="text-4xl font-bold text-zinc-200 dark:text-zinc-800">02</span><h4 className="font-semibold text-zinc-900 dark:text-white mt-2">Éditer</h4></div><div className="flex-1"><span className="text-4xl font-bold text-zinc-200 dark:text-zinc-800">03</span><h4 className="font-semibold text-zinc-900 dark:text-white mt-2">Publier</h4></div></div>` }
];