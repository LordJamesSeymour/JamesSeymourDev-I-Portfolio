import { Link } from "react-router-dom";
import type { Project, ProjectCover } from "../../types/project";
import { placeholderCaption } from "../../lib/placeholder";
import { useProjectText } from "../../content/content";
import ProjectMedia from "./ProjectMedia";
import YouTubeCardPreview from "./YouTubeCardPreview";
import Tag from "../ui/Tag";

interface ProjectCardProps {
  project: Project;
}

const STATUS_BADGES = {
  "in-progress": {
    label: "IN PROGRESS",
    className: "card__badge--in-progress",
  },
  completed: {
    label: "COMPLETED",
    className: "card__badge--completed",
  },
} satisfies Record<Project["status"], { label: string; className: string }>;

/**
 * Dev-only "James input needed" note. Reads public/content/projects/<slug>/needs.txt
 * (one item per line), falling back to the project's `missingAssets`. Rendered only in
 * dev, so the content fetch never runs in production builds.
 */
function CardDevNote({ slug, fallback }: { slug: string; fallback: string[] }) {
  const text = useProjectText(slug, "needs", fallback.join("\n"));
  const items = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  if (items.length === 0) return null;
  return (
    <span className="card__note" title={items.join(" · ")}>
      Needs: {items[0]}
      {items.length > 1 ? ` +${items.length - 1}` : ""}
    </span>
  );
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // Cover priority: explicit cover → thumbnail image → generated placeholder.
  const cover: ProjectCover | undefined =
    project.cover ??
    (project.thumbnail ? { type: "image", src: project.thumbnail } : undefined);

  const badge = STATUS_BADGES[project.status];
  const caption = placeholderCaption(project.immersive?.showcaseType);

  // Editable copy (public/content/projects/<slug>/*.txt) with data-driven fallbacks.
  const title = useProjectText(project.slug, "title", project.name);
  const shortDesc = useProjectText(
    project.slug,
    "short-description",
    project.shortDescription,
  );

  const showDevNote =
    import.meta.env.DEV && (project.missingAssets?.length ?? 0) > 0;

  return (
    <Link to={`/projects/${project.slug}`} className="card">
      <div className="card__inner">
        <div className="card__media">
          {project.youtubeCardPreview ? (
            <YouTubeCardPreview preview={project.youtubeCardPreview} />
          ) : (
            <ProjectMedia cover={cover} label={title} caption={caption} />
          )}
          <span className={`card__badge ${badge.className}`}>{badge.label}</span>
          {showDevNote && (
            <CardDevNote slug={project.slug} fallback={project.missingAssets ?? []} />
          )}
        </div>
        <div className="card__body">
          <p className="card__kicker">{project.category}</p>
          <h3 className={project.hideDisplayTitle ? "visually-hidden" : "card__title"}>
            {title}
          </h3>
          <p className="card__desc">{shortDesc}</p>
          <div className="tag-row">
            {project.technologies.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
          <span className="card__cta">
            Click to see more <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
