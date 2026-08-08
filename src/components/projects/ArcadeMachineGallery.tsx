import { useRef, useState } from "react";
import { arcadeMachineGalleryImages } from "./arcadeMachineGalleryData";
import "./ArcadeMachineGallery.css";

interface SwipeStart {
  pointerId: number;
  x: number;
  y: number;
}

const SWIPE_THRESHOLD = 48;

export default function ArcadeMachineGallery() {
  const images = arcadeMachineGalleryImages;
  const [active, setActive] = useState(0);
  const swipeStart = useRef<SwipeStart | null>(null);
  const count = images.length;
  const safeActive = count > 0 ? Math.min(active, count - 1) : 0;
  const current = images[safeActive];

  const step = (delta: number) => {
    if (count < 2) return;
    setActive((safeActive + delta + count) % count);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" || count < 2) return;
    swipeStart.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start || start.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (
      Math.abs(deltaX) >= SWIPE_THRESHOLD &&
      Math.abs(deltaX) > Math.abs(deltaY) * 1.2
    ) {
      step(deltaX < 0 ? 1 : -1);
    }
  };

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

        {count === 0 ? (
          <div className="arcade-gallery__empty" role="status">
            <p>Gallery photographs and screenshots will appear here when added.</p>
          </div>
        ) : (
          <div
            className="arcade-gallery"
            role="region"
            aria-roledescription="carousel"
            aria-label="Arcade Machine project gallery"
            tabIndex={0}
            onKeyDown={handleKeyDown}
          >
            <figure className="arcade-gallery__figure">
              <div
                className="arcade-gallery__stage"
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerCancel={() => {
                  swipeStart.current = null;
                }}
              >
                <img
                  key={current.src}
                  className="arcade-gallery__image"
                  src={current.src}
                  alt={current.alt}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />

                {count > 1 && (
                  <>
                    <button
                      type="button"
                      className="arcade-gallery__arrow arcade-gallery__arrow--prev"
                      onClick={() => step(-1)}
                      aria-label="Show previous Arcade Machine image"
                    >
                      <span aria-hidden="true">‹</span>
                    </button>
                    <button
                      type="button"
                      className="arcade-gallery__arrow arcade-gallery__arrow--next"
                      onClick={() => step(1)}
                      aria-label="Show next Arcade Machine image"
                    >
                      <span aria-hidden="true">›</span>
                    </button>
                  </>
                )}
              </div>

              {current.caption && (
                <figcaption className="arcade-gallery__caption">
                  {current.caption}
                </figcaption>
              )}
            </figure>

            <div className="arcade-gallery__controls">
              {count > 1 && (
                <div
                  className="arcade-gallery__dots"
                  role="group"
                  aria-label="Choose a gallery image"
                >
                  {images.map((image, index) => (
                    <button
                      key={image.fileName}
                      type="button"
                      className={`arcade-gallery__dot${
                        index === safeActive ? " arcade-gallery__dot--active" : ""
                      }`}
                      aria-label={`Show Arcade Machine image ${index + 1} of ${count}`}
                      aria-current={index === safeActive ? "true" : undefined}
                      onClick={() => setActive(index)}
                    />
                  ))}
                </div>
              )}

              <p className="arcade-gallery__position" aria-live="polite">
                {String(safeActive + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
