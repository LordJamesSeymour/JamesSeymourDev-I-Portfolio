import { useEffect, useRef } from "react";

/**
 * usePointerParallax — tasteful, GPU-safe pointer depth.
 *
 * Returns a ref to attach to a container. While the pointer moves, it writes two
 * unitless CSS custom properties on that element, each eased toward the target:
 *   --parx, --pary  in roughly [-1, 1]  (0 = centred / at rest)
 * Child layers consume them, e.g. `translate3d(calc(var(--parx) * 18px), ...)`,
 * using different multipliers to imply depth. No layout is read on the hot path
 * beyond a single getBoundingClientRect per pointer event, and motion is driven
 * by requestAnimationFrame with a lerp so it stays smooth.
 *
 * It is deliberately inert when it shouldn't run:
 *   - prefers-reduced-motion: reduce  → never attaches (vars stay 0).
 *   - coarse pointer / no hover (touch, most mobiles) → never attaches.
 * In both cases the composition renders as a clean static layout.
 */
export function usePointerParallax<T extends HTMLElement>(strength = 1) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (reduce.matches || !fine.matches) return;

    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let raf = 0;
    let running = false;

    const clamp = (n: number) => (n < -1 ? -1 : n > 1 ? 1 : n);

    const tick = () => {
      curX += (targetX - curX) * 0.09;
      curY += (targetY - curY) * 0.09;
      el.style.setProperty("--parx", curX.toFixed(4));
      el.style.setProperty("--pary", curY.toFixed(4));
      if (Math.abs(targetX - curX) > 0.0005 || Math.abs(targetY - curY) > 0.0005) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const kick = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // Normalise distance from the element centre by half the viewport so the
      // effect is gentle and consistent regardless of screen size.
      targetX = clamp((event.clientX - cx) / (window.innerWidth / 2)) * strength;
      targetY = clamp((event.clientY - cy) / (window.innerHeight / 2)) * strength;
      kick();
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      kick();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", onLeave);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", onLeave);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
      el.style.removeProperty("--parx");
      el.style.removeProperty("--pary");
    };
  }, [strength]);

  return ref;
}
