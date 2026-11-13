# Unified renderer experiment (branch `codex/chiaos-unified-renderer`)

**Status:** experimental and off by default. Production is unchanged.

- Enable it with `/system?renderer=unified`. Without the parameter, the existing two-canvas renderer runs.
- Rollback: drop the branch, or delete `src/components/system/unified/` and revert four small edits.

## What was built

One React Three Fiber `<Canvas>` hosts the System Director and the mission gallery. Each has its own scene and camera, attached with `createPortal`. A single `useFrame` (priority 1) renders each frame in this order:

1. **Director:** the director scene is drawn full-screen.
2. **Mask pass:** a full-screen shader pass multiplies the existing pixels. It reproduces the CSS `mask-image` and opacity that the two-canvas layout applies to the director canvas. CSS masks cannot be scissored per region, so this has to happen in a shader.
3. **Gallery:** inside a scissor rectangle tracked from the gallery stage element, the gallery's radial backdrop is drawn as a shader, followed by the artifact scene.

**Events:** pointer events come from `document.body`. A gallery-specific `compute` maps the pointer into the stage rectangle, so hover scrubbing and drag-to-tilt work through the HTML stage.

**Layering:** the canvas moves below the content (`z-index: 0`). The gallery stage becomes transparent, so the scissored viewport shows through it. The tabs and the text panel keep opaque backgrounds.

## Alternatives considered

- **drei `<View>`:** it uses the same scissor approach, but it re-reads `getBoundingClientRect` inside `useFrame` for every view. It has no way to apply the director's CSS mask and blend inside the shared canvas. It also renders views in index order, which would put the full-screen director in a scissored view. A custom render loop is about 80 lines and keeps full control.
- **Render-to-texture:** draw the gallery into a `WebGLRenderTarget` and composite it. This adds a full-resolution texture and a second pass on every frame without fixing anything the scissor approach doesn't. Rejected.
- **One continuous world with camera flights:** this would replace two working systems at once. It was deferred until a shared renderer has proven itself.

## Measurements

Both renderers ran the same script (`perfcmp.mjs`) against the same production build and workload.

Physical-device testing has not been done. "Mobile" means a 390×844 viewport at DPR 3, with 4× CPU throttling and SwiftShader software rendering.

| Scenario | Two canvases | One canvas |
| --- | --- | --- |
| Desktop M2 GPU (headed Edge), hero | 60 fps, p95 17.7 ms | 60 fps, p95 17.8 ms |
| Desktop, gallery Earth FM | 60 / 60 fps | 60 fps |
| Desktop, Earth FM playing, main-thread busy | 15.3 % | 21.1 % |
| Desktop, per artifact | 60 fps in all runs | 60 fps in the second run. The first run dropped to 41–45 fps on two artifacts. |
| Mobile sim, hero (run 1 / run 2) | 4.8 / 15.3 fps | 22.6 / 28.4 fps |
| Mobile sim, gallery Earth FM, director | 1.1 / 1.3 fps | 10.2 / 6.4 fps |
| Mobile sim, gallery Earth FM, gallery | 7.9 / 11.7 fps | 14.7 / 7.3 fps |
| Mobile sim, return to gallery after scrolling away | about 2,050–2,100 ms after the first trip | 11–182 ms. The gallery scene stays mounted. |
| WebGL contexts | 2 | 1 |
| Shader programs (gallery view) | 3 + 4 (separate contexts) | 9–10 (one context) |
| Hidden tab (simulated) | 0 frames | 0 frames |
| Reduced motion, idle 3 s | 0 frames | 0 frames |

**Notes on the numbers:**

- The machine's load average was about 6–7 during the mobile runs. Run-to-run variance was large (for example, two-canvas hero at 4.8 vs 15.3 fps), so these are directional results only.
- The earlier PR #2 baseline of 23–37 fps came from a quieter run and is not directly comparable to these.
- The one-canvas draw calls and triangle counts cover the whole frame (director plus gallery). The two-canvas numbers are reported per canvas.

## Interaction and accessibility checks (`uinteract.mjs`)

Configurations tested in both renderers:

- Desktop, tablet (820×1180), reduced motion and no WebGL.
- Mobile (390×844), checked through screenshots only.

Results:

- **Controls:** keyboard tab arrows, Home and End, the slider, play and pause, and hover scrubbing all behaved the same in both renderers.
- **Errors and layout:** no console errors, no horizontal overflow, and no hidden text.
- **No-WebGL fallback:** both renderers fall back to the SVG and CSS versions with no canvas.
- **Regression scripts:** `qa2`, `qa3` and `rm2` still pass with the default renderer.

## Recommendation

**Do not adopt yet.**

On desktop the two renderers are equivalent. In the simulated low-power runs, one canvas looked better, mostly because the director no longer drops to 1 fps once the gallery appears, and returning to the gallery is about 10× faster. The variance is too high and the result is simulated, so it does not meet the bar of a meaningful, repeatable benefit.

Next steps:

1. Measure on one physical mid-range Android or iOS phone, using the same script with `?perf`.
2. If the gain holds, make one canvas the default. Keep `?renderer=dual` as an escape hatch for one release.

**Known limits of the prototype:**

- The mask pass approximates the CSS gradient with linear segments.
- The director's CSS `drop-shadow` glow is not reproduced in one-canvas mode.
- `gl.info` counters cover the whole frame.
