"use client";

import { useMemo, useState } from "react";
import { Filter } from "lucide-react";
import { MissionCard } from "@/components/MissionCard";
import { missions } from "@/data/missions";
import type { MissionCategory } from "@/types/portfolio";
import { cn, uniqueValues } from "@/lib/utils";

type FilterValue = "All" | MissionCategory;

export function MissionFiles() {
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
    <section id="missions" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="font-code text-sm uppercase text-[#00D9FF]">mission files</p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-[#F8FAFC] sm:text-5xl">
              Project proof with direction.
            </h2>
            <p className="mt-4 text-[#AAB4C0]">
              The missions show where Chia has been building and where the next
              checkpoint can connect to real-world teams.
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
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredMissions.map((mission, index) => (
            <MissionCard key={mission.id} mission={mission} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
