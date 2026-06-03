import { MessageSquare, RadioTower, Repeat2 } from "lucide-react";
import { experience } from "@/data/experience";

const operations = [
  {
    icon: MessageSquare,
    label: "Communication",
    detail: "Parent, student, and teacher coordination through daily operational channels.",
  },
  {
    icon: Repeat2,
    label: "Scheduling",
    detail: "Class replacements, reminders, and updates kept moving without drama.",
  },
  {
    icon: RadioTower,
    label: "Signal routing",
    detail: "Turning scattered requests into clear next actions for the right people.",
  },
];

export function OperationsModule() {
  const realfun = experience[0];

  return (
    <section
      id="operations"
      data-system-section
      className="system-section px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div>
          <p className="font-code text-sm uppercase text-[#00D9FF]">operations module</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-[#F8FAFC] sm:text-5xl">
            Realfun turned communication into operating rhythm.
          </h2>
          <p className="mt-4 text-[#AAB4C0]">
            {realfun.role} at {realfun.organization}, {realfun.location}. {realfun.summary}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
          {operations.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.label}
                className="rounded-2xl border border-white/12 bg-[#0B0F17]/78 p-5 shadow-lg shadow-black/20"
              >
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#FFD400]/28 bg-[#FFD400]/10 text-[#FFD400]">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-[#F8FAFC]">
                      {item.label}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#AAB4C0]">{item.detail}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
