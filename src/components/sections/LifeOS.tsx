import { Gauge, Sparkles, Zap } from "lucide-react";
import { profile } from "@/data/profile";

const loops = [
  {
    icon: Sparkles,
    label: "Curiosity loop",
    detail: "Pick up a system, test the edges, and turn the lesson into visible proof.",
  },
  {
    icon: Zap,
    label: "Build loop",
    detail: "Use AI-assisted workflow to move faster while keeping the final result personal.",
  },
  {
    icon: Gauge,
    label: "Refine loop",
    detail: "Cut noise, improve the interface, and make the next version feel more like ChiaOS.",
  },
];

export function LifeOS() {
  return (
    <section
      id="life-os"
      data-system-section
      className="system-section px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl rounded-3xl border border-[#FFD400]/18 bg-[#0B0F17]/70 p-6 shadow-2xl shadow-black/24 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="font-code text-sm uppercase text-[#FFD400]">life os</p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-[#F8FAFC] sm:text-5xl">
              {profile.tagline}
            </h2>
            <p className="mt-4 text-[#AAB4C0]">
              The personal layer of ChiaOS: playful enough to keep building, serious enough
              to ship with proof.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {loops.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.label}
                  className="rounded-2xl border border-white/12 bg-[#101624]/78 p-5"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#00D9FF]/26 bg-[#00D9FF]/10 text-[#00D9FF]">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-[#F8FAFC]">
                    {item.label}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#AAB4C0]">{item.detail}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
