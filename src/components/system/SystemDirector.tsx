"use client";

import { useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DirectorScene } from "./director/DirectorScene";
import { formations } from "./director/formations";
import type { SystemDirectorProps } from "./director/types";

export function SystemDirector({
  activeSection,
  highlightedMissionId = null,
  highlightedSkill = null,
}: SystemDirectorProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const [mobile, setMobile] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null);
  const formation = formations[activeSection];
  const directorLabel = useMemo(() => formation.label, [formation.label]);
  const directorStatus = useMemo(() => formation.status, [formation.status]);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    let frameId = 0;

    try {
      const testCanvas = document.createElement("canvas");
      const context =
        testCanvas.getContext("webgl2") ??
        testCanvas.getContext("webgl") ??
        testCanvas.getContext("experimental-webgl");

      frameId = window.requestAnimationFrame(() => setWebglAvailable(Boolean(context)));
    } catch {
      frameId = window.requestAnimationFrame(() => setWebglAvailable(false));
    }

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  return (
    <>
      <div
        className="system-director pointer-events-none fixed inset-0 z-[1] overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute inset-y-0 right-0 hidden w-[min(48rem,52vw)] border-l border-[#00D9FF]/14 opacity-85 lg:block"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,217,255,0.08) 34%, rgba(255,212,0,0.06) 100%), radial-gradient(circle at 62% 34%, rgba(0,217,255,0.26), transparent 34%), radial-gradient(circle at 74% 62%, rgba(255,212,0,0.19), transparent 30%)",
          }}
        />
        <div className="absolute right-[4%] top-[16%] hidden h-[68vh] w-px bg-gradient-to-b from-transparent via-[#00D9FF]/65 to-transparent lg:block" />
        <div className="absolute right-[7%] top-[22%] hidden h-[44vh] w-px bg-gradient-to-b from-transparent via-[#FFD400]/45 to-transparent lg:block" />
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            mobile ? "opacity-70" : "opacity-95"
          )}
          style={{
            background:
              activeSection === "roadmap" || activeSection === "timeline" || activeSection === "life-os"
                ? "radial-gradient(circle at 78% 36%, rgba(255,212,0,0.28), transparent 30%), radial-gradient(circle at 24% 42%, rgba(0,217,255,0.18), transparent 34%)"
                : "radial-gradient(circle at 76% 36%, rgba(0,217,255,0.3), transparent 30%), radial-gradient(circle at 26% 52%, rgba(255,212,0,0.15), transparent 34%)",
          }}
        />
      </div>
      <div
        className="system-director-visual pointer-events-none fixed inset-0 z-[12] overflow-hidden"
        aria-hidden="true"
      >
        {webglAvailable ? (
          <Canvas
            aria-label="Scroll-guided ChiaOS System Director"
            className="absolute inset-0 h-full w-full"
            camera={{ position: [mobile ? 0 : 0.6, 0, mobile ? 6.3 : 5.6], fov: mobile ? 50 : 50 }}
            dpr={mobile ? [1, 1.25] : [1, 1.6]}
            frameloop={reduceMotion ? "demand" : "always"}
            gl={{ antialias: !mobile, powerPreference: "high-performance", alpha: true }}
          >
            <DirectorScene
              activeSection={activeSection}
              highlightedMissionId={highlightedMissionId}
              highlightedSkill={highlightedSkill}
              reduceMotion={reduceMotion}
              mobile={mobile}
            />
          </Canvas>
        ) : (
          <div className="system-director-fallback absolute inset-0">
            <div className="absolute left-[9%] top-[43%] hidden h-20 w-20 -translate-y-1/2 rounded-full border border-[#FFD400]/60 shadow-[0_0_42px_rgba(255,212,0,0.34)] md:block">
              <div className="absolute inset-4 rounded-full border border-[#00D9FF]/60" />
              <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFD400] shadow-[0_0_22px_rgba(255,212,0,0.8)]" />
            </div>
            <div className="absolute left-[12%] top-[45%] hidden h-2 w-[58%] -translate-y-1/2 rotate-[-8deg] rounded-full bg-gradient-to-r from-[#FFD400]/80 via-[#00D9FF]/70 to-transparent shadow-[0_0_32px_rgba(0,217,255,0.38)] md:block" />
            <div className="absolute left-[22%] top-[50%] hidden h-px w-[46%] -translate-y-1/2 rotate-[-8deg] bg-gradient-to-r from-[#B7F7FF]/70 via-[#FFD400]/45 to-transparent md:block" />
            <div className="absolute right-[6%] top-[24%] h-72 w-72 rounded-full border-2 border-[#00D9FF]/55 bg-[#00D9FF]/16 shadow-[0_0_110px_rgba(0,217,255,0.54)] md:h-[28rem] md:w-[28rem]">
              <div className="absolute inset-10 rounded-full border border-[#FFD400]/45" />
              <div className="absolute inset-20 rounded-full border border-[#B7F7FF]/25" />
              <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-xl border border-[#B7F7FF]/65 bg-[#0B0F17]/80 shadow-[0_0_52px_rgba(0,217,255,0.55)]">
                <span className="absolute left-1/2 top-2 h-20 w-1 -translate-x-1/2 bg-[#00D9FF]/60" />
                <span className="absolute left-2 top-1/2 h-1 w-20 -translate-y-1/2 bg-[#FFD400]/70" />
              </div>
              {[
                ["left-[16%] top-[18%]", "AI"],
                ["right-[13%] top-[26%]", "Cloud"],
                ["left-[12%] bottom-[22%]", "Data"],
                ["right-[18%] bottom-[18%]", "Net"],
              ].map(([position, label]) => (
                <div
                  key={label}
                  className={cn(
                    "absolute h-14 w-20 rounded-xl border border-[#00D9FF]/35 bg-[#101624]/76 text-center font-code text-[10px] uppercase leading-[3.5rem] text-[#B7F7FF] shadow-[0_0_28px_rgba(0,217,255,0.2)]",
                    position
                  )}
                >
                  {label}
                </div>
              ))}
              <div className="absolute left-[12%] top-1/2 h-1 w-[76%] -translate-y-1/2 rotate-[-10deg] bg-gradient-to-r from-[#00D9FF]/20 via-[#FFD400]/70 to-[#00D9FF]/30" />
              <div className="absolute left-[18%] top-[58%] h-1 w-[64%] rotate-[18deg] bg-gradient-to-r from-[#FFD400]/20 via-[#00D9FF]/70 to-[#FFD400]/30" />
            </div>
            <div className="absolute bottom-24 right-5 max-w-[18rem] rounded-2xl border border-[#00D9FF]/32 bg-[#05070B]/72 p-4 text-right shadow-[0_0_42px_rgba(0,217,255,0.24)] backdrop-blur-xl">
              <p className="font-code text-[10px] uppercase tracking-[0.28em] text-[#00D9FF]">
                Fallback Director
              </p>
              <p className="mt-1 font-display text-lg font-semibold text-white">{directorLabel}</p>
            </div>
          </div>
        )}
      </div>
      <div
        className="pointer-events-none fixed bottom-5 right-4 z-[13] hidden max-w-xs rounded-2xl border border-[#00D9FF]/30 bg-[#05070B]/68 p-4 text-right shadow-[0_0_48px_rgba(0,217,255,0.22)] backdrop-blur-xl lg:block"
        aria-hidden="true"
      >
        <p className="font-code text-xs uppercase tracking-[0.28em] text-[#00D9FF]">
          System Director
        </p>
        <p className="mt-1 font-display text-lg font-semibold text-[#F8FAFC]">{directorLabel}</p>
        <p className="mt-1 text-xs leading-5 text-[#AAB4C0]">{directorStatus}</p>
      </div>
    </>
  );
}
