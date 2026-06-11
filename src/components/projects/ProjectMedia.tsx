import { useState } from "react";
import type { ProjectCover } from "../../types/project";
import { placeholderImage } from "../../lib/placeholder";
import { resolvePublicAssetPath } from "../../lib/assets";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import VideoPreview from "./VideoPreview";
import MediaPlaceholder from "./MediaPlaceholder";

interface ProjectMediaProps {
  cover?: ProjectCover;
  /** Used for alt text and the generated placeholder label. */
  label: string;
  /** Extra class for sizing in different contexts. */
  className?: string;
  /** Caption shown under the label in the generated placeholder. */
  caption?: string;
}

/**
 * ProjectMedia — single, reliable entry point for a project's cover media. Decides
 * between a looping muted **video** (with cinematic veil), an animated **gif**, a static
 * **image**, or the premium **placeholder**, and degrades gracefully at every step:
 *
 *   - video: tries `cover.sources` in order (falls back to `[cover.src]`); if every
 *     source fails to load → placeholder. Reduced motion → still poster.
 *   - gif/image: renders it; on load error → placeholder.
 *   - no cover / no source / any failure → on-brand generated placeholder (never 404s).
 *
 * (Replaces the old CoverMedia; same props, so call sites are unchanged.)
 */
export default function ProjectMedia({ cover, label, className, caption }: ProjectMediaProps) {
  const reduceMotion = usePrefersReducedMotion();
  const [failed, setFailed] = useState(false);
  const cls = className ? `cover-media ${className}` : "cover-media";

  const altText = cover?.alt ?? `${label} preview`;
  const poster = resolvePublicAssetPath(
    cover?.poster ?? placeholderImage(label, { subtitle: caption ?? "video coming soon" }),
  );

  // ---- Video --------------------------------------------------------------
  if (cover?.type === "video" && !failed) {
    const sources = (cover.sources?.length ? cover.sources : cover.src ? [cover.src] : []).map(
      resolvePublicAssetPath,
    );
    if (sources.length === 0) {
      return <MediaPlaceholder label={label} caption={caption} className={className} />;
    }
    // Reduced motion → show the still poster instead of an autoplaying video.
    if (reduceMotion) {
      return (
        <img
          className={cls}
          src={poster}
          alt={altText}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      );
    }
    return (
      <VideoPreview
        sources={sources}
        poster={poster}
        alt={altText}
        className={className}
        onAllFailed={() => setFailed(true)}
      />
    );
  }

  // ---- Gif / image --------------------------------------------------------
  if ((cover?.type === "gif" || cover?.type === "image") && cover.src && !failed) {
    // GIF under reduced motion falls back to a poster if one is provided.
    if (cover.type === "gif" && reduceMotion && cover.poster) {
      return (
        <img
          className={cls}
          src={resolvePublicAssetPath(cover.poster)}
          alt={altText}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      );
    }
    const imageWrapCls = className ? `cover-image ${className}` : "cover-image";
    return (
      <span className={imageWrapCls}>
        <img
          className={cls}
          src={resolvePublicAssetPath(cover.src)}
          alt={altText}
          loading="lazy"
          onError={() => setFailed(true)}
        />
        <span className="cover-image__veil" aria-hidden="true" />
      </span>
    );
  }

  // ---- Nothing usable (or a failure above) → premium placeholder ----------
  return <MediaPlaceholder label={label} caption={caption} className={className} />;
}
