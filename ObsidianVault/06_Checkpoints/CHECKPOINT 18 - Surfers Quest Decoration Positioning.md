---
checkpoint: 18
title: Surfers Quest Decoration Positioning
date: 2026-06-13
status: Complete
---

# CHECKPOINT 18 - Surfers Quest Decoration Positioning

> **Date:** 2026-06-13
> **Checkpoint #:** 18
> **Status:** Complete
> Previous: [[CHECKPOINT 17 - Surfers Quest Sprite Tuning]]
> Next: [[CHECKPOINT 19 - Surfers Quest Background]]
> Index: [[Checkpoint Hub]]

## Project Status

The Surfers Quest decoration pass now uses measured positions from the live desktop page. The
preview video, playable demo, project data, controls, media paths, and other project pages remain
unchanged.

## Completed Work

- [x] Moved the Frog farther left and upward while preserving its large size and `-40deg` rotation.
- [x] Kept Frog and Melon on decoration layer `0`, beneath content layer `1`.
- [x] Moved player spawn from 7% to 30%, clearing the Gameplay Preview heading.
- [x] Moved Cherry and its collision point from 38% to 44%.
- [x] Moved the wall coordinate from 97% to 94.4%.
- [x] Verified mirrored wall-grab right edge at `x=1122` against preview edge `x=1123`.
- [x] Cropped Melon's transparent 32 x 32 canvas to its 22 x 16 animated opaque union.
- [x] Anchored the visible Melon crop in the right-side viewport space.
- [x] Converted the route carrier to a zero-size measured point, removing invisible overflow.
- [x] Preserved responsive hiding, reduced motion, and non-interactive decorations.
- [x] Verified `npm run build` succeeds.

## Related Notes

- [[Surfers Quest Sprite Showcase]]
- [[Surfers Quest Sprite Assets]]
- [[CHECKPOINT 17 - Surfers Quest Sprite Tuning]]
