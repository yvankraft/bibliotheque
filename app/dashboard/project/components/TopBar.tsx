"use client";

import {
  FiArrowLeft,
  FiMonitor,
  FiTablet,
  FiSmartphone,
  FiSun,
  FiMoon,
  FiCopy,
  FiCheck,
  FiPlay,
} from "react-icons/fi";
import type { DeviceMode, PageTheme } from "./types";

interface TopBarProps {
  projectName: string;
  deviceMode: DeviceMode;
  setDeviceMode: (m: DeviceMode) => void;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  pageTheme: PageTheme;
  toggleTheme: () => void;
  copiedCode: boolean;
  onCopyCode: () => void;
  onPublish: () => void;
  onBack: () => void;
}

export default function TopBar({
  projectName,
  deviceMode,
  setDeviceMode,
  zoom,
  setZoom,
  pageTheme,
  toggleTheme,
  copiedCode,
  onCopyCode,
  onPublish,
  onBack,
}: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 min-h-[4rem] h-16 px-6 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition cursor-pointer"
          title="Retour au dashboard"
        >
          <FiArrowLeft size={16} />
        </button>

        <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800" />

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <h1 className="text-xs font-semibold tracking-wide text-zinc-800 dark:text-zinc-200">
            {projectName}
          </h1>
        </div>
      </div>

      {/* DEVICE MODE */}
      <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800">
        {(
          [
            ["desktop", FiMonitor],
            ["tablet", FiTablet],
            ["mobile", FiSmartphone],
          ] as const
        ).map(([mode, Icon]) => (
          <button
            key={mode}
            onClick={() => setDeviceMode(mode)}
            className={`p-1.5 rounded-lg transition ${
              deviceMode === mode
                ? "bg-white dark:bg-black text-zinc-900 dark:text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
            }`}
          >
            <Icon size={14} />
          </button>
        ))}
      </div>

      {/* RIGHT NAV */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
          title="Basculer le thème de la page"
        >
          {pageTheme === "dark" ? (
            <FiSun size={14} className="text-amber-500" />
          ) : (
            <FiMoon size={14} className="text-blue-500" />
          )}
          <span className="capitalize">Page : {pageTheme}</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 font-mono bg-zinc-100 dark:bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => setZoom((z) => Math.max(50, z - 10))}
            className="hover:text-zinc-900 dark:hover:text-white"
          >
            -
          </button>
          <span>{zoom}%</span>
          <button
            onClick={() => setZoom((z) => Math.min(200, z + 10))}
            className="hover:text-zinc-900 dark:hover:text-white"
          >
            +
          </button>
        </div>

        <button
          onClick={onCopyCode}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
        >
          {copiedCode ? (
            <FiCheck size={14} className="text-emerald-500" />
          ) : (
            <FiCopy size={14} />
          )}
          <span>Export</span>
        </button>

        <button
          onClick={onPublish}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-semibold hover:opacity-90 transition cursor-pointer shadow-sm"
        >
          <FiPlay size={13} />
          Publier
        </button>
      </div>
    </header>
  );
}