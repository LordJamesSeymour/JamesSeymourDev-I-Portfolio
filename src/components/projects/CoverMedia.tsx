import { useState } from "react";
import type { ProjectCover } from "../../types/project";
import { placeholderImage } from "../../lib/placeholder";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

interface CoverMediaProps {
  cover?: ProjectCover;
  /** Used for alt text and the generated placeholder label. */
  label: string;
  /** Extra class for sizing in different contexts. */
  className?: string;
  /** Caption shown under the label in the generated placeholder (e.g. "3D model coming soon"). */
  caption?: string;
}

/**
 * Renders a project cover as a looping muted **video**, an animated **gif**, or a static
 * **image** — whichever the data specifies. Behavior:
 *  - video: autoplays muted + looped + inline (silent, GIF-like). No controls so the
 *    surrounding card link still receives clicks.
 *  - reduced motion: video/gif are replaced by a still poster image.
 *  - missing cover / missing src: a generated SVG placeholder is shown (never 404s).
 */
export default function CoverMedia({ cover, label, className, caption }: CoverMediaProps) {
  const reduceMotion = usePrefersReducedMotion();
  // If a video errors (decode/network failure — e.g. autoplay blocked then aborted),
  // fall back to the still poster so the layout never breaks or shows a black box.
  const [videoFailed, setVideoFailed] = useState(false);
  const cls = className ? `cover-media ${className}` : "cover-media";

  // No cover yet → placeholder image.
  if (!cover || !cover.src) {
    return (
      <img
        className={cls}
        src={placeholderImage(label, { subtitle: caption ?? "media coming soon" })}
        alt={`${label} placeholder`}
        loading="lazy"
      />
    );
  }

  const altText = cover.alt ?? `${label} preview`;
  const poster =
    cover.poster ?? placeholderImage(label, { subtitle: caption ?? "video coming soon" });

  if (cover.type === "video") {
    // Reduced motion (or a failed video) → show the still poster instead of autoplay.
    if (reduceMotion || videoFailed) {
      return <img className={cls} src={poster} alt={altText} loading="lazy" />;
    }
    // Wrapped so we can layer a cinematic "veil" over the live clip: a violet key
    // light, a vignette, top/bottom darkening, and an edge focus-blur that keeps the
    // centre sharp (so motion is preserved while the frame feels premium + readable).
    const wrapCls = className ? `cover-video ${className}` : "cover-video";
    return (
      <span className={wrapCls}>
        <video
          className="cover-media cover-video__el"
          src={cover.src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label={altText}
          tabIndex={-1}
          onError={() => setVideoFailed(true)}
        />
        <span className="cover-video__veil" aria-hidden="true" />
      </span>
    );
  }

  // GIF: animated <img>. Under reduced motion, fall back to a poster if one is provided.
  if (cover.type === "gif" && reduceMotion && cover.poster) {
    return <img className={cls} src={cover.poster} alt={altText} loading="lazy" />;
  }

  // gif (no poster) or static image.
  return <img className={cls} src={cover.src} alt={altText} loading="lazy" />;
}
