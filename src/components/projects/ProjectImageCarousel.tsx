import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import "./ProjectImageCarousel.css";

export interface ProjectCarouselImage {
  fileName: string;
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

interface ProjectImageCarouselProps {
  images: ProjectCarouselImage[];
  ariaLabel: string;
  imageLabel: string;
  emptyMessage: string;
  variant?: "default" | "hero" | "adaptive";
  prioritiseFirstImage?: boolean;
}

interface SwipeStart {
  pointerId: number;
  x: number;
  y: number;
}

const SWIPE_THRESHOLD = 48;

export default function ProjectImageCarousel({
  images,
  ariaLabel,
  imageLabel,
  emptyMessage,
  variant = "default",
  prioritiseFirstImage = false,
}: ProjectImageCarouselProps) {
  const [active, setActive] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(() =>
    typeof window === "undefined" ? 900 : window.innerHeight,
  );
  const swipeStart = useRef<SwipeStart | null>(null);
  const count = images.length;
  const safeActive = count > 0 ? Math.min(active, count - 1) : 0;
  const current = images[safeActive];

  useEffect(() => {
    if (count < 2) return;

    const adjacent = [
      images[(safeActive - 1 + count) % count],
      images[(safeActive + 1) % count],
    ];
    adjacent.forEach((image) => {
      const preload = new Image();
      preload.src = image.src;
    });
  }, [count, images, safeActive]);

  useEffect(() => {
    if (variant !== "adaptive") return;
    const updateViewportHeight = () => setViewportHeight(window.innerHeight);
    window.addEventListener("resize", updateViewportHeight);
    return () => window.removeEventListener("resize", updateViewportHeight);
  }, [variant]);

  const step = (delta: number) => {
    if (count < 2) return;
    setActive((safeActive + delta + count) % count);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" || count < 2) return;
    swipeStart.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
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

  if (count === 0) {
    return (
      <div
        className={`project-image-carousel__empty project-image-carousel__empty--${variant}`}
        role="status"
      >
        <p>{emptyMessage}</p>
      </div>
    );
  }

  const adaptiveStageStyle =
    variant === "adaptive" && current.width && current.height
      ? {
          aspectRatio: `${current.width} / ${current.height}`,
          maxWidth: `${Math.min(
            current.width,
            1200,
            Math.min(viewportHeight * 0.72, 760, current.height) *
              (current.width / current.height),
          )}px`,
        }
      : undefined;

  return (
    <div
      className={`project-image-carousel project-image-carousel--${variant}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <figure className="project-image-carousel__figure">
        <div
          className="project-image-carousel__stage"
          style={adaptiveStageStyle}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => {
            swipeStart.current = null;
          }}
        >
          <img
            key={current.src}
            className="project-image-carousel__image"
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            loading={prioritiseFirstImage && safeActive === 0 ? "eager" : "lazy"}
            fetchPriority={
              prioritiseFirstImage && safeActive === 0 ? "high" : "auto"
            }
            decoding="async"
            draggable={false}
          />

          {count > 1 && (
            <>
              <button
                type="button"
                className="project-image-carousel__arrow project-image-carousel__arrow--prev"
                onClick={() => step(-1)}
                aria-label={`Show previous ${imageLabel}`}
              >
                <span aria-hidden="true">‹</span>
              </button>
              <button
                type="button"
                className="project-image-carousel__arrow project-image-carousel__arrow--next"
                onClick={() => step(1)}
                aria-label={`Show next ${imageLabel}`}
              >
                <span aria-hidden="true">›</span>
              </button>
            </>
          )}
        </div>

        {current.caption && (
          <figcaption className="project-image-carousel__caption">
            {current.caption}
          </figcaption>
        )}
      </figure>

      <div className="project-image-carousel__controls">
        {count > 1 && (
          <div
            className="project-image-carousel__dots"
            role="group"
            aria-label="Choose a carousel image"
          >
            {images.map((image, index) => (
              <button
                key={image.fileName}
                type="button"
                className={`project-image-carousel__dot${
                  index === safeActive ? " project-image-carousel__dot--active" : ""
                }`}
                aria-label={`Show ${imageLabel} ${index + 1} of ${count}`}
                aria-current={index === safeActive ? "true" : undefined}
                onClick={() => setActive(index)}
              />
            ))}
          </div>
        )}

        <p className="project-image-carousel__position" aria-live="polite">
          {String(safeActive + 1).padStart(2, "0")} /{" "}
          {String(count).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}
