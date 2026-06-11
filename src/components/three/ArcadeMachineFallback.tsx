import { MODEL_URL } from "./arcadeContent";

export type FallbackVariant = "missing" | "webgl" | "mobile" | "error";

interface ArcadeMachineFallbackProps {
  variant: FallbackVariant;
  /** Technical chips to surface so the section still communicates without 3D. */
  callouts: string[];
}

/** Per-variant heading + supporting line. Kept recruiter-friendly and on-brand. */
function copyFor(variant: FallbackVariant): { title: string; note: string; tone: "info" | "action" } {
  switch (variant) {
    case "missing":
      return {
        title: "3D model not found",
        note: `Copy the assembled cabinet to public${MODEL_URL} to enable the scroll-driven reveal. The rest of the site works without it.`,
        tone: "action",
      };
    case "webgl":
      return {
        title: "Arcade Machine build",
        note: "Your browser has 3D rendering disabled, so here's the static overview of what this project demonstrates.",
        tone: "info",
      };
    case "mobile":
      return {
        title: "Arcade Machine build",
        note: "A static overview is shown here to keep things smooth on mobile. Open on a larger screen for the interactive 3D reveal.",
        tone: "info",
      };
    case "error":
    default:
      return {
        title: "Arcade Machine build",
        note: "The interactive 3D view couldn't start, so here's the static overview of the project.",
        tone: "info",
      };
  }
}

/**
 * Polished, premium static stand-in for the 3D stage. Shown when WebGL is
 * unavailable, on mobile, if the GLB is missing, or if the canvas errors — so
 * the section always reads as a deliberate showcase, never a broken viewer.
 */
export default function ArcadeMachineFallback({ variant, callouts }: ArcadeMachineFallbackProps) {
  const { title, note, tone } = copyFor(variant);

  return (
    <div className={`amx__fallback amx__fallback--${tone}`} role="img" aria-label="Arcade machine build overview">
      <div className="amx__fallback-glyph" aria-hidden="true">
        <span className="amx__glyph-marquee" />
        <span className="amx__glyph-screen" />
        <span className="amx__glyph-panel" />
      </div>
      <div className="amx__fallback-body">
        <h3 className="amx__fallback-title">{title}</h3>
        <p className="amx__fallback-note">{note}</p>
        <ul className="amx__fallback-chips">
          {callouts.map((c) => (
            <li key={c} className="tag">
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
