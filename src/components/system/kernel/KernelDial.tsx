"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Color, type Group, type MeshBasicMaterial } from "three";

const ARC = Math.PI * 1.5;
const ARC_START = Math.PI / 4;
const NOTCH_STEP = ARC / 6;
const IDLE_NOTCH = "#64748B";

export function notchAngle(index: number) {
  return ARC_START + (index + 0.5) * NOTCH_STEP;
}

export function dialRotationFor(index: number) {
  return Math.PI / 2 - notchAngle(index);
}

function shortestDelta(from: number, to: number) {
  return Math.atan2(Math.sin(to - from), Math.cos(to - from));
}

export function KernelDial({
  radius,
  tube,
  accents,
  activeIndex,
  fallbackAccent,
  reduceMotion,
  segments = 96,
  opacity = 0.7,
  idleSpin = 0,
}: {
  radius: number;
  tube: number;
  accents: string[];
  activeIndex: number | null;
  fallbackAccent: string;
  reduceMotion: boolean;
  segments?: number;
  opacity?: number;
  idleSpin?: number;
}) {
  const dialRef = useRef<Group>(null);
  const arcRef = useRef<MeshBasicMaterial>(null);
  const notchRefs = useRef<Array<MeshBasicMaterial | null>>([]);
  const notchGroups = useRef<Array<Group | null>>([]);
  const target = useRef(new Color());
  const scratch = useRef(new Color());

  useFrame((state, delta) => {
    const dial = dialRef.current;
    const arc = arcRef.current;
    if (!dial || !arc) {
      return;
    }
    const step = reduceMotion ? 1 : Math.min(1, delta * 5);
    let settling = false;

    if (activeIndex === null) {
      if (!reduceMotion && idleSpin) {
        dial.rotation.z += delta * idleSpin;
      }
    } else {
      const remaining = shortestDelta(dial.rotation.z, dialRotationFor(activeIndex));
      dial.rotation.z += remaining * step;
      settling ||= Math.abs(remaining) > 0.002;
    }

    target.current.set(activeIndex === null ? fallbackAccent : accents[activeIndex]);
    arc.color.lerp(target.current, step);
    settling ||= Math.abs(arc.color.r - target.current.r) + Math.abs(arc.color.g - target.current.g) + Math.abs(arc.color.b - target.current.b) > 0.004;

    accents.forEach((accent, index) => {
      const material = notchRefs.current[index];
      const group = notchGroups.current[index];
      if (!material || !group) {
        return;
      }
      const on = index === activeIndex;
      scratch.current.set(on ? accent : IDLE_NOTCH);
      material.color.lerp(scratch.current, step);
      const length = on ? 1 : 0.45;
      group.scale.y += (length - group.scale.y) * step;
      settling ||= Math.abs(length - group.scale.y) > 0.002;
    });

    if (settling && state.frameloop === "demand") {
      state.invalidate();
    }
  });

  const notchLength = radius * 0.16;

  return (
    <group ref={dialRef} rotation={[0, 0, activeIndex === null ? 0 : dialRotationFor(activeIndex)]}>
      <mesh rotation={[0, 0, ARC_START]}>
        <torusGeometry args={[radius, tube, 6, segments, ARC]} />
        <meshBasicMaterial ref={arcRef} color={fallbackAccent} transparent opacity={opacity} toneMapped={false} />
      </mesh>
      {accents.map((accent, index) => {
        const angle = notchAngle(index);
        return (
          <group
            key={accent + index}
            ref={(node) => {
              notchGroups.current[index] = node;
            }}
            position={[Math.cos(angle) * (radius + notchLength * 0.62), Math.sin(angle) * (radius + notchLength * 0.62), 0]}
            rotation={[0, 0, angle - Math.PI / 2]}
            scale={[1, index === activeIndex ? 1 : 0.45, 1]}
          >
            <mesh>
              <boxGeometry args={[tube * 3.2, notchLength, tube * 2]} />
              <meshBasicMaterial
                ref={(node) => {
                  notchRefs.current[index] = node;
                }}
                color={index === activeIndex ? accent : IDLE_NOTCH}
                transparent
                opacity={Math.min(1, opacity + 0.2)}
                toneMapped={false}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
