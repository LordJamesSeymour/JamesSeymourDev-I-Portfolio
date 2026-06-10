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
}

export default function Button({ children, to, href, onClick, variant = "primary" }: ButtonProps) {
  const className = `btn btn--${variant}`;

  if (to) {
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <button className={className} type="button" onClick={onClick}>
      {children}
    </button>
  );
}
