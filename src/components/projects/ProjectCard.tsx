import { Link } from "react-router-dom";
import type { Project } from "../../types/project";
import { placeholderImage, isPlaceholder } from "../../lib/placeholder";
import Tag from "../ui/Tag";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const image = project.thumbnail ?? placeholderImage(project.name);

  return (
    <Link to={`/projects/${project.slug}`} className="card">
      <div className="card__media">
        <img src={image} alt={`${project.name} thumbnail`} loading="lazy" />
        {isPlaceholder(project.status) && <span className="card__badge">Placeholder</span>}
      </div>
      <div className="card__body">
        <div className="card__head">
          <h3 className="card__title">{project.name}</h3>
          <Tag emphasis>{project.category}</Tag>
        </div>
        <p className="card__desc">{project.shortDescription}</p>
        <div className="tag-row">
          {project.technologies.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}
