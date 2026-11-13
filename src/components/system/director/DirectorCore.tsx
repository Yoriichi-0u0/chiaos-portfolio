import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { Vector3 } from "three";
import type { Formation } from "./types";
import { approach } from "./rig";
import { KernelDial } from "../kernel/KernelDial";
import { galleryArtifacts } from "../gallery/galleryData";

const dialAccents = galleryArtifacts.map((item) => item.accent);

export function DirectorCore({
  formation,
  reduceMotion,
  mobile,
  pulse,
  missionId = null,
}: {
  formation: Formation;
  reduceMotion: boolean;
  mobile: boolean;
  pulse: boolean;
  missionId?: string | null;
}) {
  const missionIndex = galleryArtifacts.findIndex((item) => item.id === missionId);
  const dialIndex = missionIndex >= 0 ? missionIndex : null;
  const accent = dialIndex === null ? formation.accent : dialAccents[dialIndex];
  const groupRef = useRef<Group>(null);
  const targetVector = useRef(new Vector3(...formation.core));
  const scaleVector = useRef(new Vector3(1, 1, 1));

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    targetVector.current.set(...formation.core);
    approach(groupRef.current.position, targetVector.current, reduceMotion, 0.07);

    const rhythm = reduceMotion ? 0 : Math.sin(state.clock.elapsedTime * (pulse ? 3.8 : 1.8)) * 0.045;
    const targetScale = (mobile ? 0.72 : 0.9) * formation.coreScale + rhythm;
    scaleVector.current.set(targetScale, targetScale, targetScale);
    approach(groupRef.current.scale, scaleVector.current, reduceMotion, 0.08);

    if (dialIndex !== null) {
      const rotation = groupRef.current.rotation;
      const settle = reduceMotion ? 1 : Math.min(1, delta * 4);
      rotation.z += Math.atan2(Math.sin(-rotation.z), Math.cos(-rotation.z)) * settle;
      rotation.y += Math.atan2(Math.sin(-rotation.y), Math.cos(-rotation.y)) * settle;
      if (state.frameloop === "demand" && Math.abs(rotation.z) + Math.abs(rotation.y) > 0.002) {
        state.invalidate();
      }
    } else if (!reduceMotion) {
      groupRef.current.rotation.z += delta * 0.22;
      groupRef.current.rotation.y += delta * (pulse ? 0.3 : 0.16);
    }
  });

  return (
    <group ref={groupRef} position={formation.core}>
      <mesh>
        <sphereGeometry args={[mobile ? 0.42 : 0.58, mobile ? 20 : 36, mobile ? 12 : 22]} />
        <meshBasicMaterial color={accent} transparent opacity={mobile ? 0.26 : 0.34} />
      </mesh>
      <mesh>
        <sphereGeometry args={[mobile ? 0.82 : 1.08, mobile ? 18 : 28, mobile ? 10 : 16]} />
        <meshBasicMaterial color="#00D9FF" transparent opacity={mobile ? 0.045 : 0.06} />
      </mesh>
      <mesh rotation={[0.08, 0.18, 0.18]}>
        <boxGeometry args={[mobile ? 0.52 : 0.66, mobile ? 0.52 : 0.66, mobile ? 0.09 : 0.12]} />
        <meshStandardMaterial
          color="#07111F"
          emissive={accent}
          emissiveIntensity={pulse ? 1.45 : 0.96}
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
      <group rotation={[0.35, 0.3, 0]}>
        <KernelDial
          radius={mobile ? 0.72 : 0.98}
          tube={mobile ? 0.014 : 0.018}
          accents={dialAccents}
          activeIndex={dialIndex}
          fallbackAccent={formation.accent}
          reduceMotion={reduceMotion}
          segments={mobile ? 60 : 82}
          opacity={mobile ? 0.5 : 0.62}
          idleSpin={0.25}
        />
      </group>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[mobile ? 0.56 : 0.74, mobile ? 0.01 : 0.014, 8, mobile ? 48 : 72]} />
        <meshBasicMaterial color="#00D9FF" transparent opacity={mobile ? 0.28 : 0.36} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0.4, 0.22]}>
        <torusGeometry args={[mobile ? 0.96 : 1.2, mobile ? 0.006 : 0.01, 8, mobile ? 64 : 92]} />
        <meshBasicMaterial color="#B7F7FF" transparent opacity={mobile ? 0.2 : 0.24} />
      </mesh>
    </group>
  );
}
