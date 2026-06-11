import { projects } from "../data/projects";
import type { Project, ProjectCategory } from "../types/project";

/** Max cards shown in the home "Featured Projects" grid — 2 rows of 3. */
export const FEATURED_LIMIT = 6;

/** All projects (source of truth lives in src/data/projects.ts). */
export function getAllProjects(): Project[] {
  return projects;
}

/**
 * Featured projects for the home grid: the ones flagged `featured: true`, sorted by
 * `featuredPriority` (lower first; unset sorts last), capped at FEATURED_LIMIT so the
 * grid is always a clean 3×2. Data-driven — selection/order live in projects.ts, not
 * here. Falls back to the first FEATURED_LIMIT projects if nothing is flagged.
 */
export function getFeaturedProjects(): Project[] {
  const flagged = projects.filter((p) => p.featured);
  const pool = flagged.length > 0 ? flagged : projects;
  const ordered = [...pool].sort(
    (a, b) =>
      (a.featuredPriority ?? Number.POSITIVE_INFINITY) -
      (b.featuredPriority ?? Number.POSITIVE_INFINITY),
  );
  return ordered.slice(0, FEATURED_LIMIT);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.category === category);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Distinct categories present in the data, in canonical order. */
export function getUsedCategories(): ProjectCategory[] {
  const order: ProjectCategory[] = ["C++", "C#", "Level Design"];
  return order.filter((c) => projects.some((p) => p.category === c));
}
