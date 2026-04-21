// Nouveau composant rapide pour "The Vault"
export const StatusBadge = ({ text = "System Active" }) => (
  <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full w-fit">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
    </span>
    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
      {text}
    </span>
  </div>
);
