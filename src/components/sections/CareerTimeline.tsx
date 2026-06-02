"use client";

import { motion, useReducedMotion } from "framer-motion";
import { timeline } from "@/data/timeline";

export function CareerTimeline() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="timeline" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="font-code text-sm uppercase text-[#00D9FF]">career timeline</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-[#F8FAFC] sm:text-5xl">
            Growth logged as a system.
          </h2>
          <p className="mt-4 text-[#AAB4C0]">
            Each stage adds another layer: fundamentals, web systems, data, security,
            AI, cloud, and the operating system that now ties the story together.
          </p>
        </div>
        <div className="mt-10 grid gap-4">
          {timeline.map((item, index) => (
            <motion.article
              key={item.title}
              initial={reduceMotion ? false : { opacity: 0, x: -20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="grid gap-4 rounded-2xl border border-white/12 bg-[#0B0F17]/76 p-5 shadow-lg shadow-black/20 md:grid-cols-[120px_1fr]"
            >
              <div>
                <p className="font-code text-3xl text-[#FFD400]">{item.stage}</p>
                <p className="mt-1 font-code text-xs uppercase text-[#AAB4C0]">stage</p>
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold text-[#F8FAFC]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#AAB4C0]">{item.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.focus.map((focus) => (
                    <span
                      key={focus}
                      className="rounded-full border border-[#00D9FF]/22 bg-[#00D9FF]/8 px-3 py-1 text-xs text-[#B7F7FF]"
                    >
                      {focus}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
