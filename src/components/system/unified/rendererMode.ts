"use client";

import { useSyncExternalStore } from "react";

export type RendererMode = "dual" | "unified";

function readMode(): RendererMode {
  return new URLSearchParams(window.location.search).get("renderer") === "unified" ? "unified" : "dual";
}

export function useRendererMode(): RendererMode {
  return useSyncExternalStore(
    () => () => {},
    readMode,
    () => "dual"
  );
}
