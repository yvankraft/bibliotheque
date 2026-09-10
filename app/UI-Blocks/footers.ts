export const footers = [
  {
    id: "foot-1-minimal", name: "Minimal 2-Column", category: "Footer", code: `
<footer className="w-full py-8 px-6 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 font-sans flex flex-col md:flex-row justify-between items-center gap-4 transition-colors">
  <div className="font-serif font-bold text-lg text-zinc-900 dark:text-white">Library.</div>
  <p className="text-xs text-zinc-500">© 2026 Tous droits réservés.</p>
  <div className="flex gap-4 text-xs font-medium text-zinc-600 dark:text-zinc-400">
    <a href="#" className="hover:text-black dark:hover:text-white">Twitter</a>
    <a href="#" className="hover:text-black dark:hover:text-white">GitHub</a>
  </div>
</footer>`
  },
  {
    id: "foot-2-corporate", name: "Corporate 4-Column", category: "Footer", code: `
<footer className="w-full py-16 px-8 bg-zinc-50 dark:bg-zinc-900/30 border-t border-zinc-200 dark:border-zinc-800 font-sans">
  <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
    <div>
      <h4 className="font-semibold text-zinc-900 dark:text-white mb-4">Produit</h4>
      <ul className="space-y-2 text-sm text-zinc-500 dark:text-zinc-400"><li className="hover:text-amber-500 cursor-pointer">Fonctionnalités</li><li className="hover:text-amber-500 cursor-pointer">Tarifs</li></ul>
    </div>
    <div>
      <h4 className="font-semibold text-zinc-900 dark:text-white mb-4">Ressources</h4>
      <ul className="space-y-2 text-sm text-zinc-500 dark:text-zinc-400"><li className="hover:text-amber-500 cursor-pointer">Documentation</li><li className="hover:text-amber-500 cursor-pointer">Blog</li></ul>
    </div>
  </div>
</footer>`
  },
  // Tu peux utiliser le Footer Newsletter que l'on a créé précédemment pour la 3ème variante
  { id: "foot-3-newsletter", name: "Newsletter Focused", category: "Footer", code: `<footer className="w-full py-24 bg-zinc-950 text-center"><h3 className="font-serif text-3xl text-white mb-4">Rejoignez l'élite.</h3><input type="email" placeholder="Email" className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-l-lg text-white text-sm focus:outline-none"/><button className="bg-white text-black px-4 py-2 rounded-r-lg text-sm font-semibold">S'inscrire</button></footer>` },
  { id: "foot-4-big-text", name: "Large Typography", category: "Footer", code: `<footer className="w-full py-16 px-6 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800"><h2 className="font-serif text-6xl md:text-8xl font-black text-zinc-100 dark:text-zinc-900 tracking-tighter">LIBRARY</h2><div className="mt-8 flex justify-between text-sm text-zinc-500 font-sans"><p>Construit avec passion.</p><p>2026</p></div></footer>` },
  { id: "foot-5-split", name: "Split Social", category: "Footer", code: `<footer className="w-full flex flex-col sm:flex-row bg-zinc-900 text-white font-sans"><div className="w-full sm:w-1/2 p-12 border-b sm:border-b-0 sm:border-r border-zinc-800"><h3 className="font-serif text-2xl mb-2">Prêt à commencer ?</h3><a href="#" className="text-amber-500 text-sm underline underline-offset-4">Contactez les ventes</a></div><div className="w-full sm:w-1/2 p-12 flex items-center gap-6"><a href="#" className="hover:text-amber-500">Instagram</a><a href="#" className="hover:text-amber-500">LinkedIn</a></div></footer>` }
];