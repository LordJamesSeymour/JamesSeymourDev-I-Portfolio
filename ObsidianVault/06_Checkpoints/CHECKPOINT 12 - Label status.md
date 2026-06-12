---
checkpoint: 12
title: Label status
date: 2026-06-12
status: Complete
---

# CHECKPOINT 12 - Label status

> **Date:** 2026-06-12
> **Checkpoint #:** 12
> **Status:** Complete
> ← Previous: [[CHECKPOINT 11 - Logos and Thumbnails 2]]
> → Next: _none yet_
> ⬆ Index: [[Checkpoint Hub]]

## Project Status
The focused project-status label pass is complete. All eight project cards now use the
data-driven `in-progress` or `completed` state, display the matching uppercase label, and retain
the existing premium pill treatment. Amber identifies active work and green identifies completed
work. The media fallback system, editable content, project routing, and Arcade Machine 3D reveal
remain unchanged. The production build is green.

## What Changed Since the Previous Checkpoint
- Replaced the public project-status model with exactly two values: `in-progress` and `completed`.
- Removed the `PLACEHOLDER` project-status label from cards and project detail headings.
- Added a shared status-to-label mapping in `ProjectCard`.
- Added subtle amber and green badge variants without changing card layout.
- Assigned the requested status to all eight projects in `src/data/projects.ts`.
- Verified all eight cards and computed colors in the browser with no console errors.

## Completed Work
- [x] Arcade Machine set to **IN PROGRESS**.
- [x] Surfers Quest set to **COMPLETED**.
- [x] Bomberman-style Game set to **COMPLETED**.
- [x] EOS Dedicated Server set to **COMPLETED**.
- [x] Basilisk Engine set to **IN PROGRESS**.
- [x] Cursor.zip set to **COMPLETED**.
- [x] Zombies VR set to **IN PROGRESS**.
- [x] Hammer Engine Moonbase Map set to **COMPLETED**.
- [x] IN PROGRESS badge styled with amber `#f5a524`.
- [x] COMPLETED badge styled with green `#22c55e`.
- [x] Visible `PLACEHOLDER` status labels removed.
- [x] `npm run build` completed successfully.

## Pending Work
- [ ] Replace remaining placeholder project descriptions and case-study TODO copy.
- [ ] Manually export genuine H.264 MP4 containers for the four wired preview paths.
- [ ] Choose an original, public-safe name for the Bomberman-style project.

## Important Project Decisions
- **Status and content readiness are separate concerns.** A project can be completed while still
  using editable draft copy or fallback media.
- **Project status remains data-driven.** Values live in `src/data/projects.ts`; display text and
  badge classes are mapped centrally in `ProjectCard`.
- **Only two public statuses are supported.** Cards display either IN PROGRESS or COMPLETED.
- **Fallback media remains intact.** Placeholder media terminology may remain in internal code and
  documentation, but it no longer appears as a project-status badge.

## Related Notes
- [[Portfolio Website - Master Hub]] · [[Current Status]] · [[Next Actions]]
- [[Data Driven Project System]] · [[Editable Text Content System]]
- [[CHECKPOINT 11 - Logos and Thumbnails 2]] · [[Checkpoint Hub]]
