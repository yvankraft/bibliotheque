import { Layout, Server, Database, ArrowRight } from "lucide-react";
import Link from "next/link";
import { componentsListData } from "@/app/data/components";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

export default function ComponentsHub() {
  const getCount = (slug: string) =>
    componentsListData.filter(
      (comp) => comp.category.toLowerCase() === slug.toLowerCase(),
    ).length;

  const categories = [
    {
      title: "Frontend",
      slug: "frontend",
      description:
        "UI components, Framer Motion animations and React hooks.",
      icon: Layout,
      count: getCount("frontend"),
    },
    {
      title: "Backend",
      slug: "backend",
      description:
        "Database schemas, API routes and server utilities.",
      icon: Server,
      count: getCount("backend"),
    },
    {
      title: "Fullstack",
      slug: "fullstack",
      description:
        "Complete modules including server logic and user interface.",
      icon: Database,
      count: getCount("fullstack"),
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      <Navbar />

      <main className="max-w-5xl mx-auto min-h-screen pt-32 pb-12 px-6 flex flex-col items-center">
        <div className="mb-14 flex flex-col items-center text-center space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
            Component library
          </p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900 dark:text-white">
            Components.hub
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl">
            Select a category to explore ready-to-use blocks of code. All
            components are highly customizable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                href={`/composants/${cat.slug}`}
                className="group relative p-8 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900/40 hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-xl hover:shadow-zinc-900/5 dark:hover:shadow-black/30 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-500 dark:text-zinc-300 mb-6 group-hover:scale-110 group-hover:text-zinc-900 dark:group-hover:text-white transition-all">
                  <Icon size={20} />
                </div>
                <h3 className="text-xl font-bold mb-2">{cat.title}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-8 leading-relaxed">
                  {cat.description}
                </p>

                <div className="mt-auto flex items-center justify-between text-xs font-bold uppercase tracking-widest">
                  <span
                    className={
                      cat.count > 0
                        ? "text-zinc-900 dark:text-white"
                        : "text-zinc-300 dark:text-zinc-700"
                    }
                  >
                    {cat.count} {cat.count > 1 ? "components" : "component"}
                  </span>
                  <ArrowRight
                    size={15}
                    className="text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:translate-x-1 transition-all"
                  />
                </div>
              </Link>
            );
          })}
        </div>

        <p className="mt-24 mb-6 text-center text-zinc-400 dark:text-zinc-500 italic font-medium text-lg leading-relaxed max-w-2xl">
          &ldquo;Because we believe our components should bend to your needs,{" "}
          <span className="text-zinc-900 dark:text-white not-italic font-bold">
            not the other way around.
          </span>
          &rdquo;
        </p>
      </main>

      <Footer />
    </div>
  );
}
