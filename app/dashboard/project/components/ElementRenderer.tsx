// app/project/[id]/components/ElementRenderer.tsx

"use client";

import type { UIElement } from "./types";

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
  const Tag = element.type as keyof React.JSX.IntrinsicElements;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(element.id, e);
  };

  const interactiveClassName = `${
    element.props.className || ""
  } transition-all duration-150 ${
    isSelected
      ? "ring-2 ring-amber-500 ring-inset outline-none"
      : "hover:ring-1 hover:ring-amber-500/40"
  }`;

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