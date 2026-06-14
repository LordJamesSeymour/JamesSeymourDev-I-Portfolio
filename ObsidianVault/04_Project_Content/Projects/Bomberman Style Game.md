# Bomberman Style Game

## Status
Completed — real copy written ([[CHECKPOINT 24 - Project Copy and Creative Process Pass]]).
Playable WebAssembly demo + decorative sprite showcase are live. Final public-facing title still TBD.

## Category
C++

## Short Description
A C++/SFML maze-action game built for the Arcade Machine project, featuring grid-based movement,
bombs, chain explosions, enemies, power-ups, hidden exits, level progression, audio, controller
support and a custom editor for building playable stages.

## Overview (case study)
This project was created for my final university module, where the brief was to recreate the feel of
a classic game while implementing my own systems and design choices. The result is a grid-based
maze-action game with destructible blocks, bomb placement, explosion propagation, enemy behaviours,
power-ups, hidden exits and multiple levels. It runs inside the Arcade Machine hub and is designed to
work with both keyboard input and the arcade controller setup.

## Creative Process (case study)
The project began with research into classic maze-action level structure, readable grid movement,
timed hazards, enemy pressure and risk-reward design. The biggest technical challenges were building
reliable tile collision, bomb timing, explosion spread, destructible blocks, enemy interactions,
power-up progression and level transitions while keeping the game responsive on the Raspberry Pi
build. I also developed a custom level editor, shared in concept with the Surfers Quest editor, so
levels could be created, saved, loaded and tested without manually editing map files. The editor
supports world selection, tile tools, enemy placement, player spawns, exits, breakable blocks and
level file management, which made iteration much faster.

## Naming note
⚠️ "Bomberman" / "Super Bomberman" are trademarks. The case-study copy frames this as a "maze-action
game"; a final original public-facing **title is still to be confirmed** →
see [[Placeholder Asset Rules]]. (`needs.txt` item: "Confirm the final public-facing project title".)

## Source of truth (live site)
- `public/content/projects/bomberman-style-game/short-description.txt`
- `public/content/projects/bomberman-style-game/long-description.txt` → case-study **Overview**
- `public/content/projects/bomberman-style-game/creative-process.txt` → case-study **Creative Process**
- Fallbacks mirrored in `src/data/projects.ts`
→ [[Editable Text Content System]] · [[C++ Projects]] · [[Project Content Hub]]

## Technologies
- C++ / SFML (native) → WebAssembly (Emscripten) via the SFML 3 → SDL2 shim for the web demo

## Media Needed
- [ ] Gameplay screenshot
- [ ] Level editor screenshot
- [x] Playable in-browser demo ([[CHECKPOINT 15 - Extracted Bomberman]])
- [x] Decorative sprite showcase ([[CHECKPOINT 20 - Super Bomberman Sprite Showcase]])

## Case Study Sections To Write
- [x] Overview
- [x] Creative Process
- [ ] My role
- [ ] Key features
- [ ] Technical challenges
- [ ] Design decisions
- [ ] Final result

## James Input Needed
- [ ] Final public-facing name (original, non-trademarked)
- [ ] Gameplay / level-editor screenshots
- [ ] GitHub link (if any)
