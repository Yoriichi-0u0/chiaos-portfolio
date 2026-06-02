import { ArrowUpRight, BadgeCheck, BriefcaseBusiness, GraduationCap } from "lucide-react";
import { Contact } from "@/components/sections/Contact";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { missions } from "@/data/missions";
import { profile } from "@/data/profile";
import { roadmap } from "@/data/roadmap";
import { skillGroups } from "@/data/skills";

export function SignalView() {
  return (
    <div className="signal-surface">
      <section id="summary" className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase text-[#0071E3]">Signal Mode</p>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-tight text-[#1D1D1F] sm:text-7xl">
              {profile.name}
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-8 text-[#6E6E73]">
              {profile.identity}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {profile.targetRoles.map((role) => (
                <span
                  key={role}
                  className="rounded-full border border-[#D2D2D7] bg-white px-4 py-2 text-sm font-medium text-[#1D1D1F]"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-[#D2D2D7] bg-white p-5">
              <p className="text-sm font-medium text-[#6E6E73]">Location</p>
              <p className="mt-2 text-lg font-semibold text-[#1D1D1F]">{profile.location}</p>
            </div>
            <div className="rounded-2xl border border-[#D2D2D7] bg-white p-5">
              <p className="text-sm font-medium text-[#6E6E73]">University</p>
              <p className="mt-2 text-lg font-semibold text-[#1D1D1F]">
                {profile.university}
              </p>
            </div>
            <div className="rounded-2xl border border-[#D2D2D7] bg-white p-5">
              <p className="text-sm font-medium text-[#6E6E73]">Majors</p>
              <p className="mt-2 text-lg font-semibold text-[#1D1D1F]">
                {profile.majors.join(" + ")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="signal-skills" className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-semibold text-[#1D1D1F]">
            Key Skills
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {skillGroups.map((group) => (
              <article
                key={group.title}
                className="rounded-2xl border border-[#D2D2D7] bg-white p-5"
              >
                <h3 className="text-xl font-semibold text-[#1D1D1F]">{group.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#6E6E73]">{group.description}</p>
                <div className="mt-4 grid gap-3">
                  {group.skills.map((skill) => (
                    <div key={skill.name} className="flex items-start gap-3">
                      <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#0071E3]" aria-hidden />
                      <div>
                        <p className="font-medium text-[#1D1D1F]">
                          {skill.name} · {skill.stage}
                        </p>
                        <p className="mt-1 text-sm text-[#6E6E73]">{skill.evidence}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="signal-projects" className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-semibold text-[#1D1D1F]">
            Featured Projects
          </h2>
          <div className="mt-6 grid gap-4">
            {missions.map((mission) => (
              <article
                key={mission.id}
                className="rounded-2xl border border-[#D2D2D7] bg-white p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#0071E3]">{mission.category}</p>
                    <h3 className="mt-1 text-2xl font-semibold text-[#1D1D1F]">
                      {mission.title}
                    </h3>
                  </div>
                  <a
                    href={mission.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#0071E3]"
                  >
                    {mission.linkLabel}
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#6E6E73]">{mission.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {mission.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full bg-[#F5F5F7] px-3 py-1 text-xs font-medium text-[#1D1D1F]"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-2">
          {experience.map((item) => (
            <article
              key={item.organization}
              className="rounded-2xl border border-[#D2D2D7] bg-white p-6"
            >
              <BriefcaseBusiness className="h-6 w-6 text-[#0071E3]" aria-hidden />
              <h2 className="mt-4 font-display text-3xl font-semibold text-[#1D1D1F]">
                Experience
              </h2>
              <p className="mt-3 text-xl font-semibold text-[#1D1D1F]">{item.role}</p>
              <p className="text-[#6E6E73]">
                {item.organization}, {item.location}
              </p>
              <ul className="mt-5 grid gap-3 text-sm leading-6 text-[#6E6E73]">
                {item.responsibilities.map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
              </ul>
            </article>
          ))}
          <article id="education" className="rounded-2xl border border-[#D2D2D7] bg-white p-6">
            <GraduationCap className="h-6 w-6 text-[#0071E3]" aria-hidden />
            <h2 className="mt-4 font-display text-3xl font-semibold text-[#1D1D1F]">
              Education
            </h2>
            <p className="mt-3 text-xl font-semibold text-[#1D1D1F]">
              {education.degree}
            </p>
            <p className="text-[#6E6E73]">{education.university}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {education.focus.map((focus) => (
                <span
                  key={focus}
                  className="rounded-full bg-[#F5F5F7] px-3 py-1 text-xs font-medium text-[#1D1D1F]"
                >
                  {focus}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-2xl border border-[#D2D2D7] bg-white p-6">
          <h2 className="font-display text-3xl font-semibold text-[#1D1D1F]">
            Roadmap
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {roadmap.map((item) => (
              <div key={item.horizon}>
                <p className="text-sm font-semibold text-[#0071E3]">{item.horizon}</p>
                <p className="mt-2 font-semibold text-[#1D1D1F]">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-[#6E6E73]">{item.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact mode="signal" />
    </div>
  );
}
