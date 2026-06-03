"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import type { Group } from "three";
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

function NodeGeometry({ kind, mobile }: { kind: DirectorNode["kind"]; mobile: boolean }) {
  if (kind === "box") {
    return <boxGeometry args={mobile ? [0.64, 0.64, 0.64] : [0.98, 0.98, 0.98]} />;
  }

  if (kind === "torus") {
    return <torusGeometry args={[mobile ? 0.4 : 0.62, mobile ? 0.11 : 0.16, mobile ? 10 : 16, mobile ? 28 : 48]} />;
  }

  if (kind === "octa") {
    return <octahedronGeometry args={[mobile ? 0.54 : 0.82, mobile ? 0 : 1]} />;
  }

  if (kind === "dodeca") {
    return <dodecahedronGeometry args={[mobile ? 0.5 : 0.78, 0]} />;
  }

  if (kind === "ico") {
    return <icosahedronGeometry args={[mobile ? 0.56 : 0.84, mobile ? 0 : 1]} />;
  }

  return <sphereGeometry args={[mobile ? 0.52 : 0.8, mobile ? 18 : 32, mobile ? 12 : 20]} />;
}

function DirectorModule({
  node,
  target,
  active,
  highlighted,
  reduceMotion,
  mobile,
}: {
  node: DirectorNode;
  target: [number, number, number];
  active: boolean;
  highlighted: boolean;
  reduceMotion: boolean;
  mobile: boolean;
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

    const pulse = reduceMotion ? 0 : Math.sin(state.clock.elapsedTime * 2.8) * (highlighted ? 0.08 : 0.045);
    const targetScale = (mobile ? 0.82 : 1.1) * (highlighted ? 1.72 : active ? 1.4 : 1) + pulse;
    scaleVector.current.set(targetScale, targetScale, targetScale);
    groupRef.current.scale.lerp(scaleVector.current, reduceMotion ? 0.35 : 0.08);

    if (!reduceMotion) {
      groupRef.current.rotation.x += delta * (active ? 0.38 : 0.18);
      groupRef.current.rotation.y += delta * (highlighted ? 0.58 : 0.24);
    }
  });

  return (
    <group ref={groupRef} position={target}>
      <mesh>
        <NodeGeometry kind={node.kind} mobile={mobile} />
        <meshStandardMaterial
          color={highlighted ? "#FFD400" : node.color}
          emissive={highlighted ? "#FFD400" : active ? node.color : "#00D9FF"}
          emissiveIntensity={highlighted ? 1.55 : active ? 1.05 : 0.5}
          metalness={0.76}
          roughness={0.18}
          transparent
          opacity={mobile ? 0.88 : 1}
        />
      </mesh>
      <mesh scale={1.12}>
        <NodeGeometry kind={node.kind} mobile={mobile} />
        <meshBasicMaterial
          color={highlighted ? "#FFD400" : node.color}
          transparent
          opacity={highlighted ? 0.32 : active ? 0.2 : 0.12}
          wireframe
        />
      </mesh>
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

    const rhythm = reduceMotion ? 0 : Math.sin(state.clock.elapsedTime * (pulse ? 3.8 : 1.8)) * 0.075;
    const targetScale = (mobile ? 0.92 : 1.16) * formation.coreScale + rhythm;
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
        <sphereGeometry args={[mobile ? 0.48 : 0.72, mobile ? 24 : 40, mobile ? 16 : 24]} />
        <meshBasicMaterial color={formation.accent} transparent opacity={mobile ? 0.22 : 0.34} />
      </mesh>
      <mesh>
        <torusKnotGeometry args={[mobile ? 0.54 : 0.78, mobile ? 0.085 : 0.13, mobile ? 72 : 128, mobile ? 8 : 12]} />
        <meshStandardMaterial
          color="#07111F"
          emissive={formation.accent}
          emissiveIntensity={pulse ? 1.45 : 1}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={mobile ? 0.9 : 1}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[mobile ? 0.86 : 1.2, mobile ? 0.014 : 0.022, 8, mobile ? 64 : 96]} />
        <meshBasicMaterial color={formation.accent} transparent opacity={mobile ? 0.46 : 0.62} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[mobile ? 0.68 : 0.98, mobile ? 0.01 : 0.016, 8, mobile ? 48 : 84]} />
        <meshBasicMaterial color="#00D9FF" transparent opacity={mobile ? 0.26 : 0.42} />
      </mesh>
    </group>
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
            <div className="absolute right-[7%] top-[20%] h-72 w-72 rounded-full border-2 border-[#00D9FF]/45 bg-[#00D9FF]/20 shadow-[0_0_90px_rgba(0,217,255,0.55)] blur-[1px] md:h-96 md:w-96" />
            <div className="absolute right-[12%] top-[27%] h-44 w-44 rounded-full border border-[#FFD400]/48 shadow-[0_0_70px_rgba(255,212,0,0.42)] md:h-64 md:w-64" />
            <div className="absolute right-[18%] top-[42%] h-1 w-[52vw] rotate-[-8deg] bg-gradient-to-l from-[#FFD400]/80 via-[#00D9FF]/40 to-transparent shadow-[0_0_24px_rgba(255,212,0,0.55)]" />
            <div className="absolute right-[12%] top-[56%] h-1 w-[58vw] rotate-[6deg] bg-gradient-to-l from-[#00D9FF]/80 via-[#B7F7FF]/36 to-transparent shadow-[0_0_24px_rgba(0,217,255,0.6)]" />
            <div className="absolute right-[28%] top-[36%] grid grid-cols-3 gap-3 opacity-85">
              {nodes.map((node) => (
                <span
                  key={node.key}
                  className="h-4 w-4 rounded-full border border-white/30 shadow-[0_0_18px_rgba(0,217,255,0.55)]"
                  style={{ backgroundColor: node.color }}
                />
              ))}
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
