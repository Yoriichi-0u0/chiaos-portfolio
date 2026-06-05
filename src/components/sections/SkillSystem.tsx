import { BadgeCheck, Brain, Layers3, Radar } from "lucide-react";
import { skillGroups } from "@/data/skills";
import { cn } from "@/lib/utils";

const skillStats = [
  { label: "Clusters", value: `${skillGroups.length}`, icon: Layers3 },
  {
    label: "Evidence items",
    value: `${skillGroups.reduce((total, group) => total + group.skills.length, 0)}`,
    icon: BadgeCheck,
  },
  { label: "Primary direction", value: "AI", icon: Brain },
];

type SkillSystemProps = {
  highlightedSkill?: string | null;
  onSkillHover?: (skillName: string | null) => void;
};

export function SkillSystem({
  highlightedSkill = null,
  onSkillHover,
}: SkillSystemProps) {
  return (
    <section
      id="skills"
      data-system-section
      className="system-section px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="font-code text-sm uppercase text-[#00D9FF]">skill system</p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-[#F8FAFC] sm:text-5xl">
              Skills mapped to evidence.
            </h2>
            <p className="mt-4 text-[#AAB4C0]">
              ChiaOS avoids inflated ratings. Each skill is shown with a current
              stage and the work that supports it.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {skillStats.map((stat) => {
              const Icon = stat.icon;

              return (
                <article
                  key={stat.label}
                  className="rounded-2xl border border-white/12 bg-[#0B0F17]/78 p-4"
                >
                  <Icon className="h-5 w-5 text-[#FFD400]" aria-hidden />
                  <p className="mt-3 font-code text-xs uppercase text-[#AAB4C0]">
                    {stat.label}
                  </p>
                  <p className="mt-1 font-display text-2xl font-semibold text-[#F8FAFC]">
                    {stat.value}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {skillGroups.map((group, groupIndex) => (
            <article
              key={group.title}
              className="rounded-2xl border border-white/12 bg-[#0B0F17]/78 p-5 shadow-lg shadow-black/20"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-code text-xs uppercase text-[#FFD400]">
                    cluster {String(groupIndex + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-[#F8FAFC]">
                    {group.title}
                  </h3>
                </div>
                <Radar className="h-5 w-5 shrink-0 text-[#00D9FF]" aria-hidden />
              </div>
              <p className="mt-2 text-sm leading-6 text-[#AAB4C0]">{group.description}</p>
              <div className="mt-5 grid gap-3">
                {group.skills.map((skill) => (
                  <button
                    key={skill.name}
                    type="button"
                    onMouseEnter={() => onSkillHover?.(skill.name)}
                    onMouseLeave={() => onSkillHover?.(null)}
                    onPointerEnter={() => onSkillHover?.(skill.name)}
                    onPointerLeave={() => onSkillHover?.(null)}
                    onFocus={() => onSkillHover?.(skill.name)}
                    onBlur={() => onSkillHover?.(null)}
                    onClick={() => onSkillHover?.(skill.name)}
                    className={cn(
                      "w-full rounded-2xl border bg-[#101624]/72 p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D9FF]",
                      highlightedSkill === skill.name
                        ? "border-[#FFD400]/55 shadow-[0_0_28px_rgba(255,212,0,0.12)]"
                        : "border-white/12"
                    )}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <BadgeCheck className="h-5 w-5 text-[#00D9FF]" aria-hidden />
                        <p className="font-semibold text-[#F8FAFC]">{skill.name}</p>
                      </div>
                      <span className="w-fit rounded-full border border-[#FFD400]/25 bg-[#FFD400]/10 px-3 py-1 text-xs font-medium text-[#FFD400]">
                        {skill.stage}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[#AAB4C0]">
                      {skill.evidence}
                    </p>
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
