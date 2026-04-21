"use client";
import Link from "next/link";
import { Tooltip } from "./Tooltip";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return (
    <nav className="fixed bg-white dark:bg-zinc-950 z-50 top-0 left-0 right-0 border border-gray-500 w-full max-w-[1600px] mx-auto justify-around items-center flex">
      <div className="flex justify-evenly items-center gap-4 ">
        <div>
          <Tooltip text="home">
            <Link href="/">
              <span className="title">Library</span>
            </Link>
          </Tooltip>
        </div>
        <div className="hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="backdrop-blur-2xl bg-white/30 dark:bg-black/10 border-white/40  focus:ring-2 rounded-xl content-evenly max-w-2xs py-1 px-4 focus:outline-none focus:ring-gray-500 dark:focus:ring-gray-50 dar transition duration-300"
          />
        </div>
      </div>
      <div className="flex gap-4 ">
        <Tooltip text="go to components page">
          <Link href="/composants">
            <span className="hidden sm:block text-black/40 dark:text-white/40 hover:text-black/80 dark:hover:text-white/80 transition duration-300 hover:cursor-pointer">
              Components
            </span>
          </Link>
        </Tooltip>
        <Tooltip text="Go to documentation">
          <Link href="/documentation">
            <span className="hidden sm:block text-black/40 dark:text-white/40 hover:text-black/80 dark:hover:text-white/80 transition duration-300 hover:cursor-pointer">
              Documentation
            </span>
          </Link>
        </Tooltip>
        <Tooltip text="go to show page">
          <Link href="/Demo">
            <span className="hidden sm:block text-black/40 dark:text-white/40 hover:text-black/80 dark:hover:text-white/80 transition duration-300 hover:cursor-pointer">
              Demo
            </span>
          </Link>
        </Tooltip>

        <div>
          {" "}
          {/* bouton de recherche (Visible uniquement sur Mobile/Tablette) */}
          <div className="relative md:hidden flex items-center justify-end">
            <div
              className={`absolute right-full mr-2 flex items-center transition-all duration-500 ease-out  ${isSearchOpen ? "w-48 opacity-100" : "w-0 opacity-0"}`}
            >
              <input
                type="text"
                placeholder="Rechercher..."
                className="backdrop-blur-2xl bg-white z-[200] dark:bg-black/10 border-black/40 focus:ring-2 rounded-full content-evenly max-w-xs py-2 px-4 focus:outline-none focus:ring-gray-500 transition duration-300"
              />
            </div>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="z-10 p-2"
            >
              {isSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>
          </div>
        </div>
        {/* Menu Burger (Visible uniquement sur Mobile/Tablette) */}
        <button
          className="md:hidden p-2 text-slate-900 dark:text-slate-50 z-20 "
          onClick={() => setIsOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Menu latéral (Visible uniquement sur Mobile/Tablette) */}
      <div
        className={
          "fixed inset-0 transition-visibility z-[100] duration-300 " +
          (isOpen ? "visible" : "invisible")
        }
      >
        {/* Voile de flou arrière (Overlay) */}
        <div
          className={
            "absolute inset-0 bg-slate-900/20 h-screen w-screen backdrop-blur-sm transition-opacity duration-300 " +
            (isOpen ? "opacity-100" : "opacity-0")
          }
          onClick={() => setIsOpen(false)}
        />

        {/* Panneau latéral (Glass Panel) */}
        <div
          className={
            "absolute right-0 top-0 w-[300px] z-[200] rounded-2xl bg-white/80 dark:bg-black/80 backdrop-blur-2xl border-l border-white/40 shadow-2xl p-4 flex flex-col items-start justify-evenly transition-transform duration-300 ease-in-out " +
            (isOpen ? "translate-x-0" : "translate-x-full")
          }
        >
          {/* header menu */}
          <div className="flex justify-between items-center mb-2 w-full">
            <span className="title">Menu</span>

            <button>
              <X size={24} onClick={() => setIsOpen(false)} />
            </button>
          </div>
          {/* liens du menu */}
          <nav
            className="flex flex-col gap-2"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <Link
              className="flex justify-between w-[250px] mx-auto border-b-2 border-slate-300 py-1"
              href="/Composants"
            >
              <span>Components</span>
            </Link>
            <Link
              className="flex justify-between w-[250px] mx-auto border-b-2 border-slate-300 py-1"
              href="/documentation"
            >
              <span>documentation</span>
            </Link>
            <Link
              className="flex justify-between w-[250px] mx-auto border-b-2 border-slate-300 py-1"
              href="/"
            >
              Home
            </Link>
            <Link
              className="flex justify-between w-[250px] mx-auto border-b-2 border-slate-300 py-1"
              href="/Demo"
            >
              <span>Demo</span>
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
