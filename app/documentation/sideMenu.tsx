"use client";
import Link from "next/link";

const sideMenu = () => {
  return (
    <div className=" hidden sticky top-0 h-screen w-64  bg-whiet/20 overflow-y-auto p-8 pt-28 md:flex flex-col  gap-2">
      <Link href="/documentation">
        <span className="uppercase font-semibold text-2xl hover:underline active:scale-95 transition duration-300">
          Introduction
        </span>
      </Link>

      <Link
        href="#Purpose"
        className="hover:underline active:scale-95 transition duration-300"
      >
        Purpose
      </Link>

      <Link
        href="#Features"
        className="hover:underline active:scale-95 transition duration-300"
      >
        Prerequisites
      </Link>

      <Link
        href="#Installation"
        className="uppercase font-semibold text-2xl hover:underline active:scale-95 transition duration-300"
      >
        Installation
      </Link>

      <Link
        href="#Dependencies "
        className="hover:underline active:scale-95 transition duration-300"
      >
        Dependencies
      </Link>

      <Link
        href="#Usage & Conventions"
        className="uppercase font-semibold text-2xl hover:underline active:scale-95 transition duration-300"
      >
        Usage
      </Link>

      <Link
        href="#Folder Structure"
        className="hover:underline active:scale-95 transition duration-300"
      >
        Folder Structure
      </Link>
      <Link
        href="composants"
        className="hover:underline active:scale-95 transition duration-300"
      >
        Go to Components
      </Link>
    </div>
  );
};

export default sideMenu;
