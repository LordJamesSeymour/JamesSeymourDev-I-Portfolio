# Portfolio Website — Product Requirements Document (PRD)

> **Status:** Active — direction pivoted to immersive 3D (2026-06-10)
> **Owner:** James Seymour
> **Last updated:** 2026-06-10
> This document is the **single source of truth** for the portfolio website.
> The Obsidian vault under `ObsidianVault/` mirrors and expands on this PRD.

---

## 0. Mission (Updated 2026-06-10)

The objective has evolved from a standard card-based portfolio into:

> **A 3D scrollable immersive portfolio experience for James Seymour, focused on showcasing his
> work as a game programmer and designer through cinematic visuals, 3D project representations,
> animated media, and high-end web presentation.**

The site stays **scroll-based, readable, and recruiter-friendly**, but its **visual layer becomes
immersive and 3D**: dark cinematic backgrounds, scroll-triggered reveals, parallax, floating glass
panels, in-scene video screens, and optional 3D project models. It should feel *premium and
intentional* — like a high-end game-studio landing page — **without** becoming a playable 3D game.

The governing principle is **progressive enhancement: the 3D layer enhances the site but is never
required for it to function.** The full HTML/React portfolio must remain present, readable, and
complete with WebGL disabled, on mobile, and under reduced-motion.

→ Full direction: `ObsidianVault/03_Design_And_Visual_Direction/Immersive 3D Direction.md`.

## 1. Overview

A professional portfolio website for **James Seymour**, a **game programmer and designer**.
The site showcases programming projects (C++ / C#) and level design work as a **cinematic,
dark, 3D-enhanced scrollable experience** suitable for sharing with studios and recruiters —
while remaining a clear, fast, accessible professional portfolio underneath.

- **Hosting:** GitHub Pages (static — no backend)
- **Stack (target):** Vite + React + TypeScript; **React Three Fiber + Three.js + Drei** for the
  isolated 3D layer; **Framer Motion / Motion** for scroll + UI animation
- **Content model:** Data-driven project system (projects defined in `src/data/projects.ts`),
  extended with optional per-project `media` (video/3D model) and `immersive` showcase settings

## 2. Goals

- [ ] Present James as a credible, hireable game programmer/designer.
- [ ] Make projects the centerpiece, each with a mini case study.
- [ ] Be fast, responsive, and visually polished.
- [ ] Be easy to extend — adding a project should mean editing a data file, not rewriting pages.
- [ ] Deploy cleanly to GitHub Pages.

## 3. Non-Goals (for v1)

- No CMS / backend.
- No blog (can come later).
- No authentication or user accounts.
- **Not a playable 3D game.** No first-person/WASD navigation, player movement, physics, rooms,
  collisions, quests, or inventory. The 3D is a cinematic *visual layer*, not a game world.
- **No scroll hijacking.** Native vertical scroll stays in control; the site does not trap, snap, or
  fight scrolling. Custom navigation models that confuse recruiters are out of scope.
- The 3D layer is **never a hard requirement** — the site must be fully usable without WebGL.

## 4. Target Audience

- Game studio recruiters and hiring managers.
- Lead programmers / technical directors reviewing code and projects.
- Fellow developers and collaborators.

## 5. Core Features

**Baseline portfolio (scaffolded — see §11):**
- [x] Landing / hero section with name, tagline, and call to action.
- [x] About section (bio, skills, tools).
- [x] Projects gallery (filterable by category: C++ / C# / Level Design).
- [x] Individual project case-study pages.
- [x] Contact section (email, links, CV download).
- [x] Responsive layout (desktop, tablet, mobile).
- [x] Reduced-motion support + placeholder-safe media (no missing-file references).

**Immersive layer (new — to be built in phases):**
- [ ] Cinematic dark redesign (glass panels, gradient glows, premium typography/hover states).
- [ ] Scroll-triggered reveals + parallax (Framer Motion / Motion).
- [ ] Lightweight 3D hero canvas (abstract, mouse-follow + scroll parallax) with fallback.
- [ ] 3D project showcase: floating panels, in-scene video screens, optional GLB models.
- [ ] Scroll-based cinematic camera journey across featured projects.
- [ ] Capability gating + graceful fallback (WebGL off / mobile / reduced-motion → 2D site).

## 6. Content — Initial Projects

### C++
- Arcade Machine
- Surfers Quest
- Bomberman-style game (Super Bomberman placeholder)
- EOS Dedicated Server
- Basilisk Engine

### C#
- Cursor.zip
- Zombies VR

### Level Design
- Hammer Engine Moonbase Map

> See `ObsidianVault/04_Project_Content/` for per-project detail notes.

## 7. Technical Requirements

- Vite + React + TypeScript (strict). Static build deployable to **GitHub Pages** (no backend).
- Data-driven projects (`src/data/projects.ts`) with a type-safe, extensible project schema.
- Component-based architecture.
- **3D layer is isolated & modular:** all React Three Fiber / Three.js / Drei code lives under
  `src/components/three/`, is **lazy-loaded / code-split**, and never imported into normal page
  components. It mounts only behind a capability gate (WebGL + not reduced-motion + not low-power).
- **Progressive enhancement / graceful degradation:** if WebGL fails, the device is low-power, or
  the user prefers reduced motion, the site renders the full 2D portfolio instead. An error boundary
  around the Canvas prevents a GL crash from breaking the page.
- **Performance budget:** fast first paint of the 2D site; lazy-load heavy media (don't load every
  video/model up front); GLB/glTF (Draco/meshopt) for models; short compressed video loops; clamped
  DPR and on-demand rendering. See `ObsidianVault/03_Design_And_Visual_Direction/Immersive 3D Direction.md`.

## 8. Design Direction

- **Cinematic, dark, polished, game-development focused.** Dark backgrounds, subtle neon accents,
  glassy panels, floating UI cards, gradient glows, large premium typography, strong hierarchy.
- Scroll-triggered reveals, parallax camera motion, mouse-follow interaction, smooth section
  transitions — **subtle and cinematic, never game-like or scroll-hijacking.**
- Responsive layouts and full reduced-motion support are first-class, not afterthoughts.
- See `ObsidianVault/03_Design_And_Visual_Direction/` →
  Visual Identity, Animation Direction, **Immersive 3D Direction**.

## 9. Open Questions / TODO (James Input Needed)

- [ ] Final tagline / one-liner for the hero.
- [ ] Color palette and typography preferences (within the dark cinematic direction).
- [ ] How "flashy" vs. "restrained" should the motion/3D feel be?
- [ ] Which projects get a real **3D model** vs. **video-only** showcase? (Arcade Machine = flagship model.)
- [ ] Custom domain? If so, which?
- [ ] Final list and public-facing names of projects (esp. an original name for the Bomberman-style game).
- [ ] CV / resume file to host.
- [ ] Contact email and social/professional links.
- [ ] Project **videos / screenshots / 3D models** — see the asset checklists in `09_Assets/`.

## 10. Success Criteria

- [ ] Site builds and deploys to GitHub Pages without errors.
- [ ] All initial projects have a case study page.
- [ ] Lighthouse scores: Performance, Accessibility, Best Practices all green **with the 3D layer present**.
- [ ] Works on mobile and desktop, and **degrades cleanly** with WebGL off / reduced-motion on
      (full portfolio still readable; no blank canvas, no broken layout).
- [ ] The 3D layer never blocks first paint and never 404s a missing model/video (placeholder-safe).
- [ ] A recruiter can read every project and reach every link **without** interacting with the 3D scene.

## 11. Current Implementation State (2026-06-10)

The base site is **already scaffolded and type-checks clean** (`npm run typecheck` → 0 errors):
Vite + React 18 + TS + React Router; data-driven `projects.ts` (8 placeholder projects) + helpers;
`profile.ts`; layout/home/projects/ui components; `CoverMedia` (video/gif/image with reduced-motion
poster fallback); generated SVG placeholders; dark design tokens. In roadmap terms the original
Milestones 1–3 are effectively done and Milestone 4 is partly started.

The immersive direction therefore **builds on a working base** — it does not restart the project.
See the phased plan: `ObsidianVault/02_Website_Architecture/Technical Implementation Plan.md`.
