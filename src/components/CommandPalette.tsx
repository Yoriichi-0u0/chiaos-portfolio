"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BriefcaseBusiness,
  Download,
  FileText,
  FolderKanban,
  Map,
  RadioTower,
  Search,
  Sparkles,
  Timeline,
  X,
  Zap,
} from "lucide-react";
import type { PortfolioMode } from "@/types/portfolio";
import { cn } from "@/lib/utils";

type CommandAction = {
  label: string;
  detail: string;
  icon: LucideIcon;
  run: () => void;
};

type CommandPaletteProps = {
  mode: PortfolioMode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onModeChange: (mode: PortfolioMode) => void;
};

function scrollToTarget(selector: string) {
  document.querySelector(selector)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function CommandPalette({
  mode,
  open,
  onOpenChange,
  onModeChange,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onOpenChange(true);
      }

      if (event.key === "Escape") {
        onOpenChange(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onOpenChange]);

  useEffect(() => {
    if (open) {
      window.setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  const commands = useMemo<CommandAction[]>(
    () => [
      {
        label: "Builder Mode",
        detail: "Dark career cockpit",
        icon: Zap,
        run: () => onModeChange("builder"),
      },
      {
        label: "Signal Mode",
        detail: "Clean professional view",
        icon: BriefcaseBusiness,
        run: () => onModeChange("signal"),
      },
      {
        label: "Mission Files",
        detail: "Featured project proof",
        icon: FolderKanban,
        run: () => scrollToTarget(mode === "builder" ? "#missions" : "#signal-projects"),
      },
      {
        label: "Career Timeline",
        detail: "Growth path",
        icon: Timeline,
        run: () => scrollToTarget(mode === "builder" ? "#timeline" : "#summary"),
      },
      {
        label: "Skill System",
        detail: "Evidence-based skills",
        icon: Sparkles,
        run: () => scrollToTarget(mode === "builder" ? "#skills" : "#signal-skills"),
      },
      {
        label: "Roadmap",
        detail: "Now, next, later",
        icon: Map,
        run: () => scrollToTarget(mode === "builder" ? "#roadmap" : "#summary"),
      },
      {
        label: "Ask ChiaOS",
        detail: "Local profile assistant",
        icon: RadioTower,
        run: () => scrollToTarget(mode === "builder" ? "#ask" : "#contact"),
      },
      {
        label: "Contact",
        detail: "Email and links",
        icon: FileText,
        run: () => scrollToTarget("#contact"),
      },
      {
        label: "Download CV",
        detail: "Placeholder PDF",
        icon: Download,
        run: () => {
          window.location.href = "/cv/chia-yuen-kai-cv-placeholder.pdf";
        },
      },
    ],
    [mode, onModeChange]
  );

  const filteredCommands = commands.filter((command) => {
    const haystack = `${command.label} ${command.detail}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/55 px-4 py-20 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onOpenChange(false);
        }
      }}
    >
      <div
        className={cn(
          "w-full max-w-2xl overflow-hidden rounded-2xl border shadow-2xl",
          mode === "builder"
            ? "border-[#00D9FF]/30 bg-[#0B0F17] text-[#F8FAFC] shadow-[0_0_48px_rgba(0,217,255,0.18)]"
            : "border-[#D2D2D7] bg-white text-[#1D1D1F]"
        )}
      >
        <div
          className={cn(
            "flex items-center gap-3 border-b px-4 py-3",
            mode === "builder" ? "border-white/12" : "border-[#D2D2D7]"
          )}
        >
          <Search className="h-5 w-5 text-[#00D9FF]" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search ChiaOS"
            className="h-10 flex-1 bg-transparent text-base outline-none placeholder:text-[#AAB4C0]"
          />
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full border",
              mode === "builder" ? "border-white/12 hover:border-[#00D9FF]/50" : "border-[#D2D2D7]"
            )}
            aria-label="Close command palette"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
        <div className="max-h-[55vh] overflow-y-auto p-2">
          {filteredCommands.map((command) => {
            const Icon = command.icon;
            return (
              <button
                key={command.label}
                type="button"
                onClick={() => {
                  command.run();
                  onOpenChange(false);
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition",
                  mode === "builder"
                    ? "hover:bg-[#101624]"
                    : "hover:bg-[#F5F5F7]"
                )}
              >
                <span
                  className={cn(
                    "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                    mode === "builder"
                      ? "border border-[#00D9FF]/25 bg-[#00D9FF]/10 text-[#00D9FF]"
                      : "bg-[#0071E3]/10 text-[#0071E3]"
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block font-medium">{command.label}</span>
                  <span
                    className={cn(
                      "block text-sm",
                      mode === "builder" ? "text-[#AAB4C0]" : "text-[#6E6E73]"
                    )}
                  >
                    {command.detail}
                  </span>
                </span>
              </button>
            );
          })}
          {filteredCommands.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-[#AAB4C0]">
              No command found.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
