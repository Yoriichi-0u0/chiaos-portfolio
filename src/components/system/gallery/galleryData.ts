import { Disc3, Feather, Files, Mountain, Orbit, Waypoints, type LucideIcon } from "lucide-react";

export type GalleryArtifactId =
  | "earth-fm"
  | "fingence"
  | "bird-species-classification"
  | "sarawak-tourism-information-system"
  | "pagepilot"
  | "little-orbit";

export type GalleryArtifact = {
  id: GalleryArtifactId;
  short: string;
  artifact: string;
  accent: string;
  icon: LucideIcon;
  reading: string;
  dataNote: string;
};

export const galleryArtifacts: GalleryArtifact[] = [
  {
    id: "earth-fm",
    short: "Earth FM",
    artifact: "Earth data record",
    accent: "#FF7959",
    icon: Disc3,
    reading:
      "Each groove ring is one year of global temperature, 1880 on the outer edge to 2025 at the label. Blue years were cooler than the 1951–1980 average; gold to red years were warmer. The tonearm plays the record year by year, like Earth FM turns observations into sound.",
    dataNote: "Real data: NASA GISS GISTEMP v4 annual anomalies, as bundled in the Earth FM repository.",
  },
  {
    id: "fingence",
    short: "FinGence",
    artifact: "Reconciliation lattice",
    accent: "#00D9FF",
    icon: Waypoints,
    reading:
      "Bank rows on the left, ledger rows on the right. Cyan pathways are matched pairs carrying row-level evidence; gold rows have no counterpart and wait for human review.",
    dataNote: "Illustrative layout of the reconciliation flow, not client or PoC data.",
  },
  {
    id: "bird-species-classification",
    short: "Bird classifier",
    artifact: "Feature-field feather",
    accent: "#B7F7FF",
    icon: Feather,
    reading:
      "A procedural feather built from particles along a gold shaft. The gold band sweeping along the barbs stands for the convolutional features EfficientNetB3 reads to separate 200 closely related species.",
    dataNote: "Illustrative. Measured results are in the case study.",
  },
  {
    id: "sarawak-tourism-information-system",
    short: "Sarawak Tourism",
    artifact: "Trip-planner diorama",
    accent: "#7BE495",
    icon: Mountain,
    reading:
      "A stylised highland tile with a river and a gold day-by-day route, echoing the prototype's search, compare and trip-planning workflow.",
    dataNote: "Illustrative terrain, not a map of Sarawak.",
  },
  {
    id: "pagepilot",
    short: "PagePilot",
    artifact: "Floating document stack",
    accent: "#FFD400",
    icon: Files,
    reading:
      "Pages fan out, one page is reordered, and the stack merges back into one document, the core PDF operations PagePilot runs locally in the browser.",
    dataNote: "Illustrative. No documents are loaded.",
  },
  {
    id: "little-orbit",
    short: "Little Orbit",
    artifact: "Lunar outpost",
    accent: "#C9D2DC",
    icon: Orbit,
    reading:
      "A miniature Moon base with habitat, dome and solar arrays, the outpost students build and keep alive over 14 turns of power, oxygen, water and food.",
    dataNote: "Illustrative scene based on the game's premise.",
  },
];

export function anomalyColor(value: number): [number, number, number] {
  const vinyl: [number, number, number] = [0.06, 0.075, 0.1];
  const mix = (a: [number, number, number], b: [number, number, number], t: number) =>
    [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t] as [number, number, number];

  if (value < 0) {
    return mix(vinyl, [0.1, 0.55, 0.95], Math.min(1, -value / 0.45));
  }

  const warm = Math.min(1, value / 1.3);
  return warm < 0.5
    ? mix(vinyl, [1, 0.83, 0], warm / 0.5)
    : mix([1, 0.83, 0], [1, 0.32, 0.22], (warm - 0.5) / 0.5);
}

export function toHex([r, g, b]: [number, number, number]) {
  const channel = (value: number) => Math.round(Math.max(0, Math.min(1, value)) * 255).toString(16).padStart(2, "0");
  return `#${channel(r)}${channel(g)}${channel(b)}`;
}
