import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { resolvePublicAssetPath } from "../../lib/assets";
import "./SurfersQuestSpriteShowcase.css";

interface SurfersQuestSpriteShowcaseProps {
  preview: ReactNode;
  children: ReactNode;
}

type PlayerState = "idle" | "run" | "fall" | "wall-grab";
interface RouteKeyframe {
  offset: number;
  x: number;
  y: number;
  opacity: number;
}

const ROUTE_CYCLE_MS = 18_000;
const SPAWN_RUN_START_MS = 700;
const EDGE_FALL_START_MS = 5_900;
const WALL_GRAB_START_MS = 6_700;
const WALL_GRAB_END_MS = 9_300;
const EXIT_REACHED_MS = 12_500;
const ROUTE_KEYFRAMES: RouteKeyframe[] = [
  { offset: 0, x: 30, y: 0, opacity: 0 },
  { offset: 0.025, x: 30, y: 0, opacity: 1 },
  { offset: 0.05, x: 30, y: 0, opacity: 1 },
  { offset: 0.18, x: 44, y: 0, opacity: 1 },
  { offset: 0.3, x: 91, y: 0, opacity: 1 },
  { offset: 0.328, x: 94.4, y: 0, opacity: 1 },
  { offset: 0.344, x: 94.4, y: 0, opacity: 1 },
  { offset: 0.372, x: 94.4, y: 14, opacity: 1 },
  { offset: 0.5, x: 94.4, y: 72, opacity: 1 },
  { offset: 0.517, x: 94.4, y: 78, opacity: 1 },
  { offset: 0.55, x: 91, y: 96, opacity: 1 },
  { offset: 0.69, x: 78, y: 96, opacity: 1 },
  { offset: 0.72, x: 78, y: 96, opacity: 0 },
  { offset: 1, x: 78, y: 96, opacity: 0 },
];

const makeFrames = (folder: string, basename: string, count: number) =>
  Array.from({ length: count }, (_, index) =>
    resolvePublicAssetPath(
      `/SurfersQuest/Sprites/${folder}/${basename}_${index}.png`,
    ),
  );

const PLAYER_IDLE_FRAMES = makeFrames("Player/Idle", "player", 11);
const PLAYER_RUN_FRAMES = makeFrames("Player/Run", "PlayerRun", 12);
const PLAYER_WALL_GRAB_FRAMES = makeFrames(
  "Player/WallGrab",
  "PlayerWallgrab",
  5,
);
const PLAYER_FALL_FRAMES = makeFrames("Player/Fall", "PlayerFall", 1);
const FROG_IDLE_FRAMES = makeFrames("FrogIdle", "Player", 11);
const MELON_FRAMES = makeFrames("Melon", "Melon", 17);
const CHERRY_FRAMES = makeFrames("Cherry", "Cherries", 17);
const ALL_SPRITE_FRAMES = [
  ...PLAYER_IDLE_FRAMES,
  ...PLAYER_RUN_FRAMES,
  ...PLAYER_FALL_FRAMES,
  ...PLAYER_WALL_GRAB_FRAMES,
  ...FROG_IDLE_FRAMES,
  ...MELON_FRAMES,
  ...CHERRY_FRAMES,
];

function frameAt(frames: string[], elapsedMs: number, frameDurationMs: number) {
  return frames[Math.floor(elapsedMs / frameDurationMs) % frames.length];
}

function playerStateAt(elapsedMs: number): PlayerState {
  if (elapsedMs < SPAWN_RUN_START_MS || elapsedMs >= EXIT_REACHED_MS) {
    return "idle";
  }
  if (elapsedMs < EDGE_FALL_START_MS) return "run";
  if (elapsedMs < WALL_GRAB_START_MS) return "fall";
  if (elapsedMs < WALL_GRAB_END_MS) return "wall-grab";
  return "run";
}

function routePoseAt(progress: number) {
  const nextIndex = ROUTE_KEYFRAMES.findIndex(
    (keyframe) => keyframe.offset >= progress,
  );
  const next = ROUTE_KEYFRAMES[Math.max(nextIndex, 1)];
  const previous = ROUTE_KEYFRAMES[Math.max(nextIndex - 1, 0)];
  const span = Math.max(next.offset - previous.offset, Number.EPSILON);
  const amount = Math.min(
    1,
    Math.max(0, (progress - previous.offset) / span),
  );

  return {
    x: previous.x + (next.x - previous.x) * amount,
    y: previous.y + (next.y - previous.y) * amount,
    opacity:
      previous.opacity + (next.opacity - previous.opacity) * amount,
  };
}

export default function SurfersQuestSpriteShowcase({
  preview,
  children,
}: SurfersQuestSpriteShowcaseProps) {
  const reduceMotion = usePrefersReducedMotion();
  const [routeEnabled, setRouteEnabled] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia("(min-width: 701px)").matches,
  );
  const [elapsedMs, setElapsedMs] = useState(0);
  const routeRef = useRef<HTMLDivElement>(null);
  const playerCarrierRef = useRef<HTMLSpanElement>(null);
  const pickupRef = useRef<HTMLSpanElement>(null);
  const preloadersRef = useRef<HTMLImageElement[]>([]);
  const playerState = playerStateAt(elapsedMs);
  const isReturnRun =
    elapsedMs >= WALL_GRAB_END_MS && elapsedMs < EXIT_REACHED_MS;
  const isExitActive =
    elapsedMs >= 11_800 && elapsedMs < EXIT_REACHED_MS + 500;

  const playerFrames =
    playerState === "wall-grab"
      ? PLAYER_WALL_GRAB_FRAMES
      : playerState === "fall"
        ? PLAYER_FALL_FRAMES
        : playerState === "run"
          ? PLAYER_RUN_FRAMES
          : PLAYER_IDLE_FRAMES;
  const playerFrameDuration = playerState === "wall-grab" ? 150 : 95;

  useEffect(() => {
    const query = window.matchMedia("(min-width: 701px)");
    const updateRouteAvailability = (event: MediaQueryListEvent) => {
      setRouteEnabled(event.matches);
    };

    setRouteEnabled(query.matches);
    query.addEventListener("change", updateRouteAvailability);
    return () => query.removeEventListener("change", updateRouteAvailability);
  }, []);

  useEffect(() => {
    if (reduceMotion || !routeEnabled) return;

    preloadersRef.current = ALL_SPRITE_FRAMES.map((src) => {
      const image = new Image();
      image.src = src;
      return image;
    });

    return () => {
      preloadersRef.current = [];
    };
  }, [reduceMotion, routeEnabled]);

  useEffect(() => {
    if (
      reduceMotion ||
      !routeEnabled ||
      !routeRef.current ||
      !playerCarrierRef.current ||
      !pickupRef.current
    ) {
      setElapsedMs(0);
      return;
    }

    const route = routeRef.current;
    const carrier = playerCarrierRef.current;
    const pickup = pickupRef.current;
    const startedAt = performance.now();
    let routeWidth = route.clientWidth;
    let routeHeight = route.clientHeight;
    let animationFrame = 0;
    let lastSpriteUpdate = 0;
    const resizeObserver = new ResizeObserver(([entry]) => {
      routeWidth = entry.contentRect.width;
      routeHeight = entry.contentRect.height;
    });
    resizeObserver.observe(route);

    const animate = (now: number) => {
      const elapsed = (now - startedAt) % ROUTE_CYCLE_MS;
      const progress = elapsed / ROUTE_CYCLE_MS;
      const pose = routePoseAt(progress);

      carrier.style.transform = `translate3d(${
        (routeWidth * pose.x) / 100
      }px, ${(routeHeight * pose.y) / 100}px, 0)`;
      carrier.style.opacity = String(pose.opacity);

      if (progress < 0.165) {
        pickup.style.opacity = "1";
        pickup.style.filter = "brightness(1)";
      } else if (progress < 0.18) {
        pickup.style.opacity = "1";
        pickup.style.filter = "brightness(1.9)";
      } else if (progress < 0.205) {
        pickup.style.opacity = String(1 - (progress - 0.18) / 0.025);
        pickup.style.filter = "brightness(1.9)";
      } else {
        pickup.style.opacity = "0";
        pickup.style.filter = "brightness(1)";
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
      carrier.removeAttribute("style");
      pickup.removeAttribute("style");
    };
  }, [reduceMotion, routeEnabled]);

  return (
    <div
      className={`project-detail__surfers-media sq-showcase${
        reduceMotion ? " sq-showcase--reduced" : ""
      }`}
    >
      <span className="sq-showcase__side sq-showcase__side--frog" aria-hidden="true">
        <img
          src={frameAt(FROG_IDLE_FRAMES, elapsedMs, 180)}
          alt=""
          draggable={false}
        />
      </span>

      <span className="sq-showcase__side sq-showcase__side--melon" aria-hidden="true">
        <span className="sq-showcase__crop sq-showcase__crop--melon">
          <img
            src={frameAt(MELON_FRAMES, elapsedMs, 115)}
            alt=""
            draggable={false}
          />
        </span>
      </span>

      <section
        className="project-detail__media-section"
        aria-labelledby="surfers-preview-heading"
      >
        <div className="project-detail__showcase-head">
          <h2 id="surfers-preview-heading">Gameplay Preview</h2>
        </div>

        <div className="sq-showcase__preview-stage">
          <div className="project-detail__media project-detail__media--surfers-video">
            {preview}
          </div>

          <div ref={routeRef} className="sq-route" aria-hidden="true">
            <span className="sq-route__edge" />

            <span ref={pickupRef} className="sq-route__pickup">
              <img
                src={frameAt(CHERRY_FRAMES, elapsedMs, 120)}
                alt=""
                draggable={false}
              />
            </span>

            <span
              className={`sq-route__exit${
                isExitActive ? " sq-route__exit--active" : ""
              }`}
            >
              <span className="sq-route__exit-core" />
            </span>

            <span
              ref={playerCarrierRef}
              className="sq-route__player-carrier"
              data-state={playerState}
            >
              <span
                className={`sq-route__player${
                  isReturnRun ? " sq-route__player--returning" : ""
                }`}
              >
                <img
                  src={frameAt(playerFrames, elapsedMs, playerFrameDuration)}
                  alt=""
                  draggable={false}
                />
              </span>
            </span>
          </div>
        </div>
      </section>

      {children}
    </div>
  );
}
