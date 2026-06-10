# Checkpoint Hub

> **Status:** In Progress
> Index of all project checkpoints. A checkpoint is a dated snapshot of the project — what's
> done, what's pending, and the decisions made — that you can always look back on.

## How the Checkpoint System Works
- Run **`/checkpoint "checkpoint name"`** to create a new checkpoint note.
- Each checkpoint:
  - Gets a numbered filename: `CHECKPOINT N - Name.md`.
  - Records the date, project status, what changed, completed work, pending work, and decisions.
  - **Links back** to the previous checkpoint and is **listed here**.
  - Uses `[[wikilinks]]` so it appears in the Obsidian graph.
- New checkpoints are based on `[[_Checkpoint Template]]`.
- After creating one: update the **Latest Checkpoint** section below and, if needed,
  the **Current Project Baseline**.

## Latest Checkpoint
- **[[CHECKPOINT 6 - Premium Dala Inspired 2D Redesign Complete]]** — 2026-06-11
  - **Phase 2 implemented:** cosmic-dark/violet tokens wired into `tokens.css` + `globals.css`;
    particle field + scroll reveals (reduced-motion safe); double-bezel project panels;
    category-grouped Projects page; Space Grotesk + Plus Jakarta Sans. Schema extended for
    media/3D; premium placeholders + dev "Needs:" notes; `Cursor.zip` plays a real video;
    [[Portfolio Asset Requirements Table]] created. Typecheck + build green; **no new packages.**

## Chronological List of Checkpoints
1. [[CHECKPOINT 1 - Vault Architecture Created]] — 2026-06-10 — _baseline: vault architecture created_
2. [[CHECKPOINT 2 - 3D Immersive Direction]] — 2026-06-10 — _pivot to immersive 3D; base scaffolded_
3. [[CHECKPOINT 3 - Skill Assisted Design Prep]] — 2026-06-10 — _design brief + skill plan ready_
4. [[CHECKPOINT 4 - Immersive 3D Direction and Skill Preparation Complete]] — 2026-06-10 — _planning & prep phase complete; ready for implementation_
5. [[CHECKPOINT 5 - Dala Style and Design Skills Added]] — 2026-06-10 — _design skills installed; "Dala" style staged; reconcile vs. brief_
6. [[CHECKPOINT 6 - Premium Dala Inspired 2D Redesign Complete]] — 2026-06-11 — _Phase 2 premium 2D redesign implemented; tokens wired; particles + reveals; asset table_

<!-- Add new checkpoints below in order, newest at the bottom. -->

## Current Project Baseline
> The stable reference point for the project as of the latest checkpoint.

- **Phase:** **Phase 2 (Premium 2D Redesign) complete** → next is the content pass + Phase 3 (lightweight R3F hero, after approval).
- **Mission:** 3D scrollable immersive portfolio (enhanced, not a game) → [[Immersive 3D Direction]].
- **Design source of truth:** [[Design System Brief]] reconciled with [[DESIGN]] "Dala" → **void-black + violet `#8052ff` accent + bone type + hairline glass + particle cosmos**; skill governance: [[Skill Assisted Design Plan]].
- **Type:** Space Grotesk (display) + Plus Jakarta Sans (body). **Design tooling:** 6 design/UX skills installed (`skills-lock.json`, `.agents/skills/`).
- **Governing rule:** the 3D layer *enhances* the site but is **never required** (progressive enhancement).
- **Source of truth:** `docs/PRD.md` + the Obsidian vault.
- **Stack:** Vite + React 18 + TypeScript, **no extra runtime deps** (particles = vanilla canvas, reveals = IntersectionObserver); **+ R3F/Three/Drei + Framer Motion still to add for the 3D phases** → [[Technical Implementation Plan]].
- **Content model:** Data-driven projects (`src/data/projects.ts`); schema **extended** with `thumbnail`/`screenshots`/`immersive`/`missingAssets`/`priority` → [[Data Driven Project System]]. Asset plan: [[Portfolio Asset Requirements Table]].
- **Hosting:** GitHub Pages, static, no backend → [[GitHub Pages Deployment]].
- **Website code:** **Phase 2 redesign live; typecheck + build green.** One real cover wired (`Cursor.zip`); all other projects use premium placeholders. 3D layer not started.
- **Main blocker:** James input — real content/media, motion intensity, and which projects get a real 3D model → [[Missing Content Checklist]] / [[Open Questions]].

## Related
- [[_Checkpoint Template]] · [[Current Status]] · [[Next Actions]]
- [[Implementation Hub]] · [[Portfolio Website - Master Hub]]
