import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { Line } from "@react-three/drei";
import { useSemanticRig } from "../rig";
import { GlassPanel } from "../symbols";

export function ChiaOSCoreProcessor({
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

export function EducationArchiveNode({
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

export function OperationsSignalNetwork({
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

