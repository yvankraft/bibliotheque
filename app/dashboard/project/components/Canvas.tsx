// app/project/[id]/components/Canvas.tsx

"use client";

import { useRef } from "react";
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
  UIElement,
} from "./types";

interface CanvasProps {
  deviceMode: DeviceMode;
  pageTheme: PageTheme;
  zoom: number;
  panPosition: { x: number; y: number };
  activePage: PageData;
  canvasBlocks: UIBlockInstance[];
  selectedElementId: string | null;
  selectedBlockInstanceId: string | null;
  isPanning: boolean;

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
}

export default function Canvas({
  deviceMode,
  pageTheme,
  zoom,
  panPosition,
  activePage,
  canvasBlocks,
  selectedElementId,
  selectedBlockInstanceId,
  isPanning,
  onCanvasMouseDown,
  onCanvasDrop,
  onBlockMouseDown,
  onResizeMouseDown,
  onRemoveBlock,
  onSelectElement,
}: CanvasProps) {
  return (
    <main
      id="canvas-bg"
      onMouseDown={onCanvasMouseDown}
      onDrop={onCanvasDrop}
      onDragOver={(e) => e.preventDefault()}
      className={`flex-1 bg-zinc-100 dark:bg-zinc-950 relative overflow-hidden ${
        isPanning ? "cursor-grabbing" : "cursor-grab"
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

      {/* DEVICE / PAGE PREVIEW */}
      <div
        className="absolute border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        style={{
          width:
            deviceMode === "mobile"
              ? "375px"
              : deviceMode === "tablet"
              ? "768px"
              : "1200px",
          height: deviceMode === "mobile" ? "750px" : "900px",
          transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoom / 100})`,
          transformOrigin: "top left",
        }}
      >
        {/* BROWSER BAR */}
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

        {/* PAGE PREVIEW */}
        <div
          className={`flex-1 relative w-full min-h-0 overflow-auto transition-colors duration-300 ${
            pageTheme === "dark"
              ? "bg-black text-white dark"
              : "bg-white text-zinc-900 light"
          }`}
        >
          {canvasBlocks.length === 0 ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400 border border-zinc-200 dark:border-zinc-800">
                <FiMove size={24} />
              </div>
              <p className="text-xs text-zinc-500">
                Glissez-déposez vos composants depuis la bibliothèque.
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
                  onMouseDown={(e) => onBlockMouseDown(e, block.instanceId)}
                  className={`absolute group cursor-move min-h-0 min-w-0 ${
                    isBlockSelected ? "ring-2 ring-blue-500 z-40" : ""
                  }`}
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
                    title="Supprimer ce bloc"
                  >
                    <FiTrash2 size={12} />
                  </button>

                  {/* RESIZE HANDLES */}
                  {isBlockSelected && (
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