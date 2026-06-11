---
checkpoint: 8
title: GLB Models Implementation 1
date: 2026-06-11
status: Complete
---

# CHECKPOINT 8 — GLB Models Implementation 1

> **Date:** 2026-06-11
> **Checkpoint #:** 8
> **Status:** Complete
> ← Previous: [[CHECKPOINT 7 - Video Integration]]
> → Next: _none yet_
> ⬆ Index: [[Checkpoint Hub]]

## Project Status
The project has **crossed into the 3D phase**. The flagship **Arcade Machine** now has a real
`.glb` model driving a **scroll-driven, exploded-view reveal** (`src/components/three/`), and this
checkpoint captures its **first correction/tuning pass** — the reveal now starts correctly
assembled, separates without clipping, responds to less scrolling, and adds a hover-inspection
callout system. The R3F/Three/Drei dependencies (flagged for the 3D phases since
[[CHECKPOINT 7 - Video Integration]]) are now installed, the scene is **code-split/lazy** so it
never weighs down initial load, and all of the Phase 2 work (Dala design, project cards, editable
`.txt` system, fallbacks, GitHub Pages compatibility) is intact. Typecheck + production build are
green → [[Immersive 3D Direction]].

## What Changed Since the Previous Checkpoint
**The 3D layer is no longer "not started."** The Arcade Machine reveal exists and works:
- **Model:** `public/models/arcade-machine/PiecedTogether.glb`, referenced in-browser as
  `/models/arcade-machine/PiecedTogether.glb` (base-URL aware for GitHub Pages).
- **New dependencies added:** `three`, `@react-three/fiber`, `@react-three/drei` — the runtime
  deps [[CHECKPOINT 7 - Video Integration]] said were "still to add for the 3D phases."
- **New module** `src/components/three/`: `ArcadeMachineReveal` (section shell + scroll→progress +
  capability gating), `ArcadeMachineScene` (lazy R3F canvas + void/violet studio lights),
  `ArcadeMachineModel` (model + animation + hover), `arcadeConfig.ts` (part table), `arcadeContent.ts`,
  `ArcadeMachineFallback`, `ThreeErrorBoundary`.

**Correction / tuning pass completed this session (the focus of this checkpoint):**
- **Lid rotation fixed.** Every GLB part carries a baked Blender quaternion (the Lid's is
  `(−180°, 0°, −90°)`). The old code wrote `obj.rotation.x =` absolutely, which at the assembled
  state forced a **180° orientation error** — the "rotated sideways" Lid. All parts now capture
  `base` position + `baseQuat` at load and animate **relative** to them; the Lid's tilt is a delta
  pre-multiplied onto its original quaternion → **0.000° error when assembled** (exact Blender match).
- **Exploded layout retuned — zero clipping.** New per-part offsets fan the chassis (anchor),
  Lid (lifts off its +Z face), marquee (up), screen + button + coin (front-left, fanned across
  distinct Y/Z bands), and Raspberry Pi (right). Verified **quantitatively** against the real GLB
  geometry (world-AABB overlap check): **no part-to-part or chassis overlaps at full explode.**
- **Scroll sensitivity raised:** the scrub track shrank **360vh → 210vh**, so the model reaches the
  exploded pose in ~one comfortable gesture; smoothstep easing keeps it from snapping.
- **Hover-inspection feature added (new):** per-part pointer detection (raycast → named-part
  resolution), a subtle violet **emissive highlight** + pointer cursor on the hovered part, and a
  drei `<Html>` **callout** — a thin leader line from the part out to a small dark/violet speech
  box with placeholder copy. All **7 parts** are individually hoverable (confirmed at runtime: no
  "parts not found" warning). Desktop-only by design (mobile already shows the static fallback).
- **Camera dolly** pulls back as the model explodes so the full spread always frames.
- **Preserved:** the right-side scroll rail/callouts/progress, the WebGL / mobile / missing-model /
  error fallbacks, lazy code-splitting, and the Dala design.

## Completed Work
- [x] Real `.glb` Arcade Machine reveal in `src/components/three/` — scroll-driven exploded view, lazy/code-split → [[Immersive 3D Direction]] / [[3D Asset Requirements]].
- [x] R3F / Three / Drei dependencies installed (first runtime deps since the 2D baseline) → [[Technical Implementation Plan]].
- [x] **Lid rotation bug fixed** — relative `baseQuat` transforms, 0° assembled error (was 180°).
- [x] **Exploded offsets retuned to zero clipping**, verified with a headless GLB world-AABB overlap check.
- [x] **Scroll sensitivity** increased (track 360vh → 210vh) with smoothstep easing.
- [x] **Hover-inspection callouts** — per-part highlight + leader-line speech box (drei `<Html>`), placeholder text for all 7 parts, camera dolly.
- [x] Robust part matching tolerant of the Blender typo names (`Chasis`, `Butttonpannel`, `Coinpannel`, `Screem`, `Lable`, `Lid`, `RaspberryPi`); missing parts log gracefully.
- [x] `npm run typecheck` + `npm run build` green; scene confirmed to mount/render error-free; 3D kept as a separate lazy chunk (initial bundle + GitHub Pages unaffected).

## Pending Work
- [ ] **In-browser visual confirmation** of the exploded spacing + hover callouts on James's real machine — the preview sandbox can't render the R3F canvas (dead `IntersectionObserver`/`ResizeObserver`, screenshot timeouts), so layout was verified by geometry math, not eyes → [[arcade-3d-verification]] (memory).
- [ ] Replace the **placeholder hover labels** with real per-component copy in `arcadeConfig.ts`.
- [ ] **Optimize `CursorGameplay.mp4`** (865 MB, non-faststart) before deploy → [[cursor-video-deploy-blocker]] / [[Video Capture Requirements]].
- [ ] **Real written copy** in the seeded `.txt` files + real bio/tagline/email in `profile.ts` → [[Editable Text Content System]] / [[CV And Contact Assets]] / [[Missing Content Checklist]].
- [ ] Decide **which other projects get a real 3D model** vs. video-only (Arcade Machine = flagship, now done) → [[3D Asset Requirements]] / [[Portfolio Asset Requirements Table]].
- [ ] Drop in remaining 🔴 high-priority project media (Arcade loop, Basilisk editor clip) → [[Portfolio Asset Requirements Table]].
- [ ] Confirm an original, non-trademarked name for the Bomberman-style game → [[Project Content Hub]].
- [ ] Deployment pipeline (`.github/workflows/deploy.yml`) → [[GitHub Pages Deployment]].

## Important Project Decisions
- **All 3D part transforms are relative to the captured GLB pose** (`base` + `baseQuat`); never write absolute Euler rotations — that was the root cause of the Lid glitch.
- **Exploded layout verified headlessly.** Because the preview sandbox can't render the canvas, clipping was proven with a Node script computing world-AABB overlaps from the GLB — more rigorous than a screenshot for the "no clipping" requirement → [[arcade-3d-verification]].
- **Geometry beats the verbal layout where they conflict.** The screen is centred facing the front, so it exits **front-left-up** (not "right" as loosely described) — the brief prioritizes a readable, non-clipping breakdown over exact CAD placement.
- **Clay/grey material kept** for this prototype; hover adds only a subtle emissive glow, matching the dark cinematic style.
- **The 3D section stays progressive-enhancement:** lazy/code-split, desktop-gated, with WebGL/mobile/missing-model/error fallbacks — the site is fully functional without it.
- **Runtime 3D deps now exist** (`three`, `@react-three/fiber`, `@react-three/drei`) — the long-standing "no new packages" rule ends here, by design, for the 3D phase.

## Related Notes
- [[Portfolio Website - Master Hub]] · [[Current Status]] · [[Next Actions]]
- [[Immersive 3D Direction]] · [[3D Asset Requirements]] · [[Portfolio Asset Requirements Table]] · [[Technical Implementation Plan]]
- [[Editable Text Content System]] · [[Data Driven Project System]] · [[cursor-video-deploy-blocker]] · [[Video Capture Requirements]]
- [[GitHub Pages Deployment]] · [[Implementation Hub]]
- [[CHECKPOINT 7 - Video Integration]] · [[Checkpoint Hub]]
