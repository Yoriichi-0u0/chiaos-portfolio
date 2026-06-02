"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Cpu } from "lucide-react";

const bootLines = [
  "calibrating AI telemetry",
  "arming mission files",
  "syncing skill vectors",
  "race control ready",
];

export function BootScreen() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="top" className="relative px-4 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: -16 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="builder-grid rounded-2xl border border-white/12 bg-[#0B0F17]/82 p-4 shadow-2xl shadow-[rgba(0,217,255,0.12)]"
        >
          <div className="flex items-center gap-3 border-b border-white/12 pb-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#00D9FF]/35 bg-[#00D9FF]/10 text-[#00D9FF]">
              <Cpu className="h-4 w-4" aria-hidden />
            </span>
            <div>
              <p className="font-code text-xs uppercase text-[#00D9FF]">
                ChiaOS startup telemetry
              </p>
              <p className="text-sm text-[#AAB4C0]">AI cockpit data online</p>
            </div>
          </div>
          <div className="grid gap-2 pt-4 sm:grid-cols-2 lg:grid-cols-4">
            {bootLines.map((line, index) => (
              <motion.div
                key={line}
                initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="font-code text-xs text-[#AAB4C0]"
              >
                <span className="text-[#FFD400]">0{index + 1}</span> / {line}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
