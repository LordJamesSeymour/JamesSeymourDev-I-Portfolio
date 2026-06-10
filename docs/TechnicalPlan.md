# Technical Plan

> **Status:** In Progress
> Mirrors `ObsidianVault/02_Website_Architecture/`. The website is **data-driven**.

## Stack

- **Build tool:** Vite
- **Framework:** React
- **Language:** TypeScript
- **Styling:** TBD (CSS Modules / Tailwind / styled approach — James to confirm)
- **Hosting:** GitHub Pages (static build)

## Target Folder Structure

```text
src/
  components/   # Reusable UI (Header, Footer, ProjectCard, ...)
  data/
    projects.ts # Single source of truth for project content
  pages/        # Route-level views (Home, Project detail, ...)
  styles/       # Global styles / tokens
  assets/       # Images, video, icons
```

## Data-Driven Project System

Projects are defined as typed data, not hard-coded into pages. Adding a project = adding an
entry to `src/data/projects.ts`. Pages and components render from that data.

Proposed schema (illustrative — finalize during Milestone 3):

```ts
export type ProjectCategory = "C++" | "C#" | "Level Design";

export interface Project {
  slug: string;            // url-safe id, e.g. "arcade-machine"
  name: string;            // public-facing name
  category: ProjectCategory;
  shortDescription: string;
  technologies: string[];
  thumbnail?: string;
  media?: { type: "image" | "video" | "gif"; src: string; alt?: string }[];
  links?: { github?: string; demo?: string; video?: string; download?: string };
  caseStudy?: {
    overview?: string;
    role?: string;
    keyFeatures?: string[];
    technicalChallenges?: string;
    designDecisions?: string;
    finalResult?: string;
  };
}
```

## Routing

- `/` — Home (hero, about, projects grid, contact)
- `/projects/:slug` — Project case study
- (Optional) `/projects` — full filterable gallery

> GitHub Pages note: SPA routing needs a hash router or a 404.html fallback. See `DeploymentNotes.md`.

## Build & Deploy

- `vite build` → `dist/`
- Deploy `dist/` to GitHub Pages (Actions workflow or `gh-pages` branch).
- Set correct `base` in `vite.config.ts` for the repo/subpath.
