---
checkpoint: 19
title: Surfers Quest Background
date: 2026-06-13
status: Complete
---

# CHECKPOINT 19 - Surfers Quest Background

> **Date:** 2026-06-13
> **Checkpoint #:** 19
> **Status:** Complete
> Previous: [[CHECKPOINT 18 - Surfers Quest Decoration Positioning]]
> Next: [[CHECKPOINT 20 - Super Bomberman Sprite Showcase]]
> Index: [[Checkpoint Hub]]

## Project Status

The Surfers Quest decorative background is now tuned around the Gameplay Preview and Playable Web
Demo. The large animated Frog and Melon remain behind the content, the wall-grab route remains
attached to the preview edge, and the playable demo and existing project systems are unchanged.

## What Changed Since the Previous Checkpoint

- Shifted the Frog farther left while retaining more visible head and upper body beside the content.
- Rotated the Frog 10 degrees clockwise from its previous angle, changing it from `-40deg` to
  `-30deg`.
- Pulled the Melon inward from the viewport edge while preserving its `20deg` clockwise rotation.
- Reversed only the wall-grab player's horizontal orientation without changing the returning run.

## Completed Work

- [x] Kept Frog and Melon on decoration layer `0`, below content layer `1` and above the cosmic
  page background.
- [x] Kept both background decorations non-interactive with `pointer-events: none`.
- [x] Set the wide-desktop Melon inset to `150px`, producing approximately a 15% tuck beneath the
  content edge.
- [x] Added responsive Melon insets of `70px` below 1400 px and `55px` below 1180 px.
- [x] Preserved the existing side-decoration hide below 1060 px and route hide below 700 px.
- [x] Preserved the static/simplified `prefers-reduced-motion` behavior.
- [x] Verified the wall-grab player's right edge remains within `0.1px` of the Gameplay Preview
  card edge.
- [x] Verified the playable iframe, Fullscreen button, and Reset browser maps button retain pointer
  input.
- [x] Verified `npm run build` succeeds.

## Important Project Decisions

- The large Frog and Melon remain background identity elements rather than foreground controls or
  content.
- Narrow desktop gutters use smaller Melon insets to keep the animated fruit visible without
  introducing horizontal overflow.
- The wall-grab pose uses its native horizontal orientation; only the returning run remains
  mirrored.

## Related Notes

- [[Surfers Quest Sprite Showcase]]
- [[Surfers Quest Sprite Assets]]
- [[CHECKPOINT 18 - Surfers Quest Decoration Positioning]]
- [[Current Status]]
