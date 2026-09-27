export interface UIElement {
  id: string;
  type: string;
  props: Record<string, unknown>;
  children?: UIElement[] | string;
}

/** Définition d'un bloc tel que déclaré dans app/UI-Blocks/ */
export interface RawBlockDef {
  id?: string;
  name: string;
  category: string;
  width?: number;
  height?: number;
  root: UIElement;
}

export interface UIBlockInstance {
  instanceId: string;
  name: string;
  category: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  autoHeight?: boolean;
  root: UIElement;
}

export interface PageData {
  id: string;
  name: string;
  blocks: UIBlockInstance[];
}

export type DeviceMode = "desktop" | "tablet" | "mobile";
export type PageTheme = "dark" | "light";
export type ActiveTab = "layers" | "components";

export const MIN_WIDTH = 150;
export const MIN_HEIGHT = 40;
export const DEFAULT_WIDTH = 800;
export const DEFAULT_HEIGHT = 200;