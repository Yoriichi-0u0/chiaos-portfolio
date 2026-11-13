import { profile } from "@/data/profile";

export const cv = {
  available: false,
  href: `mailto:${profile.contact.email}?subject=${encodeURIComponent("CV request: Chia Yuen Kai")}`,
  label: "Request CV",
  shortLabel: "CV",
  detail: "The updated CV is under review. Email Chia for a copy.",
} as const;
