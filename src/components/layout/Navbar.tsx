"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Command, Download, Home, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const systemLinks = [
  { label: "Core", href: "#top" },
  { label: "Missions", href: "#missions" },
  { label: "Skills", href: "#skills" },
  { label: "Timeline", href: "#timeline" },
  { label: "Logs", href: "#logs" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Ask", href: "#ask" },
];

type NavbarProps = {
  onCommandOpen: () => void;
};

export function Navbar({ onCommandOpen }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuId = "system-mobile-navigation";

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/12 bg-[#05070B]/86 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#top" className="font-display text-lg font-semibold text-white">
          ChiaOS System
        </a>
        <div className="hidden items-center gap-1 lg:flex">
          {systemLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm text-[#AAB4C0] transition hover:bg-white/6 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCommandOpen}
            className="inline-flex h-10 w-10 items-center justify-center gap-2 rounded-full border border-white/12 bg-[#0B0F17] text-sm font-medium text-white transition hover:border-[#00D9FF]/60 hover:shadow-[0_0_22px_rgba(0,217,255,0.18)] sm:w-auto sm:px-3"
            aria-label="Open command palette"
          >
            <Command className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Command</span>
          </button>
          <a
            href="/cv/chia-yuen-kai-cv-placeholder.pdf"
            className="hidden h-10 items-center gap-2 rounded-full border border-[#FFD400]/60 bg-[#FFD400] px-3 text-sm font-medium text-[#05070B] shadow-[0_0_22px_rgba(255,212,0,0.2)] transition hover:bg-[#ffe766] lg:inline-flex"
          >
            <Download className="h-4 w-4" aria-hidden />
            CV
          </a>
          <Link
            href="/"
            className="hidden h-10 items-center gap-2 rounded-full border border-white/12 px-3 text-sm font-medium text-[#E5E7EB] transition hover:border-[#00D9FF]/50 hover:text-white md:inline-flex"
          >
            <Home className="h-4 w-4" aria-hidden />
            Landing
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-[#0B0F17] text-white transition hover:border-[#00D9FF]/60 lg:hidden"
            aria-label={mobileMenuOpen ? "Close system navigation" : "Open system navigation"}
            aria-expanded={mobileMenuOpen}
            aria-controls={mobileMenuId}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </nav>
      {mobileMenuOpen ? (
        <div id={mobileMenuId} className="border-t border-white/12 px-4 pb-4 sm:px-6 lg:hidden">
          <div className="mx-auto max-w-7xl pt-3">
            <nav aria-label="System navigation" className="grid gap-2">
              {systemLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-[#F8FAFC] transition hover:bg-white/6"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-3 grid gap-3 rounded-2xl border border-white/12 bg-[#0B0F17]/92 p-3">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/12 px-4 text-sm font-semibold text-[#E5E7EB] transition hover:border-[#00D9FF]/50 hover:text-white"
              >
                <Home className="h-4 w-4" aria-hidden />
                Back to Landing
              </Link>
              <a
                href="/cv/chia-yuen-kai-cv-placeholder.pdf"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "inline-flex h-11 items-center justify-center gap-2 rounded-full border px-4 text-sm font-semibold transition",
                  "border-[#FFD400]/50 bg-[#FFD400]/10 text-[#FFF4B8] hover:bg-[#FFD400]/15"
                )}
              >
                <Download className="h-4 w-4" aria-hidden />
                Download CV
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
