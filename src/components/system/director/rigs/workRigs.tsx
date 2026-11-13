import { Line } from "@react-three/drei";
import { nodes } from "../formations";
import { missionModules } from "../mapping";
import { useSemanticRig } from "../rig";
import { GlassPanel, SemanticCategorySymbol } from "../symbols";

export function MissionModuleCluster({
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

export function SkillConstellationFrame({
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

export function CapsuleNode({
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

export function LifeOSCapsules({
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

