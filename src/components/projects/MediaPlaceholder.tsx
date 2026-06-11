import { placeholderImage } from "../../lib/placeholder";

interface MediaPlaceholderProps {
  /** Used for the label and alt text. */
  label: string;
  /** Caption under the label, e.g. "gameplay clip coming soon". */
  caption?: string;
  /** Extra sizing class. */
  className?: string;
}

/**
 * MediaPlaceholder — the premium, on-brand fallback shown whenever a project has no
 * usable media (no cover, or every video/image source failed to load). It renders the
 * cosmic-dark generated SVG (src/lib/placeholder.ts), so the layout never shows a broken
 * media panel or a 404. Visually consistent with the rest of the Dala-inspired design.
 */
export default function MediaPlaceholder({ label, caption, className }: MediaPlaceholderProps) {
  const cls = className ? `cover-media ${className}` : "cover-media";
  return (
    <img
      className={cls}
      src={placeholderImage(label, { subtitle: caption ?? "media coming soon" })}
      alt={`${label} placeholder`}
      loading="lazy"
    />
  );
}
