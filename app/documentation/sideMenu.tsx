import Link from "next/link";

const sideMenu = () => {
  return (
    <div className="sticky top-0 h-screen w-64 border-r border-zinc-500 bg-whiet/20 overflow-y-auto p-4 justify-center flex flex-col items-center gap-2">
      <Link href="/documentation">
        <span className="uppercase font-semibold text-2xl">Introduction</span>
      </Link>

      <Link href="#Purpose">Purpose</Link>

      <Link href="#Features">Prerequisites</Link>

      <Link href="#Installation" className="uppercase font-semibold text-2xl">
        Installation
      </Link>

      <Link href="#Dependencies">Dependencies</Link>

      <Link
        href="#Usage & Conventions"
        className="uppercase font-semibold text-2xl "
      >
        Usage
      </Link>

      <Link href="#Folder Structure">Folder Structure</Link>
    </div>
  );
};

export default sideMenu;
