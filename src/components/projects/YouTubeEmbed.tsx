import type { ProjectVideoEmbed } from "../../types/project";

interface YouTubeEmbedProps {
  video: ProjectVideoEmbed;
}

/** Responsive, privacy-enhanced YouTube frame for project showcase videos. */
export default function YouTubeEmbed({ video }: YouTubeEmbedProps) {
  const src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(
    video.youtubeId,
  )}?rel=0`;

  return (
    <div className="youtube-embed">
      <div className="youtube-embed__frame">
        <iframe
          src={src}
          title={video.title}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}
