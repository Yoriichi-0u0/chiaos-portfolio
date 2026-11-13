import type { SystemSectionKey } from "@/types/portfolio";
import type { DirectorNodeKey } from "./types";

export const sectionNodeFocus: Record<SystemSectionKey, DirectorNodeKey> = {
  hero: "software",
  identity: "ai",
  education: "ai",
  operations: "networking",
  missions: "software",
  skills: "ai",
  "life-os": "software",
  timeline: "cloud",
  "build-logs": "database",
  roadmap: "cloud",
  ask: "ai",
  contact: "networking",
};

export const missionNodeMap: Record<string, DirectorNodeKey> = {
  "earth-fm": "cloud",
  fingence: "database",
  "bird-species-classification": "ai",
  "sarawak-tourism-information-system": "software",
  pagepilot: "cyber",
  "little-orbit": "networking",
  "cos30049-computing-technology-innovation-project": "ai",
  "aws-cloud-architecture": "cloud",
  "automated-negotiation-system": "software",
  "database-design-project": "database",
  "networking-switching-portfolio": "networking",
};

export function nodeForSkill(skillName: string | null | undefined): DirectorNodeKey | null {
  const normalized = skillName?.toLowerCase() ?? "";

  if (!normalized) {
    return null;
  }

  if (normalized.includes("python") || normalized.includes("machine") || normalized.includes("vision")) {
    return "ai";
  }

  if (normalized.includes("vlan") || normalized.includes("stp") || normalized.includes("secure")) {
    return "cyber";
  }

  if (normalized.includes("aws") || normalized.includes("cloud")) {
    return "cloud";
  }

  if (normalized.includes("database") || normalized.includes("sql")) {
    return "database";
  }

  if (normalized.includes("operational")) {
    return "networking";
  }

  return "software";
}

export const missionModules: Array<{
  id: string;
  key: DirectorNodeKey;
  position: [number, number, number];
}> = [
  { id: "earth-fm", key: "cloud", position: [-1.25, 0.76, 0.2] },
  { id: "fingence", key: "database", position: [0.2, 1.02, -0.08] },
  { id: "bird-species-classification", key: "ai", position: [1.52, 0.56, 0.14] },
  { id: "sarawak-tourism-information-system", key: "software", position: [-0.5, -0.72, 0.08] },
  { id: "pagepilot", key: "cyber", position: [1.12, -0.88, -0.06] },
];
