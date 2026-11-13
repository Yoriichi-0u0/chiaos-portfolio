import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, DoubleSide, PlaneGeometry, type Group, type Points } from "three";

function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
}

export function LedgerLattice({ reduceMotion }: { reduceMotion: boolean }) {
  const pulses = useRef<Group>(null);
  const rows = 7;
  const unmatched = new Set([2, 5]);
  const pairs = useMemo(
    () =>
      Array.from({ length: rows }, (_, index) => {
        const target = unmatched.has(index) ? null : (index + (index % 3 === 0 ? 1 : 0)) % rows;
        return { index, target };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const y = (index: number) => 0.9 - index * 0.3;

  useFrame((state) => {
    if (!pulses.current || reduceMotion) {
      return;
    }
    pulses.current.children.forEach((child, index) => {
      const pair = pairs.filter((item) => item.target !== null)[index];
      if (!pair || pair.target === null) {
        return;
      }
      const t = (state.clock.elapsedTime * 0.45 + index * 0.17) % 1;
      child.position.set(-0.9 + t * 1.8, y(pair.index) + (y(pair.target) - y(pair.index)) * t, 0.06);
    });
  });

  return (
    <group rotation={[-0.32, 0.42, 0]} scale={1.05}>
      {pairs.map(({ index, target }) => (
        <group key={index}>
          <mesh position={[-1.05, y(index), 0]}>
            <boxGeometry args={[0.42, 0.16, 0.06]} />
            <meshStandardMaterial
              color={unmatched.has(index) ? "#3A2F05" : "#0E2A36"}
              emissive={unmatched.has(index) ? "#FFD400" : "#00D9FF"}
              emissiveIntensity={unmatched.has(index) ? 0.55 : 0.32}
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>
          <mesh position={[1.05, y(index), 0]}>
            <boxGeometry args={[0.42, 0.16, 0.06]} />
            <meshStandardMaterial color="#141B2B" emissive="#B7F7FF" emissiveIntensity={0.18} metalness={0.6} roughness={0.3} />
          </mesh>
          {target !== null ? (
            <Line
              points={[
                [-0.84, y(index), 0.03],
                [-0.3, y(index), 0.12],
                [0.3, y(target), 0.12],
                [0.84, y(target), 0.03],
              ]}
              color="#00D9FF"
              lineWidth={1.6}
              transparent
              opacity={0.75}
            />
          ) : (
            <mesh position={[-0.7, y(index), 0.04]}>
              <torusGeometry args={[0.07, 0.012, 8, 32]} />
              <meshBasicMaterial color="#FFD400" />
            </mesh>
          )}
        </group>
      ))}
      <group ref={pulses}>
        {pairs
          .filter((item) => item.target !== null)
          .map((pair) => (
            <mesh key={pair.index} position={[0, y(pair.index), 0.06]}>
              <sphereGeometry args={[0.035, 12, 12]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
          ))}
      </group>
      <mesh position={[0, -1.25, -0.05]}>
        <boxGeometry args={[2.6, 0.02, 0.5]} />
        <meshStandardMaterial color="#101624" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
}

function featherSpine(t: number): [number, number] {
  return [Math.sin(t * 2.2) * 0.18, -1.25 + t * 2.5];
}

export function FeatherField({ reduceMotion }: { reduceMotion: boolean }) {
  const pointsRef = useRef<Points>(null);
  const spine = useMemo<[number, number, number][]>(
    () =>
      Array.from({ length: 15 }, (_, index) => {
        const t = -0.14 + (index / 14) * 1.12;
        const [x, y] = featherSpine(t);
        return [x, y, 0.01];
      }),
    []
  );
  const { geometry, base, baseColors, along } = useMemo(() => {
    const random = seeded(7);
    const count = 2600;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const alongSpine = new Float32Array(count);
    const cyan = new Color("#00D9FF");
    const pale = new Color("#E6FBFF");
    const gold = new Color("#FFD400");
    for (let index = 0; index < count; index += 1) {
      const t = 0.04 + random() * 0.94;
      const side = random() < 0.5 ? -1 : 1;
      const profile = Math.pow(Math.sin(Math.min(1, t * 1.08) * Math.PI), 0.7) * (1 - t * 0.35);
      const width = profile * (side > 0 ? 0.46 : 0.34);
      const reach = Math.sqrt(random()) * width;
      const barbIndex = Math.floor(t * 70);
      const barbT = (barbIndex + 0.5) / 70 + (random() - 0.5) * 0.006;
      alongSpine[index] = barbT;
      const [sx, sy] = featherSpine(barbT);
      positions[index * 3] = sx + side * reach;
      positions[index * 3 + 1] = sy + reach * 0.62;
      positions[index * 3 + 2] = (random() - 0.5) * 0.04 + reach * reach * 0.35;
      const color = reach < 0.03 ? gold : cyan.clone().lerp(pale, 0.25 + random() * 0.6);
      colors.set([color.r, color.g, color.b], index * 3);
    }
    const featherGeometry = new BufferGeometry();
    featherGeometry.setAttribute("position", new BufferAttribute(positions, 3));
    featherGeometry.setAttribute("color", new BufferAttribute(colors, 3));
    return { geometry: featherGeometry, base: positions.slice(), baseColors: colors.slice(), along: alongSpine };
  }, []);

  useFrame((state) => {
    if (reduceMotion || !pointsRef.current) {
      return;
    }
    const time = state.clock.elapsedTime;
    const attribute = pointsRef.current.geometry.getAttribute("position") as BufferAttribute;
    const array = attribute.array as Float32Array;
    const colorAttribute = pointsRef.current.geometry.getAttribute("color") as BufferAttribute;
    const colorArray = colorAttribute.array as Float32Array;
    const band = 0.5 + Math.sin(time * 0.7) * 0.42;
    for (let index = 0; index < array.length; index += 3) {
      array[index + 2] = base[index + 2] + Math.sin(time * 1.6 + base[index + 1] * 3) * 0.035;
      const glow = Math.max(0, 1 - Math.abs(along[index / 3] - band) / 0.05);
      colorArray[index] = baseColors[index] + (1 - baseColors[index]) * glow;
      colorArray[index + 1] = baseColors[index + 1] + (0.83 - baseColors[index + 1]) * glow;
      colorArray[index + 2] = baseColors[index + 2] * (1 - glow);
    }
    attribute.needsUpdate = true;
    colorAttribute.needsUpdate = true;
  });

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <group rotation={[0.1, -0.35, -0.55]} scale={1.15}>
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial size={0.024} vertexColors transparent opacity={0.95} sizeAttenuation depthWrite={false} blending={AdditiveBlending} />
      </points>
      <Line points={spine} color="#FFD400" lineWidth={1.8} />
    </group>
  );
}

const riverCenter = (x: number) => Math.sin(x * 2.2) * 0.3 + 0.35;
const riverDistance = (x: number, z: number) => Math.abs(z - riverCenter(x));

function terrainHeight(x: number, z: number) {
  const land =
    0.12 +
    0.4 * Math.exp(-((x + 0.45) ** 2 + (z + 0.35) ** 2) * 2.2) +
    0.28 * Math.exp(-((x - 0.55) ** 2 + (z + 0.5) ** 2) * 3) +
    0.02 * Math.sin(x * 4.2) * Math.cos(z * 3.6);
  const carve = Math.min(1, riverDistance(x, z) / 0.4);
  const valley = carve * carve * (3 - 2 * carve);
  return 0.05 + (land - 0.05) * valley;
}

export function TerrainDiorama({ reduceMotion }: { reduceMotion: boolean }) {
  const marker = useRef<Group>(null);
  const geometry = useMemo(() => {
    const plane = new PlaneGeometry(2.4, 2.4, 96, 96);
    plane.rotateX(-Math.PI / 2);
    const position = plane.getAttribute("position") as BufferAttribute;
    const colors = new Float32Array(position.count * 3);
    const low = new Color("#2E7D55");
    const mid = new Color("#4FA86E");
    const high = new Color("#D4EBC2");
    for (let index = 0; index < position.count; index += 1) {
      const x = position.getX(index);
      const z = position.getZ(index);
      const h = terrainHeight(x, z);
      position.setY(index, h);
      const color =
        h > 0.3
          ? mid.clone().lerp(high, Math.min(1, (h - 0.3) / 0.2))
          : low.clone().lerp(mid, Math.max(0, (h - 0.05) / 0.25));
      colors.set([color.r, color.g, color.b], index * 3);
    }
    plane.setAttribute("color", new BufferAttribute(colors, 3));
    plane.computeVertexNormals();
    return plane;
  }, []);
  const river = useMemo<[number, number, number][]>(
    () =>
      Array.from({ length: 49 }, (_, index) => {
        const x = -1.2 + (index / 48) * 2.4;
        const z = Math.max(-1.18, Math.min(1.18, riverCenter(x)));
        return [x, terrainHeight(x, z) + 0.012, z];
      }),
    []
  );
  const stops = useMemo<[number, number, number][]>(
    () => [
      [-0.9, terrainHeight(-0.9, 0.1) + 0.05, 0.1],
      [-0.45, terrainHeight(-0.45, -0.35) + 0.06, -0.35],
      [0.15, terrainHeight(0.15, 0.0) + 0.05, 0.0],
      [0.55, terrainHeight(0.55, -0.5) + 0.06, -0.5],
      [0.95, terrainHeight(0.95, 0.2) + 0.05, 0.2],
    ],
    []
  );

  useFrame((state) => {
    if (!marker.current) {
      return;
    }
    const t = reduceMotion ? 0.5 : (state.clock.elapsedTime * 0.12) % 1;
    const exact = t * (stops.length - 1);
    const index = Math.min(stops.length - 2, Math.floor(exact));
    const local = exact - index;
    const [ax, ay, az] = stops[index];
    const [bx, by, bz] = stops[index + 1];
    marker.current.position.set(ax + (bx - ax) * local, ay + (by - ay) * local + 0.04, az + (bz - az) * local);
  });

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <group rotation={[0.55, -0.6, 0]} position={[0, -0.25, 0]} scale={1.05}>
      <mesh geometry={geometry}>
        <meshStandardMaterial vertexColors roughness={0.85} metalness={0.05} side={DoubleSide} />
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[2.4, 0.2, 2.4]} />
        <meshStandardMaterial color="#0B0F17" metalness={0.4} roughness={0.6} />
      </mesh>
      <Line points={river} color="#38C8F0" lineWidth={5} />
      <Line points={stops} color="#FFD400" lineWidth={2.4} dashed dashSize={0.08} gapSize={0.05} />
      {stops.map((stop, index) => (
        <mesh key={index} position={stop}>
          <cylinderGeometry args={[0.035, 0.035, 0.1, 16]} />
          <meshStandardMaterial color="#FFD400" emissive="#FFD400" emissiveIntensity={0.6} />
        </mesh>
      ))}
      <group ref={marker}>
        <mesh>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </group>
    </group>
  );
}

export function DocumentStack({ reduceMotion }: { reduceMotion: boolean }) {
  const pages = useRef<Group>(null);
  const count = 5;

  useFrame((state) => {
    if (!pages.current) {
      return;
    }
    const cycle = reduceMotion ? 0.35 : (state.clock.elapsedTime * 0.16) % 1;
    const fan = cycle < 0.7 ? Math.sin((cycle / 0.7) * Math.PI) : 0;
    pages.current.children.forEach((page, index) => {
      const offset = index - (count - 1) / 2;
      const lift = index === 3 ? Math.sin(Math.min(1, Math.max(0, (cycle - 0.15) / 0.4)) * Math.PI) * 0.45 : 0;
      page.position.set(offset * 0.42 * fan, offset * 0.05 + lift, -index * 0.05 + lift * 0.3);
      page.rotation.set(-0.15, offset * 0.2 * fan, offset * 0.05 * fan);
    });
  });

  return (
    <group rotation={[-0.25, 0.3, 0]} scale={1.05}>
      <group ref={pages}>
        {Array.from({ length: count }, (_, index) => (
          <group key={index}>
            <mesh>
              <boxGeometry args={[0.95, 1.3, 0.015]} />
              <meshStandardMaterial color={index === 3 ? "#FFF8D6" : "#EEF3F8"} roughness={0.6} />
            </mesh>
            {[0.42, 0.3, 0.18, 0.06, -0.06, -0.18].map((line, row) => (
              <mesh key={row} position={[-0.06 + (row % 2) * 0.06, line, 0.009]}>
                <boxGeometry args={[0.66 - (row % 3) * 0.12, 0.035, 0.002]} />
                <meshBasicMaterial color={row === 0 ? "#00A8D6" : "#9AA6B4"} />
              </mesh>
            ))}
            <mesh position={[0.22, -0.42, 0.009]}>
              <boxGeometry args={[0.32, 0.16, 0.002]} />
              <meshBasicMaterial color={index === 3 ? "#FFD400" : "#C7D0DA"} />
            </mesh>
          </group>
        ))}
      </group>
      <mesh position={[0, -0.95, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9, 0.93, 64]} />
        <meshBasicMaterial color="#FFD400" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

export function LunarOutpost({ reduceMotion }: { reduceMotion: boolean }) {
  const panels = useRef<Group>(null);
  const rover = useRef<Group>(null);
  const craters = useMemo(() => {
    const random = seeded(11);
    return Array.from({ length: 9 }, () => ({
      x: (random() - 0.5) * 2.6,
      z: (random() - 0.5) * 2.6,
      r: 0.08 + random() * 0.18,
    })).filter((crater) => Math.hypot(crater.x, crater.z) > 0.65);
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (panels.current && !reduceMotion) {
      panels.current.rotation.y = Math.sin(time * 0.3) * 0.4;
    }
    if (rover.current && !reduceMotion) {
      rover.current.position.set(Math.cos(time * 0.35) * 1.05, 0.05, Math.sin(time * 0.35) * 1.05);
      rover.current.rotation.y = -time * 0.35;
    }
  });

  return (
    <group rotation={[0.5, -0.5, 0]} position={[0, -0.25, 0]} scale={1.05}>
      <mesh position={[0, -0.12, 0]}>
        <cylinderGeometry args={[1.45, 1.38, 0.22, 64]} />
        <meshStandardMaterial color="#7D8693" roughness={0.95} />
      </mesh>
      {craters.map((crater, index) => (
        <mesh key={index} position={[crater.x, 0.002, crater.z]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[crater.r * 0.7, crater.r, 32]} />
          <meshStandardMaterial color="#5A626E" roughness={1} />
        </mesh>
      ))}
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.36, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#DCE7F2" metalness={0.3} roughness={0.25} transparent opacity={0.88} />
      </mesh>
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.4, 0.42, 0.12, 32]} />
        <meshStandardMaterial color="#E9EEF3" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0.62, 0.14, 0.12]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 0.42, 24]} />
        <meshStandardMaterial color="#F2F5F8" metalness={0.4} roughness={0.35} />
      </mesh>
      <mesh position={[0.35, 0.14, 0.08]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.2, 12]} />
        <meshStandardMaterial color="#AAB4C0" />
      </mesh>
      <group ref={panels} position={[-0.75, 0.32, -0.25]}>
        <mesh position={[0, -0.18, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.36, 8]} />
          <meshStandardMaterial color="#AAB4C0" />
        </mesh>
        {[-0.24, 0.24].map((x) => (
          <mesh key={x} position={[x, 0.02, 0]} rotation={[-0.6, 0, 0]}>
            <boxGeometry args={[0.42, 0.26, 0.015]} />
            <meshStandardMaterial color="#123A6B" emissive="#00D9FF" emissiveIntensity={0.25} metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
      </group>
      <mesh position={[0.2, 0.26, -0.75]}>
        <cylinderGeometry args={[0.012, 0.012, 0.5, 8]} />
        <meshStandardMaterial color="#AAB4C0" />
      </mesh>
      <mesh position={[0.2, 0.52, -0.75]} rotation={[0.6, 0, 0]}>
        <coneGeometry args={[0.12, 0.06, 24, 1, true]} />
        <meshStandardMaterial color="#F2F5F8" side={2} />
      </mesh>
      <group ref={rover} position={[1.05, 0.05, 0]}>
        <mesh>
          <boxGeometry args={[0.16, 0.07, 0.1]} />
          <meshStandardMaterial color="#FFD400" emissive="#FFD400" emissiveIntensity={0.3} />
        </mesh>
      </group>
      <mesh position={[0, 1.2, -1.6]}>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial color="#2A7BD8" emissive="#0A3A78" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}
