---
checkpoint: 23
title: Arcade Machine Controller Backdrop
date: 2026-06-14
status: Complete
---

# CHECKPOINT 23 - Arcade Machine Controller Backdrop

> **Date:** 2026-06-14
> **Checkpoint #:** 23
> ← Previous: [[CHECKPOINT 22 - Super Bomberman Explosion Cross]]
> → Next: [[CHECKPOINT 24 - Project Copy and Creative Process Pass]]
> ⬆ Index: [[Checkpoint Hub]]

## Project Status

Phase 2 complete; the 3D flagship is live and the focused presentation/content pass continues.
The "Inside the Arcade Machine" section now has its own decorative 3D background to match the
sprite-showcase treatments already shipped for Surfers Quest and the Bomberman-style game.

## What Changed Since the Previous Checkpoint

- Added `src/components/three/ArcadeControllerBackdrop.tsx`: decorative NES-style controllers
  built **entirely from three.js primitives** (no images, SVGs, or imported models).
- Wired two anchored controllers into `ArcadeMachineReveal` — one upper-right by the section
  intro, one lower-left near the transition to the overview.
- Added the supporting `.amx__deco--one/--two` decorative-box styles in `src/styles/globals.css`.

## Completed Work

- [x] Each controller is rendered into its **own small canvas**, sized by a `clamp()`-bounded CSS
  box so it stays proportional to the Arcade Machine content and **never scales with viewport or
  browser zoom**.
- [x] Animation: A/B caps depress in alternation (B → A, one per ~2s) with an emissive glow pulse;
  each cable sways with a gentle two-bone wiggle (no per-frame geometry rebuild).
- [x] `pointer-events: none` and code-split (lazy) so three.js stays out of the initial bundle.
- [x] Per-variant placement/pose (tilt, yaw, cable direction) tunable from a single `VARIANTS` map.
- [x] `AdaptiveDpr` for performance; additive only — the exploded-view reveal, callouts, media,
  and other project pages are untouched.

## Pending Work

- [ ] Reduced-motion / responsive verification parity with the sprite showcases.
- [ ] Confirm visual balance against the exploded-view reveal at small breakpoints.

## Important Project Decisions

- Built the controllers from primitives (`RoundedBox` + meshes) rather than importing a GLB to keep
  the backdrop weightless and fully theme-controllable.
- Used one canvas **per** controller with a clamped CSS box as the deliberate fix for the
  "decoration scales with zoom" problem, mirroring the section-relative approach used elsewhere.

## Related Notes

- [[Immersive 3D Direction]] · [[Arcade Machine]]
- [[Portfolio Website - Master Hub]] · [[Current Status]] · [[Next Actions]]
- [[Checkpoint Hub]]
