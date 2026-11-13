import { Line } from "@react-three/drei";
import type { DirectorNode } from "./types";

export function GlassPanel({
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

export function ChipSymbol({ color, accent }: { color: string; accent: string }) {
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

export function ShieldSymbol({ color, accent }: { color: string; accent: string }) {
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

export function CloudBlocksSymbol({ color, accent }: { color: string; accent: string }) {
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

export function DatabaseStackSymbol({ color, accent }: { color: string; accent: string }) {
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

export function TerminalPlateSymbol({ color, accent }: { color: string; accent: string }) {
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

export function NetworkGraphSymbol({ color, accent }: { color: string; accent: string }) {
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

export function SemanticCategorySymbol({
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
      <mesh rotation={[0.24, Math.PI / 2, 0]}>
        <torusGeometry args={[highlighted ? 0.88 : active ? 0.8 : 0.74, 0.008, 8, 58]} />
        <meshBasicMaterial
          color={highlighted ? "#FFD400" : "#00D9FF"}
          transparent
          opacity={highlighted ? 0.5 : active ? 0.32 : 0.14}
        />
      </mesh>
    </group>
  );
}
