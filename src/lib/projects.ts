import { projects } from "../data/projects";
import type { Project, ProjectCategory } from "../types/project";

/** All projects (source of truth lives in src/data/projects.ts). */
export function getAllProjects(): Project[] {
  return projects;
}

/** Projects flagged `featured: true` (falls back to all if none are flagged). */
export function getFeaturedProjects(): Project[] {
  const featured = projects.filter((p) => p.featured);
  return featured.length > 0 ? featured : projects;
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
