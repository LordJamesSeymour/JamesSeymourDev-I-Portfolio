# Skill Assisted Design Plan

> **Status:** Active governance for skill/plugin-assisted work (2026-06-10)
> How Claude Code **skills/plugins** (UI/UX, design-system, animation, code-review, security, etc.)
> should be used on this project. Read together with [[Design System Brief]] (the *what*); this note
> is the *how* and the *guardrails*. Mission: [[Immersive 3D Direction]].

---

## 1. Core principle
**Skills serve the mission — the mission does not bend to a skill's defaults.**
A design/UX skill brings craft (layout, spacing, motion, a11y, consistency). It must apply that craft
**within** the established direction: a cinematic, dark, 3D-enhanced, scroll-based, recruiter-friendly,
data-driven, GitHub-Pages portfolio. When a skill's generic output conflicts with [[Design System Brief]],
**the brief wins.**

---

## 2. Skills MAY
- Improve **visual quality**: typography, spacing, hierarchy, color application, glass/glow/gradient polish.
- Improve **layout & responsiveness** across breakpoints.
- Improve **motion**: scroll reveals, hover/entrance animation, easing — subtle and reduced-motion safe.
- Improve **accessibility**: contrast, focus states, semantics, keyboard support, ARIA where apt.
- Improve **consistency**: extract reusable components + design tokens, dedupe styles.
- Improve **code quality**: review for bugs, simplification, performance (code-review/security skills).

## 3. Skills MUST NOT
- ❌ Override or dilute the **core mission** (turn it into a generic SaaS/AI landing page).
- ❌ Remove or rewrite the **ObsidianVault**, the **PRD** (`docs/PRD.md`), or planning docs.
- ❌ Break the **data-driven project system** (`src/data/projects.ts`, `src/types/project.ts`,
  `src/lib/projects.ts`) or hard-code project content into components.
- ❌ Break **GitHub Pages compatibility** (no backend/SSR/server runtime; keep it a static build;
  respect Vite `base` + `public/404.html` SPA fallback).
- ❌ Do a **single massive rewrite** — work in phases (§5), small reviewable diffs.
- ❌ Mix **3D logic** into normal page components — all R3F stays in `src/components/three/`, lazy/gated.
- ❌ Drop **mobile** or **reduced-motion** fallbacks, or remove placeholder-safety (no missing-file refs).
- ❌ **Install packages silently** or swap the styling approach (no surprise Tailwind/CSS-in-JS).

---

## 4. How skills should work (operating rules)
- **Read first:** [[Design System Brief]] + this note before touching UI files.
- **Evolve the existing system:** extend `tokens.css` + the BEM-ish classes in `globals.css`; reuse
  existing components (`Button`, `Tag`, `Section`, `ProjectCard`, `CoverMedia`). Don't fork parallel systems.
- **Tokens over magic values:** new colors/spacing/motion go in as CSS custom properties, not inline literals.
- **Reusable components:** prefer a shared component + data props over one-off sections.
- **Isolate 3D:** lazy-loaded, capability-gated, error-bounded, with a 2D fallback → [[Immersive 3D Direction]] §8.
- **Keep it green:** `npm run typecheck` + `npm run build` must pass after each change; site stays responsive.
- **Honour the checklists:** Accessibility (§9) + Performance (§10) of [[Design System Brief]].

---

## 5. Phased usage (which skills, when)
Skills assist **within** the project phases — they do not invent their own order. → [[Implementation Hub]].

| Phase | Goal | Skills most useful |
|---|---|---|
| **0 — Skill prep (this pass)** | Docs/brief/plan ready | *(none — documentation)* |
| **1 — Stabilize** | Confirm build/routes/data | code-review (sanity), no design skills yet |
| **2 — Premium 2D redesign** | Cinematic dark restyle + Motion | **UI/UX + design-system + animation skills (primary)** |
| **3 — Lightweight 3D hero** | Isolated R3F hero | animation skill (motion feel); code-review (isolation) |
| **4 — 3D showcase layer** | Panels / video screens / models | design-system (consistency); code-review (perf) |
| **5 — Scroll journey** | Cinematic scroll transitions | animation skill; a11y review (no hijack) |
| **6 — Real content** | Swap placeholders → real media | design-system (layout w/ real assets) |
| **7 — Optimize & deploy** | Perf, mobile, deploy | code-review + security; perf/a11y audit |

**Recommended starting point after install: Phase 2** (the existing site is the safe canvas). Hold
3D skills until Phase 3.

---

## 6. Skill-type → how to use it here
- **UI/UX design intelligence:** apply to Phase 2 layout/hierarchy/spacing/cards/sections; must follow
  [[Design System Brief]] and keep recruiter-readability.
- **Visual design system:** formalize tokens + reusable components; keep existing token names, extend additively.
- **Animation / motion:** Phase 2+ scroll reveals + hover; subtle, eased, reduced-motion safe, no scroll hijack.
- **Code-review:** run after each phase's diff for bugs/simplification/perf; great before commits.
- **Security:** low surface (static site, no backend) — useful mainly to vet dependencies and any
  embeds/links; run before deploy (Phase 7).
- **Other design skills:** allowed only if they respect §3 MUST-NOTs and defer to the brief.

---

## 7. Package-install & change policy
- **Explain before installing.** State the package, why, size/impact, and that it's GitHub-Pages-safe,
  **before** running `npm install`. Expected additions only: `framer-motion` (Phase 2), `three` +
  `@react-three/fiber` + `@react-three/drei` (Phase 3). Anything else needs a reason + OK.
- **Summarize after.** After any meaningful design change, report: what changed, which files, which
  tokens/components were added/edited, install (if any), and screenshots/notes — so James can review.
- **Small diffs, checkpoints.** Prefer phase-sized PRs/commits; create a checkpoint at phase boundaries
  (`/checkpoint`).

---

## 8. Pre-change & post-change checklist (paste into a skill run)
**Before:** ☐ read [[Design System Brief]] + this note ☐ identify the phase ☐ confirm data-driven +
existing tokens/classes ☐ plan a small diff.
**After:** ☐ `npm run typecheck` green ☐ `npm run build` green ☐ responsive (mobile→desktop) ☐ a11y
(contrast/focus/keyboard) ☐ reduced-motion verified ☐ no missing-file refs ☐ vault/PRD/data system
untouched ☐ summary written.

---

## 9. Files skills should treat as protected
- `ObsidianVault/**` and `docs/**` — planning/source-of-truth (edit only when explicitly doing a docs pass).
- `src/data/projects.ts`, `src/types/project.ts`, `src/lib/projects.ts` — the data system (extend
  additively; don't break the shape or slugs).
- `vite.config.ts` `base`, `public/404.html` — GitHub Pages routing.
- `src/hooks/usePrefersReducedMotion.ts`, `src/lib/placeholder.ts` — a11y/placeholder safety primitives.

## Related
- [[Design System Brief]] · [[Immersive 3D Direction]] · [[Technical Implementation Plan]]
- [[Implementation Hub]] · [[Animation Direction]] · [[Data Driven Project System]] · [[Checkpoint Hub]]
