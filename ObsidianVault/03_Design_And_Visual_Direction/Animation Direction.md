# Animation Direction

> **Status:** Direction set for the immersive pivot (2026-06-10)
> Motion should feel **cinematic and alive** but never get in the way of content, performance, or
> accessibility. Pairs with [[Immersive 3D Direction]] · [[Visual Identity]].

## Principles
- **Purposeful, eased, cinematic.** Reveals/transitions ~300–600ms with soft easing (longer than a
  typical UI micro-interaction, because the feel is filmic); micro-interactions stay 150–250ms.
- **Scroll drives the story, but never hijacks it.** Read scroll position to animate; **never trap,
  snap-lock, or fight native scroll.** A recruiter can always just scroll normally. → [[Immersive 3D Direction]] §3.
- **Respect `prefers-reduced-motion`.** When set: disable parallax/auto-motion, cut transitions to
  near-instant fades, freeze 3D/video to stills. Layout/content stay identical. (Hook already in code:
  `usePrefersReducedMotion`.)
- **Performance first.** Animate `transform`/`opacity` (GPU-friendly); avoid layout-thrashing props.
  Use `IntersectionObserver` for reveals; don't animate off-screen work.
- **Restraint = premium.** A few well-tuned moments beat constant motion everywhere.

## Motion Inventory
**2D layer (Phase 2 — Framer Motion / Motion):**
- [ ] Hero entrance: title/tagline/CTA staggered fade + rise.
- [ ] Scroll-reveal for sections (fade + slight Y-axis parallax as they enter the viewport).
- [ ] Project card: hover lift + cover zoom + accent glow; entrance stagger in the grid.
- [ ] Section-to-section easing / subtle parallax on backgrounds and glow layers.
- [ ] Page transitions between home and case-study pages (soft cross-fade).

**3D layer (Phases 3–5 — R3F):**
- [ ] Hero camera: gentle idle drift + **mouse-follow parallax** + scroll-driven dolly.
- [ ] Floating project panels: slow bob/rotate; focus/scale on the active one.
- [ ] Scroll-based camera journey across featured projects (eased, not snapped).
- [ ] Video screens: subtle emissive flicker / glow (skipped under reduced motion).

## Scroll Technique (recommended)
- **Primary:** Framer Motion `useScroll` + `useTransform` → values **lerped** to drive both DOM
  parallax and the fixed background `<Canvas>` camera. Native scroll stays authoritative.
- **Only if a section needs canvas-locked scroll:** Drei `ScrollControls` *inside that section*.
- **Optional smooth-scroll:** Lenis (`@studio-freight/lenis`) for buttery inertia — must be
  reduced-motion aware and trivially disableable. Not required; add only if it clearly helps.

## Tooling
- **Framer Motion / Motion** — primary for DOM scroll reveals + UI motion (added in Phase 2).
- **CSS transitions** — hover/focus micro-interactions (no JS needed).
- **R3F + Drei** — all 3D camera/object motion (Phases 3+), behind the capability gate.

## Reduced-Motion Checklist (every animated feature must pass)
- [ ] Parallax & auto-motion off; transitions become quick fades or instant.
- [ ] 3D scene → static (or not mounted); videos → poster stills.
- [ ] No essential information is conveyed *only* through motion.

## TODO
- [ ] James: how flashy? (restrained ↔ cinematic ↔ flashy) — sets intensity/density defaults.

## Related
- [[Design System Brief]] · [[Immersive 3D Direction]] · [[Visual Identity]] · [[UI Style Guide]] · [[Responsive Design Notes]] · [[Milestone 4 - Visual Polish]]
