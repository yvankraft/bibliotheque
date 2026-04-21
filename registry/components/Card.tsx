export const RevealCard = ({
  title = "Project One",
  desc = "Branding & Design",
}) => (
  <div className="group relative w-full aspect-[4/5] bg-zinc-100 rounded-3xl overflow-hidden cursor-pointer">
    <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 p-8 flex flex-col justify-end">
      <h3 className="text-white text-2xl font-black italic uppercase">
        {title}
      </h3>
      <p className="text-white/60 text-sm mt-2">{desc}</p>
      <button className="mt-6 w-fit bg-white text-black px-6 py-2 rounded-full font-bold text-xs uppercase">
        View
      </button>
    </div>
  </div>
);
