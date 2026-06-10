# Technical Implementation Plan

> **Status:** In Progress — base site scaffolded; now planning the **immersive 3D** layer (2026-06-10)
> **Last updated:** 2026-06-10
> Consolidated, decision-making build plan for the James Seymour portfolio website.
> Source of truth: `docs/PRD.md`. This note turns the PRD + architecture notes into concrete,
> actionable recommendations for whoever (Claude / Codex / James) builds the site.
>
> **Reality check:** the base site is **already built and type-checks clean** — Vite + React 18 + TS
> + React Router, data-driven `projects.ts`, layout/home/projects/ui components, `CoverMedia`,
> reduced-motion + placeholder safety, dark tokens. Original Milestones 1–3 are effectively done.
> The work now is the **cinematic redesign + isolated 3D enhancement layer** → [[Immersive 3D Direction]].
>
> ⚠️ **The 3D dependencies below are not yet installed. Do not install them until James approves
> the move to the 3D phases.** The existing site keeps running without them.
>
> 🎯 **Skill-assisted edits:** design/UX skills must follow [[Design System Brief]] under the
> guardrails in [[Skill Assisted Design Plan]] — phased diffs, evolve existing tokens/classes, stay
> data-driven, isolate 3D, keep mobile + reduced-motion + GitHub Pages compatibility.

## Related Notes
- [[Design System Brief]] · [[Skill Assisted Design Plan]] · [[Immersive 3D Direction]] · [[Website Architecture Overview]]
- [[Data Driven Project System]] · [[Routing Plan]] · [[Component Plan]] · [[Folder Structure Plan]] · [[GitHub Pages Deployment]]
- [[3D Asset Requirements]] · [[Video Capture Requirements]] · [[Animation Direction]]
- [[Placeholder Asset Rules]] · [[Implementation Hub]] · [[Project Content Hub]]

---

## 1. Recommended Frontend Stack

| Concern | Recommendation | Why |
|---|---|---|
| Build tool | **Vite** | Fast dev server, simple static build, first-class TS/React. Set in PRD. |
| Framework | **React 18** | Component model fits the data-driven project system. Set in PRD. |
| Language | **TypeScript (strict)** | Type-safe project schema is a PRD requirement. |
| Routing | **React Router v6 (`BrowserRouter`)** + `public/404.html` SPA fallback | Clean URLs (`/projects/arcade-machine`) read better for recruiters than hash URLs. |
| Styling | **CSS Modules + CSS custom properties (design tokens)** | Zero extra runtime deps, scoped styles, easy theming. *Tailwind is a viable alternative — pending James* → [[UI Style Guide]]. |
| Styling | **Global CSS + CSS custom properties (design tokens)** — *as currently built* (`styles/globals.css` + `tokens.css`) | Already in place; CSS Modules/Tailwind optional later → [[UI Style Guide]]. |
| Animation | **Framer Motion / Motion** for scroll reveals + UI; CSS transitions for micro-interactions | Scroll-triggered reveals, parallax, card motion; respect `prefers-reduced-motion` → [[Animation Direction]]. |
| **3D engine** | **React Three Fiber + Three.js + Drei** (isolated, lazy-loaded) | Declarative R3F fits React; Drei gives helpers (loaders, controls, env). Code-split so it never blocks first paint → [[Immersive 3D Direction]]. |
| **3D assets** | **GLB/glTF** + Draco/meshopt; **KTX2** textures | Smallest web-safe 3D; lazy + gated → [[3D Asset Requirements]]. |
| **Scroll** | Framer Motion `useScroll`/`useTransform` driving a fixed background canvas; Drei `ScrollControls` only where canvas-locked scroll is truly needed | **No scroll hijacking** — read scroll, don't trap it → [[Animation Direction]]. |
| Icons | **Inline SVG** (or `lucide-react` if many icons needed) | Avoid icon-font weight. |
| Linting/format | **ESLint + Prettier** | Consistency, clean diffs. |
| Deployment | **GitHub Actions → GitHub Pages** | Build-on-push, no manual branch juggling → [[GitHub Pages Deployment]]. |

**Already installed (base site):** `react`, `react-dom`, `react-router-dom`, `typescript`, `vite`,
`@vitejs/plugin-react`.

**To add for the 3D phases** (await James approval before installing — see phase plan §8/§9):
- Core 3D: `three`, `@react-three/fiber`, `@react-three/drei`.
- Animation: `framer-motion` (a.k.a. `motion`).
- Optional/as-needed: `@react-three/postprocessing` (bloom/cinematic — desktop only), `maath`
  (easing/particle helpers), `@studio-freight/lenis` (smooth scroll, reduced-motion aware).
- Dev-only: `@react-three/drei`'s perf helpers / `r3f-perf`, `leva` (scene tuning) — not shipped.
- Asset pipeline (CLI, not runtime deps): `@gltf-transform/cli` / `gltfpack` for GLB optimization.

> Keep the 3D bundle **code-split**: the base portfolio must ship and paint before the 3D chunk loads.

> **Decisions still needed from James:** motion intensity (restrained ↔ flashy), which projects get
> real 3D models vs. video, repo name + custom-domain choice. None of these block the cinematic
> redesign (Phase 2) starting on the existing site.

---

## 2. Folder Structure

Builds on [[Folder Structure Plan]]. Target after scaffold:

```text
JamesSeymourDev - Portfolio/
  .github/
    workflows/
      deploy.yml          # GitHub Actions: build + deploy to Pages
  public/
    404.html              # SPA fallback (redirects to index.html)
    CNAME                 # only if a custom domain is used
    favicon.svg
    media/                # NEW: short looping MP4s + posters (referenced as "/media/<slug>.mp4")
    models/               # NEW: web-ready GLBs (referenced as "/models/<slug>.glb")
  src/
    components/
      layout/             # Layout, Header, Footer            [exists]
      home/               # Hero, About, ProjectsGrid, ContactSection [exists]
      sections/           # NEW: section wrappers for the immersive homepage
                          #   HeroSection, AboutSection, ProjectsSection,
                          #   ContactSection, ImmersiveShowcaseSection
      projects/           # ProjectCard, ProjectFilter, ProjectCaseStudy, CoverMedia [exists]
                          #   + ProjectGrid, ProjectShowcasePanel (new)
      three/              # NEW — ALL React Three Fiber code lives here, lazy-loaded:
                          #   HeroCanvas, ScrollScene, CameraRig, SceneLights,
                          #   FloatingProjectCards, ProjectModel, VideoScreen,
                          #   Particles, EnvironmentStage, WebGLGate, Canvas3DFallback
      ui/                 # Button, Tag/Badge, Section, Icon  [exists]
    data/
      projects.ts         # Typed source of truth for all projects [exists]
      profile.ts          # Name, tagline, bio, skills, contact links [exists]
    pages/
      Home.tsx            # [exists]
      ProjectsPage.tsx    # full gallery [exists]
      ProjectPage.tsx     # /projects/:slug case study [exists]
      NotFound.tsx        # [exists]
    hooks/                # usePrefersReducedMotion [exists]; + useHasWebGL, useScrollProgress (new)
    lib/                  # getProjectBySlug etc. [exists]; placeholder.ts [exists]; + webgl.ts (new)
    styles/
      globals.css         # [exists]
      tokens.css          # CSS variables: colors, spacing, type scale [exists]
    assets/               # imported images/video/icons (or use /public)
    types/
      project.ts          # shared Project types [exists] — extend additively for immersive
    App.tsx
    main.tsx
  index.html
  vite.config.ts
  tsconfig.json
  package.json
```

> The `[exists]` folders/files are already built and type-check clean. The immersive work **adds**
> `components/three/`, `components/sections/`, `public/media/`, `public/models/` and a few hooks/lib
> helpers — it does not delete or rewrite the working base. Preserve existing files.

---

## 3. Component List

Derived from [[Component Plan]], grouped by folder.

### Layout (`components/layout/`)
- `Layout` — page shell (header + `<main>` + footer, handles container width).
- `Header` / `NavBar` — site nav, responsive menu, scroll-to-section links.
- `Footer` — contact links, copyright.

### Home sections (`components/home/`)
- `Hero` — name, tagline, primary CTA.
- `About` — bio + tools/skills.
- `SkillsList` — categorized skill chips.
- `ProjectsGrid` — featured/filterable grid of `ProjectCard`s.
- `ContactSection` — email, links, CV download.

### Project system (`components/projects/`)
- `ProjectCard` — thumbnail, name, category, tech tags; links to case study.
- `ProjectFilter` — filter by category (C++ / C# / Level Design) and optionally tech.
- `ProjectCaseStudy` — renders case-study sections from data.
- `MediaGallery` / `Lightbox` — screenshots/video viewer.

### Shared UI (`components/ui/`)
- `Button`, `Tag`/`Badge`, `Section` wrapper, `Icon`.

### Immersive sections (`components/sections/`) — NEW
- Thin wrappers that compose the cinematic homepage and own scroll-reveal animation:
  `HeroSection`, `AboutSection`, `ProjectsSection`, `ContactSection`, `ImmersiveShowcaseSection`.
- These are **normal DOM/React** (Framer Motion). They may *host* a 3D canvas but contain no
  Three.js themselves.

### 3D layer (`components/three/`) — NEW, isolated & lazy-loaded
- `HeroCanvas` — the single background `<Canvas>` (abstract hero scene).
- `ScrollScene` / `CameraRig` — scroll-progress-driven camera easing/parallax (no hijacking).
- `SceneLights` / `EnvironmentStage` — cinematic lighting + environment/fog.
- `FloatingProjectCards` — glassy in-3D panels driven by `projects.ts`.
- `ProjectModel` — lazy GLB loader with an abstract procedural **fallback** when no model exists.
- `VideoScreen` — maps a project MP4 as a `VideoTexture` onto an in-scene screen (poster fallback).
- `Particles` — lightweight drifting particles (capped, mobile-reduced).
- `WebGLGate` / `Canvas3DFallback` — capability gate + error boundary + 2D fallback wrapper.

**Conventions:** typed props; data flows from `data/projects.ts`; **no hard-coded project content in
components.** Critically: **no Three.js import outside `components/three/`**, and the whole `three/`
tree is reached only through a lazy boundary so it never blocks first paint → see §8.

---

## 4. Data Model for Projects

This is the heart of the site — see [[Data Driven Project System]]. Adding a project = adding
one entry to `src/data/projects.ts`. Pages/components render from it.

```ts
// src/data/projects.ts
export type ProjectCategory = "C++" | "C#" | "Level Design";

export interface ProjectMedia {
  type: "image" | "video" | "gif";
  src: string;          // path under src/assets or a hosted URL
  alt?: string;         // required for images (accessibility)
  poster?: string;      // optional poster for video
}

export interface ProjectLinks {
  github?: string;
  demo?: string;
  video?: string;
  download?: string;
}

export interface ProjectCaseStudy {
  overview?: string;
  role?: string;
  keyFeatures?: string[];
  technicalChallenges?: string;
  designDecisions?: string;
  finalResult?: string;
}

export interface Project {
  slug: string;             // url-safe id, e.g. "arcade-machine"
  name: string;             // public-facing name
  category: ProjectCategory;
  shortDescription: string;
  technologies: string[];
  featured?: boolean;       // surfaced on the home grid
  status?: "complete" | "in-progress" | "placeholder";
  thumbnail?: string;       // card image
  media?: ProjectMedia[];
  links?: ProjectLinks;
  caseStudy?: ProjectCaseStudy;
}

export const projects: Project[] = [
  // 8 placeholder entries seeded in Milestone 3, content filled in Milestone 5
];
```

**Slug convention:** lowercase, hyphenated, derived from the project name
(`Arcade Machine` → `arcade-machine`). Slugs are stable URLs — don't change them later.

**Initial 8 entries** (one per content note → [[Project Content Hub]]):
`arcade-machine`, `surfers-quest`, `bomberman-style-game` (⚠ pick an original public name —
no trademark/art), `eos-dedicated-server`, `basilisk-engine`, `cursor-zip`, `zombies-vr`,
`hammer-moonbase-map`.

**Helpers (`lib/`):** `getProjectBySlug(slug)`, `getFeaturedProjects()`, `getByCategory(cat)`.

A separate `src/data/profile.ts` holds site-wide content (name, tagline, bio, skills, contact
links, CV path) so copy isn't hard-coded in components.

> **Note:** the snippet above is the *original* schema. The **canonical, current + target schema**
> (with `media.model3d`, the `immersive` showcase block, and the model→video→image→placeholder
> fallback chain) now lives in [[Data Driven Project System]]. Extend `src/types/project.ts`
> **additively** during the 3D Project Showcase phase — don't break existing fields/slugs.

---

## 5. Routing Strategy

From [[Routing Plan]]. **Recommendation: `BrowserRouter` + `404.html` SPA fallback.**

| Route | Page | Purpose |
|---|---|---|
| `/` | `Home` | Hero, About, featured projects, contact. |
| `/projects` | `ProjectsPage` | Full filterable gallery (optional — confirm need). |
| `/projects/:slug` | `ProjectPage` | Case study, `getProjectBySlug(slug)`; 404 if not found. |
| `*` | `NotFound` | Catch-all. |

**GitHub Pages caveat:** Pages has no server rewrites, so a deep-link refresh on
`/projects/:slug` 404s. Fix with a `public/404.html` that redirects to `index.html` (standard
SPA-on-Pages trick). If `base` is a subpath (project site), the router `basename` and the
404 redirect must account for it.

**Fallback option:** `HashRouter` (`/#/projects/arcade-machine`) needs no 404.html but has
uglier URLs. Use only if the 404 redirect proves troublesome.

---

## 6. Placeholder Media Strategy

Follows [[Placeholder Asset Rules]] — the site must never ship broken/missing media.

- **Never reference a missing file.** Commit a real placeholder asset for every slot.
- **Use neutral, non-copyrighted placeholders.** Especially for the Bomberman-style project —
  no Super Bomberman art. Prefer generated/solid-color images with the project name.
- **Keep target aspect ratios** (cards 16:9, case-study hero ~16:9) so layout doesn't shift
  when real media arrives.
- **Single swap point:** real assets replace placeholders at the **same path** in
  `src/assets/`; track every swap in [[Missing Content Checklist]].
- **Implementation aids:**
  - A `placeholderImage(label)` helper or a committed `assets/images/placeholder-16x9.svg`.
  - Each `Project.status: "placeholder"` can drive a subtle "content coming soon" badge.
  - Video slots show a poster + label until a real clip/embed is supplied → [[Video Requirements]].

---

## 7. GitHub Pages Deployment Strategy

From [[GitHub Pages Deployment]]. **Recommendation: GitHub Actions building to Pages.**

1. **Vite `base`** depends on repo type (James to confirm):
   - User/org site (`username.github.io`) → `base: "/"`.
   - Project site (`username.github.io/<repo>`) → `base: "/<repo>/"`.
   - Custom domain → `base: "/"` + `public/CNAME` → [[Custom Domain Notes]].
2. **Workflow** `.github/workflows/deploy.yml`: on push to `main` → install → `vite build` →
   upload `dist/` artifact → deploy via `actions/deploy-pages`.
3. **SPA fallback:** ensure `public/404.html` is produced in `dist/` (see §5).
4. **Repo settings:** Pages source = "GitHub Actions"; enable "Enforce HTTPS".
5. **Verify:** home loads, deep-link refresh works, assets resolve under the correct `base`.

Full pre-flight in [[Build And Deploy Checklist]].

> **James input needed:** repo name, user-vs-project site, custom domain. These block the
> *final* deploy config but **not** local development — scaffold with `base: "/"` and adjust.

---

## 8. 3D / Immersive Architecture (the core of the new direction)

The whole 3D layer is **bolt-on, isolated, lazy, gated, and fault-tolerant.** → [[Immersive 3D Direction]].

**8.1 Isolation + lazy boundary.** No Three.js import lives outside `components/three/`. The base
portfolio renders without it. A section mounts 3D only via a lazy boundary so the (large) 3D chunk
loads *after* first paint:

```tsx
// in a section component (DOM land) — note: no three import here
const HeroCanvas = React.lazy(() => import("../three/HeroCanvas"));

function HeroSection() {
  const show3D = useShould3D(); // WebGL && !reducedMotion && !lowPower (see 8.2)
  return (
    <section className="hero">
      {/* readable DOM content ALWAYS renders */}
      <HeroCopy />
      {show3D && (
        <Canvas3DBoundary fallback={<HeroStaticBackdrop />}>
          <Suspense fallback={null}>
            <HeroCanvas /> {/* the only path that pulls in three/fiber/drei */}
          </Suspense>
        </Canvas3DBoundary>
      )}
    </section>
  );
}
```

**8.2 Capability gate (`useShould3D` / `WebGLGate`).** Mount 3D only when **all** are true:
WebGL is available (`lib/webgl.ts` feature-detect), the user does **not** prefer reduced motion
(`usePrefersReducedMotion`, already in code), and the device isn't low-power/small-mobile
(coarse heuristic: small viewport + `navigator.hardwareConcurrency`/`deviceMemory`). Otherwise render
the static backdrop. Mobile may use a *reduced* scene rather than none — decide per section.

**8.3 Error boundary (`Canvas3DBoundary` / `Canvas3DFallback`).** A class error boundary wraps every
Canvas. A WebGL context loss or runtime error renders the 2D fallback instead of a white screen.

**8.4 Scene + scroll pattern (no hijacking).** Prefer **one** `<Canvas>` as a fixed/sticky background
behind the scrolling DOM. Drive the camera/objects from **scroll progress** via Framer Motion
`useScroll` + `useTransform`, **lerped** for cinematic easing (never 1:1 snapping). Use Drei
`ScrollControls` only inside a section that genuinely needs canvas-locked scroll. Native scroll always
stays in control → [[Animation Direction]].

**8.5 Performance controls.** `dpr={[1, 2]}` clamp; `frameloop="demand"` where motion is intermittent;
cap particle counts; dispose geometries/textures on unmount; pause off-screen `VideoScreen`s; **lazy
load every model/video on viewport** (never all at once); skip postprocessing on mobile. Budgets:
GLB ≤ 1–3 MB, video loops short/compressed → [[3D Asset Requirements]] · [[Video Capture Requirements]].

**8.6 Data-driven showcase.** `ProjectModel`/`VideoScreen`/`FloatingProjectCards` read each project's
`immersive` settings and resolve the **model → video → image → placeholder** fallback chain. Nothing
hard-codes a project; nothing 404s → [[Data Driven Project System]] · [[Placeholder Asset Rules]].

---

## 9. Phased Implementation Plan

> **Original Milestones 1–3 are effectively DONE** ([[Milestone 1 - Project Setup]],
> [[Milestone 2 - Core Layout]], [[Milestone 3 - Project System]]) — the scaffolded base exists and
> type-checks. Old [[Milestone 4 - Visual Polish]] / [[Milestone 5 - Content Pass]] /
> [[Milestone 6 - Final QA]] are **absorbed and expanded** by the phases below.

Each phase ships **with its fallback** before the next starts. → [[Implementation Hub]].

- **Phase 0 — Planning Update *(this pass)*.** PRD + vault updated to the 3D direction; visual /
  technical / asset direction defined; checkpoint created. **Done:** docs reflect the new mission.
- **Phase 1 — Stabilize Current Site.** Confirm `npm run dev` + `npm run build` run; sections work;
  routing/build/Pages config sound; project data centralized. *(Largely already true.)* **No 3D yet.**
  **Done:** clean, deployable baseline confirmed.
- **Phase 2 — Premium Visual Redesign.** Cinematic dark restyle: typography, spacing, glass panels,
  gradient glows, premium hover/focus, responsiveness; add **Framer Motion** scroll reveals + card
  motion (reduced-motion safe). **Still no complex 3D.** **Done:** site feels expensive, not template-y.
- **Phase 3 — Lightweight 3D Hero.** Add `three`/`@react-three/fiber`/`@react-three/drei`; build
  `HeroCanvas` (abstract particles/fragments), subtle camera parallax + mouse-follow, the capability
  gate + fallback (§8). Isolated from the rest of the page. **Done:** hero has safe, lazy 3D.
- **Phase 4 — 3D Project Showcase Layer.** `FloatingProjectCards`, `VideoScreen`, optional
  `ProjectModel` GLB loading; **Arcade Machine** model showcase if provided. All driven by
  `projects.ts`. **Done:** featured projects appear in 3D with fallbacks.
- **Phase 5 — Scroll-Based Immersive Journey.** Stitch featured projects into a continuous,
  cinematic, scroll-driven camera path. Sections stay readable/accessible. Normal scroll only.
  **Done:** a cohesive immersive scroll story.
- **Phase 6 — Real Content Pass.** Real videos/screenshots/GLBs + final descriptions; CV, GitHub,
  LinkedIn, email; remove/polish placeholders → [[Project Content Hub]] / [[CV And Contact Assets]].
  **Done:** no placeholders remain.
- **Phase 7 — Optimization & Deployment.** Compress video, optimize models, lazy-load audit, mobile +
  reduced-motion + WebGL-off testing, GitHub Pages deploy, Lighthouse, final QA →
  [[Build And Deploy Checklist]]. **Done:** green scores, live on Pages, graceful everywhere.

---

## 10. What To Build First (now that the base exists)

The skeleton is already built. The smallest valuable, reviewable next slice = **Phase 1 verify +
Phase 2 cinematic redesign** — **no new dependencies, no 3D yet.** Concretely:

1. **Phase 1 — confirm the baseline.** Run `npm run dev`, `npm run build`, `npm run typecheck`; click
   through home, `/projects`, a `/projects/:slug`, and a 404. Confirm responsiveness + reduced-motion.
   Fix anything broken. **Do not add features here.**
2. **Phase 2 — cinematic dark restyle (DOM/CSS only).** Elevate `tokens.css` (richer dark palette,
   neon accents, glass surfaces, glow shadows), typography scale, spacing, section rhythm; premium
   hover/focus states; polish `ProjectCard`/grid/hero. Keep it responsive and accessible.
3. **Phase 2 — motion.** Add `framer-motion` (**first new dep — get James's OK**) for scroll-reveal of
   sections + card entrance/hover, gated on `usePrefersReducedMotion`. No 3D, no scroll hijacking.
4. Verify build + typecheck stay green; commit. **This is the first deliverable.**

**Explicitly NOT in this first slice:** React Three Fiber / any WebGL (Phase 3+), GLB loading,
real content (Phase 6), and final domain/deploy config that depends on James's choices.

> First deliverable definition of done: the existing site, restyled into a cinematic dark portfolio
> with tasteful scroll/card motion — still type-checked, deployable, and 3D-free.

---

## Open Decisions (do not block Phase 1/2)
- [ ] Motion intensity: restrained ↔ flashy → [[Animation Direction]].
- [ ] Styling: stay on global CSS + tokens (current) vs introduce CSS Modules/Tailwind → [[UI Style Guide]].
- [ ] Which projects get a real **3D model** vs. **video-only** → [[3D Asset Requirements]].
- [ ] Repo name + user/project site + custom domain → [[GitHub Pages Deployment]].
- [ ] Final project names (esp. Bomberman) + content/media → [[Missing Content Checklist]].
- [ ] Smooth-scroll (Lenis) yes/no, and whether mobile gets a reduced 3D scene or static fallback.
