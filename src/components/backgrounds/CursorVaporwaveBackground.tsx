import { Suspense, lazy, memo, useEffect, useMemo, useState } from "react";
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
const OPTIMIZED_STATUES = `${STATUES}/optimized`;

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

function detectLowPowerDevice(isSmall: boolean): boolean {
  if (isSmall) return true;
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;
  const nav = navigator as Navigator & { deviceMemory?: number };
  const reducedData =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-data: reduce)").matches;
  return reducedData || (nav.deviceMemory ?? 8) <= 4 || (nav.hardwareConcurrency ?? 8) <= 4;
}

function useLowPowerMode(isSmall: boolean): boolean {
  const [lowPower, setLowPower] = useState(() => detectLowPowerDevice(isSmall));

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      setLowPower(detectLowPowerDevice(isSmall));
      return;
    }

    const mql = window.matchMedia("(prefers-reduced-data: reduce)");
    const update = () => setLowPower(detectLowPowerDevice(isSmall));
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [isSmall]);

  return lowPower;
}

function isCursorMotionActive() {
  if (typeof window === "undefined" || typeof document === "undefined") return false;
  const idleAfter = Math.max(window.innerHeight * 1.25, 900);
  return document.visibilityState === "visible" && window.scrollY < idleAfter;
}

function useCursorMotionActive(reduced: boolean): boolean {
  const [active, setActive] = useState(() => !reduced && isCursorMotionActive());

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    if (reduced) {
      setActive(false);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const next = isCursorMotionActive();
      setActive((current) => (current === next ? current : next));
    };
    const requestUpdate = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    document.addEventListener("visibilitychange", requestUpdate);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      document.removeEventListener("visibilitychange", requestUpdate);
    };
  }, [reduced]);

  return active;
}

interface DecorativeStatueProps {
  className: string;
  webp: string;
  png: string;
  width: number;
  height: number;
}

const DecorativeStatue = memo(function DecorativeStatue({
  className,
  webp,
  png,
  width,
  height,
}: DecorativeStatueProps) {
  return (
    <span className={className}>
      <picture>
        <source srcSet={`${OPTIMIZED_STATUES}/${webp}`} type="image/webp" />
        <img
          src={`${STATUES}/${png}`}
          alt=""
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
        />
      </picture>
    </span>
  );
});

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
function CursorVaporwaveBackground() {
  const reduced = usePrefersReducedMotion();
  const isSmall = useIsSmallScreen();
  const lowPower = useLowPowerMode(isSmall);
  const active = useCursorMotionActive(reduced);
  const [webglOK] = useState(detectWebGL);

  // Only spin up WebGL on a capable, motion-friendly desktop. Everything else
  // gets the cheap CSS grid (which is frozen under reduced motion via CSS).
  const use3D = webglOK && !lowPower && !reduced;

  const cssGrid = useMemo(
    () => <div className="cvw__grid-fallback" aria-hidden="true" />,
    [],
  );

  return (
    <div
      className={`cvw${active ? "" : " cvw--paused"}${
        lowPower ? " cvw--low-power" : ""
      }`}
      aria-hidden="true"
    >
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
              <CursorVaporwaveScene active={active} reduced={reduced} />
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
        <DecorativeStatue
          className="cvw__statue cvw__statue--right"
          webp="statue-right.webp"
          png="statue-right.png"
          width={463}
          height={457}
        />
        <DecorativeStatue
          className="cvw__statue cvw__statue--left"
          webp="statue-left-520.webp"
          png="statue-left.png"
          width={520}
          height={687}
        />
        <DecorativeStatue
          className="cvw__statue cvw__statue--fragment"
          webp="statue-fragment.webp"
          png="statue-fragment.png"
          width={299}
          height={268}
        />
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

export default memo(CursorVaporwaveBackground);
