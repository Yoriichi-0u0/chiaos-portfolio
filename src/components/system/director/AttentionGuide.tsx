import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import type { Group } from "three";
import { Vector3 } from "three";
import type { Formation } from "./types";

export function samplePolyline(points: [number, number, number][], progress: number) {
  if (points.length <= 1) {
    return new Vector3(...(points[0] ?? [0, 0, 0]));
  }

  const segmentLengths = points.slice(0, -1).map((point, index) => {
    const nextPoint = points[index + 1];
    return new Vector3(...point).distanceTo(new Vector3(...nextPoint));
  });
  const totalLength = segmentLengths.reduce((total, length) => total + length, 0);
  let targetDistance = totalLength * progress;

  for (let index = 0; index < segmentLengths.length; index += 1) {
    const segmentLength = segmentLengths[index];

    if (targetDistance <= segmentLength || index === segmentLengths.length - 1) {
      const start = new Vector3(...points[index]);
      const end = new Vector3(...points[index + 1]);
      const localProgress = segmentLength === 0 ? 0 : targetDistance / segmentLength;
      return start.lerp(end, localProgress);
    }

    targetDistance -= segmentLength;
  }

  return new Vector3(...points[points.length - 1]);
}

export function AttentionGuide({
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
  const pulseRef = useRef<Group>(null);
  const endpointRef = useRef<Group>(null);
  const guidePoints = useMemo<[number, number, number][]>(() => {
    const [start, end] = formation.beam;
    const midpoint: [number, number, number] = [
      start[0] + (end[0] - start[0]) * (mobile ? 0.48 : 0.58),
      start[1] + (end[1] - start[1]) * (mobile ? 0.78 : 0.44) + (mobile ? 0.52 : 0.2),
      start[2] + 0.18,
    ];

    return [
      [start[0], start[1], start[2] + 0.22],
      midpoint,
      [end[0], end[1], end[2] + 0.1],
    ];
  }, [formation.beam, mobile]);
  const endpoint = guidePoints[guidePoints.length - 1];
  const start = guidePoints[0];
  const end = guidePoints[guidePoints.length - 1];
  const guideAngle = Math.atan2(end[1] - start[1], end[0] - start[0]);

  useFrame((state) => {
    if (endpointRef.current) {
      const scale = reduceMotion
        ? 1
        : 1 + Math.sin(state.clock.elapsedTime * (pulse ? 3.4 : 2.1)) * (mobile ? 0.08 : 0.12);

      endpointRef.current.scale.setScalar(scale);
      endpointRef.current.rotation.z += reduceMotion ? 0 : 0.008;
    }

    if (!pulseRef.current || reduceMotion) {
      return;
    }

    const progress = (state.clock.elapsedTime * (pulse ? 0.58 : 0.4)) % 1;
    const position = samplePolyline(guidePoints, progress);
    pulseRef.current.position.copy(position);
    pulseRef.current.rotation.z = guideAngle - Math.PI / 2;
  });

  return (
    <group>
      <Line
        points={guidePoints}
        color={formation.accent}
        lineWidth={mobile ? 2.8 : 5.6}
        transparent
        opacity={mobile ? 0.26 : 0.46}
      />
      <Line
        points={guidePoints.map(([x, y, z]) => [x, y - (mobile ? 0.08 : 0.14), z - 0.18] as [number, number, number])}
        color="#00D9FF"
        lineWidth={mobile ? 1.4 : 2.8}
        transparent
        opacity={mobile ? 0.2 : 0.32}
      />
      <Line
        points={guidePoints.map(([x, y, z]) => [x, y + (mobile ? 0.06 : 0.1), z + 0.1] as [number, number, number])}
        color="#B7F7FF"
        lineWidth={mobile ? 0.9 : 1.4}
        transparent
        opacity={mobile ? 0.16 : 0.24}
      />
      <group ref={endpointRef} position={endpoint} rotation={[Math.PI / 2, 0, guideAngle]}>
        <mesh>
          <torusGeometry args={[mobile ? 0.18 : 0.3, mobile ? 0.009 : 0.014, 8, mobile ? 42 : 64]} />
          <meshBasicMaterial color={formation.accent} transparent opacity={mobile ? 0.5 : 0.74} />
        </mesh>
        <mesh>
          <torusGeometry args={[mobile ? 0.3 : 0.5, mobile ? 0.005 : 0.008, 8, mobile ? 46 : 72]} />
          <meshBasicMaterial color="#00D9FF" transparent opacity={mobile ? 0.24 : 0.38} />
        </mesh>
      </group>
      <group ref={pulseRef} position={start}>
        <mesh>
          <sphereGeometry args={[mobile ? 0.055 : 0.085, mobile ? 14 : 18, mobile ? 10 : 12]} />
          <meshBasicMaterial color="#FFD400" transparent opacity={mobile ? 0.7 : 0.88} />
        </mesh>
        <mesh position={[0, mobile ? -0.11 : -0.16, 0]} rotation={[0, 0, 0]}>
          <coneGeometry args={[mobile ? 0.06 : 0.1, mobile ? 0.18 : 0.28, 3]} />
          <meshBasicMaterial color={formation.accent} transparent opacity={mobile ? 0.42 : 0.66} />
        </mesh>
      </group>
    </group>
  );
}
