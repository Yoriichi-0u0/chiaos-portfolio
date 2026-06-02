import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Cpu,
  Download,
  GitBranch,
  GraduationCap,
  Power,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { missions } from "@/data/missions";
import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";

const previewSkills = skillGroups.slice(0, 3);
const featuredMission = missions[0];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F]">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-[#D2D2D7]/80 bg-[#F5F5F7]/88 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a href="#top" className="font-display text-lg font-semibold">
            ChiaOS
          </a>
          <div className="hidden items-center gap-1 md:flex">
            <a href="#cv" className="rounded-full px-3 py-2 text-sm text-[#6E6E73] transition hover:bg-white hover:text-[#1D1D1F]">
              CV
            </a>
            <a href="#skills" className="rounded-full px-3 py-2 text-sm text-[#6E6E73] transition hover:bg-white hover:text-[#1D1D1F]">
              Skills
            </a>
            <a href="#mission" className="rounded-full px-3 py-2 text-sm text-[#6E6E73] transition hover:bg-white hover:text-[#1D1D1F]">
              Mission
            </a>
          </div>
          <Link
            href="/system"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#1D1D1F] px-4 text-sm font-semibold text-white transition hover:bg-black"
          >
            <Power className="h-4 w-4" aria-hidden />
            Activate
          </Link>
        </nav>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section id="top" className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div className="mx-auto w-full max-w-sm lg:order-2 lg:max-w-md">
              <div className="rounded-[2rem] border border-[#D2D2D7] bg-[#FDFDFE] p-3 shadow-[0_24px_80px_rgba(29,29,31,0.12)]">
                <div className="rounded-[1.5rem] border border-[#E5E5EA] bg-white px-5 py-7">
                  <div className="mx-auto mb-6 h-1.5 w-20 rounded-full bg-[#D2D2D7]" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase text-[#6E6E73]">
                        Original Setup
                      </p>
                      <h1 className="mt-2 font-display text-4xl font-semibold tracking-normal text-[#1D1D1F]">
                        Welcome to ChiaOS
                      </h1>
                    </div>
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#F5F5F7] text-[#0071E3]">
                      <Cpu className="h-5 w-5" aria-hidden />
                    </span>
                  </div>
                  <div className="mt-8 grid gap-3">
                    {profile.targetRoles.slice(0, 3).map((role) => (
                      <div
                        key={role}
                        className="flex items-center justify-between rounded-2xl bg-[#F5F5F7] px-4 py-3"
                      >
                        <span className="text-sm font-medium">{role}</span>
                        <ShieldCheck className="h-4 w-4 text-[#0071E3]" aria-hidden />
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 rounded-2xl bg-[#1D1D1F] p-4 text-white">
                    <p className="text-sm font-medium">System Core locked</p>
                    <p className="mt-2 text-sm leading-6 text-[#D1D5DB]">
                      Clean CV interface ready. Activate ChiaOS to unlock the full development system.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div id="cv" className="max-w-3xl">
              <p className="inline-flex rounded-full border border-[#D2D2D7] bg-white px-4 py-2 text-sm font-medium text-[#6E6E73]">
                Brand-new setup / CV interface
              </p>
              <h2 className="mt-6 font-display text-5xl font-semibold leading-tight text-[#1D1D1F] sm:text-7xl">
                Original, clean, untouched.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6E6E73]">
                {profile.name} is a {profile.degree} student at {profile.university},
                focused on {profile.majors.join(" and ")}. ChiaOS starts as a calm CV
                landing page, then opens into a full system built to show development
                skill, creative direction, and career identity.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/cv/chia-yuen-kai-cv-placeholder.pdf"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#1D1D1F] bg-white px-5 text-sm font-semibold text-[#1D1D1F] transition hover:bg-[#F5F5F7]"
                >
                  <Download className="h-4 w-4" aria-hidden />
                  Download CV
                </a>
                <Link
                  href="/system"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#1D1D1F] px-5 text-sm font-semibold text-white transition hover:bg-black"
                >
                  <Power className="h-4 w-4" aria-hidden />
                  Activate ChiaOS
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                <a
                  href={profile.contact.github}
                  className="inline-flex items-center gap-2 rounded-full border border-[#D2D2D7] bg-white px-4 py-2 text-sm font-medium text-[#1D1D1F] transition hover:border-[#0071E3]/40"
                >
                  <GitBranch className="h-4 w-4" aria-hidden />
                  GitHub
                </a>
                <a
                  href={profile.contact.linkedin}
                  className="inline-flex items-center gap-2 rounded-full border border-[#D2D2D7] bg-white px-4 py-2 text-sm font-medium text-[#1D1D1F] transition hover:border-[#0071E3]/40"
                >
                  <BriefcaseBusiness className="h-4 w-4" aria-hidden />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="border-y border-[#D2D2D7]/70 bg-white px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase text-[#0071E3]">Key skills preview</p>
                <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
                  A clean scan before activation.
                </h2>
              </div>
              <Link href="/system#skills" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0071E3]">
                Open System Core
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {previewSkills.map((group) => (
                <article
                  key={group.title}
                  className="rounded-2xl border border-[#D2D2D7] bg-[#F5F5F7] p-5"
                >
                  <Sparkles className="h-5 w-5 text-[#0071E3]" aria-hidden />
                  <h3 className="mt-4 text-xl font-semibold">{group.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#6E6E73]">{group.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="mission" className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase text-[#0071E3]">
                Featured mission preview
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
                One proof file on the setup screen.
              </h2>
            </div>
            <article className="rounded-2xl border border-[#D2D2D7] bg-white p-6 shadow-[0_16px_50px_rgba(29,29,31,0.08)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#0071E3]">{featuredMission.category}</p>
                  <h3 className="mt-2 text-2xl font-semibold">{featuredMission.title}</h3>
                </div>
                <GraduationCap className="h-7 w-7 text-[#6E6E73]" aria-hidden />
              </div>
              <p className="mt-4 text-sm leading-6 text-[#6E6E73]">
                {featuredMission.summary}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {featuredMission.technologies.slice(0, 4).map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full bg-[#F5F5F7] px-3 py-1 text-xs font-medium"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
