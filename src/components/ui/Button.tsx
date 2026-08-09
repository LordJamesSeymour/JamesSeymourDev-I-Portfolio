import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "ghost";

interface ButtonProps {
  children: ReactNode;
  /** Internal route (renders a react-router Link). */
  to?: string;
  /** External URL (renders an <a> in a new tab). */
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  /** Adds a nested circular trailing arrow (button-in-button pattern). */
  arrow?: boolean;
  /** Extra class, e.g. "nav__cta". */
  className?: string;
}

export default function Button({
  children,
  to,
  href,
  onClick,
  variant = "primary",
  arrow = false,
  className,
}: ButtonProps) {
  const classes = ["btn", `btn--${variant}`, className].filter(Boolean).join(" ");

  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <span className="btn__icon" aria-hidden="true">
          ↗
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Link className={classes} to={to}>
        {content}
      </Link>
    );
  }
  if (href) {
    // Only open genuine external URLs in a new tab; in-page anchors (#, /#) and
    // mailto: links should navigate in place.
    const external = /^https?:\/\//i.test(href);
    const target = external ? "_blank" : undefined;
    const rel = external ? "noopener noreferrer" : undefined;
    return (
      <a className={classes} href={href} target={target} rel={rel}>
        {content}
      </a>
    );
  }
  return (
    <button className={classes} type="button" onClick={onClick}>
      {content}
    </button>
  );
}
