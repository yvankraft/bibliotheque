"use client";

import { FiMousePointer, FiType, FiSquare, FiPlusSquare, FiFileText, FiPlus, FiX } from "react-icons/fi";

interface PageItem {
  id: string;
  name: string;
}

interface EditorToolbarProps {
  activeTool: string;
  setActiveTool: (tool: string) => void;
  pages: PageItem[];
  activePageId: string;
  onSelectPage: (id: string) => void;
  onAddPage: () => void;
  onDeletePage: (id: string) => void;
}

export default function EditorToolbar({
  activeTool,
  setActiveTool,
  pages,
  activePageId,
  onSelectPage,
  onAddPage,
  onDeletePage,
}: EditorToolbarProps) {
  const tools = [
    { id: "cursor", icon: FiMousePointer, label: "Sélectionner" },
    { id: "frame", icon: FiSquare, label: "Conteneur" },
    { id: "text", icon: FiType, label: "Texte" },
    { id: "button", icon: FiPlusSquare, label: "Bouton" },
  ];

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-1.5 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-full shadow-2xl">
      
      {/* Outils */}
      <div className="flex items-center gap-1">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              title={tool.label}
              className={`p-2.5 rounded-full transition-all duration-200 ${
                isActive 
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-md" 
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900"
              }`}
            >
              <Icon size={16} />
            </button>
          );
        })}
      </div>

      <div className="w-px h-6 bg-zinc-300 dark:bg-zinc-800 mx-1" />

      {/* Gestion des pages */}
      <div className="flex items-center gap-1 overflow-x-auto max-w-xs px-1">
        {pages.map((page) => {
          const isActive = page.id === activePageId;
          return (
            <div
              key={page.id}
              onClick={() => onSelectPage(page.id)}
              className={`group flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                isActive
                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              }`}
            >
              <FiFileText size={14} />
              <span>{page.name}</span>
              {pages.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeletePage(page.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity"
                >
                  <FiX size={12} />
                </button>
              )}
            </div>
          );
        })}

        <button 
          onClick={onAddPage}
          title="Nouvelle page"
          className="p-2 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
        >
          <FiPlus size={16} />
        </button>
      </div>

    </div>
  );
}