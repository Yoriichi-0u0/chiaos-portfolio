"use client";

import { useEffect, useState } from "react";
import { Canvas, createPortal, useFrame, useThree, type DomEvent, type RootState } from "@react-three/fiber";
import { PerspectiveCamera, Scene, Vector2 } from "three";
import { DirectorScene } from "../director/DirectorScene";
import type { SystemDirectorProps } from "../director/types";
import { GalleryScene } from "../gallery/GalleryStage";
import { galleryArtifacts } from "../gallery/galleryData";
import { getGallerySlot, useGallerySlot } from "./gallerySlot";
import { createDirectorMask, createGalleryBackdrop, passCamera } from "./passes";

type WorldProps = Required<SystemDirectorProps> & { reduceMotion: boolean; mobile: boolean };

function createWorldResources() {
  return {
    directorScene: new Scene(),
    galleryScene: new Scene(),
    directorCamera: new PerspectiveCamera(50, 1, 0.1, 100),
    galleryCamera: new PerspectiveCamera(42, 1, 0.1, 100),
    mask: createDirectorMask(),
    backdrop: createGalleryBackdrop(),
    buffer: new Vector2(),
  };
}

type WorldResources = ReturnType<typeof createWorldResources>;

function setCameraPositions(world: WorldResources, mobile: boolean) {
  world.directorCamera.position.set(mobile ? 0 : 0.6, 0, mobile ? 6.3 : 5.6);
  world.galleryCamera.position.set(0, 0, mobile ? 4.6 : 4.1);
}

function setAccent(world: WorldResources, accent: string) {
  world.backdrop.material.uniforms.uAccent.value.set(accent);
}

function createGalleryCompute(camera: PerspectiveCamera) {
  return (event: DomEvent, state: RootState) => {
    const element = getGallerySlot()?.track.current;
    if (!element || !(event.target instanceof Node) || !element.contains(event.target)) {
      return;
    }
    const rect = element.getBoundingClientRect();
    const pointer = event as PointerEvent;
    state.pointer.set(
      ((pointer.clientX - rect.left) / rect.width) * 2 - 1,
      -((pointer.clientY - rect.top) / rect.height) * 2 + 1
    );
    state.raycaster.setFromCamera(state.pointer, camera);
  };
}

function renderWorld(world: WorldResources, state: RootState, element: HTMLDivElement | null | undefined, mobile: boolean) {
  const { gl, size } = state;
  const { directorScene, directorCamera, galleryScene, galleryCamera, mask, backdrop, buffer } = world;
  gl.info.reset();
  gl.autoClear = false;
  gl.setScissorTest(false);
  gl.setViewport(0, 0, size.width, size.height);
  gl.clear();

  if (directorCamera.aspect !== size.width / size.height) {
    directorCamera.aspect = size.width / size.height;
    directorCamera.updateProjectionMatrix();
  }
  gl.render(directorScene, directorCamera);
  gl.getDrawingBufferSize(buffer);
  mask.material.uniforms.uResolution.value.copy(buffer);
  mask.material.uniforms.uMobile.value = mobile ? 1 : 0;
  gl.render(mask.scene, passCamera);

  if (!element) {
    return;
  }
  const rect = element.getBoundingClientRect();
  if (rect.width < 1 || rect.bottom <= 0 || rect.top >= size.height) {
    return;
  }
  const bottom = size.height - rect.bottom;
  gl.setViewport(rect.left, bottom, rect.width, rect.height);
  gl.setScissor(rect.left, bottom, rect.width, rect.height);
  gl.setScissorTest(true);
  gl.clear();
  backdrop.material.uniforms.uSize.value.set(rect.width, rect.height);
  gl.render(backdrop.scene, passCamera);
  if (galleryCamera.aspect !== rect.width / rect.height) {
    galleryCamera.aspect = rect.width / rect.height;
    galleryCamera.updateProjectionMatrix();
  }
  gl.render(galleryScene, galleryCamera);
  gl.setScissorTest(false);
  window.__chiaosGalleryDraws = (window.__chiaosGalleryDraws ?? 0) + 1;
}

declare global {
  interface Window {
    __chiaosGalleryDraws?: number;
  }
}

function UnifiedWorld({
  world,
  activeSection,
  highlightedMissionId,
  highlightedSkill,
  reduceMotion,
  mobile,
}: WorldProps & { world: WorldResources }) {
  const slot = useGallerySlot();
  const invalidate = useThree((state) => state.invalidate);
  const [galleryMounted, setGalleryMounted] = useState(false);
  const [gallerySize, setGallerySize] = useState({ width: 1, height: 1, top: 0, left: 0 });

  useEffect(() => {
    setCameraPositions(world, mobile);
    invalidate();
  }, [world, mobile, invalidate]);

  useEffect(() => {
    if (slot?.near && !galleryMounted) {
      const frame = window.requestAnimationFrame(() => setGalleryMounted(true));
      return () => window.cancelAnimationFrame(frame);
    }
  }, [slot?.near, galleryMounted]);

  const track = slot?.track;
  useEffect(() => {
    const element = track?.current;
    if (!element) {
      return;
    }
    const observer = new ResizeObserver(() => {
      const rect = element.getBoundingClientRect();
      setGallerySize({ width: rect.width, height: rect.height, top: rect.top, left: rect.left });
    });
    observer.observe(element);
    const redraw = () => invalidate();
    window.addEventListener("scroll", redraw, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", redraw);
    };
  }, [track, invalidate]);

  const [compute] = useState(() => createGalleryCompute(world.galleryCamera));

  const accent = galleryArtifacts.find((item) => item.id === slot?.props.selected)?.accent ?? "#00D9FF";
  useEffect(() => {
    setAccent(world, accent);
    invalidate();
  }, [accent, world, invalidate]);

  useFrame((state) => {
    renderWorld(world, state, galleryMounted ? track?.current : null, mobile);
  }, 1);

  return (
    <>
      {createPortal(
        <DirectorScene
          activeSection={activeSection}
          highlightedMissionId={highlightedMissionId}
          highlightedSkill={highlightedSkill}
          reduceMotion={reduceMotion}
          mobile={mobile}
        />,
        world.directorScene,
        { camera: world.directorCamera }
      )}
      {galleryMounted && slot
        ? createPortal(<GalleryScene {...slot.props} />, world.galleryScene, {
            camera: world.galleryCamera,
            size: gallerySize,
            events: { compute, priority: 1 },
          })
        : null}
    </>
  );
}

export function UnifiedCanvas({ visible, ...props }: WorldProps & { visible: boolean }) {
  const [eventSource] = useState(() => document.body);
  const [world] = useState(createWorldResources);
  return (
    <Canvas
      aria-label="Scroll-guided ChiaOS System Director and mission gallery"
      className="absolute inset-0 h-full w-full"
      eventSource={eventSource}
      eventPrefix="client"
      dpr={props.mobile ? [1, 1.25] : [1, 1.6]}
      frameloop={!visible ? "never" : props.reduceMotion ? "demand" : "always"}
      gl={{ antialias: !props.mobile, powerPreference: "high-performance", alpha: true }}
      onCreated={({ gl }) => {
        gl.info.autoReset = false;
      }}
    >
      <UnifiedWorld world={world} {...props} />
    </Canvas>
  );
}
