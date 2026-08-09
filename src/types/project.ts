// Reusable, type-safe project model.
// This is the contract every project entry in src/data/projects.ts must satisfy.
// See ObsidianVault/02_Website_Architecture/Data Driven Project System.md

export type ProjectCategory = "C++" | "C#" | "Level Design";

/** Public-facing project delivery status. */
export type ProjectStatus = "in-progress" | "completed";

export type MediaType = "image" | "video" | "gif";

export interface ProjectMedia {
  type: MediaType;
  /** Path under src/assets, a /public path, or a hosted URL (mp4/webm/gif/image). */
  src: string;
  /**
   * VIDEO only — ordered list of sources tried in order; the first that the browser
   * can load/decode wins, the rest are fallbacks. Prefer an optimized preview first,
   * then the heavy/raw local file, e.g.:
   *   sources: ["/media/project-preview.webm", "/media/project-preview.mp4"]
   * When omitted, `src` is used as the single source. This is how the data model
   * supports a future optimized preview path without code changes.
   */
  sources?: string[];
  /** Required for images for accessibility; describe the content. */
  alt?: string;
  /**
   * Poster image shown before a video loads, and used as the still fallback when
   * the visitor prefers reduced motion or every source fails. Recommended for video.
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
  /** Additional labelled external links, such as a studio or project website. */
  external?: Array<{
    label: string;
    url: string;
  }>;
}

export interface ProjectLogo {
  src: string;
  alt: string;
}

export interface ProjectVideoEmbed {
  youtubeId: string;
  externalUrl: string;
  title: string;
  heading: string;
}

export interface ProjectYouTubeCardPreview {
  youtubeId: string;
  startSeconds: number;
  endSeconds: number;
  poster: string;
  alt: string;
}

export type ProjectShowcasePlacement = "before-case-study" | "after-overview";

export interface ProjectCaseStudy {
  overview?: string;
  creativeProcess?: string;
  role?: string;
  /** "Key Contributions" — what the author personally built/owned. */
  contributions?: string;
  keyFeatures?: string[];
  /** "Technical Highlights" — standout systems/tech worth calling out. */
  technicalHighlights?: string;
  technicalChallenges?: string;
  designDecisions?: string;
  /** "Development Context" — team, timeframe, course/brief framing. */
  developmentContext?: string;
  finalResult?: string;
}

/** Drives content/asset planning + placeholder copy. */
export type ContentPriority = "high" | "medium" | "low";

/**
 * Optional per-project decorative background treatment for the detail page.
 * Additive and project-specific — absent means the standard page. Currently only
 * Cursor.zip opts in ("vaporwave"), which renders <CursorVaporwaveBackground/>
 * behind the case study. Add new values here when a project earns its own scene.
 */
export type ProjectVisualTheme = "vaporwave";

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

/** Kind of scroll-driven 3D treatment a model-backed project uses. */
export type RevealType = "scroll-reveal" | "exploded-view";

export interface ProjectImmersive {
  /** Picks how the project is represented in the 3D layer later. */
  showcaseType?: ShowcaseType;
  /** Optional path to a GLB/glTF model (lazy-loaded + capability-gated). */
  model?: string;
  /** Still image shown before a model/video loads and under reduced motion. */
  poster?: string;
  /**
   * When a `model` is set, how the dedicated showcase section animates it.
   * Drives <ArcadeMachineReveal/> (and future per-project reveal sections).
   */
  revealType?: RevealType;
}

export interface Project {
  /** URL-safe id, e.g. "arcade-machine". Stable — do not change once published. */
  slug: string;
  /** Public-facing name. */
  name: string;
  category: ProjectCategory;
  /** Optional decorative background treatment for the detail page (see ProjectVisualTheme). */
  theme?: ProjectVisualTheme;
  shortDescription: string;
  technologies: string[];
  /** Surfaced on the home "Featured Projects" grid when true. */
  featured?: boolean;
  /**
   * Order within the Featured grid (lower = earlier). The grid sorts featured
   * projects by this and shows the strongest FEATURED_LIMIT (6) — i.e. 2 rows of 3.
   * Projects without it sort after those that have it.
   */
  featuredPriority?: number;
  status: ProjectStatus;
  /**
   * Card + detail hero cover. Prefer a short looping muted video or a gif.
   * If omitted, a generated placeholder is used (no missing-file references).
   */
  cover?: ProjectCover;
  /** Optional muted, bounded YouTube fragment used only by the landing-page card. */
  youtubeCardPreview?: ProjectYouTubeCardPreview;
  media?: ProjectMedia[];
  /** Optional transparent project mark shown near the detail-page title. */
  logo?: ProjectLogo;
  /** Optional single hosted showcase video embedded on the project detail page. */
  showcaseVideo?: ProjectVideoEmbed;
  /**
   * Optional list of hosted showcase videos rendered as a switchable carousel
   * (<YouTubeCarousel/>) on the detail page — one frame at a time with dot
   * indicators. Use this instead of `showcaseVideo` when a project has 2+ clips.
   */
  showcaseVideos?: ProjectVideoEmbed[];
  /** Controls where a multi-video showcase sits relative to the case study. */
  showcaseVideosPlacement?: ProjectShowcasePlacement;
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
