"use client";

import { useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, Mesh, MeshBasicMaterial } from "three";

const DURATION = 0.5;

function easeOutCubic(value: number) {
  return 1 - (1 - value) ** 3;
}

export function KernelMount({ reduceMotion, children }: { reduceMotion: boolean; children: ReactNode }) {
  const groupRef = useRef<Group>(null);
  const flashRef = useRef<Mesh>(null);
  const progress = useRef(reduceMotion ? 1 : 0);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) {
      return;
    }
    progress.current = reduceMotion ? 1 : Math.min(1, progress.current + delta / DURATION);
    const eased = easeOutCubic(progress.current);
    const scale = 0.55 + 0.45 * eased;
    group.scale.setScalar(scale);
    group.position.z = -0.5 * (1 - eased);
    const flash = flashRef.current;
    if (flash) {
      flash.visible = progress.current < 1;
      flash.scale.setScalar(0.2 + eased * 1.4);
      (flash.material as MeshBasicMaterial).opacity = 0.55 * (1 - eased);
    }
    if (progress.current < 1 && state.frameloop === "demand") {
      state.invalidate();
    }
  });

  return (
    <>
      <mesh ref={flashRef} position={[0, 0, -0.3]} visible={!reduceMotion}>
        <circleGeometry args={[0.5, 32]} />
        <meshBasicMaterial color="#FFD400" transparent opacity={0} depthWrite={false} toneMapped={false} />
      </mesh>
      <group ref={groupRef} scale={reduceMotion ? 1 : 0.55}>
        {children}
      </group>
    </>
  );
}
