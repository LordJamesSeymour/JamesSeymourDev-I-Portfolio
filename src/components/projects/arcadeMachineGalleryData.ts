export interface ArcadeMachineGalleryMetadata {
  alt: string;
  caption?: string;
}

export interface ArcadeMachineGalleryImage extends ArcadeMachineGalleryMetadata {
  fileName: string;
  src: string;
}

/**
 * Optional per-image copy, keyed by the exact filename in the gallery folder.
 * Images without an entry still work and receive readable alt text from the filename.
 */
export const ARCADE_MACHINE_GALLERY_METADATA: Record<
  string,
  ArcadeMachineGalleryMetadata
> = {
  // "01-front-view.jpg": {
  //   alt: "Front view of the completed Arcade Machine cabinet",
  //   caption: "Optional caption shown beneath the image.",
  // },
};

// Vite discovers supported gallery images at build time. Numeric filename prefixes
// provide a stable order: 01-front-view.jpg, 02-side-view.jpg, and so on.
const galleryModules = import.meta.glob<string>(
  "../../assets/projects/arcade-machine/gallery/*.{jpg,jpeg,png,webp,avif}",
  { eager: true, import: "default", query: "?url" },
);

function fileNameFromPath(path: string): string {
  return path.split("/").pop() ?? path;
}

function defaultAlt(fileName: string): string {
  const readable = fileName
    .replace(/\.[^.]+$/, "")
    .replace(/^\d+[\s_-]*/, "")
    .replace(/[\s_-]+/g, " ")
    .trim();

  return readable
    ? `Arcade Machine — ${readable}`
    : "Arcade Machine project image";
}

export const arcadeMachineGalleryImages: ArcadeMachineGalleryImage[] = Object.entries(
  galleryModules,
)
  .map(([path, src]) => {
    const fileName = fileNameFromPath(path);
    const metadata = ARCADE_MACHINE_GALLERY_METADATA[fileName];

    return {
      fileName,
      src,
      alt: metadata?.alt ?? defaultAlt(fileName),
      caption: metadata?.caption,
    };
  })
  .sort((a, b) =>
    a.fileName.localeCompare(b.fileName, undefined, {
      numeric: true,
      sensitivity: "base",
    }),
  );
