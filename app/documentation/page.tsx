"use client";
import SideMenu from "./sideMenu";
import { CopyCommand } from "../components/CopyCommand";
import { Star, Lock } from "lucide-react";
import Link from "next/link";
import SeeMoreButton from "../components/SeeMoreButton";
import Navbar from "../components/Navbar";

const page = () => {
  return (
    <div className="flex min-h-screen mx-auto md:gap-18 pb-10 ">
      <Navbar />
      <SideMenu />
      <main className="flex-1 pt-26 p-4 max-w-3xl ">
        {" "}
        <h1 className="font-bold text-4xl tracking-tighter">Documentation</h1>
        <div className="space-y-8">
          <h1 className="font-semibold  tracking-tighter text-3xl">
            Introduction
          </h1>
          <div className="space-y-4">
            <h1
              id="Purpose"
              className="font-semibold text-2xl tracking-tighter"
            >
              Purpose
            </h1>
            <p className="text-zinc-400">
              I started this library because I realized we are constantly
              rebuilding the same components for every new project. It’s a waste
              of time. <br />
              The goal here isn't to reinvent the wheel, but to provide a solid
              base you can download and fully customize. While many libraries
              exist, this one focuses on being a starting point that you can
              tweak to fit your own unique design and logic, rather than just
              using a "frozen" component.
            </p>
          </div>
          <div className="space-y-4">
            <h1
              id="Features"
              className="font-semibold text-2xl tracking-tighter"
            >
              Prerequisites
            </h1>
            <p className="text-zinc-400">
              To ensure everything works smoothly, make sure your project meets
              these requirements:
            </p>
            <ul className="space-y-1 ">
              <li>
                <span className="font-bold">Next.js</span>{" "}
                <span className="text-zinc-400">15.0 or higher</span>
              </li>
              <li>
                <span className="font-bold">React</span>
                <span className="text-zinc-400">19 or higher</span>
              </li>
              <li>
                <span className="font-bold">Tailwind CSS</span>
                <span className="text-zinc-400">
                  4.0+ (or 3.4+ with compatibility)
                </span>
              </li>
              <li>
                <span className="font-bold">Node.js</span>
                <span className="text-zinc-400">20 or higher</span>
              </li>
            </ul>
          </div>
          <h1
            id="Installation"
            className="font-semibold text-3xl tracking-tighter"
          >
            Installation
          </h1>
          <div id=" Dependencies" className="space-y-4">
            <h1 className="font-semibold text-2xl tracking-tighter">
              Dependencies
            </h1>
            <p className="text-zinc-400">
              Run the following command in your terminal to install the
              essential packages used by our components:
            </p>
            <CopyCommand command="npm install lucide-react framer-motion clsx tailwind-merge" />
            <p className="text-zinc-400">or you can download them separately</p>
            <p className="text-zinc-400">
              First, install the core dependencies:
            </p>
            <CopyCommand command="npm install lucide-react framer-motion" />

            <p className="text-zinc-400">Then, install the UI utilities:</p>
            <CopyCommand command="npm install clsx tailwind-merge" />

            <p className="text-zinc-400">For database support:</p>
            <CopyCommand command="npm install prisma @prisma/client" />
          </div>
          <h1
            id="Usage & Conventions"
            className="font-semibold text-3xl tracking-tighter"
          >
            Usage & Conventions
          </h1>
          <div className="space-y-4">
            <p className="font-semibold">Customize, don't just copy</p>
            <p className="text-zinc-400">
              We believe components should adapt to your design, not the other
              way around. Our workflow is built on three simple steps:
            </p>
            <ol className="space-y-1 list-decimal list-inside ">
              <li>
                <span className="font-semibold">Configure:</span>{" "}
                <span className="text-zinc-400">
                  Use our interactive preview to adjust styles, variants, or
                  logic.
                </span>
              </li>
              <li>
                <span className="font-semibold">Generate:</span>{" "}
                <span className="text-zinc-400">
                  The code updates in real-time based on your choices.
                </span>
              </li>
              <li>
                <span className="font-semibold">Copy & Paste:</span>{" "}
                <span className="text-zinc-400">
                  Once it's perfect, copy the source code directly into your
                  project and you're ready to ship.
                </span>
              </li>
            </ol>
          </div>
          <SeeMoreButton text="go to components" href="/composants" />
        </div>
      </main>
      <div className="sticky top-20 h-fit w-64 hidden md:block space-y-4 p-6  items-center ">
        {/* button d'etoile sur github */}
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 transition-all hover:border-zinc-400">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-zinc-200 shadow-sm">
              <Star size={20} className="text-zinc-900 fill-zinc-900" />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900">
                Loving the library?
              </p>
              <p className="text-xs text-zinc-500">Give us a star on GitHub!</p>
            </div>
          </div>
          <Link href="https://github.com/yvankraft/bibliotheque">
            <button className="mt-4 w-full rounded-lg bg-black py-2 text-xs font-medium text-white transition-transform active:scale-95">
              Star on GitHub
            </button>
          </Link>
        </div>
        {/*La Carte "Featured Component" je dois encore configurer */}
        <div className="group rounded-xl border border-zinc-200 bg-white p-4 transition-all hover:shadow-md">
          <div className="mb-3 aspect-video w-full rounded-lg bg-zinc-100 flex items-center justify-center overflow-hidden border border-zinc-100">
            <div className="relative h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:12px_12px] flex items-center justify-center">
              <Lock
                size={32}
                className="text-zinc-400 group-hover:text-black transition-colors"
              />
            </div>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            New Release
          </p>
          <h5 className="text-sm font-bold text-zinc-900">
            Fullstack Auth Template
          </h5>
          <p className="text-xs text-zinc-500 mt-1">
            Ready-to-use Auth with NextAuth & Prisma.
          </p>
        </div>
        {/* les pubs je dois encore configurer les pubs */}
        <div className="relative w-64">
          <div className="flex snap-x snap-mandatory overflow-x-auto no-scrollbar gap-4 pb-4">
            <div className="min-w-full snap-center"></div>

            <div className="min-w-full snap-center"></div>
          </div>

          <div className="flex justify-center gap-1.5 mt-2">
            <div className="h-1.5 w-1.5 rounded-full bg-zinc-900"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-zinc-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
