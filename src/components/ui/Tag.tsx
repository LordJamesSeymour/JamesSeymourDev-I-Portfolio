import type { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  /** Slightly stronger styling for category tags. */
  emphasis?: boolean;
}

export default function Tag({ children, emphasis = false }: TagProps) {
  return <span className={`tag${emphasis ? " tag--emphasis" : ""}`}>{children}</span>;
}
