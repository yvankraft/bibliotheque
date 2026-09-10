
export const navbars = [
  {
    id: "nav-1-minimal-luxe",
    name: "Minimal Luxe",
    category: "Navbar",
    code: `
<nav className="w-full bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between transition-colors duration-300">
  <div className="font-serif text-2xl font-bold tracking-widest text-zinc-900 dark:text-white uppercase">
    Brand
  </div>
  
  <div className="hidden md:flex gap-6 text-sm font-medium text-zinc-500 dark:text-zinc-400 font-sans">
    <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition">Boutique</a>
    <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition">Collections</a>
  </div>
  
  <div className="hidden md:flex gap-4 text-sm font-sans">
    <button className="text-zinc-900 dark:text-zinc-100 font-semibold hover:text-amber-500 transition">Connexion</button>
  </div>

  <button className="md:hidden text-zinc-900 dark:text-white p-2">
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
  </button>
</nav>
    `,
  },
  {
    id: "nav-2-floating-glass",
    name: "Floating Glass",
    category: "Navbar",
    code: `
<div className="w-full flex justify-center p-4 absolute top-0 z-50">
  <nav className="w-full max-w-4xl bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-full px-6 py-3 flex items-center justify-between shadow-sm transition-colors duration-300">
    <span className="font-serif font-bold text-lg text-zinc-900 dark:text-white">STUDIO</span>
    
    <div className="hidden md:flex gap-8 text-xs font-medium text-zinc-600 dark:text-zinc-400 font-sans">
      <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition">Accueil</a>
      <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition">Projets</a>
      <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition">Contact</a>
    </div>
    
    <button className="hidden md:block bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs px-4 py-2 rounded-full font-semibold hover:opacity-90 transition font-sans">
      Démarrer
    </button>

    <button className="md:hidden text-zinc-900 dark:text-white p-1">
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
    </button>
  </nav>
</div>
    `,
  },
  {
    id: "nav-3-gold-accent",
    name: "Dark Gold Accent",
    category: "Navbar",
    code: `
<nav className="w-full bg-zinc-950 border-b border-zinc-900 px-8 py-5 flex items-center justify-between">
  <div className="flex items-center gap-2">
    <div className="w-3 h-3 bg-amber-500 rounded-sm rotate-45"></div>
    <span className="font-serif text-xl font-bold text-white tracking-wide">LUXE</span>
  </div>
  
  <div className="hidden lg:flex gap-8 text-sm text-zinc-400 font-sans">
    <a href="#" className="hover:text-amber-500 transition">Services</a>
    <a href="#" className="hover:text-amber-500 transition">Expertise</a>
    <a href="#" className="hover:text-amber-500 transition">Journal</a>
  </div>
  
  <button className="hidden lg:block border border-amber-500 text-amber-500 px-5 py-2 text-xs uppercase tracking-wider font-sans hover:bg-amber-500 hover:text-black transition duration-300">
    Réserver
  </button>

  <button className="lg:hidden text-white p-2">
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
  </button>
</nav>
    `,
  },
  {
    id: "nav-4-split-corporate",
    name: "Split Corporate",
    category: "Navbar",
    code: `
<nav className="w-full bg-white dark:bg-zinc-900 flex items-center justify-between px-8 py-4 border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
  <div className="font-bold text-xl text-zinc-900 dark:text-zinc-100 flex items-center gap-2 font-serif">
    <div className="w-6 h-6 bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center rounded text-xs">L</div>
    Library
  </div>
  
  <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-300 font-sans">
    <a href="#" className="hover:text-black dark:hover:text-white transition">Produits</a>
    <a href="#" className="hover:text-black dark:hover:text-white transition">Ressources</a>
    <a href="#" className="hover:text-black dark:hover:text-white transition">Tarifs</a>
    <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700"></div>
    <a href="#" className="text-zinc-900 dark:text-white transition">Login</a>
  </div>

  <button className="md:hidden text-zinc-900 dark:text-white p-2">
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
  </button>
</nav>
    `,
  },
  {
    id: "nav-5-sidebar-trigger",
    name: "Sidebar Trigger",
    category: "Navbar",
    code: `
<nav className="w-full bg-white dark:bg-zinc-950 px-6 py-4 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900 transition-colors duration-300">
  <div className="flex items-center gap-4">
    <button className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
    </button>
    <span className="font-serif text-lg font-semibold text-zinc-900 dark:text-zinc-100 hidden sm:block">MAGAZINE</span>
  </div>
  
  <span className="font-serif text-lg font-semibold text-zinc-900 dark:text-zinc-100 sm:hidden">MAGAZINE</span>

  <div className="flex items-center gap-4">
    <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition p-2">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
    </button>
  </div>
</nav>
    `,
  }
];