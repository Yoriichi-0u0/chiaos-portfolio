"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  Bot,
  Download,
  Gauge,
  Layers3,
  RadioTower,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { profile } from "@/data/profile";

const cockpitReadouts = [
  { label: "Primary signal", value: "AI-first" },
  { label: "Operating proof", value: "Realfun" },
  { label: "Build style", value: "Vibe coding" },
];

const directorReadouts = [
  { label: "Active layer", value: "Scroll-guided 3D" },
  { label: "Focus loop", value: "Mission + skill cues" },
  { label: "Motion", value: "Reduced-safe" },
];

const systemRoutes = [
  {
    href: "#missions",
    label: "Mission proof",
    detail: "University builds, public repos, and honest placeholders.",
    icon: Layers3,
  },
  {
    href: "#skills",
    label: "Skill evidence",
    detail: "No fake percentages, only signals backed by work.",
    icon: ShieldCheck,
  },
  {
    href: "#ask",
    label: "Ask ChiaOS",
    detail: "Local answers drawn from the site data.",
    icon: Bot,
  },
];

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="identity"
      data-system-section
      className="system-section relative px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="absolute inset-0 -z-10 system-grid opacity-35" aria-hidden />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 system-speedlines opacity-40" aria-hidden />
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
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
            Activated system, running live.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#AAB4C0]">
            {profile.tagline} ChiaOS is the full-send layer: 3D direction,
            local assistant logic, mission proof, Realfun operations, and career
            identity arranged as one product experience.
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
          <div className="mt-5 grid max-w-3xl gap-3 md:grid-cols-3">
            {systemRoutes.map((route) => {
              const Icon = route.icon;

              return (
                <a
                  key={route.href}
                  href={route.href}
                  className="group rounded-2xl border border-white/12 bg-[#0B0F17]/72 p-4 transition hover:border-[#00D9FF]/45 hover:bg-[#101624]/88"
                >
                  <div className="flex items-center justify-between gap-4">
                    <Icon className="h-5 w-5 text-[#00D9FF]" aria-hidden />
                    <span className="h-2 w-2 rounded-full bg-[#FFD400] opacity-70 transition group-hover:scale-125" />
                  </div>
                  <p className="mt-4 font-display text-lg font-semibold text-[#F8FAFC]">
                    {route.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#AAB4C0]">
                    {route.detail}
                  </p>
                </a>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div className="rounded-[2rem] border border-[#00D9FF]/24 bg-[#0B0F17]/76 p-5 shadow-2xl shadow-[rgba(0,217,255,0.14)] backdrop-blur">
            <div className="flex items-center justify-between gap-4 border-b border-white/12 pb-4">
              <div>
                <p className="font-code text-xs uppercase text-[#00D9FF]">
                  System Director
                </p>
                <h2 className="mt-2 font-display text-3xl font-semibold text-[#F8FAFC]">
                  Camera operator online.
                </h2>
              </div>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#FFD400]/35 bg-[#FFD400]/10 text-[#FFD400]">
                <RadioTower className="h-5 w-5" aria-hidden />
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-[#AAB4C0]">
              The fixed 3D layer reacts to the section in view, mission focus,
              and skill focus. It behaves like a visual director rather than a
              decorative background.
            </p>
            <div className="mt-5 grid gap-3">
              {directorReadouts.map((readout) => (
                <div
                  key={readout.label}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-white/12 bg-[#101624]/74 px-4 py-3"
                >
                  <p className="font-code text-xs uppercase text-[#AAB4C0]">
                    {readout.label}
                  </p>
                  <p className="text-sm font-semibold text-[#F8FAFC]">{readout.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/12 bg-[#0B0F17]/72 p-4">
              <div className="flex items-center justify-between">
                <p className="font-code text-xs uppercase text-[#00D9FF]">Identity</p>
                <Sparkles className="h-4 w-4 text-[#00D9FF]" aria-hidden />
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
