"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/api/lib/auth-client";
import { 
  FiArrowLeft, FiLayout, FiLayers, FiSettings, FiCode, 
  FiPlus, FiSmartphone, FiMonitor, FiTablet, FiPlay, FiCopy, FiCheck, FiTrash2, FiChevronRight
} from "react-icons/fi";

// Import de tous tes blocs UI organisés par catégorie
import { navbars } from "../../../UI-Blocks/navbars"; 
import { heroes } from "../../../UI-Blocks/heroes";
import { buttons } from "../../../UI-Blocks/buttons";
import { textRotators } from "../../../UI-Blocks/textRotators";
import { megaMenus } from "../../../UI-Blocks/megaMenus";
import { productCards } from "../../../UI-Blocks/productCards";
import { footers } from "../../../UI-Blocks/footers";
import { textAreas } from "../../../UI-Blocks/textAreas";
import { gridFeatures } from "../../../UI-Blocks/gridFeatures";
import { pricingCards } from "../../../UI-Blocks/pricingCards";

const categories = [
  { name: "Navbars", blocks: navbars },
  { name: "Heroes", blocks: heroes },
  { name: "Product Cards", blocks: productCards },
  { name: "Buttons", blocks: buttons },
  { name: "Text Rotators", blocks: textRotators },
  { name: "Mega Menus", blocks: megaMenus },
  { name: "Grid Features", blocks: gridFeatures },
  { name: "Pricing Cards", blocks: pricingCards },
  { name: "Text Areas", blocks: textAreas },
  { name: "Footers", blocks: footers },
];

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectWorkspacePage({ params }: ProjectPageProps) {
  const router = useRouter();
  const { id } = use(params);

  const [user, setUser] = useState<any>(null);
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"layers" | "components" | "settings">("components");
  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [copiedCode, setCopiedCode] = useState(false);
  
  // État de la catégorie ouverte dans le méga menu latéral
  const [openCategory, setOpenCategory] = useState<string | null>("Navbars");

  // États du canvas no-code
  const [canvasBlocks, setCanvasBlocks] = useState<any[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      if (!data) {
        router.push("/auth/login");
      } else {
        setUser(data.user);
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
    const fullCode = canvasBlocks.map(b => b.code).join("\n\n");
    navigator.clipboard.writeText(`// Production-ready Next.js code for ${project?.name}\nexport default function Page() {\n  return (\n    <main className="min-h-screen">\n      ${fullCode}\n    </main>\n  );\n}`);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // --- LOGIQUE AJOUT & DRAG & DROP ---
  const addBlockToCanvas = (block: any) => {
    setCanvasBlocks([...canvasBlocks, { instanceId: Date.now().toString(), ...block }]);
  };

  const handleDragStart = (e: React.DragEvent, block: any) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(block));
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const rawData = e.dataTransfer.getData("text/plain");
    if (rawData) {
      try {
        const block = JSON.parse(rawData);
        addBlockToCanvas(block);
      } catch (err) {
        console.error("Failed to parse dropped block", err);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const removeBlock = (instanceId: string) => {
    setCanvasBlocks(canvasBlocks.filter(b => b.instanceId !== instanceId));
    if (selectedBlockId === instanceId) setSelectedBlockId(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white flex items-center justify-center font-mono text-xs">
        Loading workspace...
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 flex flex-col select-none transition-colors duration-300">
      
      {/* --- TOP NAVBAR --- */}
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

      {/* --- MAIN WORKSPACE LAYOUT --- */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT SIDEBAR : MÉGA MENU LATÉRAL DE COMPOSANTS */}
        <aside className="w-80 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex flex-col shrink-0">
          <div className="flex border-b border-zinc-200 dark:border-zinc-800 p-2 gap-1">
            <button
              onClick={() => setActiveTab("components")}
              className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${activeTab === "components" ? "bg-white dark:bg-zinc-900 text-black dark:text-white shadow-sm" : "text-zinc-500 hover:text-zinc-900"}`}
            >
              <FiLayout size={13} />
              <span>UI Library</span>
            </button>
            <button
              onClick={() => setActiveTab("layers")}
              className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${activeTab === "layers" ? "bg-white dark:bg-zinc-900 text-black dark:text-white shadow-sm" : "text-zinc-500 hover:text-zinc-900"}`}
            >
              <FiLayers size={13} />
              <span>Layers</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-xs">
            {activeTab === "components" ? (
              <div className="space-y-2">
                <p className="text-[10px] uppercase font-semibold text-zinc-400 tracking-wider px-2 mb-3">Explorez & Glissez</p>
                
                {/* Accordéon de catégories type Méga Menu */}
                {categories.map((cat) => (
                  <div key={cat.name} className="border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 overflow-hidden shadow-sm">
                    <button
                      onClick={() => setOpenCategory(openCategory === cat.name ? null : cat.name)}
                      className="w-full px-4 py-3 flex items-center justify-between font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition cursor-pointer"
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full text-zinc-500 flex items-center gap-1">
                        {cat.blocks.length} <FiChevronRight size={10} className={`transform transition-transform ${openCategory === cat.name ? 'rotate-90' : ''}`} />
                      </span>
                    </button>

                    {/* Liste des blocs de la catégorie avec aperçu miniature */}
                    {openCategory === cat.name && (
                      <div className="p-3 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
                        {cat.blocks.map((block) => (
                          <div
                            key={block.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, block)}
                            onClick={() => addBlockToCanvas(block)}
                            className="group p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-amber-500 dark:hover:border-amber-500 transition cursor-grab active:cursor-grabbing space-y-2 shadow-xs"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-zinc-900 dark:text-zinc-100">{block.name}</span>
                              <span className="text-[10px] text-amber-500 opacity-0 group-hover:opacity-100 transition">+ Ajouter</span>
                            </div>
                            
                            {/* Miniature de prévisualisation clippée */}
                            <div className="w-full h-20 bg-zinc-100 dark:bg-black rounded border border-zinc-200 dark:border-zinc-800 overflow-hidden relative pointer-events-none scale-50 origin-top-left w-[200%] h-[160%]">
                              <div className="absolute inset-0 transform scale-50" dangerouslySetInnerHTML={{ __html: block.code }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-semibold text-zinc-400 tracking-wider mb-2">Structure de la page</p>
                {canvasBlocks.length === 0 ? (
                  <p className="text-zinc-500 italic p-2">Aucun élément sur le canvas</p>
                ) : (
                  canvasBlocks.map((b, idx) => (
                    <div 
                      key={b.instanceId} 
                      onClick={() => setSelectedBlockId(b.instanceId)}
                      className={`p-2 rounded-lg font-medium flex items-center justify-between cursor-pointer transition ${selectedBlockId === b.instanceId ? 'bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400' : 'bg-zinc-200/50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200'}`}
                    >
                      <span>{idx + 1}. {b.name}</span>
                      <button onClick={(e) => { e.stopPropagation(); removeBlock(b.instanceId); }} className="text-red-500 hover:opacity-80">
                        <FiTrash2 size={12} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </aside>

        {/* CENTER CANVAS (Drop Zone & Live Preview) */}
        <main className="flex-1 bg-zinc-100 dark:bg-zinc-900/40 flex items-center justify-center p-8 overflow-auto relative">
          <div 
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className={`transition-all duration-300 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-y-auto flex flex-col relative ${
              deviceMode === "mobile" ? "w-[375px] h-[667px]" : deviceMode === "tablet" ? "w-[768px] h-[800px]" : "w-full h-full max-w-5xl"
            }`}
          >
            <div className="h-10 border-b border-zinc-200 dark:border-zinc-800 px-4 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950 shrink-0 sticky top-0 z-20">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <span className="text-[11px] font-mono text-zinc-400">preview.local/{project?.name?.toLowerCase().replace(/\s+/g, '-')}</span>
              <div />
            </div>

            <div className="flex-1 flex flex-col w-full min-h-full">
              {canvasBlocks.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 p-8">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400 border border-zinc-200 dark:border-zinc-800">
                    <FiPlus size={24} />
                  </div>
                  <div className="space-y-1 max-w-sm">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Espace de travail vide</h3>
                    <p className="text-xs text-zinc-500">Cliquez ou glissez-déposez des blocs depuis le méga menu de gauche pour composer votre page.</p>
                  </div>
                </div>
              ) : (
                canvasBlocks.map((block) => (
                  <div 
                    key={block.instanceId}
                    onClick={() => setSelectedBlockId(block.instanceId)}
                    className={`relative group w-full resize-y overflow-hidden min-h-[80px] border-2 transition-all ${selectedBlockId === block.instanceId ? 'border-amber-500' : 'border-transparent hover:border-zinc-300 dark:hover:border-zinc-700'}`}
                  >
                    {/* Bouton de suppression rapide au survol */}
                    <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition z-40 bg-zinc-900/80 backdrop-blur-md p-1 rounded-lg">
                      <button 
                        onClick={() => removeBlock(block.instanceId)}
                        className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                        title="Supprimer le bloc"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>

                    {/* Poignée de redimensionnement en bas à droite */}
                    <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-amber-500/50 opacity-0 group-hover:opacity-100 z-30 rounded-tl-sm pointer-events-none"></div>

                    {/* Rendu dynamique du composant */}
                    <div 
                      className="w-full h-full"
                      dangerouslySetInnerHTML={{ __html: block.code }}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </main>

        {/* RIGHT SIDEBAR (Inspector) */}
        <aside className="w-72 border-l border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex flex-col shrink-0 p-4 space-y-6 text-xs">
          <div>
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
              <FiSettings size={14} /> Inspector
            </h4>
            <p className="text-[11px] text-zinc-500">Sélectionnez un bloc sur le canvas ou dans l'onglet Layers pour voir ses options.</p>
          </div>

          <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-zinc-400 mb-1.5">Police globale</label>
              <select className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2 text-xs outline-none">
                <option>Inter (Sans-Serif)</option>
                <option>Playfair (Serif)</option>
                <option>JetBrains Mono</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-zinc-400 mb-1.5">Palette de thèmes</label>
              <div className="flex gap-2">
                <button className="w-6 h-6 rounded-full bg-black border border-zinc-700 cursor-pointer" title="Dark Luxe" />
                <button className="w-6 h-6 rounded-full bg-white border border-zinc-300 cursor-pointer" title="Clean White" />
                <button className="w-6 h-6 rounded-full bg-amber-500 cursor-pointer" title="Gold Accent" />
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}