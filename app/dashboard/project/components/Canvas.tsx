// app/project/[id]/components/Canvas.tsx

"use client";

import { useEffect, useRef } from "react";
import { FiMove, FiTrash2 } from "react-icons/fi";
import ElementRenderer from "./ElementRenderer";
import {
  MIN_WIDTH,
  MIN_HEIGHT,
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
} from "./types";
import type {
  DeviceMode,
  PageData,
  PageTheme,
  UIBlockInstance,
} from "./types";

const DEVICE_LABELS: Record<DeviceMode, { name: string; w: number; h: number }> = {
  desktop: { name: "Desktop", w: 1200, h: 900 },
  tablet: { name: "iPad", w: 768, h: 900 },
  mobile: { name: "iPhone", w: 375, h: 750 },
};

interface CanvasProps {
  deviceMode: DeviceMode;
  pageTheme: PageTheme;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  panPosition: { x: number; y: number };
  activePage: PageData;
  canvasBlocks: UIBlockInstance[];
  selectedElementId: string | null;
  selectedBlockInstanceId: string | null;
  isPanning: boolean;
  activeTool: string;

  onCanvasMouseDown: (e: React.MouseEvent) => void;
  onCanvasDrop: (e: React.DragEvent) => void;
  onBlockMouseDown: (e: React.MouseEvent, instanceId: string) => void;
  onResizeMouseDown: (
    e: React.MouseEvent,
    instanceId: string,
    direction: string
  ) => void;
  onRemoveBlock: (instanceId: string) => void;
  onSelectElement: (id: string) => void;
  /** Clic sur la page avec un outil de création actif (texte, bouton, frame…) */
  onCreateAt: (tool: string, x: number, y: number) => void;
}

export default function Canvas({
  deviceMode,
  pageTheme,
  zoom,
  setZoom,
  panPosition,
  activePage,
  canvasBlocks,
  selectedElementId,
  selectedBlockInstanceId,
  isPanning,
  activeTool,
  onCanvasMouseDown,
  onCanvasDrop,
  onBlockMouseDown,
  onResizeMouseDown,
  onRemoveBlock,
  onSelectElement,
  onCreateAt,
}: CanvasProps) {
  const canvasRef = useRef<HTMLElement>(null);
  const creating = activeTool !== "cursor";

  // Zoom à la molette façon Figma : Ctrl/Cmd + scroll
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const delta = -e.deltaY * 0.15;
      setZoom((z) => Math.round(Math.max(10, Math.min(200, z + delta))));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [setZoom]);

  const device = DEVICE_LABELS[deviceMode];
  const isMobile = deviceMode === "mobile";

  // Clic dans la page avec un outil de création → place un élément
  const handlePreviewMouseDown = (e: React.MouseEvent) => {
    if (!creating) return;
    e.stopPropagation();
    e.preventDefault();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const scale = zoom / 100;
    onCreateAt(
      activeTool,
      Math.max(0, (e.clientX - rect.left) / scale),
      Math.max(0, (e.clientY - rect.top) / scale)
    );
  };

  return (
    <main
      id="canvas-bg"
      ref={canvasRef}
      onMouseDown={onCanvasMouseDown}
      onDrop={onCanvasDrop}
      onDragOver={(e) => e.preventDefault()}
      className={`flex-1 bg-zinc-100 dark:bg-zinc-950 relative overflow-hidden ${creating ? "cursor-crosshair" : isPanning ? "cursor-grabbing" : "cursor-grab"
        }`}
    >
      {/* GRID */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10 dark:opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          transform: `translate(${panPosition.x}px, ${panPosition.y}px)`,
        }}
      />

      {/* DEVICE LABEL */}
      <div
        className="absolute z-30 flex items-center gap-2 font-mono text-[10px] text-zinc-500 dark:text-zinc-400 pointer-events-none select-none"
        style={{
          transform: `translate(${panPosition.x}px, ${panPosition.y - 28}px)`,
        }}
      >
        <span className="px-2 py-1 rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          {device.name} · {device.w} × {device.h}
        </span>
        {creating && (
          <span className="px-2 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 animate-pulse">
            Cliquez dans la page pour placer
          </span>
        )}
      </div>

      {/* DEVICE / PAGE PREVIEW */}
      <div
        className={`absolute border shadow-2xl overflow-hidden flex flex-col ${isMobile
            ? "rounded-[3rem] border-[10px] border-zinc-800 dark:border-zinc-700"
            : deviceMode === "tablet"
              ? "rounded-[2rem] border-8 border-zinc-800 dark:border-zinc-700"
              : "border-zinc-200 dark:border-zinc-800 rounded-2xl"
          }`}
        style={{
          width: `${device.w}px`,
          height: `${device.h}px`,
          transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoom / 100})`,
          transformOrigin: "top left",
        }}
      >
        {/* BARRE D'APPAREIL */}
        {isMobile ? (
          <div className="h-8 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-white dark:bg-black shrink-0 select-none relative">
            <span className="absolute top-1.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-zinc-800 dark:bg-zinc-700 rounded-full" />
            <span className="absolute left-6 text-[10px] font-semibold text-zinc-500">9:41</span>
          </div>
        ) : (
          <div className="h-9 border-b border-zinc-200 dark:border-zinc-800 px-4 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900 shrink-0 select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>
            <span className="text-[11px] font-mono text-zinc-400">
              {activePage.name.toLowerCase().replace(/\s+/g, "-")}.tsx
            </span>
            <div />
          </div>
        )}

        {/* PAGE PREVIEW */}
        <div
          id="page-preview"
          onMouseDown={handlePreviewMouseDown}
          className={`flex-1 relative w-full min-h-0 overflow-auto transition-colors duration-300 ${creating ? "cursor-crosshair" : ""
            } ${pageTheme === "dark"
              ? "bg-black text-white dark"
              : "bg-white text-zinc-900 light"
            }`}
        >
          {canvasBlocks.length === 0 ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-4 pointer-events-none">
              <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400 border border-zinc-200 dark:border-zinc-800">
                <FiMove size={24} />
              </div>
              <p className="text-xs text-zinc-500">
                Glissez-déposez vos composants depuis la bibliothèque.
              </p>
              <p className="text-[10px] text-zinc-400 font-mono">
                ou sélectionnez un outil puis cliquez pour placer
              </p>
            </div>
          ) : (
            canvasBlocks.map((block) => {
              const isBlockSelected =
                selectedBlockInstanceId === block.instanceId;

              return (
                <div
                  key={block.instanceId}
                  data-block-id={block.instanceId}
                  onMouseDown={(e) => {
                    if (creating) return;
                    onBlockMouseDown(e, block.instanceId);
                  }}
                  className={`absolute group min-h-0 min-w-0 ${creating ? "" : "cursor-move"
                    } ${isBlockSelected ? "ring-2 ring-blue-500 z-40" : ""}`}
                  style={{
                    left: `${block.x}px`,
                    top: `${block.y}px`,
                    width: `${block.width ?? DEFAULT_WIDTH}px`,
                    height: block.autoHeight
                      ? "auto"
                      : `${block.height ?? DEFAULT_HEIGHT}px`,
                    minWidth: `${MIN_WIDTH}px`,
                    minHeight: `${MIN_HEIGHT}px`,
                    boxSizing: "border-box",
                  }}
                >
                  {/* DELETE */}
                  <button
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveBlock(block.instanceId);
                    }}
                    className="absolute -top-8 right-0 p-1.5 bg-red-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition z-[100] shadow-md cursor-pointer"
                    title="Supprimer ce bloc (ou touche Suppr)"
                  >
                    <FiTrash2 size={12} />
                  </button>

                  {/* RESIZE HANDLES */}
                  {isBlockSelected && !creating && (
                    <>
                      {[
                        ["nw", "-top-1.5 -left-1.5", "cursor-nwse-resize"],
                        [
                          "n",
                          "-top-1.5 left-1/2 -translate-x-1/2",
                          "cursor-ns-resize",
                        ],
                        [
                          "ne",
                          "-top-1.5 -right-1.5",
                          "cursor-nesw-resize",
                        ],
                        [
                          "w",
                          "top-1/2 -left-1.5 -translate-y-1/2",
                          "cursor-ew-resize",
                        ],
                        [
                          "e",
                          "top-1/2 -right-1.5 -translate-y-1/2",
                          "cursor-ew-resize",
                        ],
                        [
                          "sw",
                          "-bottom-1.5 -left-1.5",
                          "cursor-nesw-resize",
                        ],
                        [
                          "s",
                          "-bottom-1.5 left-1/2 -translate-x-1/2",
                          "cursor-ns-resize",
                        ],
                        [
                          "se",
                          "-bottom-1.5 -right-1.5",
                          "cursor-nwse-resize",
                        ],
                      ].map(([dir, pos, cursor]) => (
                        <div
                          key={dir}
                          onMouseDown={(e) =>
                            onResizeMouseDown(e, block.instanceId, dir)
                          }
                          className={`absolute ${pos} w-3 h-3 bg-white border-2 border-blue-500 rounded-full ${cursor} z-[100]`}
                        />
                      ))}
                    </>
                  )}

                  {/* BLOCK CONTENT */}
                  <div className="w-full h-full min-h-0 min-w-0 overflow-hidden flex flex-col pointer-events-auto">
                    <ElementRenderer
                      element={block.root}
                      selectedId={selectedElementId}
                      onSelect={(id) => onSelectElement(id)}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}
