import { useEffect, useRef, useState, type ReactNode } from "react";

interface PlayableDemoProps {
  /** Full URL to the iframe embed page, e.g. `${BASE_URL}demos/bomberman/embed.html`. */
  demoUrl: string;
  /** Short game name used in accessible labels (e.g. "Bomberman"). */
  title: string;
  /** Section heading. */
  heading?: string;
  /** postMessage type the embed listens for to mute/unmute (e.g. "BOMBERMAN_AUDIO_MUTE"). */
  muteMessageType: string;
  /** Message namespace for the reset-maps handshake (e.g. "bomberman"). */
  messagePrefix: string;
  /** localStorage key for the persisted mute preference. */
  muteStorageKey: string;
  /** Confirmation prompt shown before clearing browser maps. */
  resetConfirmText: string;
  /** Small hint under the action buttons. */
  hint?: string;
  /** Controls cards rendered under the demo. */
  children: ReactNode;
}

/**
 * Reusable playable WebAssembly demo panel.
 *
 * Renders the game inside a fixed-aspect iframe (no inner scrollbars — the embed
 * page is a stripped canvas; the title/controls/mute live here in the page).
 * A page-level mute overlay button talks to the embed via postMessage, mirroring
 * the original Surfers Quest demo pattern.
 */
export default function PlayableDemo({
  demoUrl,
  title,
  heading = "Playable Web Demo",
  muteMessageType,
  messagePrefix,
  muteStorageKey,
  resetConfirmText,
  hint = "Click the game first to capture keyboard.",
  children,
}: PlayableDemoProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isResetReady, setIsResetReady] = useState(false);
  const [isMuted, setIsMuted] = useState(() => {
    try {
      return window.localStorage.getItem(muteStorageKey) === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.origin !== window.location.origin ||
        event.source !== frameRef.current?.contentWindow ||
        event.data?.type !== `${messagePrefix}:reset-ready`
      ) {
        return;
      }
      setIsResetReady(event.data.ready === true);
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [messagePrefix]);

  useEffect(() => {
    try {
      window.localStorage.setItem(muteStorageKey, String(isMuted));
    } catch {
      // Muting still works when storage is unavailable.
    }
    frameRef.current?.contentWindow?.postMessage(
      { type: muteMessageType, muted: isMuted },
      window.location.origin,
    );
  }, [isMuted, muteMessageType, muteStorageKey]);

  const handleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => undefined);
      return;
    }
    void container.requestFullscreen().catch(() => undefined);
  };

  const handleReset = () => {
    if (!isResetReady || !frameRef.current?.contentWindow) return;
    if (!window.confirm(resetConfirmText)) return;
    frameRef.current.contentWindow.postMessage(
      { type: `${messagePrefix}:reset-maps` },
      window.location.origin,
    );
  };

  const headingId = `${messagePrefix}-demo-heading`;

  return (
    <section
      className="project-detail__media-section project-demo"
      aria-labelledby={headingId}
    >
      <div className="project-detail__showcase-head">
        <h2 id={headingId}>{heading}</h2>
      </div>

      <div
        ref={containerRef}
        className="project-detail__media project-detail__media--demo"
      >
        <iframe
          ref={frameRef}
          src={demoUrl}
          title={`${title} playable demo`}
          className="project-demo__iframe"
          allow="fullscreen; gamepad"
          allowFullScreen
          onLoad={() => {
            setIsResetReady(false);
            frameRef.current?.contentWindow?.postMessage(
              { type: `${messagePrefix}:query-reset-ready` },
              window.location.origin,
            );
            frameRef.current?.contentWindow?.postMessage(
              { type: muteMessageType, muted: isMuted },
              window.location.origin,
            );
          }}
        />
        <button
          type="button"
          className={`project-demo__mute${
            isMuted ? " project-demo__mute--active" : ""
          }`}
          aria-label={isMuted ? `Unmute ${title} demo` : `Mute ${title} demo`}
          aria-pressed={isMuted}
          title={isMuted ? `Unmute ${title} demo` : `Mute ${title} demo`}
          onClick={() => setIsMuted((muted) => !muted)}
        >
          <span>{isMuted ? "Muted" : "Sound On"}</span>
        </button>
      </div>

      <div className="project-demo__actions">
        <div className="project-demo__buttons">
          <button
            type="button"
            className="project-demo__action"
            onClick={handleFullscreen}
          >
            Fullscreen
          </button>
          <button
            type="button"
            className="project-demo__action"
            onClick={handleReset}
            disabled={!isResetReady}
          >
            Reset browser maps
          </button>
        </div>
        <p className="project-demo__hint">{hint}</p>
      </div>

      <div className="project-demo__controls">{children}</div>
    </section>
  );
}
