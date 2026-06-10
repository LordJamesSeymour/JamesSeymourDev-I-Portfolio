import { useMemo, useState } from "react";
import Section from "../components/ui/Section";
import ProjectsGrid from "../components/home/ProjectsGrid";
import ProjectFilter, { type CategoryFilter } from "../components/projects/ProjectFilter";
import { getAllProjects, getUsedCategories } from "../lib/projects";

export default function ProjectsPage() {
  const [active, setActive] = useState<CategoryFilter>("All");
  const all = getAllProjects();
  const categories = getUsedCategories();

  const visible = useMemo(
    () => (active === "All" ? all : all.filter((p) => p.category === active)),
    [active, all],
  );

  return (
    <Section title="Projects" subtitle="C++, C#, and level design work.">
      <ProjectFilter categories={categories} active={active} onChange={setActive} />
      <ProjectsGrid projects={visible} />
    </Section>
  );
}
