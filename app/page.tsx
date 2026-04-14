import Link from "next/link";
import { Tooltip } from "./components/Tooltip";
import SeeMoreButton from "./components/SeeMoreButton";

const page = () => {
  return (
    <div>
      <div className="h-screen flex flex-col justify-center items-center space-y-12">
        <h1 className=" text-4xl  text-balance font-bold md:text-6xl sm:text-5xl uppercase text-center tracking-tighter">
          Fullstack components, ready to ship.
        </h1>
        <p className=" text-zinc-400 md:text-2xl text-center">
          A curated library of 100% free CSS and Tailwind components.
          <br /> Browse, select, and download the source code to build your next
          project faster.
        </p>
        <div className="flex justify-center items-center gap-4">
          <Tooltip text="go to componets">
            <Link href="/composants">
              <span className="btn-primary ">components</span>
            </Link>
          </Tooltip>
          <Tooltip text="learn are to build a moderne components">
            <Link href="/documentation">
              <span className="btn-secondary ">documentation</span>
            </Link>
          </Tooltip>
        </div>
      </div>
      <div id="components">
        <div className="md:flex justify-around items-center space-y-4 ">
          <div className="flex flex-col justify-around p-6 rounded-xl  border bg-whit/50 border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50 w-[300px ] sm:w-[400px] h-[300px] hover:scale-105 transition duration-300 active:scale-95">
            <h1 className="title">Frontend</h1>
            <p className=" text-zinc-400 md:text-xl text-center">
              Focusing on design elements like navigation bars, interactive
              buttons, and modern layouts. Everything you need to craft a
              stunning user interface.
            </p>
            <Tooltip text="go to frotnends componets">
              <SeeMoreButton
                text="let's see more"
                href="/composants/frontend"
              />
            </Tooltip>
          </div>
          <div className="flex flex-col justify-around p-6 rounded-xl  border bg-whit/50 border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50 w-[300px ] sm:w-[400px] h-[300px] hover:scale-105 transition duration-300 active:scale-95">
            <h1 className="title">Backend</h1>
            <p className=" text-zinc-400 md:text-xl text-center">
              Forget backgrounds or boxes. Here, we build the core logic:
              authentication flows, secure payment integrations, and database
              architecture to power your app's brain.
            </p>
            <Tooltip text="go to backends componets">
              <SeeMoreButton text="let's see more" href="/composants/backend" />
            </Tooltip>
          </div>
          <div className="flex flex-col justify-around p-6 rounded-xl  border bg-whit/50 border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50 w-[300px ] sm:w-[400px] h-[300px] hover:scale-105 transition duration-300 active:scale-95">
            <h1 className="title">Fullstack</h1>
            <p className="text-zinc-400 md:text-xl text-center">
              Bridge the gap between UI and Data. Here, we focus on the
              connection: how a Frontend form triggers a Backend Server Action,
              manages database states, and returns real-time feedback.
            </p>
            <Tooltip text="go to fullstack componets">
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

export default page;
