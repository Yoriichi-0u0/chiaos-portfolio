import { Brain, Cloud, Code2, Shield } from "lucide-react";
import { profile } from "@/data/profile";
import { missions } from "@/data/missions";

const snapshotItems = [
  {
    icon: Brain,
    label: "Majors",
    value: "AI + Cybersecurity",
    detail: "Academic direction with practical systems focus.",
  },
  {
    icon: Code2,
    label: "Mission files",
    value: `${missions.length} proof tracks`,
    detail: "Projects across AI, cloud, database, and networks.",
  },
  {
    icon: Cloud,
    label: "Next checkpoint",
    value: "Internship",
    detail: "A step inside the larger career system.",
  },
  {
    icon: Shield,
    label: "Operating style",
    value: "Build with proof",
    detail: "AI-assisted iteration grounded in real evidence.",
  },
];

export function CareerSnapshot() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {snapshotItems.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.label}
                className="rounded-2xl border border-white/12 bg-[#101624]/82 p-5 shadow-lg shadow-black/20"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#00D9FF]/30 bg-[#00D9FF]/10 text-[#00D9FF]">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <p className="mt-5 font-code text-xs uppercase text-[#AAB4C0]">
                  {item.label}
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-[#F8FAFC]">
                  {item.value}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#AAB4C0]">
                  {item.detail}
                </p>
              </article>
            );
          })}
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-6 text-[#AAB4C0]">
          Based in {profile.location}, ChiaOS tracks the path from learning fundamentals
          to building practical AI, cybersecurity, cloud, and software systems.
        </p>
      </div>
    </section>
  );
}
