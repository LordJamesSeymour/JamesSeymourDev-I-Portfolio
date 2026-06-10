import { useParams, Link } from "react-router-dom";
import { getProjectBySlug } from "../lib/projects";
import { placeholderImage, isPlaceholder } from "../lib/placeholder";
import ProjectCaseStudy from "../components/projects/ProjectCaseStudy";
import Tag from "../components/ui/Tag";
import Button from "../components/ui/Button";

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <div className="container section">
        <h1>Project not found</h1>
        <p className="muted-text">No project matches “{slug}”.</p>
        <Button to="/projects" variant="ghost">
          Back to projects
        </Button>
      </div>
    );
  }

  const heroImage =
    project.media?.find((m) => m.type === "image")?.src ??
    project.thumbnail ??
    placeholderImage(project.name);

  const { links } = project;
  const hasLinks = links && Object.values(links).some(Boolean);

  return (
    <article className="container section project-detail">
      <p className="breadcrumb">
        <Link to="/projects">← Projects</Link>
      </p>

      <header className="project-detail__header">
        <div className="project-detail__heading">
          <h1>{project.name}</h1>
          <Tag emphasis>{project.category}</Tag>
          {isPlaceholder(project.status) && <Tag>Placeholder</Tag>}
        </div>
        <p className="prose">{project.shortDescription}</p>
        <div className="tag-row">
          {project.technologies.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      </header>

      <div className="project-detail__media">
        <img src={heroImage} alt={`${project.name} preview`} />
      </div>

      {hasLinks && (
        <div className="project-detail__links">
          {links?.github && (
            <Button href={links.github} variant="ghost">
              GitHub
            </Button>
          )}
          {links?.demo && (
            <Button href={links.demo} variant="ghost">
              Live Demo
            </Button>
          )}
          {links?.video && (
            <Button href={links.video} variant="ghost">
              Video
            </Button>
          )}
          {links?.download && (
            <Button href={links.download} variant="ghost">
              Download
            </Button>
          )}
        </div>
      )}

      <ProjectCaseStudy caseStudy={project.caseStudy} />
    </article>
  );
}
