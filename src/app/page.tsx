import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/LandingPage";

export const metadata: Metadata = {
  title: "ChiaOS Original Setup | Chia Yuen Kai",
  description:
    "A clean ChiaOS setup and CV landing page for Chia Yuen Kai before activating the full system experience.",
  alternates: {
    canonical: "https://chiaos-portfolio.vercel.app/",
  },
};

export default function Home() {
  return <LandingPage />;
}
