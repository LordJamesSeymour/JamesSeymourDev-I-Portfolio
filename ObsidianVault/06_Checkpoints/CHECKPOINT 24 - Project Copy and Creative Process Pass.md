---
checkpoint: 24
title: Project Copy and Creative Process Pass
date: 2026-06-14
status: Complete
---

# CHECKPOINT 24 - Project Copy and Creative Process Pass

> **Date:** 2026-06-14
> **Checkpoint #:** 24
> ← Previous: [[CHECKPOINT 23 - Arcade Machine Controller Backdrop]]
> → Next: _none yet_
> ⬆ Index: [[Checkpoint Hub]]

## Project Status

The first real **written content pass** has landed. The three C++/SFML arcade projects — Arcade
Machine, Surfers Quest, and the Bomberman-style game — now have genuine descriptions and case-study
prose in place of the seeded TODO/placeholder text, and the case study gained a new **Creative
Process** section. This advances the previously open "Content pass" item from [[Current Status]].

## What Changed Since the Previous Checkpoint

- Replaced placeholder copy with real descriptions for **Arcade Machine**, **Surfers Quest**, and the
  **Bomberman-style game** — both the card `shortDescription` and the case-study `overview`.
- Added a new **Creative Process** case-study section across the schema, data, UI, and editable files.
- Extended the editable `.txt` content system with two new optional project fields.

## Completed Work

- [x] Added `creativeProcess?: string` to `ProjectCaseStudy` in `src/types/project.ts`.
- [x] Rendered the new section in `ProjectCaseStudy.tsx` (heading "Creative Process", placed
  directly after Overview) — only shown when content exists.
- [x] Extended `ProjectTextField` in `src/content/content.ts` with `inside-description` and
  `creative-process`.
- [x] `ProjectPage.tsx` now hydrates the case study from editable files — `long-description.txt`
  → Overview and `creative-process.txt` → Creative Process — with `projects.ts` as the fallback.
- [x] `ArcadeMachineReveal` reads `inside-description.txt` (via `useProjectText`) for the "Inside the
  Arcade Machine" subtitle; the old `ARCADE_INTRO` constant became the
  `ARCADE_INSIDE_DESCRIPTION_FALLBACK` in `arcadeContent.ts`.
- [x] Wrote real copy into `public/content/projects/<slug>/` and the matching `projects.ts`
  fallbacks: `arcade-machine`, `surfers-quest`, `bomberman-style-game`
  (`short-description.txt`, `long-description.txt`, `creative-process.txt`, plus
  `arcade-machine/inside-description.txt`).
- [x] Updated the Bomberman `needs.txt` / `missingAssets` item from "decide a non-trademarked name"
  to "Confirm the final public-facing project title".
- [x] Documentation refreshed: [[Editable Text Content System]] and `public/content/README.md` now
  describe the `creative-process.txt` and `inside-description.txt` files.

## Pending Work

- [ ] Confirm the final public-facing title for the Bomberman-style game → [[Project Content Hub]].
- [ ] Real copy for the remaining projects (Cursor.zip, Hammer Moonbase, Basilisk, EOS, Zombies VR)
  and the site-level hero/bio text → [[Editable Text Content System]].
- [ ] Gameplay / level-editor screenshots still listed in each project's `needs.txt`.

## Important Project Decisions

- Editable `.txt` files supply the case-study **prose** while structural metadata (features, role,
  challenges, decisions) stays in `projects.ts` — keeping the single editing surface for written
  copy that the content system was designed around → [[Editable Text Content System]].
- "Creative Process" was added as a first-class case-study section (not folded into Overview) so the
  hardware/iteration story for the arcade build has a dedicated home.

## Related Notes

- [[Editable Text Content System]] · [[Data Driven Project System]]
- [[Arcade Machine]] · [[Surfers Quest]] · [[Bomberman Style Game]]
- [[Portfolio Website - Master Hub]] · [[Current Status]] · [[Next Actions]]
- [[Checkpoint Hub]]
