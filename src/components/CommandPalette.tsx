"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Download,
  FileText,
  FolderKanban,
  Home,
  Map,
  RadioTower,
  Search,
  Sparkles,
  Timeline,
  X,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

type CommandAction = {
  label: string;
  detail: string;
  icon: LucideIcon;
  run: () => void;
};

type CommandPaletteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function scrollToTarget(selector: string) {
  document.querySelector(selector)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const wasOpenRef = useRef(false);

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
      lastFocusedElementRef.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      wasOpenRef.current = true;
      window.setTimeout(() => inputRef.current?.focus(), 0);
      return;
    }

    if (wasOpenRef.current) {
      setQuery("");
      lastFocusedElementRef.current?.focus({ preventScroll: true });
      wasOpenRef.current = false;
    }
  }, [open]);

  const commands = useMemo<CommandAction[]>(
    () => [
      {
        label: "System Core",
        detail: "Return to the activated hero scene",
        icon: Zap,
        run: () => scrollToTarget("#top"),
      },
      {
        label: "Mission Files",
        detail: "Featured project proof",
        icon: FolderKanban,
        run: () => scrollToTarget("#missions"),
      },
      {
        label: "Skill System",
        detail: "Evidence-based skills",
        icon: Sparkles,
        run: () => scrollToTarget("#skills"),
      },
      {
        label: "Career Timeline",
        detail: "Growth path",
        icon: Timeline,
        run: () => scrollToTarget("#timeline"),
      },
      {
        label: "Build Logs",
        detail: "Iteration history",
        icon: FileText,
        run: () => scrollToTarget("#logs"),
      },
      {
        label: "Roadmap",
        detail: "Now, next, later",
        icon: Map,
        run: () => scrollToTarget("#roadmap"),
      },
      {
        label: "Ask ChiaOS",
        detail: "Local profile assistant",
        icon: RadioTower,
        run: () => scrollToTarget("#ask"),
      },
      {
        label: "Back to Landing",
        detail: "Return to Original Setup",
        icon: Home,
        run: () => {
          window.location.href = "/";
        },
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
    []
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
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/55 px-3 py-6 backdrop-blur-sm sm:px-4 sm:py-20"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onOpenChange(false);
        }
      }}
    >
      <div className="max-h-[calc(100vh-3rem)] w-full max-w-2xl overflow-hidden rounded-2xl border border-[#00D9FF]/30 bg-[#0B0F17] text-[#F8FAFC] shadow-2xl shadow-[0_0_48px_rgba(0,217,255,0.18)]">
        <div className="flex items-center gap-3 border-b border-white/12 px-4 py-3">
          <Search className="h-5 w-5 text-[#00D9FF]" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search ChiaOS commands"
            placeholder="Search activated system"
            className="h-10 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-[#AAB4C0]"
          />
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 hover:border-[#00D9FF]/50"
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
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-[#101624]"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#00D9FF]/25 bg-[#00D9FF]/10 text-[#00D9FF]">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block font-medium">{command.label}</span>
                  <span className={cn("block text-sm text-[#AAB4C0]")}>
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
