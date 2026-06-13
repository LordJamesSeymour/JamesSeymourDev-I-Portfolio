# Super Bomberman Sprite Assets

> **Status:** Integrated - 2026-06-13
> Used by: [[Super Bomberman Sprite Showcase]]

## Source

Original C++ project root:

`C:\Users\james\OneDrive\Escritorio\LowLevelY3\assets\Game#0\Bomberman\Resources`

Only the frames needed by the portfolio decoration were copied.

| Animation | Original folder | Portfolio destination | Files |
|---|---|---|---:|
| Blue player walk right | `Player/Blue/Right/` | `public/SuperBomberman/Sprites/Player/WalkRight/` | 3 |
| Blue player walk left | `Player/Blue/Left/` | `public/SuperBomberman/Sprites/Player/WalkLeft/` | 3 |
| Blue player punch right | `Player/Blue/Punch/` | `public/SuperBomberman/Sprites/Player/Punch/` | 1 |
| Bomb fuse | `Bombs/BombAnim/` | `public/SuperBomberman/Sprites/Bomb/` | 3 |
| Explosion center | `Bombs/ExplosionAnim/Center/` | `public/SuperBomberman/Sprites/Explosion/Center/` | 4 |
| Explosion horizontal | `Bombs/ExplosionAnim/Horizontal/` | `public/SuperBomberman/Sprites/Explosion/Horizontal/` | 4 |
| Explosion horizontal end | `Bombs/ExplosionAnim/HorizontalEnd/` | `public/SuperBomberman/Sprites/Explosion/HorizontalEnd/` | 4 |
| Explosion vertical | `Bombs/ExplosionAnim/Vertical/` | `public/SuperBomberman/Sprites/Explosion/Vertical/` | 4 |
| Explosion vertical end | `Bombs/ExplosionAnim/VerticalEnd/` | `public/SuperBomberman/Sprites/Explosion/VerticalEnd/` | 4 |
| Chomper front walk | `Enemies/Chomper/Front/` | `public/SuperBomberman/Sprites/Chomper/` | 10 |

Total copied: **40 PNG files**.

The punch source contains one pose per direction rather than a numbered animation. Only
`punchright.png` is required because the decorative bomb travels to the right.

The large left-side decoration uses the three left-walk frames. The small title-line sequence keeps
the right-walk frames because it places and punches the bomb toward the preview's top-right corner.

All 20 source explosion PNGs are present byte-for-byte in the portfolio. The source has no separate
bottom/right folders: the complete cross reuses the horizontal/vertical continuation and end-cap
frames with directional CSS flips.

## Browser Paths

Vite public assets are referenced without the `public` prefix:

- `/SuperBomberman/Sprites/Player/WalkRight/PlayerRight_0.png`
- `/SuperBomberman/Sprites/Player/WalkLeft/PlayerLeft_0.png`
- `/SuperBomberman/Sprites/Player/Punch/punchright.png`
- `/SuperBomberman/Sprites/Bomb/bomb_0.png`
- `/SuperBomberman/Sprites/Explosion/Center/center_0.png`
- `/SuperBomberman/Sprites/Chomper/ChomperFront_0.png`

`resolvePublicAssetPath(...)` applies Vite's configured base path, preserving GitHub Pages
compatibility.

## Frame Geometry

- Player walk and punch: `16 x 24`.
- Bomb, explosion tiles, and Chomper: `16 x 16`.
- The files have tight opaque bounds and do not require the cropped-inner-viewport treatment used
  by the Surfers Quest Melon.

## Related

- [[Super Bomberman Sprite Showcase]]
- [[CHECKPOINT 20 - Super Bomberman Sprite Showcase]]
- [[CHECKPOINT 22 - Super Bomberman Explosion Cross]]
- [[Portfolio Asset Requirements Table]]
