import { useTextContent } from "./useTextContent";

/**
 * Path builders + typed convenience hooks for the editable `.txt` content system.
 * Keeps the mapping between content keys and files in ONE place.
 *
 *   site copy   → public/content/site/<name>.txt
 *   project copy→ public/content/projects/<slug>/<field>.txt
 */

/** Editable project text fields (one `.txt` file each). */
export type ProjectTextField =
  | "title"
  | "short-description"
  | "long-description"
  | "inside-description"
  | "creative-process"
  | "role"
  | "contributions"
  | "technical-highlights"
  | "development-context"
  | "needs";

export const siteContentPath = (name: string): string => `content/site/${name}.txt`;

export const projectContentPath = (slug: string, field: ProjectTextField): string =>
  `content/projects/${slug}/${field}.txt`;

/** Read a site-level copy file (e.g. "hero-tagline"), falling back to `fallback`. */
export function useSiteText(name: string, fallback: string): string {
  return useTextContent(siteContentPath(name), fallback);
}

/** Read a per-project copy file, falling back to `fallback`. */
export function useProjectText(
  slug: string,
  field: ProjectTextField,
  fallback: string,
): string {
  return useTextContent(projectContentPath(slug, field), fallback);
}
