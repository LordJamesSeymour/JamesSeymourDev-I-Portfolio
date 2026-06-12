---
checkpoint: 11
title: Logos and Thumbnails 2
date: 2026-06-12
status: Complete
---

# CHECKPOINT 11 — Logos and Thumbnails 2

> **Date:** 2026-06-12
> **Checkpoint #:** 11
> **Status:** Complete
> ← Previous: [[CHECKPOINT 10 - Added media 1]]
> → Next: _none yet_
> ⬆ Index: [[Checkpoint Hub]]

## Project Status
The second focused logo and thumbnail-media pass is complete. Arcade Machine, Surfers Quest, and
the Bomberman-style project now use the shared data-driven logo and video-cover fields. Exact
case-sensitive public paths are wired for all four local previews, the existing cinematic media
system and fallbacks remain intact, and the Arcade Machine 3D reveal is unchanged. The build is
green.

## What Changed Since the Previous Checkpoint
- Added project logos for Arcade Machine, Surfers Quest, and the Bomberman-style project through
  the reusable `ProjectLogo` data path.
- Added video-cover data for Arcade Machine, Surfers Quest, and the Bomberman-style project through
  the same `ProjectMedia` / `VideoPreview` system used by Cursor.zip.
- Verified these exact case-sensitive browser paths:
  - `/Cursor/Videos/cursor-short.mp4`
  - `/ArcadeMachine/Videos/ArcadeShort.mp4`
  - `/SuperBomberman/Videos/bomberman-short.mp4`
  - `/SurfersQuest/Videos/surfers-short.mp4`
- Retained `/Cursor/Videos/cursor-short-poster.jpg` as Cursor.zip's poster.
- Confirmed `VideoPreview` uses native `autoPlay`, `muted`, `loop`, `playsInline`, and
  `preload="metadata"` with no fixed-duration JavaScript.
- Verified the direct URLs return HTTP 200 locally and are copied to the production build.
- Identified the remaining blocker: the current `.mp4`-named files contain ASF/WMV container data,
  so Chromium rejects them and the polished placeholder correctly appears.

## Completed Work
- [x] Arcade Machine logo and exact thumbnail-video path wired.
- [x] Surfers Quest logo and exact thumbnail-video path wired.
- [x] Bomberman-style project logo and exact thumbnail-video path wired.
- [x] Cursor.zip video path and poster path verified.
- [x] Shared cinematic veil and media fallback retained.
- [x] Native full-file looping behavior verified in `VideoPreview`.
- [x] No `previewDuration`, `maxPreviewSeconds`, `onTimeUpdate`, timeout pause, or `currentTime`
      cap found.
- [x] Homepage cards, Projects page, detail pages, Cursor YouTube embed, and Arcade 3D reveal
      tested without console errors.
- [x] Asset documentation and editable missing-asset lists updated.
- [x] `npm run build` completed successfully.

## Pending Work
- [ ] Manually export genuine H.264 MP4 containers over the four wired preview paths. Do not
      rename WMV files to `.mp4`; do not create fixed-duration snippets.
- [ ] Export dedicated posters for Arcade Machine, Surfers Quest, and the Bomberman-style project
      if desired for first paint and reduced-motion visitors.
- [ ] Choose an original, public-safe name for the Bomberman-style project.
- [ ] Replace remaining placeholder descriptions and case-study TODO copy.

## Important Project Decisions
- **Project media stays data-driven.** Paths belong in `src/data/projects.ts`; cards and detail pages
  reuse the shared media components.
- **Filename casing is deployment-critical.** Public paths must exactly match the on-disk filename
  for the Ubuntu-based GitHub Pages build.
- **Videos loop natively for their full decoded duration.** No JavaScript preview-duration cap is
  permitted.
- **Codex does not trim or transcode supplied project videos unless explicitly requested.**
- **Invalid or missing media must fail gracefully.** The generated cinematic placeholder remains
  the final fallback, while the Arcade Machine reveal and readable project content remain complete.

## Related Notes
- [[Portfolio Website - Master Hub]] · [[Current Status]] · [[Next Actions]]
- [[Portfolio Asset Requirements Table]] · [[Video Capture Requirements]]
- [[Asset Collection Checklist]] · [[Data Driven Project System]]
- [[Editable Text Content System]] · [[GitHub Pages Deployment]]
- [[CHECKPOINT 10 - Added media 1]] · [[Checkpoint Hub]]
