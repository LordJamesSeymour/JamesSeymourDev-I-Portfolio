import { Link } from "react-router-dom";
import type { Project, ProjectCover } from "../../types/project";
import { placeholderCaption } from "../../lib/placeholder";
import CoverMedia from "./CoverMedia";
import Tag from "../ui/Tag";

interface ProjectCardProps {
  project: Project;
}

/** Short status label for the corner badge. Complete projects get no badge. */
function statusBadge(status?: Project["status"]): string | null {
  if (status === "in-progress") return "In progress";
  if (status === "placeholder" || status === undefined) return "Placeholder";
  return null;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // Cover priority: explicit cover → thumbnail image → generated placeholder.
  const cover: ProjectCover | undefined =
    project.cover ??
    (project.thumbnail ? { type: "image", src: project.thumbnail } : undefined);

  const badge = statusBadge(project.status);
  const caption = placeholderCaption(project.immersive?.showcaseType);

  // Dev-only nudge so James can see exactly what each card still needs. Never shipped.
  const devNote =
    import.meta.env.DEV && project.missingAssets && project.missingAssets.length > 0
      ? project.missingAssets
      : null;

  return (
    <Link to={`/projects/${project.slug}`} className="card">
      <div className="card__inner">
        <div className="card__media">
          <CoverMedia cover={cover} label={project.name} caption={caption} />
          {badge && <span className="card__badge">{badge}</span>}
          {devNote && (
            <span className="card__note" title={devNote.join(" · ")}>
              Needs: {devNote[0]}
              {devNote.length > 1 ? ` +${devNote.length - 1}` : ""}
            </span>
          )}
        </div>
        <div className="card__body">
          <p className="card__kicker">{project.category}</p>
          <h3 className="card__title">{project.name}</h3>
          <p className="card__desc">{project.shortDescription}</p>
          <div className="tag-row">
            {project.technologies.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
          <span className="card__cta">
            View case study <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
