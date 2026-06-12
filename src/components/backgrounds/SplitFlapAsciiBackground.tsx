import { useEffect, useRef } from "react";
import "./SplitFlapAsciiBackground.css";

type SplitFlapAsciiBackgroundProps = {
  asciiUrl: string;
  className?: string;
  duration?: number;
  initialChar?: string;
};

type Board = {
  rows: string[];
  rowCount: number;
  columnCount: number;
};

type BoardLayers = {
  board: HTMLCanvasElement;
  initial: HTMLCanvasElement;
  finalMask: HTMLCanvasElement;
  spectrum: HTMLCanvasElement;
  finalCharacters: HTMLCanvasElement;
  finalFrame: HTMLCanvasElement;
  width: number;
  height: number;
  dpr: number;
  cellWidth: number;
  cellHeight: number;
};

type Disturbance =
  | {
      kind: "glitch";
      eventIndex: number;
      flickerStep: number;
      progress: number;
    }
  | {
      kind: "wave";
      progress: number;
    };

type GlitchRegion = {
  column: number;
  row: number;
  columnCount: number;
  rowCount: number;
  offsetColumns: number;
  offsetRows: number;
  echoDirection: number;
};

const FALLBACK_ROWS = 54;
const FALLBACK_COLUMNS = 96;
const MAX_DPR = 1.25;
const FLIP_DURATION = 110;
const DEFAULT_DURATION = 4600;
const ACTIVE_FRAME_INTERVAL = 1000 / 30;
const IDLE_FRAME_INTERVAL = 1000 / 20;
const HUE_SPEED = 0.008;
const SPATIAL_HUE_RANGE = 240;
const DISTURBANCE_INTERVAL = 10_000;
const WAVE_DURATION = 2400;
const WAVE_BAND_COLUMNS = 13;
const GLITCH_DURATION = 360;
const GLITCH_FLICKER_DURATION = 72;

function parseBoard(source: string): Board {
  const normalized = source.replace(/\r\n?/g, "\n").replace(/\n$/, "");
  const sourceRows = normalized.length > 0 ? normalized.split("\n") : [""];
  const columnCount = Math.max(1, ...sourceRows.map((row) => row.length));
  const rows = sourceRows.map((row) => row.padEnd(columnCount, " "));

  return {
    rows,
    rowCount: rows.length,
    columnCount,
  };
}

function createFallbackBoard(): Board {
  const row = " ".repeat(FALLBACK_COLUMNS);

  return {
    rows: Array.from({ length: FALLBACK_ROWS }, () => row),
    rowCount: FALLBACK_ROWS,
    columnCount: FALLBACK_COLUMNS,
  };
}

function createLayer(width: number, height: number, dpr: number) {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width * dpr));
  canvas.height = Math.max(1, Math.round(height * dpr));
  return canvas;
}

function drawBoardSurface(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  board: Board,
  cellWidth: number,
  cellHeight: number,
) {
  context.fillStyle = "#050807";
  context.fillRect(0, 0, width, height);

  context.strokeStyle = "rgba(133, 148, 140, 0.16)";
  context.lineWidth = Math.max(0.5, Math.min(1, cellWidth * 0.12));
  context.beginPath();

  for (let column = 1; column < board.columnCount; column += 1) {
    const x = Math.round(column * cellWidth) + 0.5;
    context.moveTo(x, 0);
    context.lineTo(x, height);
  }

  for (let row = 1; row < board.rowCount; row += 1) {
    const y = Math.round(row * cellHeight) + 0.5;
    context.moveTo(0, y);
    context.lineTo(width, y);
  }

  context.stroke();

  context.strokeStyle = "rgba(0, 0, 0, 0.62)";
  context.lineWidth = Math.max(0.5, Math.min(1, cellHeight * 0.1));
  context.beginPath();

  for (let row = 0; row < board.rowCount; row += 1) {
    const y = Math.round((row + 0.5) * cellHeight) + 0.5;
    context.moveTo(0, y);
    context.lineTo(width, y);
  }

  context.stroke();
}

function drawCharacterMask(
  context: CanvasRenderingContext2D,
  board: Board,
  cellWidth: number,
  cellHeight: number,
  initialChar?: string,
) {
  const fontSize = Math.max(2, Math.min(cellHeight * 0.78, cellWidth * 1.45));
  context.font = `700 ${fontSize}px "Arial Narrow", "Roboto Mono", monospace`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "rgba(255, 255, 255, 0.92)";

  for (let row = 0; row < board.rowCount; row += 1) {
    const y = (row + 0.51) * cellHeight;
    const sourceRow = board.rows[row];

    for (let column = 0; column < board.columnCount; column += 1) {
      const character = initialChar ?? sourceRow[column];
      if (character === " ") continue;

      context.fillText(character, (column + 0.5) * cellWidth, y);
    }
  }
}

function getLayerContext(canvas: HTMLCanvasElement) {
  return canvas.getContext("2d");
}

function createBoardLayers(
  board: Board,
  width: number,
  height: number,
  initialChar: string,
): BoardLayers {
  const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
  const cellWidth = width / board.columnCount;
  const cellHeight = height / board.rowCount;
  const boardLayer = createLayer(width, height, dpr);
  const initial = createLayer(width, height, dpr);
  const finalMask = createLayer(width, height, dpr);
  const spectrum = createLayer(width, height, dpr);
  const finalCharacters = createLayer(width, height, dpr);
  const finalFrame = createLayer(width, height, dpr);
  const boardContext = getLayerContext(boardLayer);
  const initialContext = getLayerContext(initial);
  const finalMaskContext = getLayerContext(finalMask);

  if (boardContext) {
    boardContext.scale(dpr, dpr);
    drawBoardSurface(boardContext, width, height, board, cellWidth, cellHeight);
  }

  if (initialContext) {
    initialContext.scale(dpr, dpr);
    drawBoardSurface(initialContext, width, height, board, cellWidth, cellHeight);
    drawCharacterMask(initialContext, board, cellWidth, cellHeight, initialChar);
  }

  if (finalMaskContext) {
    finalMaskContext.scale(dpr, dpr);
    drawCharacterMask(finalMaskContext, board, cellWidth, cellHeight);
  }

  return {
    board: boardLayer,
    initial,
    finalMask,
    spectrum,
    finalCharacters,
    finalFrame,
    width,
    height,
    dpr,
    cellWidth,
    cellHeight,
  };
}

function drawLayer(
  context: CanvasRenderingContext2D,
  layer: HTMLCanvasElement,
  layers: BoardLayers,
) {
  context.drawImage(layer, 0, 0, layers.width, layers.height);
}

function updateSpectrum(layers: BoardLayers, now: number, reducedMotion: boolean) {
  const context = getLayerContext(layers.spectrum);
  if (!context) return;

  const width = layers.spectrum.width;
  const height = layers.spectrum.height;
  const baseHue = reducedMotion ? 210 : (now * HUE_SPEED) % 360;
  const gradient = context.createLinearGradient(0, 0, width, height);
  const stops = 8;

  for (let index = 0; index <= stops; index += 1) {
    const offset = index / stops;
    const hue = (baseHue + offset * SPATIAL_HUE_RANGE) % 360;
    gradient.addColorStop(offset, `hsla(${hue}, 82%, 68%, 0.9)`);
  }

  context.globalCompositeOperation = "source-over";
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);
}

function colorizeFinalCharacters(layers: BoardLayers) {
  const context = getLayerContext(layers.finalCharacters);
  if (!context) return;

  context.globalCompositeOperation = "copy";
  context.drawImage(layers.spectrum, 0, 0);
  context.globalCompositeOperation = "destination-in";
  context.drawImage(layers.finalMask, 0, 0);
  context.globalCompositeOperation = "source-over";
}

function composeFinalFrame(layers: BoardLayers) {
  const context = getLayerContext(layers.finalFrame);
  if (!context) return;

  context.globalCompositeOperation = "copy";
  context.drawImage(layers.board, 0, 0);
  context.globalCompositeOperation = "source-over";
  context.drawImage(layers.finalCharacters, 0, 0);
}

function getRevealTiming(board: Board, duration: number) {
  const maxDiagonal = board.rowCount + board.columnCount - 2;
  const waveDuration = Math.max(1, duration - FLIP_DURATION);

  return {
    diagonalDuration: waveDuration / Math.max(1, maxDiagonal),
  };
}

function drawCompletedTiles(
  context: CanvasRenderingContext2D,
  board: Board,
  layers: BoardLayers,
  elapsed: number,
  diagonalDuration: number,
) {
  context.save();
  context.beginPath();

  for (let row = 0; row < board.rowCount; row += 1) {
    const completedColumn = Math.min(
      board.columnCount,
      Math.max(0, Math.floor((elapsed - FLIP_DURATION) / diagonalDuration) - row + 1),
    );

    if (completedColumn > 0) {
      context.rect(
        0,
        row * layers.cellHeight,
        completedColumn * layers.cellWidth,
        layers.cellHeight + 0.5,
      );
    }
  }

  context.clip();
  drawLayer(context, layers.finalFrame, layers);
  context.restore();
}

function drawFlippingTiles(
  context: CanvasRenderingContext2D,
  board: Board,
  layers: BoardLayers,
  elapsed: number,
  diagonalDuration: number,
) {
  const firstDiagonal = Math.max(0, Math.ceil((elapsed - FLIP_DURATION) / diagonalDuration));
  const lastDiagonal = Math.min(
    board.rowCount + board.columnCount - 2,
    Math.floor(elapsed / diagonalDuration),
  );

  for (let diagonal = firstDiagonal; diagonal <= lastDiagonal; diagonal += 1) {
    const progress = Math.min(
      1,
      Math.max(0, (elapsed - diagonal * diagonalDuration) / FLIP_DURATION),
    );
    const compression = Math.max(0.08, Math.abs(Math.cos(progress * Math.PI)));
    const source = progress < 0.5 ? layers.initial : layers.finalFrame;
    const startRow = Math.max(0, diagonal - board.columnCount + 1);
    const endRow = Math.min(board.rowCount - 1, diagonal);

    for (let row = startRow; row <= endRow; row += 1) {
      const column = diagonal - row;
      const sourceX = column * layers.cellWidth * layers.dpr;
      const sourceY = row * layers.cellHeight * layers.dpr;
      const sourceWidth = layers.cellWidth * layers.dpr;
      const sourceHeight = layers.cellHeight * layers.dpr;
      const destinationX = column * layers.cellWidth;
      const centerY = (row + 0.5) * layers.cellHeight;
      const destinationHeight = layers.cellHeight * compression;

      context.drawImage(
        source,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        destinationX,
        centerY - destinationHeight / 2,
        layers.cellWidth + 0.35,
        destinationHeight,
      );
    }
  }
}

function getDisturbance(elapsed: number, revealDuration: number): Disturbance | null {
  const timeSinceReveal = elapsed - revealDuration;
  if (timeSinceReveal < DISTURBANCE_INTERVAL) return null;

  const eventIndex = Math.floor(timeSinceReveal / DISTURBANCE_INTERVAL);
  const eventElapsed = timeSinceReveal - eventIndex * DISTURBANCE_INTERVAL;

  if (eventIndex % 2 === 1) {
    if (eventElapsed >= GLITCH_DURATION) return null;

    return {
      kind: "glitch",
      eventIndex,
      flickerStep: Math.floor(eventElapsed / GLITCH_FLICKER_DURATION),
      progress: eventElapsed / GLITCH_DURATION,
    };
  }

  if (eventElapsed >= WAVE_DURATION) return null;

  return {
    kind: "wave",
    progress: eventElapsed / WAVE_DURATION,
  };
}

function drawCanvasRegion(
  context: CanvasRenderingContext2D,
  source: HTMLCanvasElement,
  layers: BoardLayers,
  x: number,
  y: number,
  width: number,
  height: number,
  offsetX = 0,
  offsetY = 0,
) {
  context.drawImage(
    source,
    x * layers.dpr,
    y * layers.dpr,
    width * layers.dpr,
    height * layers.dpr,
    x + offsetX,
    y + offsetY,
    width,
    height,
  );
}

function drawDistortionWave(
  context: CanvasRenderingContext2D,
  board: Board,
  layers: BoardLayers,
  progress: number,
) {
  const maxColumn = board.columnCount - 1;
  const maxWaveIndex = board.rowCount + board.columnCount - 2;
  const easedProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
  const waveFront = easedProgress * maxWaveIndex;
  const edgeFade = Math.min(1, progress / 0.08, (1 - progress) / 0.08);
  const bandColumns = Math.max(
    4,
    Math.min(WAVE_BAND_COLUMNS, Math.round(board.columnCount * 0.035)),
  );

  for (let row = 0; row < board.rowCount; row += 1) {
    const centerColumn = row + maxColumn - waveFront;
    if (centerColumn < -bandColumns || centerColumn > maxColumn + bandColumns) continue;

    const startColumn = Math.max(0, Math.floor(centerColumn - bandColumns));
    const endColumn = Math.min(board.columnCount, Math.ceil(centerColumn + bandColumns));
    const x = startColumn * layers.cellWidth;
    const y = row * layers.cellHeight;
    const width = Math.max(layers.cellWidth, (endColumn - startColumn) * layers.cellWidth);
    const height = layers.cellHeight;
    const phase = row * 0.47 + progress * Math.PI * 10;
    const offsetX = Math.cos(phase * 0.72) * layers.cellWidth * 0.92 * edgeFade;
    const offsetY = Math.sin(phase) * layers.cellHeight * 0.76 * edgeFade;

    drawCanvasRegion(context, layers.board, layers, x, y, width, height);
    drawCanvasRegion(
      context,
      layers.finalCharacters,
      layers,
      x,
      y,
      width,
      height,
      offsetX,
      offsetY,
    );

    context.save();
    context.globalCompositeOperation = "lighter";
    context.globalAlpha = 0.22 * edgeFade;
    drawCanvasRegion(
      context,
      layers.finalCharacters,
      layers,
      x,
      y,
      width,
      height,
      offsetX * 1.25,
      offsetY * 1.25,
    );
    context.restore();
  }
}

function createSeededRandom(seed: number) {
  let value = seed >>> 0;

  return () => {
    value += 0x6d2b79f5;
    let mixed = value;
    mixed = Math.imul(mixed ^ (mixed >>> 15), mixed | 1);
    mixed ^= mixed + Math.imul(mixed ^ (mixed >>> 7), mixed | 61);
    return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
  };
}

function createGlitchRegions(
  board: Board,
  eventIndex: number,
  flickerStep: number,
): GlitchRegion[] {
  const random = createSeededRandom(
    Math.imul(eventIndex + 1, 0x9e3779b1) ^ Math.imul(flickerStep + 1, 0x85ebca6b),
  );
  const regionCount = 3 + Math.floor(random() * 5);

  return Array.from({ length: regionCount }, () => {
    const columnCount = Math.max(
      1,
      Math.round(board.columnCount * (0.15 + random() * 0.55)),
    );
    const rowCount = 1 + Math.floor(random() * 3);
    const maxColumn = Math.max(0, board.columnCount - columnCount);
    const maxRow = Math.max(0, board.rowCount - rowCount);
    const offsetMagnitude = 1 + Math.floor(random() * 3);

    return {
      column: Math.floor(random() * (maxColumn + 1)),
      row: Math.floor(random() * (maxRow + 1)),
      columnCount,
      rowCount,
      offsetColumns: random() < 0.5 ? -offsetMagnitude : offsetMagnitude,
      offsetRows: Math.floor(random() * 3) - 1,
      echoDirection: random() < 0.5 ? -1 : 1,
    };
  });
}

function drawGlitchDistortion(
  context: CanvasRenderingContext2D,
  board: Board,
  layers: BoardLayers,
  disturbance: Extract<Disturbance, { kind: "glitch" }>,
) {
  const regions = createGlitchRegions(
    board,
    disturbance.eventIndex,
    disturbance.flickerStep,
  );
  const edgeFade = Math.min(
    1,
    disturbance.progress / 0.12,
    (1 - disturbance.progress) / 0.12,
  );

  for (const region of regions) {
    const x = region.column * layers.cellWidth;
    const y = region.row * layers.cellHeight;
    const width = region.columnCount * layers.cellWidth;
    const height = region.rowCount * layers.cellHeight;
    const offsetX = region.offsetColumns * layers.cellWidth * edgeFade;
    const offsetY = region.offsetRows * layers.cellHeight * edgeFade;

    context.save();
    context.beginPath();
    context.rect(x, y, width, height);
    context.clip();

    drawCanvasRegion(context, layers.board, layers, x, y, width, height);
    drawCanvasRegion(
      context,
      layers.finalCharacters,
      layers,
      x,
      y,
      width,
      height,
      offsetX,
      offsetY,
    );

    context.globalCompositeOperation = "lighter";
    context.globalAlpha = 0.2 * edgeFade;
    drawCanvasRegion(
      context,
      layers.finalCharacters,
      layers,
      x,
      y,
      width,
      height,
      offsetX + region.echoDirection * layers.cellWidth * 0.7,
      offsetY,
    );
    context.restore();
  }
}

export function SplitFlapAsciiBackground({
  asciiUrl,
  className = "",
  duration = DEFAULT_DURATION,
  initialChar = "0",
}: SplitFlapAsciiBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return undefined;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const abortController = new AbortController();
    let disposed = false;
    let animationFrame = 0;
    let resizeFrame = 0;
    let board = createFallbackBoard();
    let layers: BoardLayers | null = null;
    let startedAt = performance.now();
    let lastPaintedAt = 0;
    let reducedMotion = motionQuery.matches;
    let loadFailed = false;

    const resizeCanvas = () => {
      const width = Math.max(1, window.innerWidth);
      const height = Math.max(1, window.innerHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.imageSmoothingEnabled = false;
      layers = createBoardLayers(board, width, height, initialChar);
    };

    const paint = (now: number, force = false) => {
      if (disposed || !layers) return;

      const elapsed = reducedMotion ? duration : Math.max(0, now - startedAt);
      const revealElapsed = Math.min(duration, elapsed);
      const revealActive = !reducedMotion && revealElapsed < duration;
      const disturbance = reducedMotion ? null : getDisturbance(elapsed, duration);
      const frameInterval = revealActive || disturbance !== null
        ? ACTIVE_FRAME_INTERVAL
        : IDLE_FRAME_INTERVAL;

      if (!force && now - lastPaintedAt < frameInterval) {
        animationFrame = requestAnimationFrame(paint);
        return;
      }

      lastPaintedAt = now;
      updateSpectrum(layers, now, reducedMotion);
      colorizeFinalCharacters(layers);
      context.clearRect(0, 0, layers.width, layers.height);

      if (revealActive) {
        const { diagonalDuration } = getRevealTiming(board, duration);
        composeFinalFrame(layers);
        drawLayer(context, layers.initial, layers);
        drawCompletedTiles(context, board, layers, revealElapsed, diagonalDuration);
        drawFlippingTiles(context, board, layers, revealElapsed, diagonalDuration);
      } else {
        drawLayer(context, layers.board, layers);
        drawLayer(context, layers.finalCharacters, layers);

        if (disturbance?.kind === "wave") {
          drawDistortionWave(context, board, layers, disturbance.progress);
        } else if (disturbance?.kind === "glitch") {
          drawGlitchDistortion(context, board, layers, disturbance);
        }
      }

      if (!reducedMotion && !loadFailed && !document.hidden) {
        animationFrame = requestAnimationFrame(paint);
      }
    };

    const rebuild = () => {
      resizeCanvas();
      cancelAnimationFrame(animationFrame);
      lastPaintedAt = 0;
      paint(performance.now(), true);
    };

    const handleResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(rebuild);
    };

    const handleVisibility = () => {
      cancelAnimationFrame(animationFrame);
      if (!document.hidden && !reducedMotion && !loadFailed) {
        lastPaintedAt = 0;
        animationFrame = requestAnimationFrame(paint);
      }
    };

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      cancelAnimationFrame(animationFrame);
      lastPaintedAt = 0;
      paint(performance.now(), true);
    };

    resizeCanvas();
    paint(startedAt, true);

    fetch(asciiUrl, { signal: abortController.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load ASCII board: ${response.status}`);
        return response.text();
      })
      .then((source) => {
        if (disposed) return;
        board = parseBoard(source);
        startedAt = performance.now();
        loadFailed = false;
        rebuild();
      })
      .catch((error: unknown) => {
        if (disposed || (error instanceof DOMException && error.name === "AbortError")) return;
        loadFailed = true;
        startedAt = performance.now() - duration;
        cancelAnimationFrame(animationFrame);
        paint(performance.now(), true);
      });

    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    motionQuery.addEventListener("change", handleMotionPreference);

    return () => {
      disposed = true;
      abortController.abort();
      cancelAnimationFrame(animationFrame);
      cancelAnimationFrame(resizeFrame);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      motionQuery.removeEventListener("change", handleMotionPreference);
    };
  }, [asciiUrl, duration, initialChar]);

  return (
    <div
      className={`split-flap-ascii ${className}`.trim()}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="split-flap-ascii__canvas" />
      <div className="split-flap-ascii__veil" />
    </div>
  );
}

export default SplitFlapAsciiBackground;
