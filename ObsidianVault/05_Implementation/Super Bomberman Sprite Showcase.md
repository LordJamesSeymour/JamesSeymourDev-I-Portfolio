# Super Bomberman Sprite Showcase

> **Status:** Implemented - 2026-06-13
> Route: `/projects/bomberman-style-game`

## Component

`src/components/projects/SuperBombermanSpriteShowcase.tsx` renders the Bomberman-only decorative
composition:

- a large left-walking Blue player behind the left side of the content,
- a large animated Chomper behind the right side,
- a player, bomb, punch, flight, and explosion sequence around the Gameplay Preview,
- the existing `PlayableDemo` panel and controls unchanged beneath the preview.

`ProjectPage.tsx` mounts the component only for `project.slug === "bomberman-style-game"`.
Surfers Quest, Arcade Machine, other project pages, project data, media paths, and demo logic are
unchanged.

`src/components/projects/spriteFrames.ts` provides base-aware frame-path generation plus looping and
clamped frame selection. The Surfers Quest implementation was not refactored, avoiding behavioral
changes to its established animation.

## Sequence Timing

The complete loop is `LOOP_MS = 10_000`:

| Time | Stage |
|---:|---|
| 0.0-1.8 s | Player loops the three walking-right frames |
| 1.8-2.8 s | Bomb appears directly in front of the player |
| 2.8-3.75 s | Player switches to the right-punch pose |
| 3.4-6.5 s | Bomb slides in a straight horizontal line along the preview's top border |
| 6.5-7.6 s | Bomb hides and a full nine-tile cross explosion plays once |
| 8.0-10.0 s | Player is hidden for the reset pause, then the loop restarts |

The punch overlaps the first 350 ms of bomb flight so the launch reads as one action.

## Route And Explosion

Bomb movement is linearly interpolated with `requestAnimationFrame` between two named points:

- placed position: `36%, 3.6%`,
- impact: `97.3%, 3.6%`.

The small player starts at `31.5%, 3.6%`, approximately 55 px to the right of the Gameplay Preview
heading at the 1280 px reference viewport. The shared y-coordinate keeps the bomb's sampled flight
variance at `0px` and aligns its center with the preview's top border.

The explosion is a sibling of the clipped media card under `.sb-showcase__preview-stage`, which
explicitly keeps `overflow: visible`. Its anchor is `top: 0; left: 100%`, the measured top-right
corner of the Gameplay Preview. The full cross uses nine tiles: center plus one continuation and
one end cap in each of the four directions.

The source project contains direction-neutral `Horizontal`/`HorizontalEnd` and
`Vertical`/`VerticalEnd` frame sets rather than separate left/right/top/bottom files. The left end
cap is flipped horizontally, the bottom continuation/end cap are flipped vertically, and the
right/top pieces use the source orientation. All nine pieces use the same clamped frame index and
180 ms timing.

## Side Decorations And Layers

- Large left-walking Blue player: `clamp(270px, 27vw, 340px)`, left side, `-7deg`.
- Large Chomper: `clamp(320px, 30vw, 390px)`, right side, `11deg`.
- Chomper uses the same wide-desktop tuck pattern as the Surfers Quest Melon:
  `150px`, then `70px` below 1400 px and `55px` below 1180 px.
- Decoration layer `0`: large Blue player and Chomper.
- Content layer `1`: Gameplay Preview and Playable Demo sections.
- Sequence layer `2`: small player, bomb, and explosion.
- Every decorative layer uses `pointer-events: none`.

## Frame Speeds

- Large Blue player: 170 ms per frame.
- Small walking player: 150 ms per frame.
- Chomper: 125 ms per frame.
- Bomb: 170 ms per frame.
- Explosion: 180 ms per frame, clamped so it plays once.

## Responsive And Reduced Motion

- At 1060 px and below, both side sprites and the complete mini-sequence are hidden.
- The React animation clock uses the matching `(min-width: 1061px)` query, so hidden decoration does
  not continue running.
- The existing demo and control cards retain their normal tablet/mobile layout.
- `prefers-reduced-motion: reduce` stops the clock, shows static player/bomb frames, and suppresses
  the explosion and CSS motion.

## Tuning

Edit `SuperBombermanSpriteShowcase.tsx` for:

- `LOOP_MS` and the named stage constants,
- `BOMB_START` and `BOMB_END`,
- player, bomb, Chomper, and explosion frame speeds.

Edit `SuperBombermanSpriteShowcase.css` for:

- `--sb-small-player-size`, `--sb-bomb-size`, and `--sb-blast-tile-size`,
- `--sb-side-player-size` and `--sb-side-chomper-size`,
- `.sb-showcase__side--player` and `--chomper` placement/rotation,
- `.sb-sequence__player` placement,
- `.sb-sequence__explosion` impact anchor,
- layer variables and the 1400/1180/1060 px breakpoints.

The small sequence uses 75% of its original scale:

- player: `clamp(39px, 4.5vw, 48px)`,
- bomb: `clamp(25.5px, 3vw, 33px)`,
- each explosion tile: `clamp(25.5px, 3vw, 33px)`.

## Related

- [[Super Bomberman Sprite Assets]]
- [[CHECKPOINT 20 - Super Bomberman Sprite Showcase]]
- [[CHECKPOINT 21 - Super Bomberman Sprite Tuning]]
- [[CHECKPOINT 22 - Super Bomberman Explosion Cross]]
- [[Surfers Quest Sprite Showcase]]
