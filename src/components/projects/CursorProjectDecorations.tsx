import { resolvePublicAssetPath } from "../../lib/assets";
import "./CursorProjectDecorations.css";

/**
 * Cursor.zip-only decorative character "stickers" — placed around the edges of
 * the project content (overview, media, video, case study), mirroring how the
 * Super Bomberman (Chomper/player) and Surfers Quest decorations frame their
 * pages. The four character/action illustrations live in /public/Cursor; their
 * filenames contain spaces, so each is URL-encoded (we don't rename the files).
 *
 * Rendered inside the `.project-detail--vaporwave` article (made `position:
 * relative; isolation: isolate` in the CSS). The layer sits BEHIND the text/cards
 * and ABOVE the vaporwave background, and is fully `pointer-events: none`, so it
 * never covers or blocks any text, link, video, or control. Sizing/placement is
 * reduced on tablet and hidden on mobile (see the CSS) so nothing clutters small
 * layouts. Idle float respects `prefers-reduced-motion`.
 */

const ASSET_DIR = "/Cursor";

/** Encode the space-containing filename without renaming the source asset. */
const decoSrc = (file: string) =>
  resolvePublicAssetPath(`${ASSET_DIR}/${encodeURIComponent(file)}`);

interface Deco {
  /** Stable key + BEM modifier suffix. */
  id: string;
  file: string;
  /** Short note on which content section it frames (for maintainers). */
  near: string;
}

const DECORATIONS: Deco[] = [
  { id: "dash", file: "cursor dash.png", near: "overview / header corner" },
  { id: "walljump", file: "cursor run to wall jump.png", near: "cover media card edge" },
  { id: "grapple", file: "cursor grapple.png", near: "gameplay trailer / video" },
  { id: "ball", file: "cursor ball transform illust.png", near: "video → case-study transition" },
];

export default function CursorProjectDecorations() {
  return (
    <div className="cursor-deco-layer" aria-hidden="true">
      {DECORATIONS.map((d) => (
        <span key={d.id} className={`cursor-deco cursor-deco--${d.id}`} data-near={d.near}>
          <img src={decoSrc(d.file)} alt="" draggable={false} loading="lazy" decoding="async" />
        </span>
      ))}
    </div>
  );
}
