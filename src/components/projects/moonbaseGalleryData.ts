import type { ProjectCarouselImage } from "./ProjectImageCarousel";

interface MoonbaseGalleryMetadata {
  alt: string;
  caption?: string;
}

/**
 * Optional copy keyed by the exact filename. Add an entry here to override the
 * neutral generated alt text or to show a caption beneath a photograph.
 */
export const MOONBASE_GALLERY_METADATA: Record<
  string,
  MoonbaseGalleryMetadata
> = {
  // "01-moonbase-overview.jpg": {
  //   alt: "Custom alternative text",
  //   caption: "Optional caption shown beneath the photograph.",
  // },
};

// Vite discovers numbered images in this project folder at build time. Requiring
// a numeric prefix keeps icons, textures and other technical assets out of the
// carousel and creates a predictable order (01-..., 02-..., 03-...).
const galleryModules = import.meta.glob<string>(
  [
    "../../assets/projects/hammerengine-moonbase/*.{jpg,jpeg,png,webp,avif}",
    "../../assets/projects/hammerengine-moonbase/*.{JPG,JPEG,PNG,WEBP,AVIF}",
  ],
  { eager: true, import: "default", query: "?url" },
);

function fileNameFromPath(path: string): string {
  return path.split("/").pop() ?? path;
}

function isNumberedCarouselImage(fileName: string): boolean {
  return /^\d+/.test(fileName);
}

function defaultAlt(fileName: string): string {
  const slideNumber = fileName.match(/^(\d+)/)?.[1];
  return slideNumber
    ? `Hammer Engine – Moonbase project screenshot ${Number(slideNumber)}`
    : "Hammer Engine – Moonbase project screenshot";
}

export const moonbaseGalleryImages: ProjectCarouselImage[] = Object.entries(
  galleryModules,
)
  .map(([path, src]) => {
    const fileName = fileNameFromPath(path);
    const metadata = MOONBASE_GALLERY_METADATA[fileName];

    return {
      fileName,
      src,
      alt: metadata?.alt ?? defaultAlt(fileName),
      caption: metadata?.caption,
    };
  })
  .filter((image) => isNumberedCarouselImage(image.fileName))
  .sort((a, b) =>
    a.fileName.localeCompare(b.fileName, undefined, {
      numeric: true,
      sensitivity: "base",
    }),
  );
