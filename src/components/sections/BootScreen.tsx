"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Cpu, Radar } from "lucide-react";
import { ChiaOSVersionBadge } from "@/components/system/ChiaOSVersionBadge";

const bootLines = [
  "original setup confirmed",
  "system director online",
  "proof modules indexed",
  "local assistant armed",
];

const bootStats = [
  { label: "Route", value: "/system" },
  { label: "Mode", value: "Activated" },
  { label: "Signal", value: "AI-first" },
];

export function BootScreen() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      data-system-section
      className="system-section relative px-4 pt-8 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: -16 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="system-grid overflow-hidden rounded-[1.75rem] border border-white/12 bg-[#0B0F17]/86 shadow-2xl shadow-[rgba(0,217,255,0.12)]"
        >
          <div className="grid gap-0 lg:grid-cols-[1fr_0.72fr]">
            <div className="p-4 sm:p-5">
              <div className="flex flex-col gap-3 border-b border-white/12 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#00D9FF]/35 bg-[#00D9FF]/10 text-[#00D9FF]">
                    <Cpu className="h-4 w-4" aria-hidden />
                  </span>
                  <div>
                    <p className="font-code text-xs uppercase text-[#00D9FF]">
                      ChiaOS activation sequence
                    </p>
                    <p className="text-sm text-[#AAB4C0]">
                      Clean setup handed off to the activated system.
                    </p>
                  </div>
                </div>
                <ChiaOSVersionBadge showHint />
              </div>
              <div className="grid gap-2 pt-4 sm:grid-cols-2 lg:grid-cols-4">
                {bootLines.map((line, index) => (
                  <motion.div
                    key={line}
                    initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                    animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                    className="rounded-2xl border border-white/10 bg-[#05070B]/48 px-3 py-3 font-code text-xs text-[#AAB4C0]"
                  >
                    <span className="text-[#FFD400]">0{index + 1}</span> / {line}
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="border-t border-white/12 bg-[#101624]/78 p-4 sm:p-5 lg:border-l lg:border-t-0">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-code text-xs uppercase text-[#FFD400]">
                    System status
                  </p>
                  <p className="mt-2 font-display text-2xl font-semibold text-[#F8FAFC]">
                    Ready for inspection.
                  </p>
                </div>
                <Radar className="h-6 w-6 text-[#FFD400]" aria-hidden />
              </div>
              <div className="mt-4 grid gap-2">
                {bootStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#05070B]/42 px-3 py-2"
                  >
                    <span className="flex items-center gap-2 text-sm text-[#AAB4C0]">
                      <CheckCircle2 className="h-4 w-4 text-[#00D9FF]" aria-hidden />
                      {stat.label}
                    </span>
                    <span className="font-code text-xs uppercase text-[#F8FAFC]">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
