"use client";

import { BriefcaseBusiness, Zap } from "lucide-react";
import type { PortfolioMode } from "@/types/portfolio";
import { cn } from "@/lib/utils";

type ModeToggleProps = {
  mode: PortfolioMode;
  onModeChange: (mode: PortfolioMode) => void;
};

export function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div
      className={cn(
        "inline-flex rounded-full border p-1",
        mode === "builder"
          ? "border-white/12 bg-[#0B0F17]/90 shadow-[0_0_28px_rgba(0,217,255,0.12)]"
          : "border-[#D2D2D7] bg-white"
      )}
      role="group"
      aria-label="Portfolio mode"
    >
      <button
        type="button"
        className={cn(
          "inline-flex h-9 items-center gap-2 rounded-full px-3 text-sm font-medium transition",
          mode === "builder"
            ? "bg-[#00D9FF] text-[#05070B] shadow-[0_0_24px_rgba(0,217,255,0.35)]"
            : "text-[#6E6E73] hover:text-[#1D1D1F]"
        )}
        onClick={() => onModeChange("builder")}
        aria-pressed={mode === "builder"}
      >
        <Zap className="h-4 w-4" aria-hidden />
        Builder
      </button>
      <button
        type="button"
        className={cn(
          "inline-flex h-9 items-center gap-2 rounded-full px-3 text-sm font-medium transition",
          mode === "signal"
            ? "bg-[#1D1D1F] text-white shadow-sm"
            : "text-[#AAB4C0] hover:text-white"
        )}
        onClick={() => onModeChange("signal")}
        aria-pressed={mode === "signal"}
      >
        <BriefcaseBusiness className="h-4 w-4" aria-hidden />
        Signal
      </button>
    </div>
  );
}
