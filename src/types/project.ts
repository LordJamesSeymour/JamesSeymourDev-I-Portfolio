// Reusable, type-safe project model.
// This is the contract every project entry in src/data/projects.ts must satisfy.
// See ObsidianVault/02_Website_Architecture/Data Driven Project System.md

export type ProjectCategory = "C++" | "C#" | "Level Design";

/** Lifecycle of a project's content (drives placeholder badges, etc.). */
export type ProjectStatus = "complete" | "in-progress" | "placeholder";

export type MediaType = "image" | "video" | "gif";

export interface ProjectMedia {
  type: MediaType;
  /** Path under src/assets, a /public path, or a hosted URL (mp4/webm/gif/image). */
  src: string;
  /** Required for images for accessibility; describe the content. */
  alt?: string;
  /**
   * Poster image shown before a video loads, and used as the still fallback when
   * the visitor prefers reduced motion. Recommended for every video/gif cover.
   */
  poster?: string;
}

/**
 * A project's cover / thumbnail. Can be a looping muted **video**, an animated **gif**,
 * or a static **image**. Rendered by <CoverMedia/>. If omitted, a generated placeholder
 * is shown — so a missing file is never referenced.
 */
export type ProjectCover = ProjectMedia;

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

/** Drives content/asset planning + placeholder copy. */
export type ContentPriority = "high" | "medium" | "low";

/**
 * How a project should appear in the FUTURE 3D/immersive layer (Phase 3+).
 * Stored now so the data model is ready; ignored by the current 2D site.
 * Fallback chain at render time: model → video → image → placeholder.
 */
export type ShowcaseType =
  | "model" // a real GLB/glTF model
  | "video-screen" // a clip mapped onto an in-scene screen
  | "floating-card" // a glassy 2D-in-3D panel
  | "environment" // a small scene / set piece
  | "placeholder"; // nothing yet — generated placeholder

export interface ProjectImmersive {
  /** Picks how the project is represented in the 3D layer later. */
  showcaseType?: ShowcaseType;
  /** Optional path to a GLB/glTF model (lazy-loaded + capability-gated later). */
  model?: string;
  /** Still image shown before a model/video loads and under reduced motion. */
  poster?: string;
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
  /**
   * Card + detail hero cover. Prefer a short looping muted video or a gif.
   * If omitted, a generated placeholder is used (no missing-file references).
   */
  cover?: ProjectCover;
  media?: ProjectMedia[];
  links?: ProjectLinks;
  caseStudy?: ProjectCaseStudy;

  // ---- Phase 2 additive asset fields (all optional; safe when absent) ----
  /** Explicit thumbnail path for grids/cards. Falls back to `cover`, then a placeholder. */
  thumbnail?: string;
  /** Screenshot gallery for the case study (separate from the looping `cover`). */
  screenshots?: ProjectMedia[];
  /** Future 3D/immersive settings (Phase 3+). Ignored by the 2D site today. */
  immersive?: ProjectImmersive;
  /**
   * Human-readable list of assets still needed (e.g. "cabinet photo", "gameplay clip").
   * Surfaced only in dev as a "James input needed" note; never shown publicly.
   */
  missingAssets?: string[];
  /** Content/asset priority for the upcoming Content Pass. */
  priority?: ContentPriority;
}

export const PROJECT_CATEGORIES: ProjectCategory[] = ["C++", "C#", "Level Design"];
