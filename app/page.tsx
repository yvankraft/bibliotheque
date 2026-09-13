import Link from "next/link";
import { Tooltip } from "./components/Tooltip";
import SeeMoreButton from "./components/SeeMoreButton";
import Navbar from "./components/Navbar";

const Page = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 selection:bg-slate-500 selection:text-white transition-colors duration-300">
      <Navbar />
      {/* Hero Section */}
      <div className="h-screen flex flex-col justify-center items-center space-y-12 px-4">
        <h1 className="text-4xl text-balance font-bold md:text-6xl sm:text-5xl uppercase text-center tracking-tighter">
          Visual Web Builder <span className="text-slate-500">For Developers.</span>
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 md:text-2xl text-center max-w-2xl">
          Design visually like Figma, export clean production-ready fullstack source code. 
          <br /> Reinventing no-code for engineers.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4">
          <Tooltip text="launch the visual editor and manage projects">
            <Link href="/auth/login">
              <span className="px-6 py-3 rounded-lg bg-slate-500 text-white font-semibold hover:bg-slate-600 transition">
                Get Started
              </span>
            </Link>
          </Tooltip>
          <Tooltip text="explore prefab components">
            <Link href="/composants">
              <span className="px-6 py-3 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition">
                Components
              </span>
            </Link>
          </Tooltip>
          <Tooltip text="learn how to build modern architectures">
            <Link href="/documentation">
              <span className="px-6 py-3 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition">
                Documentation
              </span>
            </Link>
          </Tooltip>
        </div>
      </div>

      {/* Features Section */}
      <div id="components" className="py-20 px-4">
        <div className="md:flex justify-around items-center gap-6 max-w-7xl mx-auto">
          <div className="flex flex-col justify-around p-6 rounded-xl m-2 border bg-white/50 border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50 w-[300px] md:w-[400px] h-[300px] hover:scale-105 transition duration-300 active:scale-95">
            <h1 className="text-xl font-bold tracking-wide text-slate-500">Frontend</h1>
            <p className="text-zinc-600 dark:text-zinc-400 md:text-lg text-center">
              Focusing on design elements like navigation bars, interactive
              buttons, and modern layouts. Everything you need to craft a
              stunning user interface.
            </p>
            <Tooltip text="go to frontend components">
              <SeeMoreButton
                text="let's see more"
                href="/composants/frontend"
              />
            </Tooltip>
          </div>
          <div className="flex flex-col justify-around p-6 rounded-xl m-2 border bg-white/50 border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50 w-[300px] md:w-[400px] h-[300px] hover:scale-105 transition duration-300 active:scale-95">
            <h1 className="text-xl font-bold tracking-wide text-slate-500">Backend</h1>
            <p className="text-zinc-600 dark:text-zinc-400 md:text-lg text-center">
              Forget backgrounds or boxes. Here, we build the core logic:
              authentication flows, secure payment integrations, and database
              architecture to power your app's brain.
            </p>
            <Tooltip text="go to backend components">
              <SeeMoreButton text="let's see more" href="/composants/backend" />
            </Tooltip>
          </div>
          <div className="flex flex-col justify-around p-6 rounded-xl m-2 border bg-white/50 border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50 w-[300px] md:w-[400px] h-[300px] hover:scale-105 transition duration-300 active:scale-95">
            <h1 className="text-xl font-bold tracking-wide text-slate-500">Fullstack</h1>
            <p className="text-zinc-600 dark:text-zinc-400 md:text-lg text-center">
              Bridge the gap between UI and Data. Here, we focus on the
              connection: how a Frontend form triggers a Backend Server Action,
              manages database states, and returns real-time feedback.
            </p>
            <Tooltip text="go to fullstack components">
              <SeeMoreButton
                text="let's see more"
                href="/composants/fullstack"
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;