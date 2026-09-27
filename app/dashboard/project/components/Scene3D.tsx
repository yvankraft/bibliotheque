"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  OrbitControls,
} from "@react-three/drei";
import type { Mesh } from "three";

interface Scene3DProps {
  shape?: string;
  color?: string;
  speed?: number;
  wireframe?: boolean;
  distort?: number;
  metalness?: number;
  roughness?: number;
  /** OrbitControls activés seulement quand l'élément est sélectionné */
  interactive?: boolean;
}

function Geometry({ shape }: { shape: string }) {
  switch (shape) {
    case "torus":
      return <torusGeometry args={[1, 0.42, 32, 96]} />;
    case "icosahedron":
      return <icosahedronGeometry args={[1.25, 0]} />;
    case "distortSphere":
      return <sphereGeometry args={[1.15, 64, 64]} />;
    case "torusKnot":
    default:
      return <torusKnotGeometry args={[0.9, 0.32, 160, 24]} />;
  }
}

function Shape({
  shape = "torusKnot",
  color = "#f59e0b",
  speed = 1,
  wireframe = false,
  distort = 0.4,
  metalness = 0.35,
  roughness = 0.25,
}: Scene3DProps) {
  const ref = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.35 * speed;
    ref.current.rotation.y += delta * 0.55 * speed;
  });

  return (
    <Float speed={2.5 * speed} rotationIntensity={0.6} floatIntensity={1.1}>
      <mesh ref={ref} castShadow>
        <Geometry shape={shape} />
        {shape === "distortSphere" ? (
          <MeshDistortMaterial
            color={color}
            distort={distort}
            speed={3 * speed}
            metalness={metalness}
            roughness={roughness}
          />
        ) : (
          <meshStandardMaterial
            color={color}
            wireframe={wireframe}
            metalness={metalness}
            roughness={roughness}
          />
        )}
      </mesh>
    </Float>
  );
}

export default function Scene3D(props: Scene3DProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4.2], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: props.interactive ? "auto" : "none" }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 4]} intensity={1.6} />
      <directionalLight position={[-4, -2, -4]} intensity={0.5} color="#93c5fd" />
      <pointLight position={[0, 3, 0]} intensity={0.6} />
      <Suspense fallback={null}>
        <Shape {...props} />
      </Suspense>
      <OrbitControls
        enabled={props.interactive}
        enablePan={false}
        enableZoom={props.interactive}
        makeDefault
      />
    </Canvas>
  );
}
