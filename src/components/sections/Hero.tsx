"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Download, Gauge, RadioTower, Sparkles } from "lucide-react";
import { profile } from "@/data/profile";

const cockpitReadouts = [
  { label: "AI", value: "Applied" },
  { label: "Cyber", value: "Building" },
  { label: "Cloud", value: "Design" },
];

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
      <div className="absolute inset-0 -z-10 builder-grid opacity-35" aria-hidden />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 builder-speedlines opacity-40" aria-hidden />
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D9FF]/35 bg-[#00D9FF]/10 px-4 py-2 text-sm font-medium text-[#B7F7FF] shadow-[0_0_26px_rgba(0,217,255,0.18)]">
            <Sparkles className="h-4 w-4" aria-hidden />
            {profile.preferredName} AI racer cockpit
          </div>
          <h1 className="mt-6 max-w-5xl font-display text-5xl font-semibold leading-[1.02] text-[#F8FAFC] sm:text-7xl lg:text-8xl">
            {profile.tagline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#AAB4C0]">
            {profile.positioning}
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
          <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-[#0B0F17]/92 p-5 shadow-2xl shadow-[rgba(0,217,255,0.12)]">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00D9FF] to-transparent" />
            <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#00D9FF]/10 to-transparent" aria-hidden />
            <div className="flex items-center justify-between border-b border-white/12 pb-4">
              <div>
                <p className="font-code text-xs uppercase text-[#00D9FF]">
                  race control cockpit
                </p>
                <p className="mt-1 font-display text-2xl font-semibold text-[#F8FAFC]">
                  {profile.name}
                </p>
              </div>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#00D9FF]/35 bg-[#00D9FF]/10 text-[#00D9FF]">
                <RadioTower className="h-5 w-5" aria-hidden />
              </span>
            </div>
            <div className="mt-5 rounded-2xl border border-white/12 bg-[#101624] p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-code text-xs uppercase text-[#AAB4C0]">
                    operating mode
                  </p>
                  <p className="mt-1 font-display text-2xl font-semibold text-[#F8FAFC]">
                    Builder
                  </p>
                </div>
                <Gauge className="h-8 w-8 text-[#FFD400]" aria-hidden />
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/8">
                <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#FFD400]" />
              </div>
            </div>
            <div className="grid gap-3 pt-5">
              {profile.targetRoles.map((role) => (
                <div
                  key={role}
                  className="flex items-center justify-between rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3"
                >
                  <span className="text-sm text-[#E5E7EB]">{role}</span>
                  <span className="font-code text-xs text-[#FFD400]">checkpoint</span>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-[#00D9FF]/22 bg-[#00D9FF]/8 p-4">
              <p className="font-code text-xs uppercase text-[#00D9FF]">
                current identity
              </p>
              <p className="mt-2 text-sm leading-6 text-[#F8FAFC]">
                {profile.identity}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
