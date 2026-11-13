"use client";

import { useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";

type ProbeSample = {
  frames: number[];
  total: number;
  info: { calls: number; triangles: number; geometries: number; textures: number; programs: number };
};

declare global {
  interface Window {
    __chiaosPerf?: Record<string, ProbeSample>;
  }
}

const enabled =
  process.env.NODE_ENV !== "production" ||
  (typeof window !== "undefined" && new URLSearchParams(window.location.search).has("perf"));

function Probe({ name }: { name: string }) {
  const gl = useThree((state) => state.gl);

  useEffect(() => {
    const store = (window.__chiaosPerf ??= {});
    store[name] = { frames: [], total: 0, info: { calls: 0, triangles: 0, geometries: 0, textures: 0, programs: 0 } };
    return () => {
      delete store[name];
    };
  }, [name]);

  useFrame((_, delta) => {
    const sample = window.__chiaosPerf?.[name];
    if (!sample) {
      return;
    }
    sample.frames.push(delta * 1000);
    sample.total += 1;
    if (sample.frames.length > 600) {
      sample.frames.shift();
    }
    sample.info = {
      calls: gl.info.render.calls,
      triangles: gl.info.render.triangles,
      geometries: gl.info.memory.geometries,
      textures: gl.info.memory.textures,
      programs: gl.info.programs?.length ?? 0,
    };
  });

  return null;
}

export function PerfProbe({ name }: { name: string }) {
  return enabled ? <Probe name={name} /> : null;
}
