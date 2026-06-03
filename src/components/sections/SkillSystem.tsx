import { BadgeCheck } from "lucide-react";
import { skillGroups } from "@/data/skills";
import { cn } from "@/lib/utils";

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
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {skillGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-2xl border border-white/12 bg-[#0B0F17]/78 p-5 shadow-lg shadow-black/20"
            >
              <h3 className="font-display text-2xl font-semibold text-[#F8FAFC]">
                {group.title}
              </h3>
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
