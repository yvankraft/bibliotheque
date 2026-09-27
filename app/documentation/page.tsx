import SideMenu from "./sideMenu";
import { CopyCommand } from "../components/CopyCommand";
import { Star, Lock } from "lucide-react";
import SeeMoreButton from "../components/SeeMoreButton";
import Navbar from "../components/Navbar";

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      <Navbar />

      <div className="flex max-w-7xl mx-auto gap-12 pb-10 px-4">
        <SideMenu />

        <main className="flex-1 pt-28 max-w-3xl space-y-10">
          <h1
            id="introduction"
            data-doc-section
            className="font-bold text-4xl tracking-tighter scroll-mt-24"
          >
            Documentation
          </h1>

          <section className="space-y-8">
            <h2 className="font-semibold tracking-tighter text-3xl">
              Introduction
            </h2>

            <div className="space-y-4">
              <h3
                id="purpose"
                data-doc-section
                className="font-semibold text-2xl tracking-tighter scroll-mt-24"
              >
                Purpose
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                I started this library because I realized we are constantly
                rebuilding the same components for every new project. It&apos;s a
                waste of time.
                <br />
                The goal here isn&apos;t to reinvent the wheel, but to provide a
                solid base you can download and fully customize. While many
                libraries exist, this one focuses on being a starting point that
                you can tweak to fit your own unique design and logic, rather
                than just using a &quot;frozen&quot; component.
              </p>
            </div>

            <div className="space-y-4">
              <h3
                id="prerequisites"
                data-doc-section
                className="font-semibold text-2xl tracking-tighter scroll-mt-24"
              >
                Prerequisites
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400">
                To ensure everything works smoothly, make sure your project
                meets these requirements:
              </p>
              <ul className="space-y-2">
                {[
                  ["Next.js", "15.0 or higher"],
                  ["React", "19 or higher"],
                  ["Tailwind CSS", "4.0+ (or 3.4+ with compatibility)"],
                  ["Node.js", "20 or higher"],
                ].map(([name, version]) => (
                  <li
                    key={name}
                    className="flex items-center gap-3 text-sm border-b border-zinc-100 dark:border-zinc-800 pb-2"
                  >
                    <span className="font-semibold w-28">{name}</span>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      {version}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="space-y-8">
            <h2
              id="installation"
              data-doc-section
              className="font-semibold text-3xl tracking-tighter scroll-mt-24"
            >
              Installation
            </h2>

            <div id="dependencies" data-doc-section className="space-y-4 scroll-mt-24">
              <h3 className="font-semibold text-2xl tracking-tighter">
                Dependencies
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400">
                Run the following command in your terminal to install the
                essential packages used by our components:
              </p>
              <CopyCommand command="npm install lucide-react framer-motion clsx tailwind-merge" />
              <p className="text-zinc-500 dark:text-zinc-400">
                or you can download them separately
              </p>
              <p className="text-zinc-500 dark:text-zinc-400">
                First, install the core dependencies:
              </p>
              <CopyCommand command="npm install lucide-react framer-motion" />
              <p className="text-zinc-500 dark:text-zinc-400">
                Then, install the UI utilities:
              </p>
              <CopyCommand command="npm install clsx tailwind-merge" />
              <p className="text-zinc-500 dark:text-zinc-400">
                For database support:
              </p>
              <CopyCommand command="npm install prisma @prisma/client" />
            </div>
          </section>

          <section className="space-y-8">
            <h2
              id="usage"
              data-doc-section
              className="font-semibold text-3xl tracking-tighter scroll-mt-24"
            >
              Usage & Conventions
            </h2>

            <div id="conventions" data-doc-section className="space-y-4 scroll-mt-24">
              <p className="font-semibold">Customize, don&apos;t just copy</p>
              <p className="text-zinc-500 dark:text-zinc-400">
                We believe components should adapt to your design, not the
                other way around. Our workflow is built on three simple steps:
              </p>
              <ol className="space-y-2 list-decimal list-inside">
                <li>
                  <span className="font-semibold">Configure:</span>{" "}
                  <span className="text-zinc-500 dark:text-zinc-400">
                    Use our interactive preview to adjust styles, variants, or
                    logic.
                  </span>
                </li>
                <li>
                  <span className="font-semibold">Generate:</span>{" "}
                  <span className="text-zinc-500 dark:text-zinc-400">
                    The code updates in real-time based on your choices.
                  </span>
                </li>
                <li>
                  <span className="font-semibold">Copy & Paste:</span>{" "}
                  <span className="text-zinc-500 dark:text-zinc-400">
                    Once it&apos;s perfect, copy the source code directly into
                    your project and you&apos;re ready to ship.
                  </span>
                </li>
              </ol>
            </div>

            <SeeMoreButton text="go to components" href="/composants" />
          </section>
        </main>

        {/* Rail droit */}
        <aside className="sticky top-24 h-fit w-64 shrink-0 hidden lg:block space-y-4">
          {/* Star GitHub */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 p-4 transition-all hover:border-zinc-400 dark:hover:border-zinc-600">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm">
                <Star
                  size={20}
                  className="text-zinc-900 dark:text-white fill-zinc-900 dark:fill-white"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-900 dark:text-white">
                  Loving the library?
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Give us a star on GitHub!
                </p>
              </div>
            </div>
            <a
              href="https://github.com/yvankraft/bibliotheque"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block w-full rounded-lg bg-zinc-900 dark:bg-white py-2 text-center text-xs font-medium text-white dark:text-zinc-900 transition hover:opacity-90 active:scale-95"
            >
              Star on GitHub
            </a>
          </div>

          {/* Featured component */}
          <div className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-4 transition-all hover:shadow-md hover:border-zinc-400 dark:hover:border-zinc-600">
            <div className="mb-3 aspect-video w-full rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden border border-zinc-100 dark:border-zinc-700">
              <div className="relative h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:12px_12px] flex items-center justify-center">
                <Lock
                  size={32}
                  className="text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors"
                />
              </div>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              New Release
            </p>
            <h5 className="text-sm font-bold text-zinc-900 dark:text-white">
              Fullstack Auth Template
            </h5>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Ready-to-use Auth with Better Auth & Prisma.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
