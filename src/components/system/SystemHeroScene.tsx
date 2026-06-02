"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import type { Group } from "three";

type SystemNode = {
  label: string;
  kind: "sphere" | "box" | "torus" | "octa" | "dodeca" | "ico";
  color: string;
  position: [number, number, number];
  scale: number;
  speed: number;
};

const systemNodes: SystemNode[] = [
  {
    label: "AI",
    kind: "ico",
    color: "#00D9FF",
    position: [-2.1, 1.05, 0],
    scale: 0.9,
    speed: 0.36,
  },
  {
    label: "Cybersecurity",
    kind: "octa",
    color: "#FFD400",
    position: [1.65, 1.18, -0.4],
    scale: 0.82,
    speed: 0.3,
  },
  {
    label: "Cloud",
    kind: "sphere",
    color: "#B7F7FF",
    position: [0.05, 0.25, 0.75],
    scale: 0.78,
    speed: 0.22,
  },
  {
    label: "Database",
    kind: "dodeca",
    color: "#E5E7EB",
    position: [-1.35, -1.06, -0.25],
    scale: 0.72,
    speed: 0.28,
  },
  {
    label: "Software",
    kind: "box",
    color: "#FF6B6B",
    position: [1.35, -1, 0.24],
    scale: 0.68,
    speed: 0.32,
  },
  {
    label: "Networking",
    kind: "torus",
    color: "#A78BFA",
    position: [2.45, -0.08, -0.75],
    scale: 0.72,
    speed: 0.26,
  },
];

function NodeGeometry({ kind, mobile }: { kind: SystemNode["kind"]; mobile: boolean }) {
  if (kind === "box") {
    return <boxGeometry args={[0.92, 0.92, 0.92]} />;
  }

  if (kind === "torus") {
    return <torusGeometry args={[0.52, 0.16, mobile ? 12 : 18, mobile ? 32 : 48]} />;
  }

  if (kind === "octa") {
    return <octahedronGeometry args={[0.72, mobile ? 0 : 1]} />;
  }

  if (kind === "dodeca") {
    return <dodecahedronGeometry args={[0.66, 0]} />;
  }

  if (kind === "ico") {
    return <icosahedronGeometry args={[0.72, mobile ? 0 : 1]} />;
  }

  return <sphereGeometry args={[0.68, mobile ? 18 : 28, mobile ? 12 : 20]} />;
}

function FloatingNode({
  node,
  reduceMotion,
  mobile,
}: {
  node: SystemNode;
  reduceMotion: boolean;
  mobile: boolean;
}) {
  const meshRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (reduceMotion || !meshRef.current) {
      return;
    }

    meshRef.current.rotation.x += delta * node.speed;
    meshRef.current.rotation.y += delta * (node.speed + 0.12);
    meshRef.current.position.y =
      node.position[1] + Math.sin(state.clock.elapsedTime * node.speed * 1.6) * 0.08;
  });

  return (
    <Float
      speed={reduceMotion ? 0 : 1.2 + node.speed}
      rotationIntensity={reduceMotion ? 0 : 0.55}
      floatIntensity={reduceMotion ? 0 : mobile ? 0.18 : 0.38}
    >
      <group ref={meshRef} position={node.position} scale={mobile ? node.scale * 0.78 : node.scale}>
        <mesh castShadow receiveShadow>
          <NodeGeometry kind={node.kind} mobile={mobile} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={0.22}
            metalness={0.42}
            roughness={0.28}
          />
        </mesh>
        {!mobile ? (
          <Html center distanceFactor={7} className="pointer-events-none select-none">
            <span className="rounded-full border border-white/15 bg-[#05070B]/78 px-3 py-1 font-code text-[10px] uppercase text-[#F8FAFC] backdrop-blur">
              {node.label}
            </span>
          </Html>
        ) : null}
      </group>
    </Float>
  );
}

function SystemSceneContent({
  reduceMotion,
  mobile,
}: {
  reduceMotion: boolean;
  mobile: boolean;
}) {
  const groupRef = useRef<Group>(null);
  const nodes = useMemo(() => systemNodes, []);

  useFrame((state, delta) => {
    if (reduceMotion || !groupRef.current) {
      return;
    }

    const scrollOffset = typeof window === "undefined" ? 0 : window.scrollY * 0.00035;
    groupRef.current.rotation.y += delta * (mobile ? 0.04 : 0.08);
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.24) * 0.05 + scrollOffset;
  });

  return (
    <>
      <ambientLight intensity={0.92} />
      <directionalLight position={[4, 5, 4]} intensity={1.6} />
      <pointLight position={[-3, -2, 3]} color="#00D9FF" intensity={10} distance={8} />
      <group ref={groupRef}>
        <mesh scale={mobile ? 1.05 : 1.35}>
          <torusKnotGeometry args={[0.52, 0.1, mobile ? 72 : 112, mobile ? 8 : 12]} />
          <meshStandardMaterial
            color="#05070B"
            emissive="#00D9FF"
            emissiveIntensity={0.18}
            metalness={0.75}
            roughness={0.18}
          />
        </mesh>
        {nodes.map((node) => (
          <FloatingNode
            key={node.label}
            node={node}
            reduceMotion={reduceMotion}
            mobile={mobile}
          />
        ))}
      </group>
    </>
  );
}

export function SystemHeroScene() {
  const reduceMotion = Boolean(useReducedMotion());
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <div className="system-scene relative h-[360px] overflow-hidden rounded-[2rem] md:h-[520px]">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,217,255,0.16),transparent_38%),linear-gradient(225deg,rgba(255,212,0,0.12),transparent_42%)]" />
      <Canvas
        aria-label="Activated ChiaOS abstract 3D system core"
        className="absolute inset-0"
        camera={{ position: [0, 0, mobile ? 7.4 : 6.2], fov: mobile ? 48 : 44 }}
        dpr={mobile ? [1, 1.25] : [1, 1.6]}
        frameloop={reduceMotion ? "demand" : "always"}
        gl={{ antialias: !mobile, powerPreference: "high-performance" }}
        shadows={!mobile}
      >
        <SystemSceneContent reduceMotion={reduceMotion} mobile={mobile} />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-4 bottom-4 rounded-2xl border border-white/12 bg-[#05070B]/70 p-4 backdrop-blur">
        <p className="font-code text-xs uppercase text-[#00D9FF]">System Core</p>
        <p className="mt-1 text-sm text-[#D1D5DB]">
          Six original geometry nodes: AI, cyber, cloud, database, software, and networking.
        </p>
      </div>
    </div>
  );
}
