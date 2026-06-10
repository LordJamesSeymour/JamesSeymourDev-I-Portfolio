# Portfolio Website — Product Requirements Document (PRD)

> **Status:** Needs James Input
> **Owner:** James Seymour
> **Last updated:** 2026-06-10
> This document is the **single source of truth** for the portfolio website.
> The Obsidian vault under `ObsidianVault/` mirrors and expands on this PRD.

---

## 1. Overview

A professional portfolio website for **James Seymour**, a **game programmer and designer**.
The site showcases programming projects (C++ / C#) and level design work, with a clean,
modern, "slick" presentation suitable for sharing with studios and recruiters.

- **Hosting:** GitHub Pages
- **Stack (target):** Vite + React + TypeScript
- **Content model:** Data-driven project system (projects defined in `src/data/projects.ts`)

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

## 4. Target Audience

- Game studio recruiters and hiring managers.
- Lead programmers / technical directors reviewing code and projects.
- Fellow developers and collaborators.

## 5. Core Features

- [ ] Landing / hero section with name, tagline, and call to action.
- [ ] About section (bio, skills, tools).
- [ ] Projects gallery (filterable by category: C++ / C# / Level Design).
- [ ] Individual project case-study pages.
- [ ] Contact section (email, links, CV download).
- [ ] Responsive layout (desktop, tablet, mobile).

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

- Vite + React + TypeScript.
- Data-driven projects (`src/data/projects.ts`).
- Component-based architecture.
- Static build deployable to GitHub Pages.
- Type-safe project schema.

## 8. Design Direction

- Modern, slick, professional.
- Strong visual hierarchy, generous spacing.
- Subtle, performant animations.
- See `ObsidianVault/03_Design_And_Visual_Direction/`.

## 9. Open Questions / TODO (James Input Needed)

- [ ] Final tagline / one-liner for the hero.
- [ ] Color palette and typography preferences.
- [ ] Custom domain? If so, which?
- [ ] Final list and public-facing names of projects.
- [ ] CV / resume file to host.
- [ ] Contact email and social/professional links.

## 10. Success Criteria

- [ ] Site builds and deploys to GitHub Pages without errors.
- [ ] All initial projects have a case study page.
- [ ] Lighthouse scores: Performance, Accessibility, Best Practices all green.
- [ ] Works on mobile and desktop.
