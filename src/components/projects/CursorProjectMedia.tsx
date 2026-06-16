import { useEffect, useRef, useState } from "react";
import type { ProjectCover } from "../../types/project";
import { placeholderImage } from "../../lib/placeholder";
import { resolvePublicAssetPath } from "../../lib/assets";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import MediaPlaceholder from "./MediaPlaceholder";
import ProjectMedia from "./ProjectMedia";

interface CursorProjectMediaProps {
  cover?: ProjectCover;
  label: string;
  className?: string;
  caption?: string;
}

interface CursorVideoPreviewProps {
  sources: string[];
  poster: string;
  alt: string;
  className?: string;
  onAllFailed: () => void;
}

function useNearViewport(rootMargin = "180px 0px") {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [near, setNear] = useState(
    () => typeof window === "undefined" || !("IntersectionObserver" in window),
  );

  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) {
      setNear(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setNear(entry.isIntersecting),
      { rootMargin, threshold: 0.01 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, near };
}

function usePageVisible() {
  const [visible, setVisible] = useState(
    () => typeof document === "undefined" || document.visibilityState === "visible",
  );

  useEffect(() => {
    const onVisibilityChange = () => {
      setVisible(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  return visible;
}

function CursorVideoPreview({
  sources,
  poster,
  alt,
  className,
  onAllFailed,
}: CursorVideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref: wrapRef, near } = useNearViewport();
  const pageVisible = usePageVisible();
  const [index, setIndex] = useState(0);
  const src = sources[index];
  const shouldLoad = near;
  const shouldPlay = shouldLoad && pageVisible;
  const wrapCls = className ? `cover-video ${className}` : "cover-video";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldPlay && src) {
      void video.play().catch(() => undefined);
      return;
    }

    video.pause();
  }, [shouldPlay, src]);

  const handleError = () => {
    if (index + 1 < sources.length) {
      setIndex(index + 1);
    } else {
      onAllFailed();
    }
  };

  return (
    <span ref={wrapRef} className={wrapCls}>
      <video
        key={src}
        ref={videoRef}
        className="cover-media cover-video__el"
        src={shouldLoad ? src : undefined}
        poster={poster}
        autoPlay={shouldPlay}
        loop
        muted
        playsInline
        preload={shouldLoad ? "metadata" : "none"}
        aria-label={alt}
        tabIndex={-1}
        onError={handleError}
      />
      <span className="cover-video__veil" aria-hidden="true" />
    </span>
  );
}

export default function CursorProjectMedia({
  cover,
  label,
  className,
  caption,
}: CursorProjectMediaProps) {
  const reduceMotion = usePrefersReducedMotion();
  const [failed, setFailed] = useState(false);
  const cls = className ? `cover-media ${className}` : "cover-media";

  if (cover?.type !== "video") {
    return <ProjectMedia cover={cover} label={label} className={className} caption={caption} />;
  }

  const altText = cover.alt ?? `${label} preview`;
  const poster = resolvePublicAssetPath(
    cover.poster ?? placeholderImage(label, { subtitle: caption ?? "video coming soon" }),
  );
  const sources = (cover.sources?.length ? cover.sources : cover.src ? [cover.src] : []).map(
    resolvePublicAssetPath,
  );

  if (failed || sources.length === 0) {
    return <MediaPlaceholder label={label} caption={caption} className={className} />;
  }

  if (reduceMotion) {
    return (
      <img
        className={cls}
        src={poster}
        alt={altText}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <CursorVideoPreview
      sources={sources}
      poster={poster}
      alt={altText}
      className={className}
      onAllFailed={() => setFailed(true)}
    />
  );
}
