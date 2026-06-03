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
    return <boxGeometry args={[0.7, 0.7, 0.7]} />;
  }

  if (kind === "torus") {
    return <torusGeometry args={[0.42, 0.12, mobile ? 10 : 14, mobile ? 24 : 36]} />;
  }

  if (kind === "octa") {
    return <octahedronGeometry args={[0.56, mobile ? 0 : 1]} />;
  }

  if (kind === "dodeca") {
    return <dodecahedronGeometry args={[0.52, 0]} />;
  }

  if (kind === "ico") {
    return <icosahedronGeometry args={[0.56, mobile ? 0 : 1]} />;
  }

  return <sphereGeometry args={[0.52, mobile ? 14 : 24, mobile ? 10 : 16]} />;
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

    targetVector.current.set(target[0], target[1], target[2] + (highlighted ? 0.34 : 0));
    groupRef.current.position.lerp(targetVector.current, reduceMotion ? 0.35 : 0.075);

    const pulse = reduceMotion ? 0 : Math.sin(state.clock.elapsedTime * 2.4) * 0.035;
    const targetScale = (mobile ? 0.72 : 1) * (highlighted ? 1.42 : active ? 1.18 : 0.92) + pulse;
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
          emissiveIntensity={highlighted ? 0.72 : active ? 0.38 : 0.16}
          metalness={0.68}
          roughness={0.24}
          transparent
          opacity={mobile ? 0.72 : 0.86}
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

    const rhythm = reduceMotion ? 0 : Math.sin(state.clock.elapsedTime * (pulse ? 3.8 : 1.8)) * 0.055;
    const targetScale = (mobile ? 0.84 : 1) * formation.coreScale + rhythm;
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
        <torusKnotGeometry args={[0.48, 0.075, mobile ? 64 : 96, mobile ? 7 : 10]} />
        <meshStandardMaterial
          color="#111827"
          emissive={formation.accent}
          emissiveIntensity={pulse ? 0.56 : 0.34}
          metalness={0.82}
          roughness={0.15}
          transparent
          opacity={mobile ? 0.76 : 0.92}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.78, 0.012, 8, mobile ? 48 : 72]} />
        <meshBasicMaterial color={formation.accent} transparent opacity={mobile ? 0.24 : 0.34} />
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

  return (
    <>
      <ambientLight intensity={0.78} />
      <directionalLight position={[2.5, 4, 5]} intensity={1.35} />
      <pointLight position={[2.6, 0.5, 3]} color="#00D9FF" intensity={mobile ? 5 : 8} distance={8} />
      <pointLight position={[-2.4, -1, 2]} color="#FFD400" intensity={mobile ? 2 : 3.4} distance={7} />

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
            lineWidth={2}
            transparent
            opacity={0.3}
          />
          <Line
            points={formation.path}
            color={activeSection === "roadmap" || activeSection === "timeline" ? "#FFD400" : "#00D9FF"}
            lineWidth={1.6}
            transparent
            opacity={0.22}
          />
        </>
      ) : null}

      {showConnections
        ? nodes.map((node) => (
            <Line
              key={`${node.key}-connection`}
              points={[formation.core, formation.nodes[node.key]]}
              color={node.key === highlightedNode ? "#FFD400" : "#00D9FF"}
              lineWidth={node.key === highlightedNode ? 2 : 1}
              transparent
              opacity={node.key === highlightedNode ? 0.45 : 0.15}
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
    <div
      className="system-director pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          mobile ? "opacity-35" : "opacity-60"
        )}
        style={{
          background:
            activeSection === "roadmap" || activeSection === "timeline" || activeSection === "life-os"
              ? "radial-gradient(circle at 78% 36%, rgba(255,212,0,0.17), transparent 30%), radial-gradient(circle at 24% 42%, rgba(0,217,255,0.13), transparent 34%)"
              : "radial-gradient(circle at 76% 36%, rgba(0,217,255,0.17), transparent 30%), radial-gradient(circle at 26% 52%, rgba(255,212,0,0.1), transparent 34%)",
        }}
      />
      {webglAvailable ? (
        <Canvas
          aria-label="Scroll-guided ChiaOS System Director"
          className="absolute inset-0 h-full w-full"
          camera={{ position: [0, 0, mobile ? 7.3 : 5.8], fov: mobile ? 47 : 43 }}
          dpr={mobile ? [1, 1.15] : [1, 1.45]}
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
        <div className="absolute inset-0">
          <div className="absolute right-[8%] top-[24%] h-48 w-48 rounded-full border border-[#00D9FF]/20 bg-[#00D9FF]/10 blur-sm" />
          <div className="absolute right-[18%] top-[42%] h-px w-[42vw] rotate-[-8deg] bg-gradient-to-l from-[#FFD400]/45 to-transparent" />
          <div className="absolute right-[14%] top-[54%] h-px w-[50vw] rotate-[6deg] bg-gradient-to-l from-[#00D9FF]/40 to-transparent" />
        </div>
      )}
      <div className="absolute bottom-5 right-4 hidden max-w-xs rounded-2xl border border-white/12 bg-[#05070B]/54 p-4 text-right backdrop-blur-xl lg:block">
        <p className="font-code text-xs uppercase text-[#00D9FF]">System Director</p>
        <p className="mt-1 font-display text-lg font-semibold text-[#F8FAFC]">
          {directorLabel}
        </p>
        <p className="mt-1 text-xs leading-5 text-[#AAB4C0]">{directorStatus}</p>
      </div>
    </div>
  );
}
