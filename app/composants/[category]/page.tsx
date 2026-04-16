import { use } from "react"; // Ajoute cet import
import {
  componentsListData as componentsData,
  ComponentItem,
} from "@/app/data/components";
import SeeMoreButton from "@/app/components/SeeMoreButton";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>; // On précise que c'est une Promise
}) {
  // 1. On déballe params avec React.use()
  const { category } = use(params);

  // 2. On filtre avec sécurité
  const components: ComponentItem[] = componentsData.filter((item) => {
    if (!item?.category || !category) return false;
    return item.category.toLowerCase() === category.toLowerCase();
  });

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <header className="mb-12 py-8">
        <h1 className="text-4xl font-black uppercase tracking-tighter">
          <span className="text-zinc-400">ALL</span> {category}{" "}
          <span className="text-zinc-400"> Library</span>
        </h1>
        {/* ... reste du header ... */}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {components.length > 0 ? (
          components.map((item: ComponentItem) => (
            <div
              key={item.id}
              className="group flex flex-col border border-zinc-200 rounded-2xl bg-white overflow-hidden hover:border-black transition-all"
            >
              <div className="aspect-video bg-zinc-50 flex items-center justify-center p-10 group-hover:bg-zinc-100/50 transition-colors">
                <div className="scale-125">{item.preview}</div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-zinc-500 text-sm mt-2 mb-6 line-clamp-2">
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
          <p className="text-zinc-400 italic py-10">No components found.</p>
        )}
      </div>
    </div>
  );
}
