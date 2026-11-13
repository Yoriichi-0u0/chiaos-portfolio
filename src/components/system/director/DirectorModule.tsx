import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { Vector3 } from "three";
import { SemanticCategorySymbol } from "./symbols";
import type { DirectorNode } from "./types";

export function DirectorModule({
  node,
  target,
  active,
  highlighted,
  reduceMotion,
  mobile,
  quiet,
}: {
  node: DirectorNode;
  target: [number, number, number];
  active: boolean;
  highlighted: boolean;
  reduceMotion: boolean;
  mobile: boolean;
  quiet: boolean;
}) {
  const groupRef = useRef<Group>(null);
  const targetVector = useRef(new Vector3(...target));
  const scaleVector = useRef(new Vector3(1, 1, 1));

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    targetVector.current.set(target[0], target[1], target[2] + (highlighted ? 0.56 : active ? 0.22 : 0));
    groupRef.current.position.lerp(targetVector.current, reduceMotion ? 0.35 : 0.075);

    const pulse = reduceMotion ? 0 : Math.sin(state.clock.elapsedTime * 2.8) * (highlighted ? 0.06 : 0.03);
    const baseScale = quiet ? (mobile ? 0.58 : 0.74) : (mobile ? 0.76 : 0.98);
    const stateScale = highlighted ? (quiet ? 1.24 : 1.5) : active ? (quiet ? 1.08 : 1.28) : quiet ? 0.72 : 0.95;
    const targetScale = baseScale * stateScale + pulse;
    scaleVector.current.set(targetScale, targetScale, targetScale);
    groupRef.current.scale.lerp(scaleVector.current, reduceMotion ? 0.35 : 0.08);

    if (!reduceMotion) {
      groupRef.current.rotation.x += delta * (active ? 0.38 : 0.18);
      groupRef.current.rotation.y += delta * (highlighted ? 0.58 : 0.24);
    }
  });

  return (
    <group ref={groupRef} position={target}>
      <SemanticCategorySymbol
        node={node}
        active={active}
        highlighted={highlighted}
        mobile={mobile}
      />
    </group>
  );
}
