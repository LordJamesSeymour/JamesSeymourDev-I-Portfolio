---
checkpoint: 10
title: Added media 1
date: 2026-06-12
status: Complete
---

# CHECKPOINT 10 — Added media 1

> **Correction, 2026-06-12:** This checkpoint records the original media pass. The generated
> fixed-duration preview was later removed. Current policy is to use James's manually exported,
> full-duration H.264 MP4 files directly and loop them natively in the browser. Files merely renamed
> from WMV to `.mp4` remain ASF/WMV containers and are not valid browser video sources.

> **Date:** 2026-06-12
> **Checkpoint #:** 10
> **Status:** Complete
> ← Previous: [[CHECKPOINT 9 - Arcade Chassis Animation]]
> → Next: _none yet_
> ⬆ Index: [[Checkpoint Hub]]

## Project Status
The first focused project-media pass is complete and committed as `05d8292`
(`Hammer Level and Cursor Initial push`). Cursor.zip now has a deployable looping card preview,
poster, project logo, and embedded YouTube trailer. Hammer Moonbase Map now has a real card/detail
image and embedded YouTube flyby. The media remains data-driven, preserves the existing Dala-inspired
cinematic treatment, falls back cleanly when assets fail, and stays compatible with GitHub Pages.
`npm run build` is green.

## What Changed Since the Previous Checkpoint
Since [[CHECKPOINT 9 - Arcade Chassis Animation]]:

**Cursor.zip media:**
- Converted the 30.68-second, ~26 MB `Cursor-Short.wmv` source into an 8-second,
  960x540, muted H.264 fast-start preview at
  `public/Cursor/Videos/cursor-short.mp4` (~1.61 MB).
- Exported `public/Cursor/Videos/cursor-short-poster.jpg` for initial paint and reduced motion.
- Preserved the original logo and added `public/Cursor/cursor-zip-logo.png`.
- Added trailer `g4LTAYN-QgE` in a responsive, privacy-enhanced YouTube frame.

**Hammer Moonbase Map media:**
- Wired `public/Hammer/HammerMap.png` as the card thumbnail and detail hero.
- Added flyby `TF4499mnCWE` to the detail page.
- Applied the existing cinematic image veil and retained placeholder fallback behavior.

**Data/components/platform:**
- Extended the project schema with optional `logo` and `showcaseVideo` fields.
- Added reusable `ProjectLogo` and `YouTubeEmbed` components.
- Added base-aware public-asset resolution for GitHub Pages subpaths.
- Updated editable `needs.txt` lists and asset documentation.

**Next media batch collected but not yet integrated:**
- `public/ArcadeMachine/arcade-logo.png` + `Videos/ArcadeShort.wmv`.
- `public/SuperBomberman/bomberman-logo.png` + `Videos/bomberman-short.wmv`.
- `public/SurfersQuest/surfers-logo.png` + `Videos/surfers-short.wmv`.
- These folders are currently untracked raw inputs. Their WMV files still need short,
  web-ready MP4/WebM conversions before use in cards.

## Completed Work
- [x] Cursor.zip optimized looping preview + poster wired to the card/detail media system.
- [x] Cursor.zip logo added as a restrained detail-page brand accent.
- [x] Cursor.zip YouTube trailer embedded with an accessible title and external fallback link.
- [x] Hammer Moonbase Map thumbnail wired to its card and detail hero.
- [x] Hammer Moonbase Map YouTube flyby embedded on its detail page.
- [x] Project data extended with reusable logo/showcase-video metadata.
- [x] Image/video failure fallback, reduced-motion behavior, and cinematic overlays retained.
- [x] Asset notes and editable missing-asset lists updated.
- [x] Desktop and 390px layouts verified in-browser; `npm run build` green.

## Pending Work
- [ ] Convert the new Arcade Machine, Surfers Quest, and Super Bomberman WMV previews to short
      H.264 MP4/WebM files with posters before wiring them into cards.
- [ ] Integrate the three newly collected project logos tastefully on their detail pages.
- [ ] Choose an original, public-safe name for the Bomberman-style project before publication.
- [ ] Replace remaining placeholder project descriptions and case-study TODO copy.
- [ ] Add remaining screenshots, editor views, and annotated level-layout images.
- [ ] Compress the Arcade Machine GLB and continue the broader deployment/content pass.

## Important Project Decisions
- **Card loops use optimized local media; full videos use hosted embeds.** This keeps GitHub Pages
  lean while preserving rich detail-page media.
- **WMV files are source inputs only.** Browser-facing previews must be MP4 or WebM.
- **Project media remains data-driven.** Components render optional `cover`, `thumbnail`, `logo`,
  and `showcaseVideo` fields rather than hardcoding project-specific paths.
- **Public paths remain root-style in data** and are resolved against Vite's base at render time.
- **Media failure never leaves a broken panel.** Existing generated placeholders remain the final
  fallback, and optional logos disappear cleanly if unavailable.

## Related Notes
- [[Portfolio Website - Master Hub]] · [[Current Status]] · [[Next Actions]]
- [[Portfolio Asset Requirements Table]] · [[Asset Collection Checklist]]
- [[Video Capture Requirements]] · [[Data Driven Project System]]
- [[Editable Text Content System]] · [[GitHub Pages Deployment]]
- [[CHECKPOINT 9 - Arcade Chassis Animation]] · [[Checkpoint Hub]]
