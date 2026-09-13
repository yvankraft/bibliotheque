// =========================================================
// BIBLIOTHÈQUE AST OPTIMISÉE POUR L'ÉDITEUR VISUEL
// =========================================================

// --- BUTTONS ---
export const buttons = [
  {
    id: "btn-1", name: "Solid Invert", category: "Button",
    root: {
      id: "btn-1-root", type: "button",
      props: { className: "px-6 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-sans text-sm font-semibold hover:scale-[1.02] active:scale-95 transition-all shadow-md" },
      children: "Bouton Principal"
    }
  },
  {
    id: "btn-2", name: "Gold Outline", category: "Button",
    root: {
      id: "btn-2-root", type: "button",
      props: { className: "px-6 py-3 rounded-none border border-amber-500 text-amber-500 font-sans text-xs uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-colors duration-300" },
      children: "Découvrir"
    }
  },
  {
    id: "btn-3", name: "Minimal Underline", category: "Button",
    root: {
      id: "btn-3-root", type: "button",
      props: { className: "text-sm font-sans font-semibold text-zinc-900 dark:text-white pb-1 border-b-2 border-zinc-900 dark:border-white hover:text-zinc-500 hover:border-zinc-500 transition-colors" },
      children: "En savoir plus"
    }
  },
  {
    id: "btn-4", name: "Glass Glow", category: "Button",
    root: {
      id: "btn-4-root", type: "button",
      props: { className: "px-6 py-3 rounded-full bg-white/10 dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-700/50 text-zinc-900 dark:text-white font-sans text-sm shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:bg-white/20 dark:hover:bg-zinc-800 transition" },
      children: "Contactez-nous"
    }
  },
  {
    id: "btn-5", name: "Icon Pill", category: "Button",
    root: {
      id: "btn-5-root", type: "button",
      props: { className: "flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 font-sans text-sm hover:bg-zinc-200 dark:hover:bg-zinc-800 transition" },
      children: [
        { id: "btn-5-svg", type: "svg", props: { width: "16", height: "16", fill: "none", stroke: "currentColor", strokeWidth: "2", viewBox: "0 0 24 24", className: "pointer-events-none" }, children: [ { id: "btn-5-path", type: "path", props: { d: "M5 12h14M12 5l7 7-7 7" } } ] },
        { id: "btn-5-text", type: "span", props: { className: "pointer-events-none" }, children: "Continuer" }
      ]
    }
  }
];

// --- FOOTERS ---
export const footers = [
  {
    id: "foot-1-minimal", name: "Minimal 2-Column", category: "Footer",
    root: {
      id: "f1-root", type: "footer",
      props: { className: "w-full py-8 px-6 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 font-sans flex flex-col md:flex-row justify-between items-center gap-4 transition-colors" },
      children: [
        { id: "f1-logo", type: "div", props: { className: "font-serif font-bold text-lg text-zinc-900 dark:text-white" }, children: "Library." },
        { id: "f1-copy", type: "p", props: { className: "text-xs text-zinc-500" }, children: "© 2026 Tous droits réservés." },
        { id: "f1-links", type: "div", props: { className: "flex gap-4 text-xs font-medium text-zinc-600 dark:text-zinc-400" }, children: [
          { id: "f1-l1", type: "a", props: { href: "#", className: "hover:text-black dark:hover:text-white" }, children: "Twitter" },
          { id: "f1-l2", type: "a", props: { href: "#", className: "hover:text-black dark:hover:text-white" }, children: "GitHub" }
        ]}
      ]
    }
  },
  {
    id: "foot-2-corporate", name: "Corporate 4-Column", category: "Footer",
    root: {
      id: "f2-root", type: "footer",
      props: { className: "w-full py-16 px-8 bg-zinc-50 dark:bg-zinc-900/30 border-t border-zinc-200 dark:border-zinc-800 font-sans" },
      children: [
        { id: "f2-grid", type: "div", props: { className: "max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12" }, children: [
          { id: "f2-col1", type: "div", props: {}, children: [
            { id: "f2-c1-h4", type: "h4", props: { className: "font-semibold text-zinc-900 dark:text-white mb-4" }, children: "Produit" },
            { id: "f2-c1-ul", type: "ul", props: { className: "space-y-2 text-sm text-zinc-500 dark:text-zinc-400" }, children: [
              { id: "f2-c1-li1", type: "li", props: { className: "hover:text-amber-500 cursor-pointer" }, children: "Fonctionnalités" },
              { id: "f2-c1-li2", type: "li", props: { className: "hover:text-amber-500 cursor-pointer" }, children: "Tarifs" }
            ]}
          ]},
          { id: "f2-col2", type: "div", props: {}, children: [
            { id: "f2-c2-h4", type: "h4", props: { className: "font-semibold text-zinc-900 dark:text-white mb-4" }, children: "Ressources" },
            { id: "f2-c2-ul", type: "ul", props: { className: "space-y-2 text-sm text-zinc-500 dark:text-zinc-400" }, children: [
              { id: "f2-c2-li1", type: "li", props: { className: "hover:text-amber-500 cursor-pointer" }, children: "Documentation" },
              { id: "f2-c2-li2", type: "li", props: { className: "hover:text-amber-500 cursor-pointer" }, children: "Blog" }
            ]}
          ]}
        ]}
      ]
    }
  },
  {
    id: "foot-3-newsletter", name: "Newsletter Focused", category: "Footer",
    root: {
      id: "f3-root", type: "footer", props: { className: "w-full py-24 bg-zinc-950 text-center" }, children: [
        { id: "f3-h3", type: "h3", props: { className: "font-serif text-3xl text-white mb-4" }, children: "Rejoignez l'élite." },
        { id: "f3-form", type: "div", props: { className: "flex justify-center items-center max-w-md mx-auto" }, children: [
          { id: "f3-input", type: "input", props: { type: "email", placeholder: "Email", className: "bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-l-lg text-white text-sm focus:outline-none" } },
          { id: "f3-btn", type: "button", props: { className: "bg-white text-black px-4 py-2 rounded-r-lg text-sm font-semibold" }, children: "S'inscrire" }
        ]}
      ]
    }
  },
  {
    id: "foot-4-big-text", name: "Large Typography", category: "Footer",
    root: {
      id: "f4-root", type: "footer", props: { className: "w-full py-16 px-6 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800" }, children: [
        { id: "f4-h2", type: "h2", props: { className: "font-serif text-6xl md:text-8xl font-black text-zinc-100 dark:text-zinc-900 tracking-tighter" }, children: "LIBRARY" },
        { id: "f4-div", type: "div", props: { className: "mt-8 flex justify-between text-sm text-zinc-500 font-sans" }, children: [
          { id: "f4-p1", type: "p", props: {}, children: "Construit avec passion." },
          { id: "f4-p2", type: "p", props: {}, children: "2026" }
        ]}
      ]
    }
  },
  {
    id: "foot-5-split", name: "Split Social", category: "Footer",
    root: {
      id: "f5-root", type: "footer", props: { className: "w-full flex flex-col sm:flex-row bg-zinc-900 text-white font-sans" }, children: [
        { id: "f5-left", type: "div", props: { className: "w-full sm:w-1/2 p-12 border-b sm:border-b-0 sm:border-r border-zinc-800" }, children: [
          { id: "f5-h3", type: "h3", props: { className: "font-serif text-2xl mb-2" }, children: "Prêt à commencer ?" },
          { id: "f5-a1", type: "a", props: { href: "#", className: "text-amber-500 text-sm underline underline-offset-4" }, children: "Contactez les ventes" }
        ]},
        { id: "f5-right", type: "div", props: { className: "w-full sm:w-1/2 p-12 flex items-center gap-6" }, children: [
          { id: "f5-a2", type: "a", props: { href: "#", className: "hover:text-amber-500" }, children: "Instagram" },
          { id: "f5-a3", type: "a", props: { href: "#", className: "hover:text-amber-500" }, children: "LinkedIn" }
        ]}
      ]
    }
  }
];

// --- GRID FEATURES ---
export const gridFeatures = [
  {
    id: "grid-1-bento", name: "Bento Minimal", category: "Grid Features",
    root: {
      id: "g1-root", type: "div", props: { className: "max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 font-sans p-6" }, children: [
        { id: "g1-c1", type: "div", props: { className: "md:col-span-2 bg-zinc-100 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800" }, children: [
          { id: "g1-h3", type: "h3", props: { className: "text-xl font-bold text-zinc-900 dark:text-white mb-2" }, children: "Performance Ultime" },
          { id: "g1-p", type: "p", props: { className: "text-zinc-500 text-sm" }, children: "Optimisé pour la vitesse et le SEO par défaut." }
        ]},
        { id: "g1-c2", type: "div", props: { className: "bg-amber-500/10 p-8 rounded-3xl border border-amber-500/20" }, children: [
          { id: "g1-c2-h3", type: "h3", props: { className: "text-xl font-bold text-amber-600 dark:text-amber-500 mb-2" }, children: "Design Minimaliste" }
        ]}
      ]
    }
  },
  {
    id: "grid-2-icon-cards", name: "3-Column Icons", category: "Grid Features",
    root: {
      id: "g2-root", type: "div", props: { className: "grid grid-cols-1 md:grid-cols-3 gap-8 font-sans px-6 py-12 max-w-6xl mx-auto" }, children: [1, 2, 3].map(i => ({
        id: `g2-item-${i}`, type: "div", props: { className: "flex flex-col items-start border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl bg-white dark:bg-zinc-950 shadow-sm hover:shadow-md transition" }, children: [
          { id: `g2-icon-${i}`, type: "div", props: { className: "w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-4 text-zinc-800 dark:text-zinc-200" }, children: [
            { id: `g2-svg-${i}`, type: "svg", props: { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", className: "pointer-events-none" }, children: [
              { id: `g2-circle-${i}`, type: "circle", props: { cx: "12", cy: "12", r: "10" } }
            ]}
          ]},
          { id: `g2-h3-${i}`, type: "h3", props: { className: "text-base font-semibold text-zinc-900 dark:text-white mb-2" }, children: `Modularité ${i}` },
          { id: `g2-p-${i}`, type: "p", props: { className: "text-sm text-zinc-500" }, children: "Adaptez chaque composant à vos besoins en un clic." }
        ]
      }))
    }
  },
  {
    id: "grid-3-zigzag", name: "ZigZag Layout", category: "Grid Features",
    root: {
      id: "g3-root", type: "div", props: { className: "flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto px-6 py-16" }, children: [
        { id: "g3-img", type: "div", props: { className: "w-full md:w-1/2 aspect-video bg-zinc-200 dark:bg-zinc-800 rounded-2xl flex items-center justify-center" }, children: [
          { id: "g3-img-lbl", type: "span", props: { className: "text-xs font-mono text-zinc-400" }, children: "Visuel d'illustration" }
        ]},
        { id: "g3-content", type: "div", props: { className: "w-full md:w-1/2 space-y-4 font-sans" }, children: [
          { id: "g3-h3", type: "h3", props: { className: "text-2xl font-serif font-bold text-zinc-900 dark:text-white" }, children: "Création visuelle" },
          { id: "g3-p", type: "p", props: { className: "text-zinc-500" }, children: "Ne touchez plus au code si vous ne le souhaitez pas." }
        ]}
      ]
    }
  },
  {
    id: "grid-4-dark-glow", name: "Dark Glowing Cards", category: "Grid Features",
    root: {
      id: "g4-root", type: "div", props: { className: "grid grid-cols-2 gap-4 bg-zinc-950 p-8" }, children: [
        { id: "g4-c1", type: "div", props: { className: "p-6 border border-zinc-800 rounded-xl hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition" }, children: [
          { id: "g4-h3-1", type: "h3", props: { className: "text-white font-serif font-bold" }, children: "Sécurité" }
        ]},
        { id: "g4-c2", type: "div", props: { className: "p-6 border border-zinc-800 rounded-xl hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition" }, children: [
          { id: "g4-h3-2", type: "h3", props: { className: "text-white font-serif font-bold" }, children: "Rapidité" }
        ]}
      ]
    }
  },
  {
    id: "grid-5-numbered", name: "Numbered Steps", category: "Grid Features",
    root: {
      id: "g5-root", type: "div", props: { className: "flex flex-col sm:flex-row gap-8 max-w-4xl mx-auto font-sans p-8" }, children: [
        { id: "g5-s1", type: "div", props: { className: "flex-1" }, children: [
          { id: "g5-n1", type: "span", props: { className: "text-4xl font-bold text-zinc-200 dark:text-zinc-800 block" }, children: "01" },
          { id: "g5-h4-1", type: "h4", props: { className: "font-semibold text-zinc-900 dark:text-white mt-2" }, children: "Choisir" }
        ]},
        { id: "g5-s2", type: "div", props: { className: "flex-1" }, children: [
          { id: "g5-n2", type: "span", props: { className: "text-4xl font-bold text-zinc-200 dark:text-zinc-800 block" }, children: "02" },
          { id: "g5-h4-2", type: "h4", props: { className: "font-semibold text-zinc-900 dark:text-white mt-2" }, children: "Éditer" }
        ]},
        { id: "g5-s3", type: "div", props: { className: "flex-1" }, children: [
          { id: "g5-n3", type: "span", props: { className: "text-4xl font-bold text-zinc-200 dark:text-zinc-800 block" }, children: "03" },
          { id: "g5-h4-3", type: "h4", props: { className: "font-semibold text-zinc-900 dark:text-white mt-2" }, children: "Publier" }
        ]}
      ]
    }
  }
];

// --- HEROES ---
export const heroes = [
  {
    id: "hero-1-centered-luxe", name: "Centered Typography Luxe", category: "Hero",
    root: {
      id: "h1-root", type: "section", props: { className: "w-full bg-white dark:bg-zinc-950 py-24 md:py-32 px-6 flex flex-col items-center text-center transition-colors duration-300" }, children: [
        { id: "h1-badge", type: "div", props: { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-xs font-medium text-zinc-600 dark:text-zinc-300 font-sans mb-8" }, children: [
          { id: "h1-dot", type: "span", props: { className: "w-2 h-2 rounded-full bg-amber-500" } },
          { id: "h1-badge-txt", type: "span", props: {}, children: "Nouvelle Collection 2026" }
        ]},
        { id: "h1-title", type: "h1", props: { className: "font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-zinc-900 dark:text-white max-w-4xl tracking-tight leading-tight mb-6" }, children: "L'élégance redéfinie pour le web moderne." },
        { id: "h1-p", type: "p", props: { className: "font-sans text-base md:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mb-10" }, children: "Créez des expériences numériques inoubliables avec notre suite d'outils visuels conçue pour les créateurs exigeants." },
        { id: "h1-btns", type: "div", props: { className: "flex flex-col sm:flex-row gap-4 font-sans w-full sm:w-auto" }, children: [
          { id: "h1-btn1", type: "button", props: { className: "px-8 py-3.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold hover:opacity-90 transition shadow-lg" }, children: "Découvrir l'outil" },
          { id: "h1-btn2", type: "button", props: { className: "px-8 py-3.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-900 transition" }, children: "Voir le portfolio" }
        ]}
      ]
    }
  },
  {
    id: "hero-2-split-corporate", name: "Split Corporate & Image", category: "Hero",
    root: {
      id: "h2-root", type: "section", props: { className: "w-full bg-zinc-50 dark:bg-zinc-900/50 py-16 md:py-24 px-6 md:px-12 transition-colors duration-300" }, children: [
        { id: "h2-grid", type: "div", props: { className: "max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" }, children: [
          { id: "h2-col1", type: "div", props: { className: "flex flex-col items-start text-left" }, children: [
            { id: "h2-h1", type: "h1", props: { className: "font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white leading-[1.1] mb-6" }, children: "Construisez l'avenir de votre marque." },
            { id: "h2-p", type: "p", props: { className: "font-sans text-zinc-600 dark:text-zinc-400 text-lg mb-8 max-w-md" }, children: "Une plateforme tout-en-un pour gérer vos projets, vos designs et votre code, avec une esthétique irréprochable." },
            { id: "h2-btn", type: "button", props: { className: "font-sans px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium rounded-lg hover:opacity-90 transition flex items-center gap-2" }, children: [
              { id: "h2-btn-t", type: "span", props: { className: "pointer-events-none" }, children: "Commencer gratuitement" },
              { id: "h2-svg", type: "svg", props: { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", className: "pointer-events-none" }, children: [ { id: "h2-path", type: "path", props: { d: "M5 12h14M12 5l7 7-7 7" } } ] }
            ]}
          ]},
          { id: "h2-col2", type: "div", props: { className: "w-full aspect-[4/3] rounded-2xl bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 shadow-2xl overflow-hidden relative flex items-center justify-center" }, children: [
            { id: "h2-img-txt", type: "span", props: { className: "font-mono text-zinc-400 dark:text-zinc-500 text-sm" }, children: "Image / Dashboard Mockup" }
          ]}
        ]}
      ]
    }
  },
  {
    id: "hero-3-dark-gold", name: "Dark Luxury Minimal", category: "Hero",
    root: {
      id: "h3-root", type: "section", props: { className: "w-full bg-zinc-950 py-32 px-6 flex flex-col items-center justify-center relative overflow-hidden" }, children: [
        { id: "h3-glow", type: "div", props: { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" } },
        { id: "h3-content", type: "div", props: { className: "relative z-10 flex flex-col items-center text-center" }, children: [
          { id: "h3-top", type: "p", props: { className: "font-sans text-amber-500 uppercase tracking-[0.2em] text-xs font-bold mb-6" }, children: "Maison de Design" },
          { id: "h3-title", type: "h1", props: { className: "font-serif text-5xl md:text-7xl font-bold text-white mb-8 leading-tight" }, children: "L'art du détail." },
          { id: "h3-line", type: "div", props: { className: "w-16 h-px bg-amber-500/50 mb-8" } },
          { id: "h3-p", type: "p", props: { className: "font-sans text-zinc-400 max-w-lg mb-10 text-sm md:text-base leading-relaxed" }, children: "Nous concevons des espaces numériques uniques où le minimalisme rencontre le luxe absolu." },
          { id: "h3-btn", type: "button", props: { className: "font-sans px-8 py-4 border border-amber-500/30 text-amber-500 hover:bg-amber-500 hover:text-zinc-950 uppercase tracking-widest text-xs transition duration-500" }, children: "Explorer la galerie" }
        ]}
      ]
    }
  },
  {
    id: "hero-4-stats-bottom", name: "Typography with Metrics", category: "Hero",
    root: {
      id: "h4-root", type: "section", props: { className: "w-full bg-white dark:bg-zinc-950 pt-24 pb-16 px-6 transition-colors duration-300 border-b border-zinc-200 dark:border-zinc-800" }, children: [
        { id: "h4-container", type: "div", props: { className: "max-w-6xl mx-auto" }, children: [
          { id: "h4-top", type: "div", props: { className: "max-w-3xl mb-16" }, children: [
            { id: "h4-h1", type: "h1", props: { className: "font-serif text-5xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6 leading-tight" }, children: "L'infrastructure des équipes créatives." },
            { id: "h4-p", type: "p", props: { className: "font-sans text-lg text-zinc-500 dark:text-zinc-400 mb-8 max-w-xl" }, children: "De l'idée à la production en quelques secondes. Découvrez l'outil préféré des agences et des développeurs freelances." },
            { id: "h4-btns", type: "div", props: { className: "flex gap-4 font-sans" }, children: [
              { id: "h4-btn1", type: "button", props: { className: "px-6 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black font-semibold hover:scale-105 transition-transform" }, children: "Ouvrir l'éditeur" }
            ]}
          ]},
          { id: "h4-grid", type: "div", props: { className: "grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-zinc-200 dark:border-zinc-800" }, children: [
            { id: "h4-stat1", type: "div", props: {}, children: [ { id: "h4-v1", type: "p", props: { className: "font-serif text-3xl font-bold text-zinc-900 dark:text-white" }, children: "99.9%" }, { id: "h4-l1", type: "p", props: { className: "font-sans text-xs text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wider" }, children: "Uptime" } ]},
            { id: "h4-stat2", type: "div", props: {}, children: [ { id: "h4-v2", type: "p", props: { className: "font-serif text-3xl font-bold text-zinc-900 dark:text-white" }, children: "2M+" }, { id: "h4-l2", type: "p", props: { className: "font-sans text-xs text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wider" }, children: "Utilisateurs" } ]},
            { id: "h4-stat3", type: "div", props: {}, children: [ { id: "h4-v3", type: "p", props: { className: "font-serif text-3xl font-bold text-zinc-900 dark:text-white" }, children: "<50ms" }, { id: "h4-l3", type: "p", props: { className: "font-sans text-xs text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wider" }, children: "Latence moyenne" } ]},
            { id: "h4-stat4", type: "div", props: {}, children: [ { id: "h4-v4", type: "p", props: { className: "font-serif text-3xl font-bold text-zinc-900 dark:text-white" }, children: "4.9/5" }, { id: "h4-l4", type: "p", props: { className: "font-sans text-xs text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wider" }, children: "Note globale" } ]}
          ]}
        ]}
      ]
    }
  },
  {
    id: "hero-5-bento-grid", name: "Bento Layout Minimal", category: "Hero",
    root: {
      id: "h5-root", type: "section", props: { className: "w-full bg-zinc-100 dark:bg-zinc-950 py-16 px-6 transition-colors duration-300" }, children: [
        { id: "h5-grid", type: "div", props: { className: "max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4" }, children: [
          { id: "h5-main", type: "div", props: { className: "md:col-span-8 bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-center shadow-sm" }, children: [
            { id: "h5-h1", type: "h1", props: { className: "font-serif text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4" }, children: "Design System Unifié." },
            { id: "h5-p", type: "p", props: { className: "font-sans text-zinc-500 dark:text-zinc-400 mb-8 max-w-md" }, children: "Assemblez vos pages web visuellement avec notre bibliothèque de blocs exclusifs." },
            { id: "h5-btn", type: "button", props: { className: "font-sans self-start px-6 py-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium hover:opacity-90 transition" }, children: "Explorer les blocs" }
          ]},
          { id: "h5-side", type: "div", props: { className: "md:col-span-4 flex flex-col gap-4" }, children: [
            { id: "h5-s1", type: "div", props: { className: "flex-1 bg-zinc-900 dark:bg-zinc-800 rounded-3xl p-8 border border-zinc-800 dark:border-zinc-700 flex flex-col justify-between shadow-sm" }, children: [
              { id: "h5-svg", type: "svg", props: { width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", className: "text-amber-500 mb-4 pointer-events-none", strokeWidth: "1.5" }, children: [ { id: "h5-path", type: "path", props: { d: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" } } ] },
              { id: "h5-s1p", type: "p", props: { className: "font-serif text-lg font-bold text-white" }, children: "Architecture robuste" }
            ]},
            { id: "h5-s2", type: "div", props: { className: "flex-1 bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between shadow-sm" }, children: [
              { id: "h5-s2v", type: "p", props: { className: "font-serif text-3xl font-bold text-zinc-900 dark:text-white mb-2" }, children: "100+" },
              { id: "h5-s2l", type: "p", props: { className: "font-sans text-sm text-zinc-500 dark:text-zinc-400" }, children: "Composants prêts à l'emploi pour vos projets." }
            ]}
          ]}
        ]}
      ]
    }
  }
];

// --- MEGA MENUS ---
export const megaMenus = [
  {
    id: "mega-1", name: "Simple Grid", category: "Mega Menu",
    root: {
      id: "m1-root", type: "div", props: { className: "w-full max-w-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-8 grid grid-cols-2 gap-8 font-sans" }, children: [
        { id: "m1-col1", type: "div", props: { className: "space-y-3" }, children: [
          { id: "m1-h4a", type: "h4", props: { className: "text-zinc-900 dark:text-white font-semibold text-sm" }, children: "Design" },
          { id: "m1-pa1", type: "p", props: { className: "text-zinc-500 text-xs hover:text-amber-500 cursor-pointer" }, children: "Figma Plugins" },
          { id: "m1-pa2", type: "p", props: { className: "text-zinc-500 text-xs hover:text-amber-500 cursor-pointer" }, children: "Templates" }
        ]},
        { id: "m1-col2", type: "div", props: { className: "space-y-3" }, children: [
          { id: "m1-h4b", type: "h4", props: { className: "text-zinc-900 dark:text-white font-semibold text-sm" }, children: "Code" },
          { id: "m1-pb1", type: "p", props: { className: "text-zinc-500 text-xs hover:text-amber-500 cursor-pointer" }, children: "React / Next.js" },
          { id: "m1-pb2", type: "p", props: { className: "text-zinc-500 text-xs hover:text-amber-500 cursor-pointer" }, children: "Tailwind CSS" }
        ]}
      ]
    }
  },
  {
    id: "mega-2", name: "Split with Promo", category: "Mega Menu",
    root: {
      id: "m2-root", type: "div", props: { className: "w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl flex overflow-hidden border border-zinc-200 dark:border-zinc-800 font-sans" }, children: [
        { id: "m2-promo", type: "div", props: { className: "w-1/3 bg-zinc-100 dark:bg-zinc-950 p-8" }, children: [
          { id: "m2-h4", type: "h4", props: { className: "font-serif font-bold text-lg text-zinc-900 dark:text-white mb-2" }, children: "Pro 2026" },
          { id: "m2-p", type: "p", props: { className: "text-xs text-zinc-500 mb-4" }, children: "Découvrez la nouvelle mise à jour." },
          { id: "m2-btn", type: "button", props: { className: "text-xs font-semibold bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg" }, children: "Voir la vidéo" }
        ]},
        { id: "m2-links", type: "div", props: { className: "w-2/3 p-8 grid grid-cols-2 gap-4" }, children: [
          { id: "m2-a1", type: "a", props: { href: "#", className: "text-sm text-zinc-600 dark:text-zinc-300 font-medium hover:text-black dark:hover:text-white" }, children: "Documentation" },
          { id: "m2-a2", type: "a", props: { href: "#", className: "text-sm text-zinc-600 dark:text-zinc-300 font-medium hover:text-black dark:hover:text-white" }, children: "Tutoriels" }
        ]}
      ]
    }
  },
  {
    id: "mega-3", name: "Icon List", category: "Mega Menu",
    root: {
      id: "m3-root", type: "div", props: { className: "p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2 w-64 text-sm font-sans" }, children: [
        { id: "m3-item", type: "div", props: { className: "flex items-center gap-3 p-2 hover:bg-zinc-900 rounded-lg cursor-pointer text-white" }, children: [
          { id: "m3-icon", type: "div", props: { className: "w-8 h-8 rounded bg-zinc-800" } },
          { id: "m3-text", type: "span", props: {}, children: "Composants" }
        ]}
      ]
    }
  },
  {
    id: "mega-4", name: "Minimal Columns", category: "Mega Menu",
    root: {
      id: "m4-root", type: "div", props: { className: "p-8 bg-white dark:bg-black border-y border-zinc-200 dark:border-zinc-800 flex gap-12 font-sans" }, children: [
        { id: "m4-col", type: "div", props: { className: "flex flex-col gap-2 text-sm" }, children: [
          { id: "m4-span", type: "span", props: { className: "font-bold text-zinc-900 dark:text-white mb-2" }, children: "Solutions" },
          { id: "m4-a", type: "a", props: { href: "#", className: "text-zinc-500 hover:text-amber-500" }, children: "E-commerce" }
        ]}
      ]
    }
  },
  {
    id: "mega-5", name: "Dark Luxe Gallery", category: "Mega Menu",
    root: {
      id: "m5-root", type: "div", props: { className: "w-full bg-zinc-950 p-8 grid grid-cols-4 gap-4" }, children: [
        { id: "m5-img", type: "div", props: { className: "col-span-1 bg-zinc-900 h-32 rounded-lg" } },
        { id: "m5-txt", type: "div", props: { className: "col-span-3 text-white font-serif p-4" }, children: "Collection Hiver" }
      ]
    }
  }
];

// --- NAVBARS ---
export const navbars = [
  {
    id: "nav-1-minimal-luxe", name: "Minimal Luxe", category: "Navbar",
    root: {
      id: "nav1-root", type: "nav", props: { className: "w-full bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between transition-colors duration-300" }, children: [
        { id: "nav1-brand", type: "div", props: { className: "font-serif text-2xl font-bold tracking-widest text-zinc-900 dark:text-white uppercase" }, children: "Brand" },
        { id: "nav1-links", type: "div", props: { className: "hidden md:flex gap-6 text-sm font-medium text-zinc-500 dark:text-zinc-400 font-sans" }, children: [
          { id: "nav1-a1", type: "a", props: { href: "#", className: "hover:text-zinc-900 dark:hover:text-zinc-100 transition" }, children: "Boutique" },
          { id: "nav1-a2", type: "a", props: { href: "#", className: "hover:text-zinc-900 dark:hover:text-zinc-100 transition" }, children: "Collections" }
        ]},
        { id: "nav1-btn-wrap", type: "div", props: { className: "hidden md:flex gap-4 text-sm font-sans" }, children: [
          { id: "nav1-btn", type: "button", props: { className: "text-zinc-900 dark:text-zinc-100 font-semibold hover:text-amber-500 transition" }, children: "Connexion" }
        ]},
        { id: "nav1-mobile", type: "button", props: { className: "md:hidden text-zinc-900 dark:text-white p-2" }, children: [
          { id: "nav1-m-svg", type: "svg", props: { width: "24", height: "24", fill: "none", stroke: "currentColor", strokeWidth: "2", className: "pointer-events-none" }, children: [
            { id: "nav1-m-l1", type: "line", props: { x1: "3", y1: "12", x2: "21", y2: "12" } },
            { id: "nav1-m-l2", type: "line", props: { x1: "3", y1: "6", x2: "21", y2: "6" } },
            { id: "nav1-m-l3", type: "line", props: { x1: "3", y1: "18", x2: "21", y2: "18" } }
          ]}
        ]}
      ]
    }
  },
  {
    id: "nav-2-floating-glass", name: "Floating Glass", category: "Navbar",
    root: {
      id: "nav2-wrap", type: "div", props: { className: "w-full flex justify-center p-4 relative top-0 z-50" }, children: [
        { id: "nav2-root", type: "nav", props: { className: "w-full max-w-4xl bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-full px-6 py-3 flex items-center justify-between shadow-sm transition-colors duration-300" }, children: [
          { id: "nav2-brand", type: "span", props: { className: "font-serif font-bold text-lg text-zinc-900 dark:text-white" }, children: "STUDIO" },
          { id: "nav2-links", type: "div", props: { className: "hidden md:flex gap-8 text-xs font-medium text-zinc-600 dark:text-zinc-400 font-sans" }, children: [
            { id: "nav2-a1", type: "a", props: { href: "#", className: "hover:text-zinc-900 dark:hover:text-white transition" }, children: "Accueil" },
            { id: "nav2-a2", type: "a", props: { href: "#", className: "hover:text-zinc-900 dark:hover:text-white transition" }, children: "Projets" },
            { id: "nav2-a3", type: "a", props: { href: "#", className: "hover:text-zinc-900 dark:hover:text-white transition" }, children: "Contact" }
          ]},
          { id: "nav2-btn", type: "button", props: { className: "hidden md:block bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs px-4 py-2 rounded-full font-semibold hover:opacity-90 transition font-sans" }, children: "Démarrer" },
          { id: "nav2-mobile", type: "button", props: { className: "md:hidden text-zinc-900 dark:text-white p-1" }, children: [
            { id: "nav2-svg", type: "svg", props: { width: "24", height: "24", fill: "none", stroke: "currentColor", strokeWidth: "2", className: "pointer-events-none" }, children: [
              { id: "nav2-l1", type: "line", props: { x1: "3", y1: "12", x2: "21", y2: "12" } },
              { id: "nav2-l2", type: "line", props: { x1: "3", y1: "6", x2: "21", y2: "6" } },
              { id: "nav2-l3", type: "line", props: { x1: "3", y1: "18", x2: "21", y2: "18" } }
            ]}
          ]}
        ]}
      ]
    }
  },
  {
    id: "nav-3-gold-accent", name: "Dark Gold Accent", category: "Navbar",
    root: {
      id: "n3-root", type: "nav", props: { className: "w-full bg-zinc-950 border-b border-zinc-900 px-8 py-5 flex items-center justify-between" }, children: [
        { id: "n3-brand-wrap", type: "div", props: { className: "flex items-center gap-2" }, children: [
          { id: "n3-dot", type: "div", props: { className: "w-3 h-3 bg-amber-500 rounded-sm rotate-45" } },
          { id: "n3-brand", type: "span", props: { className: "font-serif text-xl font-bold text-white tracking-wide" }, children: "LUXE" }
        ]},
        { id: "n3-links", type: "div", props: { className: "hidden lg:flex gap-8 text-sm text-zinc-400 font-sans" }, children: [
          { id: "n3-a1", type: "a", props: { href: "#", className: "hover:text-amber-500 transition" }, children: "Services" },
          { id: "n3-a2", type: "a", props: { href: "#", className: "hover:text-amber-500 transition" }, children: "Expertise" },
          { id: "n3-a3", type: "a", props: { href: "#", className: "hover:text-amber-500 transition" }, children: "Journal" }
        ]},
        { id: "n3-btn", type: "button", props: { className: "hidden lg:block border border-amber-500 text-amber-500 px-5 py-2 text-xs uppercase tracking-wider font-sans hover:bg-amber-500 hover:text-black transition duration-300" }, children: "Réserver" }
      ]
    }
  },
  {
    id: "nav-4-split-corporate", name: "Split Corporate", category: "Navbar",
    root: {
      id: "n4-root", type: "nav", props: { className: "w-full bg-white dark:bg-zinc-900 flex items-center justify-between px-8 py-4 border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300" }, children: [
        { id: "n4-brand-wrap", type: "div", props: { className: "font-bold text-xl text-zinc-900 dark:text-zinc-100 flex items-center gap-2 font-serif" }, children: [
          { id: "n4-logo", type: "div", props: { className: "w-6 h-6 bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center rounded text-xs" }, children: "L" },
          { id: "n4-txt", type: "span", props: {}, children: "Library" }
        ]},
        { id: "n4-links", type: "div", props: { className: "hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-300 font-sans" }, children: [
          { id: "n4-a1", type: "a", props: { href: "#", className: "hover:text-black dark:hover:text-white transition" }, children: "Produits" },
          { id: "n4-a2", type: "a", props: { href: "#", className: "hover:text-black dark:hover:text-white transition" }, children: "Ressources" },
          { id: "n4-a3", type: "a", props: { href: "#", className: "hover:text-black dark:hover:text-white transition" }, children: "Tarifs" },
          { id: "n4-a4", type: "a", props: { href: "#", className: "text-zinc-900 dark:text-white transition" }, children: "Connexion" }
        ]}
      ]
    }
  },
  {
    id: "nav-5-sidebar-trigger", name: "Sidebar Trigger", category: "Navbar",
    root: {
      id: "n5-root", type: "nav", props: { className: "w-full bg-white dark:bg-zinc-950 px-6 py-4 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900 transition-colors duration-300" }, children: [
        { id: "n5-left", type: "div", props: { className: "flex items-center gap-4" }, children: [
          { id: "n5-brand1", type: "span", props: { className: "font-serif text-lg font-semibold text-zinc-900 dark:text-zinc-100" }, children: "MAGAZINE" }
        ]}
      ]
    }
  }
];

// --- PRICING CARDS ---
export const pricingCards = [
  {
    id: "price-1-luxe", name: "Dark Luxe Pricing", category: "Pricing",
    root: {
      id: "p1-root", type: "div", props: { className: "w-80 bg-zinc-950 border border-zinc-800 rounded-3xl p-8 text-center shadow-xl relative overflow-hidden font-sans" }, children: [
        { id: "p1-h3", type: "h3", props: { className: "text-white font-serif text-xl font-bold mb-2" }, children: "Studio" },
        { id: "p1-p", type: "p", props: { className: "text-zinc-400 text-sm mb-6" }, children: "Pour les agences" },
        { id: "p1-price-div", type: "div", props: { className: "flex justify-center items-baseline gap-1 mb-8" }, children: [
          { id: "p1-price", type: "span", props: { className: "text-4xl font-bold text-white" }, children: "49€" },
          { id: "p1-period", type: "span", props: { className: "text-zinc-500 text-sm" }, children: "/mois" }
        ]},
        { id: "p1-btn", type: "button", props: { className: "w-full bg-amber-500 text-zinc-950 font-bold py-3 rounded-xl hover:bg-amber-400 transition mb-6" }, children: "Choisir ce plan" },
        { id: "p1-ul", type: "ul", props: { className: "text-left space-y-3 text-sm text-zinc-400" }, children: [
          { id: "p1-li1", type: "li", props: { className: "flex items-center gap-2" }, children: [
            { id: "p1-t1", type: "span", props: {}, children: "✓ Projets illimités" }
          ]},
          { id: "p1-li2", type: "li", props: { className: "flex items-center gap-2" }, children: [
            { id: "p1-t2", type: "span", props: {}, children: "✓ Exportation de code" }
          ]}
        ]}
      ]
    }
  },
  {
    id: "price-2-minimal", name: "Minimal White Pricing", category: "Pricing",
    root: {
      id: "p2-root", type: "div", props: { className: "w-72 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl font-sans" }, children: [
        { id: "p2-h3", type: "h3", props: { className: "font-bold text-zinc-900 dark:text-white text-lg" }, children: "Indépendant" },
        { id: "p2-price", type: "p", props: { className: "text-2xl font-serif text-zinc-900 dark:text-white mt-4 mb-6" }, children: "0€" },
        { id: "p2-btn", type: "button", props: { className: "w-full py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-lg text-sm font-semibold mb-4 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition" }, children: "Gratuit à vie" },
        { id: "p2-p", type: "p", props: { className: "text-xs text-zinc-500" }, children: "Idéal pour tester le produit." }
      ]
    }
  }
];

// --- PRODUCT CARDS ---
export const productCards = [
  {
    id: "prod-1-minimal", name: "Minimalist Studio", category: "Product",
    root: {
      id: "pr1-root", type: "div", props: { className: "w-72 group cursor-pointer font-sans" }, children: [
        { id: "pr1-img", type: "div", props: { className: "aspect-[4/5] bg-zinc-100 dark:bg-zinc-900 rounded-2xl overflow-hidden mb-4 relative transition-colors duration-300 flex items-center justify-center" }, children: [
          { id: "pr1-img-lbl", type: "span", props: { className: "text-xs font-mono text-zinc-400" }, children: "Image Produit" }
        ]},
        { id: "pr1-bot", type: "div", props: { className: "flex justify-between items-start" }, children: [
          { id: "pr1-text", type: "div", props: {}, children: [
            { id: "pr1-h3", type: "h3", props: { className: "text-sm font-semibold text-zinc-900 dark:text-zinc-100" }, children: "Chaise Minimaliste" },
            { id: "pr1-p", type: "p", props: { className: "text-xs text-zinc-500 dark:text-zinc-400 mt-1" }, children: "Édition Limitée" }
          ]},
          { id: "pr1-price", type: "span", props: { className: "text-sm font-serif font-bold text-zinc-900 dark:text-white" }, children: "299€" }
        ]}
      ]
    }
  },
  {
    id: "prod-2-dark-luxe", name: "Dark Luxe Accent", category: "Product",
    root: {
      id: "pr2-root", type: "div", props: { className: "w-80 bg-zinc-950 border border-zinc-800 p-4 rounded-xl group hover:border-amber-500/50 transition duration-300" }, children: [
        { id: "pr2-img", type: "div", props: { className: "aspect-square bg-zinc-900 rounded-lg mb-4 flex items-center justify-center" }, children: [
          { id: "pr2-img-lbl", type: "span", props: { className: "text-xs font-mono text-zinc-600" }, children: "Photo Montre" }
        ]},
        { id: "pr2-h3", type: "h3", props: { className: "font-serif text-lg text-white mb-1" }, children: "Montre Chronographe" },
        { id: "pr2-p", type: "p", props: { className: "text-xs text-zinc-500 mb-4 font-sans" }, children: "Acier inoxydable, verre saphir." },
        { id: "pr2-bot", type: "div", props: { className: "flex justify-between items-center font-sans" }, children: [
          { id: "pr2-price", type: "span", props: { className: "text-amber-500 font-semibold" }, children: "1 450€" },
          { id: "pr2-btn", type: "button", props: { className: "text-xs uppercase tracking-wider text-white border border-zinc-700 hover:border-amber-500 hover:text-amber-500 px-4 py-2 rounded transition" }, children: "Ajouter" }
        ]}
      ]
    }
  }
];

// --- TEXT AREAS ---
export const textAreas = [
  {
    id: "input-1-minimal", name: "Minimal Underline", category: "Input",
    root: { id: "in1-root", type: "input", props: { type: "text", placeholder: "Entrez votre nom", className: "w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition font-sans placeholder-zinc-400" } }
  },
  {
    id: "input-2-luxe", name: "Dark Luxe Border", category: "Input",
    root: { id: "in2-root", type: "textarea", props: { rows: "4", placeholder: "Votre message...", className: "w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans" } }
  }
];

// --- TEXT ROTATORS ---
export const textRotators = [
  {
    id: "text-1", name: "Gradient Text", category: "Text Rotator",
    root: { id: "tr1-root", type: "h2", props: { className: "font-serif text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-400 dark:from-white dark:to-zinc-600" }, children: "Le futur du design." }
  },
  {
    id: "text-2", name: "Gold Highlight", category: "Text Rotator",
    root: { id: "tr2-root", type: "h2", props: { className: "font-serif text-4xl font-bold text-zinc-900 dark:text-white" }, children: "Créer sans limites." }
  },
  {
    id: "text-3", name: "Pulse Effect", category: "Text Rotator",
    root: {
      id: "tr3-root", type: "div", props: { className: "font-sans text-lg font-medium text-zinc-900 dark:text-white flex items-center gap-2" }, children: [
        { id: "tr3-span", type: "span", props: { className: "w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse pointer-events-none" } },
        { id: "tr3-text", type: "span", props: {}, children: "Système opérationnel" }
      ]
    }
  }
];