# Surfers Quest Sprite Assets

> **Status:** Integrated - 2026-06-13
> Web destination: `public/SurfersQuest/Sprites/`

## Source Folders

Only the frame sequences used by the portfolio decoration were copied from the native C++ project:

| Use | Native source | Web destination | Frames |
|---|---|---|---:|
| Player idle / static fallback | `Resources/Player/PlayerIdle/` | `public/SurfersQuest/Sprites/Player/Idle/` | 11 |
| Player running | `Resources/Player/PlayerRun/` | `public/SurfersQuest/Sprites/Player/Run/` | 12 |
| Player fall transition | `Resources/Player/PlayerFall/` | `public/SurfersQuest/Sprites/Player/Fall/` | 1 |
| Player wall grab | `Resources/Player/PlayerWallgrab/` | `public/SurfersQuest/Sprites/Player/WallGrab/` | 5 |
| Frog idle | `Resources/Player2/PlayerIdle/` | `public/SurfersQuest/Sprites/FrogIdle/` | 11 |
| Melon pickup | `Resources/Pickups/Melon/` | `public/SurfersQuest/Sprites/Melon/` | 17 |
| Cherry pickup | `Resources/Pickups/Cherry/` | `public/SurfersQuest/Sprites/Cherry/` | 17 |

Total: **74 PNG frames, about 43 KB**. No audio, level, enemy, tile, demo, or unrelated
Surfers Quest resources were duplicated.

## Browser Paths

The component references these files as Vite public paths, for example:

```text
/SurfersQuest/Sprites/Player/Run/PlayerRun_0.png
/SurfersQuest/Sprites/FrogIdle/Player_0.png
/SurfersQuest/Sprites/Melon/Melon_0.png
```

`resolvePublicAssetPath()` applies `import.meta.env.BASE_URL`, preserving GitHub Pages
compatibility if the Vite base path changes.

## Rendering Notes

- All source frames are transparent 32 x 32 PNG files.
- The website scales them with `image-rendering: pixelated` and restrained drop shadows.
- Source filenames are preserved, including the lowercase `player_*.png` idle sequence.
- The sprite files are decorative and do not replace or modify the WebAssembly demo assets.

## Related

- [[Surfers Quest Sprite Showcase]]
- [[Portfolio Asset Requirements Table]]
- [[CHECKPOINT 16 - Surfers Quest Sprite Showcase]]
