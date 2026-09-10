"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "../../api/lib/auth-client";
import { FiTrash2, FiRotateCcw, FiAlertTriangle } from "react-icons/fi";
import DashboardSidebar from "../components/DashboardSidebar";

export default function TrashPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [trashedProjects, setTrashedProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTrashedProjects = async () => {
    try {
      const res = await fetch("/api/projects?trash=true");
      if (res.ok) {
        const data = await res.json();
        setTrashedProjects(data);
      }
    } catch (err) {
      console.error("Failed to load trash", err);
    }
  };

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      if (!data) {
        router.push("/auth/login");
      } else {
        setUser(data.user);
        fetchTrashedProjects();
      }
      setLoading(false);
    });
  }, [router]);

  const handleRestore = async (id: string) => {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isDeleted: false }),
      });
      if (res.ok) {
        setTrashedProjects(trashedProjects.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error("Failed to restore project", err);
    }
  };

  const handlePermanentDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this project? This action cannot be undone.")) return;

    try {
      const res = await fetch(`/api/projects/${id}?permanent=true`, {
        method: "DELETE",
      });
      if (res.ok) {
        setTrashedProjects(trashedProjects.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error("Failed to permanently delete project", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white flex items-center justify-center font-mono text-xs">
        Loading trash...
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 flex transition-colors duration-300">
      <DashboardSidebar user={user} />
      
      <main className="flex-1 h-full overflow-y-auto flex flex-col bg-white dark:bg-black relative">
        <header className="sticky top-0 z-30 min-h-[4rem] h-16 px-8 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md shrink-0">
          <h1 className="text-sm font-semibold tracking-wide text-zinc-800 dark:text-zinc-200">Overview / Trash</h1>
        </header>

        <div className="p-8 space-y-6 max-w-4xl mx-auto w-full">
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs flex items-center gap-3">
            <FiAlertTriangle size={18} className="shrink-0" />
            <span>Items in the trash can be restored or permanently deleted at any time.</span>
          </div>

          {trashedProjects.length === 0 ? (
            <div className="p-16 text-center border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50 dark:bg-zinc-950">
              <FiTrash2 size={24} className="mx-auto text-zinc-400 mb-2" />
              <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">Your trash is empty</p>
              <p className="text-[11px] text-zinc-500 mt-1">Deleted projects will appear here.</p>
            </div>
          ) : (
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50 dark:bg-zinc-950 divide-y divide-zinc-200 dark:divide-zinc-900 overflow-hidden">
              {trashedProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 transition">
                  <div>
                    <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{project.name}</p>
                    <p className="text-[11px] text-zinc-500">Deleted on {new Date(project.updatedAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleRestore(project.id)}
                      className="px-3 py-1.5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <FiRotateCcw size={13} />
                      <span>Restore</span>
                    </button>
                    <button 
                      onClick={() => handlePermanentDelete(project.id)}
                      className="px-3 py-1.5 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-xs text-red-600 dark:text-red-400 flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <FiTrash2 size={13} />
                      <span>Delete Forever</span>
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