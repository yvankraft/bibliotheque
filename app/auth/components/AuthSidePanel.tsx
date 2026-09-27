interface AuthSidePanelProps {
  tagline: string;
}

export default function AuthSidePanel({ tagline }: AuthSidePanelProps) {
  return (
    <div className="relative hidden lg:flex items-center justify-center bg-zinc-950 overflow-hidden p-12">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-zinc-900/40 to-slate-900/80 opacity-90" />

      {/* Bulles montantes — animation définie dans globals.css */}
      <div
        aria-hidden
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute left-[15%] w-36 h-36 rounded-full bg-gradient-to-br from-slate-500/30 to-indigo-500/20 backdrop-blur-md shadow-2xl animate-bubble-1" />
        <div className="absolute left-[55%] w-48 h-48 rounded-full bg-gradient-to-tr from-zinc-400/20 via-slate-600/30 to-purple-500/10 backdrop-blur-md shadow-2xl animate-bubble-2" />
        <div className="absolute left-[75%] w-24 h-24 rounded-full bg-gradient-to-bl from-white/20 to-slate-500/30 backdrop-blur-md shadow-xl animate-bubble-3" />
        <div className="absolute left-[35%] w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-400/20 to-slate-400/30 backdrop-blur-md shadow-lg animate-bubble-4" />
      </div>

      <div className="relative z-10 text-center space-y-2">
        <h1 className="text-7xl font-serif font-bold text-zinc-100 tracking-wider">
          Library
        </h1>
        <h2 className="text-2xl font-serif font-bold text-zinc-100 tracking-wider">
          {tagline}
        </h2>
        <p className="text-xs uppercase tracking-widest text-zinc-400 font-mono">
          Visual Web Builder for Developers
        </p>
      </div>
    </div>
  );
}
