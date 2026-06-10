import { useEffect, useRef, useState } from "react";
import type { ElementType, ReactNode } from "react";

/**
 * Reveal — gentle scroll-entry animation (fade + lift + de-blur).
 *
 * Uses IntersectionObserver (never a scroll listener) so it's cheap on mobile, and
 * defers entirely to CSS for the motion (.reveal → .is-visible in globals.css), which
 * is disabled under prefers-reduced-motion. Content is in the DOM immediately and stays
 * readable even if JS/observer never runs — it just won't animate.
 */
interface RevealProps {
  children: ReactNode;
  /** Element to render (default div). Use "li", "section", etc. as needed. */
  as?: ElementType;
  /** Stagger this item's entrance, in ms. */
  delay?: number;
  className?: string;
}

export default function Reveal({
  children,
  as,
  delay = 0,
  className,
}: RevealProps) {
  const Tag = as ?? "div";
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cls = ["reveal", visible ? "is-visible" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag
      ref={ref}
      className={cls}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
