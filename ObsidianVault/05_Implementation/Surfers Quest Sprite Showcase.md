# Surfers Quest Sprite Showcase

> **Status:** Implemented - 2026-06-13
> Route: `/projects/surfers-quest`

## Component

`src/components/projects/SurfersQuestSpriteShowcase.tsx` renders the complete decorative layer:

- the player route around the Gameplay Preview card,
- the animated Cherry pickup,
- the CSS arcade-style exit marker,
- the large Frog idle sprite on the left,
- the animated Melon pickup on the right.

`ProjectPage.tsx` mounts the component only inside the `project.slug === "surfers-quest"`
branch. The project data system, editable text hooks, gameplay video, WebAssembly iframe, mute,
fullscreen, reset, and control cards remain unchanged.

## Route Timing

The full cycle is `ROUTE_CYCLE_MS = 18_000`:

| Approximate time | Stage |
|---:|---|
| 0.0-0.7 s | Spawn with the player idle near the preview's top-left |
| 0.7-5.9 s | Run right, collect the Cherry, and fully reach the preview's top-right edge |
| 5.9-6.7 s | Hold the edge x-position and use the native fall frame for a short downward drop |
| 6.7-9.3 s | Switch to `PlayerWallgrab` frames in their native horizontal orientation while descending the right edge |
| 9.3-12.5 s | Land, face left, and run toward the exit below the preview |
| 12.5-13.0 s | Exit flare and player fade/despawn |
| 13.0-18.0 s | Hidden reset pause, then respawn |

The player position is interpolated with `requestAnimationFrame` from
`ROUTE_KEYFRAMES`. React updates sprite frames at a slower 80 ms cadence, keeping movement smooth
without rerendering the page at display refresh rate.

## Pickup And Exit

- Cherry frames cycle every 120 ms.
- The Cherry brightens near the collision point, fades out, and returns when the 18-second loop resets.
- The player starts at 30% of the route overlay, placing it about 35 px to the right of the
  Gameplay Preview heading at the 1280 px desktop reference viewport.
- The Cherry and its collision keyframe are positioned at 44% of the top route.
- The exit is a small rotated square with a violet core rather than the screenshot annotation.
- The exit and final route point are positioned at 78% of the lower route, closer to the right-side gap.
- The exit pulses quietly and receives a stronger flare while the player despawns.

## Side Decorations

- Frog idle uses all 11 `Player2/PlayerIdle` frames at 180 ms per frame.
- Melon uses all 17 pickup frames at 115 ms per frame.
- Desktop side-sprite size is `clamp(416px, 36vw, 496px)`, approximately four times the previous
  115 px rendering at a 1280 px viewport.
- Frog rotation is `-30deg`; Melon rotation is `20deg`.
- Frog placement uses `top: 8%` and a strongly negative left offset. At the desktop reference
  viewport its rotated image begins offscreen and extends behind the Gameplay Preview card.
- The Melon frames contain substantial transparent padding. A `22 / 16` cropped inner viewport
  isolates the animation's union of opaque pixels, making the fruit itself visible and large.
- The Melon wrapper is pulled inward from the right viewport margin by `150px` on wide desktops,
  producing roughly a 15% tuck beneath the content edge. The inset steps down to `70px` below
  1400 px and `55px` below 1180 px so the fruit remains visible in narrower desktop gutters.
- Named layer variables place decorations above the cosmic background but below the media sections.
- Both use `pointer-events: none`, so the playable demo remains fully interactive.
- They scale down below 1180 px and hide below 1060 px.

## Mobile And Reduced Motion

- Below 700 px, the route overlay is hidden and its animation clock is stopped.
- Below 1060 px, the large side decorations are hidden.
- The existing demo action and control-card breakpoints continue to stack normally.
- `prefers-reduced-motion: reduce` stops the frame clock and CSS pulse/hover animations.
- Reduced motion shows static player, Cherry, exit, Frog, and Melon frames.

## Tuning

Edit these values in `SurfersQuestSpriteShowcase.tsx`:

- `ROUTE_CYCLE_MS` for the full loop duration.
- `SPAWN_RUN_START_MS`, `EDGE_FALL_START_MS`, `WALL_GRAB_START_MS`, `WALL_GRAB_END_MS`, and
  `EXIT_REACHED_MS` for state changes.
- `ROUTE_KEYFRAMES` for player path percentages and opacity.
- The wall coordinate is `94.4%`: with the route overlay inset, this places the wall-grab
  sprite at the preview card's actual right border. The wall-grab-only transform uses the
  sprite's native horizontal orientation; the returning run remains mirrored independently.
- The `frameAt(...)` durations for sprite animation speed.

Edit these values in `SurfersQuestSpriteShowcase.css`:

- `--sq-player-size`, `--sq-pickup-size`, and `--sq-side-size` for scale.
- `--sq-frog-rotation` and `--sq-melon-rotation` for the two decorative tilts.
- `--sq-layer-decoration`, `--sq-layer-content`, and `--sq-layer-route` for stacking.
- `.sq-showcase__side--frog` and `--melon` for side placement.
- `.sq-route__pickup`, `.sq-route__exit`, and `.sq-route__edge` for route landmarks.
- The 1060 px and 700 px media queries for responsive visibility.

## Related

- [[Surfers Quest Sprite Assets]]
- [[CHECKPOINT 16 - Surfers Quest Sprite Showcase]]
- [[Animation Direction]]
