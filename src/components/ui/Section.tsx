import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  /** Anchor id for in-page navigation. */
  id?: string;
  title?: string;
  subtitle?: string;
  /** Adds a subtle alternating background. */
  muted?: boolean;
}

export default function Section({ children, id, title, subtitle, muted = false }: SectionProps) {
  return (
    <section id={id} className={`section${muted ? " section--muted" : ""}`}>
      <div className="container">
        {title && <h2 className="section__title">{title}</h2>}
        {subtitle && <p className="section__subtitle">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
