import { CheckCircle2, MessageSquare, RadioTower, Repeat2, Users } from "lucide-react";
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
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <div>
          <p className="font-code text-sm uppercase text-[#00D9FF]">operations module</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-[#F8FAFC] sm:text-5xl">
            Realfun turned pressure into operating rhythm.
          </h2>
          <p className="mt-4 text-[#AAB4C0]">
            {realfun.role} at {realfun.organization}, {realfun.location}.{" "}
            {realfun.startDate} to {realfun.endDate}. {realfun.summary}
          </p>
          {realfun.caseStudy ? (
            <div className="mt-6 rounded-2xl border border-[#FFD400]/22 bg-[#FFD400]/10 p-5">
              <p className="font-code text-xs uppercase tracking-[0.14em] text-[#FFD400]">
                Case response
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-[#F8FAFC]">
                {realfun.caseStudy.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#AAB4C0]">
                {realfun.caseStudy.summary}
              </p>
            </div>
          ) : null}
        </div>
        <div className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {realfun.metrics?.map((metric) => (
              <article
                key={metric}
                className="rounded-2xl border border-[#00D9FF]/18 bg-[#0B0F17]/82 p-4 shadow-lg shadow-black/20"
              >
                <Users className="h-5 w-5 text-[#00D9FF]" aria-hidden />
                <p className="mt-3 text-sm font-semibold text-[#F8FAFC]">{metric}</p>
              </article>
            ))}
          </div>
          <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="grid gap-4">
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
                        <p className="mt-2 text-sm leading-6 text-[#AAB4C0]">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="rounded-2xl border border-white/12 bg-[#101624]/76 p-5 shadow-lg shadow-black/20">
              <p className="font-code text-xs uppercase tracking-[0.14em] text-[#00D9FF]">
                Operating surface
              </p>
              <div className="mt-4 grid gap-3">
                {realfun.responsibilities.slice(0, 5).map((item) => (
                  <div key={item} className="flex gap-3 text-sm leading-6 text-[#AAB4C0]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00D9FF]" aria-hidden />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {realfun.events?.map((event) => (
                  <span
                    key={event}
                    className="rounded-full border border-[#FFD400]/22 bg-[#FFD400]/8 px-3 py-1 text-xs text-[#FFF4B8]"
                  >
                    {event}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
