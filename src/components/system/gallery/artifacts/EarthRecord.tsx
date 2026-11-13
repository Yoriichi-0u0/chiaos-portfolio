import { useEffect, useMemo, useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import {
  Color,
  DataTexture,
  NearestFilter,
  Object3D,
  RGBAFormat,
  ShaderMaterial,
  type Group,
  type InstancedMesh,
} from "three";
import { gistempAnnual } from "@/data/gistemp";
import { anomalyColor } from "../galleryData";

const INNER = 0.36;
const OUTER = 0.94;
const COUNT = gistempAnnual.length;
const PIVOT: [number, number] = [1.28, 1.02];
const ARM = 1.38;

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uData;
  uniform float uCount;
  uniform float uYear;
  uniform float uTime;
  varying vec2 vUv;

  vec3 anomalyColor(float v) {
    vec3 vinyl = vec3(0.06, 0.075, 0.1);
    if (v < 0.0) {
      return mix(vinyl, vec3(0.1, 0.55, 0.95), clamp(-v / 0.45, 0.0, 1.0));
    }
    float w = clamp(v / 1.3, 0.0, 1.0);
    return w < 0.5
      ? mix(vinyl, vec3(1.0, 0.83, 0.0), w / 0.5)
      : mix(vec3(1.0, 0.83, 0.0), vec3(1.0, 0.32, 0.22), (w - 0.5) / 0.5);
  }

  void main() {
    vec2 p = vUv - 0.5;
    float r = length(p) * 2.0;
    float a = atan(p.y, p.x);
    vec3 col = vec3(0.028, 0.034, 0.046);

    float groove = 0.5 + 0.5 * sin(r * 520.0);
    col *= 0.78 + 0.32 * groove;

    if (r > ${INNER.toFixed(3)} && r < ${OUTER.toFixed(3)}) {
      float t = (${OUTER.toFixed(3)} - r) / ${(OUTER - INNER).toFixed(3)};
      float idx = floor(t * uCount);
      float v = texture2D(uData, vec2((idx + 0.5) / uCount, 0.5)).r * 2.0 - 0.6;
      float edge = smoothstep(0.0, 0.18, fract(t * uCount)) * smoothstep(1.0, 0.82, fract(t * uCount));
      vec3 band = anomalyColor(v);
      col = mix(col, band * (0.62 + 0.38 * groove), 0.72 * (0.55 + 0.45 * edge));

      float played = step(idx, uYear);
      col *= mix(0.62, 1.0, played);

      if (abs(idx - uYear) < 0.5) {
        col = mix(col, vec3(1.0), 0.6);
      }
    }

    if (r <= ${INNER.toFixed(3)}) {
      vec3 label = vec3(1.0, 0.83, 0.0);
      float ring = smoothstep(0.004, 0.0, abs(r - 0.26)) + smoothstep(0.004, 0.0, abs(r - 0.18));
      col = r < 0.3 ? mix(label * 0.88, vec3(0.04, 0.05, 0.07), ring * 0.8) : vec3(0.035, 0.04, 0.055);
      if (r < 0.035) {
        col = vec3(0.75, 0.8, 0.85);
      }
    }

    float sheen = pow(abs(cos(a - 0.8)), 28.0) * 0.32 + pow(abs(cos(a + 2.2)), 60.0) * 0.18;
    col += sheen * vec3(0.55, 0.82, 0.95) * step(0.3, r) * (0.4 + 0.6 * groove);
    col += smoothstep(0.965, 1.0, r) * 0.12;

    if (r > 1.0) {
      discard;
    }

    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;

function radiusForIndex(index: number) {
  return OUTER - ((index + 0.5) / COUNT) * (OUTER - INNER);
}

function armAngleForRadius(radius: number) {
  const pivotLength = Math.hypot(PIVOT[0], PIVOT[1]);
  const phi = Math.atan2(PIVOT[1], PIVOT[0]);
  const cosine = (radius * radius - pivotLength * pivotLength - ARM * ARM) / (2 * ARM * pivotLength);
  return phi + Math.acos(Math.max(-1, Math.min(1, cosine)));
}

export function EarthRecord({
  year,
  playing,
  reduceMotion,
  onYearChange,
}: {
  year: number;
  playing: boolean;
  reduceMotion: boolean;
  onYearChange: (index: number, fromPointer: boolean) => void;
}) {
  const barsRef = useRef<InstancedMesh>(null);
  const spinRef = useRef<Group>(null);
  const armRef = useRef<Group>(null);
  const playhead = useRef(year);
  const lastReported = useRef(year);
  const highlighted = useRef(-1);
  const materialRef = useRef<ShaderMaterial>(null);

  const texture = useMemo(() => {
    const data = new Uint8Array(COUNT * 4);
    gistempAnnual.forEach((value, index) => {
      const encoded = Math.round(Math.max(0, Math.min(1, (value + 0.6) / 2)) * 255);
      data.set([encoded, encoded, encoded, 255], index * 4);
    });
    const dataTexture = new DataTexture(data, COUNT, 1, RGBAFormat);
    dataTexture.magFilter = NearestFilter;
    dataTexture.minFilter = NearestFilter;
    dataTexture.needsUpdate = true;
    return dataTexture;
  }, []);

  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uData: { value: texture },
          uCount: { value: COUNT },
          uYear: { value: year },
          uTime: { value: 0 },
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [texture]
  );

  useEffect(
    () => () => {
      material.dispose();
      texture.dispose();
    },
    [material, texture]
  );

  useEffect(() => {
    if (!playing) {
      playhead.current = year;
    }
  }, [playing, year]);

  useEffect(() => {
    const bars = barsRef.current;
    if (!bars) {
      return;
    }

    const dummy = new Object3D();
    const color = new Color();
    gistempAnnual.forEach((value, index) => {
      const angle = (index / COUNT) * Math.PI * 2;
      const length = 0.035 + Math.max(0, value + 0.5) * 0.15;
      const radius = 1.05 + length / 2;
      dummy.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0.01);
      dummy.rotation.set(0, 0, angle);
      dummy.scale.set(length, 1, 1);
      dummy.updateMatrix();
      bars.setMatrixAt(index, dummy.matrix);
      bars.setColorAt(index, color.setRGB(...anomalyColor(value)));
    });
    bars.instanceMatrix.needsUpdate = true;
    if (bars.instanceColor) {
      bars.instanceColor.needsUpdate = true;
    }
  }, []);

  useFrame((state, delta) => {
    if (playing && !reduceMotion) {
      playhead.current = (playhead.current + delta * 7) % COUNT;
      const index = Math.floor(playhead.current);
      if (index !== lastReported.current) {
        lastReported.current = index;
        onYearChange(index, false);
      }
    }

    const index = playing && !reduceMotion ? Math.floor(playhead.current) : year;
    const shader = materialRef.current;
    if (shader) {
      shader.uniforms.uYear.value = index;
      shader.uniforms.uTime.value = state.clock.elapsedTime;
    }

    const bars = barsRef.current;
    if (bars && highlighted.current !== index) {
      const color = new Color();
      if (highlighted.current >= 0) {
        bars.setColorAt(highlighted.current, color.setRGB(...anomalyColor(gistempAnnual[highlighted.current])));
      }
      bars.setColorAt(index, color.set("#FFFFFF"));
      highlighted.current = index;
      if (bars.instanceColor) {
        bars.instanceColor.needsUpdate = true;
      }
    }

    if (spinRef.current && !reduceMotion) {
      spinRef.current.rotation.z -= delta * 0.12;
    }

    if (armRef.current) {
      const target = armAngleForRadius(radiusForIndex(index));
      armRef.current.rotation.z = reduceMotion
        ? target
        : armRef.current.rotation.z + (target - armRef.current.rotation.z) * Math.min(1, delta * 10);
    }
  });

  function scrub(event: ThreeEvent<PointerEvent>) {
    if (!event.uv) {
      return;
    }
    const radius = Math.hypot(event.uv.x - 0.5, event.uv.y - 0.5) * 2;
    if (radius < INNER || radius > OUTER) {
      return;
    }
    event.stopPropagation();
    const index = Math.min(COUNT - 1, Math.max(0, Math.floor(((OUTER - radius) / (OUTER - INNER)) * COUNT)));
    if (index !== lastReported.current) {
      lastReported.current = index;
      onYearChange(index, true);
    }
  }

  return (
    <group rotation={[-0.62, 0, 0.08]} position={[-0.08, 0.02, 0]} scale={1.02}>
      <mesh position={[0, 0, -0.06]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.3, 1.34, 0.08, 96]} />
        <meshStandardMaterial color="#0B0F17" metalness={0.7} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0, -0.012]}>
        <torusGeometry args={[1.31, 0.01, 8, 128]} />
        <meshBasicMaterial color="#00D9FF" />
      </mesh>
      <mesh onPointerMove={scrub}>
        <circleGeometry args={[1, 128]} />
        <primitive object={material} ref={materialRef} attach="material" />
      </mesh>
      <group ref={spinRef}>
        <instancedMesh ref={barsRef} args={[undefined, undefined, COUNT]}>
          <boxGeometry args={[1, 0.016, 0.02]} />
          <meshBasicMaterial toneMapped={false} />
        </instancedMesh>
      </group>
      <group position={[PIVOT[0], PIVOT[1], 0.06]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.14, 0.1, 32]} />
          <meshStandardMaterial color="#AAB4C0" metalness={0.9} roughness={0.25} />
        </mesh>
        <group ref={armRef} rotation={[0, 0, armAngleForRadius(radiusForIndex(year))]}>
          <mesh position={[ARM / 2, 0, 0.07]}>
            <boxGeometry args={[ARM, 0.028, 0.028]} />
            <meshStandardMaterial color="#D9E2EC" metalness={0.95} roughness={0.2} />
          </mesh>
          <mesh position={[ARM, 0, 0.05]}>
            <boxGeometry args={[0.12, 0.07, 0.05]} />
            <meshStandardMaterial color="#FFD400" emissive="#FFD400" emissiveIntensity={0.6} />
          </mesh>
          <mesh position={[-0.16, 0, 0.07]}>
            <cylinderGeometry args={[0.06, 0.06, 0.1, 24]} />
            <meshStandardMaterial color="#5B6573" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
