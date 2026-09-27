import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { componentsListData } from "@/app/data/components";
import CopyButton from "@/app/components/CopyButton";
import { CopyCommand } from "@/app/components/CopyCommand";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/footer";

export default async function ComponentDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;

  const component = componentsListData.find(
    (item) =>
      item.slug === slug &&
      item.category.toLowerCase() === category.toLowerCase(),
  );

  if (!component) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      <Navbar />

      <main className="max-w-6xl mx-auto pt-32 pb-16 px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500 mb-8 flex-wrap">
          <Link
            href="/composants"
            className="hover:text-zinc-900 dark:hover:text-white transition"
          >
            Components
          </Link>
          <ChevronRight size={12} />
          <Link
            href={`/composants/${category}`}
            className="hover:text-zinc-900 dark:hover:text-white transition capitalize"
          >
            {category}
          </Link>
          <ChevronRight size={12} />
          <span className="text-zinc-900 dark:text-white font-medium">
            {component.title}
          </span>
        </nav>

        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter">
            {component.title}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-3 max-w-2xl leading-relaxed">
            {component.description}
          </p>
        </header>

        {/* Preview */}
        <section className="mb-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
            Live Preview
          </h2>
          <div className="flex items-center justify-center min-h-[280px] rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] dark:bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:16px_16px] p-10">
            <div className="scale-125">{component.preview}</div>
          </div>
        </section>

        {/* Installation */}
        <section className="mb-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
            Installation
          </h2>
          <CopyCommand command={component.installCommand} />
        </section>

        {/* Props */}
        {component.props.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
              Props
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-zinc-900 text-left">
                    <th className="px-5 py-3 text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                      Name
                    </th>
                    <th className="px-5 py-3 text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                      Type
                    </th>
                    <th className="px-5 py-3 text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                      Default
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {component.props.map((prop) => (
                    <tr key={prop.name}>
                      <td className="px-5 py-3 font-mono text-xs font-semibold">
                        {prop.name}
                      </td>
                      <td className="px-5 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">
                        {prop.type}
                      </td>
                      <td className="px-5 py-3 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                        {prop.default}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Code source */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Source Code
            </h2>
            <CopyButton code={component.codeTSX} />
          </div>
          <pre className="bg-zinc-950 text-zinc-300 p-6 rounded-2xl text-xs font-mono leading-relaxed overflow-x-auto border border-zinc-800">
            {component.codeTSX}
          </pre>
        </section>
      </main>

      <Footer />
    </div>
  );
}
