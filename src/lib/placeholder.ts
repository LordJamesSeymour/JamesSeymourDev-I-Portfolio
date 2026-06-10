// Placeholder asset handling.
//
// Rule (ObsidianVault/03_Design_And_Visual_Direction/Placeholder Asset Rules.md):
// NEVER reference a missing file. When a project has no real cover/media yet, we
// generate a self-contained inline SVG data URI at the correct aspect ratio so layout
// stays stable and nothing 404s. Real assets later replace these by setting
// `cover`/`media` in src/data/projects.ts.
//
// Phase 2: the generated placeholder is styled to match the cosmic-dark direction
// (void canvas, bone label, violet caption, a sparse particle drift) so a project with
// no media still looks intentional and premium rather than like an empty box.

import type { ShowcaseType } from "../types/project";

interface PlaceholderOptions {
  width?: number;
  height?: number;
  bg?: string;
  fg?: string;
  /** Smaller caption under the label, e.g. "video coming soon". */
  subtitle?: string;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// A fixed, deterministic scatter of cosmos particles (no RNG so the data URI is stable
// and cache-friendly). Colors drawn from the brand palette at low opacity.
const PARTICLES: ReadonlyArray<[number, number, number, string]> = [
  [90, 70, 2.4, "#8052ff"],
  [180, 130, 1.6, "#ffffff"],
  [260, 90, 2, "#1f9d83"],
  [340, 160, 1.4, "#ffffff"],
  [120, 220, 1.8, "#8052ff"],
  [430, 110, 2.2, "#ffb829"],
  [520, 200, 1.5, "#ffffff"],
  [610, 90, 2, "#8052ff"],
  [690, 180, 1.6, "#ffffff"],
  [710, 320, 2.4, "#1f9d83"],
  [60, 360, 1.6, "#ffffff"],
  [300, 380, 2, "#8052ff"],
  [470, 360, 1.5, "#ffffff"],
  [560, 330, 1.8, "#ffb829"],
  [200, 320, 1.4, "#ffffff"],
];

/**
 * Returns a data-URI SVG placeholder image with a centered label, on the cosmic-dark
 * canvas. Default 16:9 (800x450) to match card/hero aspect ratios.
 */
export function placeholderImage(label: string, opts: PlaceholderOptions = {}): string {
  const width = opts.width ?? 800;
  const height = opts.height ?? 450;
  const bg = opts.bg ?? "#08080e";
  const fg = opts.fg ?? "#f4f5f8";
  const text = escapeXml(label || "Placeholder");
  const subtitle = escapeXml(opts.subtitle ?? "media coming soon");

  const dots = PARTICLES.map(
    ([x, y, r, c]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" opacity="0.55"/>`,
  ).join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${text} placeholder">
  <rect width="${width}" height="${height}" fill="${bg}"/>
  <g>${dots}</g>
  <circle cx="${width / 2}" cy="46%" r="120" fill="none" stroke="#8052ff" stroke-opacity="0.18"/>
  <text x="50%" y="46%" text-anchor="middle" dominant-baseline="middle" fill="${fg}" font-family="'Space Grotesk', 'Segoe UI', Helvetica, Arial, sans-serif" font-size="38" font-weight="500" letter-spacing="-0.5">${text}</text>
  <text x="50%" y="58%" text-anchor="middle" dominant-baseline="middle" fill="#8052ff" font-family="'Plus Jakarta Sans', 'Segoe UI', Helvetica, Arial, sans-serif" font-size="16" letter-spacing="3" style="text-transform:uppercase">${subtitle}</text>
</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/** True while a project still uses placeholder content. */
export function isPlaceholder(status?: string): boolean {
  return status === "placeholder" || status === undefined;
}

/**
 * Human caption for an empty media well, tuned to the planned 3D showcase type so the
 * placeholder hints at what will eventually live there (e.g. "3D model coming soon").
 */
export function placeholderCaption(showcaseType?: ShowcaseType): string {
  switch (showcaseType) {
    case "model":
      return "3D model coming soon";
    case "video-screen":
      return "gameplay clip coming soon";
    case "environment":
      return "walkthrough coming soon";
    case "floating-card":
      return "showcase coming soon";
    default:
      return "media coming soon";
  }
}
