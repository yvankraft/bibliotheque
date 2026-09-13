import CategoryPage from "../composants/[category]/page";

export const buttons = [
  {
  id: "btn-1",
  type: "button",
  content: "Cliquez",
  category: "Button",
  name: "Solid Black",
  styles: { backgroundColor: "black", color: "white", padding: "12px 24px" }
  },

  { id: "btn-2", name: "Gold Outline", content: "Cliquez",
    category: "Button", styles: { padding: "12px 24px", border: "1px solid #f59e0b", color: "#f59e0b", fontFamily: "sans-serif", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", borderRadius: "0", backgroundColor: "transparent", hover: { backgroundColor: "#f59e0b", color: "black" }, transition: "all 0.3s ease" } },
  { id: "btn-3", name: "Minimal Underline", category: "Button", content: "Cliquez", styles:{ textDecoration: "underline", fontSize: "12px", fontFamily: "sans-serif", fontWeight: "600", color: "#18181b", paddingBottom: "4px", borderBottom: "2px solid #18181b", hover: { color: "#71717a", borderBottomColor: "#71717a" }, transition: "color 0.3s ease, border-bottom-color 0.3s ease" } },
  { id: "btn-4", name: "Glass Glow", category: "Button", content: "Cliquez", styles: { padding: "12px 24px", borderRadius: "9999px", backgroundColor: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(10px)", border: "1px solid rgba(229, 231, 235, 0.5)", color: "#18181b", fontFamily: "sans-serif", fontSize: "12px", boxShadow: "0 0 15px rgba(0,0,0,0.1)", hover: { backgroundColor: "rgba(255, 255, 255, 0.2)" }, transition: "all 0.3s ease" } },
  { id: "btn-5", name: "Icon Pill", category: "Button", content:"Cliquez", styles: { display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "9999px", backgroundColor: "#f3f4f6", border: "1px solid #e5e7eb", color: "#18181b", fontFamily: "sans-serif", fontSize: "12px", hover: { backgroundColor: "#e5e7eb" }, transition: "all 0.3s ease" } }
];