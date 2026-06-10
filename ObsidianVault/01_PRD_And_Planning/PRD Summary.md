# PRD Summary

> **Status:** Active — pivoted to immersive 3D (2026-06-10)
> Vault-side summary of the source-of-truth PRD at `docs/PRD.md`. Keep in sync.

## One-Liner
A **cinematic, dark, 3D-enhanced, scrollable immersive** portfolio for **James Seymour**, game
programmer & designer — projects-first, data-driven, deployed on GitHub Pages, that still reads as a
clear professional portfolio underneath. → [[Immersive 3D Direction]].

## Mission (Updated)
Evolve the standard card portfolio into a premium immersive experience: dark cinematic visuals,
scroll-triggered reveals, parallax, floating glass panels, in-scene video screens, and optional 3D
project models — **without** becoming a playable 3D game and **without** scroll hijacking.
**Governing rule:** the 3D layer *enhances* the site; it is never *required* for it to function.

## Goals
- Premium, "expensive and intentional", game-studio-grade presentation for studios/recruiters.
- Projects as the centerpiece — cinematic overview on the homepage, readable case studies behind it.
- Fast, responsive, accessible; **graceful fallback** with WebGL off / mobile / reduced-motion.
- Easy to extend & scale (data-driven content + per-project immersive settings).

## Stack
- Vite + React + TypeScript → [[Website Architecture Overview]]
- **React Three Fiber + Three.js + Drei** (isolated, lazy-loaded 3D layer) → [[Immersive 3D Direction]]
- **Framer Motion / Motion** (scroll reveals + UI animation) → [[Animation Direction]]
- Data-driven projects (extended schema) → [[Data Driven Project System]]
- GitHub Pages, static, no backend → [[GitHub Pages Deployment]]

## Core Features
- Baseline (scaffolded): Hero, About, Projects gallery (filterable), case studies, Contact + CV,
  responsive, reduced-motion + placeholder-safe media.
- Immersive (to build): cinematic dark redesign, scroll reveals/parallax, lightweight 3D hero,
  3D project showcase (floating panels / video screens / optional GLB models), scroll camera journey,
  capability gating + fallback.

## Initial Content
- C++: Arcade Machine, Surfers Quest, Bomberman-style, EOS Dedicated Server, Basilisk Engine.
- C#: Cursor.zip, Zombies VR.
- Level Design: Hammer Engine Moonbase Map.
- Detail → [[Project Content Hub]]. Asset needs → [[3D Asset Requirements]] · [[Video Capture Requirements]].

## Current State
Base site **already scaffolded & type-checks clean** (orig. Milestones 1–3 done, M4 partly).
Immersive work builds on it — it does not restart the project. → [[Current Status]].

## TODO (James)
- [ ] Tagline, palette, typography, motion intensity, domain, final project names, CV, contact links.
- [ ] Project videos / screenshots / 3D models (Arcade Machine = flagship 3D model) → [[Missing Content Checklist]].
- See [[Open Questions]].

## Related
- Full PRD: `docs/PRD.md`
- [[Immersive 3D Direction]] · [[Technical Implementation Plan]] · [[Requirements Checklist]] · [[Feature Backlog]]
