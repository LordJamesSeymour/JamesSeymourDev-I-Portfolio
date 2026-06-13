import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { resolvePublicAssetPath } from "../../lib/assets";
import {
  clampedFrameAt,
  loopFrameAt,
  makeFramePaths,
} from "./spriteFrames";
import "./SuperBombermanSpriteShowcase.css";

interface SuperBombermanSpriteShowcaseProps {
  preview: ReactNode;
  children: ReactNode;
}

type PlayerSequenceState = "walk" | "hold" | "punch" | "hidden";

const SPRITE_ROOT = "/SuperBomberman/Sprites";
const LOOP_MS = 10_000;
const BOMB_APPEAR_MS = 1_800;
const PUNCH_START_MS = 2_800;
const BOMB_FLIGHT_START_MS = 3_400;
const BOMB_IMPACT_MS = 6_500;
const EXPLOSION_END_MS = 7_600;
const PLAYER_HIDE_MS = 8_000;
const BOMB_START = { x: 36, y: 3.6 };
const BOMB_END = { x: 97.3, y: 3.6 };

const PLAYER_WALK_RIGHT_FRAMES = makeFramePaths(
  SPRITE_ROOT,
  "Player/WalkRight",
  "PlayerRight",
  3,
);
const PLAYER_WALK_LEFT_FRAMES = makeFramePaths(
  SPRITE_ROOT,
  "Player/WalkLeft",
  "PlayerLeft",
  3,
);
const PLAYER_PUNCH_RIGHT = resolvePublicAssetPath(
  `${SPRITE_ROOT}/Player/Punch/punchright.png`,
);
const BOMB_FRAMES = makeFramePaths(SPRITE_ROOT, "Bomb", "bomb", 3);
const CHOMPER_FRAMES = makeFramePaths(
  SPRITE_ROOT,
  "Chomper",
  "ChomperFront",
  10,
);
const EXPLOSION_CENTER_FRAMES = makeFramePaths(
  SPRITE_ROOT,
  "Explosion/Center",
  "center",
  4,
);
const EXPLOSION_HORIZONTAL_FRAMES = makeFramePaths(
  SPRITE_ROOT,
  "Explosion/Horizontal",
  "horizontal",
  4,
);
const EXPLOSION_HORIZONTAL_END_FRAMES = makeFramePaths(
  SPRITE_ROOT,
  "Explosion/HorizontalEnd",
  "horizontalEnd",
  4,
);
const EXPLOSION_VERTICAL_FRAMES = makeFramePaths(
  SPRITE_ROOT,
  "Explosion/Vertical",
  "vertical",
  4,
);
const EXPLOSION_VERTICAL_END_FRAMES = makeFramePaths(
  SPRITE_ROOT,
  "Explosion/VerticalEnd",
  "verticalEnd",
  4,
);
const ALL_FRAMES = [
  ...PLAYER_WALK_RIGHT_FRAMES,
  ...PLAYER_WALK_LEFT_FRAMES,
  PLAYER_PUNCH_RIGHT,
  ...BOMB_FRAMES,
  ...CHOMPER_FRAMES,
  ...EXPLOSION_CENTER_FRAMES,
  ...EXPLOSION_HORIZONTAL_FRAMES,
  ...EXPLOSION_HORIZONTAL_END_FRAMES,
  ...EXPLOSION_VERTICAL_FRAMES,
  ...EXPLOSION_VERTICAL_END_FRAMES,
];

function playerStateAt(elapsedMs: number): PlayerSequenceState {
  if (elapsedMs < BOMB_APPEAR_MS) return "walk";
  if (elapsedMs < PUNCH_START_MS) return "hold";
  if (elapsedMs < BOMB_FLIGHT_START_MS + 350) return "punch";
  if (elapsedMs < PLAYER_HIDE_MS) return "hold";
  return "hidden";
}

function bombPoseAt(progress: number) {
  const amount = Math.min(1, Math.max(0, progress));
  return {
    x: BOMB_START.x + (BOMB_END.x - BOMB_START.x) * amount,
    y: BOMB_START.y + (BOMB_END.y - BOMB_START.y) * amount,
  };
}

export default function SuperBombermanSpriteShowcase({
  preview,
  children,
}: SuperBombermanSpriteShowcaseProps) {
  const reduceMotion = usePrefersReducedMotion();
  const [sequenceEnabled, setSequenceEnabled] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia("(min-width: 1061px)").matches,
  );
  const [elapsedMs, setElapsedMs] = useState(0);
  const sequenceRef = useRef<HTMLDivElement>(null);
  const bombCarrierRef = useRef<HTMLSpanElement>(null);
  const preloadersRef = useRef<HTMLImageElement[]>([]);

  const playerState = reduceMotion ? "hold" : playerStateAt(elapsedMs);
  const playerFrame =
    playerState === "punch"
      ? PLAYER_PUNCH_RIGHT
      : playerState === "walk"
        ? loopFrameAt(PLAYER_WALK_RIGHT_FRAMES, elapsedMs, 150)
        : PLAYER_WALK_RIGHT_FRAMES[0];
  const explosionVisible =
    !reduceMotion &&
    elapsedMs >= BOMB_IMPACT_MS &&
    elapsedMs < EXPLOSION_END_MS;
  const explosionElapsed = Math.max(0, elapsedMs - BOMB_IMPACT_MS);
  const explosionFrameDuration = 180;

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1061px)");
    const updateSequenceAvailability = (event: MediaQueryListEvent) => {
      setSequenceEnabled(event.matches);
    };

    setSequenceEnabled(query.matches);
    query.addEventListener("change", updateSequenceAvailability);
    return () =>
      query.removeEventListener("change", updateSequenceAvailability);
  }, []);

  useEffect(() => {
    if (reduceMotion || !sequenceEnabled) return;

    preloadersRef.current = ALL_FRAMES.map((src) => {
      const image = new Image();
      image.src = src;
      return image;
    });

    return () => {
      preloadersRef.current = [];
    };
  }, [reduceMotion, sequenceEnabled]);

  useEffect(() => {
    if (
      reduceMotion ||
      !sequenceEnabled ||
      !sequenceRef.current ||
      !bombCarrierRef.current
    ) {
      setElapsedMs(0);
      return;
    }

    const sequence = sequenceRef.current;
    const bombCarrier = bombCarrierRef.current;
    const startedAt = performance.now();
    let sequenceWidth = sequence.clientWidth;
    let sequenceHeight = sequence.clientHeight;
    let animationFrame = 0;
    let lastSpriteUpdate = 0;
    const resizeObserver = new ResizeObserver(([entry]) => {
      sequenceWidth = entry.contentRect.width;
      sequenceHeight = entry.contentRect.height;
    });
    resizeObserver.observe(sequence);

    const positionBomb = (x: number, y: number, opacity: number) => {
      bombCarrier.style.transform = `translate3d(${
        (sequenceWidth * x) / 100
      }px, ${(sequenceHeight * y) / 100}px, 0)`;
      bombCarrier.style.opacity = String(opacity);
    };

    const animate = (now: number) => {
      const elapsed = (now - startedAt) % LOOP_MS;

      if (elapsed < BOMB_APPEAR_MS || elapsed >= BOMB_IMPACT_MS) {
        positionBomb(BOMB_START.x, BOMB_START.y, 0);
      } else if (elapsed < BOMB_FLIGHT_START_MS) {
        positionBomb(BOMB_START.x, BOMB_START.y, 1);
      } else {
        const flightProgress =
          (elapsed - BOMB_FLIGHT_START_MS) /
          (BOMB_IMPACT_MS - BOMB_FLIGHT_START_MS);
        const pose = bombPoseAt(flightProgress);
        positionBomb(pose.x, pose.y, 1);
      }

      if (now - lastSpriteUpdate >= 80) {
        setElapsedMs(elapsed);
        lastSpriteUpdate = now;
      }

      animationFrame = window.requestAnimationFrame(animate);
    };

    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      bombCarrier.removeAttribute("style");
    };
  }, [reduceMotion, sequenceEnabled]);

  return (
    <div
      className={`project-detail__playable-media sb-showcase${
        reduceMotion ? " sb-showcase--reduced" : ""
      }`}
    >
      <span
        className="sb-showcase__side sb-showcase__side--player"
        aria-hidden="true"
      >
        <img
          src={loopFrameAt(PLAYER_WALK_LEFT_FRAMES, elapsedMs, 170)}
          alt=""
          draggable={false}
        />
      </span>

      <span
        className="sb-showcase__side sb-showcase__side--chomper"
        aria-hidden="true"
      >
        <img
          src={loopFrameAt(CHOMPER_FRAMES, elapsedMs, 125)}
          alt=""
          draggable={false}
        />
      </span>

      <section
        className="project-detail__media-section"
        aria-labelledby="bomberman-preview-heading"
      >
        <div className="project-detail__showcase-head">
          <h2 id="bomberman-preview-heading">Gameplay Preview</h2>
        </div>

        <div className="sb-showcase__preview-stage">
          <div className="project-detail__media project-detail__media--playable-video">
            {preview}
          </div>

          <div ref={sequenceRef} className="sb-sequence" aria-hidden="true">
            <span
              className="sb-sequence__player"
              data-state={playerState}
            >
              <img src={playerFrame} alt="" draggable={false} />
            </span>

            <span
              ref={bombCarrierRef}
              className="sb-sequence__bomb-carrier"
              data-phase={
                elapsedMs >= BOMB_FLIGHT_START_MS &&
                elapsedMs < BOMB_IMPACT_MS
                  ? "flying"
                  : "placed"
              }
            >
              <span className="sb-sequence__bomb">
                <img
                  src={loopFrameAt(BOMB_FRAMES, elapsedMs, 170)}
                  alt=""
                  draggable={false}
                />
              </span>
            </span>

          </div>

          {explosionVisible && (
            <span className="sb-sequence__explosion" aria-hidden="true">
              <span className="sb-sequence__blast-part sb-sequence__blast-part--center">
                <img
                  src={clampedFrameAt(
                    EXPLOSION_CENTER_FRAMES,
                    explosionElapsed,
                    explosionFrameDuration,
                  )}
                  alt=""
                  draggable={false}
                />
              </span>
              <span className="sb-sequence__blast-part sb-sequence__blast-part--horizontal">
                <img
                  src={clampedFrameAt(
                    EXPLOSION_HORIZONTAL_FRAMES,
                    explosionElapsed,
                    explosionFrameDuration,
                  )}
                  alt=""
                  draggable={false}
                />
              </span>
              <span className="sb-sequence__blast-part sb-sequence__blast-part--horizontal-end">
                <img
                  src={clampedFrameAt(
                    EXPLOSION_HORIZONTAL_END_FRAMES,
                    explosionElapsed,
                    explosionFrameDuration,
                  )}
                  alt=""
                  draggable={false}
                />
              </span>
              <span className="sb-sequence__blast-part sb-sequence__blast-part--horizontal-right">
                <img
                  src={clampedFrameAt(
                    EXPLOSION_HORIZONTAL_FRAMES,
                    explosionElapsed,
                    explosionFrameDuration,
                  )}
                  alt=""
                  draggable={false}
                />
              </span>
              <span className="sb-sequence__blast-part sb-sequence__blast-part--horizontal-end-right">
                <img
                  src={clampedFrameAt(
                    EXPLOSION_HORIZONTAL_END_FRAMES,
                    explosionElapsed,
                    explosionFrameDuration,
                  )}
                  alt=""
                  draggable={false}
                />
              </span>
              <span className="sb-sequence__blast-part sb-sequence__blast-part--vertical">
                <img
                  src={clampedFrameAt(
                    EXPLOSION_VERTICAL_FRAMES,
                    explosionElapsed,
                    explosionFrameDuration,
                  )}
                  alt=""
                  draggable={false}
                />
              </span>
              <span className="sb-sequence__blast-part sb-sequence__blast-part--vertical-end">
                <img
                  src={clampedFrameAt(
                    EXPLOSION_VERTICAL_END_FRAMES,
                    explosionElapsed,
                    explosionFrameDuration,
                  )}
                  alt=""
                  draggable={false}
                />
              </span>
              <span className="sb-sequence__blast-part sb-sequence__blast-part--vertical-bottom">
                <img
                  src={clampedFrameAt(
                    EXPLOSION_VERTICAL_FRAMES,
                    explosionElapsed,
                    explosionFrameDuration,
                  )}
                  alt=""
                  draggable={false}
                />
              </span>
              <span className="sb-sequence__blast-part sb-sequence__blast-part--vertical-end-bottom">
                <img
                  src={clampedFrameAt(
                    EXPLOSION_VERTICAL_END_FRAMES,
                    explosionElapsed,
                    explosionFrameDuration,
                  )}
                  alt=""
                  draggable={false}
                />
              </span>
            </span>
          )}
        </div>
      </section>

      {children}
    </div>
  );
}
