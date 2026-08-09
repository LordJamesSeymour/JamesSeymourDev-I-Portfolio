import type { ProjectCarouselImage } from "./ProjectImageCarousel";

interface MoonbaseGalleryMetadata {
  alt: string;
  caption?: string;
  width: number;
  height: number;
}

/**
 * Optional copy keyed by the exact filename. Add an entry here to override the
 * neutral generated alt text or to show a caption beneath a photograph. Native
 * dimensions keep each slide at its real aspect ratio before the image loads.
 */
export const MOONBASE_GALLERY_METADATA: Record<
  string,
  MoonbaseGalleryMetadata
> = {
  "1.png": {
    alt: "Hammer Engine – Moonbase project screenshot 1",
    width: 1685,
    height: 942,
  },
  "2.png": {
    alt: "Hammer Engine – Moonbase project screenshot 2",
    width: 732,
    height: 863,
  },
  "3.png": {
    alt: "Hammer Engine – Moonbase project screenshot 3",
    width: 1780,
    height: 883,
  },
  "4.png": {
    alt: "Hammer Engine – Moonbase project screenshot 4",
    width: 1920,
    height: 1080,
  },
  "5.png": {
    alt: "Hammer Engine – Moonbase project screenshot 5",
    width: 1919,
    height: 1043,
  },
  "6.png": {
    alt: "Hammer Engine – Moonbase project screenshot 6",
    width: 1919,
    height: 1040,
  },
  "7.png": {
    alt: "Hammer Engine – Moonbase project screenshot 7",
    width: 1920,
    height: 1080,
  },
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
    const metadata = MOONBASE_GALLERY_METADATA[fileName.toLowerCase()];

    return {
      fileName,
      src,
      alt: metadata?.alt ?? defaultAlt(fileName),
      caption: metadata?.caption,
      width: metadata?.width,
      height: metadata?.height,
    };
  })
  .filter((image) => isNumberedCarouselImage(image.fileName))
  .sort((a, b) =>
    a.fileName.localeCompare(b.fileName, undefined, {
      numeric: true,
      sensitivity: "base",
    }),
  );
