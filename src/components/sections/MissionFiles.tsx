"use client";

import { useMemo, useState } from "react";
import { Filter, Layers3 } from "lucide-react";
import { MissionCard } from "@/components/MissionCard";
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
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="font-code text-sm uppercase text-[#00D9FF]">mission files</p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-[#F8FAFC] sm:text-5xl">
              Project proof, ranked for signal.
            </h2>
            <p className="mt-4 text-[#AAB4C0]">
              COS30049, COS30018, and COS40007 lead the archive. The rest of the
              files stay available without pretending every placeholder is finished.
            </p>
          </div>
          <div
            className="flex max-w-full items-center gap-2 overflow-x-auto rounded-full border border-white/12 bg-[#0B0F17]/72 p-1 scrollbar-hide"
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
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {missions.slice(0, 3).map((mission, index) => (
            <a
              key={mission.id}
              href={`#${mission.id}`}
              onMouseEnter={() => onMissionHover?.(mission.id)}
              onMouseLeave={() => onMissionHover?.(null)}
              onFocus={() => onMissionHover?.(mission.id)}
              onBlur={() => onMissionHover?.(null)}
              className={cn(
                "group rounded-2xl border bg-[#0B0F17]/74 p-5 transition hover:border-[#00D9FF]/45",
                highlightedMissionId === mission.id
                  ? "border-[#FFD400]/55 shadow-[0_0_28px_rgba(255,212,0,0.12)]"
                  : "border-white/12"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-code text-xs uppercase text-[#FFD400]">
                    Priority 0{index + 1}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-[#F8FAFC]">
                    {mission.title}
                  </h3>
                </div>
                <Layers3 className="h-5 w-5 shrink-0 text-[#00D9FF]" aria-hidden />
              </div>
              <p className="mt-3 text-sm leading-6 text-[#AAB4C0]">
                {mission.role ?? mission.summary}
              </p>
            </a>
          ))}
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
