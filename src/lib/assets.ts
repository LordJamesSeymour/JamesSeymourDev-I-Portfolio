/** Resolve a root-relative public asset against Vite's configured base path. */
export function resolvePublicAssetPath(src: string): string {
  if (!src.startsWith("/") || src.startsWith("//")) return src;

  const base = import.meta.env.BASE_URL || "/";
  const prefix = base === "/" ? "" : base.replace(/\/+$/, "");
  return `${prefix}${src}`;
}
