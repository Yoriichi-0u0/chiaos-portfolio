import { BriefcaseBusiness, Download, GitBranch, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import type { PortfolioMode } from "@/types/portfolio";
import { cn } from "@/lib/utils";

type ContactProps = {
  mode: PortfolioMode;
};

export function Contact({ mode }: ContactProps) {
  const isBuilder = mode === "builder";

  return (
    <section
      id="contact"
      className={cn(
        "px-4 py-16 sm:px-6 lg:px-8",
        isBuilder ? "" : "bg-[#F5F5F7]"
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-7xl rounded-3xl border p-6 sm:p-8 lg:p-10",
          isBuilder
            ? "border-[#00D9FF]/24 bg-[#0B0F17]/88 shadow-2xl shadow-[rgba(0,217,255,0.12)]"
            : "border-[#D2D2D7] bg-white"
        )}
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p
              className={cn(
                "font-code text-sm uppercase",
                isBuilder ? "text-[#00D9FF]" : "text-[#0071E3]"
              )}
            >
              contact
            </p>
            <h2
              className={cn(
                "mt-3 font-display text-4xl font-semibold sm:text-5xl",
                isBuilder ? "text-[#F8FAFC]" : "text-[#1D1D1F]"
              )}
            >
              Connect with {profile.preferredName}.
            </h2>
            <p
              className={cn(
                "mt-4 max-w-2xl text-base leading-7",
                isBuilder ? "text-[#AAB4C0]" : "text-[#6E6E73]"
              )}
            >
              Open to internship conversations, project feedback, and opportunities
              across AI, software engineering, cybersecurity, and cloud.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              href={`mailto:${profile.contact.email}`}
              className={cn(
                "inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition",
                isBuilder
                  ? "bg-[#00D9FF] text-[#05070B] shadow-[0_0_24px_rgba(0,217,255,0.22)] hover:bg-[#7aecff]"
                  : "bg-[#1D1D1F] text-white hover:bg-black"
              )}
            >
              <Mail className="h-4 w-4" aria-hidden />
              Email
            </a>
            <a
              href={profile.contact.github}
              className={cn(
                "inline-flex h-12 items-center justify-center gap-2 rounded-full border px-5 text-sm font-semibold transition",
                isBuilder
                  ? "border-white/12 text-white hover:border-[#00D9FF]/50"
                  : "border-[#D2D2D7] text-[#1D1D1F] hover:border-[#0071E3]/40"
              )}
            >
              <GitBranch className="h-4 w-4" aria-hidden />
              GitHub
            </a>
            <a
              href={profile.contact.linkedin}
              className={cn(
                "inline-flex h-12 items-center justify-center gap-2 rounded-full border px-5 text-sm font-semibold transition",
                isBuilder
                  ? "border-white/12 text-white hover:border-[#FFD400]/55"
                  : "border-[#D2D2D7] text-[#1D1D1F] hover:border-[#0071E3]/40"
              )}
            >
              <BriefcaseBusiness className="h-4 w-4" aria-hidden />
              LinkedIn
            </a>
            <a
              href="/cv/chia-yuen-kai-cv-placeholder.pdf"
              className={cn(
                "inline-flex h-12 items-center justify-center gap-2 rounded-full border px-5 text-sm font-semibold transition",
                isBuilder
                  ? "border-white/12 text-white hover:border-[#FFD400]/55"
                  : "border-[#D2D2D7] text-[#1D1D1F] hover:border-[#0071E3]/40"
              )}
            >
              <Download className="h-4 w-4" aria-hidden />
              CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
