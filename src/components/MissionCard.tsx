"use client";

import { ArrowUpRight, Cpu, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Mission } from "@/types/portfolio";
import { cn } from "@/lib/utils";

type MissionCardProps = {
  mission: Mission;
  index: number;
  highlighted?: boolean;
  onHover?: (missionId: string | null) => void;
};

export function MissionCard({
  mission,
  index,
  highlighted = false,
  onHover,
}: MissionCardProps) {
  const reduceMotion = useReducedMotion();
  const isExternalLink = mission.href.startsWith("http");

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={reduceMotion ? undefined : { duration: 0.45, delay: index * 0.05 }}
      onMouseEnter={() => onHover?.(mission.id)}
      onMouseLeave={() => onHover?.(null)}
      onPointerEnter={() => onHover?.(mission.id)}
      onPointerLeave={() => onHover?.(null)}
      onFocusCapture={() => onHover?.(mission.id)}
      onBlurCapture={() => onHover?.(null)}
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-[#101624]/90 p-5 shadow-2xl shadow-black/25 transition hover:border-[#00D9FF]/45 hover:shadow-[0_0_34px_rgba(0,217,255,0.14)]",
        highlighted
          ? "border-[#FFD400]/55 shadow-[0_0_38px_rgba(255,212,0,0.14)]"
          : "border-white/12"
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00D9FF] to-transparent" />
      <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-[#00D9FF] via-[#FFD400] to-transparent opacity-70" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-code text-xs uppercase text-[#00D9FF]">
            {mission.category}
          </p>
          <h3 className="mt-3 font-display text-2xl font-semibold text-[#F8FAFC]">
            {mission.title}
          </h3>
        </div>
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#00D9FF]/35 bg-[#00D9FF]/10 text-[#00D9FF] shadow-[0_0_24px_rgba(0,217,255,0.18)]">
          <Cpu className="h-5 w-5" aria-hidden />
        </span>
      </div>
      <div className="mt-4 inline-flex rounded-full border border-[#FFD400]/25 bg-[#FFD400]/10 px-3 py-1 font-code text-xs uppercase text-[#FFD400]">
        {mission.status}
      </div>
      <p className="mt-4 text-sm leading-6 text-[#AAB4C0]">{mission.summary}</p>
      <div className="mt-5 grid gap-2">
        {mission.proof.map((item) => (
          <div key={item} className="flex gap-2 text-sm text-[#AAB4C0]">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#00D9FF]" aria-hidden />
            <span>{item}</span>
          </div>
        ))}
      </div>
      {mission.note ? (
        <p className="mt-4 rounded-2xl border border-[#FFD400]/18 bg-[#FFD400]/8 px-4 py-3 text-sm leading-6 text-[#FFF4B8]">
          {mission.note}
        </p>
      ) : null}
      <div className="mt-5 flex flex-wrap gap-2">
        {mission.technologies.map((technology) => (
          <span
            key={technology}
            className="rounded-full border border-white/12 bg-white/6 px-3 py-1 text-xs text-[#E5E7EB]"
          >
            {technology}
          </span>
        ))}
      </div>
      <a
        href={mission.href}
        target={isExternalLink ? "_blank" : undefined}
        rel={isExternalLink ? "noreferrer" : undefined}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#00D9FF] transition group-hover:gap-3"
      >
        {mission.linkLabel}
        <ArrowUpRight className="h-4 w-4" aria-hidden />
      </a>
    </motion.article>
  );
}
