// app/project/[id]/components/RightInspector.tsx

"use client";

import { FiBox, FiCommand, FiSettings } from "react-icons/fi";
import type { UIElement } from "./types";

const SHAPES_3D = [
  { id: "torusKnot", label: "Torus Knot" },
  { id: "torus", label: "Anneau" },
  { id: "distortSphere", label: "Sphère liquide" },
  { id: "icosahedron", label: "Gemme" },
];

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
          {activeElement.type === "scene3d" && (
            <div className="space-y-4 rounded-xl border border-amber-500/30 bg-amber-500/5 p-3">
              <p className="flex items-center gap-1.5 text-[10px] uppercase font-semibold text-amber-600 dark:text-amber-400">
                <FiBox size={11} />
                Scène 3D
              </p>

              <div>
                <label className="block text-[10px] uppercase font-semibold text-zinc-500 mb-1.5">
                  Forme
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {SHAPES_3D.map((s) => (
                    <button
                      key={s.id}
                      onClick={() =>
                        onUpdateSelected({
                          props: { ...activeElement.props, shape: s.id },
                        })
                      }
                      className={`rounded-lg border px-2 py-1.5 text-[11px] font-medium transition cursor-pointer ${activeElement.props.shape === s.id
                        ? "border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                        : "border-zinc-200 text-zinc-600 hover:border-zinc-400 dark:border-zinc-800 dark:text-zinc-400"
                        }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-semibold text-zinc-500 mb-1.5">
                  Couleur
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={String(activeElement.props.color ?? "#f59e0b")}
                    onChange={(e) =>
                      onUpdateSelected({
                        props: { ...activeElement.props, color: e.target.value },
                      })
                    }
                    className="h-8 w-10 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent cursor-pointer"
                  />
                  <span className="font-mono text-[10px] text-zinc-500">
                    {String(activeElement.props.color ?? "#f59e0b")}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-semibold text-zinc-500 mb-1.5">
                  Vitesse · {Number(activeElement.props.speed ?? 1).toFixed(1)}×
                </label>
                <input
                  type="range"
                  min={0}
                  max={3}
                  step={0.1}
                  value={Number(activeElement.props.speed ?? 1)}
                  onChange={(e) =>
                    onUpdateSelected({
                      props: {
                        ...activeElement.props,
                        speed: Number(e.target.value),
                      },
                    })
                  }
                  className="w-full accent-amber-500"
                />
              </div>

              <label className="flex items-center gap-2 text-[11px] text-zinc-600 dark:text-zinc-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!activeElement.props.wireframe}
                  onChange={(e) =>
                    onUpdateSelected({
                      props: {
                        ...activeElement.props,
                        wireframe: e.target.checked,
                      },
                    })
                  }
                  className="accent-amber-500"
                />
                Fil de fer (wireframe)
              </label>

              <p className="text-[10px] text-zinc-400 leading-relaxed">
                Élément sélectionné : glissez sur la scène pour orbiter,
                molette pour zoomer — comme dans Spline.
              </p>
            </div>
          )}

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
              value={String(activeElement.props?.className ?? "")}
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

          <div>
            <label className="flex items-center gap-1.5 text-[10px] uppercase font-semibold text-zinc-500 mb-1.5">
              <FiCommand size={11} />
              Raccourcis
            </label>
            <div className="space-y-1 font-mono text-[10px] text-zinc-500">
              {[
                ["V / F / T / B / 3", "Outils"],
                ["Suppr", "Supprimer le bloc"],
                ["Ctrl + D", "Dupliquer"],
                ["Ctrl + molette", "Zoom"],
                ["Échap", "Désélectionner"],
              ].map(([k, label]) => (
                <div
                  key={k}
                  className="flex items-center justify-between rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-2.5 py-1.5"
                >
                  <span>{label}</span>
                  <span className="text-zinc-400">{k}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}