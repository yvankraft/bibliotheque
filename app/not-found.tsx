import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-zinc-950 px-4">
      <div className="text-center">
        {/* Un gros badge ou un nombre stylisé */}
        <h1 className="text-9xl font-black text-slate-200 dark:text-zinc-800">
          404
        </h1>

        <div className="mt-[-40px]">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
            Oups ! Component Not Found
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
            It seems you forgot to import this page. Or maybe we refactored it
            so hard it simply disappeared into the void. Either way, this route
            returns{" "}
            <span className="bg-slate-400 px-2 py-1 rounded-xl text-black dark:text-white ">
              undefined
            </span>
          </p>

          <Link
            href="/"
            className="btn-primary px-8 py-3 inline-block transition-transform hover:scale-105"
          >
            go back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
