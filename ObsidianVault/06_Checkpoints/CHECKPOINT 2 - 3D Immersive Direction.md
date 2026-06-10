---
checkpoint: 2
title: 3D Immersive Direction
date: 2026-06-10
status: Complete
---

# CHECKPOINT 2 — 3D Immersive Direction

> **Date:** 2026-06-10
> **Checkpoint #:** 2
> **Status:** Complete
> ← Previous: [[CHECKPOINT 1 - Vault Architecture Created]]
> → Next: _none yet_
> ⬆ Index: [[Checkpoint Hub]]

## Project Status
**Phase:** Planning Update (Phase 0) complete → Stabilize + Cinematic Redesign (Phases 1–2).
The project's mission has **pivoted**: from a standard card-based portfolio to a **3D scrollable
immersive experience** — cinematic, dark, scroll-driven, with optional 3D project showcases — that
**still works as a clear, fast, recruiter-friendly portfolio**. Crucially, since CHECKPOINT 1 the
**base website was actually built**: it is scaffolded and **type-checks clean** (`npm run typecheck`
→ 0 errors). This checkpoint is a **planning/documentation pass** that re-aimed the PRD and vault at
the new direction; **no 3D code was written and no packages were installed.**

## What Changed Since the Previous Checkpoint
- **Reality reconciled:** CHECKPOINT 1 recorded "website not started." In fact the site is now
  scaffolded — Vite + React 18 + TS + React Router, data-driven `projects.ts` (8 placeholders) +
  helpers, `profile.ts`, layout/home/projects/ui components, `CoverMedia` (video/gif/image with
  reduced-motion poster fallback), generated SVG placeholders, and dark design tokens. Original
  **Milestones 1–3 are effectively done**, Milestone 4 partly started.
- **Mission pivoted to immersive 3D** across the PRD + vault → [[Immersive 3D Direction]].
- **3D architecture defined:** isolated `components/three/`, lazy/code-split, capability-gated
  (WebGL + reduced-motion + device), error-bounded, no scroll hijacking, model→video→image→placeholder
  fallback chain → [[Technical Implementation Plan]] §8.
- **Phased plan rewritten** (Phase 0–7) and reconciled with the already-built base.
- **Project schema extended (on paper):** `media.model3d` + an `immersive` showcase block, framed as
  an *additive* evolution of `src/types/project.ts` → [[Data Driven Project System]].
- **Asset requirements created** for 3D models and video capture → [[3D Asset Requirements]] /
  [[Video Capture Requirements]].

## Completed Work
- [x] PRD pivoted to the immersive direction (`docs/PRD.md`: new Mission §0, non-goals "not a game",
      3D tech reqs, success criteria, current-state §11) → [[PRD Summary]].
- [x] Created [[Immersive 3D Direction]] (mission, 3D-vs-game, scroll rationale, R3F usage, build
      order, performance, recruiter-friendliness).
- [x] Created [[3D Asset Requirements]] (GLB/glTF, optimization budgets, naming, folders, which
      projects use models vs. video, placeholder strategy).
- [x] Created [[Video Capture Requirements]] (lengths, aspect ratios, captures per project, use in
      cards + 3D screens, compression, placeholders).
- [x] Updated [[Technical Implementation Plan]] (stack + deps, folders, components, §8 3D architecture,
      §9 phased plan, §10 what-to-build-first).
- [x] Updated [[Data Driven Project System]] with the extended/immersive schema + fallback chain.
- [x] Updated [[Visual Identity]] (cinematic dark) and [[Animation Direction]] (scroll/parallax/3D, no hijack).
- [x] Updated [[Missing Content Checklist]] + [[Asset Collection Checklist]] for 3D/video assets;
      cross-linked the older [[Video Requirements]].
- [x] Updated `docs/Roadmap.md`, `docs/TechnicalPlan.md`, [[Current Status]], [[Next Actions]],
      [[Portfolio Website - Master Hub]].

## Pending Work
- [ ] **Phase 1** — verify the running site end-to-end (routes, responsive, reduced-motion).
- [ ] **Phase 2** — cinematic dark redesign + Framer Motion scroll/card motion (no 3D yet).
- [ ] **Phases 3–5** — React Three Fiber hero, 3D project showcase, scroll journey (after approval).
- [ ] **James input** — motion intensity + accent; which projects get real 3D models; real videos/
      screenshots/GLBs; CV + contact links; repo/domain → [[Open Questions]] / [[Missing Content Checklist]].

## Important Project Decisions
- **Mission:** 3D scrollable immersive portfolio — **enhanced, not a game; scroll-based, not navigated.**
- **Governing rule:** the 3D layer **enhances** the site but is **never required** — full 2D portfolio
  must work with WebGL off, on mobile, and under reduced motion (progressive enhancement).
- **Isolation:** all R3F lives in `src/components/three/`, lazy-loaded, gated, error-bounded.
- **Stack additions (not yet installed):** `three`, `@react-three/fiber`, `@react-three/drei`,
  `framer-motion`. Install only when Phase 2/3 is approved.
- **Assets:** GLB/glTF for models, short compressed MP4 loops for video; Arcade Machine = flagship 3D.
- **Build order:** stabilize → cinematic redesign → lightweight 3D hero → showcase → scroll journey →
  content → optimize. Each layer ships with its fallback first.
- **No code written / no packages installed this pass** (planning + docs only).

## Related Notes
- [[Portfolio Website - Master Hub]] · [[Current Status]] · [[Next Actions]]
- [[Immersive 3D Direction]] · [[Technical Implementation Plan]] · [[Data Driven Project System]]
- [[3D Asset Requirements]] · [[Video Capture Requirements]] · [[Visual Identity]] · [[Animation Direction]]
- [[Roadmap]] · [[Implementation Hub]] · [[Project Content Hub]] · [[Checkpoint Hub]]
