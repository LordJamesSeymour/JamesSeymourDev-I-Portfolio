import type { Project } from "../../types/project";
import ProjectCard from "../projects/ProjectCard";

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  if (projects.length === 0) {
    return <p className="muted-text">No projects to show.</p>;
  }

  return (
    <div className="grid">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
