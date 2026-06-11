---
checkpoint: 9
title: Arcade Chassis Animation
date: 2026-06-11
status: Complete
---

# CHECKPOINT 9 — Arcade Chassis Animation

> **Date:** 2026-06-11
> **Checkpoint #:** 9
> **Status:** Complete
> ← Previous: [[CHECKPOINT 8 - GLB Models Implementation 1]]
> → Next: _none yet_
> ⬆ Index: [[Checkpoint Hub]]

## Project Status
The Arcade Machine 3D reveal moved out of prototype and into a **finished, reference-matched
showcase on its own project page**. Across this pass the reveal was **relocated from the home page
to `/projects/arcade-machine`**, its camera/orbit was **reversed** to a premium product orientation,
the **final exploded layout was reworked to match the Blender reference** (chassis tucked left;
screen → Pi → Lid fanning right; controls pulled straight out to the left; marquee modestly up),
and the **hover tooltip now clamps inside the canvas** so the far-right Lid callout is readable.
Everything was verified both **headlessly** (real-GLB 3D clip + screen-space framing checks) and
**in-browser** (the preview sandbox now renders the R3F canvas, so orientation/layout/tooltip were
confirmed with screenshots). `npm run build` (tsc + vite) is green; three.js stays code-split; the
Dala 2D site, editable-text system, project data and GitHub Pages compatibility are untouched →
[[Immersive 3D Direction]].

## What Changed Since the Previous Checkpoint
Since [[CHECKPOINT 8 - GLB Models Implementation 1]] (which fixed the Lid rotation, the first
zero-clip explode, scroll sensitivity and the hover callouts **on the home page**):

**Moved the reveal onto the project page (FIX — it no longer lives on the home page):**
- `Home.tsx` no longer renders `<ArcadeMachineReveal/>`; the home page keeps only the **lightweight
  featured card** linking to the project.
- `ProjectPage.tsx` renders the **full-width reveal as the hero showcase** for the Arcade Machine,
  gated on `project.immersive?.revealType === "exploded-view"`, sitting between the title/summary and
  the case-study text; the old **"3D MODEL COMING SOON" placeholder is gone**. The reveal renders
  outside the centred article so its `position: sticky` track can span full width.
- **Loads from the top:** new `ScrollToTop` in `App.tsx` (resets scroll on route change, honours
  `#hash` anchors) + `history.scrollRestoration = "manual"` — the page no longer opens part-way down
  the animation.

**Reversed orbit / orientation:**
- `START_MODEL_YAW` = **130°** (assembled 3/4 hero, cabinet **front faces RIGHT**, "Retro Pi" + screen
  + controls visible, left cutout-side showing — matches James's reference photo) → `END_MODEL_YAW` =
  **70°** (the **inverse** ~60° orbit into the exploded diagram).

**Final exploded layout reworked to the Blender reference (the focus of this checkpoint):**
- **Chassis tucked LEFT** (`offset −Z`) as the left anchor; **marquee tracks it**, modestly up (not
  excessively high).
- **Button + Coin** pull **forward off the front (`−X`) and toward the LEFT edge (`−Z`)** — a straight
  outward pull that clears the chassis in X before sliding, so **no diagonal clip**; they end near the
  lower/upper-left, clear of each other.
- **Screen slides PURE sideways (`+Z`, ≈no Y)** → finishes to the **RIGHT of the chassis**, upright,
  **fully clear of it** (the previous diagonal-up `+Z 0.6` left it half-inside; the screen is as wide
  as the chassis is deep, so it must slide on its thin axis).
- **Pi then Lid** fan further `+Z` to the far right (Lid farthest); Pi stays clearly visible.
- Left→right end order now reads exactly like the reference: **coin · button · chassis · marquee(up) ·
  screen · Pi · lid**.

**Camera + stage:**
- **Landscape stage** (`.amx__stage` `aspect-ratio: 3/2` desktop, `4/3` ≤1040px), `.amx__layout`
  widened to `max-width ~1440`, scroll track **420vh** (longer, smoother, staged per-part windows).
- Dolly pulls back (`DOLLY_FAR_MULT` 2.4) and **pans right** (`PAN_END` 0.42) to slide the chassis to
  the left border and frame the wider spread.

**Tooltip edge-clamping (new — FIX for the far-right Lid callout clipping off-frame):**
- Each frame the hovered part's anchor is projected to NDC; classes toggle on the `.amx-tip` element —
  **`is-flip-x`** (anchor near the right → box flips **LEFT**) and **`is-flip-down`** (anchor near the
  top → box drops **BELOW**). CSS mirrors both the box and the leader line; thresholds `TIP_FLIP_X`
  0.3 / `TIP_FLIP_DOWN` 0.4. Verified: the Lid box now sits inside the panel.

**Verification tooling (kept in `scripts/`):** `inspect-glb.mjs` (re-measure each part's base
transform/size) and `final-verify.mjs` (asserts no 3D clip / no hidden part / nothing off-frame across
the whole scroll at the binding 4:3 aspect).

## Completed Work
- [x] Reveal **moved to `/projects/arcade-machine`** as the full-width showcase; removed from the home
      page (card-only preview kept); "3D MODEL COMING SOON" placeholder replaced → [[Data Driven Project System]].
- [x] **Camera/orbit reversed** — start faces right (`START_MODEL_YAW` 130°), inverse ~60° turn to
      `END_MODEL_YAW` 70°.
- [x] **Final exploded layout matches the Blender reference** — chassis left, controls straight-out to
      the left, screen pure-sideways (no clip), Pi visible, Lid far right, marquee modest → [[3D Asset Requirements]].
- [x] **Screen clipping fixed** — verified 3D mesh-region clear of the chassis (`clip:none`).
- [x] **Tooltip clamping** — edge-aware `is-flip-x` / `is-flip-down`, box + leader line stay inside the
      canvas (far-right Lid readable).
- [x] **Project page loads from the top** — `ScrollToTop` + manual scroll restoration in `App.tsx`.
- [x] **Bigger landscape stage** (3:2 / 4:3) + longer **420vh** staged scroll; pan + dolly tuned.
- [x] Layout verified **headlessly** (`scripts/final-verify.mjs`) **and in-browser** (screenshots:
      start orientation, exploded layout, Lid tooltip flip) → [[arcade-3d-verification]] (memory).
- [x] `npm run build` (tsc + vite) green; three.js still code-split; GitHub Pages paths/routing intact.

## Pending Work
- [ ] Replace the **placeholder hover labels** with real per-component copy in `arcadeConfig.ts`.
- [ ] Replace the Arcade Machine **case-study TODO copy** (overview/role/key features) → [[Editable Text Content System]] / [[Missing Content Checklist]].
- [ ] Decide whether to run the **R3F canvas on mobile** (currently the static fallback below 820px) or keep the fallback.
- [ ] **Compress the GLB** (~5 MB → Draco/meshopt) before deploy → [[3D Asset Requirements]].
- [ ] **Optimize `CursorGameplay.mp4`** (865 MB, non-faststart) → [[cursor-video-deploy-blocker]] / [[Video Capture Requirements]].
- [ ] Remaining content pass: real titles/descriptions, email + CV in `profile.ts`, 🔴 media → [[Portfolio Asset Requirements Table]].
- [ ] Reuse the reveal pattern for other model-backed projects (Basilisk, Zombies VR) once assets exist.
- [ ] Deployment pipeline (`.github/workflows/deploy.yml`) with the GLB committed → [[GitHub Pages Deployment]].

## Important Project Decisions
- **Reveal belongs on the project page, not the home page.** The home page stays a general overview
  (featured card link); `/projects/arcade-machine` is the detailed 3D showcase, gated by `revealType`.
- **The preview sandbox CAN now render the R3F canvas** (contrary to [[CHECKPOINT 8 - GLB Models Implementation 1]]'s
  note) — screenshots confirmed orientation/layout/tooltip this pass, alongside the headless geometry
  checks which remain the precise tool for clip/framing → [[arcade-3d-verification]].
- **Screen and Lid separate on perpendicular axes**, so they fan in outward ORDER, not a literal
  straight line; the wide Screen must slide **pure `+Z`** (its thin axis) to clear the chassis cleanly.
- **Tooltip placement is collision-aware** (flips toward centre to stay inside the frame), never hidden
  by overflow — keeps every callout readable, including the far-right Lid.
- **All part transforms stay relative** to the captured GLB pose (`base` + offsets / `baseQuat`); no
  absolute Euler overwrites — preserving the Blender alignment.
- **Tuning values are centralised & labelled:** camera constants at the top of `ArcadeMachineModel.tsx`
  (`START_MODEL_YAW`/`END_MODEL_YAW`, `DOLLY_*`, `PAN_END`, `TIP_FLIP_*`); per-part `offset`/`window`
  in `arcadeConfig.ts` — easy to re-tune.

## Related Notes
- [[Portfolio Website - Master Hub]] · [[Current Status]] · [[Next Actions]]
- [[Immersive 3D Direction]] · [[3D Asset Requirements]] · [[Portfolio Asset Requirements Table]] · [[Technical Implementation Plan]]
- [[Arcade Machine]] · [[Data Driven Project System]] · [[Editable Text Content System]]
- [[cursor-video-deploy-blocker]] · [[Video Capture Requirements]] · [[GitHub Pages Deployment]] · [[Implementation Hub]]
- [[CHECKPOINT 8 - GLB Models Implementation 1]] · [[Checkpoint Hub]]
