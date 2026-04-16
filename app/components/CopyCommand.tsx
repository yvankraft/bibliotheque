"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyCommandProps {
  command: string;
}

export const CopyCommand = ({ command }: CopyCommandProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group flex items-center justify-between bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 font-mono text-sm mb-4">
      <code className="text-zinc-300">{command}</code>
      <button
        onClick={handleCopy}
        className="ml-4 p-2 hover:bg-zinc-800 rounded-md transition-all active:scale-90"
        title="Copy to clipboard"
      >
        {copied ? (
          <Check size={16} className="text-green-500" />
        ) : (
          <Copy size={16} className="text-zinc-500 group-hover:text-zinc-200" />
        )}
      </button>
    </div>
  );
};
