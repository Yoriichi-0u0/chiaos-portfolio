import { Brain, BriefcaseBusiness, Code2, GraduationCap, Shield, Users } from "lucide-react";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { missions } from "@/data/missions";

const realfun = experience[0];

const snapshotItems = [
  {
    icon: Brain,
    label: "Academic core",
    value: "AI + Cybersecurity",
    detail: education.currentStage ?? "Bachelor of Computer Science.",
  },
  {
    icon: Code2,
    label: "Mission files",
    value: `${missions.length} proof tracks`,
    detail: "Projects across AI, design, cloud, database, and networks.",
  },
  {
    icon: Users,
    label: "Operations scale",
    value: realfun.metrics?.[1] ?? "Realfun ops",
    detail: "Hotline, scheduling, events, and urgent changes.",
  },
  {
    icon: Shield,
    label: "Operating style",
    value: "Build with proof",
    detail: "AI-assisted iteration grounded in real evidence.",
  },
  {
    icon: GraduationCap,
    label: "Swinburne snapshot",
    value: "CGPA approx. 3.52",
    detail: "Unofficial snapshot kept concise and public-safe.",
  },
  {
    icon: BriefcaseBusiness,
    label: "Foundation",
    value: "Curtin CGPA 4.00",
    detail: education.foundation?.completed ?? "Foundation completed.",
  },
];

export function CareerSnapshot() {
  return (
    <section
      id="education"
      data-system-section
      className="system-section px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="font-code text-sm uppercase text-[#00D9FF]">system snapshot</p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-[#F8FAFC] sm:text-5xl">
              Identity, education, and proof density.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-[#AAB4C0] lg:justify-self-end">
            Based in {profile.location}, ChiaOS compresses Chia&apos;s current status
            into scan-friendly modules before opening the deeper mission archive.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {snapshotItems.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.label}
                className="group relative overflow-hidden rounded-2xl border border-white/12 bg-[#101624]/82 p-5 shadow-lg shadow-black/20 transition hover:border-[#00D9FF]/35"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00D9FF]/70 to-transparent opacity-0 transition group-hover:opacity-100" />
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#00D9FF]/30 bg-[#00D9FF]/10 text-[#00D9FF]">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <p className="mt-5 font-code text-xs uppercase text-[#AAB4C0]">
                  {item.label}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-[#F8FAFC]">
                  {item.value}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#AAB4C0]">
                  {item.detail}
                </p>
              </article>
            );
          })}
        </div>
        <div className="mt-5 rounded-2xl border border-[#FFD400]/18 bg-[#FFD400]/8 p-5">
          <p className="font-code text-xs uppercase tracking-[0.14em] text-[#FFD400]">
            Education route
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-[#F8FAFC]">
            {education.degree} at {education.university}
          </h3>
          <p className="mt-3 text-sm leading-6 text-[#AAB4C0]">
            Double majoring in {education.majors.join(" and ")}. Expected graduation:
            {" "}
            {education.expectedGraduation}. {education.cgpaSnapshot}.
          </p>
        </div>
      </div>
    </section>
  );
}
