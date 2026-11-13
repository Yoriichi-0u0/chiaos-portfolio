"use client";

import { useEffect, useRef, useState } from "react";

type CanvasStat = { name: string; median: number; p95: number; fps: number };
type HudState = {
  canvases: CanvasStat[];
  contextsCreated: number;
  contextsLost: number;
  contextsRestored: number;
  entries: Array<{ kind: "cold" | "warm"; ms: number | null }>;
  inputMedian: number | null;
  inputMax: number | null;
  inputCount: number;
  inputSource: "event-timing" | "next-frame";
};

function quantile(values: number[], q: number) {
  if (!values.length) {
    return 0;
  }
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.floor(q * sorted.length))];
}

function round(value: number) {
  return Math.round(value * 10) / 10;
}

function Hud() {
  const [state, setState] = useState<HudState | null>(null);
  const [copied, setCopied] = useState(false);
  const log = useRef({
    created: 0,
    lost: 0,
    restored: 0,
    entries: [] as Array<{ kind: "cold" | "warm"; ms: number | null }>,
    inputs: [] as number[],
    source: "next-frame" as HudState["inputSource"],
  });

  useEffect(() => {
    const data = log.current;
    const original = HTMLCanvasElement.prototype.getContext;
    const seen = new WeakSet<HTMLCanvasElement>();
    HTMLCanvasElement.prototype.getContext = function patched(this: HTMLCanvasElement, type: string, ...rest: unknown[]) {
      if (/webgl/.test(type) && !seen.has(this)) {
        seen.add(this);
        data.created += 1;
      }
      return (original as (...args: unknown[]) => RenderingContext | null).call(this, type, ...rest);
    } as typeof original;
    for (const canvas of Array.from(document.querySelectorAll("canvas"))) {
      if (!seen.has(canvas)) {
        seen.add(canvas);
        data.created += 1;
      }
    }

    const onLost = () => (data.lost += 1);
    const onRestored = () => (data.restored += 1);
    document.addEventListener("webglcontextlost", onLost, true);
    document.addEventListener("webglcontextrestored", onRestored, true);

    let observer: PerformanceObserver | null = null;
    const supportsEventTiming =
      typeof PerformanceObserver !== "undefined" && PerformanceObserver.supportedEntryTypes?.includes("event");
    const onInput = (event: Event) => {
      const start = event.timeStamp;
      requestAnimationFrame((frameTime) => data.inputs.push(Math.max(0, frameTime - start)));
    };
    if (supportsEventTiming) {
      data.source = "event-timing";
      observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (["pointerdown", "pointerup", "click", "keydown"].includes(entry.name)) {
            data.inputs.push(entry.duration);
          }
        }
      });
      observer.observe({ type: "event", buffered: false, durationThreshold: 16 } as PerformanceObserverInit);
    } else {
      document.addEventListener("pointerdown", onInput, true);
      document.addEventListener("keydown", onInput, true);
    }

    let pending: { started: number; base: number; kind: "cold" | "warm" } | null = null;
    const gallery = document.querySelector("[data-gallery-stage]");
    const intersection = gallery
      ? new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting) {
            pending = null;
            return;
          }
          pending = {
            started: performance.now(),
            base: window.__chiaosPerf?.gallery?.total ?? 0,
            kind: data.entries.length ? "warm" : "cold",
          };
        })
      : null;
    if (gallery && intersection) {
      intersection.observe(gallery);
    }

    const tick = window.setInterval(() => {
      if (pending) {
        const total = window.__chiaosPerf?.gallery?.total ?? 0;
        const elapsed = performance.now() - pending.started;
        if (total - pending.base >= 3) {
          data.entries.push({ kind: pending.kind, ms: Math.round(elapsed) });
          pending = null;
        } else if (elapsed > 30000) {
          data.entries.push({ kind: pending.kind, ms: null });
          pending = null;
        }
      }
      const canvases = Object.entries(window.__chiaosPerf ?? {}).map(([name, sample]) => {
        const recent = sample.frames.slice(-120);
        const median = quantile(recent, 0.5);
        return { name, median: round(median), p95: round(quantile(recent, 0.95)), fps: median ? Math.round(1000 / median) : 0 };
      });
      setState({
        canvases,
        contextsCreated: data.created,
        contextsLost: data.lost,
        contextsRestored: data.restored,
        entries: data.entries.slice(-8),
        inputMedian: data.inputs.length ? round(quantile(data.inputs, 0.5)) : null,
        inputCount: data.inputs.length,
        inputMax: data.inputs.length ? round(Math.max(...data.inputs)) : null,
        inputSource: data.source,
      });
    }, 250);

    return () => {
      window.clearInterval(tick);
      intersection?.disconnect();
      observer?.disconnect();
      document.removeEventListener("webglcontextlost", onLost, true);
      document.removeEventListener("webglcontextrestored", onRestored, true);
      document.removeEventListener("pointerdown", onInput, true);
      document.removeEventListener("keydown", onInput, true);
      HTMLCanvasElement.prototype.getContext = original;
    };
  }, []);

  if (!state) {
    return null;
  }

  const copy = async () => {
    const payload = {
      ...state,
      userAgent: navigator.userAgent,
      viewport: `${window.innerWidth}x${window.innerHeight}@${window.devicePixelRatio}`,
      renderer: new URLSearchParams(window.location.search).get("renderer") ?? "dual",
      frames: Object.fromEntries(Object.entries(window.__chiaosPerf ?? {}).map(([name, sample]) => [name, sample.frames.map(round)])),
      inputs: log.current.inputs.map(round),
      capturedAt: new Date().toISOString(),
    };
    try {
      await navigator.clipboard.writeText(JSON.stringify(payload));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      window.prompt("Copy perf JSON", JSON.stringify(payload));
    }
  };

  return (
    <div
      data-perf-hud
      className="fixed bottom-2 left-2 z-[100] max-w-[15rem] rounded-md border border-white/20 bg-black p-2 font-mono text-[10px] leading-4 text-[#B7F7FF]"
    >
      {state.canvases.map((canvas) => (
        <div key={canvas.name}>
          {canvas.name}: {canvas.median}/{canvas.p95} ms · {canvas.fps} fps
        </div>
      ))}
      <div>
        ctx created {state.contextsCreated} · lost {state.contextsLost} · restored {state.contextsRestored}
      </div>
      <div>
        entry:{" "}
        {state.entries.length
          ? state.entries.map((entry) => `${entry.kind[0]}${entry.ms ?? ">30s"}`).join(" ")
          : "scroll to gallery"}
      </div>
      <div>
        {state.inputSource === "event-timing" ? "slow input ≥16ms" : "input→frame"} n{state.inputCount}: {state.inputMedian ?? "-"} med / {state.inputMax ?? "-"} max ms
      </div>
      <button type="button" onClick={copy} className="mt-1 rounded border border-white/30 px-2 py-0.5 text-white">
        {copied ? "Copied" : "Copy JSON"}
      </button>
    </div>
  );
}

export function PerfHud() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setEnabled(new URLSearchParams(window.location.search).has("perf")));
    return () => window.cancelAnimationFrame(frame);
  }, []);
  return enabled ? <Hud /> : null;
}
