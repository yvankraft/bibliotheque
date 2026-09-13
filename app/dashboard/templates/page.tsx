"use client";

import { useState, useEffect } from "react";
import { authClient } from "../../lib/auth-client";
import DashboardSidebar from "../components/DashboardSidebar";
import { FiLayout, FiArrowRight } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function TemplatesPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const templates = [
    { id: "1", title: "SaaS Landing Page", desc: "Clean minimal design with pricing and features sections.", tag: "Next.js & Tailwind" },
    { id: "2", title: "E-Commerce Store", desc: "Dark luxury layout tailored for high-end digital or physical products.", tag: "Fullstack" },
    { id: "3", title: "Developer Portfolio", desc: "Showcase your open source projects and experience.", tag: "Minimalist" },
  ];

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      if (!data) router.push("/login");
      else setUser(data.user);
      setLoading(false);
    });
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white flex items-center justify-center text-xs font-mono">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 flex transition-colors duration-300">
      <DashboardSidebar user={user} />
      
      <main className="flex-1 h-full overflow-y-auto flex flex-col bg-white dark:bg-black relative">
        <header className="sticky top-0 z-30 min-h-[4rem] h-16 px-8 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md shrink-0">
          <h1 className="text-sm font-semibold tracking-wide text-zinc-800 dark:text-zinc-200">Overview / Templates</h1>
        </header>

        <div className="p-8 space-y-6 w-full">
          <div>
            <h2 className="text-base font-serif font-bold text-zinc-900 dark:text-zinc-100">Starter Templates</h2>
            <p className="text-xs text-zinc-500">Pick a template to instantly generate production-ready code.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((tpl) => (
              <div key={tpl.id} className="border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50 dark:bg-zinc-950 p-6 flex flex-col justify-between space-y-4 hover:border-zinc-400 dark:hover:border-zinc-700 transition shadow-sm">
                <div className="space-y-2">
                  <span className="inline-block text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {tpl.tag}
                  </span>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">{tpl.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{tpl.desc}</p>
                </div>

                <button 
                  onClick={() => router.push("/dashboard/new")}
                  className="w-full py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-medium text-zinc-800 dark:text-zinc-200 flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <span>Use Template</span>
                  <FiArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}