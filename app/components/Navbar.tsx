import Link from "next/link";
import { Tooltip } from "./Tooltip";
import Fuse from "fuse.js";

const Navbar = () => {
  return (
    <nav className="fixed blur(12px) top-0 left-0 right-0 border border-gray-300 w-full max-w-[1600px] mx-auto justify-around items-center flex flex">
      <div className="flex justify-evenly items-center gap-4 ">
        <div>
          <Tooltip text="home">
            <Link href="/">
              <span className="title">Bibliotheque</span>
            </Link>
          </Tooltip>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="backdrop-blur-2xl bg-white/30 dark:bg-black/10 border-white/40  focus:ring-2 rounded-xl content-evenly max-w-2xs py-2 px-4 focus:outline-none focus:ring-gray-500 dark:focus:ring-gray-50 dar transition duration-300"
          />
        </div>
      </div>
      <div className="flex gap-4 text-black/40 dark:text-white/40 hover:text-black/80 dark:hover:text-white/80 transition duration-300 hover:cursor-pointer">
        <Tooltip text="go to components page">
          <Link href="/components">
            <span>Components</span>
          </Link>
        </Tooltip>
        <Tooltip text="Go to documentation">
          <Link href="/documentation">
            <span>Documentation</span>
          </Link>
        </Tooltip>
      </div>
    </nav>
  );
};

export default Navbar;
