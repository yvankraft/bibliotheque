"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "../api/lib/auth-client";
import DashboardSidebar from "./components/DashboardSidebar";
import { FiFolder, FiPlusCircle, FiX, FiMoreVertical, FiEdit2, FiShare2, FiTrash2 } from "react-icons/fi";
import UniversalModal from "../components/UniversalModal";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // États de la modale de création
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [creating, setCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Menu déroulant et actions par projet
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Modale de renommage
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [projectToRename, setProjectToRename] = useState<any>(null);
  const [newProjectName, setNewProjectName] = useState("");

  // État pour la modale universelle de partage
  const [shareModalOpen, setShareModalOpen] = useState(false);

  // États pour la modale universelle de suppression
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<any>(null);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error("Failed to load projects", err);
    }
  };

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      if (!data) {
        router.push("/auth/login");
      } else {
        setUser(data.user);
        fetchProjects();
      }
      setLoading(false);
    });

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenuId(null);
      }
    };

    // Écouteur pour ouvrir la modale depuis la Sidebar (New Project)
    const handleOpenModalEvent = () => setIsModalOpen(true);
    window.addEventListener("open-new-project-modal", handleOpenModalEvent);

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("open-new-project-modal", handleOpenModalEvent);
    };
  }, [router]);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: projectName }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create project");
      }

      setProjectName("");
      setIsModalOpen(false);
      await fetchProjects();
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred.");
    } finally {
      setCreating(false);
    }
  };

  const handleOpenDelete = (project: any) => {
    setActiveMenuId(null);
    setProjectToDelete(project);
    setDeleteModalOpen(true);
  };

  const confirmDeleteProject = async () => {
    if (!projectToDelete) return;

    try {
      const res = await fetch(`/api/projects/${projectToDelete.id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== projectToDelete.id));
      }
    } catch (err) {
      console.error("Failed to delete project", err);
    } finally {
      setDeleteModalOpen(false);
      setProjectToDelete(null);
    }
  };

  const handleShareProject = (project: any) => {
    setActiveMenuId(null);
    const projectUrl = `${window.location.origin}/dashboard/project/${project.id}`;
    navigator.clipboard.writeText(projectUrl);
    setShareModalOpen(true);
  };

  const handleOpenRename = (project: any) => {
    setActiveMenuId(null);
    setProjectToRename(project);
    setNewProjectName(project.name);
    setIsRenameModalOpen(true);
  };

  const handleRenameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectToRename || !newProjectName.trim()) return;

    try {
      const res = await fetch(`/api/projects/${projectToRename.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newProjectName }),
      });

      if (res.ok) {
        setIsRenameModalOpen(false);
        await fetchProjects();
      }
    } catch (err) {
      console.error("Failed to rename project", err);
    }
  };

  const handleOpenProject = (projectId: string) => {
    router.push(`/dashboard/project/${projectId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white flex items-center justify-center font-mono text-xs">
        Loading workspace...
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 flex transition-colors duration-300">
      
      <DashboardSidebar user={user} />
      
      <main className="flex-1 h-full overflow-y-hidden flex flex-col bg-white dark:bg-black relative w-full">
        
        {/* Topbar avec z-index et visibilité garanties */}
        <header className="sticky top-0 z-30 min-h-[4rem] w-full h-16 px-8 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md shrink-0">
          <h1 className="text-sm font-semibold tracking-wide text-zinc-800 dark:text-zinc-200">Overview / Projects</h1>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-semibold hover:opacity-90 transition cursor-pointer shadow-sm"
          >
            <FiPlusCircle size={14} />
            <span>Create Project</span>
          </button>
        </header>

        <div className="p-8 flex-1 w-full flex flex-col items-center">
          <div className="w-full">
            {projects.length === 0 ? (
              <div className="flex flex-col  justify-center items-center text-center h-[50vh]">
                <div className="max-w-sm space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mx-auto text-zinc-400">
                    <FiFolder size={22} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">No projects yet</h3>
                    <p className="text-xs text-zinc-500">Get started by creating a new visual web project.</p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition cursor-pointer"
                  >
                    <FiPlusCircle size={14} />
                    <span>Create your first project</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {projects.map((project) => (
                  <div 
                    key={project.id}
                    onClick={() => handleOpenProject(project.id)}
                    className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex items-center justify-between group hover:border-zinc-400 dark:hover:border-zinc-600 transition relative cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300">
                        <FiFolder size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:underline">{project.name}</h4>
                        <p className="text-[11px] text-zinc-500">Created {new Date(project.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="relative" ref={menuRef} onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => setActiveMenuId(activeMenuId === project.id ? null : project.id)}
                        className="p-2 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition cursor-pointer"
                      >
                        <FiMoreVertical size={16} />
                      </button>

                      {activeMenuId === project.id && (
                        <div className="absolute right-0 mt-2 w-36 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl py-1.5 z-40 text-xs">
                          <button
                            onClick={() => handleOpenRename(project)}
                            className="w-full px-3.5 py-2 text-left flex items-center gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition cursor-pointer"
                          >
                            <FiEdit2 size={13} />
                            <span>Rename</span>
                          </button>
                          <button
                            onClick={() => handleShareProject(project)}
                            className="w-full px-3.5 py-2 text-left flex items-center gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition cursor-pointer"
                          >
                            <FiShare2 size={13} />
                            <span>Share</span>
                          </button>
                          <div className="my-1 border-t border-zinc-200 dark:border-zinc-800" />
                          <button
                            onClick={() => handleOpenDelete(project)}
                            className="w-full px-3.5 py-2 text-left flex items-center gap-2 hover:bg-red-500/10 text-red-600 dark:text-red-400 transition cursor-pointer"
                          >
                            <FiTrash2 size={13} />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* --- MODALES --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-900">
              <div>
                <h2 className="text-sm font-bold text-zinc-900 dark:text-white">Create New Project</h2>
                <p className="text-xs text-zinc-500 mt-0.5">Enter a name for your new workspace repository.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition cursor-pointer">
                <FiX size={16} />
              </button>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-xs">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-600 dark:text-zinc-400 mb-2">Project Name</label>
                <input 
                  type="text" 
                  value={projectName} 
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g. crystal-night"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 outline-none focus:border-black dark:focus:border-white transition"
                  required
                  autoFocus
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 transition cursor-pointer">
                  Cancel
                </button>
                <button type="submit" disabled={creating || !projectName.trim()} className="flex-1 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-semibold hover:opacity-90 transition disabled:opacity-50 cursor-pointer flex items-center justify-center">
                  {creating ? "Creating..." : "Creer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isRenameModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-900">
              <div>
                <h2 className="text-sm font-bold text-zinc-900 dark:text-white">Rename Project</h2>
                <p className="text-xs text-zinc-500 mt-0.5">Update your repository name.</p>
              </div>
              <button onClick={() => setIsRenameModalOpen(false)} className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition cursor-pointer">
                <FiX size={16} />
              </button>
            </div>

            <form onSubmit={handleRenameSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-600 dark:text-zinc-400 mb-2">New Name</label>
                <input 
                  type="text" 
                  value={newProjectName} 
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 outline-none focus:border-black dark:focus:border-white transition"
                  required
                  autoFocus
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsRenameModalOpen(false)} className="flex-1 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 transition cursor-pointer">
                  Cancel
                </button>
                <button type="submit" disabled={!newProjectName.trim()} className="flex-1 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-semibold hover:opacity-90 transition cursor-pointer flex items-center justify-center">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <UniversalModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        title="Project Link Shared"
        message="The project link has been successfully copied to your clipboard."
        type="success"
        confirmText="OK"
        onConfirm={() => setShareModalOpen(false)}
      />

      <UniversalModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setProjectToDelete(null);
        }}
        title="Delete Project"
        message="Are you sure you want to delete this project?"
        type="warning"
        confirmText="Delete"
        onConfirm={confirmDeleteProject}
      />
    </div>
  );
}