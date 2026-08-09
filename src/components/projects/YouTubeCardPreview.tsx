import { useEffect, useRef, useState } from "react";
import type { ProjectYouTubeCardPreview as PreviewConfig } from "../../types/project";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import "./YouTubeCardPreview.css";

interface YouTubeCardPreviewProps {
  preview: PreviewConfig;
}

export default function YouTubeCardPreview({ preview }: YouTubeCardPreviewProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isFrameReady, setIsFrameReady] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.intersectionRatio >= 0.35),
      { threshold: [0, 0.35, 0.75] },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const shouldMountPlayer = isVisible && !reduceMotion;

  useEffect(() => {
    if (!shouldMountPlayer) setIsFrameReady(false);
  }, [shouldMountPlayer]);

  useEffect(() => {
    if (!shouldMountPlayer) return;

    const handlePlayerMessage = (event: MessageEvent) => {
      if (
        event.source !== frameRef.current?.contentWindow ||
        !/^https:\/\/www\.youtube(?:-nocookie)?\.com$/.test(event.origin)
      ) {
        return;
      }

      try {
        const message =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        const playerState =
          message?.event === "onStateChange"
            ? message.info
            : message?.event === "infoDelivery"
              ? message.info?.playerState
              : undefined;

        if (playerState === 1) {
          setIsFrameReady(true);
        } else if (playerState === 0) {
          sendPlayerCommand("seekTo", [preview.startSeconds, true]);
          sendPlayerCommand("mute");
          sendPlayerCommand("playVideo");
        }
      } catch {
        // Ignore unrelated cross-window messages.
      }
    };

    window.addEventListener("message", handlePlayerMessage);
    return () => window.removeEventListener("message", handlePlayerMessage);
  }, [preview.startSeconds, shouldMountPlayer]);

  const sendPlayerCommand = (func: string, args: unknown[] = []) => {
    frameRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args }),
      "https://www.youtube-nocookie.com",
    );
  };

  const initialisePlayer = () => {
    frameRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "listening", id: "zombies-card-preview" }),
      "https://www.youtube-nocookie.com",
    );
    window.setTimeout(() => {
      sendPlayerCommand("addEventListener", ["onStateChange"]);
      sendPlayerCommand("mute");
      sendPlayerCommand("playVideo");
    }, 250);
  };

  const origin =
    typeof window === "undefined" ? "" : `&origin=${encodeURIComponent(window.location.origin)}`;
  const playerSrc =
    `https://www.youtube-nocookie.com/embed/${encodeURIComponent(preview.youtubeId)}` +
    `?autoplay=1&mute=1&controls=0&disablekb=1&fs=0&playsinline=1&enablejsapi=1` +
    `&rel=0&modestbranding=1&iv_load_policy=3` +
    `&start=${preview.startSeconds}&end=${preview.endSeconds}${origin}`;

  return (
    <span ref={containerRef} className="cover-video youtube-card-preview">
      <img
        className={`cover-media youtube-card-preview__poster${
          isFrameReady ? " youtube-card-preview__poster--hidden" : ""
        }`}
        src={preview.poster}
        alt={preview.alt}
        width={1280}
        height={720}
        loading="lazy"
        decoding="async"
      />

      {shouldMountPlayer && (
        <iframe
          ref={frameRef}
          className="youtube-card-preview__frame"
          src={playerSrc}
          title={`${preview.alt}, muted ${preview.startSeconds} to ${preview.endSeconds} seconds`}
          loading="lazy"
          tabIndex={-1}
          aria-hidden="true"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="autoplay; encrypted-media"
          onLoad={initialisePlayer}
        />
      )}

      <span className="cover-video__veil" aria-hidden="true" />
    </span>
  );
}
