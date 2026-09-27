"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const SECTIONS = [
  {
    id: "introduction",
    label: "Introduction",
    links: [
      { id: "purpose", label: "Purpose" },
      { id: "prerequisites", label: "Prerequisites" },
    ],
  },
  {
    id: "installation",
    label: "Installation",
    links: [{ id: "dependencies", label: "Dependencies" }],
  },
  {
    id: "usage",
    label: "Usage",
    links: [{ id: "conventions", label: "Conventions" }],
  },
];

const SideMenu = () => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    document
      .querySelectorAll("[data-doc-section]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const linkClass = (id: string) =>
    `block py-1 text-sm transition border-l-2 pl-3 ${activeId === id
      ? "text-zinc-900 dark:text-white font-semibold border-zinc-900 dark:border-white"
      : "text-zinc-500 dark:text-zinc-400 border-transparent hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700"
    }`;

  return (
    <aside className="hidden md:flex sticky top-0 h-screen w-64 shrink-0 flex-col gap-6 overflow-y-auto p-8 pt-28">
      {SECTIONS.map((section) => (
        <div key={section.id} className="space-y-1">
          <Link
            href={`#${section.id}`}
            className={`block text-xs font-bold uppercase tracking-widest transition ${activeId === section.id
                ? "text-zinc-900 dark:text-white"
                : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              }`}
          >
            {section.label}
          </Link>
          <div className="flex flex-col pt-1">
            {section.links.map((link) => (
              <Link key={link.id} href={`#${link.id}`} className={linkClass(link.id)}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ))}

      <Link
        href="/composants"
        className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-zinc-900 dark:hover:text-white transition"
      >
        Go to Components →
      </Link>
    </aside>
  );
};

export default SideMenu;
