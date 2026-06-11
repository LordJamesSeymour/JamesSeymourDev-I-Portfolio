import { useState } from "react";

interface VideoPreviewProps {
  /** Ordered candidate sources. The first that loads/decodes wins; on failure we
   *  advance to the next, and call onAllFailed once every source is exhausted. */
  sources: string[];
  /** Still shown before the first frame, and as the reduced-motion fallback upstream. */
  poster: string;
  alt: string;
  className?: string;
  /** Called when no source could play — the parent then shows the placeholder. */
  onAllFailed: () => void;
}

/**
 * VideoPreview — a silent, GIF-like looping video cover with the cinematic veil overlay.
 *
 * Autoplays muted + looped + inline (no controls, so the surrounding card link still
 * receives clicks). Robustness: it tries `sources` in order — prepend an optimized clip
 * and keep the heavy/raw file as a fallback. If a source errors it advances to the next;
 * if all fail it calls onAllFailed so the parent can fall back to the placeholder.
 *
 * NOTE: a large, non-faststart MP4 (moov atom at the end of the file) cannot start
 * playing until it has fully downloaded — until then the poster shows. Prefer a small,
 * `+faststart` preview so the first frame appears immediately.
 */
export default function VideoPreview({
  sources,
  poster,
  alt,
  className,
  onAllFailed,
}: VideoPreviewProps) {
  const [index, setIndex] = useState(0);
  const src = sources[index];
  const wrapCls = className ? `cover-video ${className}` : "cover-video";

  const handleError = () => {
    if (index + 1 < sources.length) {
      setIndex(index + 1);
    } else {
      onAllFailed();
    }
  };

  return (
    <span className={wrapCls}>
      <video
        // Remount on source change so the new src loads cleanly.
        key={src}
        className="cover-media cover-video__el"
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={alt}
        tabIndex={-1}
        onError={handleError}
      />
      <span className="cover-video__veil" aria-hidden="true" />
    </span>
  );
}
