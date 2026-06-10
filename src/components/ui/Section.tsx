import type { ReactNode } from "react";
import Reveal from "../visual/Reveal";

interface SectionProps {
  children: ReactNode;
  /** Anchor id for in-page navigation. */
  id?: string;
  /** Small uppercase kicker above the title. */
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  /** Adds a subtle alternating background. */
  muted?: boolean;
  /** Center the section header. */
  center?: boolean;
}

export default function Section({
  children,
  id,
  eyebrow,
  title,
  subtitle,
  muted = false,
  center = false,
}: SectionProps) {
  const className = [
    "section",
    muted ? "section--muted" : "",
    center ? "section--center" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={className}>
      <div className="container">
        {(eyebrow || title || subtitle) && (
          <Reveal as="header" className="section__head">
            {eyebrow && <span className="kicker">{eyebrow}</span>}
            {title && <h2 className="section__title">{title}</h2>}
            {subtitle && <p className="section__subtitle">{subtitle}</p>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
