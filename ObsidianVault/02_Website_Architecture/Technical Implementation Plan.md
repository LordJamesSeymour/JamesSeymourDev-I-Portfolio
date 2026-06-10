# Technical Implementation Plan

> **Status:** In Progress (planning only — no code yet)
> **Last updated:** 2026-06-10
> Consolidated, decision-making build plan for the James Seymour portfolio website.
> Source of truth: `docs/PRD.md`. This note turns the PRD + architecture notes into concrete,
> actionable recommendations for whoever (Claude / Codex / James) builds the site.
>
> ⚠️ **This is a planning pass. Do not implement the website yet. Do not install packages
> until James approves** → [[Milestone 1 - Project Setup]].

## Related Notes
- [[Website Architecture Overview]] · [[Data Driven Project System]] · [[Routing Plan]]
- [[Component Plan]] · [[Folder Structure Plan]] · [[GitHub Pages Deployment]]
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
| Animation | **CSS transitions first**; add **Framer Motion** only if richer motion is needed | Keep the bundle light; respect `prefers-reduced-motion` → [[Animation Direction]]. |
| Icons | **Inline SVG** (or `lucide-react` if many icons needed) | Avoid icon-font weight. |
| Linting/format | **ESLint + Prettier** (Vite React-TS template includes ESLint) | Consistency, clean diffs. |
| Deployment | **GitHub Actions → GitHub Pages** | Build-on-push, no manual branch juggling → [[GitHub Pages Deployment]]. |

**Dependencies to add at scaffold time** (await James approval before installing):
`react`, `react-dom`, `react-router-dom`, `typescript`, `vite`, `@vitejs/plugin-react`, ESLint set.
Everything else (Framer Motion, icon libs) is optional and added only if needed.

> **Decisions still needed from James:** styling approach (CSS Modules vs Tailwind), how
> animated the site should feel, repo name + custom-domain choice. These do **not** block
> starting Milestone 1 with the recommended defaults.

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
  src/
    components/
      layout/             # Layout, Header, Footer
      home/               # Hero, About, SkillsList, ContactSection
      projects/           # ProjectCard, ProjectFilter, ProjectCaseStudy, MediaGallery
      ui/                 # Button, Tag/Badge, Section, Icon
    data/
      projects.ts         # Typed source of truth for all projects
      profile.ts          # Name, tagline, bio, skills, contact links
    pages/
      Home.tsx
      ProjectsPage.tsx    # optional full gallery
      ProjectPage.tsx     # /projects/:slug case study
      NotFound.tsx
    hooks/                # e.g. useProjectFilter
    lib/                  # helpers: getProjectBySlug, formatting
    styles/
      globals.css
      tokens.css          # CSS variables: colors, spacing, type scale
    assets/
      images/
      video/
      icons/
    types/
      project.ts          # shared Project types (or co-locate in data/projects.ts)
    App.tsx
    main.tsx
  index.html
  vite.config.ts
  tsconfig.json
  package.json
```

> `src/` placeholder folders already exist with `.gitkeep`. Scaffolding fills them; don't
> delete existing files.

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

**Conventions:** typed props; data flows from `data/projects.ts`; one folder per component
that owns styles. No hard-coded project content inside components.

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

## 8. Milestone-by-Milestone Implementation Plan

Maps to [[Implementation Hub]]. Each milestone has a clear "done" bar.

### Milestone 1 — Project Setup → [[Milestone 1 - Project Setup]]
- Confirm package install with James, then scaffold Vite + React + TS (strict).
- Add folder structure (§2), router shell (`BrowserRouter`), styling base (`tokens.css`).
- Stub `data/projects.ts` + `data/profile.ts` types.
- Add `.github/workflows/deploy.yml` and `public/404.html`.
- **Done:** dev server runs, `vite build` succeeds, deploys a "hello" page to Pages.

### Milestone 2 — Core Layout → [[Milestone 2 - Core Layout]]
- Build `Layout`/`Header`/`Footer`, then `Hero`, `About`, `ProjectsGrid` (placeholder cards),
  `ContactSection`. Responsive across breakpoints → [[Responsive Design Notes]].
- **Done:** all home sections render and are responsive; nav works.

### Milestone 3 — Project System → [[Milestone 3 - Project System]]
- Finalize the `Project` schema; seed all **8 placeholder entries**.
- `ProjectCard` + grid render from data; `ProjectFilter` by category.
- `/projects/:slug` case-study page via `getProjectBySlug`.
- **Done:** adding a project = one data entry; all 8 have a working case-study page.

### Milestone 4 — Visual Polish → [[Milestone 4 - Visual Polish]]
- Apply palette/typography tokens, hover/focus states, subtle motion (reduced-motion safe).
- **Done:** site feels modern/intentional, not template-y.

### Milestone 5 — Content Pass → [[Milestone 5 - Content Pass]]  *(needs James input)*
- Replace placeholder text/media with real content from [[Project Content Hub]]; add real
  links; fill `profile.ts` (bio, CV, contact) → [[CV And Contact Assets]].
- **Done:** no placeholders remain; everything real.

### Milestone 6 — Final QA → [[Milestone 6 - Final QA]]
- Accessibility + Lighthouse (Perf/A11y/Best Practices green), cross-browser/device, link
  check, final deploy → [[Build And Deploy Checklist]].
- **Done:** green scores, live on Pages, no console errors.

---

## 9. What Codex Should Build First

The smallest valuable, reviewable first slice = **Milestone 1 only** (the skeleton). Concretely:

1. **Wait for James to approve package installs.** Do not install before that.
2. Scaffold **Vite + React + TypeScript (strict)** at the project root, preserving existing
   files (`README.md`, vault, `.gitkeep`s) — do not overwrite.
3. Create the folder structure from §2 (fill the existing placeholder `src/` folders).
4. Add **typed data stubs**: `src/types/project.ts` (or in `data/projects.ts`), an empty-ish
   `data/projects.ts` exporting `projects: Project[]`, and `data/profile.ts` with placeholder
   profile fields.
5. Set up **routing shell**: `BrowserRouter`, routes for `/`, `/projects/:slug`, `*`
   (pages can be near-empty placeholders).
6. Add **styling base**: `styles/globals.css` + `styles/tokens.css` with neutral placeholder
   tokens (real palette comes later → [[UI Style Guide]]).
7. Add **deployment plumbing**: `.github/workflows/deploy.yml` and `public/404.html`; set Vite
   `base: "/"` for now (adjust once repo/domain is decided).
8. Verify `npm run dev` and `npm run build` both succeed; commit.

**Explicitly NOT in the first build:** real project content, visual polish/animation, the
optional `/projects` gallery, and any final deploy config that depends on James's repo/domain
choices. Those are Milestones 3–6.

> First deliverable definition of done: a running, type-checked, deployable skeleton with the
> data-driven structure in place but no real content — ready for Milestone 2.

---

## Open Decisions Blocking *Completion* (not the first build)
- [ ] Styling: CSS Modules (recommended) vs Tailwind → [[UI Style Guide]].
- [ ] Repo name + user/project site + custom domain → [[GitHub Pages Deployment]].
- [ ] Final project names (esp. Bomberman) + content/media → [[Missing Content Checklist]].
- [ ] Is the standalone `/projects` gallery wanted, or is the home grid enough?
