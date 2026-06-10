import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

/**
 * ParticleField — the cosmos background (DESIGN.md: "particle constellation on a void").
 *
 * A single lightweight 2D <canvas> of drifting micro-particles in the brand palette,
 * fixed behind all content. Deliberately NOT WebGL/R3F (that's Phase 3) — this is the
 * cheap "premium at almost no asset cost" layer.
 *
 * Safety / performance:
 *  - reduced-motion → renders ONE static frame (no animation loop).
 *  - pauses when the tab is hidden (visibilitychange) to save battery.
 *  - particle count scales with viewport area and is hard-capped.
 *  - clamps devicePixelRatio to 2; animates on requestAnimationFrame only.
 *  - purely decorative → aria-hidden, pointer-events: none (set on the container).
 */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  alpha: number;
}

const COLORS = ["#8052ff", "#ffffff", "#1f9d83", "#ffb829"];
const MAX_PARTICLES = 130;

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let rafId = 0;
    let running = true;

    const seed = () => {
      const target = Math.min(
        MAX_PARTICLES,
        Math.round((width * height) / 16000),
      );
      particles = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: Math.random() * 1.6 + 0.4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: Math.random() * 0.5 + 0.2,
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const step = () => {
      if (!running) return;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -5) p.x = width + 5;
        else if (p.x > width + 5) p.x = -5;
        if (p.y < -5) p.y = height + 5;
        else if (p.y > height + 5) p.y = -5;
      }
      draw();
      rafId = requestAnimationFrame(step);
    };

    resize();

    if (reduceMotion) {
      // Static constellation — paint once, never animate.
      draw();
    } else {
      rafId = requestAnimationFrame(step);
    }

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafId);
      } else if (!reduceMotion) {
        running = true;
        rafId = requestAnimationFrame(step);
      }
    };

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduceMotion]);

  return (
    <div className="cosmos" aria-hidden="true">
      <canvas ref={canvasRef} className="cosmos__canvas" />
    </div>
  );
}
