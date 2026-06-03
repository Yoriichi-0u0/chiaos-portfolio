import Link from "next/link";
import {
  ArrowRight,
  AtSign,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  Cpu,
  Download,
  ExternalLink,
  Fingerprint,
  GitBranch,
  GraduationCap,
  Layers3,
  MapPin,
  MessageSquare,
  Power,
  Radar,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { ChiaOSVersionBadge } from "@/components/system/ChiaOSVersionBadge";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { missions } from "@/data/missions";
import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";

const realfun = experience[0];
const priorityMissions = missions.slice(0, 3);

const navLinks = [
  ["Identity", "#identity"],
  ["Education", "#education"],
  ["Realfun", "#experience"],
  ["Projects", "#projects"],
  ["Skills", "#skills"],
];

const setupSignals = [
  { label: "State", value: "Original Setup" },
  { label: "Focus", value: "AI-first path" },
  { label: "Unlock", value: "Activated System" },
];

const snapshotCards = [
  {
    label: "Direction",
    value: "AI-focused CS student",
    detail: "Building through AI, cybersecurity, and practical systems.",
    icon: Cpu,
  },
  {
    label: "Swinburne",
    value: "AI + Cybersecurity",
    detail: education.currentStage ?? "Bachelor of Computer Science.",
    icon: GraduationCap,
  },
  {
    label: "Foundation",
    value: "Curtin CGPA 4.00",
    detail: education.foundation?.completed ?? "Foundation completed.",
    icon: BookOpen,
  },
  {
    label: "Operations",
    value: "Realfun since May 2023",
    detail: "Hotline, scheduling, events, and pressure handling.",
    icon: MessageSquare,
  },
  {
    label: "Flagship build",
    value: "COS30049",
    detail: "AI, full-stack, and system integration proof-of-work.",
    icon: Layers3,
  },
  {
    label: "ChiaOS",
    value: "Live age build",
    detail: "The system version updates as Chia does.",
    icon: Radar,
  },
];

const educationCards = [
  {
    title: education.degree,
    label: education.university,
    detail: `Double major: ${education.majors.join(" + ")}`,
    meta: education.currentStage,
  },
  {
    title: education.expectedGraduation ?? "Expected graduation",
    label: "Current trajectory",
    detail: education.cgpaSnapshot ?? "CGPA snapshot withheld.",
    meta: `${education.orientation} orientation / ${education.firstSemester} first semester`,
  },
  {
    title: education.foundation?.program ?? "Foundation",
    label: education.foundation?.institution ?? "Curtin University Malaysia",
    detail: education.foundation?.cgpa ?? "CGPA available on request.",
    meta: education.foundation?.completed,
  },
];

const realfunHighlights = [
  "Hotline communication with parents, students, and teachers",
  "Class reminders, replacements, rescheduling, and Zoom support",
  "Attendance, payment/admin tracking, and progress report support",
  "Canva posters, announcements, complaints, and urgent changes",
];

const contactLinks = [
  {
    label: "Email",
    href: `mailto:${profile.contact.email}`,
    icon: AtSign,
  },
  {
    label: "GitHub",
    href: profile.contact.github,
    icon: GitBranch,
  },
  {
    label: "LinkedIn",
    href: profile.contact.linkedin,
    icon: BriefcaseBusiness,
  },
];

function isExternalHref(href: string) {
  return href.startsWith("http");
}

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F]">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-[#D8DADC]/80 bg-[#F5F5F7]/88 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <a href="#top" className="font-display text-lg font-semibold tracking-normal">
              ChiaOS
            </a>
            <ChiaOSVersionBadge tone="light" showHint className="hidden sm:inline-flex" />
          </div>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="rounded-full px-3 py-2 text-sm text-[#6E6E73] transition hover:bg-white hover:text-[#1D1D1F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3]"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={profile.contact.github}
              target="_blank"
              rel="noreferrer"
              className="hidden h-10 items-center gap-2 rounded-full border border-[#D8DADC] bg-white/72 px-3 text-sm font-semibold text-[#1D1D1F] transition hover:border-[#0071E3]/40 md:inline-flex"
            >
              <GitBranch className="h-4 w-4" aria-hidden />
              GitHub
            </a>
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hidden h-10 items-center gap-2 rounded-full border border-[#D8DADC] bg-white/72 px-3 text-sm font-semibold text-[#1D1D1F] transition hover:border-[#0071E3]/40 xl:inline-flex"
            >
              <BriefcaseBusiness className="h-4 w-4" aria-hidden />
              LinkedIn
            </a>
            <a
              href="/cv/chia-yuen-kai-cv-placeholder.pdf"
              className="hidden h-10 items-center gap-2 rounded-full border border-[#1D1D1F]/15 bg-white px-3 text-sm font-semibold text-[#1D1D1F] shadow-sm transition hover:bg-[#F9FAFB] sm:inline-flex"
            >
              <Download className="h-4 w-4" aria-hidden />
              CV
            </a>
            <Link
              href="/system"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#1D1D1F] px-4 text-sm font-semibold text-white transition hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3]"
            >
              <Power className="h-4 w-4" aria-hidden />
              Activate
            </Link>
          </div>
        </nav>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section
          id="top"
          className="relative isolate overflow-hidden border-b border-[#D8DADC]/80 px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-22"
        >
          <div
            className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.96),transparent_30%),radial-gradient(circle_at_20%_78%,rgba(0,113,227,0.11),transparent_30%),radial-gradient(circle_at_66%_84%,rgba(255,212,0,0.12),transparent_24%),linear-gradient(180deg,#FDFDFE_0%,#F5F5F7_70%,#ECEEF2_100%)]"
            aria-hidden
          />

          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
            <div id="cv" className="max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-[#D8DADC] bg-white/76 px-4 py-2 text-sm font-medium text-[#6E6E73] shadow-sm backdrop-blur">
                <Fingerprint className="h-4 w-4 text-[#0071E3]" aria-hidden />
                Original Setup / CV Interface
              </p>
              <h1 className="mt-7 max-w-3xl font-display text-5xl font-semibold leading-[1.02] tracking-normal text-[#1D1D1F] sm:text-7xl lg:text-[5.65rem]">
                Welcome to ChiaOS.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#515154]">
                I&apos;m Chia, a Computer Science student building my path through AI,
                cybersecurity, and practical systems. This is the clean setup. Activate
                ChiaOS to enter the full system.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/system"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#1D1D1F] px-5 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(29,29,31,0.18)] transition hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3]"
                >
                  <Power className="h-4 w-4" aria-hidden />
                  Activate ChiaOS
                </Link>
                <a
                  href="/cv/chia-yuen-kai-cv-placeholder.pdf"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#1D1D1F]/15 bg-white px-5 text-sm font-semibold text-[#1D1D1F] shadow-sm transition hover:border-[#1D1D1F]/25 hover:bg-[#F9FAFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3]"
                >
                  <Download className="h-4 w-4" aria-hidden />
                  Download CV
                </a>
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                {contactLinks.map((link) => {
                  const Icon = link.icon;
                  const external = isExternalHref(link.href);

                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noreferrer" : undefined}
                      className="inline-flex items-center gap-2 rounded-full border border-[#D8DADC] bg-white/80 px-4 py-2 text-sm font-medium text-[#1D1D1F] transition hover:border-[#0071E3]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3]"
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_40%_30%,rgba(0,113,227,0.16),transparent_34%),radial-gradient(circle_at_80%_78%,rgba(255,212,0,0.18),transparent_30%)] blur-2xl" />
              <div className="rounded-[2rem] border border-white/80 bg-white/54 p-3 shadow-[0_40px_120px_rgba(29,29,31,0.13)] backdrop-blur-2xl">
                <div className="overflow-hidden rounded-[1.5rem] border border-[#D8DADC]/80 bg-[#FDFDFE]">
                  <div className="flex h-12 items-center justify-between border-b border-[#D8DADC]/70 px-5">
                    <div className="flex gap-2">
                      <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                      <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                      <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                    </div>
                    <span className="font-code text-xs uppercase tracking-[0.2em] text-[#86868B]">
                      Original Setup
                    </span>
                  </div>
                  <div className="grid gap-4 p-5 lg:grid-cols-[0.86fr_1.14fr]">
                    <div className="space-y-3">
                      {setupSignals.map((signal) => (
                        <div
                          key={signal.label}
                          className="rounded-lg border border-[#D8DADC]/80 bg-white/76 p-4"
                        >
                          <p className="font-code text-[11px] uppercase tracking-[0.14em] text-[#86868B]">
                            {signal.label}
                          </p>
                          <p className="mt-2 font-display text-xl font-semibold">
                            {signal.value}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-lg border border-[#1D1D1F]/10 bg-[#1D1D1F] p-5 text-white shadow-[0_30px_80px_rgba(29,29,31,0.22)]">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-code text-xs uppercase tracking-[0.18em] text-[#AAB4C0]">
                            Chia profile
                          </p>
                          <h2 className="mt-2 font-display text-3xl font-semibold">
                            {profile.preferredName}
                          </h2>
                        </div>
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/8 font-display text-xl font-semibold text-[#7DD3FC]">
                          CYK
                        </div>
                      </div>
                      <p className="mt-5 text-sm leading-6 text-[#D1D5DB]">
                        AI-focused Computer Science student. Miri hometown, currently
                        based in Kuching for studies.
                      </p>
                      <div className="mt-6 space-y-3">
                        {profile.targetRoles.slice(0, 3).map((role) => (
                          <div
                            key={role}
                            className="flex items-center justify-between border-b border-white/10 pb-3 last:border-b-0 last:pb-0"
                          >
                            <span className="text-sm text-[#F8FAFC]">{role}</span>
                            <span className="h-2 w-2 rounded-full bg-[#7DD3FC]" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#D8DADC]/80 bg-white px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {snapshotCards.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.label}
                  className="rounded-lg border border-[#D8DADC] bg-[#F5F5F7] p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-code text-[11px] uppercase tracking-[0.14em] text-[#86868B]">
                        {item.label}
                      </p>
                      <h2 className="mt-2 text-lg font-semibold leading-6">{item.value}</h2>
                    </div>
                    <Icon className="h-5 w-5 shrink-0 text-[#0071E3]" aria-hidden />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[#6E6E73]">{item.detail}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="identity" className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <p className="font-code text-sm uppercase tracking-[0.12em] text-[#0071E3]">
                About Chia
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                Career identity, not resume noise.
              </h2>
            </div>
            <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <article className="rounded-lg border border-[#D8DADC] bg-white p-6 shadow-[0_14px_44px_rgba(29,29,31,0.06)]">
                <p className="text-base leading-8 text-[#515154]">
                  I use AI as part of my daily workflow: planning, coding, testing,
                  writing, and shaping project direction. ChiaOS records what I have
                  built, what I have handled in real operations, and what I am becoming.
                </p>
                <p className="mt-4 text-base leading-8 text-[#515154]">
                  The clean landing keeps the 5-second story simple. The activated
                  system carries the deeper build logs, mission archive, roadmap, and
                  local Ask ChiaOS assistant.
                </p>
              </article>
              <article className="rounded-lg border border-[#D8DADC] bg-[#F5F5F7] p-6">
                <p className="font-code text-xs uppercase tracking-[0.14em] text-[#86868B]">
                  Public identity
                </p>
                <div className="mt-5 grid gap-4">
                  <div className="flex gap-3">
                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#0071E3]" aria-hidden />
                    <div>
                      <p className="font-semibold">{profile.location}</p>
                      <p className="mt-1 text-sm leading-6 text-[#6E6E73]">
                        Miri hometown, currently based in Kuching for studies.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#0071E3]" aria-hidden />
                    <div>
                      <p className="font-semibold">AI, cybersecurity, practical systems</p>
                      <p className="mt-1 text-sm leading-6 text-[#6E6E73]">
                        Internship direction stays subtle; the larger story is Chia&apos;s
                        builder identity.
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section
          id="education"
          className="border-y border-[#D8DADC]/80 bg-white px-4 py-14 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="font-code text-sm uppercase tracking-[0.12em] text-[#0071E3]">
                  Education
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                  Academic path, cleanly stated.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-[#6E6E73]">
                Public facts only. No student ID, home address, birth date, or raw
                transcript details are exposed.
              </p>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {educationCards.map((item) => (
                <article
                  key={item.title}
                  className="rounded-lg border border-[#D8DADC] bg-[#F5F5F7] p-6"
                >
                  <p className="font-code text-xs uppercase tracking-[0.14em] text-[#86868B]">
                    {item.label}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight">{item.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-[#515154]">{item.detail}</p>
                  {item.meta ? (
                    <p className="mt-5 inline-flex rounded-full bg-white px-3 py-1 text-xs font-medium text-[#515154]">
                      {item.meta}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.74fr_1.26fr] lg:items-start">
            <div>
              <p className="font-code text-sm uppercase tracking-[0.12em] text-[#0071E3]">
                Real-world Operations Training
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                Realfun is a major operating system.
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#6E6E73]">
                {realfun.role}, {realfun.organization}, {realfun.location}.{" "}
                {realfun.startDate} to {realfun.endDate}.
              </p>
            </div>

            <div className="grid gap-4">
              <article className="rounded-lg border border-[#D8DADC] bg-white p-6 shadow-[0_14px_44px_rgba(29,29,31,0.06)]">
                <p className="text-base leading-8 text-[#515154]">{realfun.summary}</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {realfun.metrics?.map((metric) => (
                    <div key={metric} className="rounded-lg bg-[#F5F5F7] p-4">
                      <Users className="h-5 w-5 text-[#0071E3]" aria-hidden />
                      <p className="mt-3 text-sm font-semibold">{metric}</p>
                    </div>
                  ))}
                </div>
              </article>

              <div className="grid gap-4 lg:grid-cols-2">
                <article className="rounded-lg border border-[#D8DADC] bg-[#F5F5F7] p-5">
                  <p className="font-code text-xs uppercase tracking-[0.14em] text-[#86868B]">
                    Daily operations
                  </p>
                  <div className="mt-4 grid gap-3">
                    {realfunHighlights.map((item) => (
                      <div key={item} className="flex gap-3 text-sm leading-6 text-[#515154]">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0071E3]" aria-hidden />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </article>
                <article className="rounded-lg border border-[#D8DADC] bg-[#1D1D1F] p-5 text-white">
                  <p className="font-code text-xs uppercase tracking-[0.14em] text-[#AAB4C0]">
                    Event + outage proof
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {realfun.events?.map((event) => (
                      <span
                        key={event}
                        className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs text-[#E5E7EB]"
                      >
                        {event}
                      </span>
                    ))}
                  </div>
                  {realfun.caseStudy ? (
                    <div className="mt-5 rounded-lg border border-[#FFD400]/20 bg-[#FFD400]/10 p-4">
                      <p className="text-sm font-semibold text-[#FFF4B8]">
                        {realfun.caseStudy.title}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[#D1D5DB]">
                        {realfun.caseStudy.summary}
                      </p>
                    </div>
                  ) : null}
                </article>
              </div>
            </div>
          </div>
        </section>

        <section
          id="projects"
          className="border-y border-[#D8DADC]/80 bg-white px-4 py-14 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-code text-sm uppercase tracking-[0.12em] text-[#0071E3]">
                  Featured projects
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                  Three proof files on the setup screen.
                </h2>
              </div>
              <Link
                href="/system#missions"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0071E3]"
              >
                View full mission archive
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {priorityMissions.map((mission) => {
                const external = isExternalHref(mission.href);

                return (
                  <article
                    key={mission.id}
                    className="rounded-lg border border-[#D8DADC] bg-[#F5F5F7] p-6 shadow-[0_18px_54px_rgba(29,29,31,0.08)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-code text-xs uppercase tracking-[0.14em] text-[#0071E3]">
                          {mission.category}
                        </p>
                        <h3 className="mt-3 text-2xl font-semibold leading-tight">
                          {mission.title}
                        </h3>
                      </div>
                      <Layers3 className="h-7 w-7 shrink-0 text-[#6E6E73]" aria-hidden />
                    </div>
                    <p className="mt-4 text-sm leading-6 text-[#515154]">
                      {mission.summary}
                    </p>
                    {mission.role ? (
                      <p className="mt-4 rounded-lg bg-white px-4 py-3 text-sm font-medium text-[#1D1D1F]">
                        {mission.role}
                      </p>
                    ) : null}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {mission.technologies.slice(0, 4).map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[#515154]"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                    <a
                      href={mission.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noreferrer" : undefined}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0071E3]"
                    >
                      {mission.linkLabel}
                      {external ? (
                        <ExternalLink className="h-4 w-4" aria-hidden />
                      ) : (
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      )}
                    </a>
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
                  Skills preview
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                  Evidence instead of fake percentages.
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

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {skillGroups.map((group, index) => (
                <article
                  key={group.title}
                  className="rounded-lg border border-[#D8DADC] bg-white p-5 shadow-[0_14px_44px_rgba(29,29,31,0.06)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-code text-xs text-[#86868B]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Sparkles className="h-5 w-5 text-[#0071E3]" aria-hidden />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{group.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#6E6E73]">
                    {group.description}
                  </p>
                  <div className="mt-4 grid gap-2">
                    {group.skills.slice(0, 2).map((skill) => (
                      <div key={skill.name} className="rounded-lg bg-[#F5F5F7] p-3">
                        <p className="text-sm font-semibold">{skill.name}</p>
                        <p className="mt-1 text-xs leading-5 text-[#6E6E73]">
                          {skill.evidence}
                        </p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-lg bg-[#1D1D1F] px-6 py-10 text-white shadow-[0_24px_80px_rgba(29,29,31,0.18)] sm:px-8 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-white/12 px-3 py-1 text-sm text-[#D1D5DB]">
                  <Radar className="h-4 w-4 text-[#7DD3FC]" aria-hidden />
                  This is the clean setup
                </p>
                <h2 className="mt-5 font-display text-3xl font-semibold sm:text-5xl">
                  The full ChiaOS system is where the deeper story runs.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-[#AAB4C0]">
                  Enter the activated interface for the 3D director, mission files,
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
                  href={`mailto:${profile.contact.email}`}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/16 px-5 text-sm font-semibold text-white transition hover:border-white/32"
                >
                  <AtSign className="h-4 w-4" aria-hidden />
                  Contact Chia
                </a>
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
