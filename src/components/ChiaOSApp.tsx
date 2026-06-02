"use client";

import { useState } from "react";
import { CommandPalette } from "@/components/CommandPalette";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SystemScrollProgress } from "@/components/system/SystemScrollProgress";
import { AskChiaOS } from "@/components/sections/AskChiaOS";
import { BootScreen } from "@/components/sections/BootScreen";
import { BuildLogs } from "@/components/sections/BuildLogs";
import { CareerSnapshot } from "@/components/sections/CareerSnapshot";
import { CareerTimeline } from "@/components/sections/CareerTimeline";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { MissionFiles } from "@/components/sections/MissionFiles";
import { Roadmap } from "@/components/sections/Roadmap";
import { SkillSystem } from "@/components/sections/SkillSystem";

export function ChiaOSApp() {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#05070B] text-[#F8FAFC]" data-system-state="activated">
      <SystemScrollProgress />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar onCommandOpen={() => setCommandOpen(true)} />
      <CommandPalette
        open={commandOpen}
        onOpenChange={setCommandOpen}
      />
      <main id="main-content" tabIndex={-1}>
        <div className="system-radial overflow-hidden">
          <BootScreen />
          <Hero />
          <CareerSnapshot />
          <MissionFiles />
          <SkillSystem />
          <CareerTimeline />
          <BuildLogs />
          <Roadmap />
          <AskChiaOS />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
