"use client";

import { useState } from "react";
import { CommandPalette } from "@/components/CommandPalette";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SystemDirector } from "@/components/system/SystemDirector";
import { SystemScrollProgress } from "@/components/system/SystemScrollProgress";
import { AskChiaOS } from "@/components/sections/AskChiaOS";
import { BootScreen } from "@/components/sections/BootScreen";
import { BuildLogs } from "@/components/sections/BuildLogs";
import { CareerSnapshot } from "@/components/sections/CareerSnapshot";
import { CareerTimeline } from "@/components/sections/CareerTimeline";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { LifeOS } from "@/components/sections/LifeOS";
import { MissionFiles } from "@/components/sections/MissionFiles";
import { OperationsModule } from "@/components/sections/OperationsModule";
import { Roadmap } from "@/components/sections/Roadmap";
import { SkillSystem } from "@/components/sections/SkillSystem";
import { useActiveSection } from "@/hooks/useActiveSection";

export function ChiaOSApp() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [highlightedMissionId, setHighlightedMissionId] = useState<string | null>(null);
  const [highlightedSkill, setHighlightedSkill] = useState<string | null>(null);
  const activeSection = useActiveSection();

  return (
    <div
      className="relative min-h-screen overflow-x-hidden bg-[#05070B] text-[#F8FAFC]"
      data-system-state="activated"
    >
      <SystemScrollProgress />
      <SystemDirector
        activeSection={activeSection}
        highlightedMissionId={highlightedMissionId}
        highlightedSkill={highlightedSkill}
      />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar onCommandOpen={() => setCommandOpen(true)} />
      <CommandPalette
        open={commandOpen}
        onOpenChange={setCommandOpen}
      />
      <main id="main-content" tabIndex={-1} className="relative z-10">
        <div className="system-radial overflow-hidden">
          <BootScreen />
          <Hero />
          <CareerSnapshot />
          <OperationsModule />
          <MissionFiles
            highlightedMissionId={highlightedMissionId}
            onMissionHover={setHighlightedMissionId}
          />
          <SkillSystem
            highlightedSkill={highlightedSkill}
            onSkillHover={setHighlightedSkill}
          />
          <LifeOS />
          <CareerTimeline />
          <BuildLogs />
          <Roadmap />
          <AskChiaOS />
          <Contact />
        </div>
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
