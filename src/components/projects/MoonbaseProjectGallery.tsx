import ProjectImageCarousel from "./ProjectImageCarousel";
import { moonbaseGalleryImages } from "./moonbaseGalleryData";
import "./MoonbaseProjectGallery.css";

export default function MoonbaseProjectGallery() {
  return (
    <section
      className="project-detail__showcase moonbase-project-gallery"
      aria-labelledby="moonbase-gallery-heading"
    >
      <div className="project-detail__showcase-head">
        <h2 id="moonbase-gallery-heading">Project Gallery</h2>
      </div>
      <ProjectImageCarousel
        images={moonbaseGalleryImages}
        ariaLabel="Hammer Engine – Moonbase project gallery"
        imageLabel="Moonbase project image"
        emptyMessage="Moonbase project photographs will appear here when numbered images are added."
        variant="adaptive"
      />
    </section>
  );
}
