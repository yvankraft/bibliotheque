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
            Oups ! Page introuvable
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
            La page que vous recherchez semble avoir disparu ou n'a jamais
            existé. Peut-être qu'elle est en train d'ouvrir sa propre boutique ?
          </p>

          <Link
            href="/"
            className="btn-primary px-8 py-3 inline-block transition-transform hover:scale-105"
          >
            Retourner à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
