import { Suspense, lazy, useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import ThreeErrorBoundary from "../three/ThreeErrorBoundary";
import "./CursorVaporwaveBackground.css";

// Code-split the WebGL scene so three.js only downloads on the Cursor.zip page.
const CursorVaporwaveScene = lazy(() => import("./CursorVaporwaveScene"));

// Public-domain / CC0 classical statue cutouts (Michelangelo's David — SMK; Roman
// busts — The Met Open Access). Sources + licence:
// public/assets/cursor-vaporwave/statues/ASSET_CREDITS.md. Referenced via BASE_URL
// so deep links work under a GitHub Pages subpath. To swap art, replace the PNGs
// (see ASSET_CREDITS.md) — no code change needed.
const STATUES = `${import.meta.env.BASE_URL}assets/cursor-vaporwave/statues`;

/** One-time WebGL capability probe (mirrors the Arcade Machine reveal). */
function detectWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/** Small-viewport breakpoint → CSS-only path (fewer objects, no WebGL) on mobile. */
function useIsSmallScreen(): boolean {
  const QUERY = "(max-width: 820px)";
  const [small, setSmall] = useState(
    () => typeof window !== "undefined" && window.matchMedia(QUERY).matches,
  );
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(QUERY);
    const onChange = (e: MediaQueryListEvent) => setSmall(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return small;
}

/** A floating Windows 95/98-style popup window (decorative, low-opacity). */
function RetroWindow({
  title,
  modifier,
  children,
}: {
  title: string;
  modifier: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`cvw__win cvw__win--${modifier}`}>
      <div className="cvw__win-bar">
        <span className="cvw__win-title">{title}</span>
        <span className="cvw__win-btns" aria-hidden="true">
          <i>_</i>
          <i>□</i>
          <i>✕</i>
        </span>
      </div>
      <div className="cvw__win-body">{children}</div>
    </div>
  );
}

/**
 * Cursor.zip-only vaporwave decorative background. Sits BEHIND the project
 * content as a fixed, pointer-events:none, z-index:-1 layer (so the case study
 * text, videos and thumbnails stay fully readable and interactive).
 *
 * Layer order (back → front): sky gradient → striped retro sun → neon grid floor
 * (WebGL shader, or a CSS fallback) → marble statues → Win95 windows + cursor
 * motifs → scanlines + grain → occasional glitch sweep → readability veil.
 *
 * Motion/capability gating:
 *   - WebGL + desktop + motion-ok → animated shader grid floor.
 *   - otherwise (mobile / no-WebGL / reduced-motion / scene error) → CSS grid.
 *   - reduced-motion freezes every animation (CSS + the shader holds one frame).
 */
export default function CursorVaporwaveBackground() {
  const reduced = usePrefersReducedMotion();
  const isSmall = useIsSmallScreen();
  const [webglOK] = useState(detectWebGL);

  // Only spin up WebGL on a capable, motion-friendly desktop. Everything else
  // gets the cheap CSS grid (which is frozen under reduced motion via CSS).
  const use3D = webglOK && !isSmall && !reduced;

  const cssGrid = <div className="cvw__grid-fallback" aria-hidden="true" />;

  return (
    <div className="cvw" aria-hidden="true">
      {/* 1 — sky */}
      <div className="cvw__sky" />

      {/* 2 — retro sun with horizontal cut-out stripes + bloom */}
      <div className="cvw__sun">
        <span className="cvw__sun-disc" />
        <span className="cvw__sun-stripes" />
      </div>

      {/* 2b — neon horizon glow band (magenta → purple → cyan) */}
      <div className="cvw__horizon" />

      {/* 3 — neon perspective grid floor */}
      <div className="cvw__floor">
        {use3D ? (
          <ThreeErrorBoundary fallback={cssGrid}>
            <Suspense fallback={cssGrid}>
              <CursorVaporwaveScene reduced={reduced} />
            </Suspense>
          </ThreeErrorBoundary>
        ) : (
          cssGrid
        )}
      </div>

      {/* 4 — classical statue cutouts (public-domain / CC0). Large Roman hero head
              cropped by the right edge, Michelangelo's David bust cropped by the
              left edge, and a faint floating veiled-head fragment (hidden on small
              screens — see CSS). Each gets a neon rim + cool tint from CSS so it
              reads as a vaporwave collage. */}
      <div className="cvw__statues">
        <span className="cvw__statue cvw__statue--right">
          <img src={`${STATUES}/statue-right.png`} alt="" loading="lazy" decoding="async" />
        </span>
        <span className="cvw__statue cvw__statue--left">
          <img src={`${STATUES}/statue-left.png`} alt="" loading="lazy" decoding="async" />
        </span>
        <span className="cvw__statue cvw__statue--fragment">
          <img src={`${STATUES}/statue-fragment.png`} alt="" loading="lazy" decoding="async" />
        </span>
      </div>

      {/* 5 — floating Win95 windows + cursor / archive motifs */}
      <div className="cvw__windows">
        <RetroWindow title="CURSOR.ZIP" modifier="zip">
          <span className="cvw__icon cvw__icon--zip" />
          <span className="cvw__win-text">Extracting…</span>
          <span className="cvw__progress">
            <i style={{ width: "62%" }} />
          </span>
        </RetroWindow>

        <RetroWindow title="SYSTEM MESSAGE" modifier="sys">
          <span className="cvw__icon cvw__icon--warn" />
          <span className="cvw__win-text">Cursor.zip has stopped working</span>
          <span className="cvw__btn">OK</span>
        </RetroWindow>

        <RetroWindow title="SECRET_FILE.EXE" modifier="secret">
          <span className="cvw__icon cvw__icon--file" />
          <span className="cvw__win-text">Access ●●●●●●</span>
        </RetroWindow>

        <RetroWindow title="HELLO" modifier="hello">
          <span className="cvw__win-text cvw__win-text--big">:)</span>
        </RetroWindow>

        <span className="cvw__cursor cvw__cursor--a" />
        <span className="cvw__cursor cvw__cursor--b" />
      </div>

      {/* 6–8 — atmosphere: scanlines, grain, occasional glitch sweep */}
      <div className="cvw__scanlines" />
      <div className="cvw__grain" />
      <div className="cvw__glitch" />

      {/* 9 — readability veil: gently darkens the centre column behind the text */}
      <div className="cvw__veil" />
    </div>
  );
}
