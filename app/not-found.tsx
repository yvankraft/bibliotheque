import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 px-4">
      <div className="text-center">
        <p className="text-[10rem] leading-none font-black tracking-tighter text-zinc-100 dark:text-zinc-800 select-none">
          404
        </p>

        <div className="-mt-10">
          <h2 className="text-2xl font-bold mb-3">
            Oops! Component Not Found
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-md mx-auto leading-relaxed">
            It seems you forgot to import this page. Or maybe we refactored it
            so hard it simply disappeared into the void. Either way, this route
            returns{" "}
            <code className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2 py-0.5 rounded-md font-mono text-xs">
              undefined
            </code>
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-semibold hover:opacity-90 transition active:scale-95"
          >
            <ArrowLeft size={15} />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
