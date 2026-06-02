"use client";

import { useState } from "react";
import { CommandPalette } from "@/components/CommandPalette";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AskChiaOS } from "@/components/sections/AskChiaOS";
import { BootScreen } from "@/components/sections/BootScreen";
import { BuildLogs } from "@/components/sections/BuildLogs";
import { CareerSnapshot } from "@/components/sections/CareerSnapshot";
import { CareerTimeline } from "@/components/sections/CareerTimeline";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { MissionFiles } from "@/components/sections/MissionFiles";
import { Roadmap } from "@/components/sections/Roadmap";
import { SignalView } from "@/components/sections/SignalView";
import { SkillSystem } from "@/components/sections/SkillSystem";
import { usePortfolioMode } from "@/hooks/usePortfolioMode";

export function ChiaOSApp() {
  const { mode, setMode } = usePortfolioMode();
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <div
      className={
        mode === "builder"
          ? "min-h-screen bg-[#05070B] text-[#F8FAFC]"
          : "min-h-screen bg-[#F5F5F7] text-[#1D1D1F]"
      }
      data-mode={mode}
    >
      <Navbar
        mode={mode}
        onModeChange={setMode}
        onCommandOpen={() => setCommandOpen(true)}
      />
      <CommandPalette
        mode={mode}
        open={commandOpen}
        onOpenChange={setCommandOpen}
        onModeChange={setMode}
      />
      <main>
        {mode === "builder" ? (
          <div className="builder-radial overflow-hidden">
            <BootScreen />
            <Hero />
            <CareerSnapshot />
            <CareerTimeline />
            <MissionFiles />
            <SkillSystem />
            <BuildLogs />
            <Roadmap />
            <AskChiaOS />
            <Contact mode={mode} />
          </div>
        ) : (
          <SignalView />
        )}
      </main>
      <Footer mode={mode} />
    </div>
  );
}
