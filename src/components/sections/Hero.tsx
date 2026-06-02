"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Download, Gauge, RadioTower, Sparkles } from "lucide-react";
import { profile } from "@/data/profile";
import { SystemHeroScene } from "@/components/system/SystemHeroScene";

const cockpitReadouts = [
  { label: "AI", value: "Applied" },
  { label: "Cyber", value: "Building" },
  { label: "Cloud", value: "Design" },
];

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="absolute inset-0 -z-10 system-grid opacity-35" aria-hidden />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 system-speedlines opacity-40" aria-hidden />
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D9FF]/35 bg-[#00D9FF]/10 px-4 py-2 text-sm font-medium text-[#B7F7FF] shadow-[0_0_26px_rgba(0,217,255,0.18)]">
            <Sparkles className="h-4 w-4" aria-hidden />
            Activated ChiaOS System
          </div>
          <h1 className="mt-6 max-w-5xl font-display text-4xl font-semibold leading-[1.02] text-[#F8FAFC] sm:text-7xl lg:text-8xl">
            {profile.tagline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#AAB4C0]">
            The clean setup screen is unlocked. This is the full-send system:
            original interface work, 3D motion, local assistant logic, project proof,
            and career identity running as one portfolio experience.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#missions"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#00D9FF] px-5 text-sm font-semibold text-[#05070B] shadow-[0_0_34px_rgba(0,217,255,0.34)] transition hover:bg-[#7aecff]"
            >
              <ArrowDown className="h-4 w-4" aria-hidden />
              View Missions
            </a>
            <a
              href="/cv/chia-yuen-kai-cv-placeholder.pdf"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#FFD400]/35 bg-[#FFD400]/10 px-5 text-sm font-semibold text-[#FFF4B8] transition hover:border-[#FFD400]/70 hover:bg-[#FFD400]/15"
            >
              <Download className="h-4 w-4" aria-hidden />
              Download CV
            </a>
          </div>
          <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
            {cockpitReadouts.map((readout) => (
              <div
                key={readout.label}
                className="rounded-2xl border border-white/12 bg-[#0B0F17]/72 px-4 py-3"
              >
                <p className="font-code text-[11px] uppercase text-[#AAB4C0]">
                  {readout.label}
                </p>
                <p className="mt-1 font-display text-xl font-semibold text-[#F8FAFC]">
                  {readout.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <SystemHeroScene />
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/12 bg-[#0B0F17]/72 p-4">
              <div className="flex items-center justify-between">
                <p className="font-code text-xs uppercase text-[#00D9FF]">Identity</p>
                <RadioTower className="h-4 w-4 text-[#00D9FF]" aria-hidden />
              </div>
              <p className="mt-2 text-sm leading-6 text-[#AAB4C0]">{profile.identity}</p>
            </div>
            <div className="rounded-2xl border border-white/12 bg-[#0B0F17]/72 p-4">
              <div className="flex items-center justify-between">
                <p className="font-code text-xs uppercase text-[#FFD400]">Core signal</p>
                <Gauge className="h-4 w-4 text-[#FFD400]" aria-hidden />
              </div>
              <p className="mt-2 text-sm leading-6 text-[#AAB4C0]">
                Creative development, vibe coding, and practical career direction.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
