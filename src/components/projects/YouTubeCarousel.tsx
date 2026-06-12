import { useState } from "react";
import type { ProjectVideoEmbed } from "../../types/project";
import YouTubeEmbed from "./YouTubeEmbed";

interface YouTubeCarouselProps {
  videos: ProjectVideoEmbed[];
  /**
   * Used for accessible control labels, e.g. label "EOS" → "Show EOS video 1".
   * Falls back to a generic label when omitted.
   */
  label?: string;
}

/**
 * YouTubeCarousel — shows one hosted showcase video at a time with premium, on-brand
 * controls: glassy edge arrows to step through clips, and Instagram-style dots below
 * that both indicate and select the active clip. The active dot uses the violet accent;
 * the rest stay subtle. A "Watch on YouTube" link tracks the active video.
 *
 * The frame itself is the shared <YouTubeEmbed/>, so the responsive 16:9 styling stays
 * identical to single-video showcases. With a single video it degrades to a plain embed
 * (no controls). All controls are native <button>s, so they are keyboard-accessible.
 */
export default function YouTubeCarousel({ videos, label }: YouTubeCarouselProps) {
  const [active, setActive] = useState(0);

  if (videos.length === 0) return null;
  if (videos.length === 1) return <YouTubeEmbed video={videos[0]} />;

  const count = videos.length;
  const safeActive = Math.min(active, count - 1);
  const current = videos[safeActive];
  const who = label ? `${label} ` : "";
  const step = (delta: number) => setActive((safeActive + delta + count) % count);

  return (
    <div className="youtube-carousel">
      <div className="youtube-carousel__stage">
        <button
          type="button"
          className="youtube-carousel__arrow youtube-carousel__arrow--prev"
          onClick={() => step(-1)}
          aria-label={`Show previous ${who}video`}
        >
          <span aria-hidden="true">‹</span>
        </button>

        {/* key forces a clean iframe remount when the active clip changes */}
        <YouTubeEmbed key={current.youtubeId} video={current} />

        <button
          type="button"
          className="youtube-carousel__arrow youtube-carousel__arrow--next"
          onClick={() => step(1)}
          aria-label={`Show next ${who}video`}
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <div className="youtube-carousel__controls">
        <div
          className="youtube-carousel__dots"
          role="group"
          aria-label={`${who}showcase videos`}
        >
          {videos.map((video, i) => {
            const selected = i === safeActive;
            return (
              <button
                key={video.youtubeId}
                type="button"
                className={`youtube-carousel__dot${
                  selected ? " youtube-carousel__dot--active" : ""
                }`}
                aria-label={`Show ${who}video ${i + 1}`}
                aria-current={selected ? "true" : undefined}
                onClick={() => setActive(i)}
              />
            );
          })}
        </div>

        <a
          className="youtube-carousel__watch"
          href={current.externalUrl}
          target="_blank"
          rel="noreferrer"
        >
          Watch on YouTube <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
