import { ChevronDown, ExternalLink } from "lucide-react";
import type { Mission } from "@/types/portfolio";
import { cn } from "@/lib/utils";

type MissionCaseStudyProps = {
  mission: Mission;
  tone?: "system" | "setup";
};

const tones = {
  system: {
    details: "border-white/12 bg-[#05070B]",
    summary: "text-[#B7F7FF] hover:text-white",
    heading: "text-[#00D9FF]",
    body: "text-[#AAB4C0]",
    strong: "text-[#F8FAFC]",
    marker: "bg-[#00D9FF]",
    limits: "border-[#FFD400]/20 bg-[#FFD400]/8 text-[#FFF4B8]",
    link: "border-[#00D9FF]/30 text-[#B7F7FF] hover:border-[#00D9FF]/60 hover:text-white",
    focus: "focus-visible:outline-[#00D9FF]",
  },
  setup: {
    details: "border-[#D8DADC] bg-white",
    summary: "text-[#0071E3] hover:text-[#005BB5]",
    heading: "text-[#0071E3]",
    body: "text-[#515154]",
    strong: "text-[#1D1D1F]",
    marker: "bg-[#0071E3]",
    limits: "border-[#D8DADC] bg-[#F5F5F7] text-[#515154]",
    link: "border-[#D8DADC] text-[#0071E3] hover:border-[#0071E3]/50",
    focus: "focus-visible:outline-[#0071E3]",
  },
};

function ListBlock({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: (typeof tones)["system"];
}) {
  return (
    <div>
      <h4 className={cn("font-code text-xs uppercase tracking-[0.12em]", tone.heading)}>{title}</h4>
      <ul className="mt-2 grid gap-2">
        {items.map((item) => (
          <li key={item} className={cn("flex gap-2 text-sm leading-6", tone.body)}>
            <span className={cn("mt-2.5 h-1 w-1 shrink-0 rounded-full", tone.marker)} aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MissionLinks({ mission, tone = "system" }: MissionCaseStudyProps) {
  const palette = tones[tone];
  const links = mission.links ?? [{ label: mission.linkLabel, href: mission.href }];

  return (
    <div className="flex flex-wrap gap-2">
      {links.map((link) => {
        const external = link.href.startsWith("http");

        return (
          <a
            key={link.href}
            href={link.href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            className={cn(
              "inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2",
              palette.link,
              palette.focus
            )}
          >
            {link.label}
            {external ? <ExternalLink className="h-3.5 w-3.5" aria-hidden /> : null}
            {external ? <span className="sr-only">(opens in a new tab)</span> : null}
          </a>
        );
      })}
    </div>
  );
}

export function MissionCaseStudy({ mission, tone = "system" }: MissionCaseStudyProps) {
  const study = mission.caseStudy;

  if (!study) {
    return null;
  }

  const palette = tones[tone];

  return (
    <details className={cn("group/case rounded-xl border", palette.details)}>
      <summary
        className={cn(
          "flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 [&::-webkit-details-marker]:hidden",
          palette.summary,
          palette.focus
        )}
      >
        Read case study
        <ChevronDown
          className="h-4 w-4 transition-transform group-open/case:rotate-180 motion-reduce:transition-none"
          aria-hidden
        />
      </summary>
      <div className="grid gap-5 px-4 pb-5 pt-1">
        <div>
          <h4 className={cn("font-code text-xs uppercase tracking-[0.12em]", palette.heading)}>Problem</h4>
          <p className={cn("mt-2 text-sm leading-6", palette.body)}>{study.problem}</p>
        </div>
        <div>
          <h4 className={cn("font-code text-xs uppercase tracking-[0.12em]", palette.heading)}>
            Contribution and role
          </h4>
          <p className={cn("mt-2 text-sm leading-6", palette.strong)}>{study.contribution}</p>
        </div>
        <ListBlock title="Architecture" items={study.architecture} tone={palette} />
        <ListBlock title="Technical challenges" items={study.challenges} tone={palette} />
        <ListBlock title="Results" items={study.results} tone={palette} />
        <p className={cn("rounded-lg border px-3 py-2 text-sm leading-6", palette.limits)}>
          <span className="font-semibold">Limits: </span>
          {study.limits}
        </p>
        <p className={cn("text-xs leading-5", palette.body)}>Evidence: {study.evidence}</p>
      </div>
    </details>
  );
}
