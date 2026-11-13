"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowDown, Pause, Play } from "lucide-react";
import { formatGistempReading, gistempAnnual, gistempSource } from "@/data/gistemp";
import { missions } from "@/data/missions";
import { useWebGLAvailable } from "@/hooks/useWebGLAvailable";
import { setGalleryActive } from "@/hooks/galleryActivity";
import { cn } from "@/lib/utils";
import { anomalyColor, galleryArtifacts, toHex, type GalleryArtifactId } from "./galleryData";

const GalleryStage = dynamic(() => import("./GalleryStage").then((module) => module.GalleryStage), {
  ssr: false,
  loading: () => null,
});

function EarthRecordPoster({ year }: { year: number }) {
  const count = gistempAnnual.length;
  return (
    <svg viewBox="-110 -110 220 220" className="h-full max-h-80 w-auto" aria-hidden>
      <circle r="104" fill="#0B0F17" stroke="#00D9FF" strokeWidth="1" />
      {gistempAnnual.map((value, index) => (
        <circle
          key={index}
          r={94 - (index / count) * 58}
          fill="none"
          stroke={toHex(anomalyColor(value))}
          strokeWidth={58 / count + 0.15}
        />
      ))}
      <circle r={94 - (year / count) * 58} fill="none" stroke="#FFFFFF" strokeWidth={1.4} />
      <circle r="28" fill="#FFD400" />
      <circle r="3" fill="#0B0F17" />
    </svg>
  );
}

export function MissionGallery({ onSelect }: { onSelect?: (missionId: string | null) => void }) {
  const reduceMotion = Boolean(useReducedMotion());
  const webgl = useWebGLAvailable();
  const [selected, setSelected] = useState<GalleryArtifactId>("earth-fm");
  const [year, setYear] = useState(gistempAnnual.length - 1);
  const [playing, setPlaying] = useState(false);
  const [nearViewport, setNearViewport] = useState(false);
  const [hasBeenNear, setHasBeenNear] = useState(false);
  const [mobile, setMobile] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const artifact = galleryArtifacts.find((item) => item.id === selected) ?? galleryArtifacts[0];
  const mission = missions.find((item) => item.id === selected);
  const Icon = artifact.icon;

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setNearViewport(entry.isIntersecting);
        if (entry.isIntersecting) {
          setHasBeenNear(true);
        }
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!nearViewport || reduceMotion || !webgl) {
      const frame = window.requestAnimationFrame(() => setPlaying(false));
      return () => window.cancelAnimationFrame(frame);
    }
  }, [nearViewport, reduceMotion, webgl]);

  useEffect(() => {
    setGalleryActive(Boolean(webgl && nearViewport));
    return () => setGalleryActive(false);
  }, [webgl, nearViewport]);

  const handleYearChange = useCallback((index: number, fromPointer: boolean) => {
    setYear(index);
    if (fromPointer) {
      setPlaying(false);
    }
  }, []);

  const handlePlaybackEnd = useCallback(() => setPlaying(false), []);

  function select(id: GalleryArtifactId) {
    setSelected(id);
    setPlaying(false);
    onSelect?.(id);
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = galleryArtifacts.length - 1;
    const next =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? (index + 1) % galleryArtifacts.length
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? (index - 1 + galleryArtifacts.length) % galleryArtifacts.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) {
      return;
    }
    event.preventDefault();
    select(galleryArtifacts[next].id);
    tabRefs.current[next]?.focus();
  }

  const value = gistempAnnual[year] ?? 0;

  return (
    <div className="mt-8 overflow-hidden rounded-3xl border border-white/12 bg-[#0B0F17]">
      <div
        role="tablist"
        aria-label="Featured mission artifacts"
        className="flex gap-1 overflow-x-auto border-b border-white/10 p-2 [scrollbar-width:none]"
      >
        {galleryArtifacts.map((item, index) => {
          const TabIcon = item.icon;
          const active = item.id === selected;
          return (
            <button
              key={item.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={`gallery-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls="gallery-panel"
              tabIndex={active ? 0 : -1}
              onClick={() => select(item.id)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
              className={cn(
                "inline-flex h-10 shrink-0 items-center gap-2 rounded-xl px-3 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00D9FF] motion-reduce:transition-none",
                active ? "bg-[#101624] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]" : "text-[#AAB4C0] hover:bg-white/5 hover:text-white"
              )}
            >
              <TabIcon className="h-4 w-4" style={{ color: item.accent }} aria-hidden />
              {item.short}
            </button>
          );
        })}
      </div>

      <div
        id="gallery-panel"
        role="tabpanel"
        aria-labelledby={`gallery-tab-${selected}`}
        className="grid lg:grid-cols-[1.25fr_1fr]"
      >
        <div
          ref={stageRef}
          data-gallery-stage
          className="relative aspect-[4/3] min-h-[18rem] overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_50%_45%,#132036_0%,#070A10_70%)] lg:aspect-auto lg:min-h-[30rem] lg:border-b-0 lg:border-r"
          style={{ touchAction: "pan-y" }}
        >
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 opacity-60"
            style={{ background: `radial-gradient(ellipse at 50% 100%, ${artifact.accent}33, transparent 70%)` }}
            aria-hidden
          />
          {webgl && hasBeenNear ? (
            <div className="absolute inset-0" aria-hidden>
              <GalleryStage
                selected={selected}
                year={year}
                playing={playing}
                reduceMotion={reduceMotion}
                mobile={mobile}
                active={nearViewport}
                onYearChange={handleYearChange}
                onPlaybackEnd={handlePlaybackEnd}
              />
            </div>
          ) : null}
          {webgl === false ? (
            <div className="gallery-fallback absolute inset-0 flex items-center justify-center p-8" aria-hidden>
              {selected === "earth-fm" ? (
                <EarthRecordPoster year={year} />
              ) : (
                <span
                  className="flex h-40 w-40 items-center justify-center rounded-full border-2"
                  style={{ borderColor: `${artifact.accent}88`, boxShadow: `0 0 80px ${artifact.accent}33` }}
                >
                  <Icon className="h-16 w-16" style={{ color: artifact.accent }} />
                </span>
              )}
            </div>
          ) : null}
          <p className="absolute left-4 top-4 rounded-full border border-white/12 bg-[#05070B] px-3 py-1 font-code text-[11px] uppercase tracking-[0.14em] text-[#AAB4C0]">
            {artifact.artifact}
          </p>
          {webgl && !reduceMotion ? (
            <p className="absolute bottom-4 left-4 hidden font-code text-[11px] uppercase tracking-[0.14em] text-[#7D8794] sm:block">
              Drag to tilt{selected === "earth-fm" ? " · hover grooves to read a year" : ""}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-5 p-5 sm:p-7">
          <div>
            <p className="font-code text-xs uppercase tracking-[0.14em]" style={{ color: artifact.accent }}>
              {mission?.category}
              {mission?.period ? <span className="text-[#AAB4C0]"> · {mission.period}</span> : null}
            </p>
            <h3 className="mt-2 font-display text-3xl font-semibold text-[#F8FAFC]">{mission?.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[#C9D1DB]">{mission?.summary}</p>
          </div>

          {selected === "earth-fm" ? (
            <div className="rounded-2xl border border-white/12 bg-[#05070B] p-4">
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                <p className="font-code text-xs uppercase tracking-[0.14em] text-[#AAB4C0]">Groove reading</p>
                <span className="inline-flex items-center gap-2 whitespace-nowrap font-code text-sm text-white" aria-live="polite">
                  <span className="h-3 w-3 rounded-full" style={{ background: toHex(anomalyColor(value)) }} aria-hidden />
                  {formatGistempReading(year)}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                {!reduceMotion && webgl ? (
                  <button
                    type="button"
                    onClick={() => setPlaying((current) => !current)}
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFD400] text-[#05070B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD400]"
                  >
                    {playing ? <Pause className="h-4 w-4" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}
                    <span className="sr-only">
                      {playing
                        ? "Pause record"
                        : year >= gistempAnnual.length - 1
                          ? `Play record from ${gistempSource.firstYear}`
                          : "Play record year by year"}
                    </span>
                  </button>
                ) : null}
                <label className="flex w-full flex-col gap-1">
                  <span className="sr-only">Year on the Earth data record</span>
                  <input
                    type="range"
                    min={0}
                    max={gistempAnnual.length - 1}
                    value={year}
                    onChange={(event) => {
                      setPlaying(false);
                      setYear(Number(event.target.value));
                    }}
                    aria-valuetext={formatGistempReading(year)}
                    className="w-full accent-[#FFD400]"
                  />
                  <span className="flex justify-between font-code text-[11px] text-[#7D8794]" aria-hidden>
                    <span>{gistempSource.firstYear}</span>
                    <span>{gistempSource.lastYear}</span>
                  </span>
                </label>
              </div>
              <p className="mt-2 text-xs leading-5 text-[#7D8794]">
                Anomaly vs {gistempSource.baseline}. {gistempSource.label}, data checked {gistempSource.checkedOn}.
              </p>
            </div>
          ) : null}

          <div>
            <p className="font-code text-xs uppercase tracking-[0.14em] text-[#AAB4C0]">How to read it</p>
            <p className="mt-2 text-sm leading-6 text-[#C9D1DB]">{artifact.reading}</p>
            <p className="mt-2 text-xs leading-5 text-[#7D8794]">{artifact.dataNote}</p>
          </div>

          <a
            href={`#${selected}`}
            className="mt-auto inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-[#00D9FF]/35 px-4 text-sm font-semibold text-[#B7F7FF] transition hover:border-[#00D9FF]/70 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00D9FF]"
          >
            {mission?.caseStudy ? "Read the case study" : "Open the mission file"}
            <ArrowDown className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>
    </div>
  );
}
