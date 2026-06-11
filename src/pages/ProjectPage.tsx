import { useParams, Link } from "react-router-dom";
import type { ProjectCover } from "../types/project";
import { getProjectBySlug } from "../lib/projects";
import { isPlaceholder, placeholderCaption } from "../lib/placeholder";
import { useProjectText } from "../content/content";
import ProjectMedia from "../components/projects/ProjectMedia";
import ProjectCaseStudy from "../components/projects/ProjectCaseStudy";
import ProjectLogo from "../components/projects/ProjectLogo";
import YouTubeEmbed from "../components/projects/YouTubeEmbed";
import ArcadeMachineReveal from "../components/three/ArcadeMachineReveal";
import Tag from "../components/ui/Tag";
import Button from "../components/ui/Button";

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  // Editable copy (hooks run unconditionally — before any early return). Fallbacks
  // come from projects.ts; for an unknown slug these just resolve to the fallbacks.
  const safeSlug = slug ?? "";
  const title = useProjectText(safeSlug, "title", project?.name ?? "Project");
  const shortDesc = useProjectText(
    safeSlug,
    "short-description",
    project?.shortDescription ?? "",
  );
  const longDesc = useProjectText(
    safeSlug,
    "long-description",
    project?.caseStudy?.overview ?? "",
  );

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

  // Hero cover: prefer an explicit cover, else the first media item, else a thumbnail.
  // ProjectMedia handles the on-brand placeholder when none of these exist.
  const heroCover: ProjectCover | undefined =
    project.cover ??
    project.media?.[0] ??
    (project.thumbnail ? { type: "image", src: project.thumbnail } : undefined);
  const caption = placeholderCaption(project.immersive?.showcaseType);

  // Use the editable long-description as the case-study Overview (keeps other sections).
  const caseStudy = longDesc
    ? { ...(project.caseStudy ?? {}), overview: longDesc }
    : project.caseStudy;

  const { links } = project;
  const hasLinks = links && Object.values(links).some(Boolean);

  // Projects flagged as an exploded-view showcase (the Arcade Machine) get the
  // scroll-driven 3D reveal as their hero, in place of the static media panel.
  const showReveal = project.immersive?.revealType === "exploded-view";

  const breadcrumb = (
    <p className="breadcrumb">
      <Link to="/projects">← Projects</Link>
    </p>
  );

  const header = (
    <header className="project-detail__header">
      {project.logo && <ProjectLogo logo={project.logo} />}
      <div className="project-detail__heading">
        <h1>{title}</h1>
        <Tag emphasis>{project.category}</Tag>
        {isPlaceholder(project.status) && <Tag>Placeholder</Tag>}
      </div>
      <p className="prose">{shortDesc}</p>
      <div className="tag-row">
        {project.technologies.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>
    </header>
  );

  const linksBlock = hasLinks ? (
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
  ) : null;

  // Exploded-view showcase: title/summary, then the full-width 3D reveal as the
  // hero, then links + the case-study text. The reveal sits OUTSIDE the centered
  // article so its sticky scroll stage can span the full width (and so no
  // `overflow`-setting ancestor breaks position: sticky).
  if (showReveal) {
    return (
      <>
        <article className="container section project-detail project-detail--lead">
          {breadcrumb}
          {header}
        </article>

        <ArcadeMachineReveal />

        <article className="container section project-detail project-detail--study">
          {linksBlock}
          <ProjectCaseStudy caseStudy={caseStudy} />
        </article>
      </>
    );
  }

  return (
    <article className="container section project-detail">
      {breadcrumb}
      {header}

      <div className="project-detail__media">
        <ProjectMedia cover={heroCover} label={title} caption={caption} />
      </div>

      {project.showcaseVideo && (
        <section className="project-detail__showcase">
          <div className="project-detail__showcase-head">
            <h2>{project.showcaseVideo.heading}</h2>
            <a
              href={project.showcaseVideo.externalUrl}
              target="_blank"
              rel="noreferrer"
            >
              Watch on YouTube <span aria-hidden="true">↗</span>
            </a>
          </div>
          <YouTubeEmbed video={project.showcaseVideo} />
        </section>
      )}

      {linksBlock}

      <ProjectCaseStudy caseStudy={caseStudy} />
    </article>
  );
}
