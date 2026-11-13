import type { SystemSectionKey } from "@/types/portfolio";

export type DirectorNodeKey = "ai" | "cyber" | "cloud" | "database" | "software" | "networking";

export type DirectorNode = {
  key: DirectorNodeKey;
  label: string;
  kind: "sphere" | "box" | "torus" | "octa" | "dodeca" | "ico";
  color: string;
};

export type Formation = {
  label: string;
  status: string;
  core: [number, number, number];
  coreScale: number;
  accent: string;
  nodes: Record<DirectorNodeKey, [number, number, number]>;
  beam: [number, number, number][];
  path: [number, number, number][];
  connect: boolean;
};

export type SystemDirectorProps = {
  activeSection: SystemSectionKey;
  highlightedMissionId?: string | null;
  highlightedSkill?: string | null;
};
