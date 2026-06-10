# Visual Identity

> **Status:** Direction set (cinematic dark) — palette details still want James input
> **Last updated:** 2026-06-10
> The look, feel, and personality of the site. Now aligned to the **immersive 3D direction** →
> [[Immersive 3D Direction]] · [[Animation Direction]] · [[UI Style Guide]].
> 🎯 **Skills should follow the consolidated [[Design System Brief]]** — this note feeds into it.

## Vibe / Adjectives
**Cinematic · dark · premium · technical · immersive.**
The site should read as a high-end *game-studio* landing page — expensive, intentional, confident —
while staying a clean, legible professional portfolio. Avoid: bright/white templates, generic
"AI portfolio" gradients, playful/cartoonish, cluttered.

> James: tweak these 5 words if any feel wrong (e.g. swap "technical" for "bold" / "moody" / "sleek").

## Color Palette (recommended direction — refine with James)
Dark, cool, low-light "control room / night render" base with a **single confident accent**. The
current code already leans this way (`tokens.css`: `#0f172a` bg, `#38bdf8` sky accent) — evolve, don't replace.

| Token | Suggested | Role |
|---|---|---|
| Background (base) | `#0a0f1a` → `#0f172a` (near-black navy) | Deep cinematic backdrop / 3D scene clear color |
| Surface / panel | `#121a2b`, glass: `rgba(20,28,46,0.6)` + blur | Cards, glass panels, nav |
| Border / hairline | `rgba(148,163,184,0.18)` | Subtle separation, glass edges |
| Text (primary) | `#e6edf7` | Headlines/body on dark |
| Text (muted) | `#93a4bf` | Secondary copy, captions |
| **Accent (primary)** | electric cyan/sky `#38bdf8`–`#22d3ee` | CTAs, links, neon glows, scene key lights |
| Accent (secondary) | violet/magenta `#a855f7` / `#f472b6` *(optional, sparing)* | Secondary highlight, gradient pairing |
| Success/glow | accent at low alpha for **gradient glows** behind panels/hero | "Expensive" lighting feel |

- **Neon used sparingly** — one or two accents max, as light/glow, not large fills. Restraint reads premium.
- Maintain **WCAG AA contrast** for all text (the dark base makes this easy; check muted text).

> James: provide brand colors or pick the accent (cyan vs. violet vs. amber). Default = cyan/sky.

## Surfaces & Texture
- **Glassmorphism panels:** translucent dark surface + backdrop blur + 1px light hairline border.
- **Gradient glows:** soft radial accent glows behind the hero and featured panels (the "lighting").
- **Depth:** layered shadows + parallax to imply 3D space even in the 2D layer.
- **Grain/noise (optional, very subtle):** kills banding on dark gradients, adds a filmic feel.

## Typography
- **Display / headlines:** a large, characterful sans (e.g. *Space Grotesk*, *Sora*, *Clash Display*,
  *Satoshi*) for big premium titles (the hero name should feel like a title card).
- **Body / UI:** a clean neutral sans (e.g. *Inter*, or the current system stack) for readability.
- Big type scale + generous spacing = cinematic. Self-host or use a privacy-friendly font CDN
  (keep it light; don't block first paint). → [[UI Style Guide]].

> James: any preferred typefaces? Default = Space Grotesk (display) + Inter (body).

## Logo / Wordmark
- [ ] "James Seymour" wordmark in the display face is enough to start; a monogram (JS) is optional.
- [ ] James: any existing logo assets?

## References
- [ ] James: link 2–3 sites whose *feel* you want (studio sites, awwwards game portfolios) + why.
- Touchstones for the target feel: cinematic dark studio landing pages, scroll-driven 3D showcases.

## Related
- [[Immersive 3D Direction]] · [[Animation Direction]] · [[UI Style Guide]] · [[Responsive Design Notes]] · [[Open Questions]]
