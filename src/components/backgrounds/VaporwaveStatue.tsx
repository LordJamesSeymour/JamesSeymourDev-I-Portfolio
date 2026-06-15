// ============================================================================
//  VaporwaveStatue — decorative Greek/Roman marble bust silhouette (SVG).
// ----------------------------------------------------------------------------
//  These are lightweight, dependency-free placeholder busts: a composed marble
//  silhouette (head + neck + shoulders, optional plinth) with a cool volume
//  shade. The neon violet/cyan rim light is applied in CSS via stacked
//  drop-shadows on `.cvw__statue svg` (see CursorVaporwaveBackground.css).
//
//  ┌─────────────────────────────────────────────────────────────────────┐
//  │  SWAP POINT — better statue art goes here.                            │
//  │  To use a proper Greek bust later, replace the <svg> below with your  │
//  │  own SVG path/artwork (keep fill="url(#cvw-marble-…)" so it inherits  │
//  │  the marble gradient + rim light), OR drop a GLB into                 │
//  │  /public/models/ and mount it in CursorVaporwaveScene.tsx as a        │
//  │  <Suspense> child (capability-gated like the Arcade Machine model).   │
//  └─────────────────────────────────────────────────────────────────────┘
// ============================================================================

import { useId } from "react";

interface VaporwaveStatueProps {
  /** Adds a classical plinth/pedestal under the bust. */
  pedestal?: boolean;
  className?: string;
}

export default function VaporwaveStatue({ pedestal = false, className }: VaporwaveStatueProps) {
  // Unique gradient ids so multiple statues on the page never collide.
  const uid = useId().replace(/:/g, "");
  const marble = `cvw-marble-${uid}`;
  const sheen = `cvw-sheen-${uid}`;

  return (
    <svg
      className={className}
      viewBox="0 0 200 340"
      role="presentation"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Marble: cool bone-white lit from the left, lavender in shadow. */}
        <linearGradient id={marble} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fbfaff" />
          <stop offset="0.5" stopColor="#e7e2f6" />
          <stop offset="1" stopColor="#b9a9d6" />
        </linearGradient>
        {/* Soft highlight on the lit cheek/brow. */}
        <radialGradient id={sheen} cx="0.38" cy="0.32" r="0.6">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g fill={`url(#${marble})`}>
        {pedestal && (
          // Plinth — a stepped classical base the bust rests on.
          <>
            <rect x="44" y="312" width="112" height="28" rx="3" />
            <rect x="54" y="296" width="92" height="20" rx="3" />
          </>
        )}

        {/* Shoulders / chest drape. */}
        <path d="M22 312 C22 244 56 210 100 210 C144 210 178 244 178 312 Z" />
        {/* Neck. */}
        <path d="M83 224 L117 224 C115 196 114 184 113 176 L87 176 C86 184 85 196 83 224 Z" />
        {/* Head + crown (classical, lightly flattened top). */}
        <path d="M100 40
                 C70 40 52 64 52 104
                 C52 140 72 168 100 168
                 C128 168 148 140 148 104
                 C148 64 130 40 100 40 Z" />
      </g>

      {/* Volume: cool shadow down the right/under-jaw, then a soft lit sheen. */}
      <g style={{ mixBlendMode: "multiply" }} opacity="0.22">
        <path
          d="M100 40 C128 40 148 64 148 104 C148 140 128 168 100 168 C118 150 124 126 124 104 C124 74 114 52 100 40 Z"
          fill="#5a3fa6"
        />
        <path d="M100 210 C144 210 178 244 178 312 L120 312 C120 262 112 232 100 210 Z" fill="#5a3fa6" />
      </g>
      <ellipse cx="82" cy="92" rx="34" ry="42" fill={`url(#${sheen})`} />

      {/* Faint classical face hint (brow + nose ridge) — kept very subtle. */}
      <g stroke="#7d63b8" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.18">
        <path d="M86 92 C92 86 108 86 114 92" />
        <path d="M100 96 L96 118 L104 122" />
      </g>
    </svg>
  );
}
