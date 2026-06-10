// Placeholder asset handling.
//
// Rule (ObsidianVault/03_Design_And_Visual_Direction/Placeholder Asset Rules.md):
// NEVER reference a missing file. When a project has no real thumbnail/media yet,
// we generate a self-contained inline SVG data URI at the correct aspect ratio so
// layout stays stable and nothing 404s. Real assets later replace these by setting
// `thumbnail`/`media` in src/data/projects.ts.

interface PlaceholderOptions {
  width?: number;
  height?: number;
  bg?: string;
  fg?: string;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Returns a data-URI SVG placeholder image with a centered label.
 * Default 16:9 (800x450) to match card/hero aspect ratios.
 */
export function placeholderImage(label: string, opts: PlaceholderOptions = {}): string {
  const width = opts.width ?? 800;
  const height = opts.height ?? 450;
  const bg = opts.bg ?? "#1e293b";
  const fg = opts.fg ?? "#7dd3fc";
  const text = escapeXml(label || "Placeholder");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${text} placeholder">
  <rect width="${width}" height="${height}" fill="${bg}"/>
  <text x="50%" y="46%" text-anchor="middle" dominant-baseline="middle" fill="${fg}" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="34" font-weight="700">${text}</text>
  <text x="50%" y="60%" text-anchor="middle" dominant-baseline="middle" fill="#64748b" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="18">placeholder image</text>
</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/** True while a project still uses placeholder content. */
export function isPlaceholder(status?: string): boolean {
  return status === "placeholder" || status === undefined;
}
