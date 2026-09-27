// app/project/[id]/page.tsx

"use client";

import { useState, useEffect, use, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";
import { withTimeout } from "@/app/lib/with-timeout";

import TopBar from "../components/TopBar";
import LeftSidebar from "../components/LeftSidebar";
import Canvas from "../components/Canvas";
import RightInspector from "../components/RightInspector";
import CommandPalette, {
  type PaletteCommand,
} from "../components/CommandPalette";
import FloatingToolbar from "../../components/EditorToolbar"; // ton composant existant

import {
  FiMousePointer,
  FiSquare,
  FiType,
  FiPlusSquare,
  FiBox,
  FiMonitor,
  FiTablet,
  FiSmartphone,
  FiSun,
  FiMoon,
  FiMaximize2,
  FiZoomIn,
  FiCopy,
  FiArrowLeft,
  FiFileText,
  FiPlus,
  FiTrash2,
  FiLayers,
} from "react-icons/fi";

import {
  navbars,
  heroes,
  buttons,
  textRotators,
  megaMenus,
  productCards,
  footers,
  textAreas,
  gridFeatures,
  pricingCards,
} from "@/app/UI-Blocks/components";
import { threeDElements } from "@/app/UI-Blocks/three3d";

import {
  MIN_WIDTH,
  MIN_HEIGHT,
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
} from "../components/types";

import type {
  ActiveTab,
  DeviceMode,
  PageData,
  PageTheme,
  RawBlockDef,
  UIBlockInstance,
  UIElement,
} from "../components/types";

const categories: { name: string; blocks: RawBlockDef[] }[] = [
  { name: "3D Scenes", blocks: threeDElements },
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

  // ---------------------------------------------------------
  // ÉTATS UI
  // ---------------------------------------------------------

  const [project, setProject] = useState<{ name?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setUserData] = useState<unknown>(null);
  const [activeTool, setActiveTool] = useState("cursor");

  const [activeTab, setActiveTab] = useState<ActiveTab>("components");
  const [deviceMode, setDeviceMode] = useState<DeviceMode>("desktop");
  const [zoom, setZoom] = useState<number>(100);
  const [copiedCode, setCopiedCode] = useState(false);
  const [pageTheme, setPageTheme] = useState<PageTheme>("dark");
  const [searchQuery, setSearchQuery] = useState("");
  const [openCategory, setOpenCategory] = useState<string | null>("Navbars");
  const [paletteOpen, setPaletteOpen] = useState(false);

  // ---------------------------------------------------------
  // ÉTATS MULTI-PAGES
  // ---------------------------------------------------------

  const [pages, setPages] = useState<PageData[]>([
    { id: "home", name: "Home", blocks: [] },
  ]);
  const [activePageId, setActivePageId] = useState<string>("home");

  const activePage =
    pages.find((p) => p.id === activePageId) || pages[0];
  const canvasBlocks = activePage.blocks;

  const setCanvasBlocks = useCallback(
    (
      updater:
        | UIBlockInstance[]
        | ((prev: UIBlockInstance[]) => UIBlockInstance[])
    ) => {
      setPages((prevPages) =>
        prevPages.map((page) => {
          if (page.id !== activePageId) return page;
          const newBlocks =
            typeof updater === "function" ? updater(page.blocks) : updater;
          return { ...page, blocks: newBlocks };
        })
      );
    },
    [activePageId]
  );

  const handleAddPage = () => {
    const newId = `page_${Date.now()}`;
    const newName = `Page ${pages.length + 1}`;
    setPages([...pages, { id: newId, name: newName, blocks: [] }]);
    setActivePageId(newId);
  };

  const handleDeletePage = (pageId: string) => {
    if (pages.length <= 1) return;
    const filtered = pages.filter((p) => p.id !== pageId);
    setPages(filtered);
    if (activePageId === pageId) setActivePageId(filtered[0].id);
  };

  // ---------------------------------------------------------
  // SÉLECTION
  // ---------------------------------------------------------

  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    null
  );
  const [selectedBlockInstanceId, setSelectedBlockInstanceId] = useState<
    string | null
  >(null);

  // ---------------------------------------------------------
  // REFS INTERACTIONS
  // ---------------------------------------------------------

  const [draggingBlockId, setDraggingBlockId] = useState<string | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });

  const [resizingState, setResizingState] = useState<{
    instanceId: string;
    direction: string;
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
    startBlockX: number;
    startBlockY: number;
  } | null>(null);

  const panPositionRef = useRef(panPosition);
  const isPanningRef = useRef(isPanning);
  const draggingBlockIdRef = useRef(draggingBlockId);
  const resizingStateRef = useRef(resizingState);
  const zoomRef = useRef(zoom);

  useEffect(() => {
    panPositionRef.current = panPosition;
  }, [panPosition]);
  useEffect(() => {
    isPanningRef.current = isPanning;
  }, [isPanning]);
  useEffect(() => {
    draggingBlockIdRef.current = draggingBlockId;
  }, [draggingBlockId]);
  useEffect(() => {
    resizingStateRef.current = resizingState;
  }, [resizingState]);
  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);

  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const startPanRef = useRef({ x: 0, y: 0 });

  // ---------------------------------------------------------
  // AUTH + PROJET
  // ---------------------------------------------------------

  useEffect(() => {
    withTimeout(authClient.getSession()).then(({ data }) => {
      if (!data) {
        router.push("/auth/login");
        return;
      }
      setUserData(data.user);
      withTimeout(fetch("/api/projects"))
        .then((res) => res.json())
        .then((projects) => {
          setProject(
            projects.find((p: { id: string; name?: string }) => p.id === id) || {
              name: "Untitled Project",
            }
          );
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }).catch(() => {
      setLoading(false);
      router.push("/auth/login");
    });
  }, [id, router]);

  // ---------------------------------------------------------
  // LISTENERS GLOBAUX
  // ---------------------------------------------------------

  useEffect(() => {
    const handleMouseMoveWindow = (e: MouseEvent) => {
      const scale = zoomRef.current / 100;
      const pan = panPositionRef.current;

      if (isPanningRef.current) {
        setPanPosition({
          x: e.clientX - startPanRef.current.x,
          y: e.clientY - startPanRef.current.y,
        });
        return;
      }

      const rs = resizingStateRef.current;
      if (rs) {
        const dx = (e.clientX - rs.startX) / scale;
        const dy = (e.clientY - rs.startY) / scale;

        setCanvasBlocks((prev) =>
          prev.map((block) => {
            if (block.instanceId !== rs.instanceId) return block;

            let newWidth = rs.startWidth;
            let newHeight = rs.startHeight;
            let newX = rs.startBlockX;
            let newY = rs.startBlockY;

            if (rs.direction.includes("e"))
              newWidth = Math.max(MIN_WIDTH, rs.startWidth + dx);
            if (rs.direction.includes("s"))
              newHeight = Math.max(MIN_HEIGHT, rs.startHeight + dy);

            if (rs.direction.includes("w")) {
              const clampedDx = Math.min(dx, rs.startWidth - MIN_WIDTH);
              newWidth = rs.startWidth - clampedDx;
              newX = Math.max(0, rs.startBlockX + clampedDx);
            }
            if (rs.direction.includes("n")) {
              const clampedDy = Math.min(dy, rs.startHeight - MIN_HEIGHT);
              newHeight = rs.startHeight - clampedDy;
              newY = Math.max(0, rs.startBlockY + clampedDy);
            }

            const isVerticalResize =
              rs.direction.includes("n") || rs.direction.includes("s");

            return {
              ...block,
              width: newWidth,
              height: newHeight,
              x: newX,
              y: newY,
              autoHeight: isVerticalResize ? false : block.autoHeight,
            };
          })
        );
        return;
      }

      const dragId = draggingBlockIdRef.current;
      if (dragId) {
        const newX = (e.clientX - pan.x) / scale - dragOffsetRef.current.x;
        const newY = (e.clientY - pan.y) / scale - dragOffsetRef.current.y;

        setCanvasBlocks((prev) =>
          prev.map((block) =>
            block.instanceId === dragId
              ? {
                ...block,
                // Snap à la grille 8px façon Figma
                x: Math.max(0, Math.round(newX / 8) * 8),
                y: Math.max(0, Math.round(newY / 8) * 8),
              }
              : block
          )
        );
      }
    };

    const handleMouseUpWindow = () => {
      setIsPanning(false);
      setDraggingBlockId(null);
      setResizingState(null);
    };

    window.addEventListener("mousemove", handleMouseMoveWindow);
    window.addEventListener("mouseup", handleMouseUpWindow);

    return () => {
      window.removeEventListener("mousemove", handleMouseMoveWindow);
      window.removeEventListener("mouseup", handleMouseUpWindow);
    };
  }, [setCanvasBlocks]);

  // ---------------------------------------------------------
  // HANDLERS
  // ---------------------------------------------------------

  const handleCopyCode = () => {
    navigator.clipboard.writeText(
      `// Code généré depuis ${project?.name}\n\nexport default function Page() {\n  return (\n    <main className="min-h-screen relative">\n    </main>\n  );\n}`
    );
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const generateUniqueIds = (node: UIElement): UIElement => ({
    ...node,
    id: `el_${Math.random().toString(36).substr(2, 9)}`,
    children: Array.isArray(node.children)
      ? node.children.map(generateUniqueIds)
      : node.children,
  });

  const addBlockToCanvas = (rawBlock: RawBlockDef, x?: number, y?: number) => {
    const newBlock: UIBlockInstance = {
      instanceId: Date.now().toString(),
      name: rawBlock.name,
      category: rawBlock.category,
      x: x ?? 40 + canvasBlocks.length * 20,
      y: y ?? 40 + canvasBlocks.length * 40,
      width: rawBlock.width ?? DEFAULT_WIDTH,
      height: rawBlock.height ?? undefined,
      autoHeight: rawBlock.height ? false : true,
      root: generateUniqueIds(rawBlock.root),
    };

    setCanvasBlocks([...canvasBlocks, newBlock]);
    setSelectedBlockInstanceId(newBlock.instanceId);
    setSelectedElementId(newBlock.root.id);
  };

  const handleDragStartSidebar = (e: React.DragEvent, block: RawBlockDef) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(block));
  };

  const handleDropOnCanvas = (e: React.DragEvent) => {
    e.preventDefault();
    const rawData = e.dataTransfer.getData("text/plain");
    if (!rawData) return;
    try {
      // Positionne le bloc là où il est lâché (coordonnées relatives à la page)
      const preview = document.getElementById("page-preview");
      const rect = preview?.getBoundingClientRect();
      const scale = zoom / 100;
      const x = rect
        ? Math.max(0, Math.round((e.clientX - rect.left) / scale / 8) * 8)
        : undefined;
      const y = rect
        ? Math.max(0, Math.round((e.clientY - rect.top) / scale / 8) * 8)
        : undefined;
      addBlockToCanvas(JSON.parse(rawData), x, y);
    } catch (err) {
      console.error("Erreur de drop", err);
    }
  };

  // Outils de création : texte, bouton, frame, scène 3D — cliquer dans la page place l'élément
  const createPrimitiveAt = (tool: string, x: number, y: number) => {
    const px = Math.round(x / 8) * 8;
    const py = Math.round(y / 8) * 8;
    const primitives: Record<string, { name: string; width: number; height: number; root: Omit<UIElement, "id"> }> = {
      text: {
        name: "Text",
        width: 320,
        height: 56,
        root: {
          type: "p",
          props: {
            className:
              "text-2xl font-bold text-zinc-900 dark:text-white font-sans leading-snug",
          },
          children: "Double-cliquez dans l'inspecteur pour éditer",
        },
      },
      button: {
        name: "Button",
        width: 200,
        height: 56,
        root: {
          type: "button",
          props: {
            className:
              "px-6 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-sans text-sm font-semibold hover:scale-[1.02] active:scale-95 transition-all shadow-md",
          },
          children: "Bouton",
        },
      },
      frame: {
        name: "Frame",
        width: 420,
        height: 260,
        root: {
          type: "div",
          props: {
            className:
              "w-full h-full rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/30 flex items-center justify-center",
          },
          children: [
            {
              id: "frame-hint",
              type: "span",
              props: { className: "text-xs font-mono text-zinc-400" },
              children: "Frame",
            },
          ],
        },
      },
      scene3d: {
        name: "3D Scene",
        width: 420,
        height: 320,
        root: {
          type: "scene3d",
          props: {
            shape: "torusKnot",
            color: "#f59e0b",
            speed: 1,
            className: "w-full h-full",
          },
        },
      },
    };

    const def = primitives[tool];
    if (!def) return;

    const newBlock: UIBlockInstance = {
      instanceId: Date.now().toString(),
      name: def.name,
      category: "Primitive",
      x: Math.max(0, px - def.width / 2),
      y: Math.max(0, py - 20),
      width: def.width,
      height: def.height,
      autoHeight: tool === "text",
      root: generateUniqueIds({ id: "tmp", ...def.root } as UIElement),
    };

    setCanvasBlocks((prev) => [...prev, newBlock]);
    setSelectedBlockInstanceId(newBlock.instanceId);
    setSelectedElementId(newBlock.root.id);
    setActiveTool("cursor");
  };

  const handleBlockMouseDown = (
    e: React.MouseEvent,
    blockInstanceId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedBlockInstanceId(blockInstanceId);
    setDraggingBlockId(blockInstanceId);

    const block = canvasBlocks.find(
      (b) => b.instanceId === blockInstanceId
    );
    if (!block) return;

    const scale = zoom / 100;
    const pan = panPositionRef.current;

    dragOffsetRef.current = {
      x: (e.clientX - pan.x) / scale - block.x,
      y: (e.clientY - pan.y) / scale - block.y,
    };
  };

  const handleResizeMouseDown = (
    e: React.MouseEvent,
    instanceId: string,
    direction: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const block = canvasBlocks.find((b) => b.instanceId === instanceId);
    if (!block) return;

    const blockEl = (e.currentTarget as HTMLElement).closest(
      "[data-block-id]"
    ) as HTMLElement | null;

    setSelectedBlockInstanceId(instanceId);
    setResizingState({
      instanceId,
      direction,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: block.width ?? blockEl?.offsetWidth ?? DEFAULT_WIDTH,
      startHeight: blockEl?.offsetHeight ?? block.height ?? DEFAULT_HEIGHT,
      startBlockX: block.x,
      startBlockY: block.y,
    });
  };

  const handleMouseDownCanvasBg = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.id !== "canvas-bg") return;

    setIsPanning(true);
    startPanRef.current = {
      x: e.clientX - panPositionRef.current.x,
      y: e.clientY - panPositionRef.current.y,
    };
    setSelectedElementId(null);
    setSelectedBlockInstanceId(null);
  };

  const removeBlock = (instanceId: string) => {
    setCanvasBlocks((prev) =>
      prev.filter((b) => b.instanceId !== instanceId)
    );
    setSelectedElementId(null);
    setSelectedBlockInstanceId(null);
  };

  const findElement = (
    nodes: UIElement[],
    id: string
  ): UIElement | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (Array.isArray(node.children)) {
        const found = findElement(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const updateElementInTree = (
    nodes: UIElement[],
    id: string,
    updates: Partial<UIElement>
  ): UIElement[] =>
    nodes.map((node) => {
      if (node.id === id) return { ...node, ...updates };
      if (Array.isArray(node.children)) {
        return {
          ...node,
          children: updateElementInTree(node.children, id, updates),
        };
      }
      return node;
    });

  const handleUpdateSelected = (updates: Partial<UIElement>) => {
    if (!selectedElementId) return;
    setCanvasBlocks((prev) =>
      prev.map((block) => ({
        ...block,
        root: updateElementInTree([block.root], selectedElementId, updates)[0],
      }))
    );
  };

  const activeElement = selectedElementId
    ? findElement(
      canvasBlocks.map((b) => b.root),
      selectedElementId
    )
    : null;

  const duplicateBlock = (instanceId: string) => {
    const source = canvasBlocks.find((b) => b.instanceId === instanceId);
    if (!source) return;
    const clone: UIBlockInstance = {
      ...source,
      instanceId: `${Date.now()}`,
      x: source.x + 24,
      y: source.y + 24,
      root: generateUniqueIds(source.root),
    };
    setCanvasBlocks((prev) => [...prev, clone]);
    setSelectedBlockInstanceId(clone.instanceId);
    setSelectedElementId(clone.root.id);
  };

  const fitZoom = () => {
    const el = document.getElementById("canvas-bg");
    if (!el) return;
    const w = deviceMode === "mobile" ? 375 : deviceMode === "tablet" ? 768 : 1200;
    const h = deviceMode === "mobile" ? 750 : 900;
    const z = Math.min(
      (el.clientWidth - 96) / w,
      (el.clientHeight - 96) / h
    ) * 100;
    const clamped = Math.round(Math.max(10, Math.min(200, z)));
    setZoom(clamped);
    // Recentre la frame dans le viewport
    setPanPosition({
      x: Math.round((el.clientWidth - w * (clamped / 100)) / 2),
      y: Math.round((el.clientHeight - h * (clamped / 100)) / 2),
    });
  };

  // Centre la frame au chargement
  const centeredOnceRef = useRef(false);
  useEffect(() => {
    if (!loading && !centeredOnceRef.current) {
      centeredOnceRef.current = true;
      requestAnimationFrame(fitZoom);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  // ---------------------------------------------------------
  // RACCOURCIS CLAVIER (Suppr, Esc, Ctrl+D, V/F/T/B/3)
  // ---------------------------------------------------------

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      )
        return;

      if (e.key === "Escape") {
        setSelectedElementId(null);
        setSelectedBlockInstanceId(null);
        setActiveTool("cursor");
        return;
      }

      if (
        (e.key === "Delete" || e.key === "Backspace") &&
        selectedBlockInstanceId
      ) {
        e.preventDefault();
        removeBlock(selectedBlockInstanceId);
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "d") {
        if (selectedBlockInstanceId) {
          e.preventDefault();
          duplicateBlock(selectedBlockInstanceId);
        }
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
        return;
      }

      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const toolKeys: Record<string, string> = {
        v: "cursor",
        f: "frame",
        t: "text",
        b: "button",
        "3": "scene3d",
      };
      const tool = toolKeys[e.key.toLowerCase()];
      if (tool) setActiveTool(tool);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBlockInstanceId, canvasBlocks]);

  // ---------------------------------------------------------
  // PALETTE DE COMMANDES (Cmd+K)
  // ---------------------------------------------------------

  const paletteCommands: PaletteCommand[] = [
    // Outils
    { id: "t-cursor", group: "Outils", label: "Outil Sélection", hint: "V", icon: <FiMousePointer size={14} />, action: () => setActiveTool("cursor") },
    { id: "t-frame", group: "Outils", label: "Outil Conteneur", hint: "F", icon: <FiSquare size={14} />, action: () => setActiveTool("frame") },
    { id: "t-text", group: "Outils", label: "Outil Texte", hint: "T", icon: <FiType size={14} />, action: () => setActiveTool("text") },
    { id: "t-button", group: "Outils", label: "Outil Bouton", hint: "B", icon: <FiPlusSquare size={14} />, action: () => setActiveTool("button") },
    { id: "t-3d", group: "Outils", label: "Outil Scène 3D", hint: "3", icon: <FiBox size={14} />, action: () => setActiveTool("scene3d") },
    // Affichage
    { id: "d-desktop", group: "Affichage", label: "Aperçu Desktop", icon: <FiMonitor size={14} />, action: () => setDeviceMode("desktop") },
    { id: "d-tablet", group: "Affichage", label: "Aperçu Tablette", icon: <FiTablet size={14} />, action: () => setDeviceMode("tablet") },
    { id: "d-mobile", group: "Affichage", label: "Aperçu Mobile", icon: <FiSmartphone size={14} />, action: () => setDeviceMode("mobile") },
    {
      id: "d-theme",
      group: "Affichage",
      label: `Page en mode ${pageTheme === "dark" ? "clair" : "sombre"}`,
      icon: pageTheme === "dark" ? <FiSun size={14} /> : <FiMoon size={14} />,
      action: () => setPageTheme((p) => (p === "dark" ? "light" : "dark")),
    },
    // Zoom
    { id: "z-fit", group: "Zoom", label: "Ajuster à l'écran", icon: <FiMaximize2 size={14} />, action: fitZoom },
    { id: "z-50", group: "Zoom", label: "Zoom 50%", icon: <FiZoomIn size={14} />, action: () => setZoom(50) },
    { id: "z-100", group: "Zoom", label: "Zoom 100%", icon: <FiZoomIn size={14} />, action: () => setZoom(100) },
    { id: "z-150", group: "Zoom", label: "Zoom 150%", icon: <FiZoomIn size={14} />, action: () => setZoom(150) },
    // Pages
    ...pages.map((p) => ({
      id: `p-${p.id}`,
      group: "Pages",
      label: `Aller à ${p.name}`,
      hint: p.id === activePageId ? "active" : undefined,
      icon: <FiFileText size={14} />,
      action: () => setActivePageId(p.id),
    })),
    { id: "p-new", group: "Pages", label: "Nouvelle page", icon: <FiPlus size={14} />, action: handleAddPage },
    // Actions
    { id: "a-export", group: "Actions", label: "Exporter le code", icon: <FiCopy size={14} />, action: handleCopyCode },
    { id: "a-layers", group: "Actions", label: "Afficher les layers", icon: <FiLayers size={14} />, action: () => setActiveTab("layers") },
    { id: "a-assets", group: "Actions", label: "Afficher les assets", icon: <FiSquare size={14} />, action: () => setActiveTab("components") },
    ...(selectedBlockInstanceId
      ? [
        { id: "a-dup", group: "Actions", label: "Dupliquer le bloc sélectionné", hint: "⌘D", icon: <FiCopy size={14} />, action: () => duplicateBlock(selectedBlockInstanceId) },
        { id: "a-del", group: "Actions", label: "Supprimer le bloc sélectionné", hint: "Suppr", icon: <FiTrash2 size={14} />, action: () => removeBlock(selectedBlockInstanceId) },
      ]
      : []),
    { id: "a-back", group: "Actions", label: "Retour au dashboard", icon: <FiArrowLeft size={14} />, action: () => router.push("/dashboard") },
    // Insertion de blocs — chaque catégorie devient un groupe
    ...categories.flatMap((cat) =>
      cat.blocks.map((b) => ({
        id: `b-${cat.name}-${b.id ?? b.name}`,
        group: `Insérer · ${cat.name}`,
        label: b.name,
        icon: <FiPlusSquare size={14} />,
        action: () => addBlockToCanvas(b),
      }))
    ),
  ];

  // ---------------------------------------------------------
  // LOADING
  // ---------------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white flex items-center justify-center font-mono text-xs">
        Loading workspace...
      </div>
    );
  }

  // ---------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------

  return (
    <div className="h-screen overflow-hidden bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 flex flex-col select-none transition-colors duration-300">
      <TopBar
        projectName={project?.name || "Workspace"}
        deviceMode={deviceMode}
        setDeviceMode={setDeviceMode}
        zoom={zoom}
        setZoom={setZoom}
        pageTheme={pageTheme}
        toggleTheme={() =>
          setPageTheme((p) => (p === "dark" ? "light" : "dark"))
        }
        copiedCode={copiedCode}
        onCopyCode={handleCopyCode}
        onFitZoom={fitZoom}
        onOpenPalette={() => setPaletteOpen(true)}
        onPublish={() => alert("Publication activée !")}
        onBack={() => router.push("/dashboard")}
      />

      <CommandPalette
        open={paletteOpen}
        commands={paletteCommands}
        onClose={() => setPaletteOpen(false)}
      />

      <div className="flex-1 flex overflow-hidden">
        <LeftSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          openCategory={openCategory}
          setOpenCategory={setOpenCategory}
          categories={categories}
          canvasBlocks={canvasBlocks}
          onDragStartSidebar={handleDragStartSidebar}
          onAddBlock={addBlockToCanvas}
          onRemoveBlock={removeBlock}
          onSelectBlock={(b) => {
            setSelectedBlockInstanceId(b.instanceId);
            setSelectedElementId(b.root.id);
          }}
        />

        <div className="flex-1 relative flex flex-col overflow-hidden">
          <Canvas
            deviceMode={deviceMode}
            pageTheme={pageTheme}
            zoom={zoom}
            setZoom={setZoom}
            panPosition={panPosition}
            activePage={activePage}
            canvasBlocks={canvasBlocks}
            selectedElementId={selectedElementId}
            selectedBlockInstanceId={selectedBlockInstanceId}
            isPanning={isPanning}
            activeTool={activeTool}
            onCanvasMouseDown={handleMouseDownCanvasBg}
            onCanvasDrop={handleDropOnCanvas}
            onBlockMouseDown={handleBlockMouseDown}
            onResizeMouseDown={handleResizeMouseDown}
            onRemoveBlock={removeBlock}
            onSelectElement={setSelectedElementId}
            onCreateAt={createPrimitiveAt}
          />

          <FloatingToolbar
            activeTool={activeTool}
            setActiveTool={setActiveTool}
            pages={pages}
            activePageId={activePageId}
            onSelectPage={setActivePageId}
            onAddPage={handleAddPage}
            onDeletePage={handleDeletePage}
          />
        </div>

        <RightInspector
          activeElement={activeElement}
          zoom={zoom}
          onUpdateSelected={handleUpdateSelected}
        />
      </div>
    </div>
  );
}