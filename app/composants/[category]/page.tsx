import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowLeft } from "lucide-react";
import {
  componentsListData as componentsData,
  ComponentItem,
} from "@/app/data/components";
import SeeMoreButton from "@/app/components/SeeMoreButton";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/footer";

const VALID_CATEGORIES = ["frontend", "backend", "fullstack"];

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  if (!VALID_CATEGORIES.includes(category.toLowerCase())) {
    notFound();
  }

  const components: ComponentItem[] = componentsData.filter(
    (item) => item?.category?.toLowerCase() === category.toLowerCase(),
  );

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      <Navbar />

      <main className="max-w-6xl mx-auto pt-32 pb-16 px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500 mb-8">
          <Link
            href="/composants"
            className="hover:text-zinc-900 dark:hover:text-white transition"
          >
            Components
          </Link>
          <ChevronRight size={12} />
          <span className="text-zinc-900 dark:text-white font-medium capitalize">
            {category}
          </span>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
            <span className="text-zinc-300 dark:text-zinc-700">All</span>{" "}
            {category}{" "}
            <span className="text-zinc-300 dark:text-zinc-700">Library</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-3">
            {components.length} {components.length > 1 ? "components" : "component"}{" "}
            available
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {components.length > 0 ? (
            components.map((item: ComponentItem) => (
              <div
                key={item.id}
                className="group flex flex-col border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900/40 overflow-hidden hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-xl hover:shadow-zinc-900/5 dark:hover:shadow-black/30 transition-all duration-300"
              >
                <div className="aspect-video bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center p-10 group-hover:bg-zinc-100/70 dark:group-hover:bg-zinc-800/50 transition-colors border-b border-zinc-100 dark:border-zinc-800">
                  <div className="scale-125">{item.preview}</div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 mb-6 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex justify-start">
                    <SeeMoreButton
                      href={`/composants/${category}/${item.slug}`}
                      text="View Details"
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
              <p className="text-zinc-400 dark:text-zinc-500 italic">
                No components in this category yet.
              </p>
              <Link
                href="/composants"
                className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition"
              >
                <ArrowLeft size={13} />
                Back to hub
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
