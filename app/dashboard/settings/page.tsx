"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "../../lib/auth-client";
import { withTimeout } from "../../lib/with-timeout";
import DashboardSidebar from "../components/DashboardSidebar";
import { FiSettings, FiCheck, FiSliders, FiGlobe } from "react-icons/fi";

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [workspaceName, setWorkspaceName] = useState("Mon Workspace");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    withTimeout(authClient.getSession()).then(({ data }) => {
      if (!data) {
        router.push("/auth/login");
      } else {
        setUser(data.user);
      }
      setLoading(false);
    }).catch(() => {
      setLoading(false);
      router.push("/auth/login");
    });
  }, [router]);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
    }, 600);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white flex items-center justify-center font-mono text-xs">
        Loading settings...
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 flex transition-colors duration-300">

      {/* Sidebar fixe */}
      <DashboardSidebar user={user} />

      {/* Zone principale scrollable */}
      <main className="flex-1 h-full overflow-y-auto flex flex-col bg-white dark:bg-black relative">

        {/* Header fixe */}
        <header className="sticky top-0 z-35 min-h-[4rem] h-16 px-8 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md shrink-0">
          <h1 className="text-sm font-semibold tracking-wide text-zinc-800 dark:text-zinc-200">Settings / General Workspace</h1>
        </header>

        {/* Contenu principal */}
        <div className="p-8 space-y-8 w-full pb-16">

          {success && (
            <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs flex items-center gap-2">
              <FiCheck size={14} />
              <span>Settings updated successfully.</span>
            </div>
          )}

          {/* Section 1 : Généralités du Workspace */}
          <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50 dark:bg-zinc-950 space-y-6 shadow-sm">
            <div className="flex items-center gap-3 pb-6 border-b border-zinc-200 dark:border-zinc-900">
              <div className="p-3 rounded-xl bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">
                <FiSettings size={20} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Workspace Settings</h3>
                <p className="text-xs text-zinc-500">Manage your general environment configuration.</p>
              </div>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-zinc-600 dark:text-zinc-400 mb-2">Workspace Name</label>
                <input
                  type="text"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-500 transition"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full py-2.5 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-semibold hover:opacity-90 transition cursor-pointer disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Workspace Settings"}
              </button>
            </form>
          </div>

          {/* Section 2 : Préférences d'affichage / Environnement */}
          <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50 dark:bg-zinc-950 space-y-6 shadow-sm">
            <div className="flex items-center gap-3 pb-6 border-b border-zinc-200 dark:border-zinc-900">
              <div className="p-3 rounded-xl bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">
                <FiSliders size={20} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Developer Preferences</h3>
                <p className="text-xs text-zinc-500">Configure your code export and builder behaviors.</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between py-3 border-b border-zinc-200 dark:border-zinc-900">
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100">Strict TypeScript Generation</p>
                  <p className="text-zinc-500">Enforce strict typing on exported visual components.</p>
                </div>
                <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10px]">Enabled</span>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100">Auto-save Layouts</p>
                  <p className="text-zinc-500">Automatically backup your builder workspace changes.</p>
                </div>
                <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10px]">Enabled</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}