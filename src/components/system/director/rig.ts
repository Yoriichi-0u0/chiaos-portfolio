import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, Material } from "three";
import { Vector3 } from "three";

export function applyGroupOpacity(group: Group, opacity: number) {
  group.traverse((object) => {
    const material = (object as { material?: Material | Material[] }).material;

    if (!material) {
      return;
    }

    const materials = Array.isArray(material) ? material : [material];
    materials.forEach((item) => {
      if (typeof item.userData.baseOpacity !== "number") {
        item.userData.baseOpacity = typeof item.opacity === "number" ? item.opacity : 1;
      }

      if (!item.transparent) {
        item.transparent = true;
        item.needsUpdate = true;
      }

      item.opacity = item.userData.baseOpacity * opacity;
    });
  });
}

export function useSemanticRig({
  active,
  reduceMotion,
  mobile,
  position = [0, 0, 0],
  activeScale = 1,
  idleScale = 0.78,
  rotationSpeed = 0.05,
}: {
  active: boolean;
  reduceMotion: boolean;
  mobile: boolean;
  position?: [number, number, number];
  activeScale?: number;
  idleScale?: number;
  rotationSpeed?: number;
}) {
  const groupRef = useRef<Group>(null);
  const opacityRef = useRef(active ? 1 : 0);
  const appliedOpacityRef = useRef(-1);
  const targetPosition = useRef(new Vector3(...position));
  const targetScale = useRef(new Vector3(1, 1, 1));

  useFrame((_state, delta) => {
    if (!groupRef.current) {
      return;
    }

    const speed = reduceMotion ? 1 : Math.min(1, delta * 4.5);
    opacityRef.current += ((active ? 1 : 0) - opacityRef.current) * speed;

    if (Math.abs(opacityRef.current - (active ? 1 : 0)) < 0.002) {
      opacityRef.current = active ? 1 : 0;
    }

    groupRef.current.visible = opacityRef.current > 0.025;

    if (groupRef.current.visible && appliedOpacityRef.current !== opacityRef.current) {
      applyGroupOpacity(groupRef.current, opacityRef.current);
      appliedOpacityRef.current = opacityRef.current;
    }

    targetPosition.current.set(...position);
    groupRef.current.position.lerp(targetPosition.current, reduceMotion ? 0.35 : 0.08);

    const scale = (mobile ? 0.82 : 1) * (active ? activeScale : idleScale);
    targetScale.current.set(scale, scale, scale);
    groupRef.current.scale.lerp(targetScale.current, reduceMotion ? 0.35 : 0.08);

    if (!reduceMotion && active) {
      groupRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return groupRef;
}
