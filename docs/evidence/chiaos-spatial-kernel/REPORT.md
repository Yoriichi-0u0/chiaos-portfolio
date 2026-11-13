# Spatial Kernel 3.0, prototype 1: shared kernel dial

**Branch:** `codex/chiaos-spatial-kernel`, stacked on PR #5. The approach and the options considered are in [PLAN.md](PLAN.md).

## What changed

- **`kernel/KernelDial.tsx`:** a 270° arc with six notches, one per gallery project in tab order. The selected notch rotates to the top along the shortest path and lengthens, and the arc lerps to the project's accent. With demand rendering it keeps calling `invalidate()` until it settles, and with reduced motion it snaps.
- **`kernel/KernelMount.tsx`:** each newly selected artifact emerges from a gold core flash (scale 0.55→1, depth −0.5→0, about 0.5 s, ease-out). It is skipped under reduced motion.
- **`GalleryStage.tsx`:** the dial sits behind the artifact at z −1.1 and is not affected by drag-to-tilt. The artifact is wrapped in `KernelMount`.
- **`DirectorCore.tsx` and `DirectorScene.tsx`:** the director kernel's main ring becomes the same dial. When a gallery project or mission card is highlighted, the core takes that project's accent, stops spinning and settles upright, so the notch reads correctly. With no highlight it idles in the section accent, as before.

**Unchanged:**

- The dual canvas and keep-alive.
- Earth FM data and its interactions.
- The accessible tablist and case-study HTML.
- The no-WebGL fallback and `/`.

No dependencies were added, and nothing comes from PR #4.

## Measured (simulated; no physical device)

**Setup:** headless Chromium with SwiftShader, 390×844, DPR 3, 4× CPU throttle. Builds were run sequentially and alternated PR #5 → kernel → PR #5 → kernel (`scripts/bench4.sh`). Raw data is in `perf/`.

| Metric | PR #5 run 1 / 3 | Kernel run 2 / 4 |
| --- | --- | --- |
| Gallery Earth FPS (p95 ms) | 22.9 (48) / 10.7 (213) | 13.5 (78) / 14.4 (71) |
| Earth playing FPS | 21.1 / 11.7 | 11.8 / 13.9 |
| Hero director FPS (p95 ms) | 22.6 (150) / 16.5 (80) | 18.8 (59) / 20.1 (53) |
| Cold gallery entry | 3257 / 2954 ms | 3140 / 3665 ms |
| Warm return, median of 6 | 552 / 417 ms | 396 / 522 ms |
| Tab switch rAF, median / p95 (n=48) | 584/1087, 565/845 ms | 444/769, 592/1082 ms |
| Gallery frames while offscreen | 0 | 0 |
| WebGL contexts created / gallery geometries / programs | 4 / 8 / 4 | 4 / 16 / 5 |

**Reading:** PR #5 varied by about 2× between its own runs on the same build, so this rig cannot resolve a frame-rate difference of that size. The kernel runs fall inside PR #5's range. The real cost is +8 small gallery geometries, plus one director geometry and one shader program, and still zero offscreen frames. I make no claim of a perf improvement or regression beyond that.

## Behaviour and accessibility (measured)

- **`qa3` (desktop, mobile, reduced motion, landing):**
  - Results: no errors, overflow 0, no fallback when WebGL is available, slider reaches 2025 · +1.19 °C, case-study links resolve, and `/` is unchanged.
  - Play is hidden under reduced motion, as before.
- **`kinteract`:** passes for the dual and keep-alive variants on desktop, tablet and mobile.
  - Arrow-key tab change and Home/End work.
  - The slider, playback and hover-scrub work.
  - The panel top element is text, and there are no errors.
  - Overflow −15 matches the PR #5 baseline (scrollbar width).
- **`gate`:** results match PR #5.
  - 0 frames offscreen or in a hidden tab; the year and selection are preserved; no blank frame on return (MAD 4.6 vs 4.7 on PR #5).
  - Rendering resumes after freeze and after a context loss and restore; rotation does not overflow; navigating to `/` releases both contexts.
  - The forced-loss "object does not belong to this context" warnings also appear on PR #5 (43 there) and remain harmless.
- **Reduced motion and no-WebGL (`scripts/kmodes.mjs`):** PagePilot is selected at both sizes in both modes, with overflow 0 and no errors. With no WebGL, 0 canvases render and the SVG/CSS fallbacks show.
- **Accessibility:** the dial is decorative inside the existing `aria-hidden` canvas wrappers. All information stays in the HTML tabs and panel.

## Design evidence

`shots/` holds before/after screenshots:

- Desktop hero.
- Desktop Earth FM and PagePilot.
- Mobile Earth FM and FinGence.
- Reduced-motion and no-WebGL views.

**Assumption, not measured:** the emerge animation's feel on a 120 Hz phone. It is time-based, not frame-based, so it should last the same 0.5 s.

## Known issues

- Desktop director kernel: when a project is highlighted, its dial is mostly hidden behind the opaque gallery panel. The link reads strongest in the hero and mission-archive card hovers, and between scroll positions.
- The six-notch order is tied to `galleryArtifacts`. The 12 non-gallery missions keep the section accent instead of getting a notch.
- No physical-device data. See the PR #5 report for the LAN and `?perf` HUD procedure.

## Rollback

- To drop the experiment, close the draft PR or skip the branch.
- If it has been merged, run `git revert <merge-or-commit>`. The change is contained in `src/components/system/kernel/`, plus small edits to `DirectorCore.tsx`, `DirectorScene.tsx` and `GalleryStage.tsx`.

## Next step, if accepted

Extend the shared language to the artifacts themselves. For example, each artifact's base ring could pick up the dial geometry, and section-to-section transitions could rotate the director dial through its notches. Keep each step benchmarked against PR #5.
