# Spatial gallery performance gate (13 November 2026)

All numbers come from scripted browser runs. **No physical phone or tablet was tested.**

## Environments

| Run | Browser and GPU | Type |
|---|---|---|
| `perf/desktop-gpu.json` | Microsoft Edge (headed), ANGLE Metal on Apple M2, 1440×900 | Real GPU on a laptop |
| `perf/mobile-throttled-swiftshader.json` | Headless Chromium, 390×844 at DPR 3, 4× CPU throttle, SwiftShader | Simulated low-power phone using a software GPU, so the numbers are pessimistic |

Both canvases are measured together. The `PerfProbe` component records each canvas's frame deltas and `renderer.info`. It runs only in development builds or when the URL has `?perf`; in production without `?perf` it renders `null`.

## Results after fixes

| Scenario (M2 GPU) | Director fps / p95 | Gallery fps / p95 | Main thread busy |
|---|---|---|---|
| Hero, director only | 60 / 17.6 ms | n/a | n/a |
| Earth FM + director | 60 / 17.6 ms | 60 / 17.5 ms | 5.3% |
| Earth FM playing | 60 | 60 / 17.6 ms (one 45 ms frame) | n/a |
| Each of the other five artifacts | 60 | 60 / ≤17.7 ms | 4.9–6.5% |

- The gallery uses 2–41 draw calls and up to 19.6k triangles (terrain). The director uses 114 draw calls and 35.8k triangles.
- After 60 artifact switches, the gallery holds 8 geometries and 2 textures at Earth FM in every cycle.
- Scrolling away unmounts the gallery canvas. Scrolling back shows the first frames in about 125–148 ms on the M2 and about 1 s on the throttled mobile run.
- While the page is hidden, both canvases render 0 frames in 3 s. Rendering resumes when the page is visible again.
- The simulated low-power phone runs the director at about 32 fps on the hero. With the gallery visible, the gallery runs at 23–37 fps, depending on the artifact. The terrain is the heaviest.

## Bottlenecks found and fixed

1. **GPU geometry leak.** The feather and terrain geometries were created in `useMemo` and passed in by prop, so R3F did not dispose them. Each remount leaked two geometries: 12 → 30 over 10 cycles. The geometries are now disposed on unmount, and the count stays flat at 8.
2. **Hidden pages kept rendering.** Before the fix, both canvases ran at 60 fps while hidden. Both now use `frameloop="never"` while `document.visibilityState` is `hidden`.
3. **Two continuous canvases on low-power phones.** With both canvases running, the director fell to 17.7 fps (p95 99 ms). On mobile, while the gallery is in view, the director now redraws only on demand, and the gallery's frame rate goes up. The trade-off: the half-hidden director stays still during that time.
4. **Per-frame allocation in the Earth FM highlight.** A `new Color()` call ran every time the highlighted year changed. It now reuses one module-level colour.

## Reproduce

```bash
npm run build && npx next start -p 3217
node docs/evidence/chiaos-spatial-gallery/pw/perf.mjs --headed     # real GPU (needs Microsoft Edge)
node docs/evidence/chiaos-spatial-gallery/pw/perf.mjs --lowpower   # throttled mobile simulation
node docs/evidence/chiaos-spatial-gallery/pw/playback.mjs          # playback, reduced motion, no-WebGL
node docs/evidence/chiaos-spatial-gallery/pw/qa3.mjs               # WebGL keyboard and layout checks
node docs/evidence/chiaos-spatial-gallery/pw/qa2.mjs               # no-WebGL fallback checks
```

The scripts need `playwright` installed and write screenshots to `/tmp/chiaos-qa/gallery/`. To test a physical device, open `/system?perf` on it. Then run `JSON.stringify(window.__chiaosPerf)` in remote DevTools (Safari Web Inspector or Chrome `chrome://inspect`) after 5 s in each section.

## Not measured

- Physical iPhone or Android devices.
- GPU memory in bytes (WebGL does not expose it).
- Energy use.
