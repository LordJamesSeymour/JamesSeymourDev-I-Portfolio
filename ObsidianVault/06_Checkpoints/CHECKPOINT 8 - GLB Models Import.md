---
checkpoint: 8
title: GLB Models Import
date: 2026-06-11
status: In Progress
---

# CHECKPOINT 8 — GLB Models Import

> **Date:** 2026-06-11
> **Checkpoint #:** 8
> **Status:** In Progress (prototype shipped & building green; explode layout being tuned)
> ← Previous: [[CHECKPOINT 7 - Video Integration]]
> → Next: _none yet_
> ⬆ Index: [[Checkpoint Hub]]

## Project Status
The project has crossed from "premium 2D + content pass" into the **first real 3D**: the
immersive layer has begun. A controlled iteration layered a small **content/grammar pass** on top
of the Phase 2 baseline **and** added the **first scroll-driven 3D reveal** — an exploded-view of
the Arcade Machine cabinet, imported as a `.glb` and animated in React Three Fiber. This is the
**first time R3F/Three/Drei are in the dependency tree** and the **first GLB shipped** in the repo.
The 3D is isolated, lazy-loaded (its own ~884 KB chunk, never in the main bundle), capability-gated,
and fully fallback-backed, so the 2D portfolio is untouched for anyone without it. `tsc --noEmit` +
`vite build` were green when the prototype landed; the per-part explode **offsets are now being
refined** (see Pending). The known `CursorGameplay.mp4` blocker is unchanged → [[cursor-video-deploy-blocker]].

## What Changed Since the Previous Checkpoint

**Part 1 — Content & polish pass (live, verified in-browser):**
- **Bio** rewritten to the real copy in `public/content/site/about-body.txt`: "BSc (Hons) in Game
  Design and Programming from the **University of Staffordshire**", visible Oxford commas removed
  (`C++, C#, VR, engine tools and level design`), and "I am **fluent in both English and Spanish**."
  The `profile.ts` fallback was kept in sync so a failed fetch still shows real copy.
- **Hero tagline** updated in `public/content/site/hero-tagline.txt` (Oxford comma removed).
- **Unreal Engine** added under Tools (`profile.ts`, after Unity).
- **Skills font bumped subtly**, scoped to `.about__columns` so project-card `.tag`s are untouched
  (chips 0.72→0.92rem, subheads →1.45rem).

**Part 2 — First scroll-driven 3D reveal (Arcade Machine):**
- **GLB imported & wired:** `public/models/arcade-machine/PiecedTogether.glb` (~5 MB, assembled
  multi-part cabinet, no baked animation), served as `/models/arcade-machine/PiecedTogether.glb`.
- **New isolated module** `src/components/three/`: `ArcadeMachineReveal` (section shell: capability
  gating, lazy mount, scroll→progress, callouts) · `ArcadeMachineScene` (lazy default-export
  `<Canvas>` + lights + contact shadow) · `ArcadeMachineModel` (`useGLTF` load, measure/centre,
  per-part explode in `useFrame`) · `ArcadeMachineFallback` · `ThreeErrorBoundary` ·
  `arcadeConfig.ts` (three) / `arcadeContent.ts` (three-free copy, keeps three out of the main bundle).
- **New section** `#arcade-build` ("Inside the Arcade Machine") on the home page between Featured
  Projects and Contact; matches the void/plum cinematic style (pinned stage, HUD progress, step
  tracker, animated callout card).
- **Animation:** native scroll drives a sticky stage; whole model eases from near-front to a 3/4
  reveal (fading idle drift); each named part lerps along a per-part offset (lid lifts off its cover
  face, screen/panels fan to the front-left, the Pi pulls to the right, marquee rises).
- **Robustness:** lazy + code-split, WebGL-gated, error-bounded; **reduced-motion** → static
  assembled model + callout list; **mobile / ≤820px** → static fallback panel; **missing GLB** →
  HEAD pre-check shows a "copy the file to this path" panel.
- **Packages added (first runtime deps since scaffolding):** `three@^0.160`,
  `@react-three/fiber@^8.18`, `@react-three/drei@^9.122`, `@types/three@^0.160` (dev) — the v8/v9
  line that pairs with React 18.
- **Data + schema:** `immersive` on the Arcade Machine entry now carries
  `model: "/models/arcade-machine/PiecedTogether.glb"` + `revealType: "exploded-view"`; new
  `RevealType` added to `src/types/project.ts`; the `.glb` line dropped from its `missingAssets`.
- **Bug fixed during verification:** the model HEAD-check effect listed `modelStatus` in its deps,
  so the resulting state update re-ran the effect and the cleanup **aborted its own in-flight
  request** → it wedged on "loading". Now ref-guarded.
- **Docs updated:** [[Immersive 3D Direction]] (§9b implemented-prototype note), [[3D Asset Requirements]]
  (§8 delivered model), [[Portfolio Asset Requirements Table]] (Arcade row + detail).

## Completed Work
- [x] Bio grammar/attribution + fluency line corrected (`about-body.txt` + `profile.ts` fallback) → [[Editable Text Content System]].
- [x] Hero tagline de-Oxford-comma'd (`hero-tagline.txt`).
- [x] **Unreal Engine** added under Tools; Skills/Tools font subtly enlarged (scoped to About).
- [x] **First GLB imported & rendering** — `PiecedTogether.glb` in a scroll-driven exploded view → [[3D Asset Requirements]].
- [x] Isolated `src/components/three/` module (Reveal / Scene / Model / Fallback / ErrorBoundary / config / content) → [[Immersive 3D Direction]].
- [x] Capability gating + fallbacks (WebGL, reduced-motion, mobile, missing-file, GL error) — verified mobile fallback + desktop scroll reveal in-browser.
- [x] three / @react-three/fiber / @react-three/drei installed (React-18-compatible); three.js **code-split** out of the main bundle (verified in build output).
- [x] `immersive.model` + `revealType` wired in `projects.ts`; `RevealType` added to `project.ts` → [[Data Driven Project System]].
- [x] HEAD-check self-cancel bug fixed; `tsc --noEmit` + `vite build` green at prototype landing.
- [x] Obsidian docs updated (Immersive 3D Direction §9b, 3D Asset Requirements §8, Asset Table).

## Pending Work
- [ ] **Finish tuning the explode layout:** `arcadeConfig.ts` now carries refined `offset` values plus
      new `spin` (relative tilt) and `tip` (hover-callout copy) fields — **wire `spin`/`tip` through
      `ArcadeMachineModel` (it still reads the old `rotX`)** and add the per-part hover callouts, then
      re-verify the build.
- [ ] **Compress the GLB:** ~5 MB is at the ceiling — a Draco/meshopt pass toward ≤1–3 MB; optionally
      rename to the `<slug>.glb` convention → [[3D Asset Requirements]].
- [ ] Refine the model: truer hinge pivot for the Lid, distinct per-part materials/in-scene labels,
      optional local studio environment map.
- [ ] Reuse the reveal pattern for other model-backed projects (Basilisk, Zombies VR) once assets exist.
- [ ] **Optimize `CursorGameplay.mp4`** (unchanged blocker — non-faststart 865 MB) → [[cursor-video-deploy-blocker]].
- [ ] Remaining content pass: real project titles/descriptions, email + CV in `profile.ts`, 🔴 media → [[Portfolio Asset Requirements Table]] / [[Missing Content Checklist]].
- [ ] Deployment pipeline review with the new GLB committed (it is **not** gitignored) → [[GitHub Pages Deployment]].

## Important Project Decisions
- **The 3D layer is now live but strictly a bolt-on.** All three.js lives in `src/components/three/`,
  loads via `React.lazy`/`Suspense`, and is gated — the DOM portfolio is unchanged and never depends
  on WebGL (honours [[Immersive 3D Direction]] §4/§7).
- **Use the GLB's ACTUAL object names, typos and all** (`Chasis`, `Lid`, `Lable`, `Butttonpannel`,
  `Screem`, `Coinpannel`, `RaspberryPi`) — matched case-insensitively with corrected aliases so a
  future clean re-export keeps working. Verified by traversing the file, per the prompt's instruction.
- **Animate parts in R3F, not Blender.** The GLB has no baked animation; the exploded view is
  position/rotation interpolation driven by scroll progress, with practical offset approximations
  (correct assembled pose > perfect mechanics).
- **Editable copy stays in code/data for the 3D callouts** (`arcadeContent.ts`), deliberately kept
  three-free so importing it never pulls three into the main bundle.
- **First new runtime dependencies since scaffolding** — accepted because the immersive 3D mission
  explicitly calls for R3F/Three/Drei, and they're isolated + code-split. Evolve, don't replace.
- **GLB committed to git** (~5 MB, under the ~5 MB ceiling) — large raw video stays gitignored.

## Related Notes
- [[Portfolio Website - Master Hub]] · [[Current Status]] · [[Next Actions]]
- [[Immersive 3D Direction]] · [[3D Asset Requirements]] · [[Portfolio Asset Requirements Table]]
- [[Data Driven Project System]] · [[Editable Text Content System]] · [[Technical Implementation Plan]]
- [[Arcade Machine]] · [[cursor-video-deploy-blocker]] · [[GitHub Pages Deployment]] · [[Implementation Hub]]
- [[CHECKPOINT 7 - Video Integration]] · [[Checkpoint Hub]]
