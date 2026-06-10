# Data Driven Project System

> **Status:** In Progress — extending for the immersive 3D direction (2026-06-10)
> The website renders projects from typed data — **not** hand-built pages. The immersive layer adds
> optional per-project **3D / video showcase** settings to the same data. → [[Immersive 3D Direction]].

## Why
- Adding a project = adding one entry to `src/data/projects.ts`.
- Cards, gallery, case-study pages **and the 3D scene** all render from the same data.
- 3D logic never hard-codes a project — it reads `immersive` settings from data and falls back safely.

## Current Schema (already in code)
`src/types/project.ts` today defines: `slug`, `name`, `category`, `shortDescription`,
`technologies`, `featured?`, `status?` (`"complete" | "in-progress" | "placeholder"`),
`cover?` (looping video / gif / image), `media?: ProjectMedia[]`, `links?`, `caseStudy?`
(overview, role, keyFeatures, technicalChallenges, designDecisions, finalResult). Helpers live in
`src/lib/projects.ts`. This works and type-checks — **the extension below is additive, not a rewrite.**

## Target Schema (additive evolution — keep backward-compatible)
```ts
// src/types/project.ts
export type ProjectCategory = "C++" | "C#" | "Level Design" | "Other";
export type ProjectStatus = "complete" | "in-progress" | "prototype" | "placeholder";

export interface ProjectMedia {
  type: "image" | "video" | "gif";
  src: string;            // mp4 / webm / gif / image (under /public or src/assets, or a URL)
  alt?: string;
  poster?: string;        // shown before a video loads + for reduced-motion users
}
export type ProjectCover = ProjectMedia; // card + hero cover (placeholder if omitted)

// NEW: bundles all media for a project, including an optional 3D model.
export interface ProjectMediaSet {
  thumbnail?: string;
  gallery?: string[];
  video?: string;
  poster?: string;
  model3d?: string;       // path to a GLB, e.g. "/models/arcade-machine.glb" (optional)
}

// NEW: how a project appears in the 3D scene. All optional; safe defaults if absent.
export interface ProjectImmersive {
  enabled: boolean;
  showcaseType: "model" | "video-screen" | "floating-card" | "environment" | "placeholder";
  preferredSection?: "hero" | "featured" | "project-detail";
  cameraFocus?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}

export interface ProjectLinks { github?: string; demo?: string; video?: string; download?: string; }

export interface ProjectCaseStudy {
  overview?: string; role?: string; keyFeatures?: string[];
  technicalChallenges?: string; designDecisions?: string; finalResult?: string;
}

export interface Project {
  slug: string;                 // stable url id, e.g. "arcade-machine" (don't change once published)
  name: string;
  category: ProjectCategory;
  shortDescription: string;
  longDescription?: string;     // NEW: optional richer copy for detail/immersive panels
  technologies: string[];
  role?: string[];              // NEW (or keep inside caseStudy.role)
  features?: string[];          // NEW (or keep inside caseStudy.keyFeatures)
  challenges?: string[];        // NEW (or keep inside caseStudy.technicalChallenges)
  featured?: boolean;
  status?: ProjectStatus;
  cover?: ProjectCover;         // existing
  media?: ProjectMediaSet;      // EVOLVED: object form adding model3d (was ProjectMedia[])
  immersive?: ProjectImmersive; // NEW: 3D showcase settings
  links?: ProjectLinks;
  caseStudy?: ProjectCaseStudy;
  needsJamesInput?: string[];   // NEW: machine-readable "still needed" flags
}

export const projects: Project[] = [ /* one entry per project */ ];
```

> **Migration guidance (when implemented, not now):** evolve `src/types/project.ts` additively. If
> `media` changes from `ProjectMedia[]` to an object, update the few call sites (`CoverMedia`, gallery)
> in the same pass and keep `cover` as-is. Don't rename `slug`/`name`/`category` — they're load-bearing.
> Prefer **adding** optional fields over breaking existing ones. This is implementation work for a
> later phase; the schema here is the target, not a request to change code now.

## Showcase Fallback Chain (the safety rule)
The 3D scene must never depend on an asset existing. For each project resolve in order:
**`media.model3d` (GLB) → `media.video` / `cover` video (video-screen) → `cover`/`thumbnail` image
(floating-card) → generated SVG placeholder.** `immersive.showcaseType: "placeholder"` forces the
abstract procedural stand-in. Nothing 404s → [[Placeholder Asset Rules]] · [[3D Asset Requirements]].

## Per-Project Immersive Intent (initial)
| Project | showcaseType | Asset |
|---|---|---|
| [[Arcade Machine]] | `model` | `arcade-machine.glb` + marquee video screen (flagship) |
| [[Basilisk Engine]] | `model` / `environment` | viewport/wireframe prop or editor panel |
| [[Zombies VR]] | `model` / `video-screen` | headset model or in-headset clip |
| [[EOS Dedicated Server]] | `environment` | procedural network/server visual (no GLB needed) |
| [[Hammer Moonbase Map]] | `environment` / `video-screen` | flythrough clip or low-poly layout |
| [[Surfers Quest]] | `video-screen` | gameplay loop |
| [[Bomberman Style Game]] | `video-screen` | gameplay loop (⚠ original assets only) |
| [[Cursor Zip]] | `floating-card` / `video-screen` | UI capture |

## Mapping to Content Notes
Each entry corresponds to a note under `04_Project_Content/Projects/`:
- [[Arcade Machine]] · [[Surfers Quest]] · [[Bomberman Style Game]] · [[EOS Dedicated Server]]
- [[Basilisk Engine]] · [[Cursor Zip]] · [[Zombies VR]] · [[Hammer Moonbase Map]]

## TODO
- [ ] Decide final field placement (top-level `role/features/challenges` vs. inside `caseStudy`).
- [ ] Implement the additive schema change during the 3D Project Showcase phase (not before).
- [ ] Keep slugs stable; track asset swaps in [[Missing Content Checklist]].

## Related
- [[Website Architecture Overview]] · [[Component Plan]] · [[Project Content Hub]]
- [[Immersive 3D Direction]] · [[3D Asset Requirements]] · [[Video Capture Requirements]] · [[Technical Implementation Plan]]
