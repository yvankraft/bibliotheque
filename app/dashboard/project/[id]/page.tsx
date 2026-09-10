"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/api/lib/auth-client";
import { 
  FiArrowLeft, FiLayout, FiLayers, FiSettings, FiCode, 
  FiPlus, FiSmartphone, FiMonitor, FiTablet, FiPlay, FiCopy, FiCheck
} from "react-icons/fi";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectWorkspacePage({ params }: ProjectPageProps) {
  const router = useRouter();
  const { id } = use(params);

  const [user, setUser] = useState<any>(null);
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"layers" | "components" | "settings">("layers");
  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [copiedCode, setCopiedCode] = useState(false);

  // Charger la session et les détails du projet
  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      if (!data) {
        router.push("/auth/login");
      } else {
        setUser(data.user);
        // Récupérer les détails du projet depuis l'API
        fetch(`/api/projects`)
          .then((res) => res.json())
          .then((projects) => {
            const current = projects.find((p: any) => p.id === id);
            setProject(current || { name: "Untitled Project" });
            setLoading(false);
          })
          .catch(() => setLoading(false));
      }
    });
  }, [id, router]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(`// Production-ready Next.js code for ${project?.name}\nexport default function Page() {\n  return <main>Workspace Canvas</main>\n}`);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white flex items-center justify-center font-mono text-xs">
        Loading Figma-inspired workspace...
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 flex flex-col select-none transition-colors duration-300">
      
      {/* --- TOP NAVBAR (Figma / Vercel Header) --- */}
      <header className="h-14 px-4 border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.push("/dashboard")}
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition cursor-pointer"
            title="Back to Dashboard"
          >
            <FiArrowLeft size={16} />
          </button>
          <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800" />
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <h1 className="text-xs font-semibold tracking-wide text-zinc-800 dark:text-zinc-200">{project?.name || "Project Workspace"}</h1>
          </div>
        </div>

        {/* Device Switcher */}
        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <button 
            onClick={() => setDeviceMode("desktop")}
            className={`p-1.5 rounded-lg transition cursor-pointer ${deviceMode === "desktop" ? "bg-white dark:bg-black text-black dark:text-white shadow-sm" : "text-zinc-400 hover:text-zinc-600"}`}
            title="Desktop View"
          >
            <FiMonitor size={14} />
          </button>
          <button 
            onClick={() => setDeviceMode("tablet")}
            className={`p-1.5 rounded-lg transition cursor-pointer ${deviceMode === "tablet" ? "bg-white dark:bg-black text-black dark:text-white shadow-sm" : "text-zinc-400 hover:text-zinc-600"}`}
            title="Tablet View"
          >
            <FiTablet size={14} />
          </button>
          <button 
            onClick={() => setDeviceMode("mobile")}
            className={`p-1.5 rounded-lg transition cursor-pointer ${deviceMode === "mobile" ? "bg-white dark:bg-black text-black dark:text-white shadow-sm" : "text-zinc-400 hover:text-zinc-600"}`}
            title="Mobile View"
          >
            <FiSmartphone size={14} />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
          >
            {copiedCode ? <FiCheck size={14} className="text-emerald-500" /> : <FiCopy size={14} />}
            <span>{copiedCode ? "Copied" : "Export Code"}</span>
          </button>
          <button
            onClick={() => alert("Preview mode activated!")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black dark:bg-white text-white dark:text-black text-xs font-semibold hover:opacity-90 transition cursor-pointer"
          >
            <FiPlay size={13} />
            <span>Publish</span>
          </button>
        </div>
      </header>

      {/* --- MAIN WORKSPACE LAYOUT (Figma Style) --- */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT SIDEBAR (Layers / Components) */}
        <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex flex-col shrink-0">
          <div className="flex border-b border-zinc-200 dark:border-zinc-800 p-2 gap-1">
            <button
              onClick={() => setActiveTab("layers")}
              className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${activeTab === "layers" ? "bg-white dark:bg-zinc-900 text-black dark:text-white shadow-sm" : "text-zinc-500 hover:text-zinc-900"}`}
            >
              <FiLayers size={13} />
              <span>Layers</span>
            </button>
            <button
              onClick={() => setActiveTab("components")}
              className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${activeTab === "components" ? "bg-white dark:bg-zinc-900 text-black dark:text-white shadow-sm" : "text-zinc-500 hover:text-zinc-900"}`}
            >
              <FiLayout size={13} />
              <span>UI Blocks</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2 text-xs">
            {activeTab === "layers" ? (
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-semibold text-zinc-400 tracking-wider mb-2">Page Structure</p>
                <div className="p-2 rounded-lg bg-zinc-200/50 dark:bg-zinc-900 font-medium text-zinc-800 dark:text-zinc-200 flex items-center gap-2 cursor-pointer">
                  <FiLayout size={13} /> Main Container
                </div>
                <div className="pl-4 py-1 text-zinc-500 flex items-center gap-2 cursor-pointer hover:text-zinc-800 dark:hover:text-zinc-200">
                  └ Navbar Header
                </div>
                <div className="pl-4 py-1 text-zinc-500 flex items-center gap-2 cursor-pointer hover:text-zinc-800 dark:hover:text-zinc-200">
                  └ Hero Section
                </div>
                <div className="pl-4 py-1 text-zinc-500 flex items-center gap-2 cursor-pointer hover:text-zinc-800 dark:hover:text-zinc-200">
                  └ Bento Grid Card
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-[10px] uppercase font-semibold text-zinc-400 tracking-wider mb-2">Drag & Drop Blocks</p>
                {["Hero Banner", "Feature Grid", "Pricing Card", "Testimonial", "Footer Minimal"].map((block, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-400 transition cursor-grab flex items-center justify-between">
                    <span>{block}</span>
                    <FiPlus size={13} className="text-zinc-400" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* CENTER CANVAS (Visual Editor Preview) */}
        <main className="flex-1 bg-zinc-100 dark:bg-zinc-900/40 flex items-center justify-center p-8 overflow-auto relative">
          <div className={`transition-all duration-300 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col ${
            deviceMode === "mobile" ? "w-[375px] h-[667px]" : deviceMode === "tablet" ? "w-[768px] h-[800px]" : "w-full h-full max-w-5xl max-h-[85vh]"
          }`}>
            <div className="h-10 border-b border-zinc-200 dark:border-zinc-800 px-4 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950 shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <span className="text-[11px] font-mono text-zinc-400">preview.local/{project?.name?.toLowerCase().replace(/\s+/g, '-')}</span>
              <div />
            </div>

            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400 border border-zinc-200 dark:border-zinc-800">
                <FiCode size={24} />
              </div>
              <div className="space-y-1 max-w-sm">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{project?.name}</h3>
                <p className="text-xs text-zinc-500">Visual canvas ready. Select a component from the left sidebar to start building your layout.</p>
              </div>
            </div>
          </div>
        </main>

        {/* RIGHT SIDEBAR (Properties & Design Inspector) */}
        <aside className="w-72 border-l border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex flex-col shrink-0 p-4 space-y-6 text-xs">
          <div>
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
              <FiSettings size={14} /> Inspector
            </h4>
            <p className="text-[11px] text-zinc-500">Select any element on the canvas to inspect its Tailwind CSS properties and bindings.</p>
          </div>

          <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-zinc-400 mb-1.5">Typography</label>
              <select className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2 text-xs outline-none">
                <option>Inter (Sans-Serif)</option>
                <option>Playfair (Serif)</option>
                <option>JetBrains Mono</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-zinc-400 mb-1.5">Theme Palette</label>
              <div className="flex gap-2">
                <button className="w-6 h-6 rounded-full bg-black border border-zinc-700" title="Dark Luxe" />
                <button className="w-6 h-6 rounded-full bg-white border border-zinc-300" title="Clean White" />
                <button className="w-6 h-6 rounded-full bg-amber-500" title="Gold Accent" />
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}