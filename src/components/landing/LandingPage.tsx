import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Cpu,
  Download,
  Fingerprint,
  GitBranch,
  GraduationCap,
  Layers3,
  Mail,
  MapPin,
  Power,
  Radar,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { ChiaOSVersionBadge } from "@/components/system/ChiaOSVersionBadge";
import { missions } from "@/data/missions";
import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";

const previewSkills = skillGroups.slice(0, 3);
const featuredMission = missions[0];

const identitySettings = [
  {
    label: "Location",
    value: profile.location,
    icon: MapPin,
  },
  {
    label: "Degree",
    value: profile.degree,
    icon: GraduationCap,
  },
  {
    label: "Focus",
    value: profile.majors.join(" + "),
    icon: ShieldCheck,
  },
  {
    label: "Target",
    value: profile.targetRoles.slice(0, 2).join(" / "),
    icon: BriefcaseBusiness,
  },
];

const setupSignals = [
  { label: "Profile", value: "Original setup" },
  { label: "Core", value: "CV interface" },
  { label: "Depth", value: "Activated system" },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F]">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-[#D8DADC]/80 bg-[#F5F5F7]/86 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <a href="#top" className="font-display text-lg font-semibold tracking-normal">
              ChiaOS
            </a>
            <ChiaOSVersionBadge tone="light" />
          </div>

          <div className="hidden items-center gap-1 md:flex">
            {[
              ["CV", "#cv"],
              ["Identity", "#identity"],
              ["Skills", "#skills"],
              ["Mission", "#mission"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="rounded-full px-3 py-2 text-sm text-[#6E6E73] transition hover:bg-white hover:text-[#1D1D1F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3]"
              >
                {label}
              </a>
            ))}
          </div>

          <Link
            href="/system"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#1D1D1F] px-4 text-sm font-semibold text-white transition hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3]"
          >
            <Power className="h-4 w-4" aria-hidden />
            Activate
          </Link>
        </nav>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section
          id="top"
          className="relative isolate overflow-hidden border-b border-[#D8DADC]/80 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
        >
          <div
            className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_74%_22%,rgba(255,255,255,0.94),transparent_28%),radial-gradient(circle_at_18%_72%,rgba(0,113,227,0.12),transparent_30%),linear-gradient(180deg,#FDFDFE_0%,#F5F5F7_72%,#ECEEF2_100%)]"
            aria-hidden
          />
          <div className="absolute -right-16 top-12 -z-10 hidden h-[34rem] w-[44rem] max-w-[52vw] rounded-l-lg border border-white/80 bg-white/42 shadow-[0_40px_120px_rgba(29,29,31,0.12)] backdrop-blur-2xl lg:block" aria-hidden>
            <div className="flex h-12 items-center justify-between border-b border-[#D8DADC]/70 px-6">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
              </div>
              <span className="font-code text-xs uppercase tracking-[0.2em] text-[#86868B]">
                Original Setup
              </span>
            </div>
            <div className="grid grid-cols-[0.9fr_1.1fr] gap-5 p-6">
              <div className="space-y-3">
                {setupSignals.map((signal) => (
                  <div key={signal.label} className="rounded-lg border border-[#D8DADC]/80 bg-white/70 p-4">
                    <p className="font-code text-[11px] uppercase text-[#86868B]">{signal.label}</p>
                    <p className="mt-2 font-display text-xl font-semibold">{signal.value}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-[#1D1D1F]/10 bg-[#1D1D1F] p-5 text-white shadow-[0_30px_80px_rgba(29,29,31,0.22)]">
                <div className="flex items-center justify-between">
                  <span className="font-code text-xs uppercase tracking-[0.18em] text-[#AAB4C0]">
                    ChiaOS Core
                  </span>
                  <Cpu className="h-5 w-5 text-[#7DD3FC]" aria-hidden />
                </div>
                <div className="mt-8 h-24 rounded-lg border border-white/10 bg-white/8" />
                <div className="mt-5 space-y-3">
                  {profile.targetRoles.slice(0, 3).map((role) => (
                    <div key={role} className="flex items-center justify-between border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
                      <span className="text-sm text-[#F8FAFC]">{role}</span>
                      <span className="h-2 w-2 rounded-full bg-[#7DD3FC]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-7xl">
            <div id="cv" className="max-w-[36rem]">
              <p className="inline-flex items-center gap-2 rounded-full border border-[#D8DADC] bg-white/76 px-4 py-2 text-sm font-medium text-[#6E6E73] shadow-sm backdrop-blur">
                <Fingerprint className="h-4 w-4 text-[#0071E3]" aria-hidden />
                Original Setup / CV Interface
              </p>
              <h1 className="mt-7 max-w-[36rem] font-display text-5xl font-semibold leading-[1.02] tracking-normal text-[#1D1D1F] sm:text-7xl lg:text-[5.5rem] 2xl:text-8xl">
                Welcome to ChiaOS.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#515154]">
                {profile.name} is a {profile.degree} student at {profile.university},
                focused on {profile.majors.join(" and ")}. The landing page stays calm
                and precise; the activated system carries the full development story.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/cv/chia-yuen-kai-cv-placeholder.pdf"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#1D1D1F]/15 bg-white px-5 text-sm font-semibold text-[#1D1D1F] shadow-sm transition hover:border-[#1D1D1F]/25 hover:bg-[#F9FAFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3]"
                >
                  <Download className="h-4 w-4" aria-hidden />
                  Download CV
                </a>
                <Link
                  href="/system"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#1D1D1F] px-5 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(29,29,31,0.18)] transition hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3]"
                >
                  <Power className="h-4 w-4" aria-hidden />
                  Activate ChiaOS
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[#D8DADC] bg-white/80 px-4 py-2 text-sm font-medium text-[#1D1D1F] transition hover:border-[#0071E3]/40"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  Email
                </a>
                <a
                  href={profile.contact.github}
                  className="inline-flex items-center gap-2 rounded-full border border-[#D8DADC] bg-white/80 px-4 py-2 text-sm font-medium text-[#1D1D1F] transition hover:border-[#0071E3]/40"
                  target="_blank"
                  rel="noreferrer"
                >
                  <GitBranch className="h-4 w-4" aria-hidden />
                  GitHub
                </a>
                <a
                  href={profile.contact.linkedin}
                  className="inline-flex items-center gap-2 rounded-full border border-[#D8DADC] bg-white/80 px-4 py-2 text-sm font-medium text-[#1D1D1F] transition hover:border-[#0071E3]/40"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BriefcaseBusiness className="h-4 w-4" aria-hidden />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="identity" className="border-b border-[#D8DADC]/80 bg-white px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <p className="font-code text-sm uppercase tracking-[0.12em] text-[#0071E3]">
                Identity settings
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                Career signal, without resume noise.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {identitySettings.map((item) => {
                const Icon = item.icon;

                return (
                  <article key={item.label} className="rounded-lg border border-[#D8DADC] bg-[#F5F5F7] p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-code text-[11px] uppercase tracking-[0.14em] text-[#86868B]">
                          {item.label}
                        </p>
                        <p className="mt-2 text-base font-semibold leading-6">{item.value}</p>
                      </div>
                      <Icon className="h-5 w-5 shrink-0 text-[#0071E3]" aria-hidden />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="skills" className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-code text-sm uppercase tracking-[0.12em] text-[#0071E3]">
                  Skill preview
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                  A clean scan before activation.
                </h2>
              </div>
              <Link
                href="/system#skills"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0071E3]"
              >
                Open System Core
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {previewSkills.map((group, index) => (
                <article key={group.title} className="rounded-lg border border-[#D8DADC] bg-white p-5 shadow-[0_14px_44px_rgba(29,29,31,0.06)]">
                  <div className="flex items-center justify-between">
                    <span className="font-code text-xs text-[#86868B]">0{index + 1}</span>
                    <Sparkles className="h-5 w-5 text-[#0071E3]" aria-hidden />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{group.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#6E6E73]">{group.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="mission" className="border-y border-[#D8DADC]/80 bg-white px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div>
              <p className="font-code text-sm uppercase tracking-[0.12em] text-[#0071E3]">
                Featured mission
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                One proof file on the setup screen.
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#6E6E73]">
                The landing stays selective. The full mission archive lives inside the
                activated ChiaOS system.
              </p>
            </div>

            <article className="rounded-lg border border-[#D8DADC] bg-[#F5F5F7] p-6 shadow-[0_18px_54px_rgba(29,29,31,0.08)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-code text-xs uppercase tracking-[0.14em] text-[#0071E3]">
                    {featuredMission.category}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold">{featuredMission.title}</h3>
                </div>
                <Layers3 className="h-7 w-7 text-[#6E6E73]" aria-hidden />
              </div>
              <p className="mt-4 text-sm leading-6 text-[#515154]">{featuredMission.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {featuredMission.technologies.slice(0, 4).map((technology) => (
                  <span key={technology} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[#515154]">
                    {technology}
                  </span>
                ))}
              </div>
              <Link
                href="/system#missions"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0071E3]"
              >
                View mission files
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </article>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-lg bg-[#1D1D1F] px-6 py-10 text-white shadow-[0_24px_80px_rgba(29,29,31,0.18)] sm:px-8 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-white/12 px-3 py-1 text-sm text-[#D1D5DB]">
                  <Radar className="h-4 w-4 text-[#7DD3FC]" aria-hidden />
                  Ready for activation
                </p>
                <h2 className="mt-5 font-display text-3xl font-semibold sm:text-5xl">
                  Enter the full ChiaOS System.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-[#AAB4C0]">
                  Open the activated interface for the 3D director, mission files,
                  skills, Realfun operations, roadmap, and local Ask ChiaOS assistant.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link
                  href="/system"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#1D1D1F] transition hover:bg-[#F5F5F7]"
                >
                  <Power className="h-4 w-4" aria-hidden />
                  Activate ChiaOS
                </Link>
                <a
                  href="/cv/chia-yuen-kai-cv-placeholder.pdf"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/16 px-5 text-sm font-semibold text-white transition hover:border-white/32"
                >
                  <Download className="h-4 w-4" aria-hidden />
                  CV
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
