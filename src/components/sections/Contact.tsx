import { BriefcaseBusiness, Download, GitBranch, Mail } from "lucide-react";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <section
      id="contact"
      data-system-section
      className="system-section px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl rounded-3xl border border-[#00D9FF]/24 bg-[#0B0F17]/88 p-6 shadow-2xl shadow-[rgba(0,217,255,0.12)] sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="font-code text-sm uppercase text-[#00D9FF]">
              contact
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-[#F8FAFC] sm:text-5xl">
              Connect with {profile.preferredName}.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#AAB4C0]">
              Open to internship conversations, project feedback, and opportunities
              across AI, software engineering, cybersecurity, and cloud.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              href={`mailto:${profile.contact.email}`}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#00D9FF] px-5 text-sm font-semibold text-[#05070B] shadow-[0_0_24px_rgba(0,217,255,0.22)] transition hover:bg-[#7aecff] sm:w-auto lg:w-full"
            >
              <Mail className="h-4 w-4" aria-hidden />
              Email
            </a>
            <a
              href={profile.contact.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/12 px-5 text-sm font-semibold text-white transition hover:border-[#00D9FF]/50 sm:w-auto lg:w-full"
            >
              <GitBranch className="h-4 w-4" aria-hidden />
              GitHub
            </a>
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/12 px-5 text-sm font-semibold text-white transition hover:border-[#FFD400]/55 sm:w-auto lg:w-full"
            >
              <BriefcaseBusiness className="h-4 w-4" aria-hidden />
              LinkedIn
            </a>
            <a
              href="/cv/chia-yuen-kai-cv-placeholder.pdf"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/12 px-5 text-sm font-semibold text-white transition hover:border-[#FFD400]/55 sm:w-auto lg:w-full"
            >
              <Download className="h-4 w-4" aria-hidden />
              CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
