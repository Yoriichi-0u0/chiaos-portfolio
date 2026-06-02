import { BriefcaseBusiness, GitBranch, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import type { PortfolioMode } from "@/types/portfolio";
import { cn } from "@/lib/utils";

type FooterProps = {
  mode: PortfolioMode;
};

export function Footer({ mode }: FooterProps) {
  return (
    <footer
      className={cn(
        "border-t px-4 py-8 sm:px-6 lg:px-8",
        mode === "builder"
          ? "border-white/12 bg-[#05070B] text-[#AAB4C0]"
          : "border-[#D2D2D7] bg-white text-[#6E6E73]"
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className={cn("font-display text-lg font-semibold", mode === "builder" ? "text-white" : "text-[#1D1D1F]")}>
            ChiaOS
          </p>
          <p className="mt-1 text-sm">
            Built by {profile.name}. {profile.tagline}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={`mailto:${profile.contact.email}`}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full border transition",
              mode === "builder"
                ? "border-white/12 hover:border-[#00D9FF]/60 hover:text-white"
                : "border-[#D2D2D7] hover:border-[#0071E3]/50 hover:text-[#1D1D1F]"
            )}
            aria-label="Email Chia"
          >
            <Mail className="h-4 w-4" aria-hidden />
          </a>
          <a
            href={profile.contact.github}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full border transition",
              mode === "builder"
                ? "border-white/12 hover:border-[#00D9FF]/60 hover:text-white"
                : "border-[#D2D2D7] hover:border-[#0071E3]/50 hover:text-[#1D1D1F]"
            )}
            aria-label="Open Chia's GitHub"
          >
            <GitBranch className="h-4 w-4" aria-hidden />
          </a>
          <a
            href={profile.contact.linkedin}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full border transition",
              mode === "builder"
                ? "border-white/12 hover:border-[#FFD400]/60 hover:text-white"
                : "border-[#D2D2D7] hover:border-[#0071E3]/50 hover:text-[#1D1D1F]"
            )}
            aria-label="Open Chia's LinkedIn"
          >
            <BriefcaseBusiness className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
