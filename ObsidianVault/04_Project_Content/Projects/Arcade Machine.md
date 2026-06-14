# Arcade Machine

## Status
Completed — real copy written ([[CHECKPOINT 24 - Project Copy and Creative Process Pass]]).
Flagship 3D exploded-view reveal + decorative controller backdrop are live.

## Category
C++

## Short Description
Arcade Machine is a hand-built C++/SFML arcade cabinet project that combines custom game
development, physical fabrication, Raspberry Pi deployment, controller integration, audio, and a
polished portfolio-ready presentation. The machine runs a small arcade hub with playable games,
menus, level selection, level editors, controller support, music, sound effects, and a custom
cabinet designed around a 7-inch display.

## Overview (case study)
Arcade Machine began as a software project and grew into a full physical build. The final system
combines a Raspberry Pi, a 7-inch display, USB controllers, external audio, custom power routing and
a 3D-printed cabinet into a portable arcade unit. The software includes an arcade hub, playable
games, level selection, in-game audio, controller mapping, and editor tools for creating new levels.

## Creative Process (case study)
The build required research across both software and hardware. I compared display options,
controller layouts, Raspberry Pi requirements, power sources, USB hubs, audio speakers, cable types
and port clearances before committing to the final layout. I learned to modify and adapt cabinet
meshes in Tinkercad, printed and tested physical parts, designed screen brackets, adjusted
clearances, routed cables, solved power delivery issues, and ported the C++/SFML project from
desktop development to Raspberry Pi. A large part of the process was iterative: testing physical
tolerances, improving cable management, checking controller behaviour, tuning audio output and
making the machine reliable enough to be shown at events.

## Source of truth (live site)
- `public/content/projects/arcade-machine/short-description.txt`
- `public/content/projects/arcade-machine/long-description.txt` → case-study **Overview**
- `public/content/projects/arcade-machine/creative-process.txt` → case-study **Creative Process**
- `public/content/projects/arcade-machine/inside-description.txt` → "Inside the Arcade Machine" subtitle
- Fallbacks mirrored in `src/data/projects.ts` / `src/components/three/arcadeContent.ts`
→ [[Editable Text Content System]] · [[C++ Projects]] · [[Project Content Hub]]

## Technologies
- C++ / SFML
- Raspberry Pi, 3D-printed cabinet (Tinkercad), 7-inch display, USB controllers, external audio

## Media Needed
- [ ] Build / cabinet photos
- [ ] Genuine H.264 MP4 of the arcade hub (replace the ASF/WMV-container placeholder)
- [x] 3D exploded-view reveal (live on `/projects/arcade-machine`)

## Case Study Sections To Write
- [x] Overview
- [x] Creative Process
- [ ] My role
- [ ] Key features
- [ ] Technical challenges
- [ ] Design decisions
- [ ] Final result

## James Input Needed
- [ ] Real build photos / genuine gameplay MP4
- [ ] GitHub / demo links (if any)
