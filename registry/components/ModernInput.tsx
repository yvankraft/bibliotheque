export const ModernInput = ({ label = "Email Address", type = "text" }) => (
  <div className="relative group w-full max-w-sm">
    <input
      type={type}
      required
      className="w-full bg-transparent border-b-2 border-zinc-200 py-3 outline-none focus:border-black transition-colors peer"
    />
    <label className="absolute left-0 top-3 text-zinc-400 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-black peer-valid:-top-4 peer-valid:text-xs">
      {label}
    </label>
  </div>
);
