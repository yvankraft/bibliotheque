// app/project/[id]/page.tsx

"use client";

import { useState, useEffect, use, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/api/lib/auth-client";

import TopBar from "../components/TopBar";
import LeftSidebar from "../components/LeftSidebar";
import Canvas from "../components/Canvas";
import RightInspector from "../components/RightInspector";
import FloatingToolbar from "../../components/EditorToolbar"; // ton composant existant

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
  UIBlockInstance,
  UIElement,
} from "../components/types";

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

  // ---------------------------------------------------------
  // ÉTATS UI
  // ---------------------------------------------------------

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [, setUserData] = useState<any>(null);
  const [activeTool, setActiveTool] = useState("cursor");

  const [activeTab, setActiveTab] = useState<ActiveTab>("components");
  const [deviceMode, setDeviceMode] = useState<DeviceMode>("desktop");
  const [zoom, setZoom] = useState<number>(100);
  const [copiedCode, setCopiedCode] = useState(false);
  const [pageTheme, setPageTheme] = useState<PageTheme>("dark");
  const [searchQuery, setSearchQuery] = useState("");
  const [openCategory, setOpenCategory] = useState<string | null>("Navbars");

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
    authClient.getSession().then(({ data }) => {
      if (!data) {
        router.push("/auth/login");
        return;
      }
      setUserData(data.user);
      fetch("/api/projects")
        .then((res) => res.json())
        .then((projects) => {
          setProject(
            projects.find((p: any) => p.id === id) || {
              name: "Untitled Project",
            }
          );
          setLoading(false);
        })
        .catch(() => setLoading(false));
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
              ? { ...block, x: Math.max(0, newX), y: Math.max(0, newY) }
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

  const addBlockToCanvas = (rawBlock: any) => {
    const newBlock: UIBlockInstance = {
      instanceId: Date.now().toString(),
      name: rawBlock.name,
      category: rawBlock.category,
      x: 40 + canvasBlocks.length * 20,
      y: 40 + canvasBlocks.length * 40,
      width: DEFAULT_WIDTH,
      height: undefined,
      autoHeight: true,
      root: generateUniqueIds(rawBlock.root),
    };

    setCanvasBlocks([...canvasBlocks, newBlock]);
    setSelectedBlockInstanceId(newBlock.instanceId);
    setSelectedElementId(newBlock.root.id);
  };

  const handleDragStartSidebar = (e: React.DragEvent, block: any) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(block));
  };

  const handleDropOnCanvas = (e: React.DragEvent) => {
    e.preventDefault();
    const rawData = e.dataTransfer.getData("text/plain");
    if (!rawData) return;
    try {
      addBlockToCanvas(JSON.parse(rawData));
    } catch (err) {
      console.error("Erreur de drop", err);
    }
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
        onPublish={() => alert("Publication activée !")}
        onBack={() => router.push("/dashboard")}
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
            panPosition={panPosition}
            activePage={activePage}
            canvasBlocks={canvasBlocks}
            selectedElementId={selectedElementId}
            selectedBlockInstanceId={selectedBlockInstanceId}
            isPanning={isPanning}
            onCanvasMouseDown={handleMouseDownCanvasBg}
            onCanvasDrop={handleDropOnCanvas}
            onBlockMouseDown={handleBlockMouseDown}
            onResizeMouseDown={handleResizeMouseDown}
            onRemoveBlock={removeBlock}
            onSelectElement={setSelectedElementId}
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