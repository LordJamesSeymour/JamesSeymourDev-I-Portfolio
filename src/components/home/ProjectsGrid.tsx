import type { Project } from "../../types/project";
import ProjectCard from "../projects/ProjectCard";
import Reveal from "../visual/Reveal";

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  if (projects.length === 0) {
    return <p className="muted-text">No projects to show.</p>;
  }

  return (
    <div className="grid">
      {projects.map((project, i) => (
        // Stagger entrance, but cap the delay so long lists don't feel sluggish.
        <Reveal key={project.slug} delay={Math.min(i, 6) * 70}>
          <ProjectCard project={project} />
        </Reveal>
      ))}
    </div>
  );
}
