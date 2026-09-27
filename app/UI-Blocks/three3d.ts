// =========================================================
// BLOCS 3D — scènes WebGL interactives (type Spline)
// Rendus par <Scene3D /> dans ElementRenderer via react-three-fiber.
// `height` force une hauteur fixe (une scène 3D ne peut pas être auto-height).
// =========================================================

export const threeDElements = [
  {
    id: "3d-torus-knot",
    name: "Torus Knot",
    category: "3D",
    height: 380,
    root: {
      id: "3d-torus-root",
      type: "scene3d",
      props: {
        shape: "torusKnot",
        color: "#f59e0b",
        speed: 1,
        metalness: 0.4,
        roughness: 0.25,
        className: "w-full h-full",
      },
    },
  },
  {
    id: "3d-goo-sphere",
    name: "Liquid Sphere",
    category: "3D",
    height: 380,
    root: {
      id: "3d-sphere-root",
      type: "scene3d",
      props: {
        shape: "distortSphere",
        color: "#8b5cf6",
        speed: 1.4,
        distort: 0.45,
        className: "w-full h-full",
      },
    },
  },
  {
    id: "3d-gem",
    name: "Wireframe Gem",
    category: "3D",
    height: 380,
    root: {
      id: "3d-gem-root",
      type: "scene3d",
      props: {
        shape: "icosahedron",
        color: "#22d3ee",
        speed: 0.8,
        wireframe: true,
        className: "w-full h-full",
      },
    },
  },
  {
    id: "3d-torus-float",
    name: "Floating Ring",
    category: "3D",
    height: 380,
    root: {
      id: "3d-ring-root",
      type: "scene3d",
      props: {
        shape: "torus",
        color: "#34d399",
        speed: 1,
        className: "w-full h-full",
      },
    },
  },
];
