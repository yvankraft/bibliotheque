"use client";

import {
  FiLayout,
  FiLayers,
  FiSearch,
  FiChevronRight,
  FiTrash2,
} from "react-icons/fi";
import type { ActiveTab, RawBlockDef, UIBlockInstance } from "./types";

interface Category {
  name: string;
  blocks: RawBlockDef[];
}

interface LeftSidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (t: ActiveTab) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  openCategory: string | null;
  setOpenCategory: (c: string | null) => void;
  categories: Category[];
  canvasBlocks: UIBlockInstance[];
  onDragStartSidebar: (e: React.DragEvent, block: RawBlockDef) => void;
  onAddBlock: (block: RawBlockDef) => void;
  onRemoveBlock: (instanceId: string) => void;
  onSelectBlock: (block: UIBlockInstance) => void;
}

export default function LeftSidebar({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  openCategory,
  setOpenCategory,
  categories,
  canvasBlocks,
  onDragStartSidebar,
  onAddBlock,
  onRemoveBlock,
  onSelectBlock,
}: LeftSidebarProps) {
  return (
    <aside className="w-80 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex flex-col shrink-0 text-xs">
      {/* TABS */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800 p-2 gap-1 bg-white/50 dark:bg-zinc-900/50">
        <button
          onClick={() => setActiveTab("layers")}
          className={`flex-1 py-1.5 font-medium rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${activeTab === "layers"
            ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
            : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
            }`}
        >
          <FiLayers size={13} />
          Layers ({canvasBlocks.length})
        </button>
        <button
          onClick={() => setActiveTab("components")}
          className={`flex-1 py-1.5 font-medium rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${activeTab === "components"
            ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
            : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
            }`}
        >
          <FiLayout size={13} />
          Assets
        </button>
      </div>

      {/* SEARCH */}
      {activeTab === "components" && (
        <div className="p-3 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 focus-within:border-amber-500 transition">
            <FiSearch size={14} className="text-zinc-400" />
            <input
              type="text"
              placeholder="Rechercher un composant..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-xs text-zinc-900 dark:text-white placeholder-zinc-400"
            />
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {activeTab === "components" ? (
          <div className="space-y-2">
            {categories.map((cat) => {
              const filteredBlocks = cat.blocks.filter((b) =>
                b.name.toLowerCase().includes(searchQuery.toLowerCase())
              );

              if (filteredBlocks.length === 0 && searchQuery) return null;

              return (
                <div
                  key={cat.name}
                  className="border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900/40 overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() =>
                      setOpenCategory(
                        openCategory === cat.name ? null : cat.name
                      )
                    }
                    className="w-full px-3.5 py-2.5 flex items-center justify-between font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>{cat.name}</span>
                    </div>
                    <FiChevronRight
                      size={12}
                      className={`transform transition-transform text-zinc-400 ${openCategory === cat.name ? "rotate-90" : ""
                        }`}
                    />
                  </button>

                  {openCategory === cat.name && (
                    <div className="p-2 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 space-y-1.5">
                      {filteredBlocks.map((block) => (
                        <div
                          key={block.id}
                          draggable
                          onDragStart={(e) => onDragStartSidebar(e, block)}
                          onClick={() => onAddBlock(block)}
                          className="group p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-amber-500 transition cursor-grab active:cursor-grabbing flex items-center justify-between shadow-xs"
                        >
                          <div className="flex flex-col">
                            <span className="font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-white">
                              {block.name}
                            </span>
                            <span className="text-[10px] text-zinc-400 uppercase font-mono">
                              {block.category}
                            </span>
                          </div>
                          <span className="text-[10px] text-amber-600 dark:text-amber-400 opacity-0 group-hover:opacity-100 transition font-medium">
                            + Placer
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-1">
            {canvasBlocks.map((b, idx) => (
              <div
                key={b.instanceId}
                onClick={() => onSelectBlock(b)}
                className="p-2.5 rounded-xl font-medium flex items-center justify-between bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 cursor-pointer shadow-xs hover:border-zinc-400 dark:hover:border-zinc-700 transition"
              >
                <span>
                  #{idx + 1} {b.name}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveBlock(b.instanceId);
                  }}
                  className="text-zinc-400 hover:text-red-500 transition"
                >
                  <FiTrash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}