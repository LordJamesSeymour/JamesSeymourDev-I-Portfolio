# Implementation Hub

> **Status:** In Progress — base built; now skill-assisted cinematic redesign + 3D (2026-06-10)
> Hub for building the actual website. Work proceeds **phase by phase**, with design/UX skills
> assisting within each phase. Source of truth for design: [[Design System Brief]]. Governance:
> [[Skill Assisted Design Plan]]. Full plan: [[Technical Implementation Plan]].

## Where we are
The base site is **scaffolded and type-checks clean** (Vite + React 18 + TS + Router, data-driven
projects, placeholder-safe `CoverMedia`, reduced-motion support, dark tokens + BEM-ish CSS). The
original Milestones 1–3 are effectively done. The work now is a **cinematic redesign + isolated,
optional 3D layer** — the site stays a fast, readable, recruiter-friendly portfolio.

## Phases (current plan)
0. **Skill Prep & Docs** — ✅ direction + [[Design System Brief]] + [[Skill Assisted Design Plan]] ready.
1. **Stabilize** — confirm `dev`/`build`/`typecheck`, routes, data, homepage render; fix scaffold issues. *(No 3D.)*
2. **Premium 2D Redesign** — cinematic dark theme, typography/spacing/cards/sections, glass/glow/gradients,
   strong hover; add **Motion/Framer Motion** scroll reveals + card animation. *(No complex 3D.)*
3. **Lightweight 3D Hero** — add R3F/Three/Drei; modular `HeroCanvas` (abstract elements, particles/grid,
   cinematic lighting, mouse-follow parallax); mobile + reduced-motion fallback. *(Isolated.)*
4. **3D Project Showcase** — video screens + optional GLB models, driven by `projects.ts`; Arcade Machine flagship.
5. **Scroll Immersive Journey** — scroll-progress cinematic transitions; normal readable nav; no game controls.
6. **Real Content Pass** — real videos/screenshots/3D/descriptions; GitHub, LinkedIn, CV, email; remove placeholders.
7. **Optimize & Deploy** — compress video, optimize models, lazy-load, mobile + reduced-motion + WebGL-off tests,
   production build, GitHub Pages deploy.

## Original Milestones (legacy notes — 1–3 done; 4–6 absorbed by Phases above)
1. [[Milestone 1 - Project Setup]] — ✅ Done
2. [[Milestone 2 - Core Layout]] — ✅ Done
3. [[Milestone 3 - Project System]] — ✅ Done
4. [[Milestone 4 - Visual Polish]] — → Phase 2
5. [[Milestone 5 - Content Pass]] — → Phase 6
6. [[Milestone 6 - Final QA]] — → Phase 7

## Ground Rules
- 🎯 **Follow [[Design System Brief]]** — don't ask skills to "make it look good" from scratch.
- 🧩 **Skills operate under [[Skill Assisted Design Plan]]** — phased diffs, evolve existing tokens/classes,
  stay data-driven, isolate 3D, keep mobile + reduced-motion + GitHub Pages compatibility.
- ⚠️ **Explain any package install before running it** (expected: `framer-motion` P2; `three`/R3F/Drei P3).
- ✅ Keep `npm run typecheck` + `npm run build` green after each change; summarize changes after each phase.
- 🗂️ Don't delete/rewrite the vault, PRD, or the data system → [[Data Driven Project System]].

## Related
- [[Design System Brief]] · [[Skill Assisted Design Plan]] · [[Technical Implementation Plan]] · [[Immersive 3D Direction]]
- [[Roadmap]] (in `docs/`) · [[Checkpoint Hub]] · [[Portfolio Website - Master Hub]]
