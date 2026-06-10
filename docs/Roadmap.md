# Roadmap

> **Status:** In Progress — pivoted to the immersive 3D direction (2026-06-10)
> High-level delivery plan. Detailed plan: `ObsidianVault/02_Website_Architecture/Technical Implementation Plan.md`.
> Mission + design: `ObsidianVault/03_Design_And_Visual_Direction/Immersive 3D Direction.md`.

## Where we are
The base site is **scaffolded and type-checks clean** (Vite + React + TS + Router, data-driven
projects, placeholder-safe media, dark tokens). The original Milestones 1–3 are effectively done.
The work now is a **cinematic redesign + an isolated, optional 3D enhancement layer** — the site
stays a fast, readable, recruiter-friendly portfolio; 3D never becomes a requirement.

## Phase 0 — Planning Update (this pass)
- [x] Pivot PRD + Obsidian vault to the 3D immersive direction.
- [x] Define visual, animation, and immersive 3D direction.
- [x] Define 3D + video asset requirements.
- [x] Create a checkpoint.

## Phase 1 — Stabilize Current Site (no 3D)
- [ ] Confirm `npm run dev` / `build` / `typecheck` and click through all routes.
- [ ] Confirm sections, responsiveness, reduced-motion, centralized project data.

## Phase 2 — Premium Visual Redesign (no complex 3D)
- [ ] Cinematic dark restyle: typography, spacing, glass panels, gradient glows, hover/focus.
- [ ] Add Framer Motion / Motion scroll reveals + card motion (reduced-motion safe).

## Phase 3 — Lightweight 3D Hero
- [ ] Add React Three Fiber + Drei; build an isolated `HeroCanvas` (abstract).
- [ ] Subtle camera parallax + mouse-follow; capability gate + mobile/reduced-motion fallback.

## Phase 4 — 3D Project Showcase Layer
- [ ] Floating project panels + in-scene video screens; optional GLB model loading.
- [ ] Arcade Machine 3D showcase (if model provided). All driven by `projects.ts`.

## Phase 5 — Scroll-Based Immersive Journey
- [ ] Scroll-progress camera journey across featured projects (eased, never hijacking scroll).
- [ ] Sections stay readable + accessible.

## Phase 6 — Real Content Pass
- [ ] Real videos, screenshots, 3D models, final descriptions; CV, GitHub, LinkedIn, email.
- [ ] Remove/polish placeholders.

## Phase 7 — Optimization & Deployment
- [ ] Compress video, optimize models, lazy-load audit.
- [ ] Test mobile, reduced motion, WebGL-off fallback; GitHub Pages deploy; Lighthouse; final QA.

## Milestone Index (original notes — 1–3 done; 4–6 absorbed into Phases above)
- [[Milestone 1 - Project Setup]]
- [[Milestone 2 - Core Layout]]
- [[Milestone 3 - Project System]]
- [[Milestone 4 - Visual Polish]]
- [[Milestone 5 - Content Pass]]
- [[Milestone 6 - Final QA]]
