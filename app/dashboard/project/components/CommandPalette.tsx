"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";

export interface PaletteCommand {
  id: string;
  label: string;
  /** Groupe affiché en en-tête de section */
  group: string;
  /** Indice à droite (raccourci, détail…) */
  hint?: string;
  icon?: React.ReactNode;
  action: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  commands: PaletteCommand[];
  onClose: () => void;
}

export default function CommandPalette({
  open,
  commands,
  onClose,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [prevOpen, setPrevOpen] = useState(open);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Reset à chaque ouverture (ajustement pendant le render)
  if (prevOpen !== open) {
    setPrevOpen(open);
    if (open) {
      setQuery("");
      setActive(0);
    }
  }

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.group}`.toLowerCase().includes(q)
    );
  }, [commands, query]);

  const run = (cmd: PaletteCommand) => {
    onClose();
    cmd.action();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (filtered.length ? (a + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) =>
        filtered.length ? (a - 1 + filtered.length) % filtered.length : 0
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = filtered[active];
      if (cmd) run(cmd);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  // Garde l'élément actif visible dans la liste scrollable
  useEffect(() => {
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
          className="fixed inset-0 z-[200] bg-black/30 backdrop-blur-sm flex items-start justify-center pt-[14vh] px-4"
          onMouseDown={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-lg rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden"
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* Input */}
            <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 px-4 py-3.5">
              <FiSearch size={16} className="text-zinc-400 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onKeyDown}
                placeholder="Rechercher une action, un bloc, une page…"
                className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 outline-none placeholder-zinc-400"
              />
              <kbd className="rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-1.5 py-0.5 text-[10px] font-mono text-zinc-400">
                esc
              </kbd>
            </div>

            {/* Liste */}
            <div ref={listRef} className="max-h-80 overflow-y-auto p-1.5">
              {filtered.length === 0 ? (
                <p className="px-3 py-8 text-center text-xs text-zinc-400">
                  Aucun résultat pour « {query} »
                </p>
              ) : (
                filtered.map((cmd, i) => {
                  const isActive = i === active;
                  const showHeader =
                    i === 0 || filtered[i - 1].group !== cmd.group;
                  return (
                    <div key={cmd.id}>
                      {showHeader && (
                        <p className="px-3 pb-1 pt-2.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                          {cmd.group}
                        </p>
                      )}
                      <button
                        data-active={isActive}
                        onMouseEnter={() => setActive(i)}
                        onClick={() => run(cmd)}
                        className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors cursor-pointer ${
                          isActive
                            ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                            : "text-zinc-700 dark:text-zinc-300"
                        }`}
                      >
                        {cmd.icon && (
                          <span
                            className={
                              isActive
                                ? "text-white dark:text-zinc-900"
                                : "text-zinc-400"
                            }
                          >
                            {cmd.icon}
                          </span>
                        )}
                        <span className="flex-1 truncate">{cmd.label}</span>
                        {cmd.hint && (
                          <span
                            className={`text-[10px] font-mono ${
                              isActive
                                ? "text-white/70 dark:text-zinc-500"
                                : "text-zinc-400"
                            }`}
                          >
                            {cmd.hint}
                          </span>
                        )}
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-4 border-t border-zinc-200 dark:border-zinc-800 px-4 py-2 text-[10px] text-zinc-400 font-mono">
              <span>↑↓ naviguer</span>
              <span>↵ exécuter</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
