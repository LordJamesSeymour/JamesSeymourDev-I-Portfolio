import { resolvePublicAssetPath } from "../../lib/assets";

export function makeFramePaths(
  root: string,
  folder: string,
  basename: string,
  count: number,
) {
  const cleanRoot = root.replace(/\/+$/, "");
  const cleanFolder = folder.replace(/^\/+|\/+$/g, "");

  return Array.from({ length: count }, (_, index) =>
    resolvePublicAssetPath(
      `${cleanRoot}/${cleanFolder}/${basename}_${index}.png`,
    ),
  );
}

export function loopFrameAt(
  frames: string[],
  elapsedMs: number,
  frameDurationMs: number,
) {
  return frames[Math.floor(elapsedMs / frameDurationMs) % frames.length];
}

export function clampedFrameAt(
  frames: string[],
  elapsedMs: number,
  frameDurationMs: number,
) {
  const index = Math.min(
    frames.length - 1,
    Math.max(0, Math.floor(elapsedMs / frameDurationMs)),
  );
  return frames[index];
}
