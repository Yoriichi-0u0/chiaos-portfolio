# Gallery keep-alive: renderer comparison

Branch `codex/chiaos-gallery-keepalive`, stacked on PR #3 (`f2e0185`).

## Change

`MissionGallery` keeps the gallery `<Canvas>` mounted once it has been within 300 px of the viewport (`hasBeenNear`). When the canvas is offscreen, `GalleryStage` sets `frameloop="never"` (`active={nearViewport}`). `setGalleryActive` still follows `nearViewport`, so the director's mobile demand mode behaves as before. The change touches 2 files: +16 and -6 lines.

## Method

- **Environment.** A simulated phone: 390x844 viewport, DPR 3, touch, 4x CPU throttle and SwiftShader software WebGL. Desktop runs used 1440x900 with SwiftShader.
- **Build.** A production `next build` and `next start` for each branch.
- **Runs.** `scripts/bench2.sh` and `scripts/ret.mjs` ran sequentially, with one browser at a time.
  - Mobile: 3 passes per renderer, each with 1 cold entry and 6 warm returns.
  - Desktop: 1 pass per renderer.
- **Machine load.** The load average was 5-9 during the runs. Treat absolute numbers as relative.
- **Entry and return latency.** Measured from the scroll to the 3rd gallery frame. A warm return means scrolling to the page end, waiting 2.5 s, then scrolling back.
- **Input delay.** Measured from a tab click to the second `requestAnimationFrame` (`scripts/perfcmp.mjs`, 2 runs).
- **Excluded metric.** The director's FPS while the gallery is active on mobile is excluded. That mode is intentional demand rendering, so its skipped frames are not missed deadlines.

## Results (raw data in `perf/`)

| | dual (default) | unified (PR #4) | keep-alive |
|---|---|---|---|
| Mobile cold entry, ms (3 passes) | 1793 / 2562 / 5169 | 1783 / 1791 / 1804 | 2788 / 2853 / 2868 |
| Mobile warm return, median / p95 ms (n=18) | 1776 / 2020 | 119 / 218 | 423 / 569 |
| Desktop warm return, median ms (n=6) | 3265 | 707 | 1108 |
| WebGL contexts created per session | 10 | 3 | 4 |
| Gallery frames rendered while offscreen | 0 (unmounted) | 0 | 0 (paused) |
| JS heap after 7 entries, MB | 13.8 | 13.6 | 13.3 |
| Gallery-renderer geometries after cycling | 8 | 85 (both scenes share one renderer) | 8 |
| Tab click to paint, median / p95 ms | 203 / 383 | 271 / 430 | 243 / 700 |
| Main thread busy while playing, % (2 runs) | 13.6 / 20.9 | 34.8 / 41.0 | 25.4 / 20.6 |

- **Gallery frame pacing while visible.** Keep-alive runs exactly the same code as dual, so their p95 values (50-300 ms under SwiftShader) differ only by run noise. Unified pacing was better in one run and comparable in the other.
- **Geometry counts.** Unified held steady at 80-105 across 60 artifact switches, with no growth trend.
- **Interaction parity (`scripts/kinteract.mjs`).** Keep-alive matched dual across tablet, mobile, reduced motion and no WebGL.
  - Keyboard tabs and Home, the slider, play and pause, hover scrubbing, and panel hit-testing all behave the same.
  - There is no overflow and there are no console errors.
- **Idle and background rendering.** With reduced motion, both canvases render 0 idle frames. A hidden tab renders 0 frames.

## Interpretation

- **Return latency.** Keep-alive cuts the warm return by about 4x on the simulated phone and about 3x on desktop. It also avoids the repeated create-and-lose cycle of WebGL contexts, so 4 contexts are created instead of 10.
- **Unified versus keep-alive.** Unified is faster to return to, by about 300 ms, and uses one context. However, it costs more main-thread time while playing. It also adds a custom scissor, mask and portal pipeline.
- **Cold entry.** Keep-alive's cold entry was consistent but slower than dual's best pass. Dual's three passes ranged from 1.8 to 5.2 s, so the difference is within this environment's noise.
- **Battery and thermal.** These were not measurable here.

## Unified-renderer lifecycle review (PR #4, `1fff17a`)

**Fixed:**
- **Disposal.** The world scenes, pass geometries and pass materials are now disposed when `UnifiedCanvas` unmounts. R3F only disposes its own root scene, after 500 ms.
- **Production diagnostics.** `window.__chiaosGalleryDraws` now counts only when the page is loaded with `?perf`.

**Checked, no change needed:**
- **Gallery slot.** `MissionGallery` clears the slot when it unmounts, and `useGallerySlot` reads it through `useSyncExternalStore`. No stale reference was observed.
- **Renderer mode during navigation.** `useRendererMode` reads the URL once when the component mounts. In-app links don't add `?renderer=unified`, so the mode cannot change during client-side navigation. Turning the mode on requires a full load.
- **Scissor, zoom and DPR.**
  - Three multiplies `setViewport` and `setScissor` by the pixel ratio, so CSS-pixel rects are correct at any DPR or browser zoom.
  - The rect is read every frame, and a scroll triggers a redraw.
  - The `gallerySize` state is used only for event sizing. Its stale `top` and `left` values are unused.

## Physical-device procedure (not yet run)

No phone was connected, so adoption stays undecided.

1. **Build and serve.** Run `npm run build && npx next start -p 3217`, then open `http://<mac-ip>:3217/system?perf` on the phone. Add `&renderer=unified` for the unified run. Use each branch in turn.
2. **Prepare the phone.** Use the same charge level (above 50%), not charging, with Low Power Mode off and the screen at the same brightness.
3. **Cold entry.** Do 3 passes per renderer. Reload, wait 5 s, then scroll to Mission Gallery.
4. **Warm return.** Do 6 passes per renderer. Scroll to the page end, wait 3 s, then scroll back.
5. **Record the data.** In Safari Web Inspector, use Timelines (JavaScript & Events, Rendering Frames, Memory). In the console, read `__chiaosPerf.gallery.frames` and calculate the median and p95.
6. **Note visible differences.** Record the mask edge, the accent glow, and any blank-frame flash when returning.

An iPhone 15 Pro is a high-end device. Repeat on a mid-range Android phone through `chrome://inspect` before deciding.

## Recommendation

Adopt keep-alive for the default dual renderer. It is a 2-file change that keeps behaviour identical, and it delivers most of unified's return-latency benefit. Keep unified as an opt-in experiment in PR #4 until physical-device data shows a meaningful advantage.
