import { Line } from "@react-three/drei";
import { useSemanticRig } from "../rig";
import { GlassPanel } from "../symbols";

export function CareerTrack({
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

export function MemoryVault({
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

export function FutureRoute({
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

export function AssistantCore({
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

export function SignalBeacon({
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
