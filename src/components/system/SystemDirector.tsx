"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import type { Group, Material } from "three";
import { Vector3 } from "three";
import type { SystemSectionKey } from "@/types/portfolio";
import { cn } from "@/lib/utils";

type DirectorNodeKey = "ai" | "cyber" | "cloud" | "database" | "software" | "networking";

type DirectorNode = {
  key: DirectorNodeKey;
  label: string;
  kind: "sphere" | "box" | "torus" | "octa" | "dodeca" | "ico";
  color: string;
};

type Formation = {
  label: string;
  status: string;
  core: [number, number, number];
  coreScale: number;
  accent: string;
  nodes: Record<DirectorNodeKey, [number, number, number]>;
  beam: [number, number, number][];
  path: [number, number, number][];
  connect: boolean;
};

type SystemDirectorProps = {
  activeSection: SystemSectionKey;
  highlightedMissionId?: string | null;
  highlightedSkill?: string | null;
};

const nodes: DirectorNode[] = [
  { key: "ai", label: "AI", kind: "ico", color: "#00D9FF" },
  { key: "cyber", label: "Cybersecurity", kind: "octa", color: "#FFD400" },
  { key: "cloud", label: "Cloud", kind: "sphere", color: "#B7F7FF" },
  { key: "database", label: "Database", kind: "dodeca", color: "#E5E7EB" },
  { key: "software", label: "Software", kind: "box", color: "#FF6B6B" },
  { key: "networking", label: "Networking", kind: "torus", color: "#A78BFA" },
];

const compactOrbit: Record<DirectorNodeKey, [number, number, number]> = {
  ai: [1.3, 0.85, 0],
  cyber: [2.15, 0.12, -0.18],
  cloud: [1.62, -0.82, 0.12],
  database: [0.52, -0.8, -0.24],
  software: [0.08, 0.12, 0.24],
  networking: [0.58, 0.86, -0.18],
};

const formations: Record<SystemSectionKey, Formation> = {
  hero: {
    label: "Activation Core",
    status: "Powering modules around the ChiaOS core.",
    core: [1.12, 0.08, 0],
    coreScale: 1.05,
    accent: "#FFD400",
    nodes: compactOrbit,
    beam: [[1.1, 0.08, 0], [-2.4, 0.48, 0]],
    path: [[0, 0, 0], [0.7, 0.45, 0], [1.5, 0, 0], [0.7, -0.45, 0], [0, 0, 0]],
    connect: false,
  },
  identity: {
    label: "Identity Scan",
    status: "Core stabilizes and sweeps toward Chia's identity.",
    core: [1.55, 0.12, 0],
    coreScale: 0.98,
    accent: "#00D9FF",
    nodes: {
      ai: [0.68, 1.02, 0.06],
      cyber: [2.38, 0.86, -0.2],
      cloud: [2.38, -0.78, 0.1],
      database: [0.68, -1, -0.22],
      software: [1.52, 0.46, 0.28],
      networking: [1.52, -0.48, -0.28],
    },
    beam: [[1.55, 0.12, 0], [-2.7, 0.18, 0]],
    path: [[-2.55, 0.18, 0], [-0.7, 0.34, 0], [1.55, 0.12, 0]],
    connect: false,
  },
  education: {
    label: "Education Module",
    status: "Academic nodes align into a calm structure.",
    core: [1.7, 0, 0],
    coreScale: 0.92,
    accent: "#B7F7FF",
    nodes: {
      ai: [0.55, 0.8, 0],
      cyber: [1.45, 0.8, 0],
      cloud: [2.35, 0.8, 0],
      database: [0.55, -0.78, 0],
      software: [1.45, -0.78, 0],
      networking: [2.35, -0.78, 0],
    },
    beam: [[1.7, 0, 0], [-2.35, -0.12, 0]],
    path: [[0.42, 0.8, 0], [2.48, 0.8, 0], [2.48, -0.78, 0], [0.42, -0.78, 0]],
    connect: false,
  },
  operations: {
    label: "Operations Network",
    status: "Realfun coordination energy becomes connected signal nodes.",
    core: [1.35, -0.06, 0],
    coreScale: 0.9,
    accent: "#FFD400",
    nodes: {
      ai: [0.1, 0.85, 0],
      cyber: [1.18, 1.1, -0.1],
      cloud: [2.38, 0.62, 0.08],
      database: [0.22, -0.86, -0.12],
      software: [1.45, -1.12, 0.12],
      networking: [2.55, -0.24, 0],
    },
    beam: [[1.35, -0.06, 0], [-2.45, 0.28, 0]],
    path: [[0.1, 0.85, 0], [1.18, 1.1, 0], [2.38, 0.62, 0], [2.55, -0.24, 0], [1.45, -1.12, 0], [0.22, -0.86, 0], [0.1, 0.85, 0]],
    connect: true,
  },
  missions: {
    label: "Mission Deployment",
    status: "Project objects deploy toward the mission files.",
    core: [2.15, 0.05, 0],
    coreScale: 0.95,
    accent: "#00D9FF",
    nodes: {
      ai: [-0.55, 1.08, 0.16],
      cyber: [0.72, 0.78, -0.16],
      cloud: [1.88, 0.62, 0.08],
      database: [-0.42, -0.72, -0.12],
      software: [0.88, -0.98, 0.2],
      networking: [2.1, -0.72, -0.12],
    },
    beam: [[2.15, 0.05, 0], [-2.55, 0.4, 0]],
    path: [[-0.62, 1.08, 0], [0.72, 0.78, 0], [1.88, 0.62, 0], [2.1, -0.72, 0], [0.88, -0.98, 0], [-0.42, -0.72, 0]],
    connect: false,
  },
  skills: {
    label: "Skill Constellation",
    status: "Modules orbit into evidence-based skill clusters.",
    core: [1.55, 0, 0],
    coreScale: 1,
    accent: "#00D9FF",
    nodes: {
      ai: [1.55, 1.42, 0],
      cyber: [2.82, 0.72, -0.12],
      cloud: [2.8, -0.72, 0.12],
      database: [1.55, -1.42, 0],
      software: [0.24, -0.72, 0.12],
      networking: [0.24, 0.72, -0.12],
    },
    beam: [[1.55, 0, 0], [-2.35, -0.18, 0]],
    path: [[1.55, 1.42, 0], [2.82, 0.72, 0], [2.8, -0.72, 0], [1.55, -1.42, 0], [0.24, -0.72, 0], [0.24, 0.72, 0], [1.55, 1.42, 0]],
    connect: true,
  },
  "life-os": {
    label: "Life OS",
    status: "Personal energy capsules loosen the system without losing polish.",
    core: [1.36, 0.02, 0],
    coreScale: 0.96,
    accent: "#FFD400",
    nodes: {
      ai: [0.25, 1.18, 0.12],
      cyber: [2.18, 1.04, -0.12],
      cloud: [2.72, -0.02, 0.16],
      database: [2.03, -1.12, -0.12],
      software: [0.88, -1.04, 0.22],
      networking: [0.18, -0.02, -0.18],
    },
    beam: [[1.36, 0.02, 0], [-2.2, 0.1, 0]],
    path: [[0.18, -0.02, 0], [0.25, 1.18, 0], [2.18, 1.04, 0], [2.72, -0.02, 0], [2.03, -1.12, 0], [0.88, -1.04, 0], [0.18, -0.02, 0]],
    connect: false,
  },
  timeline: {
    label: "Timeline Track",
    status: "Objects align into a forward racing path.",
    core: [2.28, -0.16, 0],
    coreScale: 0.88,
    accent: "#FFD400",
    nodes: {
      ai: [-0.78, 0.9, 0],
      cyber: [-0.08, 0.46, 0],
      cloud: [0.62, 0.12, 0],
      database: [1.34, -0.18, 0],
      software: [2.08, -0.42, 0],
      networking: [2.8, -0.62, 0],
    },
    beam: [[2.28, -0.16, 0], [-2.5, 0.52, 0]],
    path: [[-0.78, 0.9, 0], [-0.08, 0.46, 0], [0.62, 0.12, 0], [1.34, -0.18, 0], [2.08, -0.42, 0], [2.8, -0.62, 0]],
    connect: true,
  },
  "build-logs": {
    label: "Archive Blocks",
    status: "Build history compresses into data blocks.",
    core: [1.78, 0.02, 0],
    coreScale: 0.86,
    accent: "#00D9FF",
    nodes: {
      ai: [0.62, 0.72, 0],
      cyber: [1.18, 0.72, 0],
      cloud: [1.74, 0.72, 0],
      database: [0.62, -0.14, 0],
      software: [1.18, -0.14, 0],
      networking: [1.74, -0.14, 0],
    },
    beam: [[1.78, 0.02, 0], [-2.45, 0.14, 0]],
    path: [[0.48, 0.92, 0], [1.92, 0.92, 0], [1.92, -0.34, 0], [0.48, -0.34, 0], [0.48, 0.92, 0]],
    connect: false,
  },
  roadmap: {
    label: "Forward Route",
    status: "Yellow route energy points toward the next checkpoint.",
    core: [2.22, 0.08, 0],
    coreScale: 0.9,
    accent: "#FFD400",
    nodes: {
      ai: [-0.58, -0.48, 0],
      cyber: [0.12, -0.18, 0],
      cloud: [0.82, 0.08, 0],
      database: [1.52, 0.28, 0],
      software: [2.22, 0.38, 0],
      networking: [2.88, 0.5, 0],
    },
    beam: [[2.22, 0.08, 0], [-2.35, -0.1, 0]],
    path: [[-0.58, -0.48, 0], [0.12, -0.18, 0], [0.82, 0.08, 0], [1.52, 0.28, 0], [2.22, 0.38, 0], [2.88, 0.5, 0], [2.58, 0.72, 0]],
    connect: true,
  },
  ask: {
    label: "Assistant Core",
    status: "Core pulses near the Ask ChiaOS panel.",
    core: [2.05, -0.12, 0],
    coreScale: 1.08,
    accent: "#00D9FF",
    nodes: {
      ai: [1.2, 0.96, 0.16],
      cyber: [2.64, 0.72, -0.12],
      cloud: [2.9, -0.36, 0.1],
      database: [2, -1.12, -0.16],
      software: [0.98, -0.48, 0.2],
      networking: [0.86, 0.42, -0.1],
    },
    beam: [[2.05, -0.12, 0], [-2.2, 0, 0]],
    path: [[0.86, 0.42, 0], [1.2, 0.96, 0], [2.64, 0.72, 0], [2.9, -0.36, 0], [2, -1.12, 0], [0.98, -0.48, 0], [0.86, 0.42, 0]],
    connect: false,
  },
  contact: {
    label: "Signal Beacon",
    status: "Motion settles into a calm contact signal.",
    core: [1.7, 0, 0],
    coreScale: 0.92,
    accent: "#B7F7FF",
    nodes: {
      ai: [1.7, 1.12, 0],
      cyber: [2.48, 0.56, 0],
      cloud: [2.48, -0.56, 0],
      database: [1.7, -1.12, 0],
      software: [0.92, -0.56, 0],
      networking: [0.92, 0.56, 0],
    },
    beam: [[1.7, 0, 0], [-2.25, 0, 0]],
    path: [[1.7, 1.12, 0], [2.48, 0.56, 0], [2.48, -0.56, 0], [1.7, -1.12, 0], [0.92, -0.56, 0], [0.92, 0.56, 0], [1.7, 1.12, 0]],
    connect: false,
  },
};

const sectionNodeFocus: Record<SystemSectionKey, DirectorNodeKey> = {
  hero: "software",
  identity: "ai",
  education: "ai",
  operations: "networking",
  missions: "software",
  skills: "ai",
  "life-os": "software",
  timeline: "cloud",
  "build-logs": "database",
  roadmap: "cloud",
  ask: "ai",
  contact: "networking",
};

const missionNodeMap: Record<string, DirectorNodeKey> = {
  "cos30049-computing-technology-innovation-project": "ai",
  "aws-cloud-architecture": "cloud",
  "automated-negotiation-system": "software",
  "database-design-project": "database",
  "networking-switching-portfolio": "networking",
};

function nodeForSkill(skillName: string | null | undefined): DirectorNodeKey | null {
  const normalized = skillName?.toLowerCase() ?? "";

  if (!normalized) {
    return null;
  }

  if (normalized.includes("python") || normalized.includes("machine") || normalized.includes("vision")) {
    return "ai";
  }

  if (normalized.includes("vlan") || normalized.includes("stp") || normalized.includes("secure")) {
    return "cyber";
  }

  if (normalized.includes("aws") || normalized.includes("cloud")) {
    return "cloud";
  }

  if (normalized.includes("database") || normalized.includes("sql")) {
    return "database";
  }

  if (normalized.includes("operational")) {
    return "networking";
  }

  return "software";
}

const missionModules: Array<{
  id: string;
  key: DirectorNodeKey;
  position: [number, number, number];
}> = [
  {
    id: "cos30049-computing-technology-innovation-project",
    key: "ai",
    position: [-1.25, 0.76, 0.2],
  },
  { id: "aws-cloud-architecture", key: "cloud", position: [0.2, 1.02, -0.08] },
  {
    id: "automated-negotiation-system",
    key: "software",
    position: [1.52, 0.56, 0.14],
  },
  { id: "database-design-project", key: "database", position: [-0.5, -0.72, 0.08] },
  {
    id: "networking-switching-portfolio",
    key: "networking",
    position: [1.12, -0.88, -0.06],
  },
];

function applyGroupOpacity(group: Group, opacity: number) {
  group.traverse((object) => {
    const material = (object as { material?: Material | Material[] }).material;

    if (!material) {
      return;
    }

    const materials = Array.isArray(material) ? material : [material];
    materials.forEach((item) => {
      if (typeof item.userData.baseOpacity !== "number") {
        item.userData.baseOpacity = typeof item.opacity === "number" ? item.opacity : 1;
      }

      item.transparent = true;
      item.opacity = item.userData.baseOpacity * opacity;
      item.needsUpdate = true;
    });
  });
}

function useSemanticRig({
  active,
  reduceMotion,
  mobile,
  position = [0, 0, 0],
  activeScale = 1,
  idleScale = 0.78,
  rotationSpeed = 0.05,
}: {
  active: boolean;
  reduceMotion: boolean;
  mobile: boolean;
  position?: [number, number, number];
  activeScale?: number;
  idleScale?: number;
  rotationSpeed?: number;
}) {
  const groupRef = useRef<Group>(null);
  const opacityRef = useRef(active ? 1 : 0);
  const targetPosition = useRef(new Vector3(...position));
  const targetScale = useRef(new Vector3(1, 1, 1));

  useFrame((_state, delta) => {
    if (!groupRef.current) {
      return;
    }

    const speed = reduceMotion ? 1 : Math.min(1, delta * 4.5);
    opacityRef.current += ((active ? 1 : 0) - opacityRef.current) * speed;
    groupRef.current.visible = opacityRef.current > 0.025;
    applyGroupOpacity(groupRef.current, opacityRef.current);

    targetPosition.current.set(...position);
    groupRef.current.position.lerp(targetPosition.current, reduceMotion ? 0.35 : 0.08);

    const scale = (mobile ? 0.82 : 1) * (active ? activeScale : idleScale);
    targetScale.current.set(scale, scale, scale);
    groupRef.current.scale.lerp(targetScale.current, reduceMotion ? 0.35 : 0.08);

    if (!reduceMotion && active) {
      groupRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return groupRef;
}

function GlassPanel({
  width,
  height,
  depth = 0.04,
  color = "#B7F7FF",
  accent = "#00D9FF",
}: {
  width: number;
  height: number;
  depth?: number;
  color?: string;
  accent?: string;
}) {
  return (
    <mesh>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial
        color={color}
        emissive={accent}
        emissiveIntensity={0.36}
        metalness={0.72}
        roughness={0.16}
        transparent
        opacity={0.38}
      />
    </mesh>
  );
}

function ChipSymbol({ color, accent }: { color: string; accent: string }) {
  const traceRows = [-0.24, 0, 0.24];

  return (
    <group>
      <mesh>
        <boxGeometry args={[0.74, 0.54, 0.12]} />
        <meshStandardMaterial
          color="#07111F"
          emissive={color}
          emissiveIntensity={0.62}
          metalness={0.82}
          roughness={0.14}
          transparent
          opacity={0.92}
        />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.26, 0.018, 8, 42]} />
        <meshBasicMaterial color={accent} transparent opacity={0.78} />
      </mesh>
      {traceRows.map((row) => (
        <mesh key={row} position={[0, row, 0.08]}>
          <boxGeometry args={[0.9, 0.018, 0.018]} />
          <meshBasicMaterial color={row === 0 ? accent : color} transparent opacity={0.7} />
        </mesh>
      ))}
      {[-0.48, 0.48].map((x) =>
        traceRows.map((row) => (
          <mesh key={`${x}-${row}`} position={[x, row, 0.09]}>
            <sphereGeometry args={[0.045, 10, 8]} />
            <meshBasicMaterial color={accent} transparent opacity={0.9} />
          </mesh>
        ))
      )}
    </group>
  );
}

function ShieldSymbol({ color, accent }: { color: string; accent: string }) {
  return (
    <group>
      <mesh scale={[0.72, 0.92, 0.16]} rotation={[0, 0, Math.PI / 4]}>
        <octahedronGeometry args={[0.56, 0]} />
        <meshStandardMaterial
          color="#121827"
          emissive={accent}
          emissiveIntensity={0.75}
          metalness={0.78}
          roughness={0.16}
          transparent
          opacity={0.86}
        />
      </mesh>
      <mesh position={[0, 0.05, 0.1]} scale={[0.42, 0.6, 0.06]} rotation={[0, 0, Math.PI / 4]}>
        <octahedronGeometry args={[0.48, 0]} />
        <meshBasicMaterial color={color} transparent opacity={0.42} wireframe />
      </mesh>
      <mesh position={[0, -0.08, 0.15]}>
        <boxGeometry args={[0.12, 0.58, 0.03]} />
        <meshBasicMaterial color={accent} transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

function CloudBlocksSymbol({ color, accent }: { color: string; accent: string }) {
  const blocks: Array<[number, number, number, number, number, number]> = [
    [-0.32, -0.08, 0, 0.34, 0.26, 0.22],
    [0, 0.12, 0.04, 0.42, 0.34, 0.24],
    [0.34, -0.04, 0, 0.38, 0.28, 0.22],
    [0.02, -0.3, -0.02, 0.92, 0.18, 0.18],
  ];

  return (
    <group>
      {blocks.map(([x, y, z, width, height, depth], index) => (
        <mesh key={`${x}-${y}`} position={[x, y, z]}>
          <boxGeometry args={[width, height, depth]} />
          <meshStandardMaterial
            color={index === 1 ? color : "#122032"}
            emissive={index === 1 ? color : accent}
            emissiveIntensity={index === 1 ? 0.8 : 0.36}
            metalness={0.62}
            roughness={0.2}
            transparent
            opacity={0.82}
          />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.56, 0.012, 8, 48]} />
        <meshBasicMaterial color={accent} transparent opacity={0.42} />
      </mesh>
    </group>
  );
}

function DatabaseStackSymbol({ color, accent }: { color: string; accent: string }) {
  return (
    <group>
      {[-0.26, 0, 0.26].map((y, index) => (
        <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 0.13, 36]} />
          <meshStandardMaterial
            color={index === 1 ? color : "#111827"}
            emissive={accent}
            emissiveIntensity={0.55 + index * 0.18}
            metalness={0.74}
            roughness={0.16}
            transparent
            opacity={0.86}
          />
        </mesh>
      ))}
      <Line
        points={[
          [-0.52, -0.42, 0.03],
          [0.52, -0.42, 0.03],
          [0.52, 0.42, 0.03],
          [-0.52, 0.42, 0.03],
          [-0.52, -0.42, 0.03],
        ]}
        color={accent}
        lineWidth={1.8}
        transparent
        opacity={0.55}
      />
    </group>
  );
}

function TerminalPlateSymbol({ color, accent }: { color: string; accent: string }) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.9, 0.58, 0.08]} />
        <meshStandardMaterial
          color="#0A1020"
          emissive={color}
          emissiveIntensity={0.52}
          metalness={0.74}
          roughness={0.18}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh position={[-0.29, 0.12, 0.08]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.24, 0.035, 0.022]} />
        <meshBasicMaterial color={accent} transparent opacity={0.9} />
      </mesh>
      <mesh position={[-0.29, -0.04, 0.08]} rotation={[0, 0, 0.5]}>
        <boxGeometry args={[0.24, 0.035, 0.022]} />
        <meshBasicMaterial color={accent} transparent opacity={0.9} />
      </mesh>
      {[0.04, 0.2, 0.36].map((x, index) => (
        <mesh key={x} position={[x, 0.02 - index * 0.15, 0.08]}>
          <boxGeometry args={[0.34 - index * 0.06, 0.028, 0.022]} />
          <meshBasicMaterial color={index === 1 ? color : accent} transparent opacity={0.72} />
        </mesh>
      ))}
    </group>
  );
}

function NetworkGraphSymbol({ color, accent }: { color: string; accent: string }) {
  const points: Array<[number, number, number]> = [
    [-0.42, 0.28, 0],
    [0.1, 0.42, 0.02],
    [0.45, 0.04, 0],
    [0.06, -0.38, 0.02],
    [-0.44, -0.18, 0],
  ];

  return (
    <group>
      <Line
        points={[points[0], points[1], points[2], points[3], points[4], points[0], points[2]]}
        color={accent}
        lineWidth={2}
        transparent
        opacity={0.62}
      />
      {points.map((point, index) => (
        <mesh key={`${point[0]}-${point[1]}`} position={point}>
          <sphereGeometry args={[index === 2 ? 0.12 : 0.09, 16, 10]} />
          <meshStandardMaterial
            color={index === 2 ? color : "#121827"}
            emissive={index === 2 ? color : accent}
            emissiveIntensity={index === 2 ? 1 : 0.6}
            metalness={0.7}
            roughness={0.16}
            transparent
            opacity={0.92}
          />
        </mesh>
      ))}
    </group>
  );
}

function SemanticCategorySymbol({
  node,
  active,
  highlighted,
  mobile,
}: {
  node: DirectorNode;
  active: boolean;
  highlighted: boolean;
  mobile: boolean;
}) {
  const color = highlighted ? "#FFD400" : node.color;
  const accent = highlighted || active ? "#FFD400" : "#00D9FF";
  const symbolScale = mobile ? 0.92 : 1;

  return (
    <group scale={symbolScale}>
      {node.key === "ai" ? <ChipSymbol color={color} accent={accent} /> : null}
      {node.key === "cyber" ? <ShieldSymbol color={color} accent={accent} /> : null}
      {node.key === "cloud" ? <CloudBlocksSymbol color={color} accent={accent} /> : null}
      {node.key === "database" ? <DatabaseStackSymbol color={color} accent={accent} /> : null}
      {node.key === "software" ? <TerminalPlateSymbol color={color} accent={accent} /> : null}
      {node.key === "networking" ? <NetworkGraphSymbol color={color} accent={accent} /> : null}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.68, 0.01, 8, 52]} />
        <meshBasicMaterial
          color={accent}
          transparent
          opacity={highlighted ? 0.62 : active ? 0.42 : 0.22}
        />
      </mesh>
    </group>
  );
}

function DirectorModule({
  node,
  target,
  active,
  highlighted,
  reduceMotion,
  mobile,
  quiet,
}: {
  node: DirectorNode;
  target: [number, number, number];
  active: boolean;
  highlighted: boolean;
  reduceMotion: boolean;
  mobile: boolean;
  quiet: boolean;
}) {
  const groupRef = useRef<Group>(null);
  const targetVector = useRef(new Vector3(...target));
  const scaleVector = useRef(new Vector3(1, 1, 1));

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    targetVector.current.set(target[0], target[1], target[2] + (highlighted ? 0.56 : active ? 0.22 : 0));
    groupRef.current.position.lerp(targetVector.current, reduceMotion ? 0.35 : 0.075);

    const pulse = reduceMotion ? 0 : Math.sin(state.clock.elapsedTime * 2.8) * (highlighted ? 0.06 : 0.03);
    const baseScale = quiet ? (mobile ? 0.58 : 0.74) : (mobile ? 0.76 : 0.98);
    const stateScale = highlighted ? (quiet ? 1.24 : 1.5) : active ? (quiet ? 1.08 : 1.28) : quiet ? 0.72 : 0.95;
    const targetScale = baseScale * stateScale + pulse;
    scaleVector.current.set(targetScale, targetScale, targetScale);
    groupRef.current.scale.lerp(scaleVector.current, reduceMotion ? 0.35 : 0.08);

    if (!reduceMotion) {
      groupRef.current.rotation.x += delta * (active ? 0.38 : 0.18);
      groupRef.current.rotation.y += delta * (highlighted ? 0.58 : 0.24);
    }
  });

  return (
    <group ref={groupRef} position={target}>
      <SemanticCategorySymbol
        node={node}
        active={active}
        highlighted={highlighted}
        mobile={mobile}
      />
    </group>
  );
}

function DirectorCore({
  formation,
  reduceMotion,
  mobile,
  pulse,
}: {
  formation: Formation;
  reduceMotion: boolean;
  mobile: boolean;
  pulse: boolean;
}) {
  const groupRef = useRef<Group>(null);
  const targetVector = useRef(new Vector3(...formation.core));
  const scaleVector = useRef(new Vector3(1, 1, 1));

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    targetVector.current.set(...formation.core);
    groupRef.current.position.lerp(targetVector.current, reduceMotion ? 0.35 : 0.07);

    const rhythm = reduceMotion ? 0 : Math.sin(state.clock.elapsedTime * (pulse ? 3.8 : 1.8)) * 0.045;
    const targetScale = (mobile ? 0.72 : 0.9) * formation.coreScale + rhythm;
    scaleVector.current.set(targetScale, targetScale, targetScale);
    groupRef.current.scale.lerp(scaleVector.current, reduceMotion ? 0.35 : 0.08);

    if (!reduceMotion) {
      groupRef.current.rotation.z += delta * 0.22;
      groupRef.current.rotation.y += delta * (pulse ? 0.3 : 0.16);
    }
  });

  return (
    <group ref={groupRef} position={formation.core}>
      <mesh>
        <sphereGeometry args={[mobile ? 0.34 : 0.48, mobile ? 20 : 32, mobile ? 12 : 20]} />
        <meshBasicMaterial color={formation.accent} transparent opacity={mobile ? 0.2 : 0.28} />
      </mesh>
      <mesh rotation={[0.08, 0.18, 0.18]}>
        <boxGeometry args={[mobile ? 0.52 : 0.66, mobile ? 0.52 : 0.66, mobile ? 0.09 : 0.12]} />
        <meshStandardMaterial
          color="#07111F"
          emissive={formation.accent}
          emissiveIntensity={pulse ? 1.2 : 0.78}
          metalness={0.86}
          roughness={0.12}
          transparent
          opacity={mobile ? 0.82 : 0.9}
        />
      </mesh>
      {[-0.2, 0, 0.2].map((line) => (
        <mesh key={line} position={[line, 0, mobile ? 0.07 : 0.1]}>
          <boxGeometry args={[0.026, mobile ? 0.58 : 0.72, 0.018]} />
          <meshBasicMaterial color={line === 0 ? "#FFD400" : "#00D9FF"} transparent opacity={0.58} />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[mobile ? 0.62 : 0.82, mobile ? 0.012 : 0.016, 8, mobile ? 56 : 76]} />
        <meshBasicMaterial color={formation.accent} transparent opacity={mobile ? 0.38 : 0.5} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[mobile ? 0.48 : 0.66, mobile ? 0.009 : 0.012, 8, mobile ? 44 : 68]} />
        <meshBasicMaterial color="#00D9FF" transparent opacity={mobile ? 0.2 : 0.3} />
      </mesh>
    </group>
  );
}

function ChiaOSCoreProcessor({
  active,
  reduceMotion,
  mobile,
}: {
  active: boolean;
  reduceMotion: boolean;
  mobile: boolean;
}) {
  const ref = useSemanticRig({
    active,
    reduceMotion,
    mobile,
    position: [1.18, 0.08, 0.28],
    activeScale: 1,
    idleScale: 0.7,
    rotationSpeed: 0.1,
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.42, mobile ? 24 : 40, mobile ? 16 : 24]} />
        <meshStandardMaterial
          color="#C9F8FF"
          emissive="#00D9FF"
          emissiveIntensity={1.1}
          metalness={0.28}
          roughness={0.06}
          transparent
          opacity={0.64}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.7, 0.025, 10, 72]} />
        <meshStandardMaterial color="#D6DEE8" metalness={0.9} roughness={0.12} />
      </mesh>
      <mesh rotation={[0.45, 0, Math.PI / 2]}>
        <torusGeometry args={[0.92, 0.012, 8, 84]} />
        <meshBasicMaterial color="#FFD400" transparent opacity={0.72} />
      </mesh>
      {[-0.72, -0.24, 0.24, 0.72].map((x, index) => (
        <mesh key={x} position={[x, index % 2 === 0 ? 0.72 : -0.72, 0.05]} rotation={[0, 0, index * 0.35]}>
          <boxGeometry args={[0.28, 0.18, 0.045]} />
          <meshStandardMaterial
            color="#101827"
            emissive={index % 2 === 0 ? "#00D9FF" : "#FFD400"}
            emissiveIntensity={0.55}
            metalness={0.72}
            roughness={0.18}
            transparent
            opacity={0.86}
          />
        </mesh>
      ))}
    </group>
  );
}

function EducationArchiveNode({
  active,
  reduceMotion,
  mobile,
}: {
  active: boolean;
  reduceMotion: boolean;
  mobile: boolean;
}) {
  const ref = useSemanticRig({
    active,
    reduceMotion,
    mobile,
    position: [1.45, 0, 0.22],
    activeScale: 1.05,
    idleScale: 0.72,
    rotationSpeed: 0.035,
  });
  const panels: Array<[number, number, number, number]> = [
    [-0.48, 0.18, 0.08, -0.08],
    [0, 0, 0.18, 0.02],
    [0.5, -0.18, 0.04, 0.1],
  ];

  return (
    <group ref={ref}>
      {panels.map(([x, y, z, rotate], index) => (
        <group key={`${x}-${y}`} position={[x, y, z]} rotation={[0.12, rotate, 0.04]}>
          <GlassPanel
            width={0.72}
            height={0.96}
            color={index === 1 ? "#DDFBFF" : "#B7F7FF"}
            accent="#00D9FF"
          />
          {[-0.24, 0, 0.24].map((line) => (
            <mesh key={line} position={[0, line, 0.05]}>
              <boxGeometry args={[0.48, 0.018, 0.012]} />
              <meshBasicMaterial color={index === 1 ? "#FFD400" : "#00D9FF"} transparent opacity={0.66} />
            </mesh>
          ))}
          <mesh position={[-0.22, 0.32, 0.05]}>
            <boxGeometry args={[0.16, 0.16, 0.012]} />
            <meshBasicMaterial color="#FFD400" transparent opacity={0.68} />
          </mesh>
        </group>
      ))}
      <Line
        points={[
          [-0.95, -0.72, -0.05],
          [0.94, -0.72, -0.05],
          [0.94, 0.72, -0.05],
          [-0.95, 0.72, -0.05],
          [-0.95, -0.72, -0.05],
        ]}
        color="#00D9FF"
        lineWidth={1.6}
        transparent
        opacity={0.44}
      />
    </group>
  );
}

function OperationsSignalNetwork({
  active,
  reduceMotion,
  mobile,
}: {
  active: boolean;
  reduceMotion: boolean;
  mobile: boolean;
}) {
  const ref = useSemanticRig({
    active,
    reduceMotion,
    mobile,
    position: [1.35, -0.02, 0.22],
    activeScale: 1.06,
    idleScale: 0.72,
    rotationSpeed: 0.08,
  });
  const pulseRef = useRef<Group>(null);
  const route: Array<[number, number, number]> = [
    [-0.92, 0.55, 0],
    [-0.2, 0.78, 0.08],
    [0.58, 0.38, 0.02],
    [0.82, -0.34, 0.06],
    [0.02, -0.72, 0],
    [-0.82, -0.34, 0.04],
  ];

  useFrame((state) => {
    if (!pulseRef.current || reduceMotion || !active) {
      return;
    }

    const progress = (state.clock.elapsedTime * 0.42) % 1;
    const exactIndex = progress * route.length;
    const index = Math.floor(exactIndex) % route.length;
    const nextIndex = (index + 1) % route.length;
    const localProgress = exactIndex - index;
    const start = route[index];
    const end = route[nextIndex];

    pulseRef.current.position.set(
      start[0] + (end[0] - start[0]) * localProgress,
      start[1] + (end[1] - start[1]) * localProgress,
      start[2] + (end[2] - start[2]) * localProgress + 0.12
    );
  });

  return (
    <group ref={ref}>
      <Line points={[...route, route[0]]} color="#00D9FF" lineWidth={2.4} transparent opacity={0.58} />
      <Line points={[route[0], [0, 0, 0], route[3]]} color="#FFD400" lineWidth={1.6} transparent opacity={0.48} />
      <mesh>
        <sphereGeometry args={[0.23, 22, 14]} />
        <meshStandardMaterial
          color="#121827"
          emissive="#FFD400"
          emissiveIntensity={1.2}
          metalness={0.76}
          roughness={0.14}
        />
      </mesh>
      {route.map((point, index) => (
        <mesh key={`${point[0]}-${point[1]}`} position={point}>
          <sphereGeometry args={[index % 2 === 0 ? 0.13 : 0.1, 18, 12]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? "#00D9FF" : "#B7F7FF"}
            emissive={index % 2 === 0 ? "#00D9FF" : "#FFD400"}
            emissiveIntensity={0.85}
            metalness={0.66}
            roughness={0.16}
            transparent
            opacity={0.92}
          />
        </mesh>
      ))}
      <group ref={pulseRef}>
        <mesh>
          <sphereGeometry args={[0.075, 14, 10]} />
          <meshBasicMaterial color="#FFD400" transparent opacity={0.95} />
        </mesh>
      </group>
    </group>
  );
}

function MissionModuleCluster({
  active,
  reduceMotion,
  mobile,
  highlightedMissionId,
}: {
  active: boolean;
  reduceMotion: boolean;
  mobile: boolean;
  highlightedMissionId: string | null;
}) {
  const ref = useSemanticRig({
    active,
    reduceMotion,
    mobile,
    position: [0.8, 0.02, 0.24],
    activeScale: 1,
    idleScale: 0.72,
    rotationSpeed: 0.055,
  });

  return (
    <group ref={ref}>
      {missionModules.map((module, index) => {
        const node = nodes.find((item) => item.key === module.key) ?? nodes[0];
        const highlighted = highlightedMissionId === module.id;
        const scale = highlighted ? 0.86 : 0.68;

        return (
          <group key={module.id} position={module.position} scale={scale} rotation={[0.08, index * 0.22, 0]}>
            <GlassPanel
              width={1.05}
              height={0.68}
              color={highlighted ? "#FFF4B8" : "#B7F7FF"}
              accent={highlighted ? "#FFD400" : "#00D9FF"}
            />
            <group position={[0, 0, 0.16]} scale={0.74}>
              <SemanticCategorySymbol
                node={node}
                active
                highlighted={highlighted}
                mobile={mobile}
              />
            </group>
            <mesh position={[0, -0.43, 0.08]}>
              <boxGeometry args={[0.76, 0.04, 0.025]} />
              <meshBasicMaterial color={highlighted ? "#FFD400" : "#00D9FF"} transparent opacity={0.76} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function SkillConstellationFrame({
  active,
  reduceMotion,
  mobile,
}: {
  active: boolean;
  reduceMotion: boolean;
  mobile: boolean;
}) {
  const ref = useSemanticRig({
    active,
    reduceMotion,
    mobile,
    position: [1.55, 0, 0.12],
    activeScale: 1.12,
    idleScale: 0.76,
    rotationSpeed: 0.11,
  });

  return (
    <group ref={ref}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.58, 0.01, 8, 108]} />
        <meshBasicMaterial color="#00D9FF" transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0.3, 0.28]}>
        <torusGeometry args={[1.18, 0.012, 8, 88]} />
        <meshBasicMaterial color="#FFD400" transparent opacity={0.36} />
      </mesh>
      <Line
        points={[
          [0, 1.42, 0],
          [1.25, 0.7, 0],
          [1.25, -0.7, 0],
          [0, -1.42, 0],
          [-1.25, -0.7, 0],
          [-1.25, 0.7, 0],
          [0, 1.42, 0],
        ]}
        color="#B7F7FF"
        lineWidth={1.4}
        transparent
        opacity={0.34}
      />
    </group>
  );
}

function CapsuleNode({
  position,
  color,
  accent,
  rotate = 0,
}: {
  position: [number, number, number];
  color: string;
  accent: string;
  rotate?: number;
}) {
  return (
    <group position={position} rotation={[0, 0, rotate]}>
      <mesh>
        <cylinderGeometry args={[0.12, 0.12, 0.46, 18]} />
        <meshStandardMaterial
          color={color}
          emissive={accent}
          emissiveIntensity={0.55}
          metalness={0.72}
          roughness={0.2}
          transparent
          opacity={0.86}
        />
      </mesh>
      <mesh position={[0, 0.23, 0]}>
        <sphereGeometry args={[0.12, 16, 10]} />
        <meshBasicMaterial color={accent} transparent opacity={0.56} />
      </mesh>
      <mesh position={[0, -0.23, 0]}>
        <sphereGeometry args={[0.12, 16, 10]} />
        <meshBasicMaterial color={accent} transparent opacity={0.42} />
      </mesh>
    </group>
  );
}

function LifeOSCapsules({
  active,
  reduceMotion,
  mobile,
}: {
  active: boolean;
  reduceMotion: boolean;
  mobile: boolean;
}) {
  const ref = useSemanticRig({
    active,
    reduceMotion,
    mobile,
    position: [1.42, 0.02, 0.22],
    activeScale: 1.03,
    idleScale: 0.74,
    rotationSpeed: 0.16,
  });
  const capsulePositions: Array<[number, number, number]> = [
    [0, 0.95, 0],
    [0.72, 0.62, 0.08],
    [1.02, -0.12, -0.06],
    [0.58, -0.78, 0.08],
    [-0.18, -0.98, -0.04],
    [-0.86, -0.46, 0.06],
    [-0.9, 0.32, -0.06],
    [-0.34, 0.74, 0.1],
    [0.22, -0.12, 0.18],
  ];

  return (
    <group ref={ref}>
      <Line points={[...capsulePositions, capsulePositions[0]]} color="#FFD400" lineWidth={1.3} transparent opacity={0.32} />
      {capsulePositions.map((position, index) => (
        <CapsuleNode
          key={`${position[0]}-${position[1]}`}
          position={position}
          color={index % 3 === 0 ? "#111827" : "#1A2333"}
          accent={index % 2 === 0 ? "#FFD400" : "#00D9FF"}
          rotate={index * 0.34}
        />
      ))}
    </group>
  );
}

function CareerTrack({
  active,
  reduceMotion,
  mobile,
}: {
  active: boolean;
  reduceMotion: boolean;
  mobile: boolean;
}) {
  const ref = useSemanticRig({
    active,
    reduceMotion,
    mobile,
    position: [1.15, 0.08, 0.22],
    activeScale: 1.06,
    idleScale: 0.72,
    rotationSpeed: 0.035,
  });
  const track: Array<[number, number, number]> = [
    [-1.28, 0.78, 0],
    [-0.62, 0.38, 0.05],
    [0.05, 0.08, 0],
    [0.68, -0.18, 0.05],
    [1.34, -0.54, 0],
  ];

  return (
    <group ref={ref}>
      <Line points={track} color="#00D9FF" lineWidth={4.2} transparent opacity={0.64} />
      <Line
        points={track.map(([x, y, z]) => [x, y - 0.1, z] as [number, number, number])}
        color="#FFD400"
        lineWidth={2}
        transparent
        opacity={0.52}
      />
      {track.map((point, index) => (
        <mesh key={`${point[0]}-${point[1]}`} position={point}>
          <sphereGeometry args={[index === track.length - 1 ? 0.16 : 0.11, 18, 12]} />
          <meshStandardMaterial
            color={index === track.length - 1 ? "#FFD400" : "#B7F7FF"}
            emissive={index === track.length - 1 ? "#FFD400" : "#00D9FF"}
            emissiveIntensity={0.95}
            metalness={0.7}
            roughness={0.14}
          />
        </mesh>
      ))}
    </group>
  );
}

function MemoryVault({
  active,
  reduceMotion,
  mobile,
}: {
  active: boolean;
  reduceMotion: boolean;
  mobile: boolean;
}) {
  const ref = useSemanticRig({
    active,
    reduceMotion,
    mobile,
    position: [1.36, 0.02, 0.22],
    activeScale: 1.04,
    idleScale: 0.72,
    rotationSpeed: 0.04,
  });

  return (
    <group ref={ref}>
      {[-0.42, 0, 0.42].map((x, column) =>
        [-0.36, 0, 0.36].map((y, row) => (
          <mesh key={`${x}-${y}`} position={[x, y, (row - column) * 0.035]}>
            <boxGeometry args={[0.34, 0.22, 0.22]} />
            <meshStandardMaterial
              color={row === 1 ? "#B7F7FF" : "#111827"}
              emissive={column === 1 ? "#00D9FF" : "#FFD400"}
              emissiveIntensity={0.38 + row * 0.12}
              metalness={0.76}
              roughness={0.16}
              transparent
              opacity={0.82}
            />
          </mesh>
        ))
      )}
      {[-0.7, 0, 0.7].map((y, index) => (
        <Line
          key={y}
          points={[
            [-0.72, y, 0.2],
            [0.72, y, 0.2],
          ]}
          color={index === 1 ? "#FFD400" : "#00D9FF"}
          lineWidth={2}
          transparent
          opacity={0.44}
        />
      ))}
    </group>
  );
}

function FutureRoute({
  active,
  reduceMotion,
  mobile,
}: {
  active: boolean;
  reduceMotion: boolean;
  mobile: boolean;
}) {
  const ref = useSemanticRig({
    active,
    reduceMotion,
    mobile,
    position: [1.24, 0.02, 0.22],
    activeScale: 1.08,
    idleScale: 0.72,
    rotationSpeed: 0.055,
  });
  const route: Array<[number, number, number]> = [
    [-1.15, -0.48, 0],
    [-0.52, -0.22, 0.04],
    [0.08, 0.02, 0],
    [0.66, 0.24, 0.05],
    [1.24, 0.5, 0],
  ];

  return (
    <group ref={ref}>
      <Line points={route} color="#FFD400" lineWidth={4} transparent opacity={0.76} />
      <Line points={route.map(([x, y, z]) => [x, y - 0.14, z] as [number, number, number])} color="#00D9FF" lineWidth={1.8} transparent opacity={0.5} />
      {route.slice(0, -1).map((point) => (
        <mesh key={`${point[0]}-${point[1]}`} position={point}>
          <sphereGeometry args={[0.105, 16, 10]} />
          <meshBasicMaterial color="#00D9FF" transparent opacity={0.78} />
        </mesh>
      ))}
      <mesh position={route[route.length - 1]} rotation={[0, 0, -0.72]}>
        <coneGeometry args={[0.22, 0.42, 3]} />
        <meshStandardMaterial
          color="#FFD400"
          emissive="#FFD400"
          emissiveIntensity={1}
          metalness={0.62}
          roughness={0.18}
        />
      </mesh>
    </group>
  );
}

function AssistantCore({
  active,
  reduceMotion,
  mobile,
}: {
  active: boolean;
  reduceMotion: boolean;
  mobile: boolean;
}) {
  const ref = useSemanticRig({
    active,
    reduceMotion,
    mobile,
    position: [1.58, -0.05, 0.24],
    activeScale: 1.08,
    idleScale: 0.72,
    rotationSpeed: 0.12,
  });
  const signalNodes: Array<[number, number, number]> = [
    [-0.72, 0.45, 0],
    [0.74, 0.42, 0.04],
    [0.66, -0.44, 0],
    [-0.62, -0.38, 0.04],
  ];

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.36, mobile ? 24 : 36, mobile ? 16 : 24]} />
        <meshStandardMaterial
          color="#B7F7FF"
          emissive="#00D9FF"
          emissiveIntensity={1.3}
          metalness={0.42}
          roughness={0.08}
          transparent
          opacity={0.72}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.58, 0.018, 8, 64]} />
        <meshBasicMaterial color="#FFD400" transparent opacity={0.66} />
      </mesh>
      {signalNodes.map((point) => (
        <Line key={`${point[0]}-${point[1]}`} points={[[0, 0, 0], point]} color="#00D9FF" lineWidth={1.5} transparent opacity={0.44} />
      ))}
      {signalNodes.map((point, index) => (
        <group key={`${point[0]}-${point[1]}`} position={point} scale={0.48}>
          <GlassPanel width={0.6} height={0.36} accent={index % 2 === 0 ? "#00D9FF" : "#FFD400"} />
        </group>
      ))}
    </group>
  );
}

function SignalBeacon({
  active,
  reduceMotion,
  mobile,
}: {
  active: boolean;
  reduceMotion: boolean;
  mobile: boolean;
}) {
  const ref = useSemanticRig({
    active,
    reduceMotion,
    mobile,
    position: [1.6, 0, 0.24],
    activeScale: 1.02,
    idleScale: 0.72,
    rotationSpeed: 0.025,
  });

  return (
    <group ref={ref}>
      <mesh position={[0, -0.22, 0]}>
        <cylinderGeometry args={[0.09, 0.16, 0.92, 22]} />
        <meshStandardMaterial
          color="#D6DEE8"
          emissive="#00D9FF"
          emissiveIntensity={0.55}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      {[0.38, 0.74, 1.08].map((radius, index) => (
        <mesh key={radius} position={[0, 0.28 + index * 0.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.011, 8, 72]} />
          <meshBasicMaterial color={index === 1 ? "#FFD400" : "#00D9FF"} transparent opacity={0.5 - index * 0.08} />
        </mesh>
      ))}
      <mesh position={[0, 0.34, 0]}>
        <sphereGeometry args={[0.16, 20, 12]} />
        <meshBasicMaterial color="#FFD400" transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

function SectionSemanticRigs({
  activeSection,
  highlightedMissionId,
  reduceMotion,
  mobile,
}: {
  activeSection: SystemSectionKey;
  highlightedMissionId: string | null;
  reduceMotion: boolean;
  mobile: boolean;
}) {
  return (
    <>
      <ChiaOSCoreProcessor
        active={activeSection === "hero" || activeSection === "identity"}
        reduceMotion={reduceMotion}
        mobile={mobile}
      />
      <EducationArchiveNode
        active={activeSection === "education"}
        reduceMotion={reduceMotion}
        mobile={mobile}
      />
      <OperationsSignalNetwork
        active={activeSection === "operations"}
        reduceMotion={reduceMotion}
        mobile={mobile}
      />
      <MissionModuleCluster
        active={activeSection === "missions"}
        reduceMotion={reduceMotion}
        mobile={mobile}
        highlightedMissionId={highlightedMissionId}
      />
      <SkillConstellationFrame
        active={activeSection === "skills"}
        reduceMotion={reduceMotion}
        mobile={mobile}
      />
      <LifeOSCapsules
        active={activeSection === "life-os"}
        reduceMotion={reduceMotion}
        mobile={mobile}
      />
      <CareerTrack
        active={activeSection === "timeline"}
        reduceMotion={reduceMotion}
        mobile={mobile}
      />
      <MemoryVault
        active={activeSection === "build-logs"}
        reduceMotion={reduceMotion}
        mobile={mobile}
      />
      <FutureRoute
        active={activeSection === "roadmap"}
        reduceMotion={reduceMotion}
        mobile={mobile}
      />
      <AssistantCore
        active={activeSection === "ask"}
        reduceMotion={reduceMotion}
        mobile={mobile}
      />
      <SignalBeacon
        active={activeSection === "contact"}
        reduceMotion={reduceMotion}
        mobile={mobile}
      />
    </>
  );
}

function DirectorScene({
  activeSection,
  highlightedMissionId,
  highlightedSkill,
  reduceMotion,
  mobile,
}: Required<SystemDirectorProps> & {
  reduceMotion: boolean;
  mobile: boolean;
}) {
  const formation = formations[activeSection];
  const activeNode = sectionNodeFocus[activeSection];
  const missionNode = highlightedMissionId ? missionNodeMap[highlightedMissionId] : null;
  const skillNode = nodeForSkill(highlightedSkill);
  const highlightedNode = missionNode ?? skillNode;
  const showConnections = formation.connect && !mobile;
  const showPulse = activeSection === "ask" || Boolean(highlightedMissionId || highlightedSkill);
  const sceneScale = mobile ? 0.86 : 1.12;
  const scenePosition: [number, number, number] = mobile ? [-0.12, -0.04, 0] : [0.5, 0.02, 0];

  return (
    <>
      <ambientLight intensity={1.05} />
      <directionalLight position={[2.8, 4.5, 5]} intensity={mobile ? 1.8 : 2.35} />
      <pointLight position={[2.7, 0.5, 3]} color="#00D9FF" intensity={mobile ? 9 : 16} distance={10} />
      <pointLight position={[-2.6, -1, 2.4]} color="#FFD400" intensity={mobile ? 5 : 8.5} distance={9} />
      <pointLight position={[0.2, 1.8, 2.7]} color="#B7F7FF" intensity={mobile ? 3.5 : 5.5} distance={8} />

      <group position={scenePosition} scale={sceneScale}>
        <DirectorCore
          formation={formation}
          reduceMotion={reduceMotion}
          mobile={mobile}
          pulse={showPulse}
        />
        <SectionSemanticRigs
          activeSection={activeSection}
          highlightedMissionId={highlightedMissionId}
          reduceMotion={reduceMotion}
          mobile={mobile}
        />

        {!mobile ? (
          <>
            <Line
              points={formation.beam}
              color={formation.accent}
              lineWidth={4.5}
              transparent
              opacity={0.78}
            />
            <Line
              points={formation.path}
              color={activeSection === "roadmap" || activeSection === "timeline" ? "#FFD400" : "#00D9FF"}
              lineWidth={3}
              transparent
              opacity={0.62}
            />
            <Line
              points={formation.path.map(([x, y, z]) => [x, y - 0.12, z - 0.22] as [number, number, number])}
              color="#B7F7FF"
              lineWidth={1.5}
              transparent
              opacity={0.3}
            />
          </>
        ) : (
          <Line
            points={formation.path}
            color={formation.accent}
            lineWidth={2.2}
            transparent
            opacity={0.42}
          />
        )}

        {showConnections
          ? nodes.map((node) => (
              <Line
                key={`${node.key}-connection`}
                points={[formation.core, formation.nodes[node.key]]}
                color={node.key === highlightedNode ? "#FFD400" : "#00D9FF"}
                lineWidth={node.key === highlightedNode ? 3.5 : 2}
                transparent
                opacity={node.key === highlightedNode ? 0.8 : 0.36}
              />
            ))
          : null}

        {nodes.map((node) => (
          <DirectorModule
            key={node.key}
            node={node}
        target={formation.nodes[node.key]}
        active={node.key === activeNode}
        highlighted={node.key === highlightedNode}
        reduceMotion={reduceMotion}
        mobile={mobile}
        quiet={activeSection !== "missions" && activeSection !== "skills" && activeSection !== "operations"}
      />
        ))}
      </group>
    </>
  );
}

export function SystemDirector({
  activeSection,
  highlightedMissionId = null,
  highlightedSkill = null,
}: SystemDirectorProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const [mobile, setMobile] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null);
  const formation = formations[activeSection];
  const directorLabel = useMemo(() => formation.label, [formation.label]);
  const directorStatus = useMemo(() => formation.status, [formation.status]);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    let frameId = 0;

    try {
      const testCanvas = document.createElement("canvas");
      const context =
        testCanvas.getContext("webgl2") ??
        testCanvas.getContext("webgl") ??
        testCanvas.getContext("experimental-webgl");

      frameId = window.requestAnimationFrame(() => setWebglAvailable(Boolean(context)));
    } catch {
      frameId = window.requestAnimationFrame(() => setWebglAvailable(false));
    }

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  return (
    <>
      <div
        className="system-director pointer-events-none fixed inset-0 z-[1] overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute inset-y-0 right-0 hidden w-[min(48rem,52vw)] border-l border-[#00D9FF]/14 opacity-85 lg:block"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,217,255,0.08) 34%, rgba(255,212,0,0.06) 100%), radial-gradient(circle at 62% 34%, rgba(0,217,255,0.26), transparent 34%), radial-gradient(circle at 74% 62%, rgba(255,212,0,0.19), transparent 30%)",
          }}
        />
        <div className="absolute right-[4%] top-[16%] hidden h-[68vh] w-px bg-gradient-to-b from-transparent via-[#00D9FF]/65 to-transparent lg:block" />
        <div className="absolute right-[7%] top-[22%] hidden h-[44vh] w-px bg-gradient-to-b from-transparent via-[#FFD400]/45 to-transparent lg:block" />
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            mobile ? "opacity-70" : "opacity-95"
          )}
          style={{
            background:
              activeSection === "roadmap" || activeSection === "timeline" || activeSection === "life-os"
                ? "radial-gradient(circle at 78% 36%, rgba(255,212,0,0.28), transparent 30%), radial-gradient(circle at 24% 42%, rgba(0,217,255,0.18), transparent 34%)"
                : "radial-gradient(circle at 76% 36%, rgba(0,217,255,0.3), transparent 30%), radial-gradient(circle at 26% 52%, rgba(255,212,0,0.15), transparent 34%)",
          }}
        />
      </div>
      <div
        className="system-director-visual pointer-events-none fixed inset-0 z-[12] overflow-hidden"
        aria-hidden="true"
      >
        {webglAvailable ? (
          <Canvas
            aria-label="Scroll-guided ChiaOS System Director"
            className="absolute inset-0 h-full w-full"
            camera={{ position: [mobile ? 0 : 0.6, 0, mobile ? 6.3 : 5.6], fov: mobile ? 50 : 50 }}
            dpr={mobile ? [1, 1.25] : [1, 1.6]}
            frameloop={reduceMotion ? "demand" : "always"}
            gl={{ antialias: !mobile, powerPreference: "high-performance", alpha: true }}
          >
            <DirectorScene
              activeSection={activeSection}
              highlightedMissionId={highlightedMissionId}
              highlightedSkill={highlightedSkill}
              reduceMotion={reduceMotion}
              mobile={mobile}
            />
          </Canvas>
        ) : (
          <div className="system-director-fallback absolute inset-0">
            <div className="absolute right-[4%] top-[18%] h-80 w-80 rounded-full border-2 border-[#00D9FF]/45 bg-[#00D9FF]/14 shadow-[0_0_90px_rgba(0,217,255,0.48)] md:h-[26rem] md:w-[26rem]">
              <div className="absolute inset-10 rounded-full border border-[#FFD400]/45" />
              <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-xl border border-[#B7F7FF]/55 bg-[#0B0F17]/80 shadow-[0_0_42px_rgba(0,217,255,0.45)]">
                <span className="absolute left-1/2 top-2 h-20 w-1 -translate-x-1/2 bg-[#00D9FF]/60" />
                <span className="absolute left-2 top-1/2 h-1 w-20 -translate-y-1/2 bg-[#FFD400]/70" />
              </div>
              {[
                ["left-[16%] top-[18%]", "AI"],
                ["right-[13%] top-[26%]", "Cloud"],
                ["left-[12%] bottom-[22%]", "Data"],
                ["right-[18%] bottom-[18%]", "Net"],
              ].map(([position, label]) => (
                <div
                  key={label}
                  className={cn(
                    "absolute h-14 w-20 rounded-xl border border-[#00D9FF]/35 bg-[#101624]/76 text-center font-code text-[10px] uppercase leading-[3.5rem] text-[#B7F7FF] shadow-[0_0_28px_rgba(0,217,255,0.2)]",
                    position
                  )}
                >
                  {label}
                </div>
              ))}
              <div className="absolute left-[12%] top-1/2 h-1 w-[76%] -translate-y-1/2 rotate-[-10deg] bg-gradient-to-r from-[#00D9FF]/20 via-[#FFD400]/70 to-[#00D9FF]/30" />
              <div className="absolute left-[18%] top-[58%] h-1 w-[64%] rotate-[18deg] bg-gradient-to-r from-[#FFD400]/20 via-[#00D9FF]/70 to-[#FFD400]/30" />
            </div>
            <div className="absolute bottom-24 right-5 max-w-[18rem] rounded-2xl border border-[#00D9FF]/32 bg-[#05070B]/72 p-4 text-right shadow-[0_0_42px_rgba(0,217,255,0.24)] backdrop-blur-xl">
              <p className="font-code text-[10px] uppercase tracking-[0.28em] text-[#00D9FF]">
                Fallback Director
              </p>
              <p className="mt-1 font-display text-lg font-semibold text-white">{directorLabel}</p>
            </div>
          </div>
        )}
      </div>
      <div
        className="pointer-events-none fixed bottom-5 right-4 z-[13] hidden max-w-xs rounded-2xl border border-[#00D9FF]/30 bg-[#05070B]/68 p-4 text-right shadow-[0_0_48px_rgba(0,217,255,0.22)] backdrop-blur-xl lg:block"
        aria-hidden="true"
      >
        <p className="font-code text-xs uppercase tracking-[0.28em] text-[#00D9FF]">
          System Director
        </p>
        <p className="mt-1 font-display text-lg font-semibold text-[#F8FAFC]">{directorLabel}</p>
        <p className="mt-1 text-xs leading-5 text-[#AAB4C0]">{directorStatus}</p>
      </div>
    </>
  );
}
