"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "../../lib/auth-client";
import { FiTrash2, FiRotateCcw } from "react-icons/fi";
import DashboardSidebar from "../components/DashboardSidebar";
export default function TrashPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Exemple de projets dans la corbeille (à lier à ta DB plus tard)
  const [trashedProjects, setTrashedProjects] = useState([
    { id: "1", name: "Ancienne Landing Page", deletedAt: "2 days ago" },
  ]);

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      if (!data) router.push("/login");
      else setUser(data.user);
      setLoading(false);
    });
  }, [router]);

  if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center text-xs font-mono">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex">
      <DashboardSidebar user={user} />
      
      <main className="flex-1 flex flex-col bg-black">
        <header className="h-16 border-b border-zinc-800 px-8 flex items-center justify-between bg-zinc-950/50 backdrop-blur-md">
          <h1 className="text-sm font-semibold tracking-wide text-zinc-200">Overview / Trash</h1>
        </header>

        <div className="p-8 space-y-4 max-w-4xl">
          <p className="text-xs text-zinc-500">Items in the trash are permanently deleted after 30 days.</p>

          {trashedProjects.length === 0 ? (
            <div className="p-12 text-center border border-zinc-800 rounded-xl bg-zinc-950/50">
              <FiTrash2 size={24} className="mx-auto text-zinc-600 mb-2" />
              <p className="text-xs text-zinc-400">Your trash is empty.</p>
            </div>
          ) : (
            <div className="border border-zinc-800 rounded-xl bg-zinc-950 divide-y divide-zinc-900">
              {trashedProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-xs font-medium text-zinc-200">{project.name}</p>
                    <p className="text-[11px] text-zinc-500">Deleted {project.deletedAt}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setTrashedProjects(trashedProjects.filter(p => p.id !== project.id))}
                      className="px-3 py-1.5 rounded-lg border border-zinc-800 hover:bg-zinc-900 text-xs text-zinc-300 flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <FiRotateCcw size={12} />
                      <span>Restore</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}