# UI Style Guide

> **Status:** Concrete tokens defined for the cinematic dark direction (2026-06-10)
> The concrete token + component reference. Higher-level brief: [[Design System Brief]] (skills read
> that first). This note maps the brief onto the **actual** files: `src/styles/tokens.css` +
> `src/styles/globals.css`. **Evolve these — keep existing token names + class names.**

## Styling Approach
- **Global CSS + CSS custom-property design tokens** (current, working). `tokens.css` = variables;
  `globals.css` = base + BEM-ish component classes. **No Tailwind / CSS-in-JS** unless James approves
  → [[Open Questions]]. Skills must extend this system, not replace it → [[Skill Assisted Design Plan]].

## Color Tokens
Existing (in `tokens.css`) → cinematic target. **Keep the names**; deepen values + add the new ones.

| Token | Current | Target / role |
|---|---|---|
| `--color-bg` | `#0f172a` | `#0a0f1a` page base + 3D clear color |
| `--color-surface` | `#1e293b` | `#121a2b` elevated panel |
| `--color-surface-2` | `#243044` | media wells / insets |
| `--color-border` | `#334155` | standard border |
| `--color-text` | `#e2e8f0` | `#e6edf7` primary text |
| `--color-muted` | `#94a3b8` | `#93a4bf` secondary (verify AA) |
| `--color-primary` | `#38bdf8` | accent: links, CTAs, focus, key light, glow |
| `--color-primary-strong` | `#0ea5e9` | accent hover |
| `--color-on-primary` | `#04293b` | text on accent |

**Add (new):** `--color-hairline: rgba(148,163,184,0.18)` · `--color-accent-2: #a855f7` (sparing) ·
`--glass-bg: rgba(18,26,46,0.6)` · `--glass-blur: 12px` · `--glow-primary: 0 0 40px rgba(56,189,248,0.25)` ·
`--shadow-1`, `--shadow-2`, `--shadow-glow` · `--gradient-hero` (radial dark→accent).

## Typography
- **Display/headlines:** characterful sans — *Space Grotesk* (default suggestion) / *Sora* / *Satoshi*.
- **Body/UI:** *Inter* or current `--font-sans` system stack; `line-height 1.6`; body ≥ 16px.
- **Scale:** keep `--fs-sm…--fs-2xl`; **add** `--fs-3xl` (~3.25rem) and `--fs-display` (~clamp 3–5rem)
  for the hero. Display leading `1.05–1.15`, slight negative tracking. Line length ≤ ~70ch.

## Spacing & Layout
- Base unit **8px**; scale already defined (`--space-1…--space-16`). Section padding `--space-16`
  (mobile `--space-12`, already handled). Container `--container-max` (1100px) — consider a wider
  `--container-wide` for immersive sections.
- Radius: `--radius` (10px), `--radius-sm` (6px); **add** `--radius-lg` (~18px) for large glass panels.

## Components (real classes — restyle, don't replace)
- **Buttons** `.btn` / `.btn--primary` / `.btn--ghost`: primary = solid accent; ghost = glass/hairline.
  Visible focus ring; hover = subtle lift/glow; transitions `--dur-fast var(--ease-out)`.
- **Cards** `.card` (+ `.card__media`/`.card__body`/`.card__head`/`.card__title`/`.card__desc`/
  `.card__badge`): media-first premium panels. Cover via `.cover-media` (16:9, video/gif/image +
  reduced-motion poster — already built). Hover: lift + accent border + `--glow-primary` + slight cover
  zoom (base already lifts + recolors — enhance subtly). Status uses `.card__badge`.
- **Tags** `.tag` / `.tag--emphasis`: pill + hairline; emphasis = accent (category). `.tag-row` wraps tech.
- **Glass surfaces:** `.site-header` already uses `backdrop-filter` — formalize via `--glass-bg`/
  `--glass-blur`; reuse for featured panels + floating UI.
- **Sections** `.section` / `.section--muted` / `.section__title` / `.section__subtitle`; primitives
  `.container`, `.prose` (65ch), `.grid` (`auto-fill minmax(280px,1fr)`).
- **Hero** `.hero` (already has a radial accent glow + centered layout) — elevate type to `--fs-display`,
  layer the (later) 3D canvas behind it.

## Motion Tokens
`--ease-out: cubic-bezier(0.16,1,0.3,1)` · `--dur-fast: 160ms` · `--dur-mid: 320ms` · `--dur-slow: 600ms`.
Full motion rules → [[Animation Direction]]. `globals.css` already ships a global reduced-motion override.

## Accessibility
- [ ] Contrast ≥ WCAG AA (incl. muted text + text over media/glow).
- [ ] Visible focus states on every interactive element (don't remove outlines without a replacement ring).
- [ ] Semantic elements (`<a>`/`Link`, `<button>`, headings in order); meaningful `alt`.
- [ ] `prefers-reduced-motion` respected. Full checklist in [[Design System Brief]] §9.

## Related
- [[Design System Brief]] · [[Visual Identity]] · [[Animation Direction]] · [[Component Plan]] · [[Skill Assisted Design Plan]]
