# Data Driven Project System

> **Status:** In Progress
> The website should render projects from typed data — **not** hand-built pages.

## Why
- Adding a project = adding one entry to `src/data/projects.ts`.
- Cards, gallery, and case-study pages all render from the same data.
- Keeps content and presentation separated and scalable.

## Proposed Schema (illustrative)
```ts
// src/data/projects.ts
export type ProjectCategory = "C++" | "C#" | "Level Design";

export interface ProjectMedia {
  type: "image" | "video" | "gif";
  src: string;
  alt?: string;
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
  slug: string;            // e.g. "arcade-machine"
  name: string;            // public-facing name
  category: ProjectCategory;
  shortDescription: string;
  technologies: string[];
  featured?: boolean;
  thumbnail?: string;
  media?: ProjectMedia[];
  links?: ProjectLinks;
  caseStudy?: ProjectCaseStudy;
}

export const projects: Project[] = [
  // populated during Milestone 3 + Content Pass
];
```

## Mapping to Content Notes
Each entry corresponds to a note under `04_Project_Content/Projects/`:
- [[Arcade Machine]] · [[Surfers Quest]] · [[Bomberman Style Game]] · [[EOS Dedicated Server]]
- [[Basilisk Engine]] · [[Cursor Zip]] · [[Zombies VR]] · [[Hammer Moonbase Map]]

## TODO
- [ ] Finalize the schema during [[Milestone 3 - Project System]].
- [ ] Decide on slug naming convention.

## Related
- [[Website Architecture Overview]] · [[Component Plan]] · [[Project Content Hub]]
