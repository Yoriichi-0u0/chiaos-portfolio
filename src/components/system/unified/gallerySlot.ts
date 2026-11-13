"use client";

import { useSyncExternalStore, type RefObject } from "react";
import type { GallerySceneProps } from "../gallery/GalleryStage";

export type GallerySlot = {
  track: RefObject<HTMLDivElement | null>;
  near: boolean;
  props: GallerySceneProps;
} | null;

let slot: GallerySlot = null;
const listeners = new Set<() => void>();

export function setGallerySlot(next: GallerySlot) {
  slot = next;
  listeners.forEach((listener) => listener());
}

export function getGallerySlot() {
  return slot;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useGallerySlot() {
  return useSyncExternalStore(subscribe, getGallerySlot, () => null);
}
