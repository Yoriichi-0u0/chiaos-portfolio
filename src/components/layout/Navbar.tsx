"use client";

import { Command, Download, Menu } from "lucide-react";
import { ModeToggle } from "@/components/layout/ModeToggle";
import type { PortfolioMode } from "@/types/portfolio";
import { cn } from "@/lib/utils";

const builderLinks = [
  { label: "Timeline", href: "#timeline" },
  { label: "Missions", href: "#missions" },
  { label: "Skills", href: "#skills" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Contact", href: "#contact" },
];

const signalLinks = [
  { label: "Summary", href: "#summary" },
  { label: "Projects", href: "#signal-projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

type NavbarProps = {
  mode: PortfolioMode;
  onModeChange: (mode: PortfolioMode) => void;
  onCommandOpen: () => void;
};

export function Navbar({ mode, onModeChange, onCommandOpen }: NavbarProps) {
  const links = mode === "builder" ? builderLinks : signalLinks;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-xl",
        mode === "builder"
          ? "border-white/12 bg-[#05070B]/86"
          : "border-[#D2D2D7] bg-[#F5F5F7]/86"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a
          href="#top"
          className={cn(
            "font-display text-lg font-semibold",
            mode === "builder" ? "text-white" : "text-[#1D1D1F]"
          )}
        >
          ChiaOS
        </a>
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3 py-2 text-sm transition",
                mode === "builder"
                  ? "text-[#AAB4C0] hover:bg-white/6 hover:text-white"
                  : "text-[#6E6E73] hover:bg-white hover:text-[#1D1D1F]"
              )}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCommandOpen}
            className={cn(
              "inline-flex h-10 items-center gap-2 rounded-full border px-3 text-sm font-medium transition",
              mode === "builder"
                ? "border-white/12 bg-[#0B0F17] text-white hover:border-[#00D9FF]/60 hover:shadow-[0_0_22px_rgba(0,217,255,0.18)]"
                : "border-[#D2D2D7] bg-white text-[#1D1D1F] hover:border-[#0071E3]/40"
            )}
            aria-label="Open command palette"
          >
            <Command className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Command</span>
          </button>
          <a
            href="/cv/chia-yuen-kai-cv-placeholder.pdf"
            className={cn(
              "hidden h-10 items-center gap-2 rounded-full border px-3 text-sm font-medium transition sm:inline-flex",
              mode === "builder"
                ? "border-[#FFD400]/60 bg-[#FFD400] text-[#05070B] shadow-[0_0_22px_rgba(255,212,0,0.2)] hover:bg-[#ffe766]"
                : "border-[#1D1D1F] bg-[#1D1D1F] text-white hover:bg-black"
            )}
          >
            <Download className="h-4 w-4" aria-hidden />
            CV
          </a>
          <ModeToggle mode={mode} onModeChange={onModeChange} />
          <Menu className="h-5 w-5 lg:hidden" aria-hidden />
        </div>
      </nav>
    </header>
  );
}
