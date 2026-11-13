# Spatial Kernel 3.0: plan

Branch `codex/chiaos-spatial-kernel`, stacked on PR #5 (`c90e74d`). It keeps the dual canvas and the gallery keep-alive, and imports nothing from PR #4.

## Problem

The director kernel and the six gallery artifacts look unrelated. Picking a project swaps the artifact instantly, and the kernel doesn't react. On desktop, most of the kernel sits behind the opaque gallery panel while the gallery is in use.

## Options considered

| Option | Verdict |
| --- | --- |
| Camera flight from the kernel into each artifact | Rejected: needs one shared scene (PR #4) or a canvas handoff, which is outside the boundaries |
| Move the director kernel into the visible gallery margins | Rejected: only about 80 px of margin on desktop, and it competes with text |
| Post-processing bloom and transitions | Rejected: costs a full-screen pass in both canvases, which is unjustified on low-power phones |
| **Shared kernel dial** (chosen) | The brand mark becomes a mount socket in both canvases. It adds about 8 meshes per canvas and no dependencies. |

## Interaction (prototype 1)

- **Gallery:** the dial is a 270° open arc with six notches, one per tab in tab order. It sits behind the artifact and doesn't tilt with it.
  - On selection, the dial rotates the chosen notch to the top and takes on the project's accent.
  - The new artifact emerges from the gold core: scale 0.55→1 and depth −0.5→0 over about 0.5 s.
- **Director:** the kernel carries the same dial. When a gallery project or mission card is highlighted, the dial and the core accent follow it. Otherwise the dial idles in the section accent.
- **Reduced motion:** every change snaps, with no emerge animation.
- **Demand frameloop:** interpolation keeps calling `invalidate()` until it converges, so it never freezes halfway.
- **No-WebGL:** unchanged. The dial is decorative and `aria-hidden`, and the tablist remains the accessible equivalent.

## Validation gate before extending

Extend this only if:

- Screenshots read as one system.
- No text or controls are covered.
- The PR #5 regression scripts pass.
- Low-power simulated frame pacing stays within noise of PR #5.
