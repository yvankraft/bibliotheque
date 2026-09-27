// app/project/[id]/components/ElementRenderer.tsx

"use client";

import dynamic from "next/dynamic";
import type { UIElement } from "./types";

// WebGL : jamais rendu côté serveur
const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[200px] flex items-center justify-center font-mono text-[10px] text-zinc-400">
      Loading 3D…
    </div>
  ),
});

interface ElementRendererProps {
  element: UIElement;
  selectedId: string | null;
  onSelect: (id: string, e: React.MouseEvent) => void;
}

export default function ElementRenderer({
  element,
  selectedId,
  onSelect,
}: ElementRendererProps) {
  const isSelected = element.id === selectedId;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(element.id, e);
  };

  const interactiveClassName = `${String(element.props.className ?? "")
    } transition-all duration-150 ${isSelected
      ? "ring-2 ring-amber-500 ring-inset outline-none"
      : "hover:ring-1 hover:ring-amber-500/40"
    }`;

  // Scène 3D — les props custom ne vont pas sur le div DOM
  if (element.type === "scene3d") {
    const {
      shape,
      color,
      speed,
      wireframe,
      distort,
      metalness,
      roughness,
      ...domProps
    } = element.props;
    return (
      <div
        {...domProps}
        className={interactiveClassName}
        onClick={handleClick}
      >
        <Scene3D
          shape={shape as string | undefined}
          color={color as string | undefined}
          speed={speed as number | undefined}
          wireframe={wireframe as boolean | undefined}
          distort={distort as number | undefined}
          metalness={metalness as number | undefined}
          roughness={roughness as number | undefined}
          interactive={isSelected}
        />
      </div>
    );
  }

  const Tag = element.type as unknown as React.ComponentType<{
    children?: React.ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent) => void;
  }>;

  if (typeof element.children === "string") {
    return (
      <Tag
        {...element.props}
        className={interactiveClassName}
        onClick={handleClick}
      >
        {element.children}
      </Tag>
    );
  }

  return (
    <Tag
      {...element.props}
      className={interactiveClassName}
      onClick={handleClick}
    >
      {Array.isArray(element.children) &&
        element.children.map((child) => (
          <ElementRenderer
            key={child.id}
            element={child}
            selectedId={selectedId}
            onSelect={onSelect}
          />
        ))}
    </Tag>
  );
}
