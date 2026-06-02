import { BriefcaseBusiness, GitBranch, Mail } from "lucide-react";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-white/12 bg-[#05070B] px-4 py-8 text-[#AAB4C0] sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg font-semibold text-white">ChiaOS System</p>
          <p className="mt-1 text-sm">
            Activated by {profile.name}. {profile.tagline}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={`mailto:${profile.contact.email}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 transition hover:border-[#00D9FF]/60 hover:text-white"
            aria-label="Email Chia"
          >
            <Mail className="h-4 w-4" aria-hidden />
          </a>
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 transition hover:border-[#00D9FF]/60 hover:text-white"
            aria-label="Open Chia's GitHub"
          >
            <GitBranch className="h-4 w-4" aria-hidden />
          </a>
          <a
            href={profile.contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 transition hover:border-[#FFD400]/60 hover:text-white"
            aria-label="Open Chia's LinkedIn"
          >
            <BriefcaseBusiness className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
