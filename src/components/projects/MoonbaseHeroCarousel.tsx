import ProjectImageCarousel from "./ProjectImageCarousel";
import { moonbaseGalleryImages } from "./moonbaseGalleryData";

export default function MoonbaseHeroCarousel() {
  return (
    <ProjectImageCarousel
      images={moonbaseGalleryImages}
      ariaLabel="Hammer Engine – Moonbase project photographs"
      imageLabel="Moonbase project image"
      emptyMessage="Moonbase project photographs will appear here when numbered images are added."
      variant="hero"
      prioritiseFirstImage
    />
  );
}
