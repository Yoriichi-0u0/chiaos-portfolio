import { ScrollText } from "lucide-react";
import { buildLogs } from "@/data/buildLogs";

export function BuildLogs() {
  return (
    <section id="logs" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="font-code text-sm uppercase text-[#00D9FF]">build logs</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-[#F8FAFC] sm:text-5xl">
            The system keeps evolving.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {buildLogs.map((log) => (
            <article
              key={log.title}
              className="rounded-2xl border border-white/12 bg-[#0B0F17]/78 p-5 shadow-lg shadow-black/20"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#00D9FF]/30 bg-[#00D9FF]/10 text-[#00D9FF]">
                <ScrollText className="h-5 w-5" aria-hidden />
              </span>
              <p className="mt-5 font-code text-xs uppercase text-[#AAB4C0]">
                {log.dateLabel}
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-[#F8FAFC]">
                {log.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#AAB4C0]">{log.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {log.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/12 bg-white/6 px-3 py-1 text-xs text-[#E5E7EB]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
