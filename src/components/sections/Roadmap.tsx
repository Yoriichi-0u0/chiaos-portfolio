import { ArrowRight } from "lucide-react";
import { roadmap } from "@/data/roadmap";

export function Roadmap() {
  return (
    <section id="roadmap" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="font-code text-sm uppercase text-[#00D9FF]">roadmap</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-[#F8FAFC] sm:text-5xl">
            Internship is a checkpoint, not the finish line.
          </h2>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-4">
          {roadmap.map((item, index) => (
            <article
              key={item.horizon}
              className="rounded-2xl border border-white/12 bg-[#101624]/78 p-5 shadow-lg shadow-black/20"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="font-code text-sm uppercase text-[#FFD400]">{item.horizon}</p>
                {index < roadmap.length - 1 ? (
                  <ArrowRight className="hidden h-4 w-4 text-[#00D9FF] lg:block" aria-hidden />
                ) : null}
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold text-[#F8FAFC]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#AAB4C0]">{item.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
