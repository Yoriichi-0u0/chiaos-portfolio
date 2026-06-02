import type { Metadata } from "next";
import { ChiaOSApp } from "@/components/ChiaOSApp";

export const metadata: Metadata = {
  title: "Activated ChiaOS System | Chia Yuen Kai",
  description:
    "The activated ChiaOS system: a full-send interactive portfolio experience for development skill, creativity, and career identity.",
  alternates: {
    canonical: "https://chiaos-portfolio.vercel.app/system",
  },
};

export default function SystemPage() {
  return <ChiaOSApp />;
}
