# Video Capture Requirements

> **Status:** In Progress (planning — accepting captures when ready)
> **Last updated:** 2026-06-10
> How James should capture and deliver project footage so it works as **2D card covers** *and* as
> **video screens inside the 3D scene**. Supersedes the older [[Video Requirements]] for the
> immersive direction. Read with [[Immersive 3D Direction]] / [[3D Asset Requirements]].

---

## 1. Recommended Lengths

Short, looping, no audio dependency — these are *ambient* loops, not trailers.

| Use | Length | Notes |
|---|---|---|
| Card cover loop (2D grid) | **4–8 s**, seamless loop | Autoplays muted; should look fine looping forever. |
| Case-study hero loop | **6–12 s** | A touch longer; still loops. |
| In-scene `VideoScreen` (3D) | **4–10 s** | Mapped as a texture; keep it punchy and readable small. |
| Optional "full" showcase clip | **20–40 s** | Linked/embedded, **not** autoplayed inline. |

- Capture a longer take, then **trim to the best few seconds.** Pick a segment that reads instantly.
- Prefer motion that loops cleanly (avoid hard cuts to a totally different frame at the loop point).

---

## 2. Recommended Aspect Ratios

| Target | Ratio | Source resolution |
|---|---|---|
| Card cover / case-study hero | **16:9** (matches existing `CoverMedia`) | 1920×1080 source → deliver ~1280×720 |
| In-scene video screen | **16:9** default; **4:3** for the arcade marquee if it suits the cabinet | match the mesh's UVs |
| Optional vertical/mobile | 9:16 only if specifically needed | usually skip |

- **Default to 16:9** — the grid, hero, and most screens assume it (see `placeholder.ts` 800×450).
- For the **Arcade Machine marquee**, a **4:3 or square** capture may fit the cabinet screen better —
  capture both if easy.
- Record at **1080p**, deliver downscaled; 4K source is wasted bytes for web loops.

---

## 3. Suggested Captures Per Project

Aim for **1 hero loop minimum**, plus a few stills. More is better but the loop is the priority.

**Per project, ideally:**
- [ ] **1× hero gameplay loop** (the "money shot" — most visually striking few seconds).
- [ ] **2–4× screenshots** (stills for the gallery + as video posters / reduced-motion fallback).
- [ ] Optional: **editor/build footage** (engine viewport, level editor, tooling) — great for
  Basilisk Engine, Hammer Moonbase, EOS server.
- [ ] Optional: a longer **showcase clip** (linked, not inline).

**Project-specific notes:**
- **Arcade Machine** — gameplay loop *for the marquee screen* + cabinet beauty angles → pairs with the GLB.
- **Surfers Quest / Bomberman-style** — clean gameplay loops (⚠ Bomberman: **original art only**, no
  Super Bomberman assets → [[Missing Content Checklist]]).
- **EOS Dedicated Server** — terminal/log/connection-flow capture or a network diagram animation.
- **Basilisk Engine** — engine viewport, wireframe, a feature demo (renderer/physics/editor).
- **Zombies VR** — in-headset/mixed-reality capture; gameplay from the player view.
- **Cursor.zip** — screen capture of the app/UI in action.
- **Hammer Moonbase** — flythrough of the level + editor top-down.

Each captured asset maps to a `projects.ts` entry → [[Data Driven Project System]].

---

## 4. How Videos Are Used in Project Cards (2D layer)

Already supported in code by `CoverMedia` + the `Project.cover` field — drop the file in and set data:

- `cover: { type: "video", src: "/media/<slug>.mp4", poster: "/media/<slug>.jpg", alt: "…" }`.
- Plays **muted + looped + inline**, autoplay, no controls (so the card link still receives clicks).
- **Reduced motion → the `poster` still is shown instead** (so always supply a poster).
- Missing file → generated SVG placeholder (never 404s) → [[Placeholder Asset Rules]].

---

## 5. How Videos Are Used Inside 3D Display Panels (3D layer)

Same source files, mapped as a texture onto an in-scene mesh by the `VideoScreen` component:

- The MP4 becomes a `VideoTexture` on a "screen" — arcade marquee, floating monitor, server display,
  VR headset lens, etc. (chosen by `immersive.showcaseType: "video-screen"`).
- **Performance:** only the screen(s) in/near the viewport should be playing — pause off-screen
  videos; don't decode every clip at once. One short looping clip per active screen.
- **Reduced motion / mobile / low-power:** the screen shows the **poster image** as a static texture
  instead of a playing video — identical framing, no decode cost.
- Because card covers and 3D screens share the **same files**, one capture serves both layers.

---

## 6. File Size & Compression

- **Codec:** H.264 MP4 (broad support) as the baseline; add **WebM/VP9 or AV1** as a smaller
  secondary source if convenient. (HEVC/H.265 has patchy browser support — avoid as the only source.)
- **Target size:** card/hero loops **≤ ~1–2 MB**; in-scene loops **≤ ~1–3 MB**. Short + compressed.
- **No audio track** on autoplay loops (strip it — saves bytes, and they're muted anyway).
- **Frame rate:** 30 fps is plenty for web loops; 60 only if the motion truly needs it.
- **Always export a poster** (`.jpg`/`.webp`, the first/best frame) for every clip — used before load
  and for reduced-motion/static fallback.
- Keep the **GitHub Pages repo lean:** many large MP4s bloat the repo and the deploy. If total video
  weight gets heavy, host the big/optional clips externally (YouTube/Vimeo/CDN) and keep only the
  small inline loops in `public/media/` → see [[Video Requirements]].
- Compression tools (implementation-side): `ffmpeg` (e.g. CRF ~23–28, `-an` to drop audio,
  `-movflags +faststart`), Handbrake.

**Folder:** shipped loops live in `public/media/` → referenced as `/media/<slug>.mp4` (+ poster
`/media/<slug>.jpg`). Naming matches the project `slug`.

---

## 7. Placeholder Strategy

Mirrors [[Placeholder Asset Rules]] — the site never references a missing video.

- No video yet → the card/hero shows a **generated SVG placeholder** ("media coming soon"); the 3D
  `VideoScreen` shows a tinted placeholder texture / its poster. Nothing 404s.
- Supply assets **incrementally** — one good loop per project already lifts the whole site; the rest
  can land later.
- Each placeholder→real swap is a **data-only change** in `projects.ts` (set `cover` / `media.video`)
  and is tracked in [[Missing Content Checklist]].

## What James Provides
- [ ] At least **one hero loop per project** (start with featured: Arcade Machine, EOS, Basilisk, Zombies VR).
- [ ] **Posters/screenshots** for each (also used as fallbacks).
- [ ] Optional editor/build/showcase footage where it strengthens the story.

## Related
- [[Immersive 3D Direction]] · [[3D Asset Requirements]] · [[Data Driven Project System]]
- [[Video Requirements]] · [[Image Requirements]] · [[Asset Collection Checklist]] · [[Placeholder Asset Rules]]
