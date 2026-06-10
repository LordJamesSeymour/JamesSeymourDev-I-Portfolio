// Reusable, type-safe project model.
// This is the contract every project entry in src/data/projects.ts must satisfy.
// See ObsidianVault/02_Website_Architecture/Data Driven Project System.md

export type ProjectCategory = "C++" | "C#" | "Level Design";

/** Lifecycle of a project's content (drives placeholder badges, etc.). */
export type ProjectStatus = "complete" | "in-progress" | "placeholder";

export interface ProjectMedia {
  type: "image" | "video" | "gif";
  /** Path under src/assets, a /public path, or a hosted URL. */
  src: string;
  /** Required for images for accessibility; describe the content. */
  alt?: string;
  /** Optional poster image for video. */
  poster?: string;
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
  /** URL-safe id, e.g. "arcade-machine". Stable — do not change once published. */
  slug: string;
  /** Public-facing name. */
  name: string;
  category: ProjectCategory;
  shortDescription: string;
  technologies: string[];
  /** Surfaced on the home page grid when true. */
  featured?: boolean;
  status?: ProjectStatus;
  /** Card image. If omitted, a generated placeholder is used. */
  thumbnail?: string;
  media?: ProjectMedia[];
  links?: ProjectLinks;
  caseStudy?: ProjectCaseStudy;
}

export const PROJECT_CATEGORIES: ProjectCategory[] = ["C++", "C#", "Level Design"];
