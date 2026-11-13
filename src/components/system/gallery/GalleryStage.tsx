"use client";

import { useEffect, type ReactNode } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { PresentationControls } from "@react-three/drei";
import { EarthRecord } from "./artifacts/EarthRecord";
import { DocumentStack, FeatherField, LedgerLattice, LunarOutpost, TerrainDiorama } from "./artifacts/ProjectArtifacts";
import { galleryArtifacts, type GalleryArtifactId } from "./galleryData";
import { KernelDial } from "../kernel/KernelDial";
import { KernelMount } from "../kernel/KernelMount";

const dialAccents = galleryArtifacts.map((item) => item.accent);
import { PerfProbe } from "../PerfProbe";
import { usePageVisible } from "@/hooks/usePageVisible";

function DemandInvalidator({ deps }: { deps: unknown[] }) {
  const invalidate = useThree((state) => state.invalidate);
  useEffect(() => {
    invalidate(2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invalidate, ...deps]);
  return null;
}

export function GalleryStage({
  selected,
  year,
  playing,
  reduceMotion,
  mobile,
  active = true,
  onYearChange,
  onPlaybackEnd,
}: {
  selected: GalleryArtifactId;
  year: number;
  playing: boolean;
  reduceMotion: boolean;
  mobile: boolean;
  active?: boolean;
  onYearChange: (index: number, fromPointer: boolean) => void;
  onPlaybackEnd: () => void;
}) {
  const visible = usePageVisible();
  let artifact: ReactNode;
  switch (selected) {
    case "earth-fm":
      artifact = (
        <EarthRecord
          year={year}
          playing={playing}
          reduceMotion={reduceMotion}
          onYearChange={onYearChange}
          onPlaybackEnd={onPlaybackEnd}
        />
      );
      break;
    case "fingence":
      artifact = <LedgerLattice reduceMotion={reduceMotion} />;
      break;
    case "bird-species-classification":
      artifact = <FeatherField reduceMotion={reduceMotion} />;
      break;
    case "sarawak-tourism-information-system":
      artifact = <TerrainDiorama reduceMotion={reduceMotion} />;
      break;
    case "pagepilot":
      artifact = <DocumentStack reduceMotion={reduceMotion} />;
      break;
    default:
      artifact = <LunarOutpost reduceMotion={reduceMotion} />;
  }

  return (
    <Canvas
      className="absolute inset-0 h-full w-full"
      camera={{ position: [0, 0, mobile ? 4.6 : 4.1], fov: 42 }}
      dpr={mobile ? [1, 1.5] : [1, 2]}
      frameloop={!visible || !active ? "never" : reduceMotion ? "demand" : "always"}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
    >
      <DemandInvalidator deps={[selected, year, playing, mobile, active]} />
      <PerfProbe name="gallery" />
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      <pointLight position={[-3, 1, 3]} color="#00D9FF" intensity={10} distance={12} />
      <pointLight position={[3, -1, 2]} color="#FFD400" intensity={6} distance={10} />
      <group position={[0, 0, -1.1]}>
        <KernelDial
          radius={mobile ? 1.62 : 1.78}
          tube={0.012}
          accents={dialAccents}
          activeIndex={Math.max(0, galleryArtifacts.findIndex((item) => item.id === selected))}
          fallbackAccent="#00D9FF"
          reduceMotion={reduceMotion}
          opacity={0.55}
        />
      </group>
      <PresentationControls
        key={selected}
        enabled={!reduceMotion}
        cursor={false}
        snap
        speed={1.2}
        polar={[-0.3, 0.3]}
        azimuth={[-0.6, 0.6]}
      >
        <KernelMount reduceMotion={reduceMotion}>{artifact}</KernelMount>
      </PresentationControls>
    </Canvas>
  );
}
