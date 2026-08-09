import { arcadeMachineGalleryImages } from "./arcadeMachineGalleryData";
import ProjectImageCarousel from "./ProjectImageCarousel";
import "./ArcadeMachineGallery.css";

export default function ArcadeMachineGallery() {
  return (
    <section
      className="section arcade-gallery-section"
      aria-labelledby="arcade-gallery-title"
    >
      <div className="container">
        <header className="section__head arcade-gallery__head">
          <span className="kicker">Physical Build</span>
          <h2 id="arcade-gallery-title" className="section__title">
            Project Gallery
          </h2>
        </header>

        <ProjectImageCarousel
          images={arcadeMachineGalleryImages}
          ariaLabel="Arcade Machine project gallery"
          imageLabel="Arcade Machine image"
          emptyMessage="Gallery photographs and screenshots will appear here when added."
        />
      </div>
    </section>
  );
}
