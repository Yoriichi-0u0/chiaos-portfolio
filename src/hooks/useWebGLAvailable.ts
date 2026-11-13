"use client";

import { useEffect, useState } from "react";

export function useWebGLAvailable() {
  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    let frameId = 0;

    try {
      const testCanvas = document.createElement("canvas");
      const context =
        testCanvas.getContext("webgl2") ??
        testCanvas.getContext("webgl") ??
        testCanvas.getContext("experimental-webgl");

      frameId = window.requestAnimationFrame(() => setAvailable(Boolean(context)));
    } catch {
      frameId = window.requestAnimationFrame(() => setAvailable(false));
    }

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  return available;
}
