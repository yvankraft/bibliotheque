import { Layout, Server, Database } from "lucide-react";
import Link from "next/link";
// On importe tes datas pour calculer les compteurs
import { componentsListData } from "@/app/data/components";

export default function ComponentsHub() {
  // Fonction pour compter dynamiquement
  const getCount = (slug: string) =>
    componentsListData.filter(
      (comp) => comp.category.toLowerCase() === slug.toLowerCase(),
    ).length;

  const categories = [
    {
      title: "Frontend",
      slug: "frontend",
      description: "Composants UI, animations Framer Motion et hooks React.",
      icon: <Layout size={32} />,
      count: getCount("frontend"),
    },
    {
      title: "Backend",
      slug: "backend",
      description:
        "Schémas de base de données, API routes et utilitaires serveurs.",
      icon: <Server size={32} />,
      count: getCount("backend"),
    },
    {
      title: "Fullstack",
      slug: "fullstack",
      description:
        "Modules complets incluant logique serveur et interface utilisateur.",
      icon: <Database size={32} />,
      count: getCount("fullstack"),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto min-h-screen overflow-y-auto py-12 px-6 flex flex-col items-center justify-center">
      <div className="mb-12 flex flex-col items-center">
        <h1 className="text-4xl font-black tracking-tighter text-zinc-900 dark:text-white mb-4">
          Components.hub
        </h1>
        <p className="text-zinc-500 max-w-2xl flex flex-col items-center text-center">
          Select a category to explore ready-to-use blocks of code employment.
          All components are highly customizable.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/composants/${cat.slug}`}
            className="group relative p-8 border border-zinc-200 rounded-2xl bg-white dark:bg-zinc-800 transition-all hover:border-black active:scale-[0.98] shadow-sm flex flex-col"
          >
            <div className="mb-6 text-zinc-400 group-hover:text-black transition-colors">
              {cat.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{cat.title}</h3>
            <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
              {cat.description}
            </p>

            {/* Le compteur dynamique */}
            <div className="mt-auto flex items-center justify-between text-xs font-bold uppercase tracking-widest">
              <span className={cat.count > 0 ? "text-black" : "text-zinc-300"}>
                {cat.count} {cat.count > 1 ? "composants" : "composant"}
              </span>
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
      <footer className="mt-24 mb-10 p-10 text-center">
        <p className="text-zinc-400 italic font-medium text-lg leading-relaxed">
          "Because we believe our components should bend to your needs,
          <span className="text-zinc-900 dark:text-white not-italic font-bold">
            {" "}
            not the other way around.
          </span>
          "
        </p>
      </footer>
    </div>
  );
}
