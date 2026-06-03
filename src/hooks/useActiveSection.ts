"use client";

import { useEffect, useMemo, useState } from "react";
import type { SystemSectionKey } from "@/types/portfolio";

export const systemSectionIds: SystemSectionKey[] = [
  "hero",
  "identity",
  "education",
  "operations",
  "missions",
  "skills",
  "life-os",
  "timeline",
  "build-logs",
  "roadmap",
  "ask",
  "contact",
];

export function useActiveSection(
  sections: SystemSectionKey[] = systemSectionIds,
  fallback: SystemSectionKey = "hero"
) {
  const [activeSection, setActiveSection] = useState<SystemSectionKey>(fallback);
  const sectionKey = useMemo(() => sections.join("|"), [sections]);

  useEffect(() => {
    const sectionElements = sections
      .map((section) => document.getElementById(section))
      .filter((element): element is HTMLElement => Boolean(element));

    if (sectionElements.length === 0) {
      return;
    }

    let frameId = 0;

    function updateActiveSection() {
      const guideY = window.innerHeight * 0.42;
      const lastSection = sections[sections.length - 1] ?? fallback;
      const firstContentSection = document.getElementById("identity");
      const pageBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 12;

      if (
        firstContentSection &&
        window.scrollY < Math.max(24, firstContentSection.offsetTop - 96)
      ) {
        setActiveSection(fallback);
        return;
      }

      if (pageBottom) {
        setActiveSection(lastSection);
        return;
      }

      const nextSection =
        sectionElements
          .map((element) => {
            const rect = element.getBoundingClientRect();
            const containsGuide = rect.top <= guideY && rect.bottom >= guideY;
            const distance = containsGuide
              ? 0
              : Math.min(Math.abs(rect.top - guideY), Math.abs(rect.bottom - guideY));

            return {
              distance,
              section: element.id as SystemSectionKey,
            };
          })
          .sort((a, b) => a.distance - b.distance)[0]?.section ?? fallback;

      setActiveSection(nextSection);
    }

    function scheduleUpdate() {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateActiveSection);
    }

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
    // sectionKey deliberately represents the stable section list for scroll tracking.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionKey]);

  useEffect(() => {
    document.querySelectorAll<HTMLElement>("[data-system-section]").forEach((element) => {
      element.dataset.active = element.id === activeSection ? "true" : "false";
    });
  }, [activeSection]);

  return activeSection;
}
