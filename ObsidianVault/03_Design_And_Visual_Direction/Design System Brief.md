# Design System Brief

> **Status:** Source of truth for skill-assisted design (2026-06-10)
> **This is the single brief that Claude Code design/UX skills should read first and follow.**
> It consolidates [[Visual Identity]], [[UI Style Guide]], [[Animation Direction]], and
> [[Immersive 3D Direction]] into concrete, checkable rules. If a skill is told to "make it look
> good," point it here instead. Governance for *how* skills operate: [[Skill Assisted Design Plan]].

---

## 0. How a skill should use this brief
- **Read this brief + [[Skill Assisted Design Plan]] before editing any UI file.**
- **Evolve, don't replace.** The site already has a working dark token system + BEM-ish CSS
  (`src/styles/tokens.css`, `src/styles/globals.css`) and clean components. Extend those tokens and
  class names; do **not** rip them out, rename existing tokens, or swap the styling approach.
- **Stay data-driven.** Read content from `src/data/projects.ts` / `profile.ts`. Never hard-code a
  project into a component.
- **Every change must keep `npm run typecheck` and `npm run build` green**, stay responsive, and pass
  the Accessibility + Performance checklists below.

---

## 1. North Star
**Aesthetic:** cinematic · dark · premium · technical · immersive — a high-end *game-studio* landing
page for James Seymour (game programmer & designer).

**Mood:** a polished interactive landing page that feels *expensive and intentional* — controlled,
confident, filmic. Think "AAA studio site / awwwards game portfolio," not "template."

**It IS:** a scroll-based, readable, recruiter-friendly portfolio with an immersive *visual layer*.
**It is NOT:** a generic AI/SaaS landing page, a bright/white card template, a playable 3D game, a
first-person world, or anything that hides James's work behind interaction. → [[Immersive 3D Direction]].

**The "premium" test (anti-generic guardrails).** A change is on-brand only if it would look at home on
a top studio site: deliberate dark palette, **one** confident accent used as light/glow (not rainbow
gradients), real depth (layered shadow/blur/parallax), generous spacing, large characterful display
type, and media-first project panels. Reject: stocky hero blobs, purple-pink SaaS gradients, emoji
feature grids, dense low-contrast text, clutter.

---

## 2. Design Tokens (evolve `src/styles/tokens.css` — additive)
The current tokens are a good base. **Keep existing token names** (CSS across the app references them);
deepen values and **add** new tokens for glass/glow/gradient. Suggested cinematic target:

| Token | Current | Cinematic target / note |
|---|---|---|
| `--color-bg` | `#0f172a` | `#0a0f1a` (deeper near-black navy) — also the 3D scene clear color |
| `--color-surface` | `#1e293b` | `#121a2b` elevated panel |
| `--color-surface-2` | `#243044` | keep/raise slightly for media wells |
| `--color-border` | `#334155` | keep; add hairline `--color-hairline: rgba(148,163,184,0.18)` |
| `--color-text` | `#e2e8f0` | `#e6edf7` |
| `--color-muted` | `#94a3b8` | `#93a4bf` (verify AA on bg) |
| `--color-primary` | `#38bdf8` | keep (electric cyan/sky) — primary accent, links, key light |
| `--color-primary-strong` | `#0ea5e9` | keep (hover) |
| `--color-on-primary` | `#04293b` | keep |

**New tokens to add (additive):**
- Accent: `--color-accent-2: #a855f7` (violet — **sparing** secondary only).
- Glass: `--glass-bg: rgba(18,26,46,0.6)`, `--glass-blur: 12px`, `--glass-border: var(--color-hairline)`.
- Glow: `--glow-primary: 0 0 40px rgba(56,189,248,0.25)`; soft radial glow gradients behind hero/featured.
- Elevation: `--shadow-1`, `--shadow-2`, `--shadow-glow` (layered, low-opacity, large-blur — filmic).
- Gradient: `--gradient-hero` (subtle dark-to-accent radial), `--gradient-line` (1px accent hairline).
- Type scale: extend `--fs-*` upward for cinematic display (`--fs-3xl`, `--fs-display`) — see §3.
- Radius: keep `--radius`/`--radius-sm`; optionally add `--radius-lg` for big panels.
- Motion: `--ease-out: cubic-bezier(0.16,1,0.3,1)`, `--dur-fast: 160ms`, `--dur-mid: 320ms`, `--dur-slow: 600ms`.

> Tailwind is **not** in use. Stay on global CSS + custom-property tokens unless James approves a
> change → [[Skill Assisted Design Plan]] / [[UI Style Guide]].

---

## 3. Typography
- **Display/headlines:** large, characterful sans (e.g. *Space Grotesk* / *Sora* / *Satoshi*). Hero
  name should read like a title card (big, tight leading `1.05–1.15`, slight negative tracking).
- **Body/UI:** clean neutral sans (*Inter* or the current system stack) — readable, `line-height ~1.6`.
- **Hierarchy:** dramatic scale jump from display → section title → body. Generous whitespace.
- **Rules:** body ≥ 16px; line length ≤ ~70ch (`.prose` already caps 65ch); avoid all-caps for long
  text (eyebrows/labels only). Self-host or use a light, privacy-friendly font load — must not block
  first paint. Provide a system-font fallback stack.

---

## 4. Color & Accent
- **Dark, cool, low-light base.** Background is the canvas; panels are slightly elevated glass.
- **One confident accent** (cyan/sky `--color-primary`) for CTAs, links, focus, key lights, and glow.
  Secondary accent (violet `--color-accent-2`) only as an occasional gradient partner — never both loud.
- **Neon = light, not fill.** Use accents as glows/edges/highlights, not large saturated blocks.
- **Contrast is non-negotiable** — all text ≥ WCAG AA on its background (muted text especially).

---

## 5. Layout & Sections
- Scroll-based vertical sections (`.section`, `.container`, max-width `--container-max`). Each section
  = one clear idea: **Hero → About → Featured/Immersive Showcase → Projects gallery → Contact**.
- Strong rhythm: generous vertical padding (`--space-16`), consistent gutters, clear section titles.
- Depth via layered backgrounds: base bg + soft radial glow + (later) the fixed 3D canvas behind.
- Recruiter-readable always: real headings, real copy, real links — never content-only-in-canvas.
- Responsive: single-column on mobile; grids collapse gracefully (`grid` uses `auto-fill minmax`).

---

## 6. Components (extend existing classes — don't reinvent)
Real classes already exist in `globals.css`; restyle these rather than inventing parallel systems.
- **Buttons** (`.btn`, `.btn--primary`, `.btn--ghost`): solid accent primary + glass/ghost secondary;
  visible focus ring; subtle hover (glow/lift), `--dur-fast` `--ease-out`.
- **Project cards** (`.card`, `.card__media`, `.card__body`, `.card__title`, `.card__badge`,
  `.tag`): **premium media-first showcase panels** — 16:9 cover (`.cover-media` already handles
  video/gif/image + reduced-motion poster), glass body, strong title, category `Tag` + tech tags,
  status badge. Hover: lift + accent border + glow + slight cover zoom (the base already lifts +
  recolors border — enhance, keep it subtle). Keep clickable to `/projects/:slug`.
- **Glass panels:** translucent `--glass-bg` + `backdrop-filter: var(--glass-blur)` + hairline border;
  use for nav (`.site-header` already glassy), featured showcase panels, floating UI.
- **Tags/badges** (`.tag`, `.tag--emphasis`, `.card__badge`): pill, hairline border; emphasis uses accent.
- **Section headers** (`.section__title`, `.section__subtitle`): large title + muted subtitle.

---

## 7. 3D Direction (summary — full spec in [[Immersive 3D Direction]])
- Lightweight **React Three Fiber** layer, **isolated** in `src/components/three/`, **lazy-loaded**,
  **capability-gated** (WebGL + not reduced-motion + not low-power), **error-bounded**, with a 2D fallback.
- First: an abstract `HeroCanvas` (particles/grid/floating fragments, cinematic lighting, mouse-follow
  + scroll parallax). Later: floating project panels, in-scene `VideoScreen`s, optional GLB models.
- Driven by each project's `immersive` settings; fallback chain **model → video → image → placeholder**.
- The 3D **enhances**; it is never required. WebGL off / mobile / reduced-motion → full 2D site.

---

## 8. Motion (summary — full spec in [[Animation Direction]])
- **Motion / Framer Motion** for scroll-reveal of sections + card entrance/hover; CSS transitions for
  micro-interactions. Eased (`--ease-out`), cinematic (`--dur-mid`/`--dur-slow`), **subtle, not chaotic**.
- **Scroll drives the story but never hijacks it** — read scroll position; don't trap/snap/fight it.
- Animate `transform`/`opacity` only; use `IntersectionObserver` for reveals.
- **Reduced motion:** disable parallax/auto-motion, cut transitions to quick fades, freeze 3D/video to
  stills. `globals.css` already has a global reduced-motion override and the `usePrefersReducedMotion` hook exists.

---

## 9. Accessibility Checklist (every change must pass)
- [ ] Text contrast ≥ WCAG AA (incl. muted text + text over media/glow).
- [ ] All interactive elements keyboard-reachable with a **visible focus ring**.
- [ ] Links are real `<a>`/router `Link`s; buttons are `<button>`; no div-only click targets.
- [ ] Images have meaningful `alt`; decorative/canvas marked appropriately (`aria-hidden` where apt).
- [ ] Respects `prefers-reduced-motion` (no essential info conveyed only via motion).
- [ ] Hit targets ≥ ~40px; logical heading order (one `<h1>` per page).

---

## 10. Performance Checklist (GitHub Pages, static)
- [ ] Base 2D site paints fast; **3D + heavy media are code-split / lazy-loaded** (never block first paint).
- [ ] Don't load every video/model at once — load on viewport/on demand; pause off-screen video.
- [ ] Media budgets: video loops short + compressed (≤ ~1–2 MB); GLB ≤ 1–3 MB Draco; images sized/`webp`.
  → [[Video Capture Requirements]] · [[3D Asset Requirements]].
- [ ] Clamp 3D work (`dpr={[1,2]}`, on-demand frameloop, capped particles); skip postprocessing on mobile.
- [ ] No missing-file references — generated placeholders until real assets exist → [[Placeholder Asset Rules]].
- [ ] Lighthouse Perf/A11y/Best-Practices stay green with the 3D layer present.

---

## Related
- [[Skill Assisted Design Plan]] · [[Visual Identity]] · [[UI Style Guide]] · [[Animation Direction]]
- [[Immersive 3D Direction]] · [[Technical Implementation Plan]] · [[Data Driven Project System]]
- [[Responsive Design Notes]] · [[Placeholder Asset Rules]]
