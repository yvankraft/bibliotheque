import React from "react"; // Obligatoire pour utiliser React.ReactNode
import SeeMoreButton from "@/app/components/SeeMoreButton";

export interface ComponentItem {
  id: string;
  slug: string;
  title: string;
  category: "frontend" | "backend" | "fullstack";
  description: string;
  // MODIFICATION ICI : On utilise React.ReactNode, pas le nom du composant
  preview: React.ReactNode;
  installCommand: string;
  codeTSX: string;
  props: { name: string; type: string; default: string }[];
}

export const componentsListData: ComponentItem[] = [
  {
    id: "1",
    slug: "modern-button",
    title: "Modern Bounce Button",
    category: "frontend",
    description:
      "Here we will create a 100% customizable button. The button can be borderless and do as the basic ones thus taken",
    preview: <SeeMoreButton href="#" text="Preview" />,
    installCommand: "npm install framer-motion lucide-react",
    codeTSX: `export default function...`,
    props: [{ name: "variant", type: "string", default: "primary" }],
  },
];
