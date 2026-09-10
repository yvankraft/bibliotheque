export const pricingCards = [
  {
    id: "price-1-luxe", name: "Dark Luxe Pricing", category: "Pricing", code: `
<div className="w-80 bg-zinc-950 border border-zinc-800 rounded-3xl p-8 text-center shadow-xl relative overflow-hidden font-sans">
  <div className="absolute top-0 inset-x-0 h-1 bg-amber-500"></div>
  <h3 className="text-white font-serif text-xl font-bold mb-2">Studio</h3>
  <p className="text-zinc-400 text-sm mb-6">Pour les agences</p>
  <div className="flex justify-center items-baseline gap-1 mb-8">
    <span className="text-4xl font-bold text-white">49€</span>
    <span className="text-zinc-500 text-sm">/mois</span>
  </div>
  <button className="w-full bg-amber-500 text-zinc-950 font-bold py-3 rounded-xl hover:bg-amber-400 transition mb-6">Choisir ce plan</button>
  <ul className="text-left space-y-3 text-sm text-zinc-400">
    <li className="flex items-center gap-2"><svg className="text-amber-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg> Projets illimités</li>
    <li className="flex items-center gap-2"><svg className="text-amber-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg> Exportation de code</li>
  </ul>
</div>`
  },
  { id: "price-2-minimal", name: "Minimal White Pricing", category: "Pricing", code: `<div className="w-72 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl font-sans"><h3 className="font-bold text-zinc-900 dark:text-white text-lg">Indépendant</h3><p className="text-2xl font-serif text-zinc-900 dark:text-white mt-4 mb-6">0€</p><button className="w-full py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-lg text-sm font-semibold mb-4 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition">Gratuit à vie</button><p className="text-xs text-zinc-500">Idéal pour tester le produit.</p></div>` }
];