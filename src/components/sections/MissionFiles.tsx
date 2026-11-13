"use client";

import { useMemo, useState } from "react";
import { Filter } from "lucide-react";
import { MissionCard } from "@/components/MissionCard";
import { MissionGallery } from "@/components/system/gallery/MissionGallery";
import { missions } from "@/data/missions";
import type { MissionCategory } from "@/types/portfolio";
import { cn, uniqueValues } from "@/lib/utils";

type FilterValue = "All" | MissionCategory;

type MissionFilesProps = {
  highlightedMissionId?: string | null;
  onMissionHover?: (missionId: string | null) => void;
};

export function MissionFiles({
  highlightedMissionId = null,
  onMissionHover,
}: MissionFilesProps) {
  const categories = useMemo<FilterValue[]>(
    () => ["All", ...uniqueValues(missions.map((mission) => mission.category))],
    []
  );
  const [activeCategory, setActiveCategory] = useState<FilterValue>("All");

  const filteredMissions =
    activeCategory === "All"
      ? missions
      : missions.filter((mission) => mission.category === activeCategory);

  return (
    <section
      id="missions"
      data-system-section
      className="system-section px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6">
          <div className="max-w-3xl">
            <p className="font-code text-sm uppercase text-[#00D9FF]">mission files</p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-[#F8FAFC] sm:text-5xl">
              Project proof, ranked for signal.
            </h2>
            <p className="mt-4 text-[#AAB4C0]">
              Each featured project has its own artifact. Pick one to inspect it in
              3D, then open its case study for the measured results and stated
              limits.
            </p>
          </div>
        </div>
        <MissionGallery onSelect={onMissionHover} />
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h3 className="font-display text-2xl font-semibold text-[#F8FAFC]">Full mission archive</h3>
          <div
            className="flex w-fit max-w-full flex-wrap items-center gap-1.5 rounded-2xl border border-white/12 bg-[#0B0F17] p-1.5"
            role="group"
            aria-label="Filter missions by category"
          >
            <span className="hidden h-9 items-center gap-2 px-3 text-sm text-[#AAB4C0] sm:inline-flex">
              <Filter className="h-4 w-4" aria-hidden />
              Filter
            </span>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
                className={cn(
                  "h-9 shrink-0 rounded-full px-3 text-sm font-medium transition",
                  activeCategory === category
                    ? "bg-[#FFD400] text-[#05070B] shadow-[0_0_18px_rgba(255,212,0,0.22)]"
                    : "text-[#AAB4C0] hover:bg-[#101624] hover:text-white"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredMissions.map((mission, index) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              index={index}
              highlighted={mission.id === highlightedMissionId}
              onHover={onMissionHover}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
