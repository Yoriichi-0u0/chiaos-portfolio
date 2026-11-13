"use client";

import { useSyncExternalStore } from "react";

let galleryActive = false;
const listeners = new Set<() => void>();

export function setGalleryActive(active: boolean) {
  if (galleryActive === active) {
    return;
  }
  galleryActive = active;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useGalleryActive() {
  return useSyncExternalStore(
    subscribe,
    () => galleryActive,
    () => false
  );
}
