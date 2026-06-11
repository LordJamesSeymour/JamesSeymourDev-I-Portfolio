import { lazy, Suspense, useEffect, useRef, useState } from "react";
import Reveal from "../visual/Reveal";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import ArcadeMachineFallback from "./ArcadeMachineFallback";
import type { FallbackVariant } from "./ArcadeMachineFallback";
import ThreeErrorBoundary from "./ThreeErrorBoundary";
import { ARCADE_INTRO, CALLOUTS, CALLOUT_CHIPS, MODEL_URL } from "./arcadeContent";

// Code-split the entire three.js scene — it only downloads when this section is
// near the viewport (gated by `hasEntered` below), keeping initial load light.
const ArcadeMachineScene = lazy(() => import("./ArcadeMachineScene"));

/** One-time WebGL capability probe. */
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

/** Tracks a small-viewport (mobile/tablet) breakpoint. */
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

/** Loading shimmer shown while the 3D chunk / model streams in. */
function StageLoading() {
  return (
    <div className="amx__loading" aria-hidden="true">
      <span className="amx__spinner" />
      <span className="amx__loading-text">Assembling 3D model…</span>
    </div>
  );
}

export default function ArcadeMachineReveal() {
  const reduced = usePrefersReducedMotion();
  const isSmall = useIsSmallScreen();
  const [webglOK] = useState(detectWebGL);

  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const activeRef = useRef(false);

  const [hasEntered, setHasEntered] = useState(false);
  const [stage, setStage] = useState(0);
  const [modelStatus, setModelStatus] = useState<"idle" | "ok" | "missing">("idle");
  const headCheckedRef = useRef(false);

  // Will we attempt real 3D? (capable desktop). Scrubbing also needs motion allowed.
  const wants3D = webglOK && !isSmall;
  const scrub = wants3D && !reduced;

  // Resolve the rendering mode. A missing GLB downgrades to the fallback panel.
  let mode: "scroll" | "static" | "fallback";
  let fbVariant: FallbackVariant = "error";
  if (!webglOK) {
    mode = "fallback";
    fbVariant = "webgl";
  } else if (isSmall) {
    mode = "fallback";
    fbVariant = "mobile";
  } else if (modelStatus === "missing") {
    mode = "fallback";
    fbVariant = "missing";
  } else if (reduced) {
    mode = "static";
  } else {
    mode = "scroll";
  }

  // Mount the lazy scene once the section approaches the viewport.
  useEffect(() => {
    if (!wants3D) return;
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setHasEntered(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "500px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [wants3D]);

  // Verify the model exists before mounting the canvas (clean "copy the file"
  // message instead of a console error if it's absent). Guarded by a ref — not
  // `modelStatus` — so the resulting state update can't re-run this effect and
  // abort its own in-flight request (which would wedge it on "loading").
  useEffect(() => {
    if (!wants3D || !hasEntered || headCheckedRef.current) return;
    headCheckedRef.current = true;
    fetch(MODEL_URL, { method: "HEAD" })
      .then((res) => setModelStatus(res.ok ? "ok" : "missing"))
      .catch(() => setModelStatus("missing"));
  }, [wants3D, hasEntered]);

  // Scroll → progress (scrub mode only). rAF-throttled, passive, ref-driven so
  // scrolling never re-renders React; only the active callout `stage` does.
  useEffect(() => {
    if (!scrub) {
      progressRef.current = 0;
      activeRef.current = true; // static mode still renders the assembled model
      return;
    }
    const el = scrollRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const scrolled = -rect.top;
      const p = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
      progressRef.current = p;
      activeRef.current = rect.bottom > 0 && rect.top < vh;

      let idx = 0;
      for (let i = 0; i < CALLOUTS.length; i += 1) {
        if (p >= CALLOUTS[i].at) idx = i;
      }
      setStage((s) => (s === idx ? s : idx));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [scrub]);

  const active = CALLOUTS[stage] ?? CALLOUTS[0];

  // The 3D canvas (or its loading/missing state) — shared by scroll + static modes.
  const canvas =
    hasEntered && modelStatus === "ok" ? (
      <ThreeErrorBoundary fallback={<ArcadeMachineFallback variant="error" callouts={CALLOUT_CHIPS} />}>
        <Suspense fallback={<StageLoading />}>
          <ArcadeMachineScene progressRef={progressRef} activeRef={activeRef} reduced={reduced} />
        </Suspense>
      </ThreeErrorBoundary>
    ) : (
      <StageLoading />
    );

  return (
    <section
      id="arcade-build"
      ref={sectionRef}
      className="section amx"
      aria-labelledby="arcade-build-title"
    >
      <div className="container">
        <Reveal as="header" className="section__head amx__head">
          <span className="kicker">Technical Showcase</span>
          <h2 id="arcade-build-title" className="section__title">
            Inside the Arcade Machine
          </h2>
          <p className="section__subtitle">{ARCADE_INTRO}</p>
        </Reveal>
      </div>

      {mode === "scroll" && (
        // Tall track: the stage pins (sticky) while progress scrubs 0 → 1.
        <div ref={scrollRef} className="amx__scroll">
          <div className="amx__sticky">
            <div className="container amx__layout">
              <div className="amx__stage">
                {canvas}
                <div className="amx__hud" aria-hidden="true">
                  <span className="amx__hud-label">Exploded view</span>
                  <span className="amx__hud-track">
                    <span
                      className="amx__hud-fill"
                      style={{ transform: `scaleX(${active.at})` }}
                    />
                  </span>
                </div>
              </div>
              <aside className="amx__rail">
                <ol className="amx__steps">
                  {CALLOUTS.map((c, i) => (
                    <li
                      key={c.title}
                      className={`amx__step${i === stage ? " is-active" : ""}${
                        i < stage ? " is-done" : ""
                      }`}
                    >
                      <span className="amx__step-dot" aria-hidden="true" />
                      <span className="amx__step-label">{c.title}</span>
                    </li>
                  ))}
                </ol>
                <div className="amx__callout" key={active.title}>
                  <h3 className="amx__callout-title">{active.title}</h3>
                  <p className="amx__callout-body">{active.body}</p>
                </div>
              </aside>
            </div>
          </div>
        </div>
      )}

      {mode === "static" && (
        <div className="container amx__layout amx__layout--static">
          <div className="amx__stage amx__stage--static">{canvas}</div>
          <aside className="amx__rail">
            <ul className="amx__static-list">
              {CALLOUTS.map((c) => (
                <li key={c.title} className="amx__static-item">
                  <h3 className="amx__callout-title">{c.title}</h3>
                  <p className="amx__callout-body">{c.body}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      )}

      {mode === "fallback" && (
        <div className="container">
          <ArcadeMachineFallback variant={fbVariant} callouts={CALLOUT_CHIPS} />
        </div>
      )}
    </section>
  );
}
