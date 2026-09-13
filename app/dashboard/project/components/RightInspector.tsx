// app/project/[id]/components/RightInspector.tsx

"use client";

import { FiSettings } from "react-icons/fi";
import type { UIElement } from "./types";

interface RightInspectorProps {
  activeElement: UIElement | null;
  zoom: number;
  onUpdateSelected: (updates: Partial<UIElement>) => void;
}

export default function RightInspector({
  activeElement,
  zoom,
  onUpdateSelected,
}: RightInspectorProps) {
  return (
    <aside className="w-72 border-l border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex flex-col shrink-0 p-4 space-y-6 text-xs overflow-y-auto">
      <div>
        <h4 className="font-semibold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
          <FiSettings size={14} className="text-amber-500" />
          Inspector
        </h4>
        <p className="text-[11px] text-zinc-500">
          {activeElement
            ? `Élément : ${activeElement.type}`
            : "Sélectionnez un composant pour l'éditer."}
        </p>
      </div>

      {activeElement ? (
        <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          {typeof activeElement.children === "string" && (
            <div>
              <label className="block text-[10px] uppercase font-semibold text-zinc-500 mb-1.5">
                Texte
              </label>
              <textarea
                value={activeElement.children}
                onChange={(e) =>
                  onUpdateSelected({ children: e.target.value })
                }
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-2.5 text-zinc-900 dark:text-white outline-none resize-none h-20 text-xs focus:border-black dark:focus:border-white transition"
              />
            </div>
          )}

          <div>
            <label className="block text-[10px] uppercase font-semibold text-zinc-500 mb-1.5">
              Classes Tailwind
            </label>
            <textarea
              value={activeElement.props?.className || ""}
              onChange={(e) =>
                onUpdateSelected({
                  props: {
                    ...activeElement.props,
                    className: e.target.value,
                  },
                })
              }
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-2.5 text-zinc-900 dark:text-white font-mono text-[10px] outline-none resize-none h-32 focus:border-black dark:focus:border-white transition"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <div>
            <label className="block text-[10px] uppercase font-semibold text-zinc-500 mb-1.5">
              Échelle de la page
            </label>
            <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 shadow-xs">
              <span>Zoom actuel :</span>
              <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">
                {zoom}%
              </span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}