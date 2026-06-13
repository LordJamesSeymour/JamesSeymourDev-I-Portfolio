---
checkpoint: 22
title: Super Bomberman Explosion Cross
date: 2026-06-13
status: Complete
---

# CHECKPOINT 22 - Super Bomberman Explosion Cross

> **Date:** 2026-06-13
> **Checkpoint #:** 22
> **Status:** Complete
> Previous: [[CHECKPOINT 21 - Super Bomberman Sprite Tuning]]
> Next: _none yet_
> Index: [[Checkpoint Hub]]

## Project Status

The decorative Bomberman impact now renders the complete in-game-style explosion cross. Center,
left, right, top, and bottom flames appear together outside the clipped Gameplay Preview card and
reset with the existing loop.

## Completed Work

- [x] Confirmed all 20 source explosion frames were already copied byte-for-byte.
- [x] Preserved the existing center, left continuation/end, and top continuation/end pieces.
- [x] Added a right continuation and right end cap using the original horizontal frame sets.
- [x] Added a bottom continuation and bottom end cap using the original vertical frame sets.
- [x] Flipped the bottom pieces vertically and retained the existing left-end horizontal flip.
- [x] Kept all nine pieces synchronized to the same `explosionElapsed` value and 180 ms frame timing.
- [x] Kept the explosion under the `overflow: visible` preview-stage overlay while the media card
  remains `overflow: hidden`.
- [x] Verified the cross is contiguous, visible, non-interactive, and creates no page overflow.

## Important Project Decisions

- No additional explosion assets were copied because the source project uses shared
  horizontal/vertical continuation and end-cap art for opposite directions.
- The completed cross is center plus two tiles per direction, matching the existing top/left arm
  length and quality.

## Related Notes

- [[Super Bomberman Sprite Showcase]]
- [[Super Bomberman Sprite Assets]]
- [[CHECKPOINT 21 - Super Bomberman Sprite Tuning]]

