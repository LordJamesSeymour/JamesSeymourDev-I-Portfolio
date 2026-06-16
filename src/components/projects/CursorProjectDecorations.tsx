import { memo } from "react";
import { resolvePublicAssetPath } from "../../lib/assets";
import "./CursorProjectDecorations.css";

const ASSET_DIR = "/Cursor";
const OPTIMIZED_ASSET_DIR = `${ASSET_DIR}/optimized`;

const assetSrc = (file: string) =>
  resolvePublicAssetPath(`${ASSET_DIR}/${encodeURIComponent(file)}`);

interface Deco {
  id: string;
  fallback: string;
  webp: string;
  width: number;
  height: number;
  near: string;
}

const DECORATIONS: Deco[] = [
  {
    id: "dash",
    fallback: "cursor dash.png",
    webp: "cursor-dash-480.webp",
    width: 480,
    height: 469,
    near: "overview / header corner",
  },
  {
    id: "walljump",
    fallback: "cursor run to wall jump.png",
    webp: "cursor-run-to-wall-jump-420.webp",
    width: 420,
    height: 513,
    near: "cover media card edge",
  },
  {
    id: "grapple",
    fallback: "cursor grapple.png",
    webp: "cursor-grapple-480.webp",
    width: 480,
    height: 449,
    near: "gameplay trailer / video",
  },
  {
    id: "ball",
    fallback: "cursor ball transform illust.png",
    webp: "cursor-ball-transform-560.webp",
    width: 560,
    height: 287,
    near: "video to case-study transition",
  },
];

function CursorProjectDecorations() {
  return (
    <div className="cursor-deco-layer" aria-hidden="true">
      {DECORATIONS.map((deco) => (
        <span
          key={deco.id}
          className={`cursor-deco cursor-deco--${deco.id}`}
          data-near={deco.near}
        >
          <picture className="cursor-deco__art">
            <source
              srcSet={resolvePublicAssetPath(`${OPTIMIZED_ASSET_DIR}/${deco.webp}`)}
              type="image/webp"
            />
            <img
              src={assetSrc(deco.fallback)}
              alt=""
              width={deco.width}
              height={deco.height}
              draggable={false}
              loading="lazy"
              decoding="async"
            />
          </picture>
        </span>
      ))}
    </div>
  );
}

export default memo(CursorProjectDecorations);
