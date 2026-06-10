# Immersive 3D Direction

> **Status:** In Progress (planning — no 3D code yet)
> **Last updated:** 2026-06-10
> The governing design note for the project's **new mission**: evolve the portfolio from a
> standard card-based site into a **premium, cinematic, 3D-enhanced, scrollable immersive
> experience** — without turning it into a game.
> Read alongside [[Visual Identity]] · [[Animation Direction]] · [[Technical Implementation Plan]].

---

## 1. The New Mission Objective

> **A 3D scrollable immersive portfolio experience for James Seymour, focused on showcasing his
> work as a game programmer and designer through cinematic visuals, 3D project representations,
> animated media, and high-end web presentation.**

The site should feel like:
- A premium game-developer portfolio.
- A cinematic interactive landing page.
- A scroll-based 3D showcase.
- A site that looks **expensive and intentional**.
- A site that still works clearly as a professional portfolio and **scales** as projects are added.

It must **not** feel like:
- A generic AI-generated portfolio or a black/white card template.
- A full Unity/WebGL game or a walking simulator.
- A site where navigation becomes confusing.
- A heavy site that breaks on mobile or GitHub Pages.

**The key idea:** the page stays **scroll-based and readable**, but the **visual layer becomes
immersive and 3D**. Normal web navigation + normal portfolio content, enhanced with 3D scenes,
project models, video screens, parallax, scroll-triggered reveals, and cinematic lighting.

---

## 2. 3D-Enhanced Portfolio ≠ Full 3D Game

This distinction governs every decision. When in doubt, choose the portfolio behaviour.

| Aspect | ✅ What we ARE building (3D-enhanced portfolio) | ❌ What we are NOT building (3D game) |
|---|---|---|
| Navigation | Normal vertical page scroll + nav links | First-person / WASD movement, free camera |
| Camera | Subtle, scripted parallax & scroll-driven easing | Player-controlled orbit/fly camera |
| Interaction | Hover, click-to-open, gentle mouse-follow | Physics, collisions, quests, inventory, rooms |
| 3D's job | A **visual layer** behind/within readable content | The primary content / the whole experience |
| Reading the site | Works fully with **zero** 3D understanding | Requires "playing" to get value |
| Failure mode | Falls back to a clean 2D portfolio | Breaks / blank screen |

**Mental model:** the 3D is the *stage lighting and set dressing*. The *script* (James's projects,
described in plain readable HTML) is what recruiters came for. The lighting makes it cinematic; it
is never a prerequisite for reading the script.

---

## 3. Why the Site Stays Scroll-Based

- **Recruiters skim.** They have seconds. Scroll is the universal, zero-learning-curve interaction.
  A custom navigation model adds friction exactly where we can't afford it.
- **Accessibility & SEO.** Real DOM content scrolls, is keyboard-navigable, screen-reader friendly,
  and crawlable. A canvas-only experience is none of these.
- **Performance & reliability.** Normal scroll degrades gracefully; a bespoke 3D navigation has many
  more ways to fail on low-end / mobile / locked-down corporate machines.
- **Scroll *is* the cinematic device.** Scroll progress drives camera easing, section reveals, and
  project transitions — that gives us "cinematic" for free without hijacking input.

**Hard rule — no scroll hijacking.** Native scroll stays in control. We *read* scroll position to
drive motion; we never trap, snap-lock, or fight it. An optional smooth-scroll (e.g. Lenis) may be
added later but must be reduced-motion aware and easy to disable. See [[Animation Direction]].

---

## 4. How React Three Fiber Should Be Used

R3F/Three/Drei are a **bolt-on enhancement layer**, strictly isolated from page logic.

### Isolation rules
- **All 3D lives in `src/components/three/`.** No Three.js imports leak into `pages/`, `home/`,
  `layout/`, or `projects/` components.
- **Lazy-loaded & code-split.** The Canvas and everything under it load via `React.lazy` +
  `Suspense` so the base HTML portfolio ships and paints **before** the (large) 3D chunk arrives.
- **Gated, never assumed.** A capability gate decides whether 3D mounts at all:
  - WebGL available? (feature-detect; if not → static fallback)
  - Not `prefers-reduced-motion`? (if reduced → static/dimmed fallback)
  - Not a low-power / small-mobile device? (if so → simplified scene or static poster)
- **Error-bounded.** An `ErrorBoundary` wraps the Canvas; a GL crash falls back to the 2D layer
  instead of white-screening the page.

### Recommended scene pattern (recruiter-safe, no hijack)
- A **single, fixed/sticky background `<Canvas>`** sits *behind* the normal scrolling DOM (think:
  `position: fixed; inset: 0; z-index: -1`), OR per-section canvases that mount when their section
  enters the viewport.
- Scroll progress (via Framer Motion `useScroll` / `useTransform`, or Drei `ScrollControls` only if
  a section genuinely needs canvas-locked scroll) is **lerped** to drive camera position and object
  state. Easing, not 1:1 jumps → cinematic feel.
- `frameloop="demand"` where possible (render on change, not every frame) and a clamped `dpr={[1, 2]}`.

### Proposed component map (`src/components/three/`)
`HeroCanvas` · `ScrollScene` · `CameraRig` · `SceneLights` · `FloatingProjectCards` ·
`ProjectModel` · `VideoScreen` · `Particles` · `EnvironmentStage` · plus `WebGLGate` /
`Canvas3DFallback` wrappers. See [[Technical Implementation Plan]] §8 (3D / Immersive Architecture).

---

## 5. What 3D Elements to Add FIRST (and the order)

Build the cinematic feel in cheap, safe layers before any heavy model loading.

1. **Hero background canvas** — abstract, lightweight: drifting particles / floating geometric
   "project fragments", soft gradient fog, one or two key lights. Mouse-follow parallax + scroll
   parallax. **No project models yet.** This alone sells "premium" at almost no asset cost.
2. **Scroll-driven camera easing** — as the user scrolls the hero into the projects, the camera/dolly
   eases subtly. Establishes the cinematic spine.
3. **Floating project panels (`FloatingProjectCards`)** — glassy 2D-in-3D panels for featured
   projects, driven by `projects.ts`. Still no GLB required.
4. **Video screens in 3D (`VideoScreen`)** — a project clip mapped onto an in-scene "screen" /
   arcade marquee. Uses the same video assets as the 2D cards.
5. **Real model showcase (`ProjectModel`)** — load GLBs for projects that have them (Arcade Machine
   first). Optional, lazy, per-project, gated.
6. **Scroll-based immersive journey** — stitch featured projects into a continuous cinematic camera
   path. Last, because it depends on all the above being stable.

> Each layer must ship **with its fallback** before the next is started. Never let "step 5" block a
> working "step 1".

---

## 6. How Project Videos & 3D Models Are Used

Driven entirely by the extended `Project` schema → [[Data Driven Project System]].

- **Videos** are the *default* rich medium (every project can have one; far cheaper than modelling):
  - In the **2D layer**: looping muted card covers + case-study hero (already supported by
    `CoverMedia`). See [[Video Capture Requirements]].
  - In the **3D layer**: the same MP4 mapped as a texture onto a `VideoScreen` mesh (arcade marquee,
    floating monitor, VR headset display, server rack screen, etc.).
- **3D models** are the *premium accent*, used only where they add real "wow":
  - Loaded as **GLB/glTF** (Draco/meshopt compressed), lazy + gated. See [[3D Asset Requirements]].
  - Each project's `immersive.showcaseType` picks how it appears: `model`, `video-screen`,
    `floating-card`, `environment`, or `placeholder`.
- **Mixed reality of assets:** some projects will only ever have screenshots/video. The system must
  treat 3D as optional per project and **fall back through** model → video → image → generated
  placeholder. No project is ever blocked on having a model.

---

## 7. Keeping Performance Safe (non-negotiable on GitHub Pages)

- **3D enhances; it is never required.** The DOM portfolio is the product; WebGL is icing.
- **Code-split** every 3D dependency; lazy-load on idle / on viewport, never on first paint.
- **One canvas where possible.** Multiple live WebGL contexts are expensive — prefer a single shared
  canvas or mount/unmount per section.
- **Budget the assets:** GLB ≤ ~1–3 MB each (Draco), textures ≤ 1–2K, video clips short & compressed
  (see [[3D Asset Requirements]] / [[Video Capture Requirements]]).
- **Lazy-load heavy media.** Do **not** load every video/model up front — load on viewport / on
  demand. Use posters/placeholders until then.
- **Clamp the work:** `dpr={[1, 2]}`, `frameloop="demand"`, dispose geometries/textures on unmount,
  cap particle counts, avoid heavy postprocessing on mobile.
- **Mobile path:** simplified scene or **static poster fallback** — never the full desktop scene.
- **Reduced-motion path:** stop autoplay/animation, show stills, keep the layout identical.
- **Targets:** fast first paint of the 2D site; Lighthouse Perf/A11y/Best-Practices stay green even
  with 3D present → [[Milestone 6 - Final QA]].

---

## 8. Keeping It Recruiter-Friendly

- **The traditional gallery + case-study pages always exist** and are reachable without touching the
  3D scene. The immersive homepage is the cinematic *overview*; detail pages stay clean and readable.
- **Clarity over spectacle:** every project still shows a clear title, category, description, tech,
  and links. A recruiter can get James's full story by scrolling and reading — 3D adds delight, not
  a comprehension tax.
- **Obvious affordances & escape hatches:** standard nav, "View Work / Contact / Download CV" CTAs,
  and a clear path to each case study. Nothing important is hidden behind an interaction.
- **It must work everywhere:** WebGL off, old browser, corporate lockdown, mobile, reduced-motion —
  all still yield a polished, complete portfolio.

---

## 9. Open Questions (James Input)
- [ ] How "flashy" vs. "restrained"? (Sets particle density, postprocessing, motion intensity.)
- [ ] Which projects definitely get a real 3D model vs. video-only? → [[3D Asset Requirements]].
- [ ] Any reference sites whose *feel* you want to match? → [[Visual Identity]].

## Related
- [[Design System Brief]] · [[Skill Assisted Design Plan]] · [[Visual Identity]] · [[Animation Direction]] · [[Technical Implementation Plan]]
- [[Data Driven Project System]] · [[3D Asset Requirements]] · [[Video Capture Requirements]]
- [[Responsive Design Notes]] · [[Placeholder Asset Rules]] · [[Milestone 6 - Final QA]]
