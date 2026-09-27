"use client";

import React, { useEffect } from "react";
import { FiX, FiAlertTriangle, FiCheckCircle, FiInfo } from "react-icons/fi";

type ModalType = "error" | "success" | "info" | "warning";

interface UniversalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: ModalType;
  confirmText?: string;
  onConfirm?: () => void;
}

export default function UniversalModal({
  isOpen,
  onClose,
  title,
  message,
  type = "error",
  confirmText,
  onConfirm,
}: UniversalModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const iconConfig = {
    error: {
      icon: <FiAlertTriangle className="text-red-500" size={22} />,
      bgIcon: "bg-red-500/10 border-red-500/20",
      btnColor: "bg-red-600 hover:bg-red-500 text-white",
    },
    success: {
      icon: <FiCheckCircle className="text-emerald-500" size={22} />,
      bgIcon: "bg-emerald-500/10 border-emerald-500/20",
      btnColor:
        "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90",
    },
    warning: {
      icon: <FiAlertTriangle className="text-amber-500" size={22} />,
      bgIcon: "bg-amber-500/10 border-amber-500/20",
      btnColor: "bg-amber-600 hover:bg-amber-500 text-white",
    },
    info: {
      icon: <FiInfo className="text-slate-500" size={22} />,
      bgIcon: "bg-slate-500/10 border-slate-500/20",
      btnColor: "bg-slate-600 hover:bg-slate-500 text-white",
    },
  }[type];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="relative w-full max-w-md bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton de fermeture */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-full transition-colors cursor-pointer"
        >
          <FiX size={16} />
        </button>

        {/* Corps de la modale */}
        <div className="flex items-start gap-4 pt-2">
          <div className={`p-3 rounded-xl border ${iconConfig.bgIcon} shrink-0`}>
            {iconConfig.icon}
          </div>

          <div className="space-y-1 pr-4">
            <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              {title}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-900">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            Close
          </button>

          {confirmText && onConfirm && (
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`px-5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-sm ${iconConfig.btnColor}`}
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
